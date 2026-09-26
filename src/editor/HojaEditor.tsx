import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface Props {
  htmlInicial: string;
  zoom: number;
  onCambio: (raiz: HTMLElement) => void;
  onSeleccion: () => void;
}

/**
 * Hoja de edición. El contenido se carga una sola vez al montar; el componente
 * padre la vuelve a montar (cambiando su `key`) cuando cambia de documento.
 */
export const HojaEditor = forwardRef<HTMLDivElement, Props>(function HojaEditor(
  { htmlInicial, zoom, onCambio, onSeleccion },
  ref,
) {
  const interno = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => interno.current as HTMLDivElement);

  useEffect(() => {
    if (interno.current) interno.current.innerHTML = htmlInicial;
    // Solo al montar: el padre controla la recarga mediante `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hoja-fondo scroll-suave flex-1 overflow-auto px-3 py-6 sm:px-8">
      <div className="hoja mx-auto" style={{ zoom }}>
        <div
          ref={interno}
          className="documento outline-none"
          contentEditable
          suppressContentEditableWarning
          spellCheck
          lang="es"
          role="textbox"
          aria-multiline="true"
          aria-label="Documento del mensaje"
          onInput={() => interno.current && onCambio(interno.current)}
          onKeyUp={onSeleccion}
          onMouseUp={onSeleccion}
          onFocus={onSeleccion}
          onPaste={(e) => {
            // Pegar como texto sin formato para mantener el documento limpio.
            const texto = e.clipboardData.getData("text/plain");
            if (!texto) return;
            e.preventDefault();
            document.execCommand("insertText", false, texto);
          }}
        />
      </div>
    </div>
  );
});
