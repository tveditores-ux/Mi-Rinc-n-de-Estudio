import { SELECCION } from "../data/seleccion";
import { TEMAS } from "../data/temas";
import { cn } from "../utils/cn";
import { Icono } from "./Iconos";
import type { Documentos } from "./useDocumentos";

interface Props {
  docs: Documentos;
  onIrBiblioteca: () => void;
  onCerrarPanel?: () => void;
}

function formatoHora(ms: number | null) {
  if (!ms) return null;
  const d = new Date(ms);
  const hoy = new Date();
  const mismoDia = d.toDateString() === hoy.toDateString();
  return mismoDia
    ? d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export function ListaDocumentos({ docs, onIrBiblioteca, onCerrarPanel }: Props) {
  const seleccion = docs.documentos.filter((d) => d.grupo === "seleccion");
  const extras = docs.documentos.filter((d) => d.grupo === "extra");

  return (
    <aside className="flex h-full w-full flex-col border-r border-pergamino-300 bg-pergamino-50">
      <div className="border-b border-pergamino-200 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-oro-700">Serie</p>
            <h2 className="font-serif text-xl font-semibold leading-tight text-tinta-900">{SELECCION.nombre}</h2>
            <p className="mt-1 font-sans text-xs text-tinta-500">{seleccion.length} mensajes · en orden de predicación</p>
          </div>
          {onCerrarPanel && (
            <button type="button" onClick={onCerrarPanel} className="rounded-md p-1 text-tinta-500 hover:bg-pergamino-200 lg:hidden" aria-label="Cerrar lista">
              <Icono nombre="cerrar" tamano={16} />
            </button>
          )}
        </div>
      </div>

      <div className="scroll-suave flex-1 overflow-y-auto p-2">
        <ol className="space-y-1">
          {seleccion.map((d) => {
            const activo = docs.activo?.id === d.id;
            const editado = docs.estaEditado(d.id);
            const hora = formatoHora(docs.ultimaEdicion(d.id));
            return (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => docs.setActivoId(d.id)}
                  className={cn(
                    "group flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition",
                    activo
                      ? "border-oro-500/70 bg-white shadow-suave"
                      : "border-transparent hover:border-pergamino-300 hover:bg-white/70",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-base font-semibold",
                      activo ? "bg-vino-700 text-pergamino-50" : "bg-pergamino-200 text-tinta-700",
                    )}
                  >
                    {d.orden}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[15px] font-semibold leading-tight text-tinta-900">
                      {docs.obtenerTitulo(d)}
                    </span>
                    <span className="mt-0.5 block truncate font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-vino-700">
                      {d.referencias.join(" · ")}
                    </span>
                    <span className="mt-1 flex items-center gap-2 font-sans text-[11px] text-tinta-500">
                      {editado ? (
                        <>
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-oliva-700" />
                          Editado {hora ? `· ${hora}` : ""}
                        </>
                      ) : (
                        <>
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-pergamino-300" />
                          Bosquejo original
                        </>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {extras.length > 0 && (
          <>
            <p className="mt-5 px-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-tinta-500">
              Otros abiertos desde la biblioteca
            </p>
            <ul className="mt-1 space-y-1">
              {extras.map((d) => {
                const activo = docs.activo?.id === d.id;
                return (
                  <li key={d.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => docs.setActivoId(d.id)}
                      className={cn(
                        "flex min-w-0 flex-1 flex-col rounded-lg border px-3 py-2 text-left transition",
                        activo ? "border-oro-500/70 bg-white shadow-suave" : "border-transparent hover:border-pergamino-300 hover:bg-white/70",
                      )}
                    >
                      <span className="truncate font-serif text-[15px] font-semibold leading-tight text-tinta-900">{docs.obtenerTitulo(d)}</span>
                      <span className="truncate font-sans text-[11px] uppercase tracking-[0.12em] text-vino-700">{d.referencias.join(" · ")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => docs.cerrarExtra(d.id)}
                      className="rounded-md p-1.5 text-tinta-400 hover:bg-pergamino-200 hover:text-vino-700"
                      aria-label="Quitar de la lista"
                      title="Quitar de la lista (no borra tus cambios)"
                    >
                      <Icono nombre="cerrar" tamano={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="border-t border-pergamino-200 p-3">
        <button
          type="button"
          onClick={onIrBiblioteca}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-pergamino-300 bg-white px-3 py-2 font-sans text-sm font-medium text-tinta-800 transition hover:border-vino-600 hover:text-vino-800"
        >
          <Icono nombre="libro" tamano={16} />
          Añadir desde la biblioteca ({TEMAS.length} temas)
        </button>
      </div>
    </aside>
  );
}
