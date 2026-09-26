import { SERIES, TEMAS } from "../data/temas";

export function Encabezado() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-tinta-900" />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(207,160,74,0.28), transparent 50%), radial-gradient(ellipse at 90% 100%, rgba(154,47,69,0.35), transparent 55%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="animate-subir flex items-center gap-3 text-oro-500">
          <span className="h-px w-10 bg-oro-500/70" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em]">
            Desde el púlpito de la gracia
          </span>
        </div>

        <h1
          className="animate-subir mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] text-pergamino-50 sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Cuarenta temas <em className="font-medium italic text-oro-500">no convencionales</em> sobre
          la gracia y el nuevo pacto
        </h1>

        <p
          className="animate-subir mt-7 max-w-2xl font-sans text-base leading-relaxed text-pergamino-200/85 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Cuatro series de diez temas, pensadas para predicadores que quieren salir de los lugares
          comunes sin salirse del texto. La primera enseña a{" "}
          <span className="text-pergamino-50">descansar</span> en la gracia; la segunda, a{" "}
          <span className="text-pergamino-50">caminar</span> en ella; la tercera lee las{" "}
          <span className="text-pergamino-50">figuras del Antiguo Testamento</span> desde Cristo; la
          cuarta lleva la gracia a las <span className="text-pergamino-50">estaciones difíciles</span>{" "}
          de la vida. Cada tema trae su base bíblica, una idea central, bosquejo de tres puntos,
          aplicación para la semana y una nota de cuidado pastoral.
        </p>

        <div className="animate-subir mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "200ms" }}>
          {SERIES.map((s) => {
            const cantidad = TEMAS.filter((t) => t.serie === s.id).length;
            return (
              <a
                key={s.id}
                href={`#serie-${s.id}`}
                className="group rounded-xl border border-oro-500/40 bg-oro-500/10 px-4 py-3 transition hover:border-oro-500 hover:bg-oro-500/20"
              >
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-oro-500">
                  {s.nombre} · {cantidad} temas
                </span>
                <span className="mt-0.5 block font-serif text-lg font-semibold leading-tight text-pergamino-50">
                  {s.titulo}
                </span>
              </a>
            );
          })}
        </div>

        <blockquote
          className="animate-subir mt-10 max-w-2xl border-l-2 border-oro-500/70 pl-5"
          style={{ animationDelay: "240ms" }}
        >
          <p className="font-serif text-xl italic leading-snug text-pergamino-100 sm:text-2xl">
            «El cual asimismo nos hizo ministros competentes de un nuevo pacto, no de la letra, sino
            del espíritu; porque la letra mata, mas el espíritu vivifica.»
          </p>
          <footer className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-oro-500">
            2 Corintios 3:6
          </footer>
        </blockquote>
      </div>
    </header>
  );
}
