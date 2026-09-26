import { SERIES, type Tema } from "../data/temas";
import { cn } from "../utils/cn";

interface Props {
  temas: Tema[];
  escogidoId: string | null;
  onAbrir: (t: Tema) => void;
}

export function PieIndice({ temas, escogidoId, onAbrir }: Props) {
  return (
    <footer className="no-imprimir mt-20 border-t border-pergamino-200 bg-pergamino-100/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-vino-700">Índice rápido</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-tinta-900">Los cuarenta de un vistazo</h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-pergamino-200 bg-white/80 shadow-suave">
          <table className="w-full text-left">
            <thead className="bg-pergamino-100 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta-500">
              <tr>
                <th className="px-4 py-3 sm:px-6">#</th>
                <th className="px-4 py-3 sm:px-6">Tema</th>
                <th className="hidden px-4 py-3 sm:table-cell sm:px-6">Texto base</th>
                <th className="hidden px-4 py-3 md:table-cell md:px-6">Énfasis</th>
              </tr>
            </thead>
            {SERIES.map((s) => (
              <tbody key={s.id} className="divide-y divide-pergamino-200 border-t border-pergamino-200">
                <tr className="bg-oro-100/50">
                  <td colSpan={4} className="px-4 py-2.5 sm:px-6">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-oro-700">
                      {s.nombre}
                    </span>
                    <span className="ml-3 font-serif text-lg font-semibold text-tinta-900">{s.titulo}</span>
                  </td>
                </tr>
                {temas
                  .filter((t) => t.serie === s.id)
                  .map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => onAbrir(t)}
                      className={cn(
                        "cursor-pointer transition hover:bg-oro-100/50",
                        escogidoId === t.id && "bg-oro-100/70",
                      )}
                    >
                      <td className="px-4 py-3 font-serif text-xl font-semibold text-oro-600 sm:px-6">
                        {String(t.numero).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3 sm:px-6">
                        <p className="font-serif text-lg font-semibold leading-tight text-tinta-900">{t.titulo}</p>
                        <p className="font-sans text-xs text-tinta-500 sm:hidden">{t.textoBase.referencia}</p>
                      </td>
                      <td className="hidden px-4 py-3 font-sans text-sm font-medium text-vino-700 sm:table-cell sm:px-6">
                        {t.textoBase.referencia}
                      </td>
                      <td className="hidden px-4 py-3 font-sans text-sm text-tinta-700 md:table-cell md:px-6">
                        {t.etiquetas.join(" · ")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ))}
          </table>
        </div>

        <div className="linea-decorativa my-12" />

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-2xl italic leading-snug text-tinta-800 sm:text-3xl">
            «Y poderoso es Dios para hacer que abunde en vosotros toda gracia, a fin de que, teniendo
            siempre en todas las cosas todo lo suficiente, abundéis para toda buena obra.»
          </p>
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-oro-700">
            2 Corintios 9:8
          </p>
          <p className="mt-8 font-sans text-sm text-tinta-500">
            Predica la gracia con la misma seriedad con que otros predican la ley. El texto está de tu
            lado.
          </p>
          <p className="mt-6 font-sans text-[11px] leading-relaxed text-tinta-400">
            Textos base citados de la Reina-Valera 1960. Versículos del bosquejo tomados de la Santa
            Biblia, Nueva Versión Internacional® NVI® © 1999, 2015, 2022 por Biblica, Inc.® Usados con
            fines de estudio y predicación.
          </p>
        </div>
      </div>
    </footer>
  );
}
