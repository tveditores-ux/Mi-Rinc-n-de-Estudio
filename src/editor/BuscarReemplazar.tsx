import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { marcarCoincidencias, quitarMarcas, reemplazarMarca } from "./comandos";
import { Icono } from "./Iconos";

interface Props {
  obtenerRaiz: () => HTMLElement | null;
  onCambio: () => void;
  onCerrar: () => void;
}

export function BuscarReemplazar({ obtenerRaiz, onCambio, onCerrar }: Props) {
  const [termino, setTermino] = useState("");
  const [reemplazo, setReemplazo] = useState("");
  const [mayusculas, setMayusculas] = useState(false);
  const [palabra, setPalabra] = useState(false);
  const [marcas, setMarcas] = useState<HTMLElement[]>([]);
  const [actual, setActual] = useState(0);
  const entradaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    entradaRef.current?.focus();
  }, []);

  const buscar = useCallback(() => {
    const raiz = obtenerRaiz();
    if (!raiz) return;
    const encontradas = marcarCoincidencias(raiz, termino, { distinguirMayusculas: mayusculas, palabraCompleta: palabra });
    setMarcas(encontradas);
    setActual(0);
  }, [obtenerRaiz, termino, mayusculas, palabra]);

  useEffect(() => {
    const t = setTimeout(buscar, 180);
    return () => clearTimeout(t);
  }, [buscar]);

  useEffect(() => {
    marcas.forEach((m, i) => m.classList.toggle("actual", i === actual));
    marcas[actual]?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [marcas, actual]);

  useEffect(() => {
    return () => {
      const raiz = obtenerRaiz();
      if (raiz) quitarMarcas(raiz);
    };
  }, [obtenerRaiz]);

  const siguiente = () => marcas.length && setActual((a) => (a + 1) % marcas.length);
  const anterior = () => marcas.length && setActual((a) => (a - 1 + marcas.length) % marcas.length);

  const reemplazarActual = () => {
    const marca = marcas[actual];
    if (!marca) return;
    reemplazarMarca(marca, reemplazo);
    onCambio();
    buscar();
  };

  const reemplazarTodo = () => {
    if (!marcas.length) return;
    marcas.forEach((m) => reemplazarMarca(m, reemplazo));
    obtenerRaiz()?.normalize();
    onCambio();
    buscar();
  };

  return (
    <div className="no-imprimir absolute right-4 top-2 z-30 w-[22rem] max-w-[calc(100vw-2rem)] rounded-xl border border-pergamino-300 bg-white p-3 shadow-elevada">
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-vino-700">Buscar y reemplazar</p>
        <button type="button" onClick={onCerrar} className="rounded-md p-1 text-tinta-500 hover:bg-pergamino-100" aria-label="Cerrar">
          <Icono nombre="cerrar" tamano={14} />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <input
          ref={entradaRef}
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.shiftKey ? anterior() : siguiente());
            if (e.key === "Escape") onCerrar();
          }}
          placeholder="Buscar…"
          className="h-8 flex-1 rounded-md border border-pergamino-300 px-2 font-sans text-sm"
        />
        <span className="w-14 text-right font-sans text-xs tabular-nums text-tinta-500">
          {marcas.length ? `${actual + 1}/${marcas.length}` : termino ? "0" : ""}
        </span>
        <button type="button" onClick={anterior} className="rounded-md border border-pergamino-300 p-1.5 hover:bg-pergamino-100" title="Anterior (Mayús+Enter)">
          <Icono nombre="anterior" tamano={13} />
        </button>
        <button type="button" onClick={siguiente} className="rounded-md border border-pergamino-300 p-1.5 hover:bg-pergamino-100" title="Siguiente (Enter)">
          <Icono nombre="siguiente" tamano={13} />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <input
          value={reemplazo}
          onChange={(e) => setReemplazo(e.target.value)}
          placeholder="Reemplazar por…"
          className="h-8 flex-1 rounded-md border border-pergamino-300 px-2 font-sans text-sm"
        />
        <button type="button" onClick={reemplazarActual} disabled={!marcas.length} className="h-8 rounded-md border border-pergamino-300 px-2 font-sans text-xs hover:bg-pergamino-100 disabled:opacity-40">
          Reemplazar
        </button>
        <button type="button" onClick={reemplazarTodo} disabled={!marcas.length} className="h-8 rounded-md bg-vino-700 px-2 font-sans text-xs font-semibold text-white hover:bg-vino-800 disabled:opacity-40">
          Todo
        </button>
      </div>

      <div className="mt-2 flex gap-4 font-sans text-xs text-tinta-700">
        <label className={cn("flex cursor-pointer items-center gap-1.5", mayusculas && "text-vino-800")}>
          <input type="checkbox" checked={mayusculas} onChange={(e) => setMayusculas(e.target.checked)} className="accent-vino-700" />
          Coincidir mayúsculas
        </label>
        <label className={cn("flex cursor-pointer items-center gap-1.5", palabra && "text-vino-800")}>
          <input type="checkbox" checked={palabra} onChange={(e) => setPalabra(e.target.checked)} className="accent-vino-700" />
          Palabra completa
        </label>
      </div>
    </div>
  );
}
