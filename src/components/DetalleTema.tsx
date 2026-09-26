import { useEffect, useState, type ReactNode } from "react";
import { SERIES, temaComoTexto, type Tema } from "../data/temas";
import { cn } from "../utils/cn";

interface Props {
  tema: Tema | null;
  escogidoId: string | null;
  onCerrar: () => void;
  onEscoger: (id: string) => void;
  onNavegar: (direccion: 1 | -1) => void;
  onAbrirEnEscritorio?: (id: string) => void;
  total: number;
}

function Seccion({
  etiqueta,
  children,
  tono = "neutro",
}: {
  etiqueta: string;
  children: ReactNode;
  tono?: "neutro" | "vino" | "oro" | "oliva";
}) {
  const colores = {
    neutro: "text-tinta-500",
    vino: "text-vino-700",
    oro: "text-oro-700",
    oliva: "text-oliva-700",
  } as const;
  return (
    <section className="mt-8">
      <h4 className={cn("font-sans text-[11px] font-semibold uppercase tracking-[0.25em]", colores[tono])}>
        {etiqueta}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function DetalleTema({ tema, escogidoId, onCerrar, onEscoger, onNavegar, onAbrirEnEscritorio, total }: Props) {
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!tema) return;
    const manejar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowRight") onNavegar(1);
      if (e.key === "ArrowLeft") onNavegar(-1);
    };
    window.addEventListener("keydown", manejar);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", manejar);
      document.body.style.overflow = overflowPrevio;
    };
  }, [tema, onCerrar, onNavegar]);

  useEffect(() => {
    setCopiado(false);
  }, [tema?.id]);

  if (!tema) return null;

  const esEscogido = escogidoId === tema.id;
  const serieActual = SERIES.find((s) => s.id === tema.serie);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(temaComoTexto(tema));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      const area = document.createElement("textarea");
      area.value = temaComoTexto(tema);
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    }
  };

  return (
    <div
      className="animate-aparecer fixed inset-0 z-50 flex items-end justify-center bg-tinta-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-tema"
    >
      <div
        key={tema.id}
        onClick={(e) => e.stopPropagation()}
        className="animate-subir scroll-suave relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-pergamino-50 shadow-elevada sm:rounded-3xl"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between border-b border-pergamino-200 bg-pergamino-100/80 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavegar(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-pergamino-300 text-tinta-700 transition hover:border-tinta-700 hover:bg-white"
              aria-label="Tema anterior"
            >
              ←
            </button>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-tinta-500">
              Tema {tema.numero} de {total}
              {serieActual && (
                <span className="ml-2 hidden text-oro-700 sm:inline">
                  · {serieActual.nombre}: {serieActual.titulo}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => onNavegar(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-pergamino-300 text-tinta-700 transition hover:border-tinta-700 hover:bg-white"
              aria-label="Tema siguiente"
            >
              →
            </button>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tinta-700 transition hover:bg-white"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="scroll-suave flex-1 overflow-y-auto px-5 pb-32 pt-7 sm:px-10 sm:pb-28">
          <div className="flex flex-wrap items-center gap-2">
            {tema.etiquetas.map((e) => (
              <span
                key={e}
                className="rounded-full bg-white px-2.5 py-1 font-sans text-[11px] font-medium text-tinta-700 ring-1 ring-pergamino-300"
              >
                {e}
              </span>
            ))}
          </div>

          <h3 id="titulo-tema" className="mt-4 font-serif text-4xl font-semibold leading-[1.05] text-tinta-900 sm:text-5xl">
            {tema.titulo}
          </h3>
          <p className="mt-2 font-serif text-2xl italic leading-snug text-tinta-700">{tema.subtitulo}</p>

          {/* Texto base */}
          <figure className="textura-papel mt-8 rounded-2xl border border-oro-200 bg-oro-100/60 p-6 sm:p-7">
            <figcaption className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-oro-700">
              Texto base · {tema.textoBase.referencia}
              {tema.textoBase.version && (
                <span className="ml-2 font-normal normal-case tracking-normal text-tinta-500">
                  ({tema.textoBase.version})
                </span>
              )}
            </figcaption>
            <blockquote className="mt-3 font-serif text-2xl font-medium leading-snug text-tinta-900 sm:text-[1.65rem]">
              «{tema.textoBase.texto}»
            </blockquote>
            {tema.textoBaseNVI && (
              <div className="mt-4 border-t border-oro-200 pt-4">
                <span className="rounded bg-oro-600 px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  NVI
                </span>
                <blockquote className="mt-2 font-serif text-xl leading-snug text-tinta-800">
                  «{tema.textoBaseNVI}»
                </blockquote>
              </div>
            )}
          </figure>

          <Seccion etiqueta="Textos de apoyo">
            <ul className="flex flex-wrap gap-2">
              {tema.textosApoyo.map((r) => (
                <li
                  key={r}
                  className="rounded-md border border-pergamino-300 bg-white px-2.5 py-1 font-sans text-sm font-medium text-tinta-800"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Seccion>

          <Seccion etiqueta="Idea central" tono="vino">
            <p className="border-l-2 border-vino-700 pl-4 font-serif text-xl leading-snug text-tinta-900 sm:text-[1.35rem]">
              {tema.ideaCentral}
            </p>
          </Seccion>

          <Seccion etiqueta="Por qué es poco convencional">
            <p className="font-sans text-[15px] leading-relaxed text-tinta-800">{tema.porQueNoConvencional}</p>
          </Seccion>

          <Seccion etiqueta="Bosquejo sugerido · con versículos en NVI" tono="vino">
            <ol className="space-y-4">
              {tema.bosquejo.map((p, i) => (
                <li key={p.titulo} className="flex gap-4 rounded-xl border border-pergamino-200 bg-white/80 p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tinta-900 font-serif text-lg font-semibold text-pergamino-50">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-xl font-semibold leading-tight text-tinta-900">{p.titulo}</p>
                    <p className="mt-0.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-vino-700">
                      {p.referencia}
                    </p>
                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-tinta-800">{p.desarrollo}</p>

                    {p.versiculos && p.versiculos.length > 0 && (
                      <ul className="mt-4 space-y-3">
                        {p.versiculos.map((v) => (
                          <li
                            key={`${p.titulo}-${v.referencia}`}
                            className="textura-papel rounded-lg border-l-[3px] border-oro-600 bg-oro-100/50 px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-oro-700">
                                {v.referencia}
                              </span>
                              <span className="rounded bg-oro-600 px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                {v.version ?? "NVI"}
                              </span>
                            </div>
                            <blockquote className="mt-1.5 font-serif text-[1.1rem] leading-snug text-tinta-900">
                              «{v.texto}»
                            </blockquote>
                            {v.nota && (
                              <p className="mt-2 border-t border-oro-200 pt-2 font-sans text-xs leading-relaxed text-tinta-700">
                                <span className="font-semibold text-tinta-900">Nota del predicador: </span>
                                {v.nota}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Seccion>

          <Seccion etiqueta="Aplicación práctica · para la semana" tono="oliva">
            <ul className="space-y-3">
              {tema.aplicacion.map((a, i) => (
                <li key={i} className="flex gap-3 rounded-xl bg-oliva-100/70 p-4">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-oliva-700" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  <p className="font-sans text-[15px] leading-relaxed text-tinta-800">{a}</p>
                </li>
              ))}
            </ul>
          </Seccion>

          <Seccion etiqueta="Cuidado pastoral · el contrapeso" tono="oro">
            <div className="rounded-xl border border-oro-200 bg-white/80 p-5">
              <p className="font-sans text-[15px] leading-relaxed text-tinta-800">{tema.cuidadoPastoral}</p>
            </div>
          </Seccion>

          <Seccion etiqueta="Ilustración sugerida">
            <p className="font-serif text-lg italic leading-snug text-tinta-800">{tema.ilustracion}</p>
          </Seccion>
        </div>

        {/* Acciones */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 border-t border-pergamino-200 bg-pergamino-50/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="order-2 flex flex-wrap gap-2 sm:order-1">
            <button
              type="button"
              onClick={copiar}
              className="rounded-full border border-pergamino-300 bg-white px-5 py-2.5 font-sans text-sm font-semibold text-tinta-800 transition hover:border-tinta-700"
            >
              {copiado ? "✓ Bosquejo copiado" : "Copiar bosquejo"}
            </button>
            {onAbrirEnEscritorio && (
              <button
                type="button"
                onClick={() => onAbrirEnEscritorio(tema.id)}
                className="rounded-full border border-oro-600 bg-oro-100 px-5 py-2.5 font-sans text-sm font-semibold text-oro-700 transition hover:bg-oro-200"
                title="Abrir este tema como documento editable en el escritorio"
              >
                Abrir en el escritorio
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEscoger(tema.id)}
            className={cn(
              "order-1 rounded-full px-6 py-3 font-sans text-sm font-semibold shadow-suave transition sm:order-2",
              esEscogido
                ? "bg-oro-600 text-white hover:bg-oro-700"
                : "bg-vino-700 text-pergamino-50 hover:bg-vino-800",
            )}
          >
            {esEscogido ? "✓ Este es mi tema (quitar)" : "Escoger este tema para predicar"}
          </button>
        </div>
      </div>
    </div>
  );
}
