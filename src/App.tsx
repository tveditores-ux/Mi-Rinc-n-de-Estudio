import { useCallback, useEffect } from "react";
import { Biblioteca } from "./components/Biblioteca";
import { Escritorio } from "./editor/Escritorio";
import { Icono } from "./editor/Iconos";
import { useDocumentos } from "./editor/useDocumentos";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { cn } from "./utils/cn";

type Vista = "escritorio" | "biblioteca";

export default function App() {
  const [vista, setVista] = useLocalStorage<Vista>("vista-principal-v1", "escritorio");
  const docs = useDocumentos();

  const abrirEnEscritorio = useCallback(
    (temaId: string) => {
      docs.abrirExtra(temaId);
      setVista("escritorio");
      window.scrollTo({ top: 0 });
    },
    [docs, setVista],
  );

  // El escritorio no debe hacer scroll de página; la biblioteca sí.
  useEffect(() => {
    document.body.style.overflow = vista === "escritorio" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [vista]);

  return (
    <>
      <nav className="no-imprimir sticky top-0 z-[60] flex h-11 items-center gap-2 border-b border-tinta-800 bg-tinta-950 px-3 text-pergamino-100 sm:px-4">
        <span className="hidden items-center gap-2 font-serif text-base font-semibold sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-oro-500" />
          Gracia y Nuevo Pacto
        </span>
        <div className="ml-0 flex items-center gap-1 rounded-full bg-white/5 p-0.5 sm:ml-4">
          <button
            type="button"
            onClick={() => setVista("escritorio")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold transition",
              vista === "escritorio" ? "bg-oro-600 text-white" : "text-pergamino-200 hover:text-white",
            )}
          >
            <Icono nombre="archivo" tamano={13} />
            Escritorio
          </button>
          <button
            type="button"
            onClick={() => setVista("biblioteca")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold transition",
              vista === "biblioteca" ? "bg-oro-600 text-white" : "text-pergamino-200 hover:text-white",
            )}
          >
            <Icono nombre="libro" tamano={13} />
            Biblioteca
          </button>
        </div>
        <span className="ml-auto hidden font-sans text-[11px] text-pergamino-200/60 md:inline">
          {vista === "escritorio"
            ? "Redacta, edita y escucha tus mensajes con las voces de tu equipo"
            : "42 temas · cuatro series · con versículos en NVI"}
        </span>
      </nav>

      {vista === "escritorio" ? (
        <Escritorio docs={docs} onIrBiblioteca={() => setVista("biblioteca")} />
      ) : (
        <Biblioteca onAbrirEnEscritorio={abrirEnEscritorio} />
      )}
    </>
  );
}
