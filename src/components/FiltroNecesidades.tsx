import { NECESIDADES, SERIES, type Necesidad, type SerieId } from "../data/temas";
import { cn } from "../utils/cn";

interface Props {
  activa: Necesidad | null;
  onCambiar: (n: Necesidad | null) => void;
  conteo: Record<Necesidad, number>;
  serie: SerieId | null;
  onCambiarSerie: (s: SerieId | null) => void;
  total: number;
}

export function FiltroNecesidades({ activa, onCambiar, conteo, serie, onCambiarSerie, total }: Props) {
  return (
    <div className="no-imprimir">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-vino-700">
        ¿Qué necesita tu congregación hoy?
      </p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-tinta-900 sm:text-4xl">
        Los cuarenta temas, listos para escoger
      </h2>
      <p className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-tinta-700">
        Elige una serie, filtra por la necesidad pastoral que más ves en tu gente, o recorre la lista
        completa. Toca cualquier tema para ver su desarrollo y márcalo como escogido.
      </p>

      {/* Selector de serie */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCambiarSerie(null)}
          className={cn(
            "rounded-xl border px-4 py-2.5 text-left font-sans text-sm font-semibold transition",
            serie === null
              ? "border-tinta-900 bg-tinta-900 text-pergamino-50 shadow-suave"
              : "border-pergamino-300 bg-white/70 text-tinta-800 hover:border-tinta-500",
          )}
        >
          Todas las series
          <span className="ml-1.5 text-xs font-medium opacity-70">({total})</span>
        </button>
        {SERIES.map((s) => {
          const activaSerie = serie === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onCambiarSerie(activaSerie ? null : s.id)}
              className={cn(
                "flex flex-col rounded-xl border px-4 py-2 text-left transition",
                activaSerie
                  ? "border-vino-700 bg-vino-700 text-pergamino-50 shadow-suave"
                  : "border-pergamino-300 bg-white/70 text-tinta-800 hover:border-vino-600",
              )}
            >
              <span
                className={cn(
                  "font-sans text-[10px] font-semibold uppercase tracking-[0.2em]",
                  activaSerie ? "text-pergamino-200" : "text-oro-700",
                )}
              >
                {s.nombre}
              </span>
              <span className="font-serif text-base font-semibold leading-tight">{s.titulo}</span>
            </button>
          );
        })}
      </div>

      {/* Chips de necesidad */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCambiar(null)}
          className={cn(
            "rounded-full border px-4 py-2 font-sans text-sm font-medium transition",
            activa === null
              ? "border-tinta-900 bg-tinta-900 text-pergamino-50 shadow-suave"
              : "border-pergamino-300 bg-white/70 text-tinta-800 hover:border-tinta-500",
          )}
        >
          Todas las necesidades
        </button>
        {NECESIDADES.map((n) => {
          const seleccionada = activa === n.id;
          const sinResultados = conteo[n.id] === 0;
          return (
            <button
              key={n.id}
              type="button"
              title={n.descripcion}
              disabled={sinResultados && !seleccionada}
              onClick={() => onCambiar(seleccionada ? null : n.id)}
              className={cn(
                "group flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40",
                seleccionada
                  ? "border-vino-700 bg-vino-700 text-pergamino-50 shadow-suave"
                  : "border-pergamino-300 bg-white/70 text-tinta-800 hover:border-vino-600 hover:text-vino-800",
              )}
            >
              {n.etiqueta}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none",
                  seleccionada ? "bg-white/20 text-pergamino-50" : "bg-pergamino-200 text-tinta-700",
                )}
              >
                {conteo[n.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
