import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  buscarVersiculos,
  descargarTraduccion,
  metaDescarga,
  nombreCorto,
  obtenerCapitulo,
  borrarCache as borrarCacheApi,
  TRADUCCION_PRINCIPAL,
  type FiltroTestamento,
  type MetaDescarga,
  type ModoBusqueda,
  type ResultadoBusqueda,
  type Versiculo,
} from "./api";
import { LIBROS, libroPorId, type Libro } from "./libros";
import { formatearReferencia, parsearReferencia, versosDeReferencia, type Referencia } from "./referencias";

export interface Marcador {
  id: string;
  referencia: string;
  libroId: number;
  capitulo: number;
  versos: number[];
  fecha: number;
  extracto: string;
}

interface Posicion {
  libroId: number;
  capitulo: number;
}

interface Ajustes {
  tamano: number;
  conNumeros: boolean;
  comparar: string | null;
}

export interface EstadoBusqueda {
  consulta: string;
  modo: ModoBusqueda;
  testamento: FiltroTestamento;
  pagina: number;
  total: number;
  resultados: ResultadoBusqueda[];
  cargando: boolean;
  error: string | null;
  origen: "local" | "remoto" | null;
}

const BUSQUEDA_INICIAL: EstadoBusqueda = {
  consulta: "",
  modo: "exacta",
  testamento: "todo",
  pagina: 1,
  total: 0,
  resultados: [],
  cargando: false,
  error: null,
  origen: null,
};

function escaparHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function useBiblia() {
  const [posicion, setPosicion] = useLocalStorage<Posicion>("biblia-posicion-v1", { libroId: 43, capitulo: 3 });
  const [ajustes, setAjustes] = useLocalStorage<Ajustes>("biblia-ajustes-v1", { tamano: 17, conNumeros: false, comparar: null });
  const [historial, setHistorial] = useLocalStorage<string[]>("biblia-historial-v1", []);
  const [marcadores, setMarcadores] = useLocalStorage<Marcador[]>("biblia-marcadores-v1", []);

  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [comparacion, setComparacion] = useState<Versiculo[] | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seleccion, setSeleccion] = useState<number[]>([]);
  const [ultimoClic, setUltimoClic] = useState<number | null>(null);
  const [versoObjetivo, setVersoObjetivo] = useState<number | null>(null);

  const [busqueda, setBusqueda] = useState<EstadoBusqueda>(BUSQUEDA_INICIAL);
  const [descarga, setDescarga] = useState<{ meta: MetaDescarga | null; enCurso: boolean; bytes: number; fase: string; error: string | null }>({
    meta: null,
    enCurso: false,
    bytes: 0,
    fase: "",
    error: null,
  });
  const [enLinea, setEnLinea] = useState(typeof navigator === "undefined" ? true : navigator.onLine);

  const peticionRef = useRef(0);
  const seleccionPendienteRef = useRef<number[] | null>(null);

  const libro = useMemo(() => libroPorId(posicion.libroId), [posicion.libroId]);
  const capitulo = posicion.capitulo;
  const referenciaCapitulo = useMemo(() => formatearReferencia(libro, capitulo), [libro, capitulo]);

  /* ───────── Conexión ───────── */
  useEffect(() => {
    const on = () => setEnLinea(true);
    const off = () => setEnLinea(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    void metaDescarga(TRADUCCION_PRINCIPAL).then((meta) => setDescarga((d) => ({ ...d, meta })));
  }, []);

  /* ───────── Carga del capítulo ───────── */
  useEffect(() => {
    const id = ++peticionRef.current;
    setCargando(true);
    setError(null);
    setComparacion(null);
    obtenerCapitulo(TRADUCCION_PRINCIPAL, posicion.libroId, posicion.capitulo)
      .then((lista) => {
        if (peticionRef.current !== id) return;
        setVersiculos(lista);
        const pendiente = seleccionPendienteRef.current;
        seleccionPendienteRef.current = null;
        const maximo = lista.length;
        const valida = (pendiente ?? []).filter((v) => v >= 1 && v <= maximo);
        setSeleccion(valida);
        setVersoObjetivo(valida[0] ?? null);
        setUltimoClic(null);
      })
      .catch((e: unknown) => {
        if (peticionRef.current !== id) return;
        setVersiculos([]);
        setSeleccion([]);
        setError(e instanceof Error ? e.message : "No se pudo cargar el capítulo.");
      })
      .finally(() => {
        if (peticionRef.current === id) setCargando(false);
      });
  }, [posicion.libroId, posicion.capitulo]);

  useEffect(() => {
    if (!ajustes.comparar) {
      setComparacion(null);
      return;
    }
    let vigente = true;
    obtenerCapitulo(ajustes.comparar, posicion.libroId, posicion.capitulo)
      .then((lista) => vigente && setComparacion(lista))
      .catch(() => vigente && setComparacion([]));
    return () => {
      vigente = false;
    };
  }, [ajustes.comparar, posicion.libroId, posicion.capitulo]);

  /* ───────── Navegación ───────── */

  const registrarHistorial = useCallback(
    (ref: string) => {
      setHistorial((h) => [ref, ...h.filter((x) => x !== ref)].slice(0, 25));
    },
    [setHistorial],
  );

  const navegar = useCallback(
    (libroId: number, cap: number, versos: number[] = []) => {
      const l = libroPorId(libroId);
      const capValido = Math.min(Math.max(1, cap), l.capitulos);
      seleccionPendienteRef.current = versos;
      if (libroId === posicion.libroId && capValido === posicion.capitulo) {
        // Mismo capítulo: aplicar la selección de inmediato.
        seleccionPendienteRef.current = null;
        const valida = versos.filter((v) => v >= 1 && v <= Math.max(versiculos.length, 1));
        setSeleccion(valida);
        setVersoObjetivo(valida[0] ?? null);
      } else {
        setPosicion({ libroId, capitulo: capValido });
      }
      registrarHistorial(formatearReferencia(l, capValido, versos));
    },
    [posicion.libroId, posicion.capitulo, versiculos.length, setPosicion, registrarHistorial],
  );

  const irAReferencia = useCallback(
    (ref: Referencia) => {
      navegar(ref.libro.id, ref.capitulo, versosDeReferencia(ref));
    },
    [navegar],
  );

  /** Interpreta texto libre («Juan 3:16») y navega. Devuelve un mensaje de error si no se entendió. */
  const irA = useCallback(
    (texto: string): string | null => {
      const ref = parsearReferencia(texto);
      if (!ref) return "No reconocí esa referencia. Prueba con «Juan 3:16», «Sal 23» o «Ro 8:1-4».";
      irAReferencia(ref);
      return null;
    },
    [irAReferencia],
  );

  const capituloSiguiente = useCallback(() => {
    if (capitulo < libro.capitulos) navegar(libro.id, capitulo + 1);
    else if (libro.id < 66) navegar(libro.id + 1, 1);
  }, [libro, capitulo, navegar]);

  const capituloAnterior = useCallback(() => {
    if (capitulo > 1) navegar(libro.id, capitulo - 1);
    else if (libro.id > 1) {
      const previo = libroPorId(libro.id - 1);
      navegar(previo.id, previo.capitulos);
    }
  }, [libro, capitulo, navegar]);

  /* ───────── Selección ───────── */

  const alternarVerso = useCallback(
    (n: number, extender = false) => {
      setSeleccion((actual) => {
        if (extender && ultimoClic !== null) {
          const desde = Math.min(ultimoClic, n);
          const hasta = Math.max(ultimoClic, n);
          const rango: number[] = [];
          for (let v = desde; v <= hasta; v++) rango.push(v);
          return Array.from(new Set([...actual, ...rango])).sort((a, b) => a - b);
        }
        return actual.includes(n) ? actual.filter((v) => v !== n) : [...actual, n].sort((a, b) => a - b);
      });
      setUltimoClic(n);
      setVersoObjetivo(null);
    },
    [ultimoClic],
  );

  const limpiarSeleccion = useCallback(() => {
    setSeleccion([]);
    setUltimoClic(null);
  }, []);

  const seleccionarTodo = useCallback(() => {
    setSeleccion(versiculos.map((v) => v.verso));
  }, [versiculos]);

  const versiculosSeleccionados = useMemo(
    () => versiculos.filter((v) => seleccion.includes(v.verso)),
    [versiculos, seleccion],
  );

  const referenciaSeleccion = useMemo(
    () => formatearReferencia(libro, capitulo, seleccion),
    [libro, capitulo, seleccion],
  );

  const textoDe = useCallback(
    (lista: Versiculo[], conNumeros: boolean) =>
      lista.map((v) => (conNumeros ? `${v.verso} ${v.texto}` : v.texto)).join(" "),
    [],
  );

  /** Texto plano para copiar: «…» (Juan 3:16, NVI). */
  const textoParaCopiar = useCallback(
    (lista: Versiculo[] = versiculosSeleccionados, ref: string = referenciaSeleccion, trad = TRADUCCION_PRINCIPAL) =>
      `«${textoDe(lista, ajustes.conNumeros)}» (${ref}, ${nombreCorto(trad)})`,
    [versiculosSeleccionados, referenciaSeleccion, textoDe, ajustes.conNumeros],
  );

  /** Bloque HTML con el mismo estilo que los versículos del documento. */
  const htmlParaInsertar = useCallback(
    (lista: Versiculo[] = versiculosSeleccionados, ref: string = referenciaSeleccion, trad = TRADUCCION_PRINCIPAL) => {
      const cuerpo = lista
        .map((v) => (ajustes.conNumeros ? `<sup>${v.verso}</sup> ${escaparHtml(v.texto)}` : escaparHtml(v.texto)))
        .join(" ");
      return `<blockquote class="versiculo"><p><strong>${escaparHtml(ref)}</strong> <span class="nota">(${escaparHtml(nombreCorto(trad))})</span></p><p>«${cuerpo}»</p></blockquote><p></p>`;
    },
    [versiculosSeleccionados, referenciaSeleccion, ajustes.conNumeros],
  );

  /* ───────── Marcadores ───────── */

  const guardarMarcador = useCallback(() => {
    const versos = seleccion.length ? seleccion : [];
    const referencia = formatearReferencia(libro, capitulo, versos);
    const extracto = (versos.length ? versiculosSeleccionados : versiculos.slice(0, 1))
      .map((v) => v.texto)
      .join(" ")
      .slice(0, 140);
    setMarcadores((m) => [
      { id: `${Date.now()}`, referencia, libroId: libro.id, capitulo, versos, fecha: Date.now(), extracto },
      ...m.filter((x) => x.referencia !== referencia),
    ]);
  }, [seleccion, libro, capitulo, versiculosSeleccionados, versiculos, setMarcadores]);

  const quitarMarcador = useCallback((id: string) => setMarcadores((m) => m.filter((x) => x.id !== id)), [setMarcadores]);

  /* ───────── Búsqueda ───────── */

  const buscar = useCallback(
    async (consulta: string, modo: ModoBusqueda = busqueda.modo, testamento: FiltroTestamento = busqueda.testamento, pagina = 1) => {
      const q = consulta.trim();
      setBusqueda((b) => ({ ...b, consulta, modo, testamento, pagina, cargando: Boolean(q), error: null, ...(pagina === 1 ? { resultados: [], total: 0 } : {}) }));
      if (!q) {
        setBusqueda((b) => ({ ...b, resultados: [], total: 0, cargando: false, origen: null }));
        return;
      }
      try {
        const r = await buscarVersiculos(TRADUCCION_PRINCIPAL, q, modo, testamento, pagina);
        setBusqueda((b) => {
          if (b.consulta !== consulta || b.modo !== modo || b.testamento !== testamento) return b;
          return {
            ...b,
            total: r.total,
            resultados: pagina === 1 ? r.resultados : [...b.resultados, ...r.resultados],
            cargando: false,
            origen: r.origen,
            pagina,
          };
        });
      } catch (e: unknown) {
        setBusqueda((b) => ({ ...b, cargando: false, error: e instanceof Error ? e.message : "No se pudo buscar." }));
      }
    },
    [busqueda.modo, busqueda.testamento],
  );

  const masResultados = useCallback(() => {
    if (busqueda.cargando || busqueda.resultados.length >= busqueda.total) return;
    void buscar(busqueda.consulta, busqueda.modo, busqueda.testamento, busqueda.pagina + 1);
  }, [buscar, busqueda]);

  /* ───────── Descarga sin conexión ───────── */

  const descargarNVI = useCallback(async () => {
    if (descarga.enCurso) return;
    setDescarga((d) => ({ ...d, enCurso: true, bytes: 0, fase: "descargando", error: null }));
    try {
      const meta = await descargarTraduccion(TRADUCCION_PRINCIPAL, (bytes, fase) => setDescarga((d) => ({ ...d, bytes, fase })));
      setDescarga({ meta, enCurso: false, bytes: 0, fase: "", error: null });
    } catch (e: unknown) {
      setDescarga((d) => ({ ...d, enCurso: false, fase: "", error: e instanceof Error ? e.message : "No se pudo descargar." }));
    }
  }, [descarga.enCurso]);

  const borrarCache = useCallback(async () => {
    await borrarCacheApi();
    setDescarga({ meta: null, enCurso: false, bytes: 0, fase: "", error: null });
  }, []);

  const actualizarAjustes = useCallback((parcial: Partial<Ajustes>) => setAjustes((a) => ({ ...a, ...parcial })), [setAjustes]);

  return {
    libros: LIBROS as Libro[],
    libro,
    capitulo,
    referenciaCapitulo,
    versiculos,
    comparacion,
    cargando,
    error,
    enLinea,
    seleccion,
    versoObjetivo,
    versiculosSeleccionados,
    referenciaSeleccion,
    navegar,
    irA,
    irAReferencia,
    capituloSiguiente,
    capituloAnterior,
    alternarVerso,
    limpiarSeleccion,
    seleccionarTodo,
    textoParaCopiar,
    htmlParaInsertar,
    historial,
    limpiarHistorial: () => setHistorial([]),
    marcadores,
    guardarMarcador,
    quitarMarcador,
    busqueda,
    buscar,
    masResultados,
    descarga,
    descargarNVI,
    borrarCache,
    ajustes,
    actualizarAjustes,
  };
}

export type Biblia = ReturnType<typeof useBiblia>;
