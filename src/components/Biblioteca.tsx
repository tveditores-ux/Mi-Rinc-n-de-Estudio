import { useCallback, useMemo, useState } from "react";
import { NECESIDADES, SERIES, TEMAS, type Necesidad, type SerieId, type Tema } from "../data/temas";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BarraSeleccion } from "./BarraSeleccion";
import { DetalleTema } from "./DetalleTema";
import { Encabezado } from "./Encabezado";
import { FiltroNecesidades } from "./FiltroNecesidades";
import { MarcoPacto } from "./MarcoPacto";
import { PieIndice } from "./PieIndice";
import { TarjetaTema } from "./TarjetaTema";
import { VistaImpresion } from "./VistaImpresion";

interface Props {
  onAbrirEnEscritorio: (temaId: string) => void;
  onAbrirReferencia: (referencia: string) => void;
}

export function Biblioteca({ onAbrirEnEscritorio, onAbrirReferencia }: Props) {
  const [filtro, setFiltro] = useState<Necesidad | null>(null);
  const [serie, setSerie] = useState<SerieId | null>(null);
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const [escogidoId, setEscogidoId] = useLocalStorage<string | null>("gracia-tema-escogido", null);
  const [listaCortaIds, setListaCortaIds] = useLocalStorage<string[]>("gracia-lista-corta", []);

  const temasPorSerie = useMemo(() => (serie ? TEMAS.filter((t) => t.serie === serie) : TEMAS), [serie]);

  const temasFiltrados = useMemo(
    () => (filtro ? temasPorSerie.filter((t) => t.necesidades.includes(filtro)) : temasPorSerie),
    [temasPorSerie, filtro],
  );

  const conteo = useMemo(() => {
    const base = Object.fromEntries(NECESIDADES.map((n) => [n.id, 0])) as Record<Necesidad, number>;
    temasPorSerie.forEach((t) => t.necesidades.forEach((n) => (base[n] += 1)));
    return base;
  }, [temasPorSerie]);

  const temaAbierto = useMemo(() => TEMAS.find((t) => t.id === abiertoId) ?? null, [abiertoId]);
  const temaEscogido = useMemo(() => TEMAS.find((t) => t.id === escogidoId) ?? null, [escogidoId]);
  const listaCorta = useMemo(
    () => listaCortaIds.map((id) => TEMAS.find((t) => t.id === id)).filter((t): t is Tema => Boolean(t)),
    [listaCortaIds],
  );

  const abrir = useCallback((t: Tema) => setAbiertoId(t.id), []);
  const cerrar = useCallback(() => setAbiertoId(null), []);

  const navegar = useCallback(
    (direccion: 1 | -1) => {
      setAbiertoId((actual) => {
        if (!actual) return actual;
        const enFiltro = temasFiltrados.findIndex((t) => t.id === actual);
        const base = enFiltro === -1 ? TEMAS : temasFiltrados;
        const i = enFiltro === -1 ? TEMAS.findIndex((t) => t.id === actual) : enFiltro;
        const siguiente = (i + direccion + base.length) % base.length;
        return base[siguiente].id;
      });
    },
    [temasFiltrados],
  );

  const escoger = useCallback((id: string) => setEscogidoId((actual) => (actual === id ? null : id)), [setEscogidoId]);

  const alternarListaCorta = useCallback(
    (id: string) => setListaCortaIds((actual) => (actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id])),
    [setListaCortaIds],
  );

  const limpiar = useCallback(() => {
    setEscogidoId(null);
    setListaCortaIds([]);
  }, [setEscogidoId, setListaCortaIds]);

  const filtroActivo = NECESIDADES.find((n) => n.id === filtro);

  return (
    <>
      <div className="no-imprimir min-h-screen pb-36">
        <Encabezado />

        <main>
          <MarcoPacto />

          <div className="linea-decorativa mx-auto max-w-6xl" />

          <section id="temas" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <FiltroNecesidades
              activa={filtro}
              onCambiar={setFiltro}
              conteo={conteo}
              serie={serie}
              onCambiarSerie={setSerie}
              total={TEMAS.length}
            />

            {filtroActivo && (
              <p className="mt-5 rounded-xl border border-vino-100 bg-vino-100/60 px-4 py-3 font-sans text-sm text-vino-900">
                <span className="font-semibold">{filtroActivo.etiqueta}:</span> {filtroActivo.descripcion}. Mostrando{" "}
                {temasFiltrados.length} {temasFiltrados.length === 1 ? "tema recomendado" : "temas recomendados"}.
              </p>
            )}

            {temasFiltrados.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-pergamino-300 bg-white/50 p-10 text-center">
                <p className="font-serif text-2xl text-tinta-800">Ningún tema coincide con esa combinación.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFiltro(null);
                    setSerie(null);
                  }}
                  className="mt-4 rounded-full bg-tinta-900 px-5 py-2 font-sans text-sm font-semibold text-pergamino-50"
                >
                  Ver todos los temas
                </button>
              </div>
            )}

            {SERIES.map((s) => {
              const items = temasFiltrados.filter((t) => t.serie === s.id);
              if (items.length === 0) return null;
              return (
                <div key={s.id} id={`serie-${s.id}`} className="mt-12 scroll-mt-16">
                  <div className="flex flex-col gap-2 border-b border-pergamino-300 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div className="flex items-baseline gap-3">
                      <span className="rounded-full bg-oro-600 px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                        {s.nombre}
                      </span>
                      <h3 className="font-serif text-2xl font-semibold text-tinta-900 sm:text-3xl">{s.titulo}</h3>
                    </div>
                    <p className="max-w-md font-sans text-sm leading-snug text-tinta-500">{s.descripcion}</p>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((t, i) => (
                      <TarjetaTema
                        key={`${serie ?? "todas"}-${filtro ?? "todos"}-${t.id}`}
                        tema={t}
                        indice={i}
                        escogido={escogidoId === t.id}
                        enListaCorta={listaCortaIds.includes(t.id)}
                        onAbrir={abrir}
                        onAlternarListaCorta={alternarListaCorta}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>

        <PieIndice temas={TEMAS} escogidoId={escogidoId} onAbrir={abrir} />
      </div>

      <VistaImpresion tema={temaEscogido} />

      <BarraSeleccion
        escogido={temaEscogido}
        listaCorta={listaCorta}
        onAbrir={abrir}
        onQuitarDeLista={alternarListaCorta}
        onLimpiar={limpiar}
      />

      <DetalleTema
        tema={temaAbierto}
        escogidoId={escogidoId}
        onCerrar={cerrar}
        onEscoger={escoger}
        onNavegar={navegar}
        onAbrirEnEscritorio={(id) => {
          cerrar();
          onAbrirEnEscritorio(id);
        }}
        onAbrirReferencia={(ref) => {
          cerrar();
          onAbrirReferencia(ref);
        }}
        total={TEMAS.length}
      />
    </>
  );
}
