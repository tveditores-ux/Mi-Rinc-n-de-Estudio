/**
 * Almacén local para capítulos bíblicos (IndexedDB con respaldo en memoria).
 */

const NOMBRE_DB = "biblia-cache-v1";
const STORES = ["capitulos", "meta"] as const;
type Store = (typeof STORES)[number];

const memoria: Record<Store, Map<string, unknown>> = { capitulos: new Map(), meta: new Map() };
let dbPromesa: Promise<IDBDatabase | null> | null = null;

function abrir(): Promise<IDBDatabase | null> {
  if (dbPromesa) return dbPromesa;
  dbPromesa = new Promise((resolver) => {
    try {
      if (typeof indexedDB === "undefined") return resolver(null);
      const req = indexedDB.open(NOMBRE_DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        STORES.forEach((s) => {
          if (!db.objectStoreNames.contains(s)) db.createObjectStore(s);
        });
      };
      req.onsuccess = () => resolver(req.result);
      req.onerror = () => resolver(null);
      req.onblocked = () => resolver(null);
    } catch {
      resolver(null);
    }
  });
  return dbPromesa;
}

function pedir<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolver, rechazar) => {
    req.onsuccess = () => resolver(req.result);
    req.onerror = () => rechazar(req.error);
  });
}

export async function obtener<T>(store: Store, clave: string): Promise<T | undefined> {
  if (memoria[store].has(clave)) return memoria[store].get(clave) as T;
  const db = await abrir();
  if (!db) return undefined;
  try {
    const tx = db.transaction(store, "readonly");
    const valor = await pedir(tx.objectStore(store).get(clave));
    return valor as T | undefined;
  } catch {
    return undefined;
  }
}

export async function guardar(store: Store, clave: string, valor: unknown): Promise<void> {
  memoria[store].set(clave, valor);
  const db = await abrir();
  if (!db) return;
  try {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(valor, clave);
    await new Promise<void>((resolver) => {
      tx.oncomplete = () => resolver();
      tx.onerror = () => resolver();
      tx.onabort = () => resolver();
    });
  } catch {
    /* sin persistencia */
  }
}

export async function guardarVarios(store: Store, entradas: [string, unknown][]): Promise<void> {
  const db = await abrir();
  if (!db) {
    entradas.forEach(([k, v]) => memoria[store].set(k, v));
    return;
  }
  const TAMANO_LOTE = 300;
  for (let i = 0; i < entradas.length; i += TAMANO_LOTE) {
    const lote = entradas.slice(i, i + TAMANO_LOTE);
    try {
      const tx = db.transaction(store, "readwrite");
      const os = tx.objectStore(store);
      lote.forEach(([k, v]) => os.put(v, k));
      await new Promise<void>((resolver) => {
        tx.oncomplete = () => resolver();
        tx.onerror = () => resolver();
        tx.onabort = () => resolver();
      });
    } catch {
      lote.forEach(([k, v]) => memoria[store].set(k, v));
    }
  }
}

export async function obtenerTodos<T>(store: Store): Promise<Map<string, T>> {
  const resultado = new Map<string, T>();
  memoria[store].forEach((v, k) => resultado.set(k, v as T));
  const db = await abrir();
  if (!db) return resultado;
  try {
    const tx = db.transaction(store, "readonly");
    const os = tx.objectStore(store);
    const claves = (await pedir(os.getAllKeys())) as string[];
    const valores = (await pedir(os.getAll())) as T[];
    claves.forEach((k, i) => resultado.set(k, valores[i]));
  } catch {
    /* ignorar */
  }
  return resultado;
}

export async function contar(store: Store): Promise<number> {
  const db = await abrir();
  if (!db) return memoria[store].size;
  try {
    const tx = db.transaction(store, "readonly");
    return await pedir(tx.objectStore(store).count());
  } catch {
    return memoria[store].size;
  }
}

export async function borrarTodo(): Promise<void> {
  STORES.forEach((s) => memoria[s].clear());
  const db = await abrir();
  if (!db) return;
  await Promise.all(
    STORES.map(
      (s) =>
        new Promise<void>((resolver) => {
          try {
            const tx = db.transaction(s, "readwrite");
            tx.objectStore(s).clear();
            tx.oncomplete = () => resolver();
            tx.onerror = () => resolver();
            tx.onabort = () => resolver();
          } catch {
            resolver();
          }
        }),
    ),
  );
}
