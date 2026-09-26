import type { Tema } from "../data/temas";
import { cn } from "../utils/cn";

interface Props {
  tema: Tema;
  escogido: boolean;
  enListaCorta: boolean;
  onAbrir: (t: Tema) => void;
  onAlternarListaCorta: (id: string) => void;
  indice: number;
}

export function TarjetaTema({ tema, escogido, enListaCorta, onAbrir, onAlternarListaCorta, indice }: Props) {
  return (
    <article
      className={cn(
        "animate-subir group relative flex flex-col overflow-hidden rounded-2xl border bg-white/80 shadow-suave transition duration-300 hover:-translate-y-1 hover:shadow-elevada",
        escogido ? "border-oro-600 ring-2 ring-oro-500/40" : "border-pergamino-200 hover:border-oro-500/60",
      )}
      style={{ animationDelay: `${indice * 60}ms` }}
    >
      {escogido && (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-oro-600 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          Escogido
        </div>
      )}

      <button
        type="button"
        onClick={() => onAbrir(tema)}
        className="flex flex-1 flex-col p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-vino-600"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-5xl font-semibold leading-none text-pergamino-300 transition group-hover:text-oro-500">
            {String(tema.numero).padStart(2, "0")}
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-vino-700">
            {tema.textoBase.referencia}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-tinta-900 sm:text-[1.7rem]">
          {tema.titulo}
        </h3>
        <p className="mt-1.5 font-serif text-lg italic leading-snug text-tinta-700">{tema.subtitulo}</p>

        <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-tinta-700">{tema.ideaCentral}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tema.etiquetas.map((e) => (
            <span
              key={e}
              className="rounded-full bg-pergamino-100 px-2.5 py-1 font-sans text-[11px] font-medium text-tinta-700 ring-1 ring-pergamino-200"
            >
              {e}
            </span>
          ))}
        </div>
      </button>

      <div className="flex items-center justify-between border-t border-pergamino-200 bg-pergamino-50/70 px-6 py-3">
        <button
          type="button"
          onClick={() => onAbrir(tema)}
          className="font-sans text-sm font-semibold text-vino-700 transition hover:text-vino-900"
        >
          Ver desarrollo →
        </button>
        <button
          type="button"
          aria-pressed={enListaCorta}
          aria-label={enListaCorta ? "Quitar de la lista corta" : "Guardar en la lista corta"}
          onClick={() => onAlternarListaCorta(tema.id)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition",
            enListaCorta
              ? "border-oro-600 bg-oro-100 text-oro-700"
              : "border-pergamino-300 text-tinta-500 hover:border-oro-600 hover:text-oro-700",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill={enListaCorta ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-7-4-7 4V4.5Z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
