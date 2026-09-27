import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  COLORES_RESALTADO,
  COLORES_TEXTO,
  FUENTES,
  TAMANOS,
  prepararImagen,
  type Bloque,
  type EstadoFormato,
  type ModoCaso,
} from "./comandos";
import { Icono } from "./Iconos";
import type { Voz } from "./useVoz";

export type Pestana = "inicio" | "insertar" | "biblia" | "voz" | "vista";

export interface AccionesBiblia {
  visible: boolean;
  alternar: () => void;
  irA: (texto: string) => string | null;
  abrirReferenciaSeleccionada: () => void;
  insertarSeleccion: () => void;
  haySeleccion: boolean;
  referenciaSeleccion: string;
  referenciaCapitulo: string;
  escucharCapitulo: () => void;
  conNumeros: boolean;
  setConNumeros: (v: boolean) => void;
  comparar: string | null;
  setComparar: (v: string | null) => void;
  descargada: boolean;
  descargando: boolean;
  descargar: () => void;
}

export interface AccionesEditor {
  ejecutar: (comando: string, valor?: string) => void;
  aplicarBloque: (b: Bloque) => void;
  aplicarFuente: (css: string) => void;
  aplicarTamano: (pt: number) => void;
  colorTexto: (c: string) => void;
  resaltar: (c: string) => void;
  limpiarFormato: () => void;
  cambiarCaso: (m: ModoCaso) => void;
  insertarHtml: (html: string) => void;
  insertarTexto: (t: string) => void;
  abrirBuscar: () => void;
  guardar: () => void;
  restaurar: () => void;
  imprimir: () => void;
  exportar: (formato: "doc" | "html" | "txt") => void;
  copiarTexto: () => void;
  leerTodo: () => void;
  leerSeleccion: () => void;
  leerDesdeCursor: () => void;
}

interface Props {
  estado: EstadoFormato;
  acciones: AccionesEditor;
  biblia: AccionesBiblia;
  voz: Voz;
  zoom: number;
  setZoom: (z: number) => void;
  panelLector: boolean;
  setPanelLector: (v: boolean) => void;
  /** Abre el panel derecho en la pestaña de lectura en voz. */
  onMostrarLector: () => void;
  panelLista: boolean;
  setPanelLista: (v: boolean) => void;
  modoEnfoque: boolean;
  setModoEnfoque: (v: boolean) => void;
  pestana: Pestana;
  setPestana: (p: Pestana) => void;
}

/* ─────────────── Piezas de la cinta ─────────────── */

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col justify-between border-r border-pergamino-200 px-2 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <p className="mt-1 text-center font-sans text-[10px] uppercase tracking-[0.14em] text-tinta-400">{titulo}</p>
    </div>
  );
}

interface BotonProps {
  activo?: boolean;
  titulo: string;
  onClick: () => void;
  children: ReactNode;
  ancho?: boolean;
  deshabilitado?: boolean;
}

function Boton({ activo, titulo, onClick, children, ancho, deshabilitado }: BotonProps) {
  return (
    <button
      type="button"
      title={titulo}
      aria-label={titulo}
      aria-pressed={activo}
      disabled={deshabilitado}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 font-sans text-sm text-tinta-800 transition hover:border-pergamino-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40",
        activo && "border-oro-500/60 bg-oro-100 text-tinta-900 shadow-inner",
        ancho && "px-2.5",
      )}
    >
      {children}
    </button>
  );
}

function Letra({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-serif text-[15px] font-bold leading-none", className)}>{children}</span>;
}

function Desplegable({
  etiqueta,
  icono,
  children,
  ancho = "w-56",
}: {
  etiqueta: string;
  icono?: string;
  children: (cerrar: () => void) => ReactNode;
  ancho?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!abierto) return;
    const manejar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", manejar);
    return () => document.removeEventListener("mousedown", manejar);
  }, [abierto]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setAbierto((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1 rounded-md border border-transparent px-2 font-sans text-sm text-tinta-800 transition hover:border-pergamino-300 hover:bg-white",
          abierto && "border-pergamino-300 bg-white",
        )}
      >
        {icono && <Icono nombre={icono} tamano={16} />}
        <span>{etiqueta}</span>
        <Icono nombre="flechaAbajo" tamano={12} />
      </button>
      {abierto && (
        <div
          className={cn(
            "absolute left-0 top-9 z-40 rounded-lg border border-pergamino-300 bg-white p-1.5 shadow-elevada",
            ancho,
          )}
        >
          {children(() => setAbierto(false))}
        </div>
      )}
    </div>
  );
}

function ItemMenu({ onClick, children, icono }: { onClick: () => void; children: ReactNode; icono?: string }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left font-sans text-sm text-tinta-800 hover:bg-pergamino-100"
    >
      {icono && <Icono nombre={icono} tamano={15} className="text-tinta-500" />}
      {children}
    </button>
  );
}

function PaletaColores({
  colores,
  onElegir,
  titulo,
  icono,
  transparente,
}: {
  colores: string[];
  onElegir: (c: string) => void;
  titulo: string;
  icono: ReactNode;
  transparente?: boolean;
}) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!abierto) return;
    const manejar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", manejar);
    return () => document.removeEventListener("mousedown", manejar);
  }, [abierto]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        title={titulo}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setAbierto((v) => !v)}
        className="flex h-8 items-center gap-0.5 rounded-md border border-transparent px-1.5 text-tinta-800 hover:border-pergamino-300 hover:bg-white"
      >
        {icono}
        <Icono nombre="flechaAbajo" tamano={11} />
      </button>
      {abierto && (
        <div className="absolute left-0 top-9 z-40 w-44 rounded-lg border border-pergamino-300 bg-white p-2 shadow-elevada">
          <div className="grid grid-cols-8 gap-1">
            {colores.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onElegir(c);
                  setAbierto(false);
                }}
                className="h-4 w-4 rounded-sm border border-black/10"
                style={{
                  background:
                    c === "transparent"
                      ? "repeating-linear-gradient(45deg,#fff 0 3px,#ddd 3px 6px)"
                      : c,
                }}
              />
            ))}
          </div>
          <label className="mt-2 flex cursor-pointer items-center justify-between rounded-md px-1 py-1 font-sans text-xs text-tinta-700 hover:bg-pergamino-100">
            Otro color…
            <input
              type="color"
              className="h-5 w-8 cursor-pointer border-0 bg-transparent p-0"
              onChange={(e) => {
                onElegir(e.target.value);
                setAbierto(false);
              }}
            />
          </label>
          {transparente && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onElegir("transparent");
                setAbierto(false);
              }}
              className="mt-1 w-full rounded-md px-1 py-1 text-left font-sans text-xs text-tinta-700 hover:bg-pergamino-100"
            >
              Sin resaltado
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────── Cinta ─────────────── */

function GrupoBiblia({ biblia }: { biblia: AccionesBiblia }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Grupo titulo="Panel">
        <Boton titulo="Mostrar u ocultar la Biblia" ancho activo={biblia.visible} onClick={biblia.alternar}>
          <Icono nombre="biblia" />
          <span>Biblia NVI</span>
        </Boton>
      </Grupo>
      <Grupo titulo="Ir a">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const err = biblia.irA(texto);
            setError(err);
            if (!err) setTexto("");
          }}
          className="flex items-center gap-1"
        >
          <input
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Juan 3:16"
            title={error ?? "Escribe una referencia y pulsa Enter"}
            className={cn(
              "h-8 w-32 rounded-md border bg-white px-2 font-sans text-sm text-tinta-800 focus:outline-none",
              error ? "border-vino-600" : "border-pergamino-300 focus:border-oro-600",
            )}
          />
          <button type="submit" className="h-8 rounded-md border border-pergamino-300 px-2 font-sans text-sm text-tinta-800 hover:bg-white">
            Ir
          </button>
        </form>
        <Boton titulo="Abrir en la Biblia la referencia seleccionada en el documento (Ctrl+Mayús+B)" ancho onClick={biblia.abrirReferenciaSeleccionada}>
          <Icono nombre="buscar" />
          <span>Referencia seleccionada</span>
        </Boton>
      </Grupo>
      <Grupo titulo="Versículos">
        <Boton
          titulo={biblia.haySeleccion ? `Insertar ${biblia.referenciaSeleccion} en el cursor` : "Selecciona versículos en el panel de la Biblia"}
          ancho
          deshabilitado={!biblia.haySeleccion}
          onClick={biblia.insertarSeleccion}
        >
          <Icono nombre="cita" />
          <span>{biblia.haySeleccion ? `Insertar ${biblia.referenciaSeleccion}` : "Insertar selección"}</span>
        </Boton>
        <Boton titulo={`Escuchar ${biblia.referenciaCapitulo}`} ancho onClick={biblia.escucharCapitulo}>
          <Icono nombre="volumen" />
          <span>Escuchar capítulo</span>
        </Boton>
        <label className="flex h-8 cursor-pointer items-center gap-1.5 px-1.5 font-sans text-xs text-tinta-700">
          <input type="checkbox" checked={biblia.conNumeros} onChange={(e) => biblia.setConNumeros(e.target.checked)} className="accent-vino-700" />
          Con números
        </label>
      </Grupo>
      <Grupo titulo="Comparar">
        <select
          value={biblia.comparar ?? ""}
          onChange={(e) => biblia.setComparar(e.target.value || null)}
          className="h-8 w-44 rounded-md border border-pergamino-300 bg-white px-2 font-sans text-sm text-tinta-800"
          title="Mostrar otra versión debajo de cada versículo"
        >
          <option value="">Solo NVI</option>
          <option value="RV1960">NVI + Reina-Valera 1960</option>
          <option value="NTV">NVI + NTV</option>
          <option value="LBLA">NVI + LBLA</option>
          <option value="PDT">NVI + Palabra de Dios para Todos</option>
          <option value="BTX3">NVI + Biblia Textual</option>
          <option value="RV2004">NVI + Reina Valera Gómez</option>
        </select>
      </Grupo>
      <Grupo titulo="Sin conexión">
        {biblia.descargada ? (
          <span className="flex h-8 items-center gap-1.5 px-1.5 font-sans text-xs text-oliva-700">
            <Icono nombre="check" tamano={14} /> NVI guardada en este equipo
          </span>
        ) : (
          <Boton titulo="Descargar la NVI completa (unos 2 MB) para leer y buscar sin internet" ancho onClick={biblia.descargar} deshabilitado={biblia.descargando}>
            <Icono nombre="descargar" />
            <span>{biblia.descargando ? "Descargando…" : "Descargar NVI"}</span>
          </Boton>
        )}
      </Grupo>
    </>
  );
}

export function Cinta({
  estado,
  acciones,
  biblia,
  voz,
  zoom,
  setZoom,
  panelLector,
  setPanelLector,
  onMostrarLector,
  panelLista,
  setPanelLista,
  modoEnfoque,
  setModoEnfoque,
  pestana,
  setPestana,
}: Props) {
  const pestanas: { id: Pestana; etiqueta: string }[] = [
    { id: "inicio", etiqueta: "Inicio" },
    { id: "insertar", etiqueta: "Insertar" },
    { id: "biblia", etiqueta: "Biblia" },
    { id: "voz", etiqueta: "Voz" },
    { id: "vista", etiqueta: "Vista" },
  ];

  const bloqueActual = estado.bloque || "p";
  const fuenteActual =
    FUENTES.find((f) => estado.fuente && f.css.toLowerCase().includes(estado.fuente.toLowerCase().split(",")[0]))?.css ??
    FUENTES[0].css;

  const entradaImagenRef = useRef<HTMLInputElement>(null);
  const [cargandoImagen, setCargandoImagen] = useState(false);

  const elegirImagen = async (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;
    setCargandoImagen(true);
    try {
      const dataUrl = await prepararImagen(archivo);
      acciones.insertarHtml(`<p><img src="${dataUrl}" alt="" /></p><p></p>`);
    } catch {
      window.alert("No se pudo insertar la imagen. Prueba con otro archivo.");
    } finally {
      setCargandoImagen(false);
    }
  };

  return (
    <div className="no-imprimir border-b border-pergamino-300 bg-pergamino-100/90 backdrop-blur">
      {/* Pestañas */}
      <div className="flex items-end gap-0.5 px-2 pt-1.5">
        <Desplegable etiqueta="Archivo" icono="archivo" ancho="w-64">
          {(cerrar) => (
            <>
              <ItemMenu icono="guardar" onClick={() => { acciones.guardar(); cerrar(); }}>
                Guardar ahora <span className="ml-auto text-xs text-tinta-400">Ctrl+S</span>
              </ItemMenu>
              <ItemMenu icono="restaurar" onClick={() => { acciones.restaurar(); cerrar(); }}>
                Restaurar el bosquejo original
              </ItemMenu>
              <div className="my-1 border-t border-pergamino-200" />
              <ItemMenu icono="descargar" onClick={() => { acciones.exportar("doc"); cerrar(); }}>
                Descargar como Word (.doc)
              </ItemMenu>
              <ItemMenu icono="descargar" onClick={() => { acciones.exportar("html"); cerrar(); }}>
                Descargar como página web (.html)
              </ItemMenu>
              <ItemMenu icono="descargar" onClick={() => { acciones.exportar("txt"); cerrar(); }}>
                Descargar como texto (.txt)
              </ItemMenu>
              <ItemMenu icono="copiar" onClick={() => { acciones.copiarTexto(); cerrar(); }}>
                Copiar todo el documento
              </ItemMenu>
              <div className="my-1 border-t border-pergamino-200" />
              <ItemMenu icono="imprimir" onClick={() => { acciones.imprimir(); cerrar(); }}>
                Imprimir <span className="ml-auto text-xs text-tinta-400">Ctrl+P</span>
              </ItemMenu>
            </>
          )}
        </Desplegable>
        {pestanas.map((p) => (
          <button
            key={p.id}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setPestana(p.id)}
            className={cn(
              "rounded-t-md px-3.5 py-1.5 font-sans text-sm font-medium transition",
              pestana === p.id
                ? "border border-b-0 border-pergamino-300 bg-white text-vino-800"
                : "text-tinta-700 hover:text-tinta-900",
            )}
          >
            {p.etiqueta}
          </button>
        ))}
      </div>

      {/* Contenido de la pestaña */}
      <div className="scroll-suave flex min-h-[74px] items-stretch gap-0 overflow-x-auto border-t border-pergamino-300 bg-white px-1 py-1.5">
        {pestana === "inicio" && (
          <>
            <Grupo titulo="Historial">
              <Boton titulo="Deshacer (Ctrl+Z)" onClick={() => acciones.ejecutar("undo")}>
                <Icono nombre="deshacer" />
              </Boton>
              <Boton titulo="Rehacer (Ctrl+Y)" onClick={() => acciones.ejecutar("redo")}>
                <Icono nombre="rehacer" />
              </Boton>
            </Grupo>

            <Grupo titulo="Fuente">
              <select
                title="Fuente"
                value={fuenteActual}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => acciones.aplicarFuente(e.target.value)}
                className="h-8 w-40 rounded-md border border-pergamino-300 bg-white px-2 font-sans text-sm text-tinta-800"
              >
                {FUENTES.map((f) => (
                  <option key={f.nombre} value={f.css} style={{ fontFamily: f.css }}>
                    {f.nombre}
                  </option>
                ))}
              </select>
              <select
                title="Tamaño"
                defaultValue={12}
                onChange={(e) => acciones.aplicarTamano(Number(e.target.value))}
                className="h-8 w-16 rounded-md border border-pergamino-300 bg-white px-1.5 font-sans text-sm text-tinta-800"
              >
                {TAMANOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <Boton titulo="Negrita (Ctrl+B)" activo={estado.negrita} onClick={() => acciones.ejecutar("bold")}>
                <Letra>N</Letra>
              </Boton>
              <Boton titulo="Cursiva (Ctrl+I)" activo={estado.cursiva} onClick={() => acciones.ejecutar("italic")}>
                <Letra className="italic font-semibold">K</Letra>
              </Boton>
              <Boton titulo="Subrayado (Ctrl+U)" activo={estado.subrayado} onClick={() => acciones.ejecutar("underline")}>
                <Letra className="underline underline-offset-2">S</Letra>
              </Boton>
              <Boton titulo="Tachado" activo={estado.tachado} onClick={() => acciones.ejecutar("strikeThrough")}>
                <Icono nombre="tachado" />
              </Boton>
              <Boton titulo="Superíndice" onClick={() => acciones.ejecutar("superscript")}>
                <span className="font-serif text-sm">x<sup className="text-[9px]">2</sup></span>
              </Boton>
              <PaletaColores
                titulo="Color de fuente"
                colores={COLORES_TEXTO}
                onElegir={acciones.colorTexto}
                icono={
                  <span className="flex flex-col items-center leading-none">
                    <span className="font-serif text-[15px] font-bold">A</span>
                    <span className="mt-0.5 h-1 w-4 rounded-sm bg-vino-700" />
                  </span>
                }
              />
              <PaletaColores
                titulo="Color de resaltado"
                colores={COLORES_RESALTADO}
                onElegir={acciones.resaltar}
                transparente
                icono={
                  <span className="flex flex-col items-center leading-none">
                    <span className="font-serif text-[15px] font-bold">ab</span>
                    <span className="mt-0.5 h-1 w-4 rounded-sm bg-[#fff2a8]" />
                  </span>
                }
              />
              <Desplegable etiqueta="Aa" ancho="w-52">
                {(cerrar) => (
                  <>
                    <ItemMenu onClick={() => { acciones.cambiarCaso("oracion"); cerrar(); }}>Tipo oración</ItemMenu>
                    <ItemMenu onClick={() => { acciones.cambiarCaso("minusculas"); cerrar(); }}>minúsculas</ItemMenu>
                    <ItemMenu onClick={() => { acciones.cambiarCaso("mayusculas"); cerrar(); }}>MAYÚSCULAS</ItemMenu>
                    <ItemMenu onClick={() => { acciones.cambiarCaso("titulo"); cerrar(); }}>Poner En Mayúsculas Cada Palabra</ItemMenu>
                  </>
                )}
              </Desplegable>
              <Boton titulo="Borrar formato" onClick={acciones.limpiarFormato}>
                <Icono nombre="borrador" />
              </Boton>
            </Grupo>

            <Grupo titulo="Párrafo">
              <Boton titulo="Viñetas" activo={estado.listaVinetas} onClick={() => acciones.ejecutar("insertUnorderedList")}>
                <Icono nombre="listaVinetas" />
              </Boton>
              <Boton titulo="Numeración" activo={estado.listaNumerada} onClick={() => acciones.ejecutar("insertOrderedList")}>
                <Icono nombre="listaNumerada" />
              </Boton>
              <Boton titulo="Disminuir sangría" onClick={() => acciones.ejecutar("outdent")}>
                <Icono nombre="sangriaMenos" />
              </Boton>
              <Boton titulo="Aumentar sangría" onClick={() => acciones.ejecutar("indent")}>
                <Icono nombre="sangriaMas" />
              </Boton>
              <span className="mx-0.5 h-6 w-px bg-pergamino-200" />
              <Boton titulo="Alinear a la izquierda" activo={estado.izquierda} onClick={() => acciones.ejecutar("justifyLeft")}>
                <Icono nombre="alinIzq" />
              </Boton>
              <Boton titulo="Centrar" activo={estado.centro} onClick={() => acciones.ejecutar("justifyCenter")}>
                <Icono nombre="alinCentro" />
              </Boton>
              <Boton titulo="Alinear a la derecha" activo={estado.derecha} onClick={() => acciones.ejecutar("justifyRight")}>
                <Icono nombre="alinDer" />
              </Boton>
              <Boton titulo="Justificar" activo={estado.justificado} onClick={() => acciones.ejecutar("justifyFull")}>
                <Icono nombre="justificar" />
              </Boton>
            </Grupo>

            <Grupo titulo="Estilos">
              {(
                [
                  { id: "p", etiqueta: "Normal", clase: "font-sans text-sm" },
                  { id: "h1", etiqueta: "Título", clase: "font-serif text-base font-bold" },
                  { id: "h2", etiqueta: "Punto", clase: "font-serif text-[15px] font-semibold text-vino-800" },
                  { id: "h3", etiqueta: "Subpunto", clase: "font-serif text-sm font-semibold" },
                  { id: "blockquote", etiqueta: "Versículo", clase: "font-serif text-sm italic" },
                ] as { id: Bloque; etiqueta: string; clase: string }[]
              ).map((b) => (
                <Boton key={b.id} titulo={b.etiqueta} ancho activo={bloqueActual === b.id} onClick={() => acciones.aplicarBloque(b.id)}>
                  <span className={b.clase}>{b.etiqueta}</span>
                </Boton>
              ))}
            </Grupo>

            <Grupo titulo="Edición">
              <Boton titulo="Buscar y reemplazar (Ctrl+F)" ancho onClick={acciones.abrirBuscar}>
                <Icono nombre="buscar" />
                <span>Buscar</span>
              </Boton>
              <Boton titulo="Seleccionar todo (Ctrl+A)" ancho onClick={() => acciones.ejecutar("selectAll")}>
                <span>Seleccionar todo</span>
              </Boton>
            </Grupo>
          </>
        )}

        {pestana === "insertar" && (
          <>
            <Grupo titulo="Bloques">
              <Boton
                titulo="Insertar bloque de versículo"
                ancho
                onClick={() =>
                  acciones.insertarHtml(
                    '<blockquote class="versiculo"><p><strong>Referencia</strong> <span class="nota">(NVI)</span></p><p>«Escribe aquí el texto del versículo»</p></blockquote><p></p>',
                  )
                }
              >
                <Icono nombre="cita" />
                <span>Versículo</span>
              </Boton>
              <Boton titulo="Insertar punto del bosquejo" ancho onClick={() => acciones.insertarHtml('<h2>Nuevo punto</h2><p class="referencia">Referencia</p><p></p>')}>
                <Icono nombre="mas" />
                <span>Punto</span>
              </Boton>
              <Boton titulo="Insertar nota para el predicador" ancho onClick={() => acciones.insertarHtml('<p class="nota"><em>Nota: </em></p>')}>
                <Icono nombre="ojo" />
                <span>Nota</span>
              </Boton>
              <Boton titulo="Insertar línea horizontal" ancho onClick={() => acciones.ejecutar("insertHorizontalRule")}>
                <Icono nombre="linea" />
                <span>Línea</span>
              </Boton>
              <Boton titulo="Insertar pausa de lectura (se lee como silencio breve)" ancho onClick={() => acciones.insertarHtml('<p class="nota"><em>— pausa —</em></p><p></p>')}>
                <Icono nombre="reloj" />
                <span>Pausa</span>
              </Boton>
            </Grupo>

            <Grupo titulo="Imagen">
              <input
                ref={entradaImagenRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={elegirImagen}
              />
              <Boton
                titulo="Insertar una imagen desde tu dispositivo"
                ancho
                deshabilitado={cargandoImagen}
                onClick={() => entradaImagenRef.current?.click()}
              >
                <Icono nombre="imagen" />
                <span>{cargandoImagen ? "Cargando…" : "Imagen"}</span>
              </Boton>
            </Grupo>

            <Grupo titulo="Símbolos">
              {["«", "»", "—", "–", "…", "“", "”", "¿", "¡", "·", "†", "✝", "→", "•"].map((s) => (
                <Boton key={s} titulo={`Insertar ${s}`} onClick={() => acciones.insertarTexto(s)}>
                  <span className="font-serif text-base">{s}</span>
                </Boton>
              ))}
            </Grupo>

            <Grupo titulo="Fecha">
              <Boton
                titulo="Insertar la fecha de hoy"
                ancho
                onClick={() =>
                  acciones.insertarTexto(
                    new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                  )
                }
              >
                <Icono nombre="fecha" />
                <span>Fecha de hoy</span>
              </Boton>
            </Grupo>
          </>
        )}

        {pestana === "biblia" && <GrupoBiblia biblia={biblia} />}

        {pestana === "voz" && (
          <>
            <Grupo titulo="Reproducción">
              <Boton titulo="Leer todo el documento" ancho onClick={acciones.leerTodo} deshabilitado={!voz.soportado}>
                <Icono nombre="reproducir" />
                <span>Leer todo</span>
              </Boton>
              <Boton titulo="Leer desde el cursor" ancho onClick={acciones.leerDesdeCursor} deshabilitado={!voz.soportado}>
                <Icono nombre="cursor" />
                <span>Desde el cursor</span>
              </Boton>
              <Boton titulo="Leer solo el texto seleccionado" ancho onClick={acciones.leerSeleccion} deshabilitado={!voz.soportado}>
                <Icono nombre="ojo" />
                <span>Selección</span>
              </Boton>
              <span className="mx-0.5 h-6 w-px bg-pergamino-200" />
              <Boton titulo="Fragmento anterior" onClick={() => voz.saltar(-1)} deshabilitado={voz.estado === "inactivo"}>
                <Icono nombre="anterior" />
              </Boton>
              {voz.estado === "hablando" ? (
                <Boton titulo="Pausar" onClick={voz.pausar}>
                  <Icono nombre="pausa" />
                </Boton>
              ) : (
                <Boton titulo="Reanudar" onClick={voz.reanudar} deshabilitado={voz.estado !== "pausado"}>
                  <Icono nombre="reproducir" />
                </Boton>
              )}
              <Boton titulo="Detener" onClick={voz.detener} deshabilitado={voz.estado === "inactivo"}>
                <Icono nombre="detener" />
              </Boton>
              <Boton titulo="Fragmento siguiente" onClick={() => voz.saltar(1)} deshabilitado={voz.estado === "inactivo"}>
                <Icono nombre="siguiente" />
              </Boton>
            </Grupo>

            <Grupo titulo="Voz del sistema">
              <select
                title="Voz"
                value={voz.vozActual?.voiceURI ?? ""}
                onChange={(e) => voz.actualizarPrefs({ vozUri: e.target.value })}
                className="h-8 w-64 rounded-md border border-pergamino-300 bg-white px-2 font-sans text-sm text-tinta-800"
                disabled={!voz.soportado || voz.voces.length === 0}
              >
                {voz.voces.length === 0 && <option value="">Cargando voces del sistema…</option>}
                {voz.voces.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} · {v.lang}{v.localService ? "" : " · en línea"}
                  </option>
                ))}
              </select>
              <Boton titulo="Probar la voz" ancho onClick={voz.probarVoz} deshabilitado={!voz.soportado}>
                <Icono nombre="volumen" />
                <span>Probar</span>
              </Boton>
            </Grupo>

            <Grupo titulo="Ajustes">
              <label className="flex items-center gap-2 px-1 font-sans text-xs text-tinta-700">
                <span className="w-16">Velocidad</span>
                <input
                  type="range"
                  min={0.5}
                  max={1.8}
                  step={0.05}
                  value={voz.prefs.velocidad}
                  onChange={(e) => voz.actualizarPrefs({ velocidad: Number(e.target.value) })}
                  className="w-28 accent-vino-700"
                />
                <span className="w-9 tabular-nums">{voz.prefs.velocidad.toFixed(2)}×</span>
              </label>
              <label className="flex items-center gap-2 px-1 font-sans text-xs text-tinta-700">
                <span className="w-16">Tono</span>
                <input
                  type="range"
                  min={0.5}
                  max={1.6}
                  step={0.05}
                  value={voz.prefs.tono}
                  onChange={(e) => voz.actualizarPrefs({ tono: Number(e.target.value) })}
                  className="w-28 accent-vino-700"
                />
                <span className="w-9 tabular-nums">{voz.prefs.tono.toFixed(2)}</span>
              </label>
              <label className="flex items-center gap-2 px-1 font-sans text-xs text-tinta-700">
                <span className="w-16">Volumen</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={voz.prefs.volumen}
                  onChange={(e) => voz.actualizarPrefs({ volumen: Number(e.target.value) })}
                  className="w-28 accent-vino-700"
                />
                <span className="w-9 tabular-nums">{Math.round(voz.prefs.volumen * 100)}%</span>
              </label>
            </Grupo>

            <Grupo titulo="Lector">
              <Boton titulo="Mostrar u ocultar el panel de lectura (teleprompter)" ancho activo={panelLector} onClick={() => (panelLector ? setPanelLector(false) : onMostrarLector())}>
                <Icono nombre="panel" />
                <span>Panel de lectura</span>
              </Boton>
            </Grupo>
          </>
        )}

        {pestana === "vista" && (
          <>
            <Grupo titulo="Zoom">
              <Boton titulo="Alejar" onClick={() => setZoom(Math.max(0.5, Math.round((zoom - 0.1) * 10) / 10))}>
                <Icono nombre="zoomMenos" />
              </Boton>
              <span className="w-12 text-center font-sans text-sm tabular-nums text-tinta-800">{Math.round(zoom * 100)}%</span>
              <Boton titulo="Acercar" onClick={() => setZoom(Math.min(2, Math.round((zoom + 0.1) * 10) / 10))}>
                <Icono nombre="zoomMas" />
              </Boton>
              <Boton titulo="Tamaño real" ancho onClick={() => setZoom(1)}>
                <span>100%</span>
              </Boton>
            </Grupo>
            <Grupo titulo="Paneles">
              <Boton titulo="Lista de mensajes" ancho activo={panelLista} onClick={() => setPanelLista(!panelLista)}>
                <Icono nombre="libro" />
                <span>Mensajes</span>
              </Boton>
              <Boton titulo="Panel lateral (Biblia y lectura en voz)" ancho activo={panelLector} onClick={() => (panelLector ? setPanelLector(false) : onMostrarLector())}>
                <Icono nombre="panel" />
                <span>Panel lateral</span>
              </Boton>
              <Boton titulo="Modo enfoque: oculta los paneles y amplía la hoja" ancho activo={modoEnfoque} onClick={() => setModoEnfoque(!modoEnfoque)}>
                <Icono nombre="ojo" />
                <span>Enfoque</span>
              </Boton>
            </Grupo>
          </>
        )}
      </div>
    </div>
  );
}
