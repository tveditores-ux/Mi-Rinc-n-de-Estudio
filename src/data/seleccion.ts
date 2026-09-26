/**
 * Selección personal del predicador para la serie «Descansar en la gracia…».
 * Cada entrada apunta a un tema del catálogo, pero conserva el título y las
 * referencias que el predicador escogió para su propio orden de mensajes.
 */
export interface ItemSeleccion {
  orden: number;
  temaId: string;
  titulo: string;
  referencias: string[];
}

export interface Seleccion {
  id: string;
  nombre: string;
  descripcion: string;
  items: ItemSeleccion[];
}

export const SELECCION: Seleccion = {
  id: "descansar-en-la-gracia",
  nombre: "Descansar en la gracia…",
  descripcion: "Nueve mensajes escogidos por el predicador, en el orden en que se van a predicar.",
  items: [
    {
      orden: 1,
      temaId: "el-espiritu-no-te-acusa",
      titulo: "El Espíritu no te acusa",
      referencias: ["Romanos 8:16"],
    },
    {
      orden: 2,
      temaId: "la-persona-de-fe-sabe-cambiar-de-plan",
      titulo: "La persona de fe también sabe cambiar de plan",
      referencias: ["Santiago 4:13-15", "Hechos 16:6-10"],
    },
    {
      orden: 3,
      temaId: "dar-sin-miedo",
      titulo: "Dar sin miedo es un acto de fe",
      referencias: ["2 Corintios 9:7"],
    },
    {
      orden: 4,
      temaId: "correr-a-la-ciudad-de-refugio",
      titulo: "La ciudad de refugio",
      referencias: ["Números 35:6", "Hebreos 6:18"],
    },
    {
      orden: 5,
      temaId: "descansar-es-obedecer",
      titulo: "Descansar es obedecer",
      referencias: ["Hebreos 4:9-10"],
    },
    {
      orden: 6,
      temaId: "la-gracia-que-ensena-a-decir-no",
      titulo: "La gracia enseña a decir «no»",
      referencias: ["Tito 2:11-12"],
    },
    {
      orden: 7,
      temaId: "leer-la-biblia-no-es-consultar-un-horoscopo",
      titulo: "Leer la Biblia no es consultar un horóscopo",
      referencias: ["Lucas 24:27", "2 Timoteo 3:14-17"],
    },
    {
      orden: 8,
      temaId: "la-espera-no-es-castigo",
      titulo: "La espera no es castigo",
      referencias: ["Juan 11:5-6"],
    },
    {
      orden: 9,
      temaId: "aun-en-la-vejez-fructificaran",
      titulo: "Envejecer desde la gracia",
      referencias: ["2 Corintios 4:16", "Tito 2:2-5"],
    },
  ],
};

/** Texto NVI de las referencias escogidas por el predicador para encabezar cada mensaje. */
export const REFERENCIAS_NVI: Record<string, string> = {
  "Romanos 8:16": "El Espíritu mismo asegura a nuestro espíritu que somos hijos de Dios.",
  "Santiago 4:13-15":
    "Ahora escuchen esto, ustedes que dicen: «Hoy o mañana iremos a tal o cual ciudad, pasaremos allí un año, haremos negocios y ganaremos dinero». ¡Y eso que ni siquiera saben qué sucederá mañana! ¿Qué es su vida? Ustedes son como la niebla que aparece por un momento y luego se desvanece. Más bien, debieran decir: «Si el Señor quiere, viviremos y haremos esto o aquello».",
  "Hechos 16:6-10":
    "Atravesaron la región de Frigia y Galacia, ya que el Espíritu Santo había impedido que predicaran la palabra en la provincia de Asia. Cuando llegaron cerca de Misia, intentaron pasar a Bitinia, pero el Espíritu de Jesús no se lo permitió. Entonces, pasando de largo por Misia, bajaron a Troas. Durante la noche Pablo tuvo una visión en la que un hombre de Macedonia, puesto de pie, rogaba: «Pasa a Macedonia y ayúdanos». Después de que Pablo tuvo la visión, enseguida nos preparamos para partir hacia Macedonia, convencidos de que Dios nos había llamado a anunciar las buenas noticias a los macedonios.",
  "2 Corintios 9:7":
    "Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría.",
  "Números 35:6":
    "De las ciudades que recibirán los levitas, seis serán ciudades de refugio. A ellas podrá huir cualquiera que haya matado a alguien. Además de estas seis ciudades, les entregarán otras cuarenta y dos.",
  "Hebreos 6:18":
    "Lo hizo así para que, mediante la promesa y el juramento, que son dos realidades que nunca cambian y en las cuales es imposible que Dios mienta, tengamos un estímulo poderoso los que, buscando refugio, nos aferramos a la esperanza que está delante de nosotros.",
  "Hebreos 4:9-10":
    "Por consiguiente, queda todavía un reposo especial para el pueblo de Dios; porque el que entra en el reposo de Dios descansa también de sus obras, así como Dios descansó de las suyas.",
  "Tito 2:11-12":
    "En verdad, Dios ha manifestado a toda la humanidad su gracia, la cual trae salvación y nos enseña a rechazar la impiedad y las pasiones mundanas. Así podremos vivir en este mundo con dominio propio, justicia y devoción…",
  "Lucas 24:27":
    "Entonces, comenzando por Moisés y por todos los Profetas, les explicó lo que se refería a él en todas las Escrituras.",
  "2 Timoteo 3:14-17":
    "Pero tú permanece firme en lo que has aprendido y de lo cual estás convencido, pues sabes de quiénes lo aprendiste. Desde tu niñez conoces las Sagradas Escrituras, que pueden darte la sabiduría necesaria para la salvación mediante la fe en Cristo Jesús. Toda la Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir y para instruir en la justicia, a fin de que el siervo de Dios esté enteramente capacitado para toda buena obra.",
  "Juan 11:5-6":
    "Jesús amaba a Marta, a su hermana y a Lázaro. A pesar de eso, cuando oyó que Lázaro estaba enfermo, se quedó dos días más donde se encontraba.",
  "2 Corintios 4:16":
    "Por tanto, no nos desanimamos. Al contrario, aunque por fuera nos vamos desgastando, por dentro nos vamos renovando día tras día.",
  "Tito 2:2-5":
    "A los líderes de la iglesia, enséñales que sean moderados, respetables, sensatos, e íntegros en la fe, en el amor y en la constancia. A las ancianas, enséñales que sean reverentes en su conducta, y no calumniadoras ni adictas al mucho vino. Deben enseñar lo bueno y aconsejar a las jóvenes a amar a sus esposos y a sus hijos, a ser sensatas y puras, cuidadosas del hogar, bondadosas y sumisas a sus esposos, para que no se hable mal de la palabra de Dios.",
};
