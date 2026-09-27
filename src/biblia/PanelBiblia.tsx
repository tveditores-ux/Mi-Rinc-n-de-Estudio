import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { dividirEnFrases, copiarAlPortapapeles } from "../editor/comandos";
import { Icono } from "../editor/Iconos";
import type { Fragmento, Voz } from "../editor/useVoz";
import { cn } from "../utils/cn";
import { escaparRegex, nombreCorto, TRADUCCIONES, TRADUCCION_PRINCIPAL } from "./api";
import { libroPorId } from "./libros";
import { formatearReferencia, normalizarTexto } from "./referencias";
import type { Biblia } from "./useBiblia";

type Pestana = "leer" | "buscar" | "marcadores" | "ajustes";

interface Props {
  biblia: Biblia;
  voz: Voz;
  modo: "panel" | "pagina";
  /** Inserta HTML en el documento activo (escritorio) o lo anexa al mensaje (página). */
  onInsertar?: (html: string) => void;
  etiquetaInsertar?: string;
  onCerrar?: () => void;
  onAviso?: (texto: string) => void;
}

function formatoMB(bytes: number) {
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function Resaltado({ texto, consulta }: { texto: string; consulta: string }) {
  const partes = useMemo(() => {
    const palabras = normalizarTexto(consulta).split(" ").filter((p) => p.length > 1);
    if (!palabras.length) return [{ t: texto, m: false }];
    // Comparación sin acentos: trabajamos sobre una versión normalizada con la misma longitud.
    const base = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(palabras.map(escaparRegex).join("|"), "giu");
    const salida: { t: string; m: boolean }[] = [];
    let ultimo = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(base)) !== null) {
      if (m.index > ultimo) salida.push({ t: texto.slice(ultimo, m.index), m: false });
      salida.push({ t: texto.slice(m.index, m.index + m[0].length), m: true });
      ultimo = m.index + m[0].length;
      if (m[0].length === 0) regex.lastIndex++;
    }
    if (ultimo < texto.length) salida.push({ t: texto.slice(ultimo), m: false });
    return salida;
  }, [texto, consulta]);
  return (
    <>
      {partes.map((p, i) =>
        p.m ? (
          <mark key={i} className="rounded-sm bg-oro-200 px-0.5 text-tinta-900">
            {p.t}
          </mark>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  );
}

export function PanelBiblia({ biblia, voz, modo, onInsertar, etiquetaInsertar = "Insertar en el mensaje", onCerrar, onAviso }: Props) {
  const [pestana, setPestana] = useState<Pestana>("leer");
  const [entrada, setEntrada] = useState("");
  const [errorEntrada, setErrorEntrada] = useState<string | null>(null);
  const [consulta, setConsulta] = useState(biblia.busqueda.consulta);
  const [fragmentosCapitulo, setFragmentosCapitulo] = useState<Fragmento[] | null>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const esPagina = modo === "pagina";

  const avisar = (t: string) => onAviso?.(t);

  /* Desplazarse al versículo objetivo al cargar. */
  useEffect(() => {
    if (biblia.versoObjetivo === null || !listaRef.current) return;
    const el = listaRef.current.querySelector<HTMLElement>(`[data-verso="${biblia.versoObjetivo}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [biblia.versoObjetivo, biblia.versiculos]);

  /* Versículo que se está leyendo en voz alta. */
  const versoLeyendo = useMemo(() => {
    if (!fragmentosCapitulo || voz.estado === "inactivo" || voz.fragmentos !== fragmentosCapitulo) return null;
    return fragmentosCapitulo[voz.indiceActual]?.bloque ?? null;
  }, [fragmentosCapitulo, voz.estado, voz.fragmentos, voz.indiceActual]);

  useEffect(() => {
    if (versoLeyendo === null || !listaRef.current) return;
    listaRef.current.querySelector<HTMLElement>(`[data-verso="${versoLeyendo}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [versoLeyendo]);

  const enviarReferencia = (e: FormEvent) => {
    e.preventDefault();
    const err = biblia.irA(entrada);
    setErrorEntrada(err);
    if (!err) {
      setEntrada("");
      setPestana("leer");
    }
  };

  /** Construye la lista de frases (misma referencia para la voz y para el resaltado). */
  const construirFragmentos = (lista: typeof biblia.versiculos, conTitulo: boolean): Fragmento[] => {
    const fragmentos: Fragmento[] = [];
    if (conTitulo) fragmentos.push({ texto: `${biblia.referenciaCapitulo}.`, bloque: 0 });
    lista.forEach((v) => dividirEnFrases(v.texto).forEach((f) => fragmentos.push({ texto: f, bloque: v.verso })));
    return fragmentos;
  };

  const leyendoEsteCapitulo = fragmentosCapitulo !== null && voz.fragmentos === fragmentosCapitulo && voz.estado !== "inactivo";

  const escucharCapitulo = () => {
    const fragmentos = construirFragmentos(biblia.versiculos, true);
    if (fragmentos.length <= 1) return;
    setFragmentosCapitulo(fragmentos);
    voz.hablar(fragmentos, 0);
  };

  const escucharDesde = (verso: number) => {
    const fragmentos = construirFragmentos(biblia.versiculos, false);
    const desde = Math.max(0, fragmentos.findIndex((f) => f.bloque === verso));
    setFragmentosCapitulo(fragmentos);
    voz.hablar(fragmentos, desde);
  };

  const escucharSeleccion = () => {
    if (!biblia.versiculosSeleccionados.length) return avisar("Selecciona uno o más versículos.");
    const fragmentos = construirFragmentos(biblia.versiculosSeleccionados, false);
    setFragmentosCapitulo(fragmentos);
    voz.hablar(fragmentos, 0);
  };

  const copiarSeleccion = async () => {
    if (!biblia.versiculosSeleccionados.length) return avisar("Selecciona uno o más versículos.");
    const ok = await copiarAlPortapapeles(biblia.textoParaCopiar(), biblia.htmlParaInsertar());
    avisar(ok ? `${biblia.referenciaSeleccion} copiado.` : "No se pudo copiar.");
  };

  const insertarSeleccion = () => {
    if (!onInsertar) return;
    if (!biblia.versiculosSeleccionados.length) return avisar("Selecciona uno o más versículos.");
    onInsertar(biblia.htmlParaInsertar());
    avisar(`${biblia.referenciaSeleccion} añadido al mensaje.`);
  };

  const haySeleccion = biblia.seleccion.length > 0;

  const pestanas: { id: Pestana; etiqueta: string; icono: string }[] = [
    { id: "leer", etiqueta: "Leer", icono: "libro" },
    { id: "buscar", etiqueta: "Buscar", icono: "buscar" },
    { id: "marcadores", etiqueta: "Marcadores", icono: "marcador" },
    { id: "ajustes", etiqueta: "Ajustes", icono: "ajustes" },
  ];

  return (
    <aside className={cn("flex h-full w-full flex-col bg-white", !esPagina && "border-l border-pergamino-300")}>
      {/* Encabezado */}
      <div className="border-b border-pergamino-200 bg-pergamino-50 px-4 pb-3 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-oro-600 text-white">
              <Icono nombre="libro" tamano={15} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold leading-none text-tinta-900">Biblia</p>
              <p className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-oro-700">
                Nueva Versión Internacional
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!biblia.enLinea && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider",
                  biblia.descarga.meta ? "bg-oliva-100 text-oliva-700" : "bg-vino-100 text-vino-800",
                )}
                title={biblia.descarga.meta ? "Sin conexión: usando la NVI descargada" : "Sin conexión: solo capítulos ya visitados"}
              >
                Sin conexión
              </span>
            )}
            {biblia.enLinea && biblia.descarga.meta && (
              <span className="hidden rounded-full bg-oliva-100 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-oliva-700 sm:inline" title="NVI completa disponible sin conexión">
                Local
              </span>
            )}
            {onCerrar && (
              <button type="button" onClick={onCerrar} className="rounded-md p-1 text-tinta-500 hover:bg-pergamino-200" aria-label="Cerrar Biblia">
                <Icono nombre="cerrar" tamano={16} />
              </button>
            )}
          </div>
        </div>

        {/* Referencia */}
        <form onSubmit={enviarReferencia} className="mt-3 flex items-center gap-1.5">
          <input
            value={entrada}
            onChange={(e) => {
              setEntrada(e.target.value);
              if (errorEntrada) setErrorEntrada(null);
            }}
            list="lista-libros-biblia"
            placeholder="Juan 3:16 · Sal 23 · Ro 8:1-4"
            className="h-9 min-w-0 flex-1 rounded-md border border-pergamino-300 bg-white px-2.5 font-sans text-sm text-tinta-900 placeholder:text-tinta-400 focus:border-oro-600 focus:outline-none"
            aria-label="Ir a referencia"
          />
          <datalist id="lista-libros-biblia">
            {biblia.libros.map((l) => (
              <option key={l.id} value={`${l.nombre} `} />
            ))}
          </datalist>
          <button type="submit" className="h-9 rounded-md bg-vino-700 px-3 font-sans text-sm font-semibold text-pergamino-50 hover:bg-vino-800">
            Ir
          </button>
        </form>
        {errorEntrada && <p className="mt-1.5 font-sans text-xs text-vino-800">{errorEntrada}</p>}

        {/* Libro / capítulo */}
        <div className="mt-2 flex items-center gap-1.5">
          <button type="button" onClick={biblia.capituloAnterior} className="flex h-8 w-8 items-center justify-center rounded-md border border-pergamino-300 text-tinta-700 hover:bg-white" title="Capítulo anterior" aria-label="Capítulo anterior">
            <Icono nombre="anterior" tamano={13} />
          </button>
          <select
            value={biblia.libro.id}
            onChange={(e) => biblia.navegar(Number(e.target.value), 1)}
            className="h-8 min-w-0 flex-1 rounded-md border border-pergamino-300 bg-white px-2 font-sans text-sm text-tinta-900"
            aria-label="Libro"
          >
            <optgroup label="Antiguo Testamento">
              {biblia.libros.filter((l) => l.testamento === "AT").map((l) => (
                <option key={l.id} value={l.id}>{l.nombre}</option>
              ))}
            </optgroup>
            <optgroup label="Nuevo Testamento">
              {biblia.libros.filter((l) => l.testamento === "NT").map((l) => (
                <option key={l.id} value={l.id}>{l.nombre}</option>
              ))}
            </optgroup>
          </select>
          <select
            value={biblia.capitulo}
            onChange={(e) => biblia.navegar(biblia.libro.id, Number(e.target.value))}
            className="h-8 w-[4.5rem] rounded-md border border-pergamino-300 bg-white px-1.5 font-sans text-sm text-tinta-900"
            aria-label="Capítulo"
          >
            {Array.from({ length: biblia.libro.capitulos }, (_, i) => i + 1).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="button" onClick={biblia.capituloSiguiente} className="flex h-8 w-8 items-center justify-center rounded-md border border-pergamino-300 text-tinta-700 hover:bg-white" title="Capítulo siguiente" aria-label="Capítulo siguiente">
            <Icono nombre="siguiente" tamano={13} />
          </button>
        </div>

        {/* Pestañas */}
        <div className="mt-3 flex gap-1 rounded-lg bg-pergamino-200/60 p-0.5">
          {pestanas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPestana(p.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1 rounded-md px-1 py-1.5 font-sans text-xs font-semibold transition",
                pestana === p.id ? "bg-white text-vino-800 shadow-suave" : "text-tinta-700 hover:text-tinta-900",
              )}
            >
              <Icono nombre={p.icono} tamano={13} />
              <span className={cn(!esPagina && "hidden min-[420px]:inline")}>{p.etiqueta}</span>
              {p.id === "marcadores" && biblia.marcadores.length > 0 && (
                <span className="ml-0.5 rounded-full bg-oro-200 px-1.5 text-[10px] text-tinta-800">{biblia.marcadores.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ───────── Leer ───────── */}
      {pestana === "leer" && (
        <>
          <div className="flex items-center justify-between border-b border-pergamino-200 px-4 py-2">
            <h3 className="font-serif text-xl font-semibold text-tinta-900">
              {biblia.referenciaCapitulo}
              <span className="ml-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-oro-700">NVI</span>
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={leyendoEsteCapitulo ? (voz.estado === "hablando" ? voz.pausar : voz.reanudar) : escucharCapitulo}
                disabled={!voz.soportado || biblia.versiculos.length === 0}
                className="flex h-8 items-center gap-1.5 rounded-md border border-pergamino-300 px-2 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100 disabled:opacity-40"
                title="Escuchar el capítulo"
              >
                <Icono nombre={leyendoEsteCapitulo && voz.estado === "hablando" ? "pausa" : "volumen"} tamano={14} />
                <span className="hidden sm:inline">{leyendoEsteCapitulo ? (voz.estado === "hablando" ? "Pausar" : "Reanudar") : "Escuchar"}</span>
              </button>
              {leyendoEsteCapitulo && (
                <button type="button" onClick={voz.detener} className="flex h-8 w-8 items-center justify-center rounded-md border border-pergamino-300 text-tinta-800 hover:bg-pergamino-100" title="Detener">
                  <Icono nombre="detener" tamano={13} />
                </button>
              )}
              <button type="button" onClick={biblia.guardarMarcador} className="flex h-8 w-8 items-center justify-center rounded-md border border-pergamino-300 text-tinta-800 hover:bg-pergamino-100" title="Guardar marcador">
                <Icono nombre="marcador" tamano={14} />
              </button>
            </div>
          </div>

          <div ref={listaRef} className="scroll-suave flex-1 overflow-y-auto px-4 py-4" style={{ fontSize: biblia.ajustes.tamano }}>
            {biblia.cargando && (
              <div className="space-y-3 py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-pergamino-200" style={{ width: `${70 + ((i * 13) % 30)}%` }} />
                ))}
              </div>
            )}
            {!biblia.cargando && biblia.error && (
              <div className="rounded-lg border border-vino-100 bg-vino-100/50 p-4 font-sans text-sm text-vino-900">
                <p className="font-semibold">No se pudo cargar {biblia.referenciaCapitulo}.</p>
                <p className="mt-1 text-xs">{biblia.error}</p>
                {!biblia.enLinea && !biblia.descarga.meta && (
                  <p className="mt-2 text-xs">Estás sin conexión. En «Ajustes» puedes descargar la NVI completa para usarla siempre.</p>
                )}
                <button type="button" onClick={() => biblia.navegar(biblia.libro.id, biblia.capitulo)} className="mt-3 rounded-md bg-vino-700 px-3 py-1.5 text-xs font-semibold text-white">
                  Reintentar
                </button>
              </div>
            )}
            {!biblia.cargando && !biblia.error && (
              <div className={cn("font-serif leading-relaxed text-tinta-900", esPagina ? "mx-auto max-w-2xl" : "")}>
                {biblia.versiculos.map((v) => {
                  const seleccionado = biblia.seleccion.includes(v.verso);
                  const leyendo = versoLeyendo === v.verso;
                  const par = biblia.comparacion?.find((c) => c.verso === v.verso);
                  return (
                    <div
                      key={v.verso}
                      data-verso={v.verso}
                      onClick={(e) => biblia.alternarVerso(v.verso, e.shiftKey)}
                      onDoubleClick={() => escucharDesde(v.verso)}
                      title="Clic: seleccionar · Mayús+clic: rango · Doble clic: escuchar desde aquí"
                      className={cn(
                        "group -mx-2 mb-0.5 cursor-pointer rounded-md px-2 py-1 transition-colors",
                        seleccionado ? "bg-oro-100 ring-1 ring-oro-500/60" : "hover:bg-pergamino-100/70",
                        leyendo && "bg-oro-200/70 ring-1 ring-oro-600",
                      )}
                    >
                      <p>
                        <sup className="mr-1 select-none font-sans text-[0.62em] font-bold text-vino-700">{v.verso}</sup>
                        <span>{v.texto}</span>
                      </p>
                      {par && (
                        <p className="mt-1 border-l-2 border-pergamino-300 pl-2 text-[0.88em] italic leading-snug text-tinta-700">
                          <span className="mr-1 font-sans text-[0.68em] font-bold not-italic uppercase tracking-wider text-tinta-500">{nombreCorto(biblia.ajustes.comparar ?? "")}</span>
                          {par.texto}
                        </p>
                      )}
                      {biblia.comparacion && biblia.comparacion.length === 0 && v.verso === 1 && (
                        <p className="mt-1 font-sans text-xs text-tinta-500">No se pudo cargar la versión de comparación.</p>
                      )}
                    </div>
                  );
                })}
                {!biblia.versiculos.length && <p className="font-sans text-sm text-tinta-500">Capítulo vacío.</p>}

                <div className="mt-6 flex items-center justify-between border-t border-pergamino-200 pt-3 font-sans text-xs">
                  <button type="button" onClick={biblia.capituloAnterior} className="flex items-center gap-1 rounded-md px-2 py-1 text-tinta-700 hover:bg-pergamino-100">
                    <Icono nombre="anterior" tamano={11} /> Anterior
                  </button>
                  <span className="text-tinta-400">{biblia.versiculos.length} versículos</span>
                  <button type="button" onClick={biblia.capituloSiguiente} className="flex items-center gap-1 rounded-md px-2 py-1 text-tinta-700 hover:bg-pergamino-100">
                    Siguiente <Icono nombre="siguiente" tamano={11} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Acciones de la selección */}
          <div className={cn("border-t border-pergamino-200 bg-pergamino-50 px-3 py-2 transition", !haySeleccion && "opacity-70")}>
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 truncate font-sans text-xs text-tinta-700">
                {haySeleccion ? (
                  <>
                    <span className="font-semibold text-tinta-900">{biblia.referenciaSeleccion}</span> · {biblia.seleccion.length} {biblia.seleccion.length === 1 ? "versículo" : "versículos"}
                  </>
                ) : (
                  "Toca un versículo para seleccionarlo (Mayús para rangos)."
                )}
              </p>
              {haySeleccion && (
                <button type="button" onClick={biblia.limpiarSeleccion} className="shrink-0 font-sans text-xs text-tinta-500 hover:text-vino-800">
                  Limpiar
                </button>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {onInsertar && (
                <button type="button" onClick={insertarSeleccion} disabled={!haySeleccion} className="flex items-center gap-1.5 rounded-md bg-vino-700 px-2.5 py-1.5 font-sans text-xs font-semibold text-pergamino-50 hover:bg-vino-800 disabled:cursor-not-allowed disabled:opacity-50">
                  <Icono nombre="cita" tamano={13} /> {etiquetaInsertar}
                </button>
              )}
              <button type="button" onClick={copiarSeleccion} disabled={!haySeleccion} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 bg-white px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100 disabled:cursor-not-allowed disabled:opacity-50">
                <Icono nombre="copiar" tamano={13} /> Copiar
              </button>
              <button type="button" onClick={escucharSeleccion} disabled={!haySeleccion || !voz.soportado} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 bg-white px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100 disabled:cursor-not-allowed disabled:opacity-50">
                <Icono nombre="volumen" tamano={13} /> Escuchar
              </button>
              <button type="button" onClick={biblia.guardarMarcador} disabled={!haySeleccion} className="flex items-center gap-1.5 rounded-md border border-pergamino-300 bg-white px-2.5 py-1.5 font-sans text-xs font-medium text-tinta-800 hover:bg-pergamino-100 disabled:cursor-not-allowed disabled:opacity-50">
                <Icono nombre="marcador" tamano={13} /> Marcador
              </button>
            </div>
          </div>
        </>
      )}

      {/* ───────── Buscar ───────── */}
      {pestana === "buscar" && (
        <div className="flex min-h-0 flex-1 flex-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void biblia.buscar(consulta);
            }}
            className="border-b border-pergamino-200 px-4 py-3"
          >
            <div className="flex items-center gap-1.5">
              <input
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Palabra o frase… (p. ej. «gracia de Dios»)"
                className="h-9 min-w-0 flex-1 rounded-md border border-pergamino-300 px-2.5 font-sans text-sm focus:border-oro-600 focus:outline-none"
                aria-label="Buscar en la Biblia"
              />
              <button type="submit" className="flex h-9 items-center gap-1 rounded-md bg-vino-700 px-3 font-sans text-sm font-semibold text-pergamino-50 hover:bg-vino-800">
                <Icono nombre="buscar" tamano={14} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-tinta-700">
              <label className="flex items-center gap-1.5">
                <input type="radio" name="modo-busqueda" checked={biblia.busqueda.modo === "exacta"} onChange={() => void biblia.buscar(consulta, "exacta")} className="accent-vino-700" />
                Palabras exactas
              </label>
              <label className="flex items-center gap-1.5" title="Encuentra versículos relacionados aunque no contengan la palabra (requiere conexión)">
                <input type="radio" name="modo-busqueda" checked={biblia.busqueda.modo === "semantica"} onChange={() => void biblia.buscar(consulta, "semantica")} className="accent-vino-700" />
                Por significado
              </label>
              <select
                value={biblia.busqueda.testamento}
                onChange={(e) => void biblia.buscar(consulta, undefined, e.target.value as "todo" | "AT" | "NT")}
                className="h-7 rounded-md border border-pergamino-300 bg-white px-1.5 text-xs"
                aria-label="Filtrar por testamento"
              >
                <option value="todo">Toda la Biblia</option>
                <option value="AT">Antiguo Testamento</option>
                <option value="NT">Nuevo Testamento</option>
              </select>
            </div>
          </form>

          <div className="scroll-suave flex-1 overflow-y-auto px-4 py-3">
            {biblia.busqueda.cargando && biblia.busqueda.resultados.length === 0 && (
              <p className="font-sans text-sm text-tinta-500">Buscando…</p>
            )}
            {biblia.busqueda.error && <p className="rounded-md bg-vino-100/60 p-3 font-sans text-xs text-vino-900">{biblia.busqueda.error}</p>}
            {!biblia.busqueda.cargando && !biblia.busqueda.error && biblia.busqueda.consulta && biblia.busqueda.resultados.length === 0 && (
              <p className="font-sans text-sm text-tinta-500">Sin resultados para «{biblia.busqueda.consulta}».</p>
            )}
            {biblia.busqueda.resultados.length > 0 && (
              <>
                <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.15em] text-tinta-500">
                  {biblia.busqueda.total.toLocaleString("es-ES")} resultados
                  {biblia.busqueda.origen === "local" ? " · búsqueda local" : ""}
                </p>
                <ul className="space-y-1.5">
                  {biblia.busqueda.resultados.map((r) => {
                    const l = libroPorId(r.libro);
                    return (
                      <li key={`${r.libro}-${r.capitulo}-${r.verso}`}>
                        <button
                          type="button"
                          onClick={() => {
                            biblia.navegar(r.libro, r.capitulo, [r.verso]);
                            setPestana("leer");
                          }}
                          className="w-full rounded-lg border border-pergamino-200 bg-white px-3 py-2 text-left transition hover:border-oro-500/60 hover:bg-oro-100/30"
                        >
                          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-vino-700">{formatearReferencia(l, r.capitulo, [r.verso])}</p>
                          <p className="mt-0.5 font-serif text-[15px] leading-snug text-tinta-900">
                            <Resaltado texto={r.texto} consulta={biblia.busqueda.consulta} />
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {biblia.busqueda.resultados.length < biblia.busqueda.total && (
                  <button type="button" onClick={biblia.masResultados} disabled={biblia.busqueda.cargando} className="mt-3 w-full rounded-md border border-pergamino-300 py-2 font-sans text-xs font-semibold text-tinta-800 hover:bg-pergamino-100 disabled:opacity-50">
                    {biblia.busqueda.cargando ? "Cargando…" : "Más resultados"}
                  </button>
                )}
              </>
            )}
            {!biblia.busqueda.consulta && (
              <div className="font-sans text-xs leading-relaxed text-tinta-500">
                <p>Busca palabras exactas («justificados por la fe») o, con conexión, por significado («cuando Dios parece callar»).</p>
                {biblia.historial.length > 0 && (
                  <>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-tinta-500">Visitados recientemente</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {biblia.historial.slice(0, 12).map((h) => (
                        <li key={h}>
                          <button type="button" onClick={() => { biblia.irA(h); setPestana("leer"); }} className="rounded-full border border-pergamino-300 px-2.5 py-1 text-xs text-tinta-800 hover:border-oro-600">
                            {h}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────── Marcadores ───────── */}
      {pestana === "marcadores" && (
        <div className="scroll-suave flex-1 overflow-y-auto px-4 py-3">
          {biblia.marcadores.length === 0 ? (
            <p className="font-sans text-sm text-tinta-500">Aún no tienes marcadores. Selecciona versículos y pulsa «Marcador» para guardarlos aquí.</p>
          ) : (
            <ul className="space-y-1.5">
              {biblia.marcadores.map((m) => (
                <li key={m.id} className="flex items-start gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      biblia.navegar(m.libroId, m.capitulo, m.versos);
                      setPestana("leer");
                    }}
                    className="min-w-0 flex-1 rounded-lg border border-pergamino-200 bg-white px-3 py-2 text-left transition hover:border-oro-500/60"
                  >
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-vino-700">{m.referencia}</p>
                    <p className="mt-0.5 line-clamp-2 font-serif text-[15px] leading-snug text-tinta-800">{m.extracto}…</p>
                    <p className="mt-1 font-sans text-[10px] text-tinta-400">{new Date(m.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </button>
                  <button type="button" onClick={() => biblia.quitarMarcador(m.id)} className="rounded-md p-1.5 text-tinta-400 hover:bg-pergamino-100 hover:text-vino-700" aria-label="Quitar marcador">
                    <Icono nombre="cerrar" tamano={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ───────── Ajustes ───────── */}
      {pestana === "ajustes" && (
        <div className="scroll-suave flex-1 space-y-5 overflow-y-auto px-4 py-4 font-sans text-sm text-tinta-800">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-tinta-500">Lectura</p>
            <label className="mt-2 flex items-center gap-3">
              <span className="w-24 text-xs">Tamaño de letra</span>
              <input type="range" min={13} max={30} value={biblia.ajustes.tamano} onChange={(e) => biblia.actualizarAjustes({ tamano: Number(e.target.value) })} className="flex-1 accent-vino-700" />
              <span className="w-8 text-right text-xs tabular-nums">{biblia.ajustes.tamano}</span>
            </label>
            <label className="mt-2 flex items-center gap-3">
              <span className="w-24 text-xs">Comparar con</span>
              <select
                value={biblia.ajustes.comparar ?? ""}
                onChange={(e) => biblia.actualizarAjustes({ comparar: e.target.value || null })}
                className="h-8 flex-1 rounded-md border border-pergamino-300 bg-white px-2 text-xs"
              >
                <option value="">Ninguna</option>
                {TRADUCCIONES.filter((t) => t.id !== TRADUCCION_PRINCIPAL).map((t) => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-tinta-500">Al insertar o copiar</p>
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs">
              <input type="checkbox" checked={biblia.ajustes.conNumeros} onChange={(e) => biblia.actualizarAjustes({ conNumeros: e.target.checked })} className="accent-vino-700" />
              Incluir los números de versículo
            </label>
            <p className="mt-1 text-[11px] text-tinta-500">Sin números, la lectura en voz alta suena más natural.</p>
          </div>

          <div className="rounded-lg border border-pergamino-200 bg-pergamino-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-tinta-500">Uso sin conexión</p>
            {biblia.descarga.meta ? (
              <p className="mt-1.5 text-xs text-oliva-700">
                ✓ NVI completa guardada en este equipo ({biblia.descarga.meta.versiculos.toLocaleString("es-ES")} versículos · {new Date(biblia.descarga.meta.fecha).toLocaleDateString("es-ES")}). La lectura y la búsqueda exacta funcionan sin internet.
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-tinta-700">
                Descarga la NVI completa una sola vez (unos 2 MB) para leer y buscar sin conexión. Mientras tanto, cada capítulo visitado se guarda automáticamente.
              </p>
            )}
            {biblia.descarga.enCurso && (
              <p className="mt-2 text-xs text-tinta-700">
                {biblia.descarga.fase === "guardando" ? "Guardando en el equipo…" : `Descargando… ${formatoMB(biblia.descarga.bytes)}`}
              </p>
            )}
            {biblia.descarga.error && <p className="mt-2 text-xs text-vino-800">{biblia.descarga.error}</p>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {!biblia.descarga.meta && (
                <button type="button" onClick={() => void biblia.descargarNVI()} disabled={biblia.descarga.enCurso || !biblia.enLinea} className="flex items-center gap-1.5 rounded-md bg-vino-700 px-3 py-1.5 text-xs font-semibold text-pergamino-50 hover:bg-vino-800 disabled:opacity-50">
                  <Icono nombre="descargar" tamano={13} /> {biblia.descarga.enCurso ? "Descargando…" : "Descargar NVI completa"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Borrar la Biblia guardada en este equipo? Podrás volver a descargarla cuando quieras.")) void biblia.borrarCache();
                }}
                className="rounded-md border border-pergamino-300 px-3 py-1.5 text-xs font-medium text-tinta-700 hover:bg-white"
              >
                Borrar datos guardados
              </button>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-tinta-400">
            Santa Biblia, Nueva Versión Internacional® NVI® © 1999, 2015 por Biblica, Inc.® Texto servido por bolls.life. Uso personal para estudio y predicación.
          </p>
        </div>
      )}
    </aside>
  );
}
