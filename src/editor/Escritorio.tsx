import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { cn } from "../utils/cn";
import { BuscarReemplazar } from "./BuscarReemplazar";
import { Cinta, type AccionesEditor, type Pestana } from "./Cinta";
import {
  aplicarBloque,
  aplicarFuente,
  aplicarTamano,
  calcularEstadisticas,
  cambiarCaso,
  colorTexto,
  copiarAlPortapapeles,
  dividirEnFrases,
  ejecutar,
  exportarHtml,
  exportarTexto,
  exportarWord,
  extraerBloques,
  htmlLimpio,
  insertarHtml,
  insertarTexto,
  leerEstado,
  limpiarFormato,
  resaltar,
  textoPlano,
  type EstadoFormato,
} from "./comandos";
import { HojaEditor } from "./HojaEditor";
import { Icono } from "./Iconos";
import { ListaDocumentos } from "./ListaDocumentos";
import { PanelLector } from "./PanelLector";
import type { Documentos } from "./useDocumentos";
import { useVoz, type Fragmento } from "./useVoz";

interface Props {
  docs: Documentos;
  onIrBiblioteca: () => void;
}

const ESTADO_INICIAL: EstadoFormato = {
  negrita: false,
  cursiva: false,
  subrayado: false,
  tachado: false,
  izquierda: true,
  centro: false,
  derecha: false,
  justificado: false,
  listaNumerada: false,
  listaVinetas: false,
  bloque: "p",
  fuente: "",
  tamano: "",
};

type EstadoGuardado = "guardado" | "pendiente" | "guardando";

interface Bloques {
  textos: string[];
  fragmentos: Fragmento[];
  elementos: HTMLElement[];
}

/** Limpia una cadena HTML usando un contenedor desconectado. */
function limpiarCadenaHtml(html: string): string {
  const d = document.createElement("div");
  d.innerHTML = html;
  return htmlLimpio(d);
}

function construirBloques(raiz: HTMLElement): Bloques {
  const lista = extraerBloques(raiz);
  const fragmentos: Fragmento[] = [];
  lista.forEach((b, i) => dividirEnFrases(b.texto).forEach((f) => fragmentos.push({ texto: f, bloque: i })));
  return { textos: lista.map((b) => b.texto), fragmentos, elementos: lista.map((b) => b.elemento) };
}

export function Escritorio({ docs, onIrBiblioteca }: Props) {
  const voz = useVoz();
  const raizRef = useRef<HTMLDivElement>(null);
  const rangoRef = useRef<Range | null>(null);
  const temporizadorRef = useRef<number | null>(null);
  const pendienteRef = useRef<{ id: string; html: string } | null>(null);

  const [estado, setEstado] = useState<EstadoFormato>(ESTADO_INICIAL);
  const [estadoGuardado, setEstadoGuardado] = useState<EstadoGuardado>("guardado");
  const [ultimoGuardado, setUltimoGuardado] = useState<Date | null>(null);
  const [estadisticas, setEstadisticas] = useState(calcularEstadisticas(""));
  const [zoom, setZoom] = useLocalStorage("escritorio-zoom-v1", 1);
  const [panelLector, setPanelLector] = useLocalStorage("escritorio-panel-lector-v1", true);
  const [panelLista, setPanelLista] = useLocalStorage("escritorio-panel-lista-v1", true);
  const [modoEnfoque, setModoEnfoque] = useState(false);
  const [pestana, setPestana] = useState<Pestana>("inicio");
  const [buscarAbierto, setBuscarAbierto] = useState(false);
  const [listaMovil, setListaMovil] = useState(false);
  const [lectorMovil, setLectorMovil] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [tituloEditando, setTituloEditando] = useState<string | null>(null);
  const [bloques, setBloques] = useState<Bloques>({ textos: [], fragmentos: [], elementos: [] });
  const [htmlImpresion, setHtmlImpresion] = useState("");

  const doc = docs.activo;
  const docId = doc?.id ?? "";
  const docIdRef = useRef(docId);
  docIdRef.current = docId;
  const version = docs.versiones[docId] ?? 0;
  // Solo se recalcula al cambiar de documento o al restaurarlo: mientras se edita, no se recarga.
  const htmlInicial = useMemo(() => (doc ? docs.obtenerHtml(doc) : ""), [docId, version]); // eslint-disable-line react-hooks/exhaustive-deps
  const titulo = doc ? docs.obtenerTitulo(doc) : "";

  const mostrarAviso = useCallback((texto: string) => {
    setAviso(texto);
    window.setTimeout(() => setAviso(null), 2200);
  }, []);

  /* ───────── Selección y estado de formato ───────── */

  const guardarSeleccion = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !raizRef.current) return;
    const rango = sel.getRangeAt(0);
    if (raizRef.current.contains(rango.commonAncestorContainer)) rangoRef.current = rango.cloneRange();
  }, []);

  const restaurarSeleccion = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    raiz.focus({ preventScroll: true });
    const sel = window.getSelection();
    if (sel && rangoRef.current) {
      sel.removeAllRanges();
      sel.addRange(rangoRef.current);
    }
  }, []);

  const actualizarEstado = useCallback(() => {
    guardarSeleccion();
    setEstado(leerEstado());
  }, [guardarSeleccion]);

  useEffect(() => {
    const manejar = () => {
      const sel = window.getSelection();
      if (sel && raizRef.current && sel.anchorNode && raizRef.current.contains(sel.anchorNode)) actualizarEstado();
    };
    document.addEventListener("selectionchange", manejar);
    return () => document.removeEventListener("selectionchange", manejar);
  }, [actualizarEstado]);

  /* ───────── Bloques para lectura y estadísticas ───────── */

  const recalcularBloques = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    setBloques(construirBloques(raiz));
    setEstadisticas(calcularEstadisticas(textoPlano(raiz)));
  }, []);

  /* ───────── Guardado (con instantánea del HTML) ───────── */

  const guardarPendiente = useCallback(() => {
    const p = pendienteRef.current;
    if (!p) return;
    pendienteRef.current = null;
    setEstadoGuardado("guardando");
    const limpio = limpiarCadenaHtml(p.html);
    docs.guardar(p.id, limpio);
    if (p.id === docIdRef.current) setHtmlImpresion(limpio);
    setUltimoGuardado(new Date());
    window.setTimeout(() => setEstadoGuardado("guardado"), 250);
  }, [docs]);

  const marcarCambio = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz || !docIdRef.current) return;
    pendienteRef.current = { id: docIdRef.current, html: raiz.innerHTML };
    setEstadoGuardado("pendiente");
    if (temporizadorRef.current) window.clearTimeout(temporizadorRef.current);
    temporizadorRef.current = window.setTimeout(() => {
      temporizadorRef.current = null;
      guardarPendiente();
      recalcularBloques();
    }, 900);
  }, [guardarPendiente, recalcularBloques]);

  const guardarAhora = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz || !docIdRef.current) return;
    if (temporizadorRef.current) {
      window.clearTimeout(temporizadorRef.current);
      temporizadorRef.current = null;
    }
    pendienteRef.current = { id: docIdRef.current, html: raiz.innerHTML };
    guardarPendiente();
    recalcularBloques();
  }, [guardarPendiente, recalcularBloques]);

  // Al cambiar de documento: vaciar lo pendiente del anterior, detener la voz y recalcular.
  useEffect(() => {
    setBuscarAbierto(false);
    setEstadoGuardado("guardado");
    setUltimoGuardado(null);
    const t = window.setTimeout(() => {
      recalcularBloques();
      const raiz = raizRef.current;
      if (raiz) setHtmlImpresion(htmlLimpio(raiz));
    }, 50);
    return () => {
      window.clearTimeout(t);
      if (temporizadorRef.current) {
        window.clearTimeout(temporizadorRef.current);
        temporizadorRef.current = null;
      }
      guardarPendiente();
      voz.detener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, version]);

  // Guardar pendientes al salir de la página.
  useEffect(() => {
    const antesDeSalir = () => {
      if (temporizadorRef.current) {
        window.clearTimeout(temporizadorRef.current);
        temporizadorRef.current = null;
      }
      guardarPendiente();
    };
    window.addEventListener("beforeunload", antesDeSalir);
    return () => {
      window.removeEventListener("beforeunload", antesDeSalir);
      antesDeSalir();
    };
  }, [guardarPendiente]);

  /* ───────── Resaltado del bloque en lectura ───────── */

  useEffect(() => {
    bloques.elementos.forEach((el) => el.classList.remove("leyendo"));
    if (voz.estado === "inactivo" || voz.indiceActual < 0) return;
    if (voz.fragmentos !== bloques.fragmentos) return;
    const frag = bloques.fragmentos[voz.indiceActual];
    const el = frag ? bloques.elementos[frag.bloque] : null;
    if (el) {
      el.classList.add("leyendo");
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    return () => {
      el?.classList.remove("leyendo");
    };
  }, [voz.indiceActual, voz.estado, voz.fragmentos, bloques]);

  /* ───────── Acciones ───────── */

  const conSeleccion = useCallback(
    (fn: () => void) => {
      restaurarSeleccion();
      fn();
      marcarCambio();
      window.setTimeout(actualizarEstado, 0);
    },
    [restaurarSeleccion, marcarCambio, actualizarEstado],
  );

  const leerTodo = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    const nuevos = construirBloques(raiz);
    setBloques(nuevos);
    voz.hablar(nuevos.fragmentos, 0);
    setPanelLector(true);
  }, [voz, setPanelLector]);

  const leerSeleccion = useCallback(() => {
    const texto = window.getSelection()?.toString().trim() ?? "";
    if (!texto) {
      mostrarAviso("Selecciona primero el texto que quieres oír.");
      return;
    }
    voz.hablar(dividirEnFrases(texto).map((f) => ({ texto: f, bloque: 0 })), 0);
  }, [voz, mostrarAviso]);

  const leerDesdeCursor = useCallback(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    const nuevos = construirBloques(raiz);
    setBloques(nuevos);
    const nodo = window.getSelection()?.anchorNode ?? rangoRef.current?.startContainer ?? null;
    let indiceBloque = 0;
    if (nodo && raiz.contains(nodo)) {
      const encontrado = nuevos.elementos.findIndex((el) => el === nodo || el.contains(nodo));
      if (encontrado >= 0) indiceBloque = encontrado;
    }
    const desde = Math.max(0, nuevos.fragmentos.findIndex((f) => f.bloque === indiceBloque));
    voz.hablar(nuevos.fragmentos, desde);
    setPanelLector(true);
  }, [voz, setPanelLector]);

  const imprimir = useCallback(() => {
    guardarAhora();
    const raiz = raizRef.current;
    if (raiz) setHtmlImpresion(htmlLimpio(raiz));
    window.setTimeout(() => window.print(), 150);
  }, [guardarAhora]);

  const acciones: AccionesEditor = useMemo(
    () => ({
      ejecutar: (c, v) => conSeleccion(() => ejecutar(c, v)),
      aplicarBloque: (b) => conSeleccion(() => aplicarBloque(b)),
      aplicarFuente: (css) => conSeleccion(() => aplicarFuente(css)),
      aplicarTamano: (pt) => conSeleccion(() => raizRef.current && aplicarTamano(raizRef.current, pt)),
      colorTexto: (c) => conSeleccion(() => colorTexto(c)),
      resaltar: (c) => conSeleccion(() => resaltar(c)),
      limpiarFormato: () => conSeleccion(limpiarFormato),
      cambiarCaso: (m) => conSeleccion(() => cambiarCaso(m)),
      insertarHtml: (html) => conSeleccion(() => insertarHtml(html)),
      insertarTexto: (t) => conSeleccion(() => insertarTexto(t)),
      abrirBuscar: () => setBuscarAbierto(true),
      guardar: () => {
        guardarAhora();
        mostrarAviso("Documento guardado.");
      },
      restaurar: () => {
        if (!docIdRef.current) return;
        if (window.confirm("¿Restaurar el bosquejo original? Se perderán los cambios de este mensaje.")) {
          voz.detener();
          pendienteRef.current = null;
          if (temporizadorRef.current) {
            window.clearTimeout(temporizadorRef.current);
            temporizadorRef.current = null;
          }
          docs.restaurar(docIdRef.current);
          mostrarAviso("Bosquejo restaurado.");
        }
      },
      imprimir,
      exportar: (formato) => {
        const raiz = raizRef.current;
        if (!raiz) return;
        const html = htmlLimpio(raiz);
        if (formato === "doc") exportarWord(titulo, html);
        if (formato === "html") exportarHtml(titulo, html);
        if (formato === "txt") exportarTexto(titulo, textoPlano(raiz));
        mostrarAviso("Descarga iniciada.");
      },
      copiarTexto: async () => {
        const raiz = raizRef.current;
        if (!raiz) return;
        const ok = await copiarAlPortapapeles(textoPlano(raiz), htmlLimpio(raiz));
        mostrarAviso(ok ? "Documento copiado al portapapeles." : "No se pudo copiar.");
      },
      leerTodo,
      leerSeleccion,
      leerDesdeCursor,
    }),
    [conSeleccion, guardarAhora, mostrarAviso, docs, voz, imprimir, titulo, leerTodo, leerSeleccion, leerDesdeCursor],
  );

  /* ───────── Atajos de teclado ───────── */

  useEffect(() => {
    const manejar = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) {
        if (e.key === "Escape") {
          setBuscarAbierto(false);
          if (modoEnfoque) setModoEnfoque(false);
        }
        return;
      }
      const k = e.key.toLowerCase();
      if (k === "s") {
        e.preventDefault();
        acciones.guardar();
      } else if (k === "f") {
        e.preventDefault();
        setBuscarAbierto(true);
      } else if (k === "p") {
        e.preventDefault();
        imprimir();
      } else if (e.shiftKey && k === "l") {
        e.preventDefault();
        leerDesdeCursor();
      } else if (e.shiftKey && (k === " " || e.code === "Space")) {
        e.preventDefault();
        if (voz.estado === "hablando") voz.pausar();
        else if (voz.estado === "pausado") voz.reanudar();
      }
    };
    window.addEventListener("keydown", manejar);
    return () => window.removeEventListener("keydown", manejar);
  }, [acciones, imprimir, leerDesdeCursor, voz, modoEnfoque]);

  /* ───────── Título ───────── */

  const confirmarTitulo = () => {
    if (tituloEditando !== null && doc) {
      const limpio = tituloEditando.trim();
      if (limpio && limpio !== titulo) {
        const raiz = raizRef.current;
        if (raiz) docs.guardar(docId, limpiarCadenaHtml(raiz.innerHTML), limpio);
        else docs.renombrar(docId, limpio);
      }
    }
    setTituloEditando(null);
  };

  if (!doc) return null;

  const mostrarLista = panelLista && !modoEnfoque;
  const mostrarLector = panelLector && !modoEnfoque;

  const etiquetaGuardado =
    estadoGuardado === "guardado"
      ? ultimoGuardado
        ? `Guardado ${ultimoGuardado.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
        : "Guardado"
      : estadoGuardado === "guardando"
        ? "Guardando…"
        : "Cambios sin guardar…";

  return (
    <div className="flex h-[calc(100vh-44px)] flex-col overflow-hidden bg-pergamino-100">
      {/* Barra de título del documento */}
      <div className="no-imprimir flex items-center gap-3 border-b border-pergamino-300 bg-white px-3 py-1.5 sm:px-4">
        <button type="button" onClick={() => setListaMovil(true)} className="rounded-md p-1.5 text-tinta-700 hover:bg-pergamino-100 lg:hidden" aria-label="Mensajes">
          <Icono nombre="menu" tamano={18} />
        </button>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-vino-700 text-pergamino-50">
          <Icono nombre="archivo" tamano={16} />
        </div>
        <div className="min-w-0 flex-1">
          {tituloEditando !== null ? (
            <input
              autoFocus
              value={tituloEditando}
              onChange={(e) => setTituloEditando(e.target.value)}
              onBlur={confirmarTitulo}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmarTitulo();
                if (e.key === "Escape") setTituloEditando(null);
              }}
              className="w-full rounded-md border border-oro-500 px-2 py-0.5 font-serif text-lg font-semibold text-tinta-900 outline-none"
            />
          ) : (
            <button
              type="button"
              onClick={() => setTituloEditando(titulo)}
              title="Cambiar el nombre del documento"
              className="block max-w-full truncate rounded-md px-2 py-0.5 text-left font-serif text-lg font-semibold text-tinta-900 hover:bg-pergamino-100"
            >
              {doc.orden ? `${doc.orden} · ` : ""}
              {titulo}
            </button>
          )}
          <p className="truncate px-2 font-sans text-[11px] text-tinta-500">
            {doc.referencias.join(" · ")} ·{" "}
            <span className={cn(estadoGuardado === "guardado" ? "text-oliva-700" : "text-oro-700")}>{etiquetaGuardado}</span>
          </p>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <button type="button" onClick={acciones.guardar} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100" title="Guardar (Ctrl+S)">
            <Icono nombre="guardar" tamano={14} /> Guardar
          </button>
          <button type="button" onClick={() => acciones.exportar("doc")} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100" title="Descargar como Word">
            <Icono nombre="descargar" tamano={14} /> Word
          </button>
          <button type="button" onClick={imprimir} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100" title="Imprimir (Ctrl+P)">
            <Icono nombre="imprimir" tamano={14} /> Imprimir
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            if (voz.estado === "hablando") voz.pausar();
            else if (voz.estado === "pausado") voz.reanudar();
            else leerTodo();
          }}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-semibold shadow-suave transition",
            voz.estado === "hablando" ? "bg-oro-600 text-white hover:bg-oro-700" : "bg-vino-700 text-pergamino-50 hover:bg-vino-800",
          )}
          title={voz.estado === "hablando" ? "Pausar lectura" : voz.estado === "pausado" ? "Reanudar" : "Escuchar el mensaje"}
        >
          <Icono nombre={voz.estado === "hablando" ? "pausa" : "volumen"} tamano={14} />
          <span className="hidden sm:inline">{voz.estado === "hablando" ? "Pausar" : voz.estado === "pausado" ? "Reanudar" : "Escuchar"}</span>
        </button>
        <button type="button" onClick={() => setLectorMovil(true)} className="rounded-md p-1.5 text-tinta-700 hover:bg-pergamino-100 xl:hidden" aria-label="Panel de lectura">
          <Icono nombre="panel" tamano={18} />
        </button>
      </div>

      <Cinta
        estado={estado}
        acciones={acciones}
        voz={voz}
        zoom={zoom}
        setZoom={setZoom}
        panelLector={panelLector}
        setPanelLector={setPanelLector}
        panelLista={panelLista}
        setPanelLista={setPanelLista}
        modoEnfoque={modoEnfoque}
        setModoEnfoque={setModoEnfoque}
        pestana={pestana}
        setPestana={setPestana}
      />

      {/* Cuerpo */}
      <div className="relative flex min-h-0 flex-1">
        {mostrarLista && (
          <div className="no-imprimir hidden w-72 shrink-0 lg:flex">
            <ListaDocumentos docs={docs} onIrBiblioteca={onIrBiblioteca} />
          </div>
        )}

        <div className="relative flex min-w-0 flex-1 flex-col">
          {buscarAbierto && (
            <BuscarReemplazar obtenerRaiz={() => raizRef.current} onCambio={marcarCambio} onCerrar={() => setBuscarAbierto(false)} />
          )}
          <HojaEditor
            key={`${docId}:${version}`}
            ref={raizRef}
            htmlInicial={htmlInicial}
            zoom={zoom}
            onCambio={marcarCambio}
            onSeleccion={actualizarEstado}
          />
        </div>

        {mostrarLector && (
          <div className="no-imprimir hidden w-80 shrink-0 xl:flex 2xl:w-96">
            <PanelLector
              voz={voz}
              fragmentosDocumento={bloques.fragmentos}
              bloquesTexto={bloques.textos}
              onActualizar={recalcularBloques}
              onCerrar={() => setPanelLector(false)}
            />
          </div>
        )}

        {/* Paneles móviles */}
        {listaMovil && (
          <div className="no-imprimir absolute inset-0 z-40 flex lg:hidden">
            <div className="flex w-80 max-w-[85vw] shadow-elevada">
              <ListaDocumentos docs={docs} onIrBiblioteca={onIrBiblioteca} onCerrarPanel={() => setListaMovil(false)} />
            </div>
            <button type="button" className="flex-1 bg-tinta-950/40" aria-label="Cerrar" onClick={() => setListaMovil(false)} />
          </div>
        )}
        {lectorMovil && (
          <div className="no-imprimir absolute inset-0 z-40 flex justify-end xl:hidden">
            <button type="button" className="flex-1 bg-tinta-950/40" aria-label="Cerrar" onClick={() => setLectorMovil(false)} />
            <div className="flex w-96 max-w-[90vw] shadow-elevada">
              <PanelLector
                voz={voz}
                fragmentosDocumento={bloques.fragmentos}
                bloquesTexto={bloques.textos}
                onActualizar={recalcularBloques}
                onCerrar={() => setLectorMovil(false)}
              />
            </div>
          </div>
        )}

        {aviso && (
          <div className="no-imprimir pointer-events-none absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-tinta-900 px-4 py-2 font-sans text-sm text-pergamino-50 shadow-elevada">
            {aviso}
          </div>
        )}
      </div>

      {/* Barra de estado */}
      <div className="no-imprimir flex items-center gap-4 overflow-x-auto border-t border-pergamino-300 bg-tinta-900 px-4 py-1 font-sans text-[11px] text-pergamino-200">
        <span className="whitespace-nowrap">
          <strong className="text-pergamino-50">{estadisticas.palabras.toLocaleString("es-ES")}</strong> palabras
        </span>
        <span className="whitespace-nowrap">{estadisticas.caracteres.toLocaleString("es-ES")} caracteres</span>
        <span className="whitespace-nowrap">{estadisticas.parrafos} párrafos</span>
        <span className="flex items-center gap-1 whitespace-nowrap" title="Duración estimada a unas 130 palabras por minuto">
          <Icono nombre="reloj" tamano={12} /> ≈ {estadisticas.minutos} min predicando
        </span>
        <span className="hidden whitespace-nowrap sm:inline">
          {voz.estado !== "inactivo" && voz.indiceActual >= 0
            ? `Leyendo frase ${voz.indiceActual + 1} de ${voz.fragmentos.length}`
            : voz.vozActual
              ? `Voz: ${voz.vozActual.name}`
              : "Sin voz"}
        </span>
        <span className="ml-auto hidden whitespace-nowrap text-pergamino-200/60 md:inline">
          Ctrl+S guardar · Ctrl+F buscar · Ctrl+Mayús+L leer desde el cursor · Ctrl+Mayús+Espacio pausa
        </span>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <button type="button" onClick={() => setZoom(Math.max(0.5, Math.round((zoom - 0.1) * 10) / 10))} className="rounded p-0.5 hover:bg-white/10" aria-label="Alejar">
            <Icono nombre="zoomMenos" tamano={13} />
          </button>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-20 accent-oro-500"
            aria-label="Zoom"
          />
          <button type="button" onClick={() => setZoom(Math.min(2, Math.round((zoom + 0.1) * 10) / 10))} className="rounded p-0.5 hover:bg-white/10" aria-label="Acercar">
            <Icono nombre="zoomMas" tamano={13} />
          </button>
          <span className="w-9 text-right tabular-nums">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Copia para impresión */}
      <div className="solo-imprimir">
        <div className="documento mx-auto max-w-3xl p-8" dangerouslySetInnerHTML={{ __html: htmlImpresion }} />
      </div>
    </div>
  );
}
