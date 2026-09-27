import { LIBROS, type Libro } from "./libros";

export interface RangoVersos {
  desde: number;
  hasta: number;
}

export interface Referencia {
  libro: Libro;
  capitulo: number;
  /** Vacío = capítulo completo. */
  versos: RangoVersos[];
  /** Si el rango continúa en otro capítulo (p. ej. «Juan 3:16-4:2»). */
  hastaCapitulo?: number;
  hastaVerso?: number;
}

export function normalizarTexto(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizarNombreLibro(s: string): string {
  let t = normalizarTexto(s).replace(/\./g, "").replace(/[ªº°]/g, "");
  t = t.replace(/^(san|santo)\s+/, "");
  t = t.replace(/^(primera|primer|primero|1ra|1a|1o|1er|i)\s+(?:de\s+)?/, "1 ");
  t = t.replace(/^(segunda|segundo|2da|2a|2o|2do|ii)\s+(?:de\s+)?/, "2 ");
  t = t.replace(/^(tercera|tercero|3ra|3a|3o|3er|iii)\s+(?:de\s+)?/, "3 ");
  t = t.replace(/^([123])\s*(?:de\s+)?/, "$1 ");
  t = t.replace(/^(\d)([a-z])/, "$1 $2");
  return t.replace(/\s+/g, " ").trim();
}

/** Encuentra un libro por nombre, abreviatura o alias; admite prefijos no ambiguos. */
export function buscarLibro(nombre: string): Libro | null {
  const q = normalizarNombreLibro(nombre);
  if (!q) return null;
  const exacto = LIBROS.find((l) => normalizarNombreLibro(l.nombre) === q || l.alias.includes(q));
  if (exacto) return exacto;
  if (q.length < 2) return null;
  const candidatos = LIBROS.filter((l) => normalizarNombreLibro(l.nombre).startsWith(q) || l.alias.some((a) => a.startsWith(q)));
  if (candidatos.length === 1) return candidatos[0];
  if (candidatos.length > 1) {
    // Si el prefijo coincide con el nombre completo de un solo libro, prefiérelo.
    const porNombre = candidatos.filter((l) => normalizarNombreLibro(l.nombre).startsWith(q));
    if (porNombre.length === 1) return porNombre[0];
  }
  return null;
}

function parsearListaVersos(spec: string): RangoVersos[] {
  const rangos: RangoVersos[] = [];
  spec
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((p) => {
      const m = p.match(/^(\d+)(?:\s*[-–—]\s*(\d+))?$/);
      if (!m) return;
      const desde = Number(m[1]);
      const hasta = m[2] ? Number(m[2]) : desde;
      if (desde > 0) rangos.push({ desde, hasta: Math.max(desde, hasta) });
    });
  return rangos;
}

/** Interpreta una referencia como «Juan 3:16», «Sal 23», «Ro 8:1-4, 28» o «1 Co 13.4-7». */
export function parsearReferencia(entrada: string): Referencia | null {
  const texto = entrada.replace(/\u00a0/g, " ").trim();
  if (!texto) return null;

  const m = texto.match(
    /^\s*((?:[1-3]|i{1,3}|primera|primer|segunda|segundo|tercera|tercero|1ra|2da|3ra|1a|2a|3a)?\s*(?:de\s+)?[a-záéíóúñü.ªº°]+(?:\s+(?:de\s+los\s+|de\s+)?[a-záéíóúñü.]+)*)\s*[.,]?\s*(\d.*)?$/i,
  );
  if (!m) return null;

  const libro = buscarLibro(m[1]);
  if (!libro) return null;

  const numeros = (m[2] ?? "").trim();
  if (!numeros) return { libro, capitulo: 1, versos: [] };

  // Libros de un solo capítulo: «Judas 4» o «Filemón 6-7» se refieren a versículos.
  if (libro.capitulos === 1) {
    const soloVersos = numeros.match(/^(\d+(?:\s*[-–—]\s*\d+)?(?:\s*,\s*\d+(?:\s*[-–—]\s*\d+)?)*)\s*$/);
    if (soloVersos) return { libro, capitulo: 1, versos: parsearListaVersos(soloVersos[1]) };
    const conCap = numeros.match(/^1\s*[:.]\s*(.+)$/);
    if (conCap) return { libro, capitulo: 1, versos: parsearListaVersos(conCap[1]) };
    return { libro, capitulo: 1, versos: [] };
  }

  // Rango que cruza capítulos: «3:16-4:2».
  const cruzado = numeros.match(/^(\d+)\s*[:.]\s*(\d+)\s*[-–—]\s*(\d+)\s*[:.]\s*(\d+)\s*$/);
  if (cruzado) {
    const capitulo = Number(cruzado[1]);
    return {
      libro,
      capitulo,
      versos: [{ desde: Number(cruzado[2]), hasta: 999 }],
      hastaCapitulo: Number(cruzado[3]),
      hastaVerso: Number(cruzado[4]),
    };
  }

  const simple = numeros.match(/^(\d+)(?:\s*[:.]\s*(\d+(?:\s*[-–—]\s*\d+)?(?:\s*,\s*\d+(?:\s*[-–—]\s*\d+)?)*))?/);
  if (!simple) return null;
  const capitulo = Math.min(Math.max(1, Number(simple[1])), libro.capitulos);
  const versos = simple[2] ? parsearListaVersos(simple[2]) : [];
  return { libro, capitulo, versos };
}

/** Interpreta varias referencias separadas por «;» o saltos de línea. */
export function parsearReferencias(texto: string): Referencia[] {
  return texto
    .split(/[;\n]+/)
    .map((p) => parsearReferencia(p))
    .filter((r): r is Referencia => r !== null);
}

/** Agrupa números de versículo en rangos: [1,2,3,7,9,10] → «1-3, 7, 9-10». */
export function rangosDesdeNumeros(numeros: number[]): RangoVersos[] {
  const orden = Array.from(new Set(numeros)).sort((a, b) => a - b);
  const rangos: RangoVersos[] = [];
  orden.forEach((n) => {
    const ultimo = rangos[rangos.length - 1];
    if (ultimo && n === ultimo.hasta + 1) ultimo.hasta = n;
    else rangos.push({ desde: n, hasta: n });
  });
  return rangos;
}

export function formatearRangos(rangos: RangoVersos[]): string {
  return rangos.map((r) => (r.desde === r.hasta ? `${r.desde}` : `${r.desde}-${r.hasta}`)).join(", ");
}

export function formatearReferencia(libro: Libro, capitulo: number, versos: number[] = []): string {
  const base = libro.capitulos === 1 ? libro.nombre : `${libro.nombre} ${capitulo}`;
  if (versos.length === 0) return base;
  const rangos = formatearRangos(rangosDesdeNumeros(versos));
  return libro.capitulos === 1 ? `${base} ${rangos}` : `${base}:${rangos}`;
}

/** Expande los rangos de una referencia a una lista de números de versículo. */
export function versosDeReferencia(ref: Referencia, maximo = 200): number[] {
  const lista: number[] = [];
  ref.versos.forEach((r) => {
    for (let v = r.desde; v <= Math.min(r.hasta, maximo); v++) lista.push(v);
  });
  return lista;
}

/** Busca referencias bíblicas dentro de un texto libre (para «abrir referencia seleccionada»). */
export function extraerReferenciasDeTexto(texto: string): Referencia[] {
  const patron =
    /(?:[1-3]\s*)?[A-Za-zÁÉÍÓÚÑáéíóúñ]{2,}(?:\s+de\s+los\s+[A-Za-zÁÉÍÓÚÑáéíóúñ]+)?\.?\s+\d{1,3}(?:\s*[:.]\s*\d{1,3}(?:\s*[-–—]\s*\d{1,3}(?:\s*[:.]\s*\d{1,3})?)?(?:\s*,\s*\d{1,3}(?:\s*[-–—]\s*\d{1,3})?)*)?/g;
  const encontradas: Referencia[] = [];
  const vistas = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = patron.exec(texto)) !== null) {
    const ref = parsearReferencia(m[0]);
    if (!ref) continue;
    const clave = `${ref.libro.id}:${ref.capitulo}:${formatearRangos(ref.versos)}`;
    if (vistas.has(clave)) continue;
    vistas.add(clave);
    encontradas.push(ref);
  }
  return encontradas;
}
