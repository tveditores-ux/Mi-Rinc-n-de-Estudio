import { TEXTO_BASE_NVI, VERSICULOS_NVI } from "./versiculosNVI";

export type Necesidad =
  | "culpa"
  | "cansancio"
  | "legalismo"
  | "relaciones"
  | "finanzas"
  | "oracion"
  | "habitos"
  | "miedo"
  | "sufrimiento"
  | "ansiedad"
  | "pasado";

export type SerieId = 1 | 2 | 3 | 4;

export interface Cita {
  referencia: string;
  texto: string;
  version?: string;
  /** Observación breve del predicador sobre la traducción o el contexto. */
  nota?: string;
}

export interface PuntoBosquejo {
  titulo: string;
  referencia: string;
  desarrollo: string;
  /** Texto completo (NVI) de los pasajes clave de este punto. */
  versiculos?: Cita[];
}

export interface Serie {
  id: SerieId;
  nombre: string;
  titulo: string;
  descripcion: string;
}

export const SERIES: Serie[] = [
  {
    id: 1,
    nombre: "Serie 1",
    titulo: "Descansar en la gracia",
    descripcion:
      "Diez temas para sanar la relación con el Padre: perdón, identidad, descanso, culpa y confianza.",
  },
  {
    id: 2,
    nombre: "Serie 2",
    titulo: "Caminar en la gracia",
    descripcion:
      "Diez temas para llevar el nuevo pacto a la vida diaria: la Biblia, los hábitos, el trabajo, la lengua, la mesa, la misión y la restauración.",
  },
  {
    id: 3,
    nombre: "Serie 3",
    titulo: "Figuras del pacto",
    descripcion:
      "Diez temas que leen el Antiguo Testamento desde Cristo: pactos, montes, ciudades de refugio, serpientes de bronce, moabitas y jubileos que ya hablaban de la gracia.",
  },
  {
    id: 4,
    nombre: "Serie 4",
    titulo: "Gracia para las estaciones difíciles",
    descripcion:
      "Diez temas para cuando la vida duele: debilidad, ansiedad, agotamiento, enfermedad, duelo, silencio de Dios, vejez, espera, muerte y esperanza.",
  },
];

export interface Tema {
  id: string;
  numero: number;
  serie: SerieId;
  titulo: string;
  subtitulo: string;
  etiquetas: string[];
  necesidades: Necesidad[];
  textoBase: Cita;
  /** Mismo texto base en la Nueva Versión Internacional, cuando está disponible. */
  textoBaseNVI?: string;
  textosApoyo: string[];
  ideaCentral: string;
  porQueNoConvencional: string;
  bosquejo: PuntoBosquejo[];
  aplicacion: string[];
  cuidadoPastoral: string;
  ilustracion: string;
}

export const NECESIDADES: { id: Necesidad; etiqueta: string; descripcion: string }[] = [
  { id: "culpa", etiqueta: "Culpa y condenación", descripcion: "Creyentes que viven bajo vergüenza crónica" },
  { id: "cansancio", etiqueta: "Cansancio y agotamiento", descripcion: "Servidores agotados, sin fuerzas o sin motivación" },
  { id: "legalismo", etiqueta: "Legalismo y comparación", descripcion: "Iglesias con mentalidad de mérito" },
  { id: "relaciones", etiqueta: "Relaciones rotas", descripcion: "Heridas, rencor y falta de perdón" },
  { id: "finanzas", etiqueta: "Trabajo y finanzas", descripcion: "Dinero, vocación y generosidad" },
  { id: "oracion", etiqueta: "Vida devocional", descripcion: "Oración y lectura bíblica sin culpa" },
  { id: "habitos", etiqueta: "Hábitos y luchas", descripcion: "Pecados recurrentes y recaídas" },
  { id: "miedo", etiqueta: "Miedo a Dios", descripcion: "Imagen distorsionada del Padre" },
  { id: "sufrimiento", etiqueta: "Dolor y pérdida", descripcion: "Enfermedad, duelo, silencio de Dios" },
  { id: "ansiedad", etiqueta: "Ansiedad y espera", descripcion: "Incertidumbre, futuro y tiempos de Dios" },
  { id: "pasado", etiqueta: "Origen y pasado", descripcion: "Familia, exclusión y sentirse descalificado" },
];

export const PROMESAS_PACTO = [
  {
    titulo: "Ley en el corazón",
    cita: "«Pondré mis leyes en la mente de ellos, y sobre su corazón las escribiré» — Hebreos 8:10",
    explicacion: "La obediencia deja de ser presión externa y se convierte en deseo interno producido por el Espíritu.",
  },
  {
    titulo: "Relación garantizada",
    cita: "«Y seré a ellos por Dios, y ellos me serán a mí por pueblo» — Hebreos 8:10",
    explicacion: "La pertenencia no depende del desempeño del pueblo sino de la fidelidad del que promete.",
  },
  {
    titulo: "Conocimiento directo",
    cita: "«Todos me conocerán, desde el menor hasta el mayor de ellos» — Hebreos 8:11",
    explicacion: "Acceso sin intermediarios: cada creyente conoce al Padre por el Espíritu.",
  },
  {
    titulo: "Perdón definitivo",
    cita: "«Nunca más me acordaré de sus pecados y de sus iniquidades» — Hebreos 8:12",
    explicacion: "El fundamento de todo lo anterior: un perdón que no se renueva porque nunca se agota.",
  },
];

const TEMAS_BASE: Tema[] = [
  {
    id: "dios-dejo-de-llevar-cuentas",
    numero: 1,
    serie: 1,
    titulo: "Dios dejó de llevar cuentas",
    subtitulo: "El fin de la contabilidad espiritual",
    etiquetas: ["Identidad", "Perdón", "Culpa"],
    necesidades: ["culpa", "miedo"],
    textoBase: {
      referencia: "Hebreos 8:12",
      texto: "Porque seré propicio a sus injusticias, y nunca más me acordaré de sus pecados y de sus iniquidades.",
      version: "RVR1960",
    },
    textosApoyo: [
      "2 Corintios 5:19",
      "Romanos 4:7-8",
      "Hebreos 10:17-18",
      "Colosenses 2:13-14",
      "1 Corintios 13:5",
      "Salmo 103:12",
    ],
    ideaCentral:
      "Bajo el nuevo pacto, Dios no está actualizando un registro de tus fallas: el libro se cerró en la cruz. Y el Dios que no lleva cuentas contigo te libera para dejar de llevar cuentas con los demás.",
    porQueNoConvencional:
      "Muchos creyentes viven como si Dios tuviera una hoja de cálculo celestial donde cada domingo suma y cada tropiezo resta. Predicamos «perdón», pero vivimos «saldo». Este tema desmonta la imagen de Dios como contador y presenta al Dios que eligió no recordar.",
    bosquejo: [
      {
        titulo: "El registro que existía",
        referencia: "Colosenses 2:14",
        desarrollo:
          "Había un acta de decretos que nos era contraria. Pablo no dice que fue archivada ni reducida: fue clavada en la cruz. Lo que Dios clava, no lo vuelve a consultar.",
      },
      {
        titulo: "La memoria que Dios eligió",
        referencia: "Hebreos 8:12; 10:17",
        desarrollo:
          "«Nunca más me acordaré» no es olvido por debilidad sino decisión pactual de no traer a cuenta. Dios lo sabe todo, pero ha decidido no cobrarte nada.",
      },
      {
        titulo: "La contabilidad que tú heredas",
        referencia: "2 Corintios 5:19; 1 Corintios 13:5",
        desarrollo:
          "El ministerio de la reconciliación consiste en dejar de tomar en cuenta a otros lo que Dios no te toma en cuenta a ti. El amor «no toma en cuenta el mal recibido» porque nació de un Dios que hizo exactamente eso.",
      },
    ],
    aplicacion: [
      "Identifica la «cuenta» que estás llevando (contigo mismo o con alguien) y nómbrala en oración: «Señor, tú no llevas esta cuenta; yo tampoco la llevaré».",
      "Cuando regrese el recuerdo de un pecado ya confesado, responde en voz alta con Hebreos 10:17. La memoria de Dios manda sobre la tuya.",
      "Deja de «compensar» a Dios con actividad religiosa después de fallar. Ve a Él primero, no después de haber pagado.",
    ],
    cuidadoPastoral:
      "Que Dios no lleve cuentas no significa que el pecado no tenga consecuencias naturales ni que desaparezca la disciplina del Padre (Hebreos 12:6). Pero la disciplina es de un Padre que forma hijos, no de un juez que cobra a deudores.",
    ilustracion:
      "Un contador explica la diferencia entre «cuenta pendiente» y «cuenta cancelada»: la pendiente genera intereses cada día; la cancelada se archiva y nadie vuelve a abrirla. La cruz no redujo tu deuda: la canceló.",
  },
  {
    id: "perdona-porque-fuiste-perdonado",
    numero: 2,
    serie: 1,
    titulo: "Perdona porque ya fuiste perdonado",
    subtitulo: "La dirección del perdón cambió en la cruz",
    etiquetas: ["Perdón", "Relaciones"],
    necesidades: ["relaciones", "culpa"],
    textoBase: {
      referencia: "Efesios 4:32",
      texto:
        "Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.",
      version: "RVR1960",
    },
    textosApoyo: ["Colosenses 3:13", "Mateo 6:14-15", "Mateo 18:21-35", "Lucas 7:47", "1 Juan 4:19"],
    ideaCentral:
      "Antes de la cruz, el perdón se planteaba como condición («si perdonáis… os perdonará»). Después de la cruz se plantea como consecuencia («como Dios os perdonó»). No perdonas para ser perdonado: perdonas porque ya lo fuiste, y eso cambia todo el peso de la tarea.",
    porQueNoConvencional:
      "Mateo 6:15 suele predicarse como amenaza vigente sobre creyentes, produciendo un perdón forzado por miedo. Este tema muestra cómo el orden gramatical de las epístolas revela el orden del nuevo pacto: primero recibes, luego das.",
    bosquejo: [
      {
        titulo: "El perdón como requisito",
        referencia: "Mateo 6:14-15; 18:35",
        desarrollo:
          "Jesús, antes de la cruz, expone la lógica del reino a un pueblo bajo la ley: nadie que haya entendido cuánto se le perdonó puede retener el perdón. El siervo malvado no fue castigado por no pagar, sino por no reflejar.",
      },
      {
        titulo: "El perdón como resultado",
        referencia: "Efesios 4:32; Colosenses 3:13",
        desarrollo:
          "Después de la cruz, el «como» deja de ser condición y se convierte en modelo y fuente. Perdonamos «de la manera que Cristo nos perdonó»: primero, completamente y sin esperar merecimiento.",
      },
      {
        titulo: "El perdón como libertad",
        referencia: "Lucas 7:47",
        desarrollo:
          "El que sabe que se le perdonó mucho, ama mucho. Cuando alguien no logra perdonar, el problema rara vez es la ofensa recibida; casi siempre es que no ha visto el tamaño de la deuda que le fue cancelada.",
      },
    ],
    aplicacion: [
      "Escribe en una columna la deuda que alguien tiene contigo y en la otra la deuda que Dios canceló de ti (Mateo 18: diez mil talentos frente a cien denarios). Mira la proporción.",
      "Perdonar no es sentir; es decidir no cobrar. Declara el perdón aunque la emoción llegue después.",
      "Distingue perdón (unilateral, siempre posible) de reconciliación (bilateral, requiere arrepentimiento y confianza restaurada).",
    ],
    cuidadoPastoral:
      "Perdonar no exige exponerse otra vez al abuso. Se puede perdonar y mantener límites sabios. No se trata de negar el dolor, sino de entregar el derecho de cobrarlo.",
    ilustracion:
      "Diez mil talentos equivalían a unos sesenta millones de días de salario: una cifra absurda a propósito. Jesús quiere que veamos lo desproporcionado de nuestra deuda cancelada frente a cualquier ofensa que hayamos recibido.",
  },
  {
    id: "hijos-no-empleados",
    numero: 3,
    serie: 1,
    titulo: "Hijos, no empleados",
    subtitulo: "El hermano mayor también estaba perdido",
    etiquetas: ["Identidad", "Servicio", "Legalismo"],
    necesidades: ["legalismo", "cansancio"],
    textoBase: {
      referencia: "Lucas 15:31",
      texto: "Él entonces le dijo: Hijo, tú siempre estás conmigo, y todas mis cosas son tuyas.",
      version: "RVR1960",
    },
    textosApoyo: ["Lucas 15:1-2, 25-30", "Gálatas 4:4-7", "Romanos 8:15-17", "Juan 15:15", "Juan 8:35"],
    ideaCentral:
      "Se puede vivir en la casa del Padre con mentalidad de empleado: sirviendo por salario, comparándose, resentido y sin disfrutar la herencia. El nuevo pacto no te contrata: te adopta.",
    porQueNoConvencional:
      "La parábola casi siempre se predica enfocada en el pródigo, pero Jesús la contó para los fariseos (Lucas 15:1-2), que se parecían al hermano mayor. El personaje más peligroso no es el que se fue, sino el que se quedó sin conocer al Padre.",
    bosquejo: [
      {
        titulo: "El lenguaje del empleado",
        referencia: "Lucas 15:29",
        desarrollo:
          "«Tantos años te sirvo… nunca me has dado». Servicio contabilizado, obediencia sin intimidad, expectativa de pago. El hermano mayor estaba en la casa, pero vivía en la nómina.",
      },
      {
        titulo: "El corazón del Padre",
        referencia: "Lucas 15:28, 31",
        desarrollo:
          "El padre sale a buscar también al mayor. Le dice «hijo» (téknon, término de ternura) y le recuerda que todo ya era suyo. No lo regaña: lo invita a la fiesta.",
      },
      {
        titulo: "El espíritu de adopción",
        referencia: "Romanos 8:15; Gálatas 4:6-7",
        desarrollo:
          "El Espíritu no produce empleados temerosos, sino hijos que claman «Abba». El esclavo obedece para quedarse; el hijo se queda porque pertenece.",
      },
    ],
    aplicacion: [
      "Revisa tus motivaciones para servir: ¿esperas reconocimiento o «pago»? ¿Temes perder el favor de Dios si dejas de hacerlo? Nómbralo con honestidad.",
      "Disfruta esta semana algo de la herencia sin culpa: descanso, comunión, gozo. «Todas mis cosas son tuyas».",
      "Deja de mirar al hermano «pródigo» con comparación. Entra a la fiesta y siéntate a la mesa.",
    ],
    cuidadoPastoral:
      "Ser hijo no elimina el servicio, lo transforma. El hijo trabaja en la casa, pero desde la pertenencia, no para conseguirla. Predicar contra la mentalidad de empleado no es predicar contra el compromiso.",
    ilustracion:
      "Un empleado revisa su recibo de nómina; un hijo abre la nevera sin pedir permiso. El empleado pregunta «¿cuánto me toca?»; el hijo sabe que «todo es tuyo». La diferencia no está en la casa, sino en la relación.",
  },
  {
    id: "la-gracia-que-ensena-a-decir-no",
    numero: 4,
    serie: 1,
    titulo: "La gracia que enseña a decir «no»",
    subtitulo: "La gracia no es permiso: es poder",
    etiquetas: ["Santidad", "Hábitos", "Poder"],
    necesidades: ["habitos", "legalismo"],
    textoBase: {
      referencia: "Tito 2:11-12",
      texto:
        "Porque la gracia de Dios se ha manifestado para salvación a todos los hombres, enseñándonos que, renunciando a la impiedad y a los deseos mundanos, vivamos en este siglo sobria, justa y piadosamente.",
      version: "RVR1960",
    },
    textosApoyo: ["Romanos 6:14", "Romanos 2:4", "Romanos 8:3", "1 Corintios 15:10", "Juan 8:10-11", "Gálatas 5:16"],
    ideaCentral:
      "La gracia no es la razón por la que puedes pecar; es el poder por el que ya no tienes que hacerlo. Lo que la ley exigía sin capacitar, la gracia lo enseña y lo produce desde adentro.",
    porQueNoConvencional:
      "Se suele presentar la gracia como el «colchón» para las caídas y la ley como el «entrenador» para la santidad. Pablo dice lo contrario: la gracia es la maestra (paideúousa: la que instruye y disciplina), y el pecado se enseñorea precisamente de los que están bajo la ley.",
    bosquejo: [
      {
        titulo: "Lo que la ley no pudo",
        referencia: "Romanos 8:3; 7:8",
        desarrollo:
          "La ley diagnostica con precisión, pero el mandamiento despierta el deseo: el «no toques» aviva la codicia. La ley es santa, pero no tiene poder para producir lo que exige.",
      },
      {
        titulo: "Lo que la gracia enseña",
        referencia: "Tito 2:12",
        desarrollo:
          "Renuncia y vida nueva. La gracia no solo excusa: educa. Enseña a decir «no» a la impiedad y «sí» a una vida sobria, justa y piadosa. Es un currículo completo, no una amnistía.",
      },
      {
        titulo: "Cómo funciona en la práctica",
        referencia: "Juan 8:11; Romanos 2:4",
        desarrollo:
          "«Ni yo te condeno» precede a «no peques más». El orden es el secreto: la aceptación viene primero y la transformación después. La benignidad de Dios es lo que guía al arrepentimiento.",
      },
    ],
    aplicacion: [
      "Identifica un hábito con el que has luchado «a fuerza de voluntad» y cambia la estrategia: comienza cada día recordando tu aceptación, no tu deuda.",
      "Reemplaza la pregunta «¿esto está permitido?» por «¿esto es coherente con quien ya soy en Cristo?».",
      "Cuando falles, vuelve rápido. La vergüenza prolongada es el combustible principal de la recaída.",
    ],
    cuidadoPastoral:
      "La gracia que no produce cambio no ha sido comprendida (Judas 4 habla de convertir la gracia en libertinaje). Pero el remedio contra la gracia barata no es la ley, sino más gracia verdadera.",
    ilustracion:
      "Un niño aprende a nadar más rápido con su padre sosteniéndolo desde abajo que con alguien gritándole instrucciones desde la orilla. La ley grita desde la orilla; la gracia se mete al agua contigo.",
  },
  {
    id: "descansar-es-obedecer",
    numero: 5,
    serie: 1,
    titulo: "Descansar es obedecer",
    subtitulo: "El reposo como la obra del nuevo pacto",
    etiquetas: ["Descanso", "Fe", "Agotamiento"],
    necesidades: ["cansancio", "legalismo"],
    textoBase: {
      referencia: "Hebreos 4:9-10",
      texto:
        "Por tanto, queda un reposo para el pueblo de Dios. Porque el que ha entrado en su reposo, también ha reposado de sus obras, como Dios de las suyas.",
      version: "RVR1960",
    },
    textosApoyo: ["Mateo 11:28-30", "Juan 6:28-29", "Hebreos 3:18-19; 4:11", "Salmo 127:1-2", "Colosenses 2:16-17", "Lucas 10:38-42"],
    ideaCentral:
      "El sábado era la sombra; Cristo es el reposo. Entrar en ese descanso —dejar de trabajar para ganar lo que ya te fue dado— no es pereza espiritual: es la forma más alta de fe y, según Hebreos, algo que debemos «procurar».",
    porQueNoConvencional:
      "En muchas iglesias el cansancio se ve como señal de compromiso y el descanso como falta de celo. Hebreos invierte la lógica: la desobediencia de Israel fue precisamente no entrar en el reposo (4:6, 11). Descansar en la obra terminada es obediencia.",
    bosquejo: [
      {
        titulo: "El descanso que Israel rechazó",
        referencia: "Hebreos 3:18-19; 4:6",
        desarrollo:
          "La incredulidad se manifestó como incapacidad de descansar en la promesa. No entraron por incrédulos, no por perezosos. La ansiedad religiosa es incredulidad disfrazada de diligencia.",
      },
      {
        titulo: "El descanso que Cristo ofrece",
        referencia: "Mateo 11:28-30",
        desarrollo:
          "Un yugo compartido donde Él lleva el peso. «Aprended de mí» es aprender a descansar. El yugo es fácil no porque no haya trabajo, sino porque no estás tirando solo.",
      },
      {
        titulo: "El descanso como estilo de vida",
        referencia: "Hebreos 4:10; Juan 6:29",
        desarrollo:
          "La «obra» del nuevo pacto es creer. Trabajamos desde el descanso, no para conseguirlo. Dios reposó el séptimo día porque la obra estaba terminada; nosotros reposamos porque Cristo dijo «consumado es».",
      },
    ],
    aplicacion: [
      "Haz un inventario honesto: ¿qué actividades religiosas haces por temor a perder el favor de Dios? Esas son «obras propias» de las que debes reposar.",
      "Practica un día real de descanso semanal como acto de fe: el mundo no se cae si te detienes, porque no eres tú quien lo sostiene.",
      "Antes de servir, siéntate primero (Lucas 10:39-42). María escogió la buena parte, y Jesús no se la quitó.",
    ],
    cuidadoPastoral:
      "Descansar de las obras propias no es dejar de obrar. Pablo «trabajó más que todos», pero «no yo, sino la gracia de Dios conmigo» (1 Corintios 15:10). Se cambia la fuente, no la actividad.",
    ilustracion:
      "El séptimo día fue el primer día completo de Adán: fue creado en el sexto y lo primero que vivió fue el reposo de Dios. El ser humano comienza su historia descansando en la obra terminada de Otro.",
  },
  {
    id: "el-martes-despues-de-pecar",
    numero: 6,
    serie: 1,
    titulo: "El martes después de pecar",
    subtitulo: "Qué hacer cuando fallas bajo la gracia",
    etiquetas: ["Culpa", "Restauración", "Arrepentimiento"],
    necesidades: ["culpa", "habitos"],
    textoBase: {
      referencia: "1 Juan 2:1",
      texto:
        "Hijitos míos, estas cosas os escribo para que no pequéis; y si alguno hubiere pecado, abogado tenemos para con el Padre, a Jesucristo el justo.",
      version: "RVR1960",
    },
    textosApoyo: ["Romanos 8:1", "Hebreos 7:25", "Hebreos 10:19-22", "Proverbios 24:16", "2 Corintios 7:10-11", "Miqueas 7:8"],
    ideaCentral:
      "El nuevo pacto no niega que el creyente pueda pecar; prevé qué hacer cuando ocurre. Tienes un Abogado que no te defiende negando los hechos, sino presentando su sangre. La respuesta correcta al pecado no es el autocastigo, sino el regreso inmediato.",
    porQueNoConvencional:
      "Predicamos mucho sobre cómo no pecar y casi nada sobre qué hacer el martes por la mañana después de haber pecado. Ese silencio produce creyentes que se alejan de Dios justo cuando más lo necesitan, convencidos de que deben «limpiarse primero».",
    bosquejo: [
      {
        titulo: "Lo que no debes hacer",
        referencia: "Génesis 3:8-10",
        desarrollo:
          "Esconderte (como Adán), compensar (obras para pagar) o rendirte («ya qué importa»). Las tres reacciones tienen algo en común: te alejan del único lugar donde hay remedio.",
      },
      {
        titulo: "Lo que ya está hecho",
        referencia: "1 Juan 2:1-2; Hebreos 7:25",
        desarrollo:
          "Tienes un Abogado, una propiciación y una intercesión permanente. Tu caso ya fue defendido antes de que fallaras. Jesús «vive siempre para interceder»: no se toma el martes libre.",
      },
      {
        titulo: "Lo que debes hacer",
        referencia: "Hebreos 10:22; 1 Juan 1:9; Proverbios 24:16",
        desarrollo:
          "Acercarte con confianza, llamar al pecado por su nombre, volver a levantarte y aprender (2 Corintios 7:10-11). El justo cae siete veces, pero lo que lo define es que se levanta.",
      },
    ],
    aplicacion: [
      "Establece un «protocolo de retorno»: ¿cuánto tiempo pasa entre tu caída y tu regreso a la presencia del Padre? La meta es reducirlo a minutos, no a días.",
      "Confiesa para acercarte, no para «reactivar» un perdón que ya fue dado. La confesión es acuerdo con Dios, no pago a Dios.",
      "Comparte tu lucha con un hermano de confianza (Santiago 5:16). La gracia se experimenta en comunidad; el aislamiento es territorio del acusador.",
    ],
    cuidadoPastoral:
      "«Para que no pequéis» sigue siendo el propósito de Juan. La provisión del Abogado no es licencia: es la red de seguridad que permite al trapecista atreverse a volar, no una invitación a lanzarse a propósito.",
    ilustracion:
      "Un abogado defensor no se pone de pie cuando su cliente es inocente, sino precisamente cuando es culpable. Jesús no argumenta tu inocencia: presenta su justicia como tuya.",
  },
  {
    id: "el-espiritu-no-te-acusa",
    numero: 7,
    serie: 1,
    titulo: "El Espíritu no te acusa",
    subtitulo: "Cómo distinguir la voz del Consolador de la voz del acusador",
    etiquetas: ["Espíritu Santo", "Discernimiento", "Culpa"],
    necesidades: ["culpa", "miedo"],
    textoBase: {
      referencia: "Romanos 8:16",
      texto: "El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios.",
      version: "RVR1960",
    },
    textosApoyo: ["Juan 16:8-11", "Juan 14:26", "Apocalipsis 12:10-11", "Romanos 8:33-34", "Zacarías 3:1-4", "2 Corintios 7:10"],
    ideaCentral:
      "El Espíritu Santo convence, consuela, enseña y da testimonio de tu filiación; el acusador condena, aísla y confunde tu identidad con tu conducta. Aprender a distinguir estas dos voces es esencial para una vida cristiana sana.",
    porQueNoConvencional:
      "Muchos creyentes llaman «convicción del Espíritu» a lo que en realidad es acusación o autocondenación. Juan 16:9 dice que el Espíritu convence al mundo de pecado «por cuanto no creen»; y al creyente lo convence de justicia (v. 10): la que ya tiene en Cristo.",
    bosquejo: [
      {
        titulo: "Dos voces, dos frutos",
        referencia: "2 Corintios 7:10",
        desarrollo:
          "La convicción produce esperanza y regreso; la acusación produce vergüenza y huida. La primera es específica y apunta a Cristo; la segunda es vaga, repetitiva y apunta a ti.",
      },
      {
        titulo: "Lo que hace el Consolador",
        referencia: "Juan 14:26; 16:13-14; Romanos 8:16",
        desarrollo:
          "Recuerda las palabras de Jesús, guía a toda verdad, glorifica a Cristo y testifica que eres hijo. Si una voz interior nunca menciona a Cristo y solo habla de ti, no es la suya.",
      },
      {
        titulo: "Lo que ya pasó con el acusador",
        referencia: "Apocalipsis 12:10-11; Zacarías 3:1-4; Romanos 8:33",
        desarrollo:
          "Fue lanzado fuera y es vencido por la sangre del Cordero. «¿Quién acusará a los escogidos de Dios?». La acusación puede seguir sonando, pero ya no tiene jurisdicción.",
      },
    ],
    aplicacion: [
      "Pon a prueba tus pensamientos con tres preguntas: ¿me acerca o me aleja de Dios? ¿me da un paso concreto o solo vergüenza difusa? ¿exalta a Cristo o me hunde a mí?",
      "Responde a la acusación como Jesús respondió a la tentación: con la Palabra escrita (Romanos 8:1; 8:33-34).",
      "Cultiva el testimonio del Espíritu: dedica tiempo a escuchar quién dice Dios que eres, no solo qué debes hacer.",
    ],
    cuidadoPastoral:
      "El Espíritu sí redarguye al creyente cuando peca (Efesios 4:30 habla de contristarlo), pero siempre como Padre que corrige a un hijo amado, nunca como fiscal que pone en duda si es hijo.",
    ilustracion:
      "Zacarías 3: Josué el sumo sacerdote con vestiduras viles, Satanás a su derecha acusando, y el Señor que no discute la acusación sino que ordena: «Quitadle esas vestiduras viles… te he hecho vestir de ropas de gala».",
  },
  {
    id: "dar-sin-miedo",
    numero: 8,
    serie: 1,
    titulo: "Dar sin miedo",
    subtitulo: "Generosidad como respuesta, no como impuesto",
    etiquetas: ["Generosidad", "Finanzas", "Libertad"],
    necesidades: ["finanzas", "legalismo"],
    textoBase: {
      referencia: "2 Corintios 9:7",
      texto:
        "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.",
      version: "RVR1960",
    },
    textosApoyo: ["2 Corintios 8:1-9", "2 Corintios 9:8-11", "Gálatas 3:13", "Hechos 4:32-35", "Hechos 20:35", "Mateo 6:3-4, 19-21"],
    ideaCentral:
      "Bajo el nuevo pacto la generosidad no se motiva con amenaza de maldición ni se limita a un porcentaje: nace de haber conocido la gracia del que «se hizo pobre siendo rico». Damos desde la bendición, no para evitar el castigo.",
    porQueNoConvencional:
      "Es uno de los temas donde más se predica ley a personas del nuevo pacto. Malaquías 3 se usa para amenazar a hijos con una maldición de la que Gálatas 3:13 dice que ya fueron redimidos. Pablo, en los dos capítulos más extensos sobre ofrendas (2 Corintios 8-9), no menciona ni el diezmo ni la maldición: menciona la gracia diez veces.",
    bosquejo: [
      {
        titulo: "La fuente: la gracia de Cristo",
        referencia: "2 Corintios 8:9",
        desarrollo:
          "El dar cristiano empieza contemplando al Dador. «Por amor a vosotros se hizo pobre, siendo rico». Nadie da con alegría lo que no ha recibido primero con asombro.",
      },
      {
        titulo: "La forma: libre, alegre y voluntaria",
        referencia: "2 Corintios 8:3, 12; 9:7",
        desarrollo:
          "«Como propuso en su corazón», no como impuso el púlpito. Según lo que uno tiene, no según lo que no tiene. Sin tristeza y sin necesidad: las dos motivaciones que la ley no puede evitar y la gracia elimina.",
      },
      {
        titulo: "El fruto: suficiencia y unidad",
        referencia: "2 Corintios 9:8-11; Hechos 4:32-35",
        desarrollo:
          "Dios provee al dador para que siga dando, no para que acumule. Y donde la gracia abunda, «no había entre ellos ningún necesitado». La generosidad es la economía natural del nuevo pacto.",
      },
    ],
    aplicacion: [
      "Revisa tu motivación al dar: si es miedo a la maldición o cálculo de retorno, vuelve a 2 Corintios 8:9 hasta que dar sea gozo.",
      "Decide con anticipación (como propuso en su corazón), no por presión emocional del momento.",
      "Practica una generosidad «sin recibo»: ayuda a alguien esta semana sin que nadie lo sepa (Mateo 6:3-4).",
    ],
    cuidadoPastoral:
      "Que no exista un porcentaje obligatorio no es excusa para dar menos, sino invitación a dar más y mejor. Los macedonios dieron «más allá de sus fuerzas» rogando por el privilegio (2 Corintios 8:3-4). La gracia siempre supera a la ley en generosidad; nunca la reduce. El diezmo puede ser un buen punto de partida voluntario, pero nunca la medida de la aceptación de Dios.",
    ilustracion:
      "Nadie ha tenido que amenazar a un enamorado para que compre flores. Cuando el corazón está cautivado, la generosidad es la consecuencia natural; cuando está bajo amenaza, siempre buscará el mínimo.",
  },
  {
    id: "la-cena-no-es-un-examen",
    numero: 9,
    serie: 1,
    titulo: "La Cena no es un examen",
    subtitulo: "Comer con confianza en la mesa del nuevo pacto",
    etiquetas: ["Comunión", "Iglesia", "Culpa"],
    necesidades: ["culpa", "relaciones"],
    textoBase: {
      referencia: "Lucas 22:20",
      texto:
        "De igual manera, después que hubo cenado, tomó la copa, diciendo: Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama.",
      version: "RVR1960",
    },
    textosApoyo: ["1 Corintios 11:17-34", "Lucas 22:21-34", "1 Corintios 10:16-17", "Hebreos 10:19-22", "Juan 13:1-5"],
    ideaCentral:
      "La Cena es la única ordenanza que Jesús vinculó explícitamente al «nuevo pacto». Es proclamación de su muerte, no tribunal de nuestra dignidad. «Examinarse» en 1 Corintios 11 tiene que ver con cómo tratamos al cuerpo (la iglesia), no con una introspección que nos descalifique de la mesa.",
    porQueNoConvencional:
      "Generaciones enteras han evitado la mesa por sentirse «indignas», leyendo 1 Corintios 11:28-29 fuera de contexto. Pero el problema en Corinto era que unos comían antes y otros pasaban hambre (vv. 21-22); «no discernir el cuerpo» era despreciar a los hermanos, y la corrección de Pablo es: «esperaos unos a otros» (v. 33). Ninguno es digno; por eso hay una mesa.",
    bosquejo: [
      {
        titulo: "Quiénes estaban en la primera mesa",
        referencia: "Lucas 22:21-34",
        desarrollo:
          "Un traidor, un negador y diez que huirían esa misma noche. Jesús partió el pan para ellos sabiéndolo todo. La primera Cena no fue para los que aprobaron el examen, sino para los que estaban a punto de reprobarlo.",
      },
      {
        titulo: "Qué proclamamos al comer",
        referencia: "1 Corintios 11:26",
        desarrollo:
          "La muerte del Señor: es decir, la suficiencia de su sacrificio, no la suficiencia de nuestra semana. Cada vez que comes, predicas que su cuerpo alcanzó para ti.",
      },
      {
        titulo: "Qué significa examinarse",
        referencia: "1 Corintios 11:28-33",
        desarrollo:
          "Discernir el cuerpo es ver a los hermanos. El que se examina bien no se retira de la mesa: se reconcilia con quien está sentado a su lado. El examen mira alrededor, no solo hacia adentro.",
      },
    ],
    aplicacion: [
      "Participa de la Cena no porque te sientas digno, sino porque Él lo es. Deja que el pan te predique.",
      "Antes de comer, mira alrededor: ¿hay alguien con quien necesitas arreglar cuentas? Ese es el examen que Pablo pide.",
      "Si has evitado la mesa por culpa, entiende que fue puesta precisamente para los que necesitan que se les recuerde el perdón.",
    ],
    cuidadoPastoral:
      "La Cena sigue siendo sagrada y merece reverencia; Pablo advierte de consecuencias reales por tratarla con desprecio. Pero la reverencia bíblica se demuestra en amor al cuerpo, no en ausentarse por temor.",
    ilustracion:
      "Un hospital no rechaza pacientes por estar enfermos; sería absurdo. La mesa del Señor es el lugar donde los que fallamos recordamos que «por su llaga fuimos nosotros curados».",
  },
  {
    id: "ya-bendecido",
    numero: 10,
    serie: 1,
    titulo: "Ya bendecido",
    subtitulo: "Dejar de pedir lo que ya te fue dado",
    etiquetas: ["Oración", "Identidad", "Fe"],
    necesidades: ["oracion", "miedo"],
    textoBase: {
      referencia: "Efesios 1:3",
      texto:
        "Bendito sea el Dios y Padre de nuestro Señor Jesucristo, que nos bendijo con toda bendición espiritual en los lugares celestiales en Cristo.",
      version: "RVR1960",
    },
    textosApoyo: ["2 Pedro 1:3", "Colosenses 2:9-10", "Romanos 8:32", "Efesios 1:17-19", "Filemón 6", "Hebreos 4:16"],
    ideaCentral:
      "El nuevo pacto no es una lista de bendiciones por alcanzar sino una herencia por descubrir. La oración madura no ruega a Dios que haga lo que ya hizo: pide ojos para ver lo que ya dio y fe para caminar en ello.",
    porQueNoConvencional:
      "Buena parte de nuestra oración está en modo «ruego» por cosas que las Escrituras declaran en tiempo pasado: perdón, aceptación, presencia, poder, justicia. Pablo no pide que Dios bendiga a los efesios; pide que conozcan cómo ya fueron bendecidos (Efesios 1:17-18).",
    bosquejo: [
      {
        titulo: "Lo que ya es tuyo",
        referencia: "Efesios 1:3-14; 2 Pedro 1:3",
        desarrollo:
          "Elegidos, adoptados, aceptos, redimidos, perdonados, sellados. Todo en tiempo pasado, todo «en Cristo». «Todas las cosas que pertenecen a la vida y a la piedad nos han sido dadas».",
      },
      {
        titulo: "Por qué no lo vemos",
        referencia: "Efesios 1:17-18; Filemón 6",
        desarrollo:
          "Falta de revelación, no falta de provisión. Pablo ora por «ojos del entendimiento alumbrados», no por más regalos. La fe se vuelve eficaz «en el conocimiento de todo el bien que está en vosotros por Cristo».",
      },
      {
        titulo: "Cómo se ora desde la plenitud",
        referencia: "Hebreos 4:16; Colosenses 2:10",
        desarrollo:
          "Acercarse con confianza para «alcanzar» lo que la gracia ya proveyó. Peticiones que nacen de la posición, no de la orfandad. Estás completo en Él; desde ahí pides.",
      },
    ],
    aplicacion: [
      "Revisa tus oraciones de esta semana: ¿cuántas piden lo que Dios ya declaró tuyo? Convierte esas peticiones en acciones de gracias.",
      "Haz una lista de los «ya» de Efesios 1-2 y léela en voz alta cada mañana durante siete días.",
      "Ante una necesidad concreta, empieza recordando quién eres y qué tienes antes de pedir lo que te falta.",
    ],
    cuidadoPastoral:
      "«Toda bendición espiritual» no es promesa de prosperidad material ni de ausencia de pruebas. Es la plenitud de Cristo aplicada al creyente; desde ella seguimos pidiendo el pan de cada día con humildad y dependencia real (Mateo 6:11).",
    ilustracion:
      "El hijo pródigo pidió ser tratado como jornalero; el padre lo recibió como hijo. Muchos oramos como jornaleros pidiendo pan cuando el anillo, el vestido y el becerro ya están servidos.",
  },

  /* ───────────────────────── SERIE 2 · CAMINAR EN LA GRACIA ───────────────────────── */

  {
    id: "con-el-rostro-descubierto",
    numero: 11,
    serie: 2,
    titulo: "Con el rostro descubierto",
    subtitulo: "Cómo leer toda la Biblia desde el nuevo pacto",
    etiquetas: ["Lectura bíblica", "Devocional", "Cristo en las Escrituras"],
    necesidades: ["oracion", "legalismo"],
    textoBase: {
      referencia: "2 Corintios 3:16, 18",
      texto:
        "Pero cuando se conviertan al Señor, el velo se quitará. [...] Por tanto, nosotros todos, mirando a cara descubierta como en un espejo la gloria del Señor, somos transformados de gloria en gloria en la misma imagen, como por el Espíritu del Señor.",
      version: "RVR1960",
    },
    textosApoyo: [
      "2 Corintios 3:6-7, 13-15",
      "Lucas 24:27, 32, 44-45",
      "Juan 5:39-40",
      "Hebreos 1:1-2",
      "Romanos 15:4",
      "Gálatas 3:24-25",
    ],
    ideaCentral:
      "El Antiguo Testamento no se lee desde el Sinaí sino desde el Calvario. Cuando el lector se vuelve al Señor, el velo se quita: la misma Escritura que producía condenación empieza a producir transformación, porque ya no muestra una lista sino un rostro.",
    porQueNoConvencional:
      "Muchos creyentes leen Levítico, Deuteronomio o los Profetas como si fueran Israel antes de la cruz, y salen de su devocional más culpables que cuando entraron. Pablo llama a eso «el velo»: leer el antiguo pacto sin Cristo (3:14). Predicamos «lee tu Biblia» sin enseñar desde dónde leerla, y el resultado es una piedad que se alimenta del ministerio de muerte (3:7) en lugar del ministerio del Espíritu.",
    bosquejo: [
      {
        titulo: "El velo que sigue puesto",
        referencia: "2 Corintios 3:13-15",
        desarrollo:
          "«Hasta el día de hoy, cuando leen el antiguo pacto, les queda el mismo velo». La Escritura leída sin Cristo produce una gloria que se desvanece y una condenación que permanece. No es un problema del texto sino del lector.",
      },
      {
        titulo: "El momento en que se quita",
        referencia: "2 Corintios 3:16; Lucas 24:27, 45",
        desarrollo:
          "«Cuando se conviertan al Señor, el velo se quitará». Jesús «les abrió el entendimiento para que comprendiesen las Escrituras», comenzando desde Moisés: toda la Biblia habla de Él. La clave de lectura no es un método sino una Persona.",
      },
      {
        titulo: "La lectura que transforma",
        referencia: "2 Corintios 3:18",
        desarrollo:
          "«Mirando a cara descubierta la gloria del Señor, somos transformados de gloria en gloria». El cambio viene por contemplación, no por presión. Uno se parece a lo que mira; por eso el devocional debe terminar mirando a Cristo, no mirándose a uno mismo.",
      },
    ],
    aplicacion: [
      "Ante cualquier mandato del Antiguo Testamento, pregunta primero «¿cómo lo cumplió Cristo y qué me revela de Él?» antes de «¿qué tengo que hacer?».",
      "Termina cada lectura con una sola pregunta: ¿qué vi de Jesús hoy? Si saliste solo con una lista de tareas, vuelve a leer con el velo quitado.",
      "Lee los Salmos como oraciones de Cristo y en Cristo (Hebreos 2:12; 10:5-7): así dejan de ser el diario de David y se vuelven la voz de tu Sumo Sacerdote.",
    ],
    cuidadoPastoral:
      "Leer desde Cristo no es descartar el Antiguo Testamento ni convertir cada versículo en alegoría forzada. «Toda la Escritura es inspirada por Dios y útil» (2 Timoteo 3:16). La clave cristológica honra el texto en su contexto y luego lo sigue hasta Cristo; exige más estudio, no menos.",
    ilustracion:
      "Los dos de Emaús caminaron once kilómetros con las Escrituras en la memoria y el corazón frío. Cuando Jesús se las explicó «comenzando desde Moisés», el corazón les ardía. La misma Biblia; otro Lector caminando al lado.",
  },
  {
    id: "santo-antes-de-comportarte",
    numero: 12,
    serie: 2,
    titulo: "Santo antes de comportarte",
    subtitulo: "El indicativo siempre viene antes del imperativo",
    etiquetas: ["Identidad", "Santidad", "Hábitos"],
    necesidades: ["culpa", "habitos"],
    textoBase: {
      referencia: "1 Corintios 6:11",
      texto:
        "Y esto erais algunos; mas ya habéis sido lavados, ya habéis sido santificados, ya habéis sido justificados en el nombre del Señor Jesús, y por el Espíritu de nuestro Dios.",
      version: "RVR1960",
    },
    textosApoyo: [
      "1 Corintios 1:2",
      "Romanos 6:2, 11",
      "Hebreos 10:10, 14",
      "Colosenses 3:1-5, 12",
      "Efesios 4:1",
      "1 Pedro 1:15-16",
    ],
    ideaCentral:
      "El Nuevo Testamento nunca dice «compórtate para llegar a ser santo»; dice «eres santo, ahora vive como tal». La gramática de las epístolas es la gramática de la gracia: primero quién eres, después qué haces. Invertir el orden produce culpa crónica; respetarlo produce cambio real.",
    porQueNoConvencional:
      "A una iglesia con divisiones, pleitos entre hermanos, inmoralidad y borracheras en la Cena, Pablo la llama «santificados en Cristo Jesús» en el primer versículo de la carta. No espera a que se comporten para llamarlos santos; los llama santos para que se comporten. Nosotros solemos predicar la santidad como escalera que se sube, cuando el texto la presenta primero como posición que se recibe.",
    bosquejo: [
      {
        titulo: "Lo que erais y lo que ya sois",
        referencia: "1 Corintios 6:9-11",
        desarrollo:
          "Tres «ya» en tiempo pasado: lavados, santificados, justificados. Pablo no lo dice al final de la exhortación como premio, sino al principio como fundamento. La identidad es el punto de partida, no la meta.",
      },
      {
        titulo: "La contabilidad de la fe",
        referencia: "Romanos 6:11; Colosenses 3:1-3",
        desarrollo:
          "«Consideraos muertos al pecado». La obediencia comienza con un cálculo de identidad, no con un esfuerzo de voluntad. «Buscad las cosas de arriba» se apoya en «habéis resucitado con Cristo»: el imperativo cuelga del indicativo.",
      },
      {
        titulo: "Vestirse de lo que ya eres",
        referencia: "Colosenses 3:12; Efesios 4:1",
        desarrollo:
          "«Vestíos, pues, como escogidos de Dios, santos y amados». «Andad como es digno de la vocación con que fuisteis llamados». La conducta es el vestido de la identidad, no su causa.",
      },
    ],
    aplicacion: [
      "Cambia tu vocabulario interno: de «soy un pecador que intenta ser santo» a «soy un santo que todavía peca». El texto respalda el segundo.",
      "En la tentación, sustituye el «no debo» por «eso no es quien soy» (Romanos 6:2: los que hemos muerto al pecado, ¿cómo viviremos aún en él?).",
      "Llama a tus hermanos por su identidad y no por su fracaso. Pablo lo hizo con Corinto, y la carta terminó produciendo arrepentimiento (2 Corintios 7:9).",
    ],
    cuidadoPastoral:
      "«Santo» en posición no significa «perfecto» en práctica. Hebreos 10:14 une las dos cosas: «con una sola ofrenda hizo perfectos para siempre a los santificados», literalmente «a los que están siendo santificados». La santificación progresiva es real, pero crece de la raíz de la santificación posicional, nunca al revés.",
    ilustracion:
      "Un príncipe no se comporta bien para llegar a ser hijo del rey; se comporta como hijo porque ya lo es. Si actúa como plebeyo no deja de ser príncipe, pero vive por debajo de su nombre. Pablo escribe a príncipes que viven como plebeyos y les recuerda su apellido.",
  },
  {
    id: "cristo-se-sento",
    numero: 13,
    serie: 2,
    titulo: "Cristo se sentó",
    subtitulo: "Los sacrificios que tú sigues ofreciendo",
    etiquetas: ["Obra terminada", "Culpa", "Conciencia"],
    necesidades: ["culpa", "cansancio"],
    textoBase: {
      referencia: "Hebreos 10:11-12",
      texto:
        "Y ciertamente todo sacerdote está día tras día ministrando y ofreciendo muchas veces los mismos sacrificios, que nunca pueden quitar los pecados; pero Cristo, habiendo ofrecido una vez para siempre un solo sacrificio por los pecados, se ha sentado a la diestra de Dios.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Hebreos 10:1-4, 14, 18",
      "Hebreos 9:12, 25-26",
      "Hebreos 1:3",
      "Hebreos 9:14; 10:22",
      "Juan 19:30",
      "Salmo 110:1",
    ],
    ideaCentral:
      "En el tabernáculo no había sillas porque el trabajo del sacerdote nunca terminaba. Cristo se sentó porque el suyo sí. Cada vez que intentas «pagar» una falla con autocastigo, con un ayuno penitencial o con semanas de distancia de Dios, estás ofreciendo sacrificios que Él ya declaró innecesarios.",
    porQueNoConvencional:
      "Hablamos de la obra terminada, pero muchos creyentes practican una penitencia emocional no declarada: sienten que deben sufrir un tiempo prudente antes de «merecer» volver a la comunión. Hebreos 10:18 es tajante: «donde hay remisión de éstos, no hay más ofrenda por el pecado». Ninguna. Tampoco la tuya.",
    bosquejo: [
      {
        titulo: "Sacerdotes de pie",
        referencia: "Hebreos 10:1-4, 11",
        desarrollo:
          "La repetición era la confesión de la insuficiencia: «en estos sacrificios cada año se hace memoria de los pecados». La religión de repetición produce memoria de pecado, no limpieza de conciencia. Un sacerdote que nunca se sienta es un sistema que nunca termina.",
      },
      {
        titulo: "El Sacerdote sentado",
        referencia: "Hebreos 10:12-14; 1:3",
        desarrollo:
          "«Se ha sentado» es «consumado es» convertido en postura. Una sola ofrenda, una sola vez, para siempre, perfectos. No se sentó por cansancio sino por conclusión: no queda nada que añadir.",
      },
      {
        titulo: "La conciencia limpia",
        referencia: "Hebreos 9:14; 10:2, 22",
        desarrollo:
          "La meta del nuevo pacto es un adorador que «no tenga ya más conciencia de pecado». Vivir con la conciencia purificada no es descuido espiritual: es el fruto proclamado del sacrificio. Acercarse «con corazón sincero, en plena certidumbre de fe» es honrar lo que Él hizo.",
      },
    ],
    aplicacion: [
      "Identifica tus «sacrificios repetidos»: ¿qué haces para sentirte otra vez digno después de fallar? Nómbralos y renuncia a ellos como quien deja un altar que ya no existe.",
      "Practica volver a la comunión inmediatamente después de confesar, sin período de «cuarentena espiritual». El tiempo de espera no limpia nada; la sangre ya lo hizo.",
      "Cuando la conciencia acuse un pecado ya confesado, responde en voz alta con Hebreos 10:18, y siéntate tú también.",
    ],
    cuidadoPastoral:
      "Que no haya más ofrenda no elimina la confesión (1 Juan 1:9), la restitución (Lucas 19:8) ni la reparación de relaciones dañadas (Mateo 5:23-24). Esas no son pagos a Dios; son frutos de una conciencia ya limpia que ahora ama. La diferencia está en la dirección: no obras para ser perdonado, obras porque lo fuiste.",
    ilustracion:
      "Entre el mobiliario del tabernáculo había candelero, mesa, altar del incienso, altar de bronce, fuente y arca... pero ninguna silla. Hebreos convierte esa ausencia en teología: el trabajo nunca terminaba. El primer asiento del santuario es el trono donde Cristo se sentó.",
  },
  {
    id: "el-duro-trato-del-cuerpo-no-sirve",
    numero: 14,
    serie: 2,
    titulo: "El duro trato del cuerpo no sirve",
    subtitulo: "Por qué las reglas autoimpuestas no vencen a la carne",
    etiquetas: ["Hábitos", "Legalismo", "Espíritu"],
    necesidades: ["habitos", "legalismo"],
    textoBase: {
      referencia: "Colosenses 2:21, 23",
      texto:
        "No manejes, ni gustes, ni aun toques [...]. Tales cosas tienen a la verdad cierta reputación de sabiduría en culto voluntario, en humildad y en duro trato del cuerpo; pero no tienen valor alguno contra los apetitos de la carne.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Colosenses 2:20-22; 3:1-5",
      "Gálatas 5:16-18",
      "Romanos 7:8; 8:13",
      "1 Timoteo 4:1-5, 8",
      "Mateo 15:11, 18-19",
      "Filipenses 4:8",
    ],
    ideaCentral:
      "Las reglas que uno mismo se impone y el castigo del cuerpo parecen muy espirituales, pero Pablo dice que no tienen ningún valor contra la carne. El pecado no se vence apretando desde afuera sino viviendo desde arriba: «haced morir» (3:5) viene después de «buscad las cosas de arriba» (3:1), nunca antes.",
    porQueNoConvencional:
      "En muchas iglesias, a más lucha, más reglas: más prohibiciones, más «no toques», más dureza consigo mismo. Pablo llama a eso «culto voluntario» (ethelothreskía: religión inventada por uno mismo) y le concede reputación de sabiduría con valor cero. Es contraintuitivo y liberador: el problema del legalista no es que sea demasiado estricto, sino que su estrategia no funciona.",
    bosquejo: [
      {
        titulo: "Reglas con buena reputación",
        referencia: "Colosenses 2:20-23",
        desarrollo:
          "«No manejes, ni gustes, ni aun toques». Suenan a humildad y disciplina, y por eso engañan. Pablo las llama mandamientos de hombres, sombra de lo que ya llegó, y las declara inútiles contra lo que pretenden controlar.",
      },
      {
        titulo: "Por qué no funcionan",
        referencia: "Romanos 7:8; Mateo 15:18-19; Gálatas 5:17",
        desarrollo:
          "El mandamiento despierta el deseo que quiere apagar. El problema no está en el objeto prohibido sino en el corazón que lo desea. El cuerpo no es el enemigo; la carne, el yo que vive independiente de Dios, sí. Y a la carne no se le vence con más carne.",
      },
      {
        titulo: "La estrategia del nuevo pacto",
        referencia: "Colosenses 3:1-5; Gálatas 5:16; Romanos 8:13",
        desarrollo:
          "Primero «buscad las cosas de arriba» y «vuestra vida está escondida con Cristo»; después «haced morir». «Andad en el Espíritu, y no satisfagáis los deseos de la carne»: la mortificación real es obra del Espíritu en alguien lleno de Cristo, no obra del reglamento en alguien vacío.",
      },
    ],
    aplicacion: [
      "Haz una lista de las reglas que te has puesto para «controlarte». Pregunta por cada una: ¿nace de mi unión con Cristo o de mi desconfianza en Él?",
      "Sustituye cada «no toques» por un «sí» mayor: llena la vida de lo que es de arriba (Filipenses 4:8) en lugar de solo vaciarla. Lo vacío se vuelve a llenar con lo mismo.",
      "Cuando falles, revisa no solo la conducta sino la fuente: ¿estabas viviendo desde la aceptación o desde el esfuerzo? La recaída casi siempre nace del segundo.",
    ],
    cuidadoPastoral:
      "El texto no elimina la disciplina: Pablo golpea su cuerpo (1 Corintios 9:27) y manda ejercitarse para la piedad (1 Timoteo 4:7). La diferencia está en la fuente y el propósito: entrenamiento que nace de la gracia (Tito 2:12) frente a castigo que intenta producirla. Los límites sabios son fruto del Espíritu, no sustituto del Espíritu.",
    ilustracion:
      "Arrancar los frutos podridos de un árbol enfermo y colgarle frutos de plástico no cura el árbol. Jesús dijo que el árbol bueno da fruto bueno (Mateo 7:17): la gracia sana la raíz; la regla solo decora las ramas.",
  },
  {
    id: "cuando-dios-corrige-no-cobra",
    numero: 15,
    serie: 2,
    titulo: "Cuando Dios corrige, no cobra",
    subtitulo: "Disciplina de Padre, no castigo de juez",
    etiquetas: ["Pruebas", "Miedo", "Paternidad de Dios"],
    necesidades: ["miedo", "culpa"],
    textoBase: {
      referencia: "Hebreos 12:6, 10",
      texto:
        "Porque el Señor al que ama, disciplina, y azota a todo el que recibe por hijo. [...] Y aquéllos, ciertamente por pocos días nos disciplinaban como a ellos les parecía, pero éste para lo que nos es provechoso, para que participemos de su santidad.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Hebreos 12:5-11",
      "Isaías 53:5",
      "Romanos 8:1, 28",
      "1 Juan 4:18",
      "Juan 15:2",
      "Salmo 103:10, 13",
      "Juan 9:3",
    ],
    ideaCentral:
      "El castigo penal por tus pecados cayó completo sobre Cristo, así que lo que Dios hace hoy contigo nunca es cobrar: es formar. La disciplina del nuevo pacto mira hacia adelante (lo que serás), no hacia atrás (lo que hiciste).",
    porQueNoConvencional:
      "Cuando algo sale mal, el reflejo de muchos creyentes es «Dios me está castigando por...». Eso mezcla dos categorías que la cruz separó para siempre: castigo (retributivo, de juez, ya pagado) y disciplina (formativa, de Padre, en curso). Confundirlas produce un cristianismo que vive con miedo; distinguirlas produce confianza incluso en el dolor.",
    bosquejo: [
      {
        titulo: "El castigo ya fue pagado",
        referencia: "Isaías 53:5; Romanos 8:1; 1 Juan 4:18",
        desarrollo:
          "«El castigo de nuestra paz fue sobre él». Ninguna condenación. El temor «lleva en sí castigo», y por eso el que espera castigo de Dios todavía no ha entendido lo que pasó en la cruz. No hay doble cobro en el nuevo pacto.",
      },
      {
        titulo: "La disciplina es prueba de filiación",
        referencia: "Hebreos 12:6-8",
        desarrollo:
          "«Si se os deja sin disciplina, sois bastardos, y no hijos». Dios disciplina a los que ya son hijos, no para que lleguen a serlo. La corrección no pone en duda la relación: la confirma.",
      },
      {
        titulo: "El propósito es la participación, no el pago",
        referencia: "Hebreos 12:10-11; Juan 15:2",
        desarrollo:
          "«Para que participemos de su santidad»; «fruto apacible de justicia». El Padre poda al que ya lleva fruto para que lleve más. La disciplina no te quita algo que debías: te da algo que todavía no tenías.",
      },
    ],
    aplicacion: [
      "Ante una prueba, cambia la pregunta «¿qué hice mal?» por «¿qué está formando el Padre en mí?». No toda prueba es disciplina (Juan 9:3), pero toda prueba puede ser formación.",
      "Recibe la corrección de la Palabra o de un hermano sin ponerte a la defensiva: el que está seguro de ser hijo puede escuchar una reprensión sin desmoronarse.",
      "Cuando disciplines a tus hijos o discípulos, hazlo como Hebreos 12: hacia adelante, con propósito claro y sin humillación.",
    ],
    cuidadoPastoral:
      "Evita dos extremos: atribuir todo sufrimiento a disciplina (Job y Juan 9 lo desmienten) o negar que Dios discipline (Hebreos 12 es explícito). La disciplina puede doler de verdad, «no parece ser causa de gozo, sino de tristeza», pero siempre llega envuelta en la ternura del Padre que «se compadece de los hijos» (Salmo 103:13).",
    ilustracion:
      "Un cirujano y un asaltante pueden usar un cuchillo sobre el mismo cuerpo; la diferencia no está en el dolor sino en la intención y el resultado. La disciplina corta para sanar; el castigo corta para cobrar. La cruz garantiza que Dios solo usa el primer bisturí contigo.",
  },
  {
    id: "sacerdotes-sin-templo",
    numero: 16,
    serie: 2,
    titulo: "Sacerdotes sin templo",
    subtitulo: "Tu lunes también es culto",
    etiquetas: ["Trabajo", "Vocación", "Adoración"],
    necesidades: ["cansancio", "finanzas"],
    textoBase: {
      referencia: "Colosenses 3:23-24",
      texto:
        "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres; sabiendo que del Señor recibiréis la recompensa de la herencia, porque a Cristo el Señor servís.",
      version: "RVR1960",
    },
    textosApoyo: [
      "1 Pedro 2:5, 9",
      "Hebreos 13:15-16",
      "Romanos 12:1",
      "1 Corintios 10:31",
      "Juan 4:21-24",
      "Génesis 2:15",
      "Efesios 6:5-8",
    ],
    ideaCentral:
      "El nuevo pacto no tiene templo de piedra ni casta sacerdotal: todo creyente es sacerdote y cualquier lugar puede ser santuario. Tu escritorio, tu taller y tu cocina son altares donde ofreces «sacrificios espirituales». La división entre lo espiritual del domingo y lo secular del lunes murió con el velo rasgado.",
    porQueNoConvencional:
      "Muchos creyentes viven una espiritualidad de dos pisos: el «ministerio» arriba y el «trabajo» abajo, con culpa permanente por no dedicarse a lo primero. Pero Pablo les dice a esclavos que sirven a amos terrenales: «a Cristo el Señor servís». El púlpito más grande de la mayoría de la iglesia no está en el templo sino en su lugar de trabajo, y casi nadie se lo ha dicho.",
    bosquejo: [
      {
        titulo: "Sin templo y sin monte",
        referencia: "Juan 4:21-24; 1 Pedro 2:5, 9",
        desarrollo:
          "«Ni en este monte ni en Jerusalén». Los verdaderos adoradores adoran en espíritu y en verdad. «Vosotros sois real sacerdocio»: el edificio no es el templo; tú lo eres, y vas contigo a todas partes.",
      },
      {
        titulo: "Los sacrificios del nuevo pacto",
        referencia: "Hebreos 13:15-16; Romanos 12:1",
        desarrollo:
          "Alabanza, hacer el bien, compartir, presentar el cuerpo. Ninguno requiere un altar de piedra; todos requieren un lunes. «De tales sacrificios se agrada Dios»: la ofrenda del nuevo pacto es la vida ordinaria entregada.",
      },
      {
        titulo: "Trabajar como para el Señor",
        referencia: "Colosenses 3:23-24; 1 Corintios 10:31",
        desarrollo:
          "«De corazón», literalmente «desde el alma». Del Señor viene la recompensa de la herencia. La excelencia, la honestidad y la puntualidad laborales son adoración; el trabajo mediocre «para el Señor» es una contradicción.",
      },
    ],
    aplicacion: [
      "Dedica tu lugar de trabajo como altar: el lunes por la mañana ora sobre tu escritorio, tu taller, tu aula o tu cocina.",
      "Haz tu trabajo con excelencia esta semana sabiendo que el Jefe real está mirando, no para impresionar a nadie sino porque a Él le sirves.",
      "Cambia la pregunta «¿cómo salgo de aquí para servir a Dios?» por «¿cómo sirvo a Dios aquí?». Ya estás en ministerio a tiempo completo.",
    ],
    cuidadoPastoral:
      "Que todo sea culto no vuelve prescindible la reunión de la iglesia (Hebreos 10:25): lo congregacional alimenta lo cotidiano. Y trabajar «como para el Señor» no justifica el exceso de trabajo ni el descuido de la familia: el Señor para quien trabajas también manda descansar.",
    ilustracion:
      "Se atribuye a Lutero la idea de que Dios ordeña las vacas a través de la lechera, y que ella, si trabaja con fe, adora tanto como el monje que reza. El nuevo pacto convierte el establo en santuario.",
  },
  {
    id: "la-mesa-que-pedro-abandono",
    numero: 17,
    serie: 2,
    titulo: "La mesa que Pedro abandonó",
    subtitulo: "Cuando la gracia se cree pero no se practica",
    etiquetas: ["Comunidad", "Prejuicio", "Coherencia"],
    necesidades: ["relaciones", "legalismo"],
    textoBase: {
      referencia: "Gálatas 2:14",
      texto:
        "Pero cuando vi que no andaban rectamente conforme a la verdad del evangelio, dije a Pedro delante de todos: Si tú, siendo judío, vives como los gentiles y no como judío, ¿por qué obligas a los gentiles a judaizar?",
      version: "RVR1960",
    },
    textosApoyo: [
      "Gálatas 2:11-13, 21",
      "Hechos 10:28, 34-35",
      "Hechos 11:2-3; 15:8-11",
      "Romanos 14:1-4; 15:7",
      "Efesios 2:14-16",
      "2 Pedro 3:15",
    ],
    ideaCentral:
      "Pedro creía la gracia (la había predicado en casa de Cornelio), pero cuando llegaron los de Jerusalén se levantó de la mesa de los gentiles. Pablo no lo acusó de mala doctrina sino de no «andar rectamente conforme a la verdad del evangelio». La gracia se demuestra en con quién te sientas a comer.",
    porQueNoConvencional:
      "Solemos pensar que la fidelidad al evangelio es un asunto de creencias correctas. Este pasaje muestra que se puede tener la doctrina impecable y negar el evangelio con los pies. Prejuicio, clasismo, distancia entre «los de siempre» y «los nuevos», recelo hacia otros trasfondos... son formas modernas de levantarse de la mesa mientras se predica la gracia desde el púlpito.",
    bosquejo: [
      {
        titulo: "Una verdad ya aprendida",
        referencia: "Hechos 10:28, 34; 15:11",
        desarrollo:
          "Dios le había mostrado a Pedro que «a ningún hombre llame común o inmundo». Él mismo diría en el concilio: «por la gracia del Señor Jesús seremos salvos, de igual modo que ellos». Pedro no ignoraba la verdad; la contradijo sabiéndola.",
      },
      {
        titulo: "Una mesa abandonada por miedo",
        referencia: "Gálatas 2:12-13",
        desarrollo:
          "«Tenía miedo de los de la circuncisión». El miedo a la opinión religiosa desarma más rápido que la persecución. Y la hipocresía contagia: «aun Bernabé fue también arrastrado». Cuando un líder se levanta de la mesa, la iglesia entera se reorganiza a su alrededor.",
      },
      {
        titulo: "Un evangelio que se camina",
        referencia: "Gálatas 2:14, 21; Romanos 15:7",
        desarrollo:
          "La verdad del evangelio tiene consecuencias sociales concretas. «No desecho la gracia de Dios»: separarse de los que Cristo recibió es declarar que su cruz no bastó. «Recibíos los unos a los otros como también Cristo nos recibió»: la mesa es la doctrina hecha visible.",
      },
    ],
    aplicacion: [
      "Revisa tu mesa: ¿con quién almuerzas, a quién invitas a tu casa, a quién saludas primero el domingo? Ahí está tu teología real, no en tu declaración de fe.",
      "Identifica a «los de Jerusalén» en tu vida: ¿de quién temes la opinión hasta el punto de cambiar tu trato con otros cuando están presentes?",
      "Da un paso concreto esta semana hacia alguien de otro trasfondo, clase social, generación o cultura dentro de la iglesia: una comida compartida vale más que un sermón sobre unidad.",
    ],
    cuidadoPastoral:
      "Pablo confrontó a Pedro «delante de todos» porque el pecado fue público y comprometía el evangelio mismo, no por cualquier desacuerdo. Y lo hizo como hermano: años después Pedro llamaría a Pablo «nuestro amado hermano» (2 Pedro 3:15). La gracia también alcanza al que se levantó de la mesa, y lo vuelve a sentar.",
    ilustracion:
      "En el mundo del primer siglo, compartir la mesa era la declaración social más fuerte de comunión y aceptación. Cuando Pedro se levantó no rompió una regla de etiqueta: predicó sin palabras que la cruz no había alcanzado para hacer una sola familia.",
  },
  {
    id: "palabras-que-dan-gracia",
    numero: 18,
    serie: 2,
    titulo: "Palabras que dan gracia",
    subtitulo: "Hablar como quien fue perdonado",
    etiquetas: ["Lengua", "Relaciones", "Redes sociales"],
    necesidades: ["relaciones"],
    textoBase: {
      referencia: "Efesios 4:29",
      texto:
        "Ninguna palabra corrompida salga de vuestra boca, sino la que sea buena para la necesaria edificación, a fin de dar gracia a los oyentes.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Colosenses 4:6",
      "Santiago 3:9-10",
      "Mateo 12:34-37",
      "Lucas 4:22",
      "Juan 8:7-11",
      "Efesios 4:15, 31-32",
      "Proverbios 18:21",
    ],
    ideaCentral:
      "El nuevo pacto no solo cambia lo que crees sino lo que dices. La lengua es el termómetro más rápido de si la gracia llegó al corazón, porque «de la abundancia del corazón habla la boca». Hablar gracia es la forma más cotidiana, y más creíble, de predicarla.",
    porQueNoConvencional:
      "Predicamos gracia con dureza. Púlpitos, grupos de mensajería y redes sociales llenos de sarcasmo, crítica y chisme espiritualizado («te lo cuento para que ores»). Pablo pone el habla en el centro de la ética del nuevo pacto y le da un propósito sorprendente: «dar gracia a los oyentes», usando la misma palabra (charis) con la que describe la salvación. Cada conversación es una oportunidad de repartir lo que recibiste.",
    bosquejo: [
      {
        titulo: "Palabras que revelan",
        referencia: "Mateo 12:34; Santiago 3:9-10",
        desarrollo:
          "La boca es el desbordamiento del corazón. Bendecir a Dios el domingo y maldecir el lunes a los hechos a su imagen, desde la misma fuente: «esto no debe ser así». La lengua no tiene un problema propio; delata el problema del corazón.",
      },
      {
        titulo: "Palabras que dan gracia",
        referencia: "Efesios 4:29; Colosenses 4:6; Lucas 4:22",
        desarrollo:
          "Buenas, oportunas, edificantes, «sazonadas con sal». De Jesús «se maravillaban de las palabras de gracia que salían de su boca», y Él era también el más veraz que ha hablado. Gracia y verdad no compiten: la gracia es el tono con el que la verdad se vuelve recibible.",
      },
      {
        titulo: "Palabras que restauran",
        referencia: "Juan 8:7-11; Efesios 4:15",
        desarrollo:
          "«Ni yo te condeno» y «vete y no peques más» en la misma frase. «Siguiendo la verdad en amor». La corrección bajo la gracia siempre deja al otro con un futuro; la corrección bajo la ley lo deja con un expediente.",
      },
    ],
    aplicacion: [
      "Aplica el filtro de Efesios 4:29 durante siete días, también en redes: antes de hablar o publicar, ¿es bueno, es necesario, edifica, da gracia? Si falla una, calla.",
      "Elimina el chisme espiritualizado: si no eres parte del problema ni de la solución, no eres parte de la conversación.",
      "Di algo de gracia a tres personas cada día: afirmación específica de algo que viste en ellas, no un cumplido genérico.",
    ],
    cuidadoPastoral:
      "Hablar con gracia no es hablar sin verdad. Jesús llamó «sepulcros blanqueados» a quienes lo merecían y Pablo confrontó a Pedro en público. La gracia en el hablar no elimina la firmeza; elimina el desprecio. Se puede decir todo lo necesario sin que salga nada corrompido.",
    ilustracion:
      "La sal en la antigüedad conservaba la carne y daba sabor a la comida; en exceso, la arruinaba. Las palabras «sazonadas con sal» (Colosenses 4:6) preservan a la persona y hacen apetecible la verdad. Una boca sin gracia sirve la verdad cruda, y nadie se la come.",
  },
  {
    id: "embajadores-no-cobradores",
    numero: 19,
    serie: 2,
    titulo: "Embajadores, no cobradores",
    subtitulo: "Anunciar una paz que ya fue firmada",
    etiquetas: ["Evangelismo", "Misión", "Motivación"],
    necesidades: ["cansancio", "miedo"],
    textoBase: {
      referencia: "2 Corintios 5:19-20",
      texto:
        "Dios estaba en Cristo reconciliando consigo al mundo, no tomándoles en cuenta a los hombres sus pecados, y nos encargó a nosotros la palabra de la reconciliación. Así que, somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros; os rogamos en nombre de Cristo: Reconciliaos con Dios.",
      version: "RVR1960",
    },
    textosApoyo: [
      "2 Corintios 5:14-18",
      "Romanos 5:8, 10",
      "Colosenses 1:20",
      "Juan 3:17; 16:8",
      "Romanos 2:4",
      "1 Pedro 3:15",
      "Lucas 15:4-7",
    ],
    ideaCentral:
      "Un cobrador exige lo que se debe; un embajador anuncia lo que su rey ya decidió. El evangelismo del nuevo pacto no consiste en amenazar a la gente con una deuda, sino en rogarle que reciba una reconciliación que Dios ya hizo, movidos por el amor de Cristo y no por la culpa.",
    porQueNoConvencional:
      "Mucho evangelismo se motiva con culpa (textos como Ezequiel 3:18, dirigidos al atalaya de Israel, se aplican al creyente como amenaza) y se ejecuta con presión («si murieras esta noche...»). Pablo describe otra motivación, «el amor de Cristo nos constriñe», y otro tono, «como si Dios rogase». El resultado es un pueblo que comparte a Cristo con alivio, no con pánico.",
    bosquejo: [
      {
        titulo: "El motor: el amor, no la culpa",
        referencia: "2 Corintios 5:14-15",
        desarrollo:
          "«El amor de Cristo nos constriñe». Cuando el motor es la culpa, el mensaje sale como cobro y el mensajero se agota; cuando el motor es el amor, el mensaje sale como noticia y el mensajero se renueva. Nadie sostiene décadas de misión a punta de vergüenza.",
      },
      {
        titulo: "El mensaje: una reconciliación ya hecha",
        referencia: "2 Corintios 5:18-19; Romanos 5:10; Colosenses 1:20",
        desarrollo:
          "«Dios estaba en Cristo reconciliando», «no tomándoles en cuenta sus pecados», «haciendo la paz mediante la sangre de su cruz». La paz se firmó en el Calvario; anunciamos algo consumado, no algo pendiente de negociación.",
      },
      {
        titulo: "El tono: rogar, no cobrar",
        referencia: "2 Corintios 5:20; Romanos 2:4; Juan 3:17",
        desarrollo:
          "«Como si Dios rogase por medio de nosotros». El Rey del universo ruega a través de ti. «Su benignidad te guía al arrepentimiento»; «no envió a su Hijo para condenar al mundo». El embajador representa el carácter de su Rey, no solo su mensaje.",
      },
    ],
    aplicacion: [
      "Escribe tu testimonio en dos frases centradas en lo que Dios hizo, no en lo que tú dejaste. Practícalo hasta que salga con la naturalidad de una buena noticia.",
      "Cambia el punto de partida de tus conversaciones: de «¿sabes que eres pecador?» a «¿sabes que Dios ya hizo la paz contigo?». Convencer de pecado es tarea del Espíritu (Juan 16:8), no tuya.",
      "Ora por tres personas por nombre y busca servirlas antes de predicarles. Un embajador que sirve hace creíble el reino que anuncia.",
    ],
    cuidadoPastoral:
      "Anunciar reconciliación no elimina el llamado al arrepentimiento ni la realidad del juicio; el mismo capítulo habla del tribunal de Cristo y del «temor del Señor» (2 Corintios 5:10-11). La diferencia está en el orden y el tono: la gracia va primero, la advertencia va dentro del amor, y la responsabilidad de responder sigue siendo real: «reconciliaos con Dios».",
    ilustracion:
      "El soldado japonés Hiroo Onoda siguió combatiendo en la selva de Filipinas hasta 1974, veintinueve años después de terminada la guerra, porque no creyó que la paz fuera real; solo se rindió cuando su antiguo comandante fue en persona a decírselo. El mundo sigue en guerra con un Dios que ya firmó la paz. Nuestro trabajo es llevar la noticia con autoridad, no negociar los términos.",
  },
  {
    id: "una-vez-vuelto",
    numero: 20,
    serie: 2,
    titulo: "Una vez vuelto",
    subtitulo: "Jesús ya contaba con tu caída",
    etiquetas: ["Restauración", "Fracaso", "Liderazgo"],
    necesidades: ["culpa", "habitos"],
    textoBase: {
      referencia: "Lucas 22:31-32",
      texto:
        "Dijo también el Señor: Simón, Simón, he aquí Satanás os ha pedido para zarandearos como a trigo; pero yo he rogado por ti, que tu fe no falte; y tú, una vez vuelto, confirma a tus hermanos.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Lucas 22:54-62",
      "Marcos 16:7",
      "Juan 21:15-19",
      "Hechos 2:14",
      "1 Pedro 5:10",
      "Hebreos 7:25",
      "Salmo 37:23-24",
      "Romanos 11:29",
    ],
    ideaCentral:
      "Antes de que Pedro negara, Jesús ya había orado por él, ya sabía que caería y ya le había asignado un ministerio para después: «una vez vuelto, confirma». Tu caída no sorprendió a Dios ni canceló tu llamado. La pregunta del nuevo pacto no es «¿caíste?», sino «¿volviste?».",
    porQueNoConvencional:
      "Tratamos las caídas como el final de la utilidad de una persona. Jesús trató la caída de Pedro como parte de la formación del apóstol que predicaría en Pentecostés cincuenta días después. No dijo «si vuelves», dijo «una vez vuelto». El fracaso no descalificó a Pedro; lo capacitó para confirmar a otros que también caerían.",
    bosquejo: [
      {
        titulo: "Orado antes de caer",
        referencia: "Lucas 22:31-32; Hebreos 7:25",
        desarrollo:
          "Jesús no oró para que Pedro no fuera zarandeado, sino para que su fe no faltara. Hay sacudidas que Dios permite y una intercesión que nunca falla. Tu perseverancia descansa más en la oración de Cristo por ti que en la tuya por ti mismo.",
      },
      {
        titulo: "Buscado después de caer",
        referencia: "Lucas 22:61; Marcos 16:7; Juan 21:15-17",
        desarrollo:
          "La mirada de Jesús en el patio no fue de reproche: fue la que hizo llorar de amor. El mensaje de la resurrección lo nombra explícitamente: «decid a sus discípulos, y a Pedro». Y junto al fuego, tres negaciones se responden con tres «¿me amas?» y tres comisiones.",
      },
      {
        titulo: "Enviado por haber caído",
        referencia: "Lucas 22:32; Hechos 2:14; 1 Pedro 5:10",
        desarrollo:
          "«Confirma a tus hermanos». Pedro predica en Pentecostés y años después escribe sobre el Dios de toda gracia que «os perfeccione, afirme, fortalezca y establezca». Habla el que fue afirmado. Su herida se volvió su credencial.",
      },
    ],
    aplicacion: [
      "Si caíste, no esperes a «merecer» volver: el mensaje de la resurrección ya tiene tu nombre. Vuelve hoy, con el llanto todavía fresco.",
      "Identifica en qué área de tu fracaso puedes convertirte en Pedro para otros: ¿a quién puedes «confirmar» precisamente porque sabes lo que es caer?",
      "Si eres líder, diseña caminos de retorno para los que caen, no solo procesos de salida. Jesús planificó el regreso de Pedro antes de la negación.",
    ],
    cuidadoPastoral:
      "Restauración no es ausencia de proceso. Pedro pasó por la mirada, el llanto amargo, las tres preguntas junto al fuego y un tiempo antes de Pentecostés. Ciertas caídas requieren tiempos, rendición de cuentas y sanidad de los afectados antes de volver a ciertas funciones. Pero el proceso es de restauración, no de eliminación: la meta siempre es «una vez vuelto».",
    ilustracion:
      "El kintsugi japonés repara la cerámica rota con oro, de modo que las grietas se vuelven la parte más valiosa de la pieza. Pedro reparado fue más útil que Pedro intacto: el que juró que nunca caería se convirtió en el que escribió sobre la esperanza para los que sufren.",
  },

  /* ───────────────────────── SERIE 3 · FIGURAS DEL PACTO ───────────────────────── */

  {
    id: "abraham-estaba-dormido",
    numero: 21,
    serie: 3,
    titulo: "Abraham estaba dormido",
    subtitulo: "El pacto que solo una de las partes firmó",
    etiquetas: ["Seguridad", "Pacto", "Fe"],
    necesidades: ["miedo", "ansiedad"],
    textoBase: {
      referencia: "Génesis 15:17-18",
      texto:
        "Y sucedió que puesto el sol, y ya oscurecido, se veía un horno humeando, y una antorcha de fuego que pasaba por entre los animales divididos. En aquel día hizo Jehová un pacto con Abram.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Génesis 15:6, 12",
      "Jeremías 34:18-19",
      "Hebreos 6:13-18",
      "Gálatas 3:13, 17-18",
      "Romanos 4:16, 20-21",
      "2 Timoteo 2:13",
      "Salmo 127:2",
    ],
    ideaCentral:
      "En el rito antiguo, las dos partes caminaban entre los animales partidos invocando sobre sí la misma suerte si rompían el pacto. En Génesis 15 solo Dios pasa, mientras Abram duerme. El pacto de la promesa descansa sobre la fidelidad de uno solo, y por eso el que cree puede dormir tranquilo.",
    porQueNoConvencional:
      "Muchos creyentes viven la salvación como un contrato bilateral que se sostiene mientras ellos cumplan su parte, y por eso nunca descansan. El texto muestra al padre de la fe inconsciente en el momento más importante de su vida: Dios quiso que quedara claro quién sostiene el pacto. Y en la cruz, el mismo Dios que pasó entre los pedazos fue «cortado» por la parte que sí falló.",
    bosquejo: [
      {
        titulo: "Un pacto que Abram no firmó",
        referencia: "Génesis 15:12, 17",
        desarrollo:
          "«Sobrecogió el sueño a Abram». El horno humeante y la antorcha, símbolos de la presencia de Dios, pasan solos entre los animales. Abram no caminó, no prometió, no negoció: solo vio y creyó. La promesa se sostiene en quien la hizo.",
      },
      {
        titulo: "Un juramento que Dios hizo por sí mismo",
        referencia: "Hebreos 6:13-18; Jeremías 34:18; Gálatas 3:13",
        desarrollo:
          "«No pudiendo jurar por otro mayor, juró por sí mismo». Pasar entre los pedazos era decir «que me hagan esto si fallo». Dios asumió esa maldición, y en la cruz Cristo fue hecho maldición por nosotros: la parte fiel pagó por la infiel. Dos cosas inmutables para un «fortísimo consuelo».",
      },
      {
        titulo: "Una fe que puede dormir",
        referencia: "Génesis 15:6; Romanos 4:20-21; Salmo 127:2",
        desarrollo:
          "«Creyó a Jehová, y le fue contado por justicia». La respuesta a un pacto unilateral no es esfuerzo sino confianza. «A su amado dará Dios el sueño»: la capacidad de descansar es la medida de cuánto has entendido quién sostiene el pacto.",
      },
    ],
    aplicacion: [
      "Cuando dudes de tu salvación, no revises tu desempeño: revisa quién caminó entre los pedazos. Repite 2 Timoteo 2:13 hasta que el descanso vuelva.",
      "Haz del sueño un acto de fe: acuéstate esta semana entregando lo que no pudiste terminar al Dios que no duerme (Salmo 121:4).",
      "Identifica qué «cláusulas» has añadido al pacto (si oro suficiente, si sirvo suficiente, si no vuelvo a fallar) y renuncia a ellas por escrito.",
    ],
    cuidadoPastoral:
      "Que el pacto sea unilateral no vuelve pasiva la vida cristiana: a Abram, Dios le dirá después «anda delante de mí y sé perfecto» (Génesis 17:1). Pero ese andar es respuesta al pacto, no condición del pacto. Y la seguridad es para el que cree (15:6), no para el que presume sin fe.",
    ilustracion:
      "Jeremías 34:18-19 describe el rito: los que pasaban entre las partes del becerro se comprometían con su propia vida. Imagina un contrato donde el banco firma también en la línea del cliente y se hace responsable de toda deuda futura. Eso es Génesis 15, y eso es la cruz.",
  },
  {
    id: "el-hijo-del-esfuerzo",
    numero: 22,
    serie: 3,
    titulo: "El hijo del esfuerzo",
    subtitulo: "Agar, Sara y los Ismaeles que fabricamos",
    etiquetas: ["Carne y Espíritu", "Ministerio", "Promesa"],
    necesidades: ["legalismo", "cansancio"],
    textoBase: {
      referencia: "Gálatas 4:22-23, 28",
      texto:
        "Porque está escrito que Abraham tuvo dos hijos; uno de la esclava, el otro de la libre. Pero el de la esclava nació según la carne; mas el de la libre, por la promesa. [...] Así que, hermanos, nosotros, como Isaac, somos hijos de la promesa.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Génesis 16:1-6",
      "Génesis 17:17-21",
      "Génesis 21:1-10",
      "Gálatas 4:24-31",
      "Gálatas 3:3",
      "Zacarías 4:6",
      "Juan 15:5",
    ],
    ideaCentral:
      "Ismael es lo que nace cuando intentamos producir con nuestras fuerzas lo que Dios prometió hacer por gracia. Fue razonable, legal y bien intencionado, y aun así Dios no lo aceptó como heredero. Todo creyente y toda iglesia tienen Ismaeles: proyectos, disciplinas y logros «según la carne» que compiten con lo que nace del Espíritu.",
    porQueNoConvencional:
      "Solemos leer Génesis 16 como una historia de impaciencia matrimonial, pero Pablo la lee como alegoría de dos pactos y dos maneras de vivir la fe. Lo incómodo es que el plan de Sarai no fue un pecado escandaloso sino una solución piadosa: quería ayudar a Dios a cumplir su palabra. La carne más peligrosa no es la inmoral sino la religiosa, y Abraham llegó a pedir «ojalá Ismael viva delante de ti»: que Dios bendijera el atajo como si fuera la promesa.",
    bosquejo: [
      {
        titulo: "Un hijo razonable",
        referencia: "Génesis 16:1-4; Gálatas 4:23",
        desarrollo:
          "Diez años de espera, una esposa estéril, una costumbre legal aceptada. Todo cuadraba. «Según la carne» no significa «según el vicio» sino «según la capacidad humana». La carne siempre tiene un plan lógico para cumplir la promesa sin depender del que la hizo.",
      },
      {
        titulo: "Un hijo que Dios ama pero no hereda",
        referencia: "Génesis 17:18-19; 21:17-20; Gálatas 4:30",
        desarrollo:
          "«Ojalá Ismael viva delante de ti». Dios bendice a Ismael, cuida a Agar en el desierto, pero es tajante: la promesa es Isaac. Dios puede ser bondadoso con lo que fabricamos y aun así no reconocerlo como fruto suyo. «No heredará el hijo de la esclava».",
      },
      {
        titulo: "Dos hijos que no conviven",
        referencia: "Génesis 21:9; Gálatas 4:29-31; 3:3",
        desarrollo:
          "El que nació según la carne persigue al que nació según el Espíritu, «así también ahora». La religión del esfuerzo siempre se burla de la gracia. «¿Habiendo comenzado por el Espíritu, ahora vais a acabar por la carne?» Hay que decidir cuál de los dos gobernará la casa.",
      },
    ],
    aplicacion: [
      "Haz inventario de tus Ismaeles: ministerios, metas o disciplinas que sostienes con ansiedad y sin gozo. Pregunta por cada uno: ¿nació de la promesa o de mi prisa?",
      "Deja de pedirle a Dios que bendiga el atajo. En lugar de «ojalá Ismael viva», ora «hágase tu palabra, aunque tarde».",
      "Cuando sientas la tentación de «ayudar a Dios», recuerda la señal: Isaac significa risa. Lo que nace del Espíritu trae risa; lo que nace de la carne trae rivalidad.",
    ],
    cuidadoPastoral:
      "«Echa fuera a la esclava» habla del sistema de la carne y de la confianza en el esfuerzo propio, no de personas. Dios oyó el llanto de Ismael y estuvo con él (Génesis 21:17-20). Este tema no autoriza a desechar a nadie ni a abandonar responsabilidades adquiridas: llama a cambiar la fuente desde la que se vive.",
    ilustracion:
      "Ismael tenía trece años cuando Dios volvió a hablar de Isaac (Génesis 17:25). Las soluciones de la carne proyectan sombras largas: trece años de un hijo amado que nunca fue la respuesta. Y Sara tuvo que ver a su propio plan burlándose de la promesa.",
  },
  {
    id: "las-uvas-agrias",
    numero: 23,
    serie: 3,
    titulo: "Las uvas agrias",
    subtitulo: "El refrán que el nuevo pacto prohibió",
    etiquetas: ["Familia", "Herencia", "Responsabilidad"],
    necesidades: ["pasado", "culpa"],
    textoBase: {
      referencia: "Jeremías 31:29-30",
      texto:
        "En aquellos días no dirán más: Los padres comieron las uvas agrias y los dientes de los hijos tienen la dentera, sino que cada cual morirá por su propia maldad; los dientes de todo hombre que comiere las uvas agrias tendrán la dentera.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Jeremías 31:31-34",
      "Ezequiel 18:2-4, 20",
      "Éxodo 20:5-6",
      "Gálatas 3:13",
      "1 Pedro 1:18-19",
      "2 Corintios 5:17",
      "Juan 9:2-3",
      "2 Reyes 18:3-5",
    ],
    ideaCentral:
      "Justo antes de anunciar el nuevo pacto, Dios prohíbe un refrán: el que culpa a los padres por lo que sufren los hijos. Bajo el nuevo pacto no vives bajo la cuenta de tu familia sino bajo la sangre de Cristo. Lo que heredaste son patrones, una «vana manera de vivir», y de ellos fuiste rescatado.",
    porQueNoConvencional:
      "En muchas congregaciones se enseña que el creyente carga «maldiciones generacionales» que deben romperse con rituales especiales. Jeremías 31:29-30 y Ezequiel 18 abolen precisamente esa mentalidad, y Gálatas 3:13 declara que Cristo agotó la maldición. El resultado práctico es un cristianismo que deja de mirar el árbol genealógico para explicar su vida y asume, con gracia, la responsabilidad del presente.",
    bosquejo: [
      {
        titulo: "El refrán que Dios corrigió",
        referencia: "Jeremías 31:29-30; Ezequiel 18:2-4, 20",
        desarrollo:
          "«¿Qué pensáis vosotros, los que usáis este refrán?». Dios mismo desautoriza la teología popular de la herencia de culpa: «el hijo no llevará el pecado del padre». Cada persona responde por sí misma ante Dios, y eso es una buena noticia: nadie te puede condenar por lo que no hiciste.",
      },
      {
        titulo: "La maldición que Cristo agotó",
        referencia: "Éxodo 20:5-6; Gálatas 3:13",
        desarrollo:
          "El «visito la maldad hasta la tercera y cuarta generación» era «de los que me aborrecen», y la misericordia «a millares, a los que me aman». En Cristo, «hecho por nosotros maldición», no queda maldición pendiente sobre un hijo redimido. No hay que romper lo que ya fue roto en la cruz.",
      },
      {
        titulo: "La manera de vivir de la que fuiste rescatado",
        referencia: "1 Pedro 1:18-19; 2 Corintios 5:17; 2 Reyes 18:3-5",
        desarrollo:
          "Lo que sí se hereda son hábitos, reacciones, silencios y heridas: «la vana manera de vivir que recibisteis de vuestros padres». Pedro dice que fuimos rescatados de ella con sangre preciosa. Ezequías, hijo del idólatra Acaz, fue uno de los mejores reyes de Judá: el árbol no es destino.",
      },
    ],
    aplicacion: [
      "Deja de diagnosticar tu vida por tu apellido. Cuando te descubras diciendo «es que en mi familia somos así», responde con 2 Corintios 5:17.",
      "Identifica un patrón heredado concreto (ira, silencio, adicción, desconfianza) y llévalo a la luz con alguien: los patrones se rompen caminando en lo nuevo, no con una ceremonia.",
      "Honra a tus padres sin cargar sus cuentas: se puede agradecer lo bueno, perdonar lo malo y negarse a repetir lo dañino, todo a la vez.",
    ],
    cuidadoPastoral:
      "Las influencias familiares son reales y a veces profundas; negar su peso sería ingenuo y cruel. Sanar puede requerir tiempo, consejería y comunidad. Pero hay que distinguir entre influencia (que se trabaja con gracia) y maldición (que Cristo ya llevó). Y Juan 9:3 advierte contra buscar culpables genealógicos para explicar cada sufrimiento.",
    ilustracion:
      "Acaz hizo pasar a su hijo por fuego y cerró el templo; su hijo Ezequías lo reabrió y quitó los lugares altos. Manasés fue el rey más perverso de Judá; su nieto Josías encabezó el mayor avivamiento del reino. La Biblia insiste: la historia familiar es un punto de partida, nunca una sentencia.",
  },
  {
    id: "dos-montes",
    numero: 24,
    serie: 3,
    titulo: "Dos montes",
    subtitulo: "Desde qué monte crías, lideras y te hablas a ti mismo",
    etiquetas: ["Crianza", "Liderazgo", "Atmósfera"],
    necesidades: ["miedo", "legalismo"],
    textoBase: {
      referencia: "Hebreos 12:18, 22, 24",
      texto:
        "Porque no os habéis acercado al monte que se podía palpar, y que ardía en fuego, a la oscuridad, a las tinieblas y a la tempestad, [...] sino que os habéis acercado al monte de Sion, a la ciudad del Dios vivo, Jerusalén la celestial, [...] a Jesús el Mediador del nuevo pacto, y a la sangre rociada que habla mejor que la de Abel.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Hebreos 12:19-21, 23, 25-29",
      "Éxodo 19:12-13, 16-19",
      "Éxodo 20:18-19",
      "Éxodo 24:9-11",
      "Romanos 8:15",
      "Efesios 6:4",
      "2 Timoteo 1:7",
    ],
    ideaCentral:
      "Sinaí y Sion no son solo dos lugares sino dos atmósferas: distancia, terror y «no toques» frente a fiesta, familia y una sangre que habla. Hebreos dice que ya llegamos al segundo. Muchos hogares, iglesias y monólogos internos siguen funcionando en el primero, y de ahí salen hijos, discípulos y conciencias que le piden a Dios que no les hable.",
    porQueNoConvencional:
      "Cuando queremos producir santidad solemos reconstruir el Sinaí: predicación de miedo, control, amenazas, reglas para «no tocar». Hebreos afirma que a ese monte no nos hemos acercado. El pueblo del Sinaí terminó pidiendo «no hable Dios con nosotros»; la atmósfera de la ley produce gente que huye de la voz que quería obedecer. El nuevo pacto tiene otra atmósfera, y esa atmósfera se puede reproducir en una casa.",
    bosquejo: [
      {
        titulo: "El monte que no se podía tocar",
        referencia: "Hebreos 12:18-21; Éxodo 19:12-13; 20:18-19",
        desarrollo:
          "Fuego, oscuridad, trompeta, límites con pena de muerte, y Moisés «espantado y temblando». El resultado fue previsible: «no hable Dios con nosotros, para que no muramos». La santidad impuesta por terror consigue distancia, no amor.",
      },
      {
        titulo: "El monte al que ya llegaste",
        referencia: "Hebreos 12:22-24",
        desarrollo:
          "«Os habéis acercado»: tiempo perfecto, hecho consumado. Ciudad, millares de ángeles, congregación festiva (panḗgyris), primogénitos inscritos, un Juez que es Padre, un Mediador y una sangre que habla perdón donde la de Abel pedía venganza. La misma santidad, otra atmósfera.",
      },
      {
        titulo: "La atmósfera que tú produces",
        referencia: "Hebreos 12:25, 28; Efesios 6:4; Romanos 8:15",
        desarrollo:
          "Cada padre, líder y creyente reproduce un monte. «No provoquéis a ira a vuestros hijos»; «no habéis recibido el espíritu de esclavitud para estar otra vez en temor». Sion no es menos reverente que Sinaí, pero el temor es reverencia, no pánico.",
      },
    ],
    aplicacion: [
      "Audita la atmósfera de tu casa: ¿tus hijos se acercan a contarte sus fallas o las esconden? Su reacción te dice desde qué monte los estás criando.",
      "Revisa cómo te hablas después de fallar: si tu voz interior suena a trueno y amenaza, no viene de Sion. Responde con la sangre que «habla mejor».",
      "Si lideras, sustituye un mecanismo de control basado en miedo por uno basado en relación esta semana: menos trompeta, más mesa.",
    ],
    cuidadoPastoral:
      "Sion no es un monte permisivo: el mismo pasaje dice «nuestro Dios es fuego consumidor» y llama a servir «con temor y reverencia» (12:28-29). La diferencia no está en la seriedad sino en la cercanía. Y aun en el Sinaí hubo un anticipo de Sion: setenta ancianos «vieron a Dios, y comieron y bebieron» (Éxodo 24:11).",
    ilustracion:
      "Dos niños con padres estrictos: uno camina de puntillas por la casa y calcula cada palabra; el otro corre a los brazos de su padre aun cuando rompió algo. Ambos «respetan», pero solo uno conoce. Sinaí produce el primero; Sion, el segundo.",
  },
  {
    id: "correr-a-la-ciudad-de-refugio",
    numero: 25,
    serie: 3,
    titulo: "Correr a la ciudad de refugio",
    subtitulo: "Adónde huir cuando fallas",
    etiquetas: ["Refugio", "Culpa", "Acceso"],
    necesidades: ["culpa", "habitos"],
    textoBase: {
      referencia: "Hebreos 6:18",
      texto:
        "Para que por dos cosas inmutables, en las cuales es imposible que Dios mienta, tengamos un fortísimo consuelo los que hemos acudido para asirnos de la esperanza puesta delante de nosotros.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Números 35:9-15, 25-28",
      "Deuteronomio 19:3",
      "Josué 20:2-4",
      "Proverbios 18:10",
      "Salmo 46:1",
      "Hebreos 7:24-25",
      "1 Timoteo 1:13-16",
      "Génesis 3:8-10",
    ],
    ideaCentral:
      "«Hemos acudido» traduce un verbo que significa huir buscando refugio, el mismo cuadro de las ciudades de Números 35. El que había causado una muerte no tenía que arreglar nada primero: tenía que correr, y los caminos estaban despejados. El evangelio no te pide que te limpies antes de venir sino que vengas, y en Cristo el refugio ya no cierra nunca.",
    porQueNoConvencional:
      "El instinto tras el pecado es el de Adán: esconderse, o el del religioso: compensar. La figura de la ciudad de refugio enseña una tercera respuesta que rara vez predicamos: correr hacia Dios en el mismo momento del fracaso, con la culpa fresca. Y añade un detalle asombroso: el refugiado quedaba libre a la muerte del sumo sacerdote. Nuestro Sumo Sacerdote ya murió, y vive para siempre.",
    bosquejo: [
      {
        titulo: "Caminos despejados y puertas abiertas",
        referencia: "Deuteronomio 19:3; Josué 20:4; Números 35:15",
        desarrollo:
          "«Arreglarás los caminos»: Dios ordenó que la ruta hacia el refugio estuviera en buen estado. El que llegaba se presentaba a la puerta, exponía su caso y «le darán lugar». Israelitas y extranjeros por igual. Dios diseñó el acceso pensando en el que ya había fallado.",
      },
      {
        titulo: "Seguro mientras estés adentro",
        referencia: "Números 35:26-28; Proverbios 18:10; Juan 10:28",
        desarrollo:
          "Fuera de los límites, el vengador tenía derecho; dentro, ninguno. La seguridad no dependía de cómo se sentía el refugiado sino de dónde estaba. «Torre fuerte es el nombre de Jehová; a él correrá el justo». El acusador no tiene jurisdicción en Cristo.",
      },
      {
        titulo: "Libre por la muerte del Sumo Sacerdote",
        referencia: "Números 35:25, 28; Hebreos 6:19-20; 7:25",
        desarrollo:
          "El homicida esperaba una muerte futura para volver libre a su heredad. Para ti esa muerte ya ocurrió: tu Sumo Sacerdote murió y, a diferencia de Aarón, resucitó y «vive siempre». Por eso el refugio no es temporal: la esperanza entra «hasta dentro del velo».",
      },
    ],
    aplicacion: [
      "Convierte a Cristo en tu primer movimiento y no en tu último recurso: la próxima vez que falles, ora antes de sentirte digno de orar.",
      "Memoriza una «ruta despejada»: un salmo o versículo (Salmo 46:1; Hebreos 4:16) que repitas en el camino de vuelta, sin rodeos ni penitencias.",
      "Sé ciudad de refugio para otros: cuando alguien te confiese una falla, no seas el vengador en la puerta; dale lugar, como los ancianos de Josué 20.",
    ],
    cuidadoPastoral:
      "Las ciudades eran para el homicidio involuntario; el asesino premeditado no tenía refugio (Números 35:16-21). Cristo supera la figura: Pablo, «blasfemo, perseguidor e injuriador», fue recibido a misericordia; David, homicida deliberado, fue perdonado. Pero refugio no significa ausencia de consecuencias ni de restitución: el refugiado vivía una vida nueva dentro de la ciudad.",
    ilustracion:
      "La tradición judía cuenta que en las encrucijadas había letreros con la palabra «Refugio» señalando la dirección, y que las ciudades estaban distribuidas para que ninguna quedara a más de un día de camino. Dios no solo ofrece refugio: pone señales para que el que huye no se pierda.",
  },
  {
    id: "mirar-no-es-hacer",
    numero: 26,
    serie: 3,
    titulo: "Mirar no es hacer",
    subtitulo: "La serpiente levantada y el remedio que se volvió ídolo",
    etiquetas: ["Fe", "Tradición", "Sencillez"],
    necesidades: ["legalismo", "culpa"],
    textoBase: {
      referencia: "Juan 3:14-15",
      texto:
        "Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Números 21:4-9",
      "2 Reyes 18:4",
      "Isaías 45:22",
      "Hebreos 12:2",
      "2 Corintios 5:21",
      "Romanos 8:3",
      "Colosenses 2:8, 16-17",
    ],
    ideaCentral:
      "El remedio para la mordedura no fue pelear con las serpientes, ni vendar la herida, ni ofrecer un sacrificio: fue mirar. Tan sencillo que ofende. Siglos después, ese mismo remedio se había convertido en un ídolo al que quemaban incienso, y un rey tuvo que hacerlo pedazos. La gracia se recibe mirando a Cristo, y hay que cuidar que los medios de gracia no ocupen su lugar.",
    porQueNoConvencional:
      "Predicamos «haz» cuando el texto dice «mira». Y cuando ya aprendimos a mirar, tendemos a sacralizar el instrumento: el método devocional, la tradición de la iglesia, el predicador, la liturgia, la experiencia de conversión. Nehustán es la advertencia de que un medio de gracia legítimo puede convertirse en objeto de confianza, y que entonces la fidelidad consiste en romperlo.",
    bosquejo: [
      {
        titulo: "Un remedio con forma de herida",
        referencia: "Números 21:8; 2 Corintios 5:21; Romanos 8:3",
        desarrollo:
          "La serpiente de bronce tenía la forma del mal que mataba al pueblo. Cristo fue enviado «en semejanza de carne de pecado» y «hecho pecado por nosotros». El remedio de Dios lleva la forma de nuestra enfermedad, levantado en un madero.",
      },
      {
        titulo: "Un remedio que solo pide mirar",
        referencia: "Números 21:9; Isaías 45:22; Hebreos 12:2",
        desarrollo:
          "«Cualquiera que fuere mordido y mirare a ella, vivirá». No importaba cuán grave fuera la mordedura ni cuán débil la mirada. «Mirad a mí, y sed salvos». La fe no es una obra que se añade: es la dirección de los ojos.",
      },
      {
        titulo: "Un remedio que puede volverse ídolo",
        referencia: "2 Reyes 18:4; Colosenses 2:16-17",
        desarrollo:
          "Setecientos años después, Israel quemaba incienso a la serpiente. Ezequías la hizo pedazos y la llamó Nehustán: «pedazo de bronce». Cuando el medio se vuelve fin, el creyente maduro no lo defiende: lo desmonta y vuelve a mirar al que fue levantado.",
      },
    ],
    aplicacion: [
      "En la próxima «mordedura» (tentación, culpa, fracaso), practica mirar antes de analizar: un minuto contemplando a Cristo crucificado antes de un minuto revisando la serpiente.",
      "Haz la prueba de Nehustán: si te quitaran tu método devocional, tu congregación, tu predicador favorito o tu tradición, ¿seguirías mirando a Cristo? Lo que no soportaría la prueba se está volviendo ídolo.",
      "Simplifica tu presentación del evangelio a otros: menos pasos, más Cristo levantado. Si el mordido puede mirar, puede vivir.",
    ],
    cuidadoPastoral:
      "Mirar no es pasividad: el que fue sanado se levantó y caminó hacia la tierra prometida. Y romper Nehustán no es despreciar los medios de gracia, que Dios mismo ordenó, sino devolverlos a su lugar de instrumentos. Ezequías destruyó la serpiente, no el templo.",
    ilustracion:
      "El 6 de enero de 1850, una tormenta de nieve desvió a un adolescente a una pequeña capilla metodista en Colchester. Un predicador improvisado leyó «Mirad a mí, y sed salvos» y, viendo al muchacho abatido, le gritó: «¡Joven, mira a Jesucristo!». Charles Spurgeon miró, y nunca dejó de predicar ese verbo.",
  },
  {
    id: "un-sumo-sacerdote-que-sabe",
    numero: 27,
    serie: 3,
    titulo: "Un Sumo Sacerdote que sabe",
    subtitulo: "La tentación no es pecado, y el momento de acercarse es durante",
    etiquetas: ["Tentación", "Cristo", "Oración"],
    necesidades: ["habitos", "culpa"],
    textoBase: {
      referencia: "Hebreos 4:15-16",
      texto:
        "Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado. Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia y hallar gracia para el oportuno socorro.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Hebreos 2:17-18",
      "Hebreos 5:7-8",
      "Mateo 4:1-11",
      "Lucas 22:39-44",
      "Santiago 1:13-15",
      "1 Corintios 10:13",
      "Hebreos 10:19-22",
    ],
    ideaCentral:
      "Jesús fue tentado en todo y no pecó, lo que prueba dos cosas: que sentir la tentación no es pecar, y que Él conoce la fuerza de la tentación mejor que tú, porque resistió hasta el final. Por eso el «oportuno socorro» está disponible durante la tentación, no después de haberla superado.",
    porQueNoConvencional:
      "Muchos creyentes se sienten sucios por el simple hecho de ser tentados y confiesan tentaciones como si fueran pecados; después se alejan de Dios justo en el momento en que Él ofrece socorro «oportuno». El texto invita a lo contrario: acercarse confiadamente en medio de la debilidad, con la tentación todavía activa, a un Sacerdote que se compadece porque estuvo ahí.",
    bosquejo: [
      {
        titulo: "Tentado en todo, sin pecado",
        referencia: "Hebreos 4:15; Mateo 4:1-11; Santiago 1:14-15",
        desarrollo:
          "Si ser tentado fuera pecar, Jesús habría pecado. Santiago describe el proceso: el deseo atrae, luego concibe, y entonces «da a luz el pecado». La tentación es la puerta, no la casa. Dejar de condenarte por la puerta es el primer paso para no entrar.",
      },
      {
        titulo: "Un Sacerdote que se compadece",
        referencia: "Hebreos 2:17-18; 5:7-8; Lucas 22:44",
        desarrollo:
          "«En cuanto él mismo padeció siendo tentado, es poderoso para socorrer». No es un teórico de la tentación: sudó como gotas de sangre, ofreció «ruegos con gran clamor y lágrimas». Solo el que resiste hasta el final conoce toda la fuerza del enemigo; el que cede a mitad de camino nunca la mide.",
      },
      {
        titulo: "Socorro en el momento oportuno",
        referencia: "Hebreos 4:16; 1 Corintios 10:13; 10:19-22",
        desarrollo:
          "«Oportuno socorro»: ayuda a tiempo, en el instante de la necesidad. Dios da «juntamente con la tentación la salida». El trono es de gracia, no de inspección: se entra con confianza precisamente cuando uno es débil.",
      },
    ],
    aplicacion: [
      "Cambia el momento de tu oración: en lugar de orar después de caer, ora en medio de la tentación, con honestidad total: «Señor, esto me está atrayendo ahora mismo; tú sabes lo que es».",
      "Deja de confesar tentaciones como pecados; confiesa pecados como pecados y presenta las tentaciones como debilidades que necesitan socorro.",
      "Cuando acompañes a alguien que lucha, no le preguntes solo «¿caíste?», pregúntale «¿te acercaste durante?». Enseña la ruta hacia el trono en tiempo real.",
    ],
    cuidadoPastoral:
      "«Sin pecado» significa que Cristo se compadece de la debilidad, no que excuse el pecado; pero el mismo Sacerdote hizo «expiación por los pecados del pueblo» (2:17), así que el que sí cayó también tiene acceso. Y algunas tentaciones requieren, además de oración, huir (2 Timoteo 2:22) y cortar el acceso: la gracia no sustituye la prudencia.",
    ilustracion:
      "Un hombre que ha caminado contra el viento diez minutos y se ha rendido sabe menos del viento que quien caminó una hora hasta llegar a casa. Jesús es el único que caminó toda la tormenta sin rendirse; por eso nadie conoce mejor la fuerza de lo que tú enfrentas.",
  },
  {
    id: "la-circuncision-que-cuenta",
    numero: 28,
    serie: 3,
    titulo: "La circuncisión que cuenta",
    subtitulo: "Las credenciales religiosas que Pablo llamó basura",
    etiquetas: ["Credenciales", "Identidad", "Confianza"],
    necesidades: ["legalismo", "pasado"],
    textoBase: {
      referencia: "Filipenses 3:3",
      texto:
        "Porque nosotros somos la circuncisión, los que en espíritu servimos a Dios y nos gloriamos en Cristo Jesús, no teniendo confianza en la carne.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Filipenses 3:4-9",
      "Deuteronomio 10:16; 30:6",
      "Romanos 2:28-29",
      "Colosenses 2:11",
      "Gálatas 6:14-15",
      "Jeremías 9:25-26",
      "1 Samuel 16:7",
    ],
    ideaCentral:
      "La circuncisión era la credencial de pertenencia. Pablo tenía la suya y todas las demás: linaje, tribu, escuela, celo, historial impecable, y las contó como pérdida. Bajo el nuevo pacto la única marca que cuenta es la que Dios hace en el corazón; todo lo demás (bautismo, membresía, años de servicio, apellido, título) es bueno como obediencia y venenoso como confianza.",
    porQueNoConvencional:
      "Pablo no llama basura a sus pecados sino a sus logros religiosos. Eso invierte nuestro instinto: solemos pensar que lo que nos aleja de la gracia es lo malo que hicimos, cuando lo que más nos aleja es lo bueno en que confiamos. Y el propio Antiguo Testamento anticipó el cambio: en Deuteronomio 10 la circuncisión del corazón es un mandato («circuncidad»); en Deuteronomio 30 se vuelve una promesa («circuncidará Jehová tu Dios tu corazón»). Lo que la ley exigía, el nuevo pacto lo hace.",
    bosquejo: [
      {
        titulo: "El currículum perfecto",
        referencia: "Filipenses 3:4-6",
        desarrollo:
          "Octavo día, Israel, Benjamín, hebreo de hebreos, fariseo, celoso, irreprensible. Siete credenciales que cualquiera envidiaría. La carne religiosa es la más difícil de detectar porque se parece mucho a la piedad y recibe aplausos.",
      },
      {
        titulo: "La circuncisión que Dios prometió hacer",
        referencia: "Deuteronomio 10:16; 30:6; Colosenses 2:11; Romanos 2:29",
        desarrollo:
          "Del mandato a la promesa: «circuncidará Jehová tu Dios tu corazón para que ames». «Circuncisión no hecha a mano, en la circuncisión de Cristo». La marca que cuenta la hace Dios, «en espíritu, no en letra», y «la alabanza del cual no viene de los hombres, sino de Dios».",
      },
      {
        titulo: "La confianza que cambia de lugar",
        referencia: "Filipenses 3:3, 7-9; Gálatas 6:14-15",
        desarrollo:
          "Tres marcas del pueblo del nuevo pacto: sirven en el Espíritu, se glorían en Cristo, no confían en la carne. «Ni la circuncisión vale nada, ni la incircuncisión, sino una nueva creación». Lo que fue ganancia se cuenta como pérdida para ser hallado en Él, con una justicia que no es propia.",
      },
    ],
    aplicacion: [
      "Escribe tu «Filipenses 3:5»: las credenciales que sostienen tu seguridad ante Dios (fecha de bautismo, denominación, cargo, años sirviendo, familia cristiana). Luego escribe al lado: «pero cuantas cosas eran para mí ganancia…».",
      "Detecta el lenguaje de credencial en tu boca: «yo llevo veinte años en la iglesia», «yo nunca he…». Cámbialo por el lenguaje de la gracia: «fui alcanzado».",
      "Trata al recién convertido sin credenciales con la misma honra que al veterano: si la marca es del corazón, nadie la puede ver ni comparar (1 Samuel 16:7).",
    ],
    cuidadoPastoral:
      "Las credenciales no son malas: el bautismo, la membresía y el servicio fiel son mandatos y bendiciones. Pablo no renunció a ser judío ni a su formación; renunció a confiar en ello. El problema nunca es tener un historial sino apoyarse en él. Y este tema tampoco es licencia para el desorden: los que «servimos en espíritu» servimos.",
    ilustracion:
      "Un pasaporte vencido sigue mostrando tu foto, tu nombre y tus sellos de viajes pasados, pero no te deja cruzar ninguna frontera. Las credenciales religiosas cuentan la historia, pero solo la circuncisión del corazón te da entrada, y esa no la emites tú.",
  },
  {
    id: "una-moabita-en-la-genealogia",
    numero: 29,
    serie: 3,
    titulo: "Una moabita en la genealogía",
    subtitulo: "Cuando la ley excluye y la gracia adopta",
    etiquetas: ["Inclusión", "Extranjeros", "Redención"],
    necesidades: ["pasado", "relaciones"],
    textoBase: {
      referencia: "Rut 2:10",
      texto:
        "Ella entonces bajando su rostro se inclinó a tierra, y le dijo: ¿Por qué he hallado gracia en tus ojos para que me reconozcas, siendo yo extranjera?",
      version: "RVR1960",
    },
    textosApoyo: [
      "Deuteronomio 23:3",
      "Rut 1:16-17, 22",
      "Rut 2:12; 3:9",
      "Levítico 25:25",
      "Rut 4:13-17",
      "Mateo 1:5",
      "Efesios 2:12-13, 19",
      "Isaías 56:3-7",
    ],
    ideaCentral:
      "Rut era moabita, viuda, pobre y extranjera; la ley excluía a su pueblo de la congregación «hasta la décima generación». Aun así fue cubierta por un pariente redentor y terminó en la genealogía del Mesías. La gracia no solo perdona pecados: adopta a los que la ley dejaba fuera, y convierte al que ora por el extranjero en la respuesta de su propia oración.",
    porQueNoConvencional:
      "Solemos predicar Rut como historia de lealtad o de romance, pero su núcleo es la gracia venciendo una exclusión legal. Deuteronomio 23:3 la dejaba fuera; el hesed de Dios, a través de Booz, la puso dentro. Y hay un detalle que rara vez se nota: Booz ora «bajo cuyas alas has venido a refugiarte» (2:12), y meses después Rut le pide «extiende el borde de tu capa (tus alas) sobre tu sierva» (3:9). Booz se convirtió en la respuesta de su oración. Para muchas iglesias en contextos de migración y exclusión, este texto es urgente.",
    bosquejo: [
      {
        titulo: "La ley la excluía",
        referencia: "Deuteronomio 23:3; Rut 1:16, 22; 2:10",
        desarrollo:
          "«No entrará moabita en la congregación de Jehová». Rut llega a Belén con tres razones para quedarse fuera: extranjera, viuda, de un pueblo maldito. Ella misma lo sabe: «¿por qué he hallado gracia… siendo yo extranjera?». La pregunta de todo excluido.",
      },
      {
        titulo: "La gracia la cubrió",
        referencia: "Rut 2:12; 3:9; Levítico 25:25",
        desarrollo:
          "El pariente redentor debía tener derecho, recursos y voluntad. Booz tenía los tres, como Cristo. Y la oración de Booz por Rut la respondió Booz: quien pide a Dios que cuide al extranjero suele ser enviado a cuidarlo. Las «alas» de Dios tenían forma de capa humana.",
      },
      {
        titulo: "El Mesías la incluyó en su árbol",
        referencia: "Rut 4:13-17; Mateo 1:5; Efesios 2:12-13, 19",
        desarrollo:
          "De espigadora a bisabuela de David, y Mateo la nombra en la genealogía de Jesús junto a Tamar, Rahab y Betsabé. «Vosotros que estabais lejos, habéis sido hechos cercanos… ya no sois extranjeros ni advenedizos». La exclusión legal fue reemplazada por adopción familiar.",
      },
    ],
    aplicacion: [
      "Si te sientes descalificado por tu origen, tu pasado, tu divorcio o tu familia, lee Mateo 1:5 despacio: Dios puso a una moabita en la línea de su Hijo a propósito.",
      "Conviértete en la respuesta de tu oración: identifica a un «extranjero» concreto (migrante, recién llegado, alguien de otra clase social o cultura) y extiende tu capa: una comida, un empleo, una presentación, una defensa.",
      "Revisa las «décimas generaciones» de tu iglesia: ¿qué trasfondos siguen sintiéndose de segunda categoría? Nombra uno y da un paso público de inclusión.",
    ],
    cuidadoPastoral:
      "La inclusión de Rut no fue relativismo: ella dejó los dioses de Moab («tu Dios será mi Dios») y se puso bajo las alas de Jehová. La gracia recibe al de fuera y lo transforma; no lo deja igual ni le pide que primero se haga israelita. Y el cuidado del extranjero no es un tema político sino un mandato del mismo Dios que redimió a Rut (Levítico 19:33-34).",
    ilustracion:
      "Rahab, prostituta cananea; Rut, viuda moabita; Betsabé, esposa de un heteo; Tamar, la nuera que se hizo pasar por prostituta. Mateo pudo omitirlas de la genealogía, como era costumbre con las mujeres, y las incluyó. El árbol del Mesías fue plantado a propósito con gente que la ley habría dejado fuera.",
  },
  {
    id: "el-jubileo-empezo-en-nazaret",
    numero: 30,
    serie: 3,
    titulo: "El jubileo empezó en Nazaret",
    subtitulo: "El primer sermón de Jesús y la frase donde se detuvo",
    etiquetas: ["Libertad", "Deudas", "Reino"],
    necesidades: ["finanzas", "relaciones"],
    textoBase: {
      referencia: "Lucas 4:18-19, 21",
      texto:
        "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos; a poner en libertad a los oprimidos; a predicar el año agradable del Señor. [...] Hoy se ha cumplido esta Escritura delante de vosotros.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Levítico 25:8-13",
      "Isaías 61:1-2",
      "Lucas 4:20, 22-30",
      "Deuteronomio 15:1-2",
      "Mateo 6:12; 18:27",
      "Colosenses 2:14",
      "Hechos 17:30-31",
    ],
    ideaCentral:
      "Jesús inauguró su ministerio anunciando el jubileo: deudas canceladas, esclavos liberados, tierras devueltas, descanso. Leyó Isaías 61 y cerró el libro antes de «el día de venganza»: vivimos en esa pausa. Y el jubileo empezaba con la trompeta del Día de la Expiación: toda libertad nace del sacrificio, y el que fue liberado libera.",
    porQueNoConvencional:
      "No hay registro bíblico de que Israel haya celebrado alguna vez el jubileo; era la ley más generosa y la menos practicada. Jesús declara «hoy se ha cumplido» lo que el pueblo nunca cumplió. La lectura también revela algo incómodo: la sinagoga aplaudió hasta que Jesús mencionó a la viuda de Sarepta y a Naamán, un jubileo que alcanzaba a los de fuera, y entonces quisieron despeñarlo. La gracia gusta hasta que se vuelve inclusiva.",
    bosquejo: [
      {
        titulo: "El año que Israel nunca celebró",
        referencia: "Levítico 25:8-13; Lucas 4:21",
        desarrollo:
          "Cada cincuenta años: libertad pregonada, cada uno de vuelta a su posesión y a su familia, la tierra en reposo. Un reinicio total de la economía y las relaciones. Lo que quedó en el papel durante siglos, Jesús lo puso en marcha con una palabra: «hoy».",
      },
      {
        titulo: "La frase donde Jesús se detuvo",
        referencia: "Isaías 61:2; Lucas 4:19-20; Hechos 17:30-31",
        desarrollo:
          "Isaías sigue: «y el día de venganza del Dios nuestro». Jesús cerró el libro antes de esa coma y se sentó. El juicio no fue cancelado sino pospuesto: estamos viviendo en la pausa entre «año agradable» y «día de venganza». La era de la gracia es esa coma.",
      },
      {
        titulo: "La trompeta sonaba el Día de la Expiación",
        referencia: "Levítico 25:9; Colosenses 2:14; Mateo 6:12; 18:27",
        desarrollo:
          "El jubileo no empezaba en año nuevo sino en Yom Kipur: primero la sangre, después la libertad. Nuestra acta de deudas fue clavada en la cruz; por eso oramos «perdónanos nuestras deudas como también nosotros perdonamos». El liberado que no libera no entendió qué trompeta sonó.",
      },
    ],
    aplicacion: [
      "Practica un jubileo personal: ¿qué deuda (económica, emocional, de gratitud exigida) le estás cobrando a alguien desde hace años? Cancélala esta semana y díselo.",
      "Devuelve lo que no es tuyo: la posesión, el crédito, la reputación o el tiempo que retienes de otro. El jubileo restituye.",
      "Deja algo en reposo: un ritmo, un proyecto o una tierra sobreexplotada de tu vida. El descanso del jubileo también era acto de fe en la provisión de Dios.",
    ],
    cuidadoPastoral:
      "El «día de venganza» no fue borrado: Dios «ha establecido un día en el cual juzgará al mundo con justicia». Predicar el jubileo sin la segunda mitad de Isaías 61:2 produce un evangelio sin urgencia; predicar la venganza sin el año agradable produce un evangelio sin gracia. La coma es larga, pero no eterna.",
    ilustracion:
      "La Campana de la Libertad de Filadelfia lleva grabado Levítico 25:10: «Pregonaréis libertad en la tierra a todos sus moradores». Se agrietó al poco tiempo de fundirse. Toda libertad humana suena agrietada; la trompeta de Nazaret es la única que sonó completa.",
  },

  /* ─────────────── SERIE 4 · GRACIA PARA LAS ESTACIONES DIFÍCILES ─────────────── */

  {
    id: "bastate-mi-gracia",
    numero: 31,
    serie: 4,
    titulo: "Bástate mi gracia",
    subtitulo: "La oración que Dios respondió con un «no»",
    etiquetas: ["Debilidad", "Oración", "Poder"],
    necesidades: ["sufrimiento", "oracion"],
    textoBase: {
      referencia: "2 Corintios 12:9",
      texto:
        "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad. Por tanto, de buena gana me gloriaré más bien en mis debilidades, para que repose sobre mí el poder de Cristo.",
      version: "RVR1960",
    },
    textosApoyo: [
      "2 Corintios 12:7-10",
      "2 Corintios 4:7",
      "2 Corintios 1:8-9",
      "Isaías 40:29-31",
      "Hebreos 11:34",
      "Jueces 7:16-20",
      "Génesis 32:24-31",
    ],
    ideaCentral:
      "El apóstol con más revelaciones vivió con una oración no contestada y una debilidad permanente. La gracia no es solo perdón para el pecado: es poder para la debilidad. Y no siempre quita el aguijón; a veces se queda con él y hace del punto débil la plataforma donde el poder de Cristo «hace su tienda».",
    porQueNoConvencional:
      "Presentamos la gracia como la solución que elimina el problema; Pablo la presenta como la presencia que permanece con el problema. Rogó tres veces y la respuesta fue un no con explicación. Y en una cultura de imagen, también dentro de la iglesia, Pablo hace lo impensable: se gloría en sus debilidades públicamente. La teología de la gracia es también una teología del límite.",
    bosquejo: [
      {
        titulo: "Tres veces, y un no",
        referencia: "2 Corintios 12:7-8; 1:8-9",
        desarrollo:
          "Un aguijón, un mensajero de Satanás, y un propósito de Dios: «para que no me enaltezca». Pablo oró como oramos todos: que se quite. El no también es respuesta, y también es gracia: «para que no confiásemos en nosotros mismos, sino en Dios que resucita a los muertos».",
      },
      {
        titulo: "La gracia que no quita, sostiene",
        referencia: "2 Corintios 12:9a; Isaías 40:29; Hebreos 11:34",
        desarrollo:
          "«Bástate»: suficiencia presente, no ausencia de problema. «Mi poder se perfecciona (llega a su meta) en la debilidad». Los héroes de Hebreos 11 «sacaron fuerzas de debilidad», no de fortaleza. La gracia no necesita que estés bien para obrar; necesita que estés vacío.",
      },
      {
        titulo: "La debilidad como plataforma",
        referencia: "2 Corintios 12:9b-10; 4:7; Jueces 7:19-20",
        desarrollo:
          "«Para que repose sobre mí»: el verbo es «hacer tabernáculo». El poder de Cristo acampa sobre el débil que lo reconoce. Tesoro en vasos de barro; y los trescientos de Gedeón ganaron cuando rompieron los cántaros y la luz salió. Lo que escondes por vergüenza puede ser por donde sale la luz.",
      },
    ],
    aplicacion: [
      "Nombra tu aguijón ante Dios y ante una persona de confianza. Lo que se esconde no puede convertirse en plataforma.",
      "Reescribe tu oración: en lugar de solo «quítalo», añade «si no lo quitas, que tu poder repose aquí». Y observa qué cambia en ti mientras esperas.",
      "Sirve desde la debilidad esta semana: comparte tu testimonio incluyendo lo que no se ha resuelto. Es más creíble que el que solo cuenta victorias.",
    ],
    cuidadoPastoral:
      "Este tema no es resignación ni fatalismo: Dios sana, libera y responde oraciones; hay que seguir pidiendo. Pablo pidió tres veces antes de recibir la respuesta. Y «gloriarse en la debilidad» no es exhibicionismo del dolor ni excusa para no crecer, sino honestidad que abre espacio al poder de Otro.",
    ilustracion:
      "Jacob luchó toda la noche y amaneció con la cadera dislocada. «Le salió el sol; y cojeaba» (Génesis 32:31). Bendecido y cojo a la vez, y por el resto de su vida su forma de caminar contaba la historia de quién lo había vencido. Hay cojeras que son credenciales.",
  },
  {
    id: "pan-para-hoy",
    numero: 32,
    serie: 4,
    titulo: "Pan para hoy",
    subtitulo: "El maná, la ansiedad y la gracia que no se almacena",
    etiquetas: ["Ansiedad", "Provisión", "Confianza"],
    necesidades: ["ansiedad", "finanzas"],
    textoBase: {
      referencia: "Éxodo 16:4",
      texto:
        "Y Jehová dijo a Moisés: He aquí yo os haré llover pan del cielo; y el pueblo saldrá, y recogerá diariamente la porción de un día, para que yo lo pruebe si anda en mi ley, o no.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Éxodo 16:16-26",
      "Mateo 6:11, 25-34",
      "Lamentaciones 3:22-23",
      "Deuteronomio 8:3",
      "Juan 6:32-35",
      "Filipenses 4:6-7, 19",
      "1 Pedro 5:7",
    ],
    ideaCentral:
      "El maná venía en raciones diarias y el que lo guardaba para mañana lo encontraba con gusanos. La gracia funciona igual: Dios da fuerzas para el problema de hoy, no para el escenario imaginado de mañana. Buena parte de la ansiedad es el intento de vivir el mañana con el maná de hoy.",
    porQueNoConvencional:
      "Tratamos la ansiedad como un pecado que hay que reprender o como un problema ajeno a la fe. El maná la describe como un problema de calendario: intentar asegurar hoy lo que Dios prometió dar mañana. Y revela algo más: la provisión diaria era una «prueba» de confianza. Dios no quiso un pueblo con despensa llena sino un pueblo que lo mirara cada mañana.",
    bosquejo: [
      {
        titulo: "La porción de un día",
        referencia: "Éxodo 16:4, 16-18; Mateo 6:11",
        desarrollo:
          "«Recogerá diariamente la porción de un día». Al que recogió mucho no le sobró y al que recogió poco no le faltó. Jesús enseña a orar «danos hoy»: la dependencia diaria no es un defecto del sistema sino su diseño.",
      },
      {
        titulo: "Lo que se guarda para mañana cría gusanos",
        referencia: "Éxodo 16:19-20; Mateo 6:34",
        desarrollo:
          "«Ninguno deje nada de ello para mañana». Lo guardaron y «crió gusanos, y hedió». El afán por mañana pudre el hoy. «Basta a cada día su propio mal»: Dios no reparte gracia para problemas que todavía no existen, y por eso, cuando los imaginas, te sientes sin recursos.",
      },
      {
        titulo: "Nuevas cada mañana",
        referencia: "Lamentaciones 3:22-23; Deuteronomio 8:3; Juan 6:35",
        desarrollo:
          "«Nunca decayeron sus misericordias; nuevas son cada mañana». El maná apuntaba al Pan de vida: la provisión no es una cosa sino una Persona que se da cada día. «No solo de pan vivirá el hombre»: el desierto fue la escuela de la confianza diaria.",
      },
    ],
    aplicacion: [
      "Cuando la ansiedad llegue, pregúntate qué día estás intentando vivir. Si es mañana, vuelve a hoy: ¿qué necesito y qué tengo para las próximas horas?",
      "Lleva un «diario del maná» durante un mes: cada noche anota una provisión concreta de ese día. La memoria de la fidelidad es el mejor remedio contra el afán.",
      "Convierte cada preocupación en una petición específica (Filipenses 4:6) y luego suéltala por escrito: «esto es de mañana; hoy no me toca cargarlo».",
    ],
    cuidadoPastoral:
      "Vivir del maná diario no condena la planificación: la hormiga guarda en verano (Proverbios 6:6-8) y José almacenó grano por mandato de Dios. Lo que se condena es el afán que desconfía, no la prudencia que administra. Y la ansiedad, cuando es clínica, merece ayuda profesional; esa ayuda también es maná.",
    ilustracion:
      "Corrie ten Boom contaba que su padre le explicó, cuando era niña, que él le entregaba el boleto del tren justo antes de subir, no semanas antes, porque así no lo perdería. «Dios también sabe cuándo vas a necesitar las cosas», le dijo. La gracia se entrega en el andén, no en la sala de espera.",
  },
  {
    id: "levantate-y-come",
    numero: 33,
    serie: 4,
    titulo: "Levántate y come",
    subtitulo: "Cómo trató Dios a un profeta que quería morirse",
    etiquetas: ["Agotamiento", "Depresión", "Cuidado"],
    necesidades: ["cansancio", "sufrimiento"],
    textoBase: {
      referencia: "1 Reyes 19:5, 7",
      texto:
        "Y echándose debajo del enebro, se quedó dormido; y he aquí luego un ángel le tocó, y le dijo: Levántate, come. [...] Y volviendo el ángel de Jehová la segunda vez, lo tocó, diciendo: Levántate y come, porque largo camino te resta.",
      version: "RVR1960",
    },
    textosApoyo: [
      "1 Reyes 19:1-4, 8-18",
      "Salmo 103:13-14",
      "Marcos 6:31",
      "Mateo 11:28-30",
      "Isaías 42:3",
      "Salmo 127:2",
      "Santiago 5:17",
    ],
    ideaCentral:
      "La primera respuesta de Dios a un profeta deprimido, agotado y con deseos de morir no fue un sermón ni un reproche: fue tocarlo, alimentarlo y dejarlo dormir, dos veces. Después vino la voz suave, un compañero y una perspectiva corregida. La gracia trata a la persona completa, cuerpo incluido, y se acuerda de que somos polvo.",
    porQueNoConvencional:
      "En la iglesia solemos espiritualizar el agotamiento («ora más», «reprende ese espíritu») y avergonzar la depresión como falta de fe. Elías, el mismo que acababa de hacer descender fuego del cielo, se derrumba al día siguiente de su mayor victoria, y Dios responde con pan, agua y siesta. Santiago recordará que Elías «estaba sujeto a pasiones semejantes a las nuestras»: el derrumbe no lo descalificó.",
    bosquejo: [
      {
        titulo: "El profeta debajo del enebro",
        referencia: "1 Reyes 19:1-4; Santiago 5:17",
        desarrollo:
          "Tras el Carmelo: una amenaza, una huida, un desierto, y «basta ya, quítame la vida, pues no soy yo mejor que mis padres». Miedo, agotamiento y perfeccionismo juntos. Le pasa a los mejores, y suele pasar justo después de las cumbres.",
      },
      {
        titulo: "El Dios que primero alimenta",
        referencia: "1 Reyes 19:5-8; Salmo 103:13-14",
        desarrollo:
          "Un toque, una torta sobre las ascuas, una vasija de agua, más sueño, y otra vez lo mismo. Ninguna pregunta todavía. «Se acuerda de que somos polvo»: el cuerpo también es objeto de la gracia. Dios no exigió que Elías se arreglara para hablarle; lo cuidó para que pudiera escuchar.",
      },
      {
        titulo: "El silbo, el amigo y los siete mil",
        referencia: "1 Reyes 19:11-18",
        desarrollo:
          "Después del descanso: no viento, ni terremoto, ni fuego, sino un silbo apacible. Luego la pregunta amable, una nueva tarea, un compañero (Eliseo) y un dato que corrige la mentira del aislamiento: «yo haré que queden siete mil». No estás solo, y no has terminado.",
      },
    ],
    aplicacion: [
      "Si estás bajo el enebro, empieza por lo que Dios empezó: duerme, come, hidrátate, deja que alguien te toque el hombro. No es carnal; es 1 Reyes 19.",
      "No tomes decisiones definitivas debajo del enebro. Elías pidió morir y Dios ni siquiera respondió esa petición; le dio pan. Espera al silbo.",
      "Busca a tu Eliseo y sé el Eliseo de alguien: el aislamiento es el terreno donde crece la mentira de «solo quedo yo».",
    ],
    cuidadoPastoral:
      "La depresión puede requerir tratamiento médico y acompañamiento profesional; la iglesia no debe avergonzar a quien los recibe, del mismo modo que no avergüenza al diabético por la insulina. Este pasaje tampoco reduce la depresión a cansancio físico, pero sí desmiente que el cuidado del cuerpo sea poco espiritual. Si alguien expresa deseos de morir, escúchalo con seriedad y busca ayuda inmediata.",
    ilustracion:
      "Un corredor de maratón que se desploma en la meta no necesita una charla sobre disciplina sino una manta, agua y que alguien lo sostenga. El Carmelo fue el maratón de Elías; el enebro fue la meta; el ángel trajo la manta.",
  },
  {
    id: "deje-a-trofimo-enfermo",
    numero: 34,
    serie: 4,
    titulo: "Dejé a Trófimo enfermo",
    subtitulo: "Enfermedad sin culpa bajo el nuevo pacto",
    etiquetas: ["Enfermedad", "Sanidad", "Consuelo"],
    necesidades: ["sufrimiento", "culpa"],
    textoBase: {
      referencia: "2 Timoteo 4:20",
      texto: "Erasto se quedó en Corinto, y a Trófimo dejé en Mileto enfermo.",
      version: "RVR1960",
    },
    textosApoyo: [
      "1 Timoteo 5:23",
      "Filipenses 2:25-27, 30",
      "Gálatas 4:13-14",
      "Juan 9:1-3",
      "Job 2:11-13; 42:7",
      "Santiago 5:14-16",
      "Romanos 8:23",
      "2 Corintios 4:16-17",
    ],
    ideaCentral:
      "El apóstol que sanó enfermos en Malta dejó a un colaborador enfermo en Mileto, recetó vino a su discípulo por sus males crónicos de estómago y casi perdió a Epafrodito. La enfermedad en la vida de un creyente fiel no es evidencia automática de pecado, falta de fe ni ataque demoníaco. Bajo la gracia oramos con fe por sanidad y acompañamos al enfermo sin ponerlo en el banquillo.",
    porQueNoConvencional:
      "En muchas iglesias el enfermo carga dos pesos: la enfermedad y la sospecha. Se le pregunta qué pecado tiene, qué puerta abrió o por qué no tiene fe suficiente. El Nuevo Testamento muestra a los mejores siervos de Dios enfermos, y a Pablo respondiendo con medicina, oración y misericordia, no con diagnósticos espirituales. Predicar esto libera a los enfermos de una culpa que Dios nunca les puso.",
    bosquejo: [
      {
        titulo: "Los enfermos del equipo de Pablo",
        referencia: "2 Timoteo 4:20; 1 Timoteo 5:23; Filipenses 2:27; Gálatas 4:13",
        desarrollo:
          "Trófimo, Timoteo, Epafrodito y el propio Pablo, que predicó en Galacia «a causa de una enfermedad del cuerpo». El apóstol de los milagros no sanó a todos ni se sanó a sí mismo. La enfermedad no era un escándalo teológico en la iglesia primitiva; era parte de la vida en un cuerpo que espera redención.",
      },
      {
        titulo: "La pregunta equivocada",
        referencia: "Juan 9:1-3; Job 42:7",
        desarrollo:
          "«¿Quién pecó, éste o sus padres?». Jesús rechaza la premisa. Los amigos de Job tenían una teología impecable de la retribución, y Dios dijo que no habían hablado rectamente. La gracia cambia la pregunta de la causa («¿por qué?») al propósito («¿para qué gloria?»).",
      },
      {
        titulo: "Cómo acompaña la gracia",
        referencia: "Santiago 5:14-16; Romanos 8:23; 2 Corintios 4:16-17",
        desarrollo:
          "Ancianos que oran con fe y ungen, confesión mutua, comunidad sin sospecha, medicina sin culpa (el vino de Timoteo). Y una esperanza honesta: «gemimos, esperando la redención de nuestro cuerpo». Toda sanidad de hoy es anticipo; la sanidad completa es resurrección.",
      },
    ],
    aplicacion: [
      "Si estás enfermo, suelta la sospecha: pide oración con fe (Santiago 5) y toma tu medicina sin culpa. Ambas cosas son gracia.",
      "Cuando visites a un enfermo, imita los primeros siete días de los amigos de Job (2:13): presencia y silencio antes que explicaciones. No seas el capítulo 4 en adelante.",
      "Si lideras oraciones por sanidad, hazlo con fe y sin amenazas: nunca hagas responsable al enfermo del resultado. Dios sana por gracia, no por presión.",
    ],
    cuidadoPastoral:
      "Dios sana; Jesús sanó a multitudes y la iglesia debe seguir orando con expectativa (Marcos 16:18; Hechos 28:8-9). Este tema no es una teología de la resignación sino una teología de la gracia: pedimos con fe, recibimos con gratitud lo que Dios da y no culpamos a quien sigue enfermo. Y toda enfermedad, tarde o temprano, será tragada por la vida.",
    ilustracion:
      "Los amigos de Job hicieron lo mejor cuando no dijeron nada: siete días sentados en la ceniza con él. Después abrieron la boca para explicar su sufrimiento, y Dios tuvo que corregirlos y mandarlos a que Job orara por ellos. El que sufre no necesita un tribunal; necesita compañía.",
  },
  {
    id: "llorar-con-esperanza",
    numero: 35,
    serie: 4,
    titulo: "Llorar con esperanza",
    subtitulo: "El duelo que la gracia permite y transforma",
    etiquetas: ["Duelo", "Esperanza", "Consuelo"],
    necesidades: ["sufrimiento", "relaciones"],
    textoBase: {
      referencia: "1 Tesalonicenses 4:13-14",
      texto:
        "Tampoco queremos, hermanos, que ignoréis acerca de los que duermen, para que no os entristezcáis como los otros que no tienen esperanza. Porque si creemos que Jesús murió y resucitó, así también traerá Dios con Jesús a los que durmieron en él.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Juan 11:25-26, 33-36",
      "Hechos 8:2",
      "Salmo 56:8",
      "Salmo 34:18",
      "Romanos 12:15",
      "2 Samuel 12:22-23",
      "2 Corintios 1:3-4",
      "Apocalipsis 21:4",
    ],
    ideaCentral:
      "El texto no dice «no os entristezcáis» sino «no como los que no tienen esperanza». La gracia da permiso para llorar (Jesús lloró sabiendo que resucitaría a Lázaro en minutos) y da un horizonte al llanto. El duelo cristiano es una tristeza distinta, no una tristeza prohibida.",
    porQueNoConvencional:
      "En muchos funerales evangélicos se le exige al doliente sonreír «porque está en un lugar mejor», como si la tristeza fuera falta de fe. Pero varones piadosos y llenos del Espíritu hicieron «gran llanto» sobre Esteban, y el Hijo de Dios se estremeció y lloró frente a una tumba que estaba a punto de vaciar. La resurrección no cancela las lágrimas; las acompaña y les promete un final.",
    bosquejo: [
      {
        titulo: "Permiso para llorar",
        referencia: "Juan 11:33-36; Hechos 8:2; Salmo 56:8",
        desarrollo:
          "«Jesús lloró», y los presentes leyeron sus lágrimas correctamente: «mirad cómo le amaba». Llorar es el precio del amor. Dios guarda las lágrimas en su redoma: no le estorban, las atesora. El que no llora no tiene más fe; a veces solo tiene menos permiso.",
      },
      {
        titulo: "Una tristeza distinta",
        referencia: "1 Tesalonicenses 4:13-14; Juan 11:25; 2 Samuel 12:23",
        desarrollo:
          "«No como los otros»: la diferencia no está en la cantidad de dolor sino en la presencia de la esperanza. Los creyentes «duermen»; Jesús murió y resucitó; Dios los traerá con Él. David, tras la muerte de su hijo, dijo «yo voy a él»: el duelo cristiano tiene dirección.",
      },
      {
        titulo: "Cómo acompañar al que llora",
        referencia: "Romanos 12:15; Job 2:13; 2 Corintios 1:3-4",
        desarrollo:
          "«Llorad con los que lloran», no «expliquen a los que lloran». Siete días de silencio valen más que un sermón sobre la soberanía. Y el consuelo que recibimos de Dios es para darlo: los que han llorado con esperanza son los mejores acompañantes.",
      },
    ],
    aplicacion: [
      "Si estás en duelo, date permiso: llora sin culpa y sin calendario. Escribe tu tristeza como un salmo, con el «pero yo confío» al final, aunque hoy te cueste decirlo.",
      "Al acompañar a alguien, cambia las frases hechas por presencia: «estoy aquí», una comida, una tarea práctica, y volver a preguntar a los tres meses, cuando todos ya se fueron.",
      "Prepara a tu iglesia para el duelo antes de que llegue: enseña 1 Tesalonicenses 4 en tiempos de paz, para que en la tormenta no haya que improvisar la esperanza.",
    ],
    cuidadoPastoral:
      "El duelo no tiene fecha de vencimiento ni fórmula; cada persona lo vive distinto. Evita los clichés que minimizan la pérdida («Dios necesitaba otro ángel»). La promesa de 4:14 es para «los que durmieron en él»; ante otras pérdidas, entregamos al que amamos al Juez de toda la tierra, que hará lo que es justo (Génesis 18:25), y sostenemos al doliente sin especular.",
    ilustracion:
      "En Juan 11 Jesús pronuncia «yo soy la resurrección y la vida» y pocos versículos después llora. Las dos cosas caben en el mismo capítulo y en la misma Persona. El evangelio no te pide elegir entre la verdad y las lágrimas.",
  },
  {
    id: "dios-mio-por-que",
    numero: 36,
    serie: 4,
    titulo: "Dios mío, ¿por qué?",
    subtitulo: "El lamento como oración del nuevo pacto",
    etiquetas: ["Lamento", "Oración", "Silencio de Dios"],
    necesidades: ["sufrimiento", "oracion"],
    textoBase: {
      referencia: "Salmo 22:1; Mateo 27:46",
      texto:
        "Dios mío, Dios mío, ¿por qué me has desamparado? ¿Por qué estás tan lejos de mi salvación, y de las palabras de mi clamor? [...] Cerca de la hora novena, Jesús clamó a gran voz, diciendo: Elí, Elí, ¿lama sabactani? Esto es: Dios mío, Dios mío, ¿por qué me has desamparado?",
      version: "RVR1960",
    },
    textosApoyo: [
      "Salmo 13:1-6",
      "Salmo 88",
      "Lamentaciones 3:1-8, 21-24",
      "Habacuc 1:2",
      "Salmo 22:24",
      "Hebreos 5:7",
      "Hebreos 13:5",
      "Romanos 8:26",
      "Isaías 50:10",
    ],
    ideaCentral:
      "Un tercio de los Salmos son lamentos y el himnario de la iglesia casi no tiene ninguno. Jesús mismo oró un lamento desde la cruz. La gracia no exige fingir: da palabras para la oscuridad, y garantiza que el desamparo que el Hijo sufrió es el único que tú nunca sufrirás.",
    porQueNoConvencional:
      "Muchas iglesias enseñan que la fe siempre declara victoria y que quejarse ante Dios es incredulidad. Pero Dios canonizó el Salmo 88, que termina en tinieblas sin un versículo de alivio, y su propio Hijo gritó «¿por qué?». La queja dirigida a Dios, dentro de la relación, no es falta de fe: es fe que se niega a irse.",
    bosquejo: [
      {
        titulo: "El libro de oraciones que dejamos de usar",
        referencia: "Salmo 13:1; Salmo 88:18; Habacuc 1:2; Lamentaciones 3:1-8",
        desarrollo:
          "«¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?». Dios puso en su Palabra oraciones de queja, protesta y desconcierto para que las usáramos. Suprimir el lamento no produce más fe; produce creyentes que mienten cuando cantan.",
      },
      {
        titulo: "El lamento que Jesús oró",
        referencia: "Mateo 27:46; Salmo 22:1; Hebreos 5:7; 13:5",
        desarrollo:
          "El Hijo experimentó el silencio real del Padre para que el silencio que tú sientes nunca sea abandono real. «No te desampararé, ni te dejaré» se lo puede decir a un hijo porque al Hijo sí lo desamparó. Tu «¿por qué?» ya tiene respuesta en el suyo.",
      },
      {
        titulo: "Cómo se ora en la oscuridad",
        referencia: "Salmo 13:5-6; Lamentaciones 3:21-24; Salmo 22:24; Romanos 8:26; Isaías 50:10",
        desarrollo:
          "El lamento bíblico tiene forma: invocación, queja, petición y un «pero yo» de confianza, aunque sea pequeño. Dirige el «¿por qué?» a Dios, no lejos de Dios. Y cuando no hay palabras, el Espíritu gime contigo. «El que anda en tinieblas y carece de luz, confíe en el nombre de Jehová».",
      },
    ],
    aplicacion: [
      "Escribe tu propio lamento siguiendo la estructura del Salmo 13: dirígete a Dios, quéjate con honestidad, pide, y termina con el «pero yo» más sincero que puedas, aunque sea una sola línea.",
      "Ora los Salmos cuando no tengas palabras. No los adornes: si el salmista dice «¿hasta cuándo?», dilo tú también.",
      "Haz lugar al lamento en la iglesia: un canto, una oración pública, un espacio en el culto donde el que sufre no tenga que fingir para pertenecer.",
    ],
    cuidadoPastoral:
      "El lamento es queja a Dios, no murmuración sobre Dios a espaldas de Dios (Números 14 muestra la diferencia). Se mantiene dentro de la relación y dentro del pacto. Y el silencio de Dios no es su ausencia: el mismo Salmo 22 termina afirmando que «cuando clamó a él, le oyó». El lamento es un puente, no un destino.",
    ilustracion:
      "El Salmo 88 es el único que termina sin luz: «a mis conocidos has puesto en tinieblas». Dios lo dejó así en su Palabra, sin editar, para que el creyente que hoy está en el versículo 18 sepa que su oración también es Escritura, y que el Salmo 89 empieza cantando «las misericordias de Jehová».",
  },
  {
    id: "aun-en-la-vejez-fructificaran",
    numero: 37,
    serie: 4,
    titulo: "Aun en la vejez fructificarán",
    subtitulo: "Un Dios que carga hasta las canas",
    etiquetas: ["Vejez", "Propósito", "Generaciones"],
    necesidades: ["cansancio", "sufrimiento"],
    textoBase: {
      referencia: "Salmo 92:14; Isaías 46:4",
      texto:
        "Aun en la vejez fructificarán; estarán vigorosos y verdes. [...] Y hasta la vejez yo mismo, y hasta las canas os soportaré yo; yo hice, yo llevaré, yo soportaré y guardaré.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Salmo 92:12-15",
      "Isaías 46:1-4",
      "2 Corintios 4:16-18",
      "Salmo 71:9, 17-18",
      "Lucas 2:25-38",
      "Josué 14:10-12",
      "Tito 2:2-5",
      "Filipenses 1:6",
    ],
    ideaCentral:
      "Los ídolos de Babilonia había que cargarlos en bestias; el Dios de Israel es el que carga a su pueblo desde el vientre hasta las canas. En una cultura, también eclesiástica, que idolatra la juventud, la gracia declara que la última estación puede ser la más fructífera, y que cuando ya no puedas hacer, seguirás siendo llevado.",
    porQueNoConvencional:
      "Las iglesias suelen arrinconar a los mayores mientras la Biblia los pone como maestros intergeneracionales (Tito 2) y como los primeros en reconocer al Mesías (Simeón y Ana). Y el texto de Isaías dice algo que casi nunca se predica a los ancianos: la relación con Dios no depende de tu capacidad de servir. Cuando la fuerza se acaba, el «yo llevaré» de Dios no se acaba.",
    bosquejo: [
      {
        titulo: "Dioses que hay que cargar y un Dios que carga",
        referencia: "Isaías 46:1-4",
        desarrollo:
          "Bel y Nebo, cargados sobre animales cansados, son «carga para las bestias». Jehová responde: «yo hice, yo llevaré, yo soportaré y guardaré», del vientre a las canas. Toda religión de mérito termina cargándote; el nuevo pacto es el Dios que te carga a ti.",
      },
      {
        titulo: "Fruto en la última estación",
        referencia: "Salmo 92:12-15; Lucas 2:25-38; Josué 14:10-12",
        desarrollo:
          "«Plantados en la casa de Jehová… aun en la vejez fructificarán». Simeón y Ana, ancianos, fueron los primeros evangelistas del Mesías. Caleb pidió el monte a los ochenta y cinco. Plantados no significa jubilados: el fruto cambia de forma, no desaparece.",
      },
      {
        titulo: "Lo que se desgasta y lo que se renueva",
        referencia: "2 Corintios 4:16-18; Salmo 71:18; Tito 2:2-5",
        desarrollo:
          "Pablo es honesto: «el hombre exterior se va desgastando». Pero «el interior se renueva de día en día». La misión de la vejez está escrita: «hasta que anuncie tu poder a la posteridad». Enseñar a los jóvenes no es un consuelo para los mayores; es su asignación.",
      },
    ],
    aplicacion: [
      "Si eres mayor: identifica a una persona joven a quien puedas contar lo que Dios ha hecho en tu vida (Salmo 71:18) y busca una reunión este mes. Tu historia es un recurso de la iglesia.",
      "Si eres joven: siéntate con un anciano de tu congregación y hazle tres preguntas sobre su caminar con Dios. Escuchar es honrar, y es aprender.",
      "Si tus fuerzas se han ido: repite Isaías 46:4 en primera persona («me hizo, me llevará»). Tu valor ante Dios nunca estuvo en lo que cargabas.",
    ],
    cuidadoPastoral:
      "No hay que romantizar la vejez: trae pérdidas reales de salud, de personas, de independencia. El «hombre exterior se desgasta» es una descripción honesta y la gracia es también para esos duelos. Y para quienes ya no pueden «fructificar» visiblemente por demencia o dependencia, Isaías 46:4 sigue vigente: el que no puede hacer, sigue siendo llevado.",
    ilustracion:
      "Ana, de edad muy avanzada, no se apartaba del templo; Simeón esperaba «la consolación de Israel». Cuando un matrimonio pobre entró con un bebé, los jóvenes sacerdotes no vieron nada especial; dos ancianos reconocieron a Dios en brazos. Hay cosas que solo se ven después de muchos años mirando.",
  },
  {
    id: "la-espera-no-es-castigo",
    numero: 38,
    serie: 4,
    titulo: "La espera no es castigo",
    subtitulo: "Por qué Jesús se quedó dos días más",
    etiquetas: ["Espera", "Promesas", "Tiempos de Dios"],
    necesidades: ["ansiedad", "oracion"],
    textoBase: {
      referencia: "Juan 11:5-6",
      texto:
        "Y amaba Jesús a Marta, a su hermana y a Lázaro. Cuando oyó, pues, que estaba enfermo, se quedó dos días más en el lugar donde estaba.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Romanos 4:18-21",
      "Hebreos 6:15",
      "Habacuc 2:3",
      "Isaías 40:31",
      "Lamentaciones 3:25-26",
      "Salmo 130:5-6",
      "Santiago 5:7-8",
      "2 Pedro 3:9",
      "Hebreos 11:13",
    ],
    ideaCentral:
      "El texto conecta el amor de Jesús con su demora mediante un «pues»: porque los amaba, se quedó. La espera (de un cónyuge, un hijo, una sanidad, un pródigo, una puerta) no es una sala de castigo hasta que aprendas la lección; es el intervalo donde la fe se fortalece y donde Dios está obrando algo que todavía no ves.",
    porQueNoConvencional:
      "Solemos predicar las esperas como pruebas que hay que aprobar: Dios retiene hasta que demuestres madurez. Eso convierte la espera en un sistema de mérito y llena al que espera de culpa («¿qué me falta?»). Juan 11 dice que la demora nació del amor y buscaba una gloria mayor. Abraham no se debilitó esperando: «se fortaleció en fe». La espera es formativa, no punitiva.",
    bosquejo: [
      {
        titulo: "La demora que nace del amor",
        referencia: "Juan 11:4-6, 14-15, 40; 2 Pedro 3:9",
        desarrollo:
          "«Amaba Jesús a Marta… se quedó dos días más». La tardanza no fue descuido ni castigo: «para gloria de Dios» y «para que creáis». Dios «no retarda su promesa… sino que es paciente». Cuando Dios espera, no está enojado contigo; está haciendo algo más grande que tu pedido.",
      },
      {
        titulo: "Lo que la espera fortalece",
        referencia: "Romanos 4:18-21; Hebreos 6:15; Santiago 5:7",
        desarrollo:
          "Veinticinco años entre la promesa y el nacimiento de Isaac, y Abraham «se fortaleció en fe, dando gloria a Dios». La fe se entrena en el intervalo, no en la respuesta. «Habiendo esperado con paciencia, alcanzó la promesa»: el labrador espera la lluvia sin dudar de que llegará.",
      },
      {
        titulo: "Cómo se espera bajo la gracia",
        referencia: "Isaías 40:31; Lamentaciones 3:25-26; Salmo 130:5-6",
        desarrollo:
          "«Esperar» en Isaías es un verbo de tensión, como una cuerda trenzada: expectante y activo, no resignado. «Bueno es esperar en silencio». «Mi alma espera a Jehová más que los centinelas a la mañana»: el que espera bajo la gracia espera a una Persona más que a un resultado, y no fabrica Ismaeles mientras tanto.",
      },
    ],
    aplicacion: [
      "Reescribe la pregunta de tu espera: de «¿qué me falta aprender para que Dios me lo dé?» a «¿qué está haciendo Dios en mí y a mi alrededor mientras espero?».",
      "Haz algo fiel con el tiempo intermedio: sirve, estudia, construye, ama. Abraham siguió caminando veinticinco años; la espera activa es la que fortalece.",
      "Cuando la tentación de fabricar la respuesta llegue (el Ismael de tu espera), habla con alguien antes de actuar. Las decisiones tomadas por cansancio de esperar suelen tener sombras largas.",
    ],
    cuidadoPastoral:
      "Algunas esperas terminan de manera distinta a la deseada: Hebreos 11:13 habla de los que «murieron sin haber recibido lo prometido, sino mirándolo de lejos». La promesa última es Cristo mismo, y el fruto de la espera es una intimidad que ninguna respuesta podría dar. No prometas a nadie lo que Dios no prometió; promete lo que sí: su presencia en la espera y su fidelidad al final.",
    ilustracion:
      "Marta le reprochó a Jesús: «si hubieses estado aquí, mi hermano no habría muerto». Tenía razón, y Jesús no se defendió. Lo que Marta pedía era una sanidad; lo que Jesús traía era una resurrección. A veces la demora es la distancia entre lo que pedimos y lo que Dios planea dar.",
  },
  {
    id: "librados-del-temor-de-la-muerte",
    numero: 39,
    serie: 4,
    titulo: "Librados del temor de la muerte",
    subtitulo: "Morir bajo la gracia",
    etiquetas: ["Muerte", "Libertad", "Esperanza"],
    necesidades: ["miedo", "sufrimiento"],
    textoBase: {
      referencia: "Hebreos 2:14-15",
      texto:
        "Así que, por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo, para destruir por medio de la muerte al que tenía el imperio de la muerte, esto es, al diablo, y librar a todos los que por el temor de la muerte estaban durante toda la vida sujetos a servidumbre.",
      version: "RVR1960",
    },
    textosApoyo: [
      "1 Corintios 15:54-58",
      "Filipenses 1:21-23",
      "2 Corintios 5:1-8",
      "Salmo 90:12",
      "Eclesiastés 7:2",
      "Salmo 23:4",
      "2 Timoteo 4:6-8",
      "Apocalipsis 14:13",
    ],
    ideaCentral:
      "El temor a la muerte esclaviza «durante toda la vida», y se disfraza de consumo, control, negación y ansiedad. Cristo murió para romper esa esclavitud. El aguijón de la muerte es el pecado y el poder del pecado es la ley, así que la gracia, que quita ambos, desarma a la muerte por dentro. El cristiano puede hablar de morir como Pablo: como partida y ganancia.",
    porQueNoConvencional:
      "La iglesia antigua tenía un «arte de morir bien»; la iglesia moderna evita el tema tanto como el mundo. Casi nunca se predica sobre cómo prepararse para morir, y el resultado son creyentes con la misma esclavitud silenciosa que todos. Hebreos pone la liberación del miedo a la muerte en el centro del propósito de la encarnación: Jesús se hizo carne para eso.",
    bosquejo: [
      {
        titulo: "La esclavitud que no se nombra",
        referencia: "Hebreos 2:15; Eclesiastés 7:2; Salmo 90:12",
        desarrollo:
          "«Durante toda la vida sujetos a servidumbre». El miedo a la muerte gobierna vidas enteras sin ser nombrado: acumulación, control, evasión, pánico ante cada síntoma. «Mejor es ir a la casa del luto»: el sabio mira de frente lo que el esclavo evita.",
      },
      {
        titulo: "El aguijón que fue extraído",
        referencia: "1 Corintios 15:54-57; Hebreos 2:14",
        desarrollo:
          "«El aguijón de la muerte es el pecado, y el poder del pecado, la ley». La muerte da miedo porque detrás de ella está el juicio. Cristo quitó el pecado y nos sacó de debajo de la ley; la muerte quedó sin veneno. «¿Dónde está, oh muerte, tu aguijón?» es una burla que solo la gracia puede permitirse.",
      },
      {
        titulo: "Morir como ganancia",
        referencia: "Filipenses 1:21-23; 2 Corintios 5:1-8; 2 Timoteo 4:6-8",
        desarrollo:
          "«El morir es ganancia», «partir y estar con Cristo, muchísimo mejor», «ausentes del cuerpo, presentes al Señor», «el tiempo de mi partida está cercano». Pablo habla de su muerte con la serenidad de quien conoce el destino. Una vida ligera y una muerte preparada son frutos del nuevo pacto.",
      },
    ],
    aplicacion: [
      "Cuenta tus días (Salmo 90:12): escribe qué querrías que fuera verdad de tu vida al final, y ordena esta semana según eso.",
      "Habla de tu muerte con tu familia: qué crees, qué esperas, qué quieres que se lea y se cante. Quitar el tabú es quitar poder a la servidumbre.",
      "Visita a alguien que está muriendo. La casa del luto enseña lo que ningún sermón sobre la eternidad puede enseñar, y el moribundo creyente suele ser el mejor predicador de la esperanza.",
    ],
    cuidadoPastoral:
      "La muerte sigue siendo «el postrer enemigo» (1 Corintios 15:26), no una amiga; el duelo es legítimo y Pablo prefería «ser revestido» antes que «desnudado» (2 Corintios 5:4). La esperanza cristiana no es solo «ir al cielo» sino la resurrección del cuerpo. Y a quien teme, no se le regaña: se le acompaña hasta que vea al que ya pasó por ahí.",
    ilustracion:
      "Un padre y su hijo iban en el auto cuando entró una abeja; el niño, alérgico, gritó aterrado. El padre atrapó la abeja en la mano, la soltó, y el niño volvió a gritar hasta que el padre le mostró la palma: «Mira: el aguijón se quedó aquí. Ya no puede hacerte daño». La muerte todavía zumba, pero el aguijón está en la mano de Cristo.",
  },
  {
    id: "enjugara-toda-lagrima",
    numero: 40,
    serie: 4,
    titulo: "Enjugará toda lágrima",
    subtitulo: "El nuevo pacto termina en una boda",
    etiquetas: ["Esperanza", "Nueva creación", "Consumación"],
    necesidades: ["sufrimiento", "miedo"],
    textoBase: {
      referencia: "Apocalipsis 21:3-4",
      texto:
        "Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y él morará con ellos; y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios. Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Levítico 26:11-12",
      "Jeremías 31:33",
      "Ezequiel 37:26-27",
      "Isaías 25:8",
      "Romanos 8:18-25",
      "1 Juan 3:2-3",
      "Apocalipsis 19:7-9; 22:3, 17",
      "1 Corintios 15:58",
    ],
    ideaCentral:
      "La frase «seré su Dios y ellos serán mi pueblo» recorre la Biblia desde Levítico, pasa por la promesa del nuevo pacto en Jeremías y termina en Apocalipsis 21: el destino no es que nosotros escapemos al cielo, sino que Dios se mude con nosotros. Los santos llegan llorando, y Él mismo seca las lágrimas. La última palabra de la Biblia sobre la salvación es «gratuitamente».",
    porQueNoConvencional:
      "Mucha predicación sobre el final habla de escapar de la tierra; el texto habla de la nueva Jerusalén descendiendo y de Dios haciendo su tabernáculo entre los hombres: Emanuel completado. También sorprende que haya lágrimas que enjugar: no se nos pide llegar sin llorar, se nos promete que Él las secará. Y el mismo libro que describe juicios cierra con una invitación gratuita: la gracia llega intacta a la última página.",
    bosquejo: [
      {
        titulo: "La frase que recorre toda la Biblia",
        referencia: "Levítico 26:11-12; Jeremías 31:33; Ezequiel 37:27; Apocalipsis 21:3",
        desarrollo:
          "«Pondré mi morada en medio de vosotros… seré vuestro Dios». El pacto siempre fue sobre presencia, no sobre reglas. Del tabernáculo en el desierto, al templo, a Cristo «que habitó entre nosotros», al Espíritu en la iglesia, y finalmente: «Dios mismo estará con ellos». El pacto termina con Dios mudándose a casa.",
      },
      {
        titulo: "Las lágrimas que Él mismo enjuga",
        referencia: "Apocalipsis 21:4; Isaías 25:8; Romanos 8:18-23",
        desarrollo:
          "Hay lágrimas al llegar; el llanto no descalifica. «Enjugará Dios toda lágrima»: no un ángel, Él. «Gemimos» ahora, pero «no son comparables las aflicciones del tiempo presente con la gloria venidera». La esperanza no niega el dolor de hoy: lo pone en proporción.",
      },
      {
        titulo: "Gratuitamente, hasta la última página",
        referencia: "Apocalipsis 22:3, 17; 1 Juan 3:2-3; 1 Corintios 15:58",
        desarrollo:
          "«No habrá más maldición»; «el que quiera, tome del agua de la vida gratuitamente». La esperanza purifica («todo aquel que tiene esta esperanza en él, se purifica») y pone a trabajar («vuestro trabajo en el Señor no es en vano»). El que sabe cómo termina la historia vive distinto hoy.",
      },
    ],
    aplicacion: [
      "Lee Apocalipsis 21:1-7 en voz alta cada vez que el dolor presente parezca definitivo. La esperanza no es un sentimiento sino una noticia que se repite hasta que se cree.",
      "Practica la desproporción de Romanos 8:18: escribe tu aflicción actual en una columna y, en la otra, lo que Dios ha prometido. Míralas juntas.",
      "Deja que la esperanza te ponga a trabajar: invierte esta semana en algo que dure (una persona, una reconciliación, una obra de justicia). Nada hecho en el Señor se pierde.",
    ],
    cuidadoPastoral:
      "La esperanza cristiana no es escapismo ni excusa para desentenderse del mundo: 1 Corintios 15:58 sigue inmediatamente al capítulo de la resurrección y manda a trabajar «abundando siempre». Y las «primeras cosas» que pasan incluyen el dolor real de personas reales: hablar del final sin sentarse en el presente de los que sufren es usar el cielo como anestesia. Primero se llora con ellos; después se les muestra quién secará las lágrimas.",
    ilustracion:
      "La Biblia comienza con una boda en un jardín y termina con una boda en una ciudad. Entre ambas hay un divorcio, un exilio, una cruz y una tumba vacía. Y la última invitación del libro no dice «merécelo» sino «el que quiera, tome gratuitamente». La gracia abre la historia y la gracia la cierra.",
  },

  /* ───────────── TEMAS AÑADIDOS PARA LA SELECCIÓN DEL PREDICADOR ───────────── */

  {
    id: "la-persona-de-fe-sabe-cambiar-de-plan",
    numero: 41,
    serie: 2,
    titulo: "La persona de fe también sabe cambiar de plan",
    subtitulo: "Puertas cerradas, planes en lápiz y el «sí» que no cambia",
    etiquetas: ["Planes", "Dirección", "Humildad"],
    necesidades: ["ansiedad", "legalismo"],
    textoBase: {
      referencia: "Santiago 4:13-15",
      texto:
        "¡Vamos ahora! los que decís: Hoy y mañana iremos a tal ciudad, y estaremos allá un año, y traficaremos, y ganaremos; cuando no sabéis lo que será mañana. Porque ¿qué es vuestra vida? Ciertamente es neblina que se aparece por un poco de tiempo, y luego se desvanece. En lugar de lo cual deberíais decir: Si el Señor quiere, viviremos y haremos esto o aquello.",
      version: "RVR1960",
    },
    textosApoyo: [
      "Hechos 16:6-10",
      "Santiago 4:16; 4:6",
      "Proverbios 16:9; 19:21; 27:1",
      "2 Corintios 1:15-20, 23",
      "Romanos 1:13; 15:32",
      "Hechos 18:21",
      "Génesis 50:20",
    ],
    ideaCentral:
      "Cambiar de plan no es falta de fe; a veces es la prueba de que la fe está puesta en Dios y no en el plan. Santiago no condena planear sino planear sin Dios, y Hechos 16 muestra al mejor misionero de la historia recibiendo dos «no» del Espíritu antes de un «sí» que cambió un continente. La persona de fe escribe sus planes en lápiz porque la promesa de Dios está escrita en tinta.",
    porQueNoConvencional:
      "En muchas iglesias se predica una fe que «declara» y «no se mueve», donde revisar el rumbo suena a derrota y una puerta cerrada se interpreta como ataque o falta de fe. Pero Pablo cambió de plan varias veces (Asia, Bitinia, Corinto, Roma) y lo defendió con toda tranquilidad cuando lo acusaron de ser voluble: su seguridad no estaba en su agenda sino en el «sí» de Dios en Cristo. La rigidez que llamamos fe es a menudo la «jactancia» que Santiago llama mala.",
    bosquejo: [
      {
        titulo: "Planear es bueno; presumir es arrogancia",
        referencia: "Santiago 4:13-16; Proverbios 27:1",
        desarrollo:
          "El comerciante de Santiago tiene ciudad, calendario, negocio y ganancia calculados. Santiago no le reprocha la planificación sino la omisión: planea como si fuera dueño del mañana. «Si el Señor quiere» no es una fórmula supersticiosa sino una postura del corazón: soy niebla, Él es eterno; propongo, Él dispone. La misma carta dice que Dios «da gracia a los humildes» (4:6): el que planea con la mano abierta recibe más gracia que el que planea con el puño cerrado.",
      },
      {
        titulo: "Cuando el Espíritu cierra la puerta",
        referencia: "Hechos 16:6-10; Proverbios 16:9",
        desarrollo:
          "El plan de Pablo era excelente: predicar en Asia. El Espíritu lo prohibió. Intentó Bitinia: tampoco. Dos puertas cerradas seguidas a un apóstol lleno del Espíritu en plena obediencia. Lo notable es que no se sentó frente a la puerta cerrada a lamentarse: siguió caminando hasta Troas, y allí, no antes, llegó la visión de Macedonia. El «no» de Asia fue el «sí» de Europa: Filipos, Lidia, el carcelero. (Años después Pablo sí predicaría en Asia: Hechos 19. No era un «nunca», era un «todavía no».)",
      },
      {
        titulo: "Cambiar de plan sin perder la paz",
        referencia: "2 Corintios 1:15-20, 23",
        desarrollo:
          "Pablo prometió visitar Corinto dos veces y no fue. Lo acusaron de ligereza, de decir «sí, sí» y «no, no». Su defensa es una joya: cambió el plan por consideración a ellos («solo por consideración a ustedes»), y su fiabilidad no descansa en su agenda sino en Cristo, en quien todas las promesas de Dios son «sí». La gracia permite cambiar de rumbo sin vergüenza ni pánico: mis planes pueden decir «no», pero el «sí» de Dios sobre mi vida no cambia.",
      },
    ],
    aplicacion: [
      "Escribe tus planes de este año y añade al final, con sinceridad y no como fórmula: «si el Señor quiere». Luego pregúntate cuál de ellos te costaría más soltar. Ahí está tu «Asia».",
      "Si estás frente a una puerta cerrada, no acampes delante de ella: sigue caminando fielmente hasta tu Troas. La visión suele llegar en movimiento, no en la queja.",
      "Antes de cambiar un plan, aplica el criterio de Pablo: ¿lo hago por consideración a otros y por obediencia, o por miedo y comodidad? Y cuando alguien más cambie de plan, no lo llames voluble antes de escuchar su razón.",
    ],
    cuidadoPastoral:
      "Este tema no es licencia para la informalidad ni para romper compromisos: el mismo Pablo insiste en que su «sí» era «sí» (1:18) y que la palabra dada importa. Tampoco toda puerta cerrada es Dios; a veces es pereza, miedo o falta de perseverancia, y el discernimiento se hace en comunidad y con la Palabra. Y a quien acaba de ver derrumbarse un plan muy querido, no le predique Proverbios 16:9 como consuelo rápido: primero llore con él; después, cuando pueda oírlo, muéstrele Troas.",
    ilustracion:
      "Cuando uno se pasa la salida en la autopista, el GPS no grita ni pone el viaje en pausa por castigo: dice «recalculando» y traza una nueva ruta desde donde estás. Hechos 16 es el «recalculando» de Dios: no anuló el destino, cambió la ruta. La gracia recalcula; la ley solo anota la salida que perdiste.",
  },
  {
    id: "leer-la-biblia-no-es-consultar-un-horoscopo",
    numero: 42,
    serie: 2,
    titulo: "Leer la Biblia no es consultar un horóscopo",
    subtitulo: "De la «palabra del día» a la Palabra que transforma",
    etiquetas: ["Lectura bíblica", "Devocional", "Discernimiento"],
    necesidades: ["oracion", "ansiedad"],
    textoBase: {
      referencia: "Lucas 24:27; 2 Timoteo 3:16-17",
      texto:
        "Y comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían. [...] Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.",
      version: "RVR1960",
    },
    textosApoyo: [
      "2 Timoteo 3:14-15",
      "Lucas 24:32, 44-45",
      "Mateo 4:5-7; 22:29",
      "Juan 5:39-40",
      "Salmo 119:105; Salmo 1:2-3",
      "Hechos 17:11; 8:30-31",
      "2 Pedro 1:20-21",
      "Romanos 15:4",
    ],
    ideaCentral:
      "El horóscopo se consulta: es breve, habla de mí, promete adivinar mi día y no exige nada. La Biblia se habita: es una historia larga que habla de Cristo, no predice mi día sino que forma mi vida, y pide continuidad («desde tu niñez»). Abrirla al azar buscando una señal es tratar a la Palabra viva como a un oráculo mudo. Leerla desde Cristo y con constancia es dejar que ella nos lea a nosotros.",
    porQueNoConvencional:
      "Muchos creyentes sinceros practican una «ruleta bíblica» piadosa: abren en cualquier página, señalan un versículo y lo toman como mensaje personal para el día, igual que otros leen su signo. Casi nadie predica contra eso porque parece devoción. Pero el diablo usó exactamente ese método en el desierto, un salmo aislado de su historia, y Jesús le respondió con «también está escrito»: la Escritura se interpreta con la Escritura. Este tema no quita la expectativa de oír a Dios; le devuelve el método que Él mismo usó en Emaús.",
    bosquejo: [
      {
        titulo: "El diablo también cita versículos",
        referencia: "Mateo 4:5-7; Juan 5:39-40",
        desarrollo:
          "En la segunda tentación Satanás cita el Salmo 91 con precisión, pero arrancado de su contexto y puesto al servicio de un capricho: «tírate». Jesús no discute el versículo; lo devuelve a la historia completa: «también está escrito». Un versículo aislado puede decir cualquier cosa; por eso el horóscopo bíblico es tan peligroso: confirma lo que ya queríamos hacer. Y Juan 5 añade el segundo error: se puede estudiar la Biblia con diligencia y nunca llegar a Cristo. Los fariseos la usaban como fuente de vida en sí misma; ella solo señala al que da vida.",
      },
      {
        titulo: "La Biblia es una historia, no un oráculo",
        referencia: "Lucas 24:27, 32, 44-45",
        desarrollo:
          "Camino a Emaús, Jesús no dio a los discípulos un versículo para ese día: les recorrió «todas las Escrituras», desde Moisés, mostrando que todas hablaban de Él. El corazón les ardió cuando entendieron la historia entera, no cuando recibieron una frase. La Biblia tiene un centro (Cristo) y una trama (creación, caída, promesa, cruz, resurrección, nueva creación). Leerla en fragmentos sin trama es como leer la última línea de una carta de amor y creer que ya se conoce al remitente.",
      },
      {
        titulo: "La Palabra forma; no adivina",
        referencia: "2 Timoteo 3:14-17; Salmo 119:105; Hechos 17:11",
        desarrollo:
          "Pablo le recuerda a Timoteo que conoce las Escrituras «desde la niñez» y le pide «permanecer»: la Palabra actúa por acumulación y continuidad, no por golpes de suerte. Su utilidad no es predictiva sino formativa: enseñar, reprender, corregir, instruir, para que el siervo de Dios esté «enteramente capacitado». El Salmo 119 no promete un mapa del futuro sino una lámpara a los pies: luz para el paso siguiente. Y los de Berea examinaban las Escrituras «todos los días»: la constancia es la diferencia entre consultar un signo y caminar con una Persona.",
      },
    ],
    aplicacion: [
      "Cambia el «versículo al azar» por un libro completo: lee un evangelio de principio a fin en las próximas cuatro semanas, un capítulo al día, y anota qué te muestra de Cristo, no solo qué te dice de tu día.",
      "Cuando un versículo te impacte, hazle tres preguntas antes de aplicártelo: ¿a quién se lo dijo Dios?, ¿qué dice el párrafo completo?, ¿cómo se cumple en Cristo? Así se lee «también está escrito».",
      "Lee acompañado: como el etíope necesitó a Felipe (Hechos 8:30-31), únete a un grupo de estudio o busca a alguien que lleve más años caminando en la Palabra. La lectura solitaria y fragmentaria es el terreno favorito del horóscopo espiritual.",
    ],
    cuidadoPastoral:
      "Dios sí habla por medio de versículos concretos en momentos concretos: el Espíritu aplica la Palabra al corazón, y muchos hemos recibido consuelo exacto en un texto «casual». No se trata de burlarse de esas experiencias ni de convertir la lectura en un ejercicio académico frío que nunca espera oír a Dios (Mateo 22:29 reprende por igual ignorar las Escrituras y el poder de Dios). Se trata de corregir un método usado como hábito: buscar señales en lugar de buscar a Cristo, y usar versículos para justificar decisiones ya tomadas. La meta es más expectativa de oír a Dios, no menos, pero en el cauce que Él mismo trazó.",
    ilustracion:
      "Se cuenta de un hombre que buscaba dirección abriendo la Biblia al azar. La primera vez cayó en «Judas fue y se ahorcó». Inquieto, probó de nuevo: «Ve y haz tú lo mismo». Desesperado, lo intentó una tercera vez: «Lo que vas a hacer, hazlo pronto». La anécdota hace reír, pero describe con exactitud lo que ocurre cuando tratamos a la Palabra como un oráculo: obtenemos frases sin historia, y las frases sin historia pueden mandarnos a cualquier parte.",
  },
];

/**
 * Temas con el texto completo de los versículos (NVI) incorporado a cada punto del bosquejo.
 */
export const TEMAS: Tema[] = TEMAS_BASE.map((t) => {
  const porPunto = VERSICULOS_NVI[t.id];
  const textoBaseNVI = TEXTO_BASE_NVI[t.id] ?? t.textoBaseNVI;
  return {
    ...t,
    textoBaseNVI,
    bosquejo: t.bosquejo.map((p, i) => ({
      ...p,
      versiculos: porPunto?.[i]?.length ? porPunto[i] : p.versiculos,
    })),
  };
});

export const CRITERIOS = [
  {
    titulo: "Bíblico antes que ingenioso",
    texto: "Cada tema nace de un texto, no de una ocurrencia. El título llama la atención; el pasaje sostiene el peso.",
  },
  {
    titulo: "Práctico para el lunes",
    texto: "Si la gente no sabe qué hacer distinto el lunes por la mañana, todavía no terminamos de preparar el mensaje.",
  },
  {
    titulo: "Poco convencional",
    texto: "Cada tema aborda un ángulo poco predicado o corrige una lectura común que ha puesto ley donde el texto pone gracia.",
  },
  {
    titulo: "Con cuidado pastoral",
    texto: "La gracia mal presentada se convierte en licencia; la ley mal presentada, en condenación. Cada tema incluye su contrapeso.",
  },
];

export function temaComoTexto(t: Tema): string {
  const lineas: string[] = [];
  const serie = SERIES.find((s) => s.id === t.serie);
  lineas.push(`TEMA ${t.numero}: ${t.titulo.toUpperCase()}`);
  lineas.push(t.subtitulo);
  if (serie) lineas.push(`${serie.nombre} · ${serie.titulo}`);
  lineas.push("");
  lineas.push(`TEXTO BASE — ${t.textoBase.referencia}${t.textoBase.version ? ` (${t.textoBase.version})` : ""}`);
  lineas.push(`"${t.textoBase.texto}"`);
  if (t.textoBaseNVI) {
    lineas.push(`NVI: "${t.textoBaseNVI}"`);
  }
  lineas.push("");
  lineas.push(`TEXTOS DE APOYO: ${t.textosApoyo.join(" · ")}`);
  lineas.push("");
  lineas.push("IDEA CENTRAL");
  lineas.push(t.ideaCentral);
  lineas.push("");
  lineas.push("POR QUÉ ES POCO CONVENCIONAL");
  lineas.push(t.porQueNoConvencional);
  lineas.push("");
  lineas.push("BOSQUEJO");
  t.bosquejo.forEach((p, i) => {
    lineas.push(`${i + 1}. ${p.titulo} (${p.referencia})`);
    lineas.push(`   ${p.desarrollo}`);
    p.versiculos?.forEach((v) => {
      lineas.push(`   ${v.referencia} (NVI): "${v.texto}"`);
      if (v.nota) lineas.push(`   Nota: ${v.nota}`);
    });
    lineas.push("");
  });
  lineas.push("");
  lineas.push("APLICACIÓN PRÁCTICA");
  t.aplicacion.forEach((a) => lineas.push(`• ${a}`));
  lineas.push("");
  lineas.push("CUIDADO PASTORAL");
  lineas.push(t.cuidadoPastoral);
  lineas.push("");
  lineas.push("ILUSTRACIÓN SUGERIDA");
  lineas.push(t.ilustracion);
  return lineas.join("\n");
}
