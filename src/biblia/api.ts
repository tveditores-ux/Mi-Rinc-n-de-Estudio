import { borrarTodo, contar, guardar, guardarVarios, obtener, obtenerTodos } from "./almacen";
import { LIBROS } from "./libros";
import { normalizarTexto } from "./referencias";

/**
 * Cliente del texto bíblico. La NVI (y las versiones de comparación) se obtienen
 * del servicio público bolls.life, que publica el texto con CORS abierto y sin clave.
 * Todo capítulo consultado se guarda localmente; además puede descargarse la NVI
 * completa para trabajar sin conexión.
 */

export const BASE = "https://bolls.life";
export const TRADUCCION_PRINCIPAL = "NVI";

export interface Traduccion {
  id: string;
  nombre: string;
  corto: string;
}

export const TRADUCCIONES: Traduccion[] = [
  { id: "NVI", nombre: "Nueva Versión Internacional (2015)", corto: "NVI" },
  { id: "RV1960", nombre: "Reina-Valera 1960", corto: "RVR1960" },
  { id: "NTV", nombre: "Nueva Traducción Viviente (2009)", corto: "NTV" },
  { id: "LBLA", nombre: "La Biblia de las Américas (1997)", corto: "LBLA" },
  { id: "PDT", nombre: "Palabra de Dios para Todos", corto: "PDT" },
  { id: "BTX3", nombre: "La Biblia Textual, 3.ª edición", corto: "BTX" },
  { id: "RV2004", nombre: "Reina Valera Gómez 2004", corto: "RVG" },
];

export function nombreCorto(id: string): string {
  return TRADUCCIONES.find((t) => t.id === id)?.corto ?? id;
}

export interface Versiculo {
  verso: number;
  texto: string;
}

export interface VersiculoIndexado extends Versiculo {
  libro: number;
  capitulo: number;
  norm: string;
}

export interface ResultadoBusqueda {
  libro: number;
  capitulo: number;
  verso: number;
  texto: string;
}

export type ModoBusqueda = "exacta" | "semantica";
export type FiltroTestamento = "todo" | "AT" | "NT";

export interface MetaDescarga {
  fecha: number;
  versiculos: number;
  capitulos: number;
}

/* ─────────────────────────── Utilidades ─────────────────────────── */

let decodificador: HTMLTextAreaElement | null = null;
function decodificarEntidades(s: string): string {
  if (!s.includes("&")) return s;
  if (typeof document === "undefined") return s;
  decodificador ??= document.createElement("textarea");
  decodificador.innerHTML = s;
  return decodificador.value;
}

/** Convierte el HTML de un versículo en texto plano (sin notas ni números Strong). */
export function limpiarTexto(html: string): string {
  const t = html
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "")
    .replace(/<S>[\s\S]*?<\/S>/g, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(p|div)[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "");
  return decodificarEntidades(t).replace(/\s+/g, " ").trim();
}

function esperar(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const enVuelo = new Map<string, Promise<unknown>>();

async function pedirJson<T>(url: string, opciones?: RequestInit, intentos = 3): Promise<T> {
  const clave = `${opciones?.method ?? "GET"} ${url} ${opciones?.body ?? ""}`;
  const existente = enVuelo.get(clave);
  if (existente) return existente as Promise<T>;
  const promesa = (async () => {
    let ultimoError: unknown = null;
    for (let i = 0; i < intentos; i++) {
      try {
        const res = await fetch(url, { ...opciones, headers: { Accept: "application/json", ...(opciones?.headers ?? {}) } });
        if (res.status === 429 || res.status >= 500) {
          ultimoError = new Error(`El servicio bíblico respondió ${res.status}. Reintentando…`);
          await esperar(1200 * (i + 1));
          continue;
        }
        if (!res.ok) throw new Error(`El servicio bíblico respondió ${res.status}.`);
        return (await res.json()) as T;
      } catch (e) {
        ultimoError = e;
        if (i < intentos - 1) await esperar(800 * (i + 1));
      }
    }
    throw ultimoError instanceof Error ? ultimoError : new Error("No se pudo conectar con el servicio bíblico.");
  })();
  enVuelo.set(clave, promesa);
  try {
    return await promesa;
  } finally {
    enVuelo.delete(clave);
  }
}

const claveCapitulo = (trad: string, libro: number, cap: number) => `${trad}:${libro}:${cap}`;

/* ─────────────────────────── Capítulos ─────────────────────────── */

export async function obtenerCapitulo(trad: string, libro: number, capitulo: number): Promise<Versiculo[]> {
  const clave = claveCapitulo(trad, libro, capitulo);
  const local = await obtener<Versiculo[]>("capitulos", clave);
  if (local && local.length) return local;

  const datos = await pedirJson<{ verse: number; text: string }[]>(`${BASE}/get-text/${trad}/${libro}/${capitulo}/`);
  const versiculos: Versiculo[] = datos
    .map((v) => ({ verso: Number(v.verse), texto: limpiarTexto(v.text ?? "") }))
    .filter((v) => v.verso > 0)
    .sort((a, b) => a.verso - b.verso);
  if (versiculos.length) void guardar("capitulos", clave, versiculos);
  return versiculos;
}

export async function capituloEnCache(trad: string, libro: number, capitulo: number): Promise<boolean> {
  const local = await obtener<Versiculo[]>("capitulos", claveCapitulo(trad, libro, capitulo));
  return Boolean(local && local.length);
}

/* ─────────────────────────── Descarga completa ─────────────────────────── */

export async function metaDescarga(trad: string): Promise<MetaDescarga | null> {
  return (await obtener<MetaDescarga>("meta", `completa:${trad}`)) ?? null;
}

interface VersiculoRemoto {
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export async function descargarTraduccion(
  trad: string,
  onProgreso: (bytes: number, fase: "descargando" | "guardando") => void,
): Promise<MetaDescarga> {
  const res = await fetch(`${BASE}/static/translations/${trad}.json`, { headers: { Accept: "application/json" } });
  if (!res.ok || !res.body) throw new Error(`No se pudo descargar la ${trad} (${res.status}).`);

  const lector = res.body.getReader();
  const trozos: Uint8Array[] = [];
  let recibidos = 0;
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    if (value) {
      trozos.push(value);
      recibidos += value.byteLength;
      onProgreso(recibidos, "descargando");
    }
  }
  const total = new Uint8Array(recibidos);
  let desplazamiento = 0;
  trozos.forEach((t) => {
    total.set(t, desplazamiento);
    desplazamiento += t.byteLength;
  });
  const datos = JSON.parse(new TextDecoder().decode(total)) as VersiculoRemoto[];
  onProgreso(recibidos, "guardando");

  const porCapitulo = new Map<string, Versiculo[]>();
  datos.forEach((v) => {
    const clave = claveCapitulo(trad, Number(v.book), Number(v.chapter));
    const lista = porCapitulo.get(clave) ?? [];
    lista.push({ verso: Number(v.verse), texto: limpiarTexto(v.text ?? "") });
    porCapitulo.set(clave, lista);
  });
  const entradas: [string, unknown][] = [];
  porCapitulo.forEach((lista, clave) => {
    lista.sort((a, b) => a.verso - b.verso);
    entradas.push([clave, lista]);
  });
  await guardarVarios("capitulos", entradas);

  const meta: MetaDescarga = { fecha: Date.now(), versiculos: datos.length, capitulos: porCapitulo.size };
  await guardar("meta", `completa:${trad}`, meta);
  indiceLocal.delete(trad);
  return meta;
}

export async function borrarCache(): Promise<void> {
  indiceLocal.clear();
  await borrarTodo();
}

export async function capitulosGuardados(): Promise<number> {
  return contar("capitulos");
}

/* ─────────────────────────── Búsqueda ─────────────────────────── */

const indiceLocal = new Map<string, VersiculoIndexado[]>();

async function cargarIndiceLocal(trad: string): Promise<VersiculoIndexado[] | null> {
  if (indiceLocal.has(trad)) return indiceLocal.get(trad)!;
  const meta = await metaDescarga(trad);
  if (!meta) return null;
  const todos = await obtenerTodos<Versiculo[]>("capitulos");
  const indice: VersiculoIndexado[] = [];
  todos.forEach((lista, clave) => {
    const [t, libro, cap] = clave.split(":");
    if (t !== trad) return;
    lista.forEach((v) =>
      indice.push({ ...v, libro: Number(libro), capitulo: Number(cap), norm: normalizarTexto(v.texto) }),
    );
  });
  indice.sort((a, b) => a.libro - b.libro || a.capitulo - b.capitulo || a.verso - b.verso);
  indiceLocal.set(trad, indice);
  return indice;
}

export function escaparRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function filtroLibro(testamento: FiltroTestamento) {
  if (testamento === "todo") return () => true;
  const ids = new Set(LIBROS.filter((l) => l.testamento === testamento).map((l) => l.id));
  return (libro: number) => ids.has(libro);
}

export interface RespuestaBusqueda {
  total: number;
  resultados: ResultadoBusqueda[];
  origen: "local" | "remoto";
}

export async function buscarVersiculos(
  trad: string,
  consulta: string,
  modo: ModoBusqueda,
  testamento: FiltroTestamento,
  pagina = 1,
  limite = 40,
): Promise<RespuestaBusqueda> {
  const q = consulta.trim();
  if (!q) return { total: 0, resultados: [], origen: "local" };

  // Búsqueda exacta local si la traducción está descargada.
  if (modo === "exacta") {
    const indice = await cargarIndiceLocal(trad);
    if (indice) {
      const qn = normalizarTexto(q);
      const palabras = qn.split(" ").filter(Boolean).map(escaparRegex);
      const regex = new RegExp(palabras.length > 1 ? palabras.join("\\s+") : `(?<![\\p{L}\\p{N}])${palabras[0]}`, "u");
      const pasa = filtroLibro(testamento);
      const todos = indice.filter((v) => pasa(v.libro) && regex.test(v.norm));
      const inicio = (pagina - 1) * limite;
      return {
        total: todos.length,
        resultados: todos.slice(inicio, inicio + limite).map(({ libro, capitulo, verso, texto }) => ({ libro, capitulo, verso, texto })),
        origen: "local",
      };
    }
  }

  const params = new URLSearchParams({
    search: q,
    match_case: "false",
    match_whole: modo === "exacta" ? "true" : "false",
    limit: String(limite),
    page: String(pagina),
  });
  if (testamento !== "todo") params.set("book", testamento.toLowerCase());
  const datos = await pedirJson<{ total?: number; exact_matches?: number; results?: { book: number; chapter: number; verse: number; text: string }[] }>(
    `${BASE}/v2/find/${trad}?${params.toString()}`,
  );
  const resultados = (datos.results ?? []).map((r) => ({
    libro: Number(r.book),
    capitulo: Number(r.chapter),
    verso: Number(r.verse),
    texto: limpiarTexto(r.text ?? ""),
  }));
  return { total: Number(datos.total ?? resultados.length), resultados, origen: "remoto" };
}
