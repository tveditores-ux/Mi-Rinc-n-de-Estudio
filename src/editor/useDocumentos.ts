import { useCallback, useMemo, useState } from "react";
import { SELECCION } from "../data/seleccion";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { documentoInicial, listarDocumentos, type DocumentoEscritorio } from "./generarDocumento";

export interface DocGuardado {
  html: string;
  titulo?: string;
  actualizado: number;
}

type Almacen = Record<string, DocGuardado>;

export function useDocumentos() {
  const [almacen, setAlmacen] = useLocalStorage<Almacen>("escritorio-docs-v1", {});
  const [extras, setExtras] = useLocalStorage<string[]>("escritorio-extras-v1", []);
  const [activoId, setActivoId] = useLocalStorage<string>("escritorio-activo-v1", SELECCION.items[0].temaId);
  // Se incrementa para forzar la recarga del editor tras restaurar un documento.
  const [versiones, setVersiones] = useState<Record<string, number>>({});

  const documentos = useMemo(() => listarDocumentos(extras), [extras]);

  const activo = useMemo(
    () => documentos.find((d) => d.id === activoId) ?? documentos[0],
    [documentos, activoId],
  );

  const obtenerHtml = useCallback(
    (doc: DocumentoEscritorio) => almacen[doc.id]?.html ?? documentoInicial(doc),
    [almacen],
  );

  const obtenerTitulo = useCallback(
    (doc: DocumentoEscritorio) => almacen[doc.id]?.titulo ?? doc.titulo,
    [almacen],
  );

  const guardar = useCallback(
    (id: string, html: string, titulo?: string) => {
      setAlmacen((prev) => ({
        ...prev,
        [id]: { html, titulo: titulo ?? prev[id]?.titulo, actualizado: Date.now() },
      }));
    },
    [setAlmacen],
  );

  const renombrar = useCallback(
    (id: string, titulo: string) => {
      setAlmacen((prev) => {
        const previo = prev[id];
        if (!previo) return prev;
        return { ...prev, [id]: { ...previo, titulo, actualizado: Date.now() } };
      });
    },
    [setAlmacen],
  );

  const restaurar = useCallback(
    (id: string) => {
      setAlmacen((prev) => {
        const copia = { ...prev };
        delete copia[id];
        return copia;
      });
      setVersiones((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
    },
    [setAlmacen],
  );

  const abrirExtra = useCallback(
    (temaId: string) => {
      setExtras((prev) => (prev.includes(temaId) ? prev : [...prev, temaId]));
      setActivoId(temaId);
    },
    [setExtras, setActivoId],
  );

  const cerrarExtra = useCallback(
    (temaId: string) => {
      setExtras((prev) => prev.filter((id) => id !== temaId));
      setActivoId((actual) => (actual === temaId ? SELECCION.items[0].temaId : actual));
    },
    [setExtras, setActivoId],
  );

  const estaEditado = useCallback((id: string) => Boolean(almacen[id]), [almacen]);
  const ultimaEdicion = useCallback((id: string) => almacen[id]?.actualizado ?? null, [almacen]);

  return {
    documentos,
    activo,
    activoId,
    setActivoId,
    obtenerHtml,
    obtenerTitulo,
    guardar,
    renombrar,
    restaurar,
    abrirExtra,
    cerrarExtra,
    estaEditado,
    ultimaEdicion,
    versiones,
  };
}

export type Documentos = ReturnType<typeof useDocumentos>;
