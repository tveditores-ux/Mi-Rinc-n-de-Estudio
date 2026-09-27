import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SELECCION } from "../data/seleccion";
import { documentoInicial, listarDocumentos, type DocumentoEscritorio } from "./generarDocumento";

export interface DocGuardado {
  html: string;
  titulo?: string;
  actualizado: number;
}

type Almacen = Record<string, DocGuardado>;

interface EstadoSincronizado {
  almacen: Almacen;
  extras: string[];
  activoId: string;
}

const CLAVE_LOCAL = "escritorio-estado-v2";
const activoIdInicial = SELECCION.items[0].temaId;

function leerLocal(): EstadoSincronizado {
  try {
    const guardado = window.localStorage.getItem(CLAVE_LOCAL);
    if (guardado) return JSON.parse(guardado) as EstadoSincronizado;
  } catch {
    /* almacenamiento no disponible */
  }
  return { almacen: {}, extras: [], activoId: activoIdInicial };
}

function guardarLocal(estado: EstadoSincronizado) {
  try {
    window.localStorage.setItem(CLAVE_LOCAL, JSON.stringify(estado));
  } catch {
    /* almacenamiento no disponible */
  }
}

export type EstadoSincronizacion = "cargando" | "sincronizado" | "local" | "error";

export function useDocumentos() {
  const inicial = useMemo(leerLocal, []);
  const [almacen, setAlmacen] = useState<Almacen>(inicial.almacen);
  const [extras, setExtras] = useState<string[]>(inicial.extras);
  const [activoId, setActivoId] = useState<string>(inicial.activoId);
  const [versiones, setVersiones] = useState<Record<string, number>>({});
  const [sincronizacion, setSincronizacion] = useState<EstadoSincronizacion>("cargando");

  const cargado = useRef(false);
  const guardarEnServidor = useRef(true);

  // Al montar, trae el estado guardado en el servidor (compartido entre dispositivos).
  useEffect(() => {
    let cancelado = false;
    fetch("/api/estado")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: Partial<EstadoSincronizado>) => {
        if (cancelado) return;
        if (data && (data.almacen || data.extras || data.activoId)) {
          setAlmacen(data.almacen ?? {});
          setExtras(data.extras ?? []);
          setActivoId(data.activoId ?? activoIdInicial);
        }
        setSincronizacion("sincronizado");
      })
      .catch(() => {
        if (cancelado) return;
        // Sin servidor disponible (p. ej. en desarrollo local): sigue funcionando solo local.
        guardarEnServidor.current = false;
        setSincronizacion("local");
      })
      .finally(() => {
        cargado.current = true;
      });
    return () => {
      cancelado = true;
    };
  }, []);

  // Guarda cada cambio: siempre en localStorage (instantáneo) y, si hay servidor, también ahí (con debounce).
  useEffect(() => {
    if (!cargado.current) return;
    const estado: EstadoSincronizado = { almacen, extras, activoId };
    guardarLocal(estado);
    if (!guardarEnServidor.current) return;

    const temporizador = setTimeout(() => {
      fetch("/api/estado", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estado),
      })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          setSincronizacion("sincronizado");
        })
        .catch(() => setSincronizacion("error"));
    }, 600);

    return () => clearTimeout(temporizador);
  }, [almacen, extras, activoId]);

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

  const guardar = useCallback((id: string, html: string, titulo?: string) => {
    setAlmacen((prev) => ({
      ...prev,
      [id]: { html, titulo: titulo ?? prev[id]?.titulo, actualizado: Date.now() },
    }));
  }, []);

  const renombrar = useCallback((id: string, titulo: string) => {
    setAlmacen((prev) => {
      const previo = prev[id];
      if (!previo) return prev;
      return { ...prev, [id]: { ...previo, titulo, actualizado: Date.now() } };
    });
  }, []);

  /** Anexa HTML al final de un documento (aunque no esté abierto en el editor). */
  const anexarHtml = useCallback(
    (id: string, html: string) => {
      const doc = documentos.find((d) => d.id === id);
      if (!doc) return;
      setAlmacen((prev) => {
        const base = prev[id]?.html ?? documentoInicial(doc);
        return { ...prev, [id]: { html: `${base}\n${html}`, titulo: prev[id]?.titulo, actualizado: Date.now() } };
      });
      setVersiones((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
    },
    [documentos],
  );

  const restaurar = useCallback((id: string) => {
    setAlmacen((prev) => {
      const copia = { ...prev };
      delete copia[id];
      return copia;
    });
    setVersiones((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
  }, []);

  const abrirExtra = useCallback((temaId: string) => {
    setExtras((prev) => (prev.includes(temaId) ? prev : [...prev, temaId]));
    setActivoId(temaId);
  }, []);

  const cerrarExtra = useCallback((temaId: string) => {
    setExtras((prev) => prev.filter((id) => id !== temaId));
    setActivoId((actual) => (actual === temaId ? activoIdInicial : actual));
  }, []);

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
    anexarHtml,
    restaurar,
    abrirExtra,
    cerrarExtra,
    estaEditado,
    ultimaEdicion,
    versiones,
    sincronizacion,
  };
}

export type Documentos = ReturnType<typeof useDocumentos>;
