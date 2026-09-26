import { REFERENCIAS_NVI, SELECCION, type ItemSeleccion } from "../data/seleccion";
import { SERIES, TEMAS, type Tema } from "../data/temas";
import { escaparHtml as esc } from "./comandos";

export interface DocumentoEscritorio {
  id: string;
  temaId: string;
  orden: number | null;
  titulo: string;
  referencias: string[];
  grupo: "seleccion" | "extra";
}

/** Construye la lista de documentos disponibles: la selección + los extras abiertos desde la biblioteca. */
export function listarDocumentos(extras: string[]): DocumentoEscritorio[] {
  const deSeleccion: DocumentoEscritorio[] = SELECCION.items
    .filter((item) => TEMAS.some((t) => t.id === item.temaId))
    .map((item) => ({
      id: item.temaId,
      temaId: item.temaId,
      orden: item.orden as number | null,
      titulo: item.titulo,
      referencias: item.referencias,
      grupo: "seleccion" as const,
    }));

  const idsSeleccion = new Set(deSeleccion.map((d) => d.id));
  const deExtras: DocumentoEscritorio[] = extras
    .filter((id) => !idsSeleccion.has(id))
    .map((id) => TEMAS.find((t) => t.id === id))
    .filter((t): t is Tema => Boolean(t))
    .map((t) => ({
      id: t.id,
      temaId: t.id,
      orden: null,
      titulo: t.titulo,
      referencias: [t.textoBase.referencia],
      grupo: "extra" as const,
    }));

  return [...deSeleccion, ...deExtras];
}

function bloqueVersiculo(referencia: string, texto: string, version = "NVI"): string {
  return `<blockquote class="versiculo"><p><strong>${esc(referencia)}</strong> <span class="nota">(${esc(version)})</span></p><p>«${esc(texto)}»</p></blockquote>`;
}

function parrafoMarcador(texto: string): string {
  return `<p><span class="marcador">[${esc(texto)}]</span></p>`;
}

/** Genera el HTML inicial del mensaje, listo para editar. */
export function generarDocumento(tema: Tema, item?: ItemSeleccion): string {
  const titulo = item?.titulo ?? tema.titulo;
  const referencias = item?.referencias ?? [tema.textoBase.referencia];
  const serie = SERIES.find((s) => s.id === tema.serie);
  const partes: string[] = [];

  const encabezadoSerie = item
    ? `Serie · ${SELECCION.nombre} · Mensaje ${item.orden} de ${SELECCION.items.length}`
    : `${serie?.nombre ?? ""} · ${serie?.titulo ?? ""} · Tema ${tema.numero}`;
  partes.push(`<p class="serie">${esc(encabezadoSerie)}</p>`);
  partes.push(`<h1>${esc(titulo)}</h1>`);
  partes.push(`<p class="subtitulo">${esc(tema.subtitulo)}</p>`);
  partes.push(`<p class="referencia">Texto base · ${esc(referencias.join(" · "))}</p>`);

  // Textos base escogidos por el predicador (NVI si está disponible; RVR1960 como respaldo).
  referencias.forEach((ref) => {
    const nvi = REFERENCIAS_NVI[ref];
    if (nvi) {
      partes.push(bloqueVersiculo(ref, nvi));
    } else if (ref === tema.textoBase.referencia) {
      partes.push(bloqueVersiculo(ref, tema.textoBase.texto, tema.textoBase.version ?? "RVR1960"));
      if (tema.textoBaseNVI) partes.push(bloqueVersiculo(ref, tema.textoBaseNVI));
    } else {
      partes.push(`<p class="referencia">${esc(ref)}</p>`);
    }
  });

  partes.push(`<h2>Idea central</h2><p><strong>${esc(tema.ideaCentral)}</strong></p>`);

  partes.push(`<h2>Introducción</h2>`);
  partes.push(parrafoMarcador("Escribe aquí tu introducción: una pregunta, una historia o una tensión que la congregación reconozca."));
  partes.push(`<p>${esc(tema.porQueNoConvencional)}</p>`);

  tema.bosquejo.forEach((punto, i) => {
    partes.push(`<h2>${i + 1}. ${esc(punto.titulo)}</h2>`);
    partes.push(`<p class="referencia">${esc(punto.referencia)}</p>`);
    partes.push(`<p>${esc(punto.desarrollo)}</p>`);
    punto.versiculos?.forEach((v) => {
      partes.push(bloqueVersiculo(v.referencia, v.texto, v.version ?? "NVI"));
      if (v.nota) partes.push(`<p class="nota"><em>Nota: ${esc(v.nota)}</em></p>`);
    });
  });

  partes.push(`<h2>Ilustración</h2><p>${esc(tema.ilustracion)}</p>`);

  partes.push(`<h2>Aplicación para la semana</h2><ul>${tema.aplicacion.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`);

  partes.push(`<h2>Cuidado pastoral</h2><p>${esc(tema.cuidadoPastoral)}</p>`);

  partes.push(`<h2>Conclusión y llamado</h2>`);
  partes.push(parrafoMarcador("Cierra volviendo a la idea central. ¿Qué debe creer, sentir y hacer la congregación al salir?"));

  partes.push(`<hr>`);
  partes.push(`<p class="nota">Textos de apoyo: ${esc(tema.textosApoyo.join(" · "))}</p>`);

  return partes.join("\n");
}

export function documentoInicial(doc: DocumentoEscritorio): string {
  const tema = TEMAS.find((t) => t.id === doc.temaId);
  if (!tema) return `<h1>${esc(doc.titulo)}</h1><p></p>`;
  const item = SELECCION.items.find((i) => i.temaId === doc.temaId);
  return generarDocumento(tema, doc.grupo === "seleccion" ? item : undefined);
}
