import { CRITERIOS, PROMESAS_PACTO } from "../data/temas";

export function MarcoPacto() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-vino-700">
            El marco
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-tinta-900 sm:text-4xl">
            Cuatro promesas sostienen todo lo que vas a predicar
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-tinta-700">
            Jeremías 31:31-34, citado en Hebreos 8:8-12, describe el nuevo pacto con cuatro cláusulas.
            Ninguna de ellas dice «si el pueblo…». Todas dicen «yo haré». Cada tema de esta lista es
            una aplicación práctica de una o varias de estas promesas.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROMESAS_PACTO.map((p, i) => (
              <li
                key={p.titulo}
                className="group rounded-xl border border-pergamino-200 bg-white/70 p-5 shadow-suave transition hover:-translate-y-0.5 hover:border-oro-500/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vino-700 font-serif text-base font-semibold text-pergamino-50">
                    {i + 1}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-tinta-900">{p.titulo}</h3>
                </div>
                <p className="mt-3 font-serif text-[15px] italic leading-snug text-tinta-800">{p.cita}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-tinta-700">{p.explicacion}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="textura-papel relative rounded-2xl border border-pergamino-300 bg-pergamino-100 p-7 shadow-suave sm:p-9">
          <div className="absolute -top-3 left-8 rounded-full bg-oro-600 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            Nota del predicador
          </div>
          <h3 className="font-serif text-2xl font-semibold text-tinta-900">Cómo escogí estos temas</h3>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-tinta-700">
            Después de años predicando gracia, aprendí que lo «no convencional» no es lo extravagante,
            sino lo que el texto siempre dijo y nosotros dejamos de escuchar. Usé cuatro filtros:
          </p>
          <ol className="mt-6 space-y-4">
            {CRITERIOS.map((c, i) => (
              <li key={c.titulo} className="flex gap-4">
                <span className="mt-0.5 font-serif text-2xl font-semibold leading-none text-oro-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-tinta-900">{c.titulo}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-tinta-700">{c.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="linea-decorativa my-6" />
          <p className="font-sans text-sm leading-relaxed text-tinta-700">
            <span className="font-semibold text-tinta-900">Cuatro series.</span> La primera sana la
            relación con el Padre (perdón, identidad, descanso, culpa). La segunda lleva el nuevo pacto
            a la vida real: la Biblia, los hábitos, el trabajo, la lengua, la mesa, la misión. La
            tercera recorre las figuras del Antiguo Testamento que ya hablaban de Cristo: pactos,
            montes, refugios, jubileos. La cuarta acompaña las estaciones difíciles: debilidad,
            ansiedad, enfermedad, duelo, espera, vejez y muerte. Se pueden predicar como series
            consecutivas o escoger temas sueltos según la necesidad.
          </p>
          <p className="mt-4 font-serif text-lg italic leading-snug text-vino-800">
            Un consejo: escoge el tema que primero te predique a ti. La congregación siempre nota la
            diferencia entre un sermón preparado y un sermón vivido.
          </p>
        </aside>
      </div>
    </section>
  );
}
