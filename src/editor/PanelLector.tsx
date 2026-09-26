import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Icono } from "./Iconos";
import type { Fragmento, Voz } from "./useVoz";

interface Props {
  voz: Voz;
  fragmentosDocumento: Fragmento[];
  bloquesTexto: string[];
  onActualizar: () => void;
  onCerrar: () => void;
}

/**
 * Panel de lectura tipo teleprompter: muestra el texto del documento por bloques,
 * resalta la frase que se está leyendo y permite empezar desde cualquier frase.
 */
export function PanelLector({ voz, fragmentosDocumento, bloquesTexto, onActualizar, onCerrar }: Props) {
  const [tamanoLetra, setTamanoLetra] = useState(17);
  const [autoDesplazar, setAutoDesplazar] = useState(true);
  const activoRef = useRef<HTMLSpanElement>(null);

  // Si la voz está leyendo otra lista (una selección), mostramos esa; si no, el documento.
  const leyendoDocumento = voz.fragmentos === fragmentosDocumento || voz.estado === "inactivo";
  const fragmentos = leyendoDocumento ? fragmentosDocumento : voz.fragmentos;

  const porBloque = useMemo(() => {
    const mapa = new Map<number, { indice: number; texto: string }[]>();
    fragmentos.forEach((f, i) => {
      if (!mapa.has(f.bloque)) mapa.set(f.bloque, []);
      mapa.get(f.bloque)!.push({ indice: i, texto: f.texto });
    });
    return Array.from(mapa.entries()).sort((a, b) => a[0] - b[0]);
  }, [fragmentos]);

  useEffect(() => {
    if (autoDesplazar && activoRef.current) {
      activoRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [voz.indiceActual, autoDesplazar]);

  const total = fragmentos.length;
  const actual = voz.indiceActual;
  const progreso = total > 0 && actual >= 0 ? Math.round(((actual + 1) / total) * 100) : 0;

  return (
    <aside className="flex h-full w-full flex-col border-l border-pergamino-300 bg-tinta-900 text-pergamino-100">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-oro-500">Panel de lectura</p>
          <p className="font-serif text-lg font-semibold leading-tight">
            {voz.vozActual ? voz.vozActual.name : "Voz del sistema"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onActualizar} title="Actualizar el texto desde el documento" className="rounded-md p-1.5 text-pergamino-200 hover:bg-white/10">
            <Icono nombre="actualizar" tamano={16} />
          </button>
          <button type="button" onClick={onCerrar} className="rounded-md p-1.5 text-pergamino-200 hover:bg-white/10" aria-label="Cerrar panel">
            <Icono nombre="cerrar" tamano={16} />
          </button>
        </div>
      </div>

      {/* Controles */}
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button type="button" onClick={() => voz.saltar(-1)} disabled={voz.estado === "inactivo"} className="rounded-full p-2 hover:bg-white/10 disabled:opacity-30" title="Anterior">
            <Icono nombre="anterior" tamano={18} />
          </button>
          {voz.estado === "hablando" ? (
            <button type="button" onClick={voz.pausar} className="flex h-12 w-12 items-center justify-center rounded-full bg-oro-600 text-white hover:bg-oro-700" title="Pausar">
              <Icono nombre="pausa" tamano={20} />
            </button>
          ) : voz.estado === "pausado" ? (
            <button type="button" onClick={voz.reanudar} className="flex h-12 w-12 items-center justify-center rounded-full bg-oro-600 text-white hover:bg-oro-700" title="Reanudar">
              <Icono nombre="reproducir" tamano={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => voz.hablar(fragmentosDocumento, 0)}
              disabled={!voz.soportado || fragmentosDocumento.length === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-oro-600 text-white hover:bg-oro-700 disabled:opacity-40"
              title="Leer desde el principio"
            >
              <Icono nombre="reproducir" tamano={20} />
            </button>
          )}
          <button type="button" onClick={voz.detener} disabled={voz.estado === "inactivo"} className="rounded-full p-2 hover:bg-white/10 disabled:opacity-30" title="Detener">
            <Icono nombre="detener" tamano={18} />
          </button>
          <button type="button" onClick={() => voz.saltar(1)} disabled={voz.estado === "inactivo"} className="rounded-full p-2 hover:bg-white/10 disabled:opacity-30" title="Siguiente">
            <Icono nombre="siguiente" tamano={18} />
          </button>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-oro-500 transition-all" style={{ width: `${progreso}%` }} />
        </div>
        <div className="mt-1.5 flex items-center justify-between font-sans text-[11px] text-pergamino-200/70">
          <span>
            {voz.estado === "inactivo" ? "Detenido" : voz.estado === "pausado" ? "En pausa" : "Leyendo"}
            {actual >= 0 && total > 0 ? ` · frase ${actual + 1} de ${total}` : total > 0 ? ` · ${total} frases` : ""}
          </span>
          <span>{voz.prefs.velocidad.toFixed(2)}×</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 font-sans text-[11px] text-pergamino-200/80">
          <label className="flex items-center gap-2">
            <span>Letra</span>
            <input type="range" min={13} max={30} value={tamanoLetra} onChange={(e) => setTamanoLetra(Number(e.target.value))} className="w-24 accent-oro-500" />
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" checked={autoDesplazar} onChange={(e) => setAutoDesplazar(e.target.checked)} className="accent-oro-500" />
            Seguir lectura
          </label>
        </div>
      </div>

      {/* Texto */}
      <div className="scroll-suave flex-1 overflow-y-auto px-5 py-6" style={{ fontSize: tamanoLetra }}>
        {!voz.soportado && (
          <p className="rounded-lg border border-vino-600/40 bg-vino-900/40 p-3 font-sans text-sm">
            Este navegador no ofrece síntesis de voz. Prueba con Chrome, Edge o Safari.
          </p>
        )}
        {voz.soportado && voz.voces.length === 0 && (
          <p className="mb-4 rounded-lg border border-oro-500/40 bg-oro-500/10 p-3 font-sans text-xs text-pergamino-100">
            Cargando las voces instaladas en tu equipo… Si no aparecen, en Windows puedes añadir voces en español desde
            Configuración → Hora e idioma → Voz.
          </p>
        )}
        {porBloque.length === 0 && bloquesTexto.length === 0 && (
          <p className="font-sans text-sm text-pergamino-200/60">El documento está vacío.</p>
        )}
        <div className="space-y-4 font-serif leading-relaxed">
          {porBloque.map(([bloque, frases]) => (
            <p key={bloque} className="text-pergamino-100/85">
              {frases.map((f) => {
                const esActual = f.indice === actual;
                return (
                  <span
                    key={f.indice}
                    ref={esActual ? activoRef : undefined}
                    onClick={() => voz.hablar(fragmentos, f.indice)}
                    className={cn(
                      "cursor-pointer rounded-sm px-0.5 transition-colors hover:bg-white/10",
                      esActual && "bg-oro-500 text-tinta-950 hover:bg-oro-500",
                    )}
                    title="Leer desde aquí"
                  >
                    {f.texto}{" "}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
