import { useState } from "react";
import { temaComoTexto, type Tema } from "../data/temas";

interface Props {
  escogido: Tema | null;
  listaCorta: Tema[];
  onAbrir: (t: Tema) => void;
  onQuitarDeLista: (id: string) => void;
  onLimpiar: () => void;
}

export function BarraSeleccion({ escogido, listaCorta, onAbrir, onQuitarDeLista, onLimpiar }: Props) {
  const [copiado, setCopiado] = useState(false);
  const [expandida, setExpandida] = useState(false);

  if (!escogido && listaCorta.length === 0) return null;

  const copiar = async () => {
    if (!escogido) return;
    try {
      await navigator.clipboard.writeText(temaComoTexto(escogido));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* silencio */
    }
  };

  return (
    <div className="no-imprimir fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="animate-subir mx-auto max-w-6xl overflow-hidden rounded-2xl border border-tinta-800 bg-tinta-900 text-pergamino-50 shadow-elevada">
        {expandida && listaCorta.length > 0 && (
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-oro-500">
              Lista corta · {listaCorta.length} {listaCorta.length === 1 ? "tema" : "temas"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {listaCorta.map((t) => (
                <li key={t.id} className="flex items-center gap-1 rounded-full bg-white/10 pl-3 pr-1 text-sm">
                  <button type="button" onClick={() => onAbrir(t)} className="py-1.5 font-sans font-medium hover:text-oro-500">
                    {t.numero}. {t.titulo}
                  </button>
                  <button
                    type="button"
                    aria-label="Quitar de la lista corta"
                    onClick={() => onQuitarDeLista(t.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-pergamino-200 hover:bg-white/10"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            {escogido ? (
              <>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-oro-500">
                  Tema escogido para predicar
                </p>
                <button
                  type="button"
                  onClick={() => onAbrir(escogido)}
                  className="mt-0.5 block truncate text-left font-serif text-xl font-semibold leading-tight hover:text-oro-500 sm:text-2xl"
                >
                  {escogido.numero}. {escogido.titulo}
                  <span className="ml-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-pergamino-200/70">
                    {escogido.textoBase.referencia}
                  </span>
                </button>
              </>
            ) : (
              <>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-oro-500">
                  Todavía no has escogido
                </p>
                <p className="mt-0.5 font-serif text-xl font-semibold leading-tight">
                  Tienes {listaCorta.length} {listaCorta.length === 1 ? "tema guardado" : "temas guardados"} en tu lista corta
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {listaCorta.length > 0 && (
              <button
                type="button"
                onClick={() => setExpandida((v) => !v)}
                className="rounded-full border border-white/20 px-4 py-2 font-sans text-sm font-medium transition hover:bg-white/10"
              >
                {expandida ? "Ocultar lista" : `Lista corta (${listaCorta.length})`}
              </button>
            )}
            {escogido && (
              <>
                <button
                  type="button"
                  onClick={copiar}
                  className="rounded-full border border-white/20 px-4 py-2 font-sans text-sm font-medium transition hover:bg-white/10"
                >
                  {copiado ? "✓ Copiado" : "Copiar bosquejo"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-full bg-oro-600 px-4 py-2 font-sans text-sm font-semibold text-white transition hover:bg-oro-700"
                >
                  Imprimir
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onLimpiar}
              className="rounded-full px-3 py-2 font-sans text-sm text-pergamino-200/70 transition hover:text-white"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
