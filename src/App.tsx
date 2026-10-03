import { useCallback, useEffect, useState } from "react";
import { PaginaBiblia } from "./biblia/PaginaBiblia";
import { Biblioteca } from "./components/Biblioteca";
import { Escritorio } from "./editor/Escritorio";
import { Icono } from "./editor/Iconos";
import { useDocumentos } from "./editor/useDocumentos";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { cn } from "./utils/cn";
import { PaginaEstudio } from "./estudio/PaginaEstudio";

type Vista = "escritorio" | "biblia" | "biblioteca" | "estudio";

const VISTAS: { id: Vista; etiqueta: string; icono: string }[] = [
  { id: "escritorio", etiqueta: "Escritorio", icono: "archivo" },
  { id: "biblia", etiqueta: "Biblia NVI", icono: "biblia" },
  { id: "biblioteca", etiqueta: "Biblioteca", icono: "libro" },
  { id: "estudio", etiqueta: "Estudio", icono: "libro" },
];

export default function App() {
  const [vista, setVista] = useLocalStorage<Vista>("vista-principal-v1", "escritorio");
  const [referenciaPendiente, setReferenciaPendiente] = useState<string | null>(null);
  const docs = useDocumentos();

  const abrirEnEscritorio = useCallback(
    (temaId: string) => {
      docs.abrirExtra(temaId);
      setVista("escritorio");
      window.scrollTo({ top: 0 });
    },
    [docs, setVista],
  );

  const abrirReferencia = useCallback(
    (referencia: string) => {
      setReferenciaPendiente(referencia);
      setVista("biblia");
      window.scrollTo({ top: 0 });
    },
    [setVista],
  );

  // Las vistas de trabajo no hacen scroll de página; la biblioteca sí.
  useEffect(() => {
    document.body.style.overflow = vista === "biblioteca" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [vista]);

  const descripcion =
    vista === "escritorio"
      ? "Redacta, edita y escucha tus mensajes con las voces de tu equipo"
      : vista === "biblia"
        ? "Nueva Versión Internacional · lectura, búsqueda y marcadores"
        : vista === "biblioteca"
          ? "42 temas · cuatro series · con versículos en NVI"
          : "Recursos de estudio y reflexión";

  return (
    <>
      <nav className="no-imprimir sticky top-0 z-[60] flex h-11 items-center gap-2 border-b border-tinta-800 bg-tinta-950 px-3 text-pergamino-100 sm:px-4">
        <span className="hidden items-center gap-2 font-serif text-base font-semibold sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-oro-500" />
          Gracia y Nuevo Pacto
        </span>
        <div className="ml-0 flex items-center gap-1 rounded-full bg-white/5 p-0.5 sm:ml-4">
          {VISTAS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVista(v.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold transition",
                vista === v.id ? "bg-oro-600 text-white" : "text-pergamino-200 hover:text-white",
              )}
            >
              <Icono nombre={v.icono} tamano={13} />
              {v.etiqueta}
            </button>
          ))}
        </div>
        <span className="ml-auto hidden font-sans text-[11px] text-pergamino-200/60 md:inline">{descripcion}</span>
      </nav>

      {vista === "escritorio" && <Escritorio docs={docs} onIrBiblioteca={() => setVista("biblioteca")} />}
      {vista === "biblia" && (
        <PaginaBiblia
          docs={docs}
          referenciaInicial={referenciaPendiente}
          onReferenciaConsumida={() => setReferenciaPendiente(null)}
          onIrEscritorio={() => setVista("escritorio")}
        />
      )}
      {vista === "biblioteca" && <Biblioteca onAbrirEnEscritorio={abrirEnEscritorio} onAbrirReferencia={abrirReferencia} />}
      {vista === "estudio" && <PaginaEstudio />}
    </>
  );
}
