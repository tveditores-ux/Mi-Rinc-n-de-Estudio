/**
 * Utilidades del editor de texto enriquecido (basadas en la API nativa de edición
 * del navegador) y funciones de exportación, búsqueda y estadísticas.
 */

export type Bloque = "p" | "h1" | "h2" | "h3" | "blockquote" | "pre";

export interface EstadoFormato {
  negrita: boolean;
  cursiva: boolean;
  subrayado: boolean;
  tachado: boolean;
  izquierda: boolean;
  centro: boolean;
  derecha: boolean;
  justificado: boolean;
  listaNumerada: boolean;
  listaVinetas: boolean;
  bloque: string;
  fuente: string;
  tamano: string;
}

export const FUENTES = [
  { nombre: "Georgia", css: "Georgia, serif" },
  { nombre: "Cormorant Garamond", css: "'Cormorant Garamond', Georgia, serif" },
  { nombre: "Times New Roman", css: "'Times New Roman', Times, serif" },
  { nombre: "Garamond", css: "Garamond, 'EB Garamond', serif" },
  { nombre: "Cambria", css: "Cambria, Georgia, serif" },
  { nombre: "Arial", css: "Arial, Helvetica, sans-serif" },
  { nombre: "Calibri", css: "Calibri, 'Segoe UI', Inter, sans-serif" },
  { nombre: "Verdana", css: "Verdana, Geneva, sans-serif" },
  { nombre: "Inter", css: "Inter, system-ui, sans-serif" },
  { nombre: "Courier New", css: "'Courier New', Courier, monospace" },
];

export const TAMANOS = [9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48];

export const COLORES_TEXTO = [
  "#17130f", "#3a2f26", "#55473b", "#812236", "#9a2f45", "#9a6b1f", "#4f5d3a",
  "#1f4e79", "#2e75b6", "#7030a0", "#c00000", "#ff0000", "#ed7d31", "#ffc000", "#70ad47", "#ffffff",
];

export const COLORES_RESALTADO = [
  "transparent", "#fff2a8", "#ffe59a", "#d9f2b4", "#c9e7ff", "#f6d1dc", "#e8d5ff", "#ffd8b1", "#e6e6e6",
];

let estilosConCss = false;

function prepararEdicion() {
  if (!estilosConCss) {
    try {
      document.execCommand("styleWithCSS", false, "true");
    } catch {
      /* ignorar */
    }
    estilosConCss = true;
  }
}

export function ejecutar(comando: string, valor?: string): boolean {
  prepararEdicion();
  try {
    return document.execCommand(comando, false, valor);
  } catch {
    return false;
  }
}

export function aplicarBloque(bloque: Bloque) {
  ejecutar("formatBlock", `<${bloque}>`);
}

export function aplicarFuente(css: string) {
  ejecutar("fontName", css);
}

/**
 * Aplica un tamaño en puntos. execCommand solo admite 1–7, así que usamos el 7
 * como marcador y luego lo sustituimos por un tamaño real.
 */
export function aplicarTamano(raiz: HTMLElement, puntos: number) {
  ejecutar("fontSize", "7");
  const marcados = raiz.querySelectorAll<HTMLElement>('font[size="7"], span[style*="xxx-large"], span[style*="font-size: -webkit-xxx-large"]');
  marcados.forEach((el) => {
    el.removeAttribute("size");
    el.style.fontSize = `${puntos}pt`;
  });
}

export function colorTexto(color: string) {
  ejecutar("foreColor", color);
}

export function resaltar(color: string) {
  if (!ejecutar("hiliteColor", color)) ejecutar("backColor", color);
}

export function limpiarFormato() {
  ejecutar("removeFormat");
  ejecutar("formatBlock", "<p>");
}

export function insertarHtml(html: string) {
  ejecutar("insertHTML", html);
}

export function insertarTexto(texto: string) {
  ejecutar("insertText", texto);
}

export type ModoCaso = "mayusculas" | "minusculas" | "titulo" | "oracion";

export function cambiarCaso(modo: ModoCaso) {
  const sel = window.getSelection();
  const texto = sel?.toString() ?? "";
  if (!texto) return;
  let nuevo = texto;
  switch (modo) {
    case "mayusculas":
      nuevo = texto.toLocaleUpperCase("es");
      break;
    case "minusculas":
      nuevo = texto.toLocaleLowerCase("es");
      break;
    case "titulo":
      nuevo = texto
        .toLocaleLowerCase("es")
        .replace(/(^|[\s(«"'])(\p{L})/gu, (_m, pre: string, letra: string) => pre + letra.toLocaleUpperCase("es"));
      break;
    case "oracion":
      nuevo = texto
        .toLocaleLowerCase("es")
        .replace(/(^\s*|[.!?…]\s+)(\p{L})/gu, (_m, pre: string, letra: string) => pre + letra.toLocaleUpperCase("es"));
      break;
  }
  insertarTexto(nuevo);
}

export function leerEstado(): EstadoFormato {
  const q = (c: string) => {
    try {
      return document.queryCommandState(c);
    } catch {
      return false;
    }
  };
  const v = (c: string) => {
    try {
      return document.queryCommandValue(c) ?? "";
    } catch {
      return "";
    }
  };
  return {
    negrita: q("bold"),
    cursiva: q("italic"),
    subrayado: q("underline"),
    tachado: q("strikeThrough"),
    izquierda: q("justifyLeft"),
    centro: q("justifyCenter"),
    derecha: q("justifyRight"),
    justificado: q("justifyFull"),
    listaNumerada: q("insertOrderedList"),
    listaVinetas: q("insertUnorderedList"),
    bloque: String(v("formatBlock")).toLowerCase(),
    fuente: String(v("fontName")).replace(/["']/g, ""),
    tamano: String(v("fontSize")),
  };
}

/** Devuelve el HTML del documento sin marcas temporales de búsqueda o lectura. */
export function htmlLimpio(raiz: HTMLElement): string {
  const clon = raiz.cloneNode(true) as HTMLElement;
  clon.querySelectorAll("mark.hallazgo").forEach((m) => {
    m.replaceWith(document.createTextNode(m.textContent ?? ""));
  });
  clon.querySelectorAll(".leyendo").forEach((el) => el.classList.remove("leyendo"));
  clon.querySelectorAll("[class='']").forEach((el) => el.removeAttribute("class"));
  clon.normalize();
  return clon.innerHTML;
}

export function textoPlano(raiz: HTMLElement): string {
  return raiz.innerText ?? raiz.textContent ?? "";
}

export interface Estadisticas {
  palabras: number;
  caracteres: number;
  caracteresSinEspacios: number;
  parrafos: number;
  minutos: number;
}

/** ~130 palabras por minuto es un ritmo de predicación pausado. */
export function calcularEstadisticas(texto: string, ppm = 130): Estadisticas {
  const limpio = texto.replace(/\u00a0/g, " ").trim();
  const palabras = limpio ? limpio.split(/\s+/).filter((p) => /\p{L}|\p{N}/u.test(p)).length : 0;
  const parrafos = limpio ? limpio.split(/\n{1,}/).filter((p) => p.trim().length > 0).length : 0;
  return {
    palabras,
    caracteres: limpio.length,
    caracteresSinEspacios: limpio.replace(/\s/g, "").length,
    parrafos,
    minutos: Math.max(1, Math.round(palabras / ppm)),
  };
}

/* ─────────────────────────── Búsqueda y reemplazo ─────────────────────────── */

export interface OpcionesBusqueda {
  distinguirMayusculas: boolean;
  palabraCompleta: boolean;
}

function escaparRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function quitarMarcas(raiz: HTMLElement) {
  raiz.querySelectorAll("mark.hallazgo").forEach((m) => {
    m.replaceWith(document.createTextNode(m.textContent ?? ""));
  });
  raiz.normalize();
}

export function marcarCoincidencias(raiz: HTMLElement, termino: string, opciones: OpcionesBusqueda): HTMLElement[] {
  quitarMarcas(raiz);
  if (!termino.trim()) return [];
  const patron = opciones.palabraCompleta ? `(?<![\\p{L}\\p{N}])${escaparRegex(termino)}(?![\\p{L}\\p{N}])` : escaparRegex(termino);
  const regex = new RegExp(patron, `gu${opciones.distinguirMayusculas ? "" : "i"}`);

  const caminante = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  const nodos: Text[] = [];
  let actual = caminante.nextNode();
  while (actual) {
    nodos.push(actual as Text);
    actual = caminante.nextNode();
  }

  nodos.forEach((nodo) => {
    const texto = nodo.data;
    if (!texto || !regex.test(texto)) {
      regex.lastIndex = 0;
      return;
    }
    regex.lastIndex = 0;
    const fragmento = document.createDocumentFragment();
    let ultimo = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(texto)) !== null) {
      if (m.index > ultimo) fragmento.appendChild(document.createTextNode(texto.slice(ultimo, m.index)));
      const marca = document.createElement("mark");
      marca.className = "hallazgo";
      marca.textContent = m[0];
      fragmento.appendChild(marca);
      ultimo = m.index + m[0].length;
      if (m[0].length === 0) regex.lastIndex++;
    }
    if (ultimo < texto.length) fragmento.appendChild(document.createTextNode(texto.slice(ultimo)));
    nodo.replaceWith(fragmento);
  });

  return Array.from(raiz.querySelectorAll<HTMLElement>("mark.hallazgo"));
}

export function reemplazarMarca(marca: HTMLElement, reemplazo: string) {
  marca.replaceWith(document.createTextNode(reemplazo));
}

/* ─────────────────────────── Exportación ─────────────────────────── */

export const CSS_DOCUMENTO = `
  body { font-family: Georgia, 'Times New Roman', serif; font-size: 12pt; line-height: 1.55; color: #17130f; max-width: 17cm; margin: 2cm auto; }
  h1 { font-size: 24pt; line-height: 1.15; margin: 0 0 6pt; }
  h2 { font-size: 15pt; margin: 18pt 0 6pt; color: #4a1420; }
  h3 { font-size: 13pt; margin: 14pt 0 4pt; }
  p { margin: 0 0 8pt; }
  .serie { font-family: Arial, sans-serif; font-size: 9pt; letter-spacing: .18em; text-transform: uppercase; color: #9a6b1f; }
  .subtitulo { font-style: italic; font-size: 14pt; color: #55473b; }
  .referencia { font-family: Arial, sans-serif; font-size: 9pt; letter-spacing: .12em; text-transform: uppercase; color: #812236; margin-bottom: 4pt; }
  blockquote { margin: 8pt 0 10pt; padding: 6pt 12pt; border-left: 3pt solid #cfa04a; background: #faf3df; }
  blockquote.versiculo { font-size: 12.5pt; }
  .nota { font-size: 10pt; color: #55473b; }
  ul, ol { margin: 0 0 8pt 22pt; }
  li { margin-bottom: 4pt; }
  hr { border: 0; border-top: 1px solid #dccba5; margin: 14pt 0; }
  .marcador { color: #8a7a6b; font-style: italic; }
`;

export function envolverHtml(titulo: string, cuerpo: string, paraWord = false): string {
  const ns = paraWord
    ? ' xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"'
    : ' lang="es"';
  return `<!DOCTYPE html><html${ns}><head><meta charset="utf-8"><title>${escaparHtml(titulo)}</title><style>${CSS_DOCUMENTO}</style></head><body>${cuerpo}</body></html>`;
}

export function escaparHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function descargar(nombre: string, contenido: string, tipo: string) {
  const blob = new Blob(["\ufeff", contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function nombreArchivo(titulo: string): string {
  return (
    titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "mensaje"
  );
}

export function exportarWord(titulo: string, html: string) {
  descargar(`${nombreArchivo(titulo)}.doc`, envolverHtml(titulo, html, true), "application/msword;charset=utf-8");
}

export function exportarHtml(titulo: string, html: string) {
  descargar(`${nombreArchivo(titulo)}.html`, envolverHtml(titulo, html), "text/html;charset=utf-8");
}

export function exportarTexto(titulo: string, texto: string) {
  descargar(`${nombreArchivo(titulo)}.txt`, texto, "text/plain;charset=utf-8");
}

export async function copiarAlPortapapeles(texto: string, html?: string): Promise<boolean> {
  try {
    if (html && typeof ClipboardItem !== "undefined") {
      const item = new ClipboardItem({
        "text/plain": new Blob([texto], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      });
      await navigator.clipboard.write([item]);
    } else {
      await navigator.clipboard.writeText(texto);
    }
    return true;
  } catch {
    return false;
  }
}

/* ─────────────────────────── Bloques para lectura ─────────────────────────── */

export interface BloqueLectura {
  elemento: HTMLElement;
  texto: string;
}

/** Extrae los bloques de texto del documento en orden de lectura. */
export function extraerBloques(raiz: HTMLElement): BloqueLectura[] {
  const resultado: BloqueLectura[] = [];
  const visitar = (el: Element) => {
    const etiqueta = el.tagName.toLowerCase();
    if (etiqueta === "ul" || etiqueta === "ol") {
      Array.from(el.children).forEach((li) => visitar(li));
      return;
    }
    if (etiqueta === "hr" || etiqueta === "br") return;
    const texto = ((el as HTMLElement).innerText ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (texto) resultado.push({ elemento: el as HTMLElement, texto });
  };
  Array.from(raiz.children).forEach((hijo) => visitar(hijo));
  if (resultado.length === 0) {
    const texto = (raiz.innerText ?? "").trim();
    if (texto) resultado.push({ elemento: raiz, texto });
  }
  return resultado;
}

/** Divide un bloque en frases razonables para la síntesis de voz. */
export function dividirEnFrases(texto: string, maximo = 220): string[] {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (!limpio) return [];
  const brutas = limpio.match(/[^.!?…;]+[.!?…;]+["»”’)\]]*\s*|[^.!?…;]+$/g) ?? [limpio];
  const frases: string[] = [];
  brutas.forEach((f) => {
    const t = f.trim();
    if (!t) return;
    if (t.length <= maximo) {
      frases.push(t);
      return;
    }
    // Frase demasiado larga: partir por comas o por palabras.
    let acumulado = "";
    t.split(/(?<=,)\s+/).forEach((parte) => {
      if ((acumulado + " " + parte).trim().length > maximo && acumulado) {
        frases.push(acumulado.trim());
        acumulado = parte;
      } else {
        acumulado = (acumulado + " " + parte).trim();
      }
    });
    if (acumulado) frases.push(acumulado.trim());
  });
  return frases;
}
