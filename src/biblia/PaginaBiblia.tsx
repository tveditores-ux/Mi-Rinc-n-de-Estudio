import { useEffect, useRef, useState } from "react";
import type { Documentos } from "../editor/useDocumentos";
import { useVoz } from "../editor/useVoz";
import { PanelBiblia } from "./PanelBiblia";
import { useBiblia } from "./useBiblia";

interface Props {
  docs: Documentos;
  /** Referencia a abrir al entrar (p. ej. desde la biblioteca). */
  referenciaInicial?: string | null;
  onReferenciaConsumida?: () => void;
  onIrEscritorio: () => void;
}

/**
 * Biblia a página completa: lectura cómoda, búsqueda y marcadores.
 * Los versículos seleccionados pueden anexarse al final del mensaje activo.
 */
export function PaginaBiblia({ docs, referenciaInicial, onReferenciaConsumida, onIrEscritorio }: Props) {
  const biblia = useBiblia();
  const voz = useVoz();
  const [aviso, setAviso] = useState<string | null>(null);
  const consumidaRef = useRef(false);

  useEffect(() => {
    if (!referenciaInicial || consumidaRef.current) return;
    consumidaRef.current = true;
    const t = window.setTimeout(() => {
      biblia.irA(referenciaInicial);
      onReferenciaConsumida?.();
    }, 0);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenciaInicial]);

  // Detener la voz solo al salir de la página (no en cada renderizado).
  const detenerRef = useRef(voz.detener);
  detenerRef.current = voz.detener;
  useEffect(() => () => detenerRef.current(), []);

  const mostrarAviso = (t: string) => {
    setAviso(t);
    window.setTimeout(() => setAviso(null), 2200);
  };

  const activo = docs.activo;

  return (
    <div className="relative flex h-[calc(100vh-44px)] flex-col overflow-hidden bg-pergamino-100">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-0 py-0 sm:px-6 sm:py-5">
        <div className="min-h-0 flex-1 overflow-hidden bg-white shadow-elevada sm:rounded-2xl sm:border sm:border-pergamino-300">
          <PanelBiblia
            biblia={biblia}
            voz={voz}
            modo="pagina"
            onInsertar={
              activo
                ? (html) => {
                    docs.anexarHtml(activo.id, html);
                  }
                : undefined
            }
            etiquetaInsertar={activo ? `Añadir a «${docs.obtenerTitulo(activo)}»` : "Añadir al mensaje"}
            onAviso={mostrarAviso}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2 font-sans text-[11px] text-tinta-500 sm:px-1">
          <span>
            {activo ? (
              <>
                Los versículos se añaden al final de <strong className="text-tinta-800">{docs.obtenerTitulo(activo)}</strong>.
              </>
            ) : (
              "No hay un mensaje activo."
            )}
          </span>
          <button type="button" onClick={onIrEscritorio} className="font-semibold text-vino-700 hover:text-vino-900">
            Ir al escritorio →
          </button>
        </div>
      </div>

      {aviso && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-tinta-900 px-4 py-2 font-sans text-sm text-pergamino-50 shadow-elevada">
          {aviso}
        </div>
      )}
    </div>
  );
}
