import { SERIES, type Tema } from "../data/temas";

export function VistaImpresion({ tema }: { tema: Tema | null }) {
  if (!tema) return null;
  const serie = SERIES.find((s) => s.id === tema.serie);
  return (
    <div className="solo-imprimir mx-auto max-w-3xl p-8 font-sans text-black">
      <p className="text-xs uppercase tracking-[0.25em]">
        Tema {tema.numero} · Gracia y nuevo pacto{serie ? ` · ${serie.nombre}: ${serie.titulo}` : ""}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{tema.titulo}</h1>
      <p className="font-serif text-xl italic">{tema.subtitulo}</p>

      <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em]">
        Texto base · {tema.textoBase.referencia} {tema.textoBase.version ? `(${tema.textoBase.version})` : ""}
      </h2>
      <p className="mt-1 font-serif text-lg">«{tema.textoBase.texto}»</p>
      {tema.textoBaseNVI && (
        <p className="mt-2 font-serif text-base">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em]">NVI · </span>«{tema.textoBaseNVI}»
        </p>
      )}

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Textos de apoyo</h2>
      <p className="mt-1 text-sm">{tema.textosApoyo.join(" · ")}</p>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Idea central</h2>
      <p className="mt-1 text-sm leading-relaxed">{tema.ideaCentral}</p>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Por qué es poco convencional</h2>
      <p className="mt-1 text-sm leading-relaxed">{tema.porQueNoConvencional}</p>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Bosquejo</h2>
      <ol className="mt-1 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
        {tema.bosquejo.map((p) => (
          <li key={p.titulo}>
            <strong>{p.titulo}</strong> <em>({p.referencia})</em> — {p.desarrollo}
            {p.versiculos && p.versiculos.length > 0 && (
              <ul className="mt-1.5 space-y-1.5 border-l-2 border-black/30 pl-3">
                {p.versiculos.map((v) => (
                  <li key={v.referencia}>
                    <span className="font-semibold">{v.referencia}</span>{" "}
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{v.version ?? "NVI"}</span>
                    <p className="font-serif text-[15px]">«{v.texto}»</p>
                    {v.nota && <p className="text-xs italic">Nota: {v.nota}</p>}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Aplicación práctica</h2>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {tema.aplicacion.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Cuidado pastoral</h2>
      <p className="mt-1 text-sm leading-relaxed">{tema.cuidadoPastoral}</p>

      <h2 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]">Ilustración sugerida</h2>
      <p className="mt-1 text-sm italic leading-relaxed">{tema.ilustracion}</p>
    </div>
  );
}
