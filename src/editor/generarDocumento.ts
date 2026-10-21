import { REFERENCIAS_NVI, SELECCIONES, type ItemSeleccion, type Seleccion } from "../data/seleccion";
import { SERIES, TEMAS, type Tema } from "../data/temas";
import { escaparHtml as esc } from "./comandos";

export interface DocumentoEscritorio {
  id: string;
  temaId: string;
  orden: number | null;
  titulo: string;
  referencias: string[];
  grupo: "seleccion" | "extra";
  /** Escritorio (serie) al que pertenece; null para los extras abiertos desde la biblioteca. */
  seleccionId: string | null;
}

/** Construye la lista de documentos disponibles: todos los escritorios + los extras abiertos desde la biblioteca. */
export function listarDocumentos(extras: string[]): DocumentoEscritorio[] {
  const deSeleccion: DocumentoEscritorio[] = SELECCIONES.flatMap((seleccion) =>
    seleccion.items
      .filter((item) => TEMAS.some((t) => t.id === item.temaId))
      .map((item) => ({
        id: item.temaId,
        temaId: item.temaId,
        orden: item.orden as number | null,
        titulo: item.titulo,
        referencias: item.referencias,
        grupo: "seleccion" as const,
        seleccionId: seleccion.id as string | null,
      })),
  );

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
      seleccionId: null,
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
export function generarDocumento(tema: Tema, item?: ItemSeleccion, seleccion?: Seleccion): string {
  const titulo = item?.titulo ?? tema.titulo;
  const referencias = item?.referencias ?? [tema.textoBase.referencia];
  const serie = SERIES.find((s) => s.id === tema.serie);
  const partes: string[] = [];

  const bloqueIntroduccion = () => {
    partes.push(`<h2>${esc(tema.titulos?.introduccion ?? "Introducción")}</h2>`);
    if (tema.introduccion?.length) {
      tema.introduccion.forEach((p) => partes.push(`<p>${esc(p)}</p>`));
    } else {
      partes.push(parrafoMarcador("Escribe aquí tu introducción: una pregunta, una historia o una tensión que la congregación reconozca."));
      if (tema.porQueNoConvencional) partes.push(`<p>${esc(tema.porQueNoConvencional)}</p>`);
    }
  };

  if (tema.buenaNoticia?.length) {
    partes.push(`<h2>Buena noticia</h2>`);
    tema.buenaNoticia.forEach((p) => partes.push(`<p>${esc(p)}</p>`));
  }

  // La «Buena noticia» (introducción con título propio del predicador) siempre va primero:
  // antes del título de la serie y del tema.
  if (tema.titulos?.introduccion) bloqueIntroduccion();

  const encabezadoSerie = item && seleccion
    ? `Serie · ${seleccion.nombre} · Mensaje ${item.orden} de ${seleccion.items.length}`
    : `${serie?.nombre ?? ""} · ${serie?.titulo ?? ""} · Tema ${tema.numero}`;
  partes.push(`<p class="serie">${esc(encabezadoSerie)}</p>`);
  partes.push(`<h1>${esc(titulo)}</h1>`);
  if (tema.subtitulo) partes.push(`<p class="subtitulo">${esc(tema.subtitulo)}</p>`);
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

  if (tema.ideaCentral) partes.push(`<h2>Idea central</h2><p><strong>${esc(tema.ideaCentral)}</strong></p>`);

  const bloqueContexto = () => {
    if (tema.contexto?.length) {
      partes.push(`<h2>Contexto del pasaje</h2>`);
      tema.contexto.forEach((p) => partes.push(`<p>${esc(p)}</p>`));
    }
  };

  bloqueContexto();

  if (tema.luzNuevoPacto?.length) {
    partes.push(`<h2>Desde la luz del nuevo pacto</h2>`);
    tema.luzNuevoPacto.forEach((p) => partes.push(`<p>${esc(p)}</p>`));
  }

  if (!tema.titulos?.introduccion) bloqueIntroduccion();

  if (tema.tituloBosquejo) partes.push(`<h2>${esc(tema.tituloBosquejo)}</h2>`);
  tema.bosquejo.forEach((punto, i) => {
    partes.push(`<h2>${i + 1}. ${esc(punto.titulo)}</h2>`);
    if (punto.bloques) {
      punto.bloques.forEach((b) => {
        if (b.tipo === "texto") partes.push(`<p>${esc(b.texto)}</p>`);
        else if (b.tipo === "lista")
          partes.push(
            `<ul>${b.items
              .map(
                (it) =>
                  `<li>${esc(it.texto)}${it.sub?.length ? `<ul>${it.sub.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</li>`,
              )
              .join("")}</ul>`,
          );
        else partes.push(bloqueVersiculo(b.referencia, b.texto, b.version ?? "NVI"));
      });
      return;
    }
    if (!punto.estructura) partes.push(`<p class="referencia">${esc(punto.referencia)}</p>`);
    if (punto.estructura) {
      partes.push(`<p><strong>Verdad central:</strong> ${esc(punto.desarrollo)}</p>`);
    } else {
      partes.push(`<p>${esc(punto.desarrollo)}</p>`);
    }
    punto.versiculos?.forEach((v) => {
      partes.push(bloqueVersiculo(v.referencia, v.texto, v.version ?? "NVI"));
      if (v.nota) partes.push(`<p class="nota"><em>Nota: ${esc(v.nota)}</em></p>`);
    });
    punto.estructura?.forEach((e) => {
      partes.push(`<p><strong>${esc(e.etiqueta)}:</strong> ${esc(e.texto)}</p>`);
    });
  });

  if (tema.ilustracion) partes.push(`<h2>Ilustración</h2><p>${esc(tema.ilustracion)}</p>`);

  if (tema.aplicacion.length) {
    partes.push(`<h2>Aplicación para la semana</h2><ul>${tema.aplicacion.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`);
  }

  if (tema.cuidadoPastoral) partes.push(`<h2>Cuidado pastoral</h2><p>${esc(tema.cuidadoPastoral)}</p>`);

  const bloquePreguntas = () => {
    if (tema.preguntasGrupo?.length) {
      partes.push(
        `<h2>${esc(tema.titulos?.preguntas ?? "Preguntas para conversar en grupo")}</h2><ol>${tema.preguntasGrupo.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>`,
      );
    }
  };

  // Con títulos propios del predicador las preguntas van antes del cierre; si no, después de la conclusión.
  if (tema.titulos?.preguntas) bloquePreguntas();

  partes.push(`<h2>${esc(tema.titulos?.conclusion ?? "Conclusión y llamado")}</h2>`);
  if (tema.conclusion?.length) {
    tema.conclusion.forEach((p) => partes.push(`<p>${esc(p)}</p>`));
  } else {
    partes.push(parrafoMarcador("Cierra volviendo a la idea central. ¿Qué debe creer, sentir y hacer la congregación al salir?"));
  }

  if (!tema.titulos?.preguntas) bloquePreguntas();

  partes.push(`<hr>`);
  partes.push(`<p class="nota">Textos de apoyo: ${esc(tema.textosApoyo.join(" · "))}</p>`);

  return partes.join("\n");
}

export function documentoInicial(doc: DocumentoEscritorio): string {
  const tema = TEMAS.find((t) => t.id === doc.temaId);
  if (!tema) return `<h1>${esc(doc.titulo)}</h1><p></p>`;
  const seleccion = SELECCIONES.find((s) => s.id === doc.seleccionId);
  const item = seleccion?.items.find((i) => i.temaId === doc.temaId);
  return generarDocumento(tema, doc.grupo === "seleccion" ? item : undefined, seleccion);
}
