import type { Tema } from "./temas";

/**
 * Serie «Las parábolas de Jesús». Bosquejo del predicador sobre las diez vírgenes, tal como lo redactó.
 * Texto bíblico en NVI, como lo pegó.
 *
 * Santa Biblia, NUEVA VERSIÓN INTERNACIONAL® NVI® © 1999, 2015, 2022 por Biblica, Inc.®
 */
export const TEMAS_PARABOLAS_JESUS: Tema[] = [
  {
    id: "las-diez-virgenes",
    numero: 48,
    serie: 1,
    titulo: "Las diez vírgenes",
    subtitulo: "",
    etiquetas: ["Diez vírgenes", "Mateo 25", "Parábolas de Jesús", "Seguridad"],
    necesidades: ["miedo", "legalismo", "culpa"],
    textoBase: {
      referencia: "Mateo 25:1-13",
      texto:
        "El reino de los cielos será entonces como diez jóvenes solteras que tomaron sus lámparas y salieron a recibir al novio. 2 Cinco de ellas eran insensatas y cinco, prudentes. 3 Las insensatas llevaron sus lámparas, pero no se abastecieron de aceite. 4 En cambio, las prudentes llevaron vasijas de aceite junto con sus lámparas. 5 Y como el novio tardaba en llegar, a todas les dio sueño y se durmieron. 6 A medianoche se oyó un grito: “¡Ahí viene el novio! ¡Salgan a recibirlo!”. 7 Entonces todas las jóvenes se despertaron y se pusieron a preparar sus lámparas. 8 Las insensatas dijeron a las prudentes: “Dennos un poco de su aceite porque nuestras lámparas se están apagando”. 9 “No —respondieron estas—, porque así no va a alcanzar ni para nosotras ni para ustedes. Es mejor que vayan a los que venden aceite y compren para ustedes mismas”. 10 Mientras iban a comprar el aceite, llegó el novio. Las jóvenes que estaban preparadas entraron con él al banquete de bodas. Y se cerró la puerta. 11 Después llegaron también las otras. “¡Señor, Señor —decían—, ábrenos!”. 12 “¡Les aseguro que no las conozco!”, respondió él. 13 »Por tanto —agregó Jesús—, manténganse despiertos porque no saben ni el día ni la hora.",
      version: "NVI",
    },
    textosApoyo: [
      "Mateo 25:1-13",
      "Isaías 54:5",
      "Oseas 2:19",
      "Mateo 9:15",
      "Juan 10:28",
      "Romanos 8:38-39",
      "Hebreos 10:14",
      "Romanos 11:29",
      "1 Juan 2:19",
      "Juan 3:16",
      "Romanos 10:9",
      "Romanos 8:16",
      "Efesios 1:13",
      "2 Corintios 13:5",
      "Juan 17:3",
      "1 Tesalonicenses 5:9-10",
    ],
    ideaCentral: "",
    porQueNoConvencional: "",
    titulos: { conclusion: "Conclusión" },
    buenaNoticia: [
      "1 Tesalonicenses 5:9-10 (NVI)",
      "9 pues Dios no nos destinó a sufrir el castigo, sino a recibir la salvación por medio de nuestro Señor Jesucristo. 10 Él murió por nosotros para que, en la vida o en la muerte, vivamos junto con él.",
    ],
    introduccion: [
      "La parábola de las diez vírgenes es una de las más conocidas y, al mismo tiempo, una de las más malinterpretadas.",
      "Propósito bajo el Nuevo Pacto: Muchos la han usado para infundir miedo y legalismo; sin embargo, a la luz del Nuevo Pacto descubrimos que no es una amenaza para el creyente verdadero, sino una invitación a vivir con plena seguridad en Cristo, diferenciando la mera apariencia religiosa de la realidad viva del Espíritu.",
    ],
    bosquejo: [
      /* ───────────── II. CONTEXTO HISTÓRICO Y CULTURAL ───────────── */
      {
        titulo: "CONTEXTO HISTÓRICO Y CULTURAL",
        referencia: "Isaías 54:5; Oseas 2:19; Mateo 9:15",
        desarrollo: "",
        bloques: [
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "Trasfondo político: Israel vivía bajo la opresión romana, alimentando la expectativa popular de un Mesías meramente político y militar.",
              },
              {
                texto:
                  "Costumbres nupciales judías: El matrimonio constaba del compromiso legal (desposar), seguido tiempo después por la procesión nocturna del novio hacia el banquete de bodas. Las vírgenes (damas del cortejo) debían llevar su propia lámpara encendida y provisión de aceite.",
              },
              { texto: "Simbolismo bíblico:" },
            ],
          },
          { tipo: "texto", texto: "Dios como esposo de Israel:" },
          {
            tipo: "versiculo",
            referencia: "Isaías 54:5",
            version: "NVI",
            texto:
              "Tu esposo es tu Creador; su nombre es el Señor Todopoderoso. Tu Redentor es el Santo de Israel; él es el Dios de toda la tierra.",
          },
          {
            tipo: "versiculo",
            referencia: "Oseas 2:19",
            version: "NVI",
            texto: "Y te haré mi esposa para siempre; te haré mi esposa en justicia y derecho, en amor y compasión.",
          },
          { tipo: "texto", texto: "Jesús como el novio:" },
          {
            tipo: "versiculo",
            referencia: "Mateo 9:15",
            version: "NVI",
            texto:
              "Jesús les contestó: ¿Acaso pueden estar de luto los invitados del novio mientras él está con ellos? Llegará el día en que se les quitará el novio; entonces sí ayunarán.",
          },
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "La sorpresa narrativa: El novio tarda más de lo esperado, y esa demora pone al descubierto quién está verdaderamente preparado y quién solo aparenta estarlo.",
              },
            ],
          },
        ],
      },

      /* ───────────── III. EXÉGESIS Y MENSAJE CENTRAL ───────────── */
      {
        titulo: "EXÉGESIS Y MENSAJE CENTRAL (Mateo 25:1-13)",
        referencia: "Mateo 25:1-13",
        desarrollo: "",
        bloques: [
          { tipo: "texto", texto: "Todas las vírgenes tenían lámparas: apariencia externa de fe." },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:1",
            version: "NVI",
            texto:
              "El reino de los cielos será entonces semejante a diez jóvenes solteras que tomaron sus lámparas y salieron a recibir al novio.",
          },
          {
            tipo: "texto",
            texto: "Prudentes vs. insensatas: diferencia en la provisión interna, no solo en la intención inicial.",
          },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:2-4",
            version: "NVI",
            texto:
              "2 Cinco de ellas eran insensatas y cinco prudentes. 3 Las insensatas llevaron sus lámparas, pero no se abastecieron de aceite. 4 En cambio, las prudentes llevaron vasijas de aceite junto con sus lámparas.",
          },
          { tipo: "texto", texto: "La tardanza del esposo: prueba del tiempo, fidelidad y perseverancia." },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:5",
            version: "NVI",
            texto: "Y como el novio tardaba en llegar, a todas les dio sueño y se durmieron.",
          },
          {
            tipo: "texto",
            texto: "El anuncio de medianoche: venida pública, decisiva e inesperada del Mesías.",
          },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:6-7",
            version: "NVI",
            texto:
              "6 A medianoche se oyó un grito: “¡Ahí viene el novio! ¡Salgan a recibirlo!” 7 Entonces todas las jóvenes se despertaron y se pusieron a preparar sus lámparas.",
          },
          {
            tipo: "texto",
            texto: "El aceite: realidad espiritual regeneradora que no se puede prestar ni delegar.",
          },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:8-9",
            version: "NVI",
            texto:
              "8 Las insensatas dijeron a las prudentes: “Dennos un poco de su aceite, porque nuestras lámparas se están apagando.” 9 “No”, respondieron estas, “porque así no va a alcanzar ni para nosotras ni para ustedes. Es mejor que vayan a los que venden aceite, y compren para ustedes mismas.”",
          },
          { tipo: "texto", texto: "La puerta cerrada: la oportunidad de gracia tiene un límite final." },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:10",
            version: "NVI",
            texto:
              "Pero mientras ellas iban a comprar el aceite, llegó el novio. Las que estaban preparadas entraron con él al banquete de bodas. Y se cerró la puerta.",
          },
          {
            tipo: "texto",
            texto: "«No las conozco»: evidencia de que jamás existió una relación redentora verdadera.",
          },
          {
            tipo: "versiculo",
            referencia: "Mateo 25:11-13",
            version: "NVI",
            texto:
              "11 Después llegaron también las otras. “¡Señor! ¡Señor!”, suplicaban. “¡Ábrenos la puerta!” 12 “No, no las conozco”, respondió él. 13 Por tanto, manténganse despiertos, porque no saben ni el día ni la hora.",
          },
        ],
      },

      /* ───────────── IV. INTERPRETACIONES TEOLÓGICAS PRINCIPALES ───────────── */
      {
        titulo: "INTERPRETACIONES TEOLÓGICAS PRINCIPALES",
        referencia: "Mateo 25:1-13",
        desarrollo: "",
        bloques: [
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "Preterista: Cumplida en el año 70 d.C., como advertencia del juicio inminente sobre Jerusalén.",
              },
              {
                texto:
                  "Alegórica: Cada detalle funciona como un símbolo espiritual (novio = Cristo; aceite = Espíritu Santo / amor / gracia, etc.).",
              },
              {
                texto:
                  "Idealista: Enseña un principio espiritual atemporal de vigilancia y autenticidad para toda generación de creyentes.",
              },
              {
                texto:
                  "Futurista: Apunta escatológicamente a la Segunda Venida de Cristo y al banquete final de las bodas del Cordero.",
              },
            ],
          },
        ],
      },

      /* ───────────── V. IMPLICACIONES DEL NUEVO PACTO ───────────── */
      {
        titulo: "IMPLICACIONES DEL NUEVO PACTO",
        referencia: "Juan 10:28; Romanos 8:38-39; Hebreos 10:14; Romanos 11:29; 1 Juan 2:19",
        desarrollo: "",
        bloques: [
          {
            tipo: "texto",
            texto: "La salvación no se pierde; es la obra consumada y eterna de Cristo:",
          },
          {
            tipo: "versiculo",
            referencia: "Juan 10:28",
            version: "NVI",
            texto: "Yo les doy vida eterna, y nunca perecerán ni nadie las arrebatará de mi mano.",
          },
          {
            tipo: "versiculo",
            referencia: "Romanos 8:38-39",
            version: "NVI",
            texto:
              "38 Estoy convencido de que ni la muerte ni la vida, ni los ángeles ni los demonios, ni lo presente ni lo por venir, ni los poderes, 39 ni lo alto ni lo profundo, ni cosa alguna en toda la creación será capaz de separarnos del amor que Dios nos ha manifestado en Cristo Jesús nuestro Señor.",
          },
          {
            tipo: "versiculo",
            referencia: "Hebreos 10:14",
            version: "NVI",
            texto: "Pues con un solo sacrificio ha hecho perfectos para siempre a los que está santificando.",
          },
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "La preparación no causa la salvación: la evidencia. El aceite no se gana por obras; manifiesta la obra de Dios ya efectuada en el creyente.",
              },
              {
                texto:
                  "Alcance integral de la salvación: Somos rescatados del presente siglo malo, de la ira venidera, y del poder y la presencia del pecado.",
              },
              {
                texto: "La vida eterna es dádiva plena e irrevocable de Dios en comunión con Cristo:",
              },
            ],
          },
          {
            tipo: "versiculo",
            referencia: "Romanos 11:29",
            version: "NVI",
            texto: "porque las dádivas de Dios y su llamado son irrevocables.",
          },
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "Distinción pastoral: El creyente genuino puede descuidarse y perder temporalmente el gozo, la paz o la comunión práctica, pero nunca la vida eterna.",
              },
              {
                texto: "La apostasía o herejía persistente demuestra que nunca hubo nuevo nacimiento:",
              },
            ],
          },
          {
            tipo: "versiculo",
            referencia: "1 Juan 2:19",
            version: "NVI",
            texto:
              "Aunque salieron de entre nosotros, en realidad no eran de los nuestros; pues si lo hubieran sido, se habrían quedado con nosotros. Su salida sirvió para comprobar que ninguno de ellos era de los nuestros.",
          },
        ],
      },

      /* ───────────── VI. ¿CÓMO SÉ QUE SOY SALVO? ───────────── */
      {
        titulo: "¿CÓMO SÉ QUE SOY SALVO?",
        referencia: "Juan 3:16; Romanos 10:9; Romanos 8:16; Efesios 1:13",
        desarrollo: "",
        bloques: [
          {
            tipo: "texto",
            texto: "Seguridad objetiva basada en la obra de Cristo y su promesa, no en mis obras:",
          },
          {
            tipo: "versiculo",
            referencia: "Juan 3:16",
            version: "NVI",
            texto:
              "Porque tanto amó Dios al mundo que dio a su Hijo unigénito, para que todo el que cree en él no se pierda, sino que tenga vida eterna.",
          },
          {
            tipo: "versiculo",
            referencia: "Romanos 10:9",
            version: "NVI",
            texto:
              "Que si confiesas con tu boca que Jesús es el Señor, y crees en tu corazón que Dios lo levantó de entre los muertos, serás salvo.",
          },
          {
            tipo: "texto",
            texto: "Seguridad interna por el testimonio y sello del Espíritu Santo en mí:",
          },
          {
            tipo: "versiculo",
            referencia: "Romanos 8:16",
            version: "NVI",
            texto: "El Espíritu mismo asegura a nuestro espíritu que somos hijos de Dios.",
          },
          {
            tipo: "versiculo",
            referencia: "Efesios 1:13",
            version: "NVI",
            texto:
              "En él también ustedes, luego de haber oído el mensaje de la verdad, el evangelio que les trajo la salvación, y luego de haber creído, fueron marcados con el sello que es el Espíritu Santo prometido.",
          },
          {
            tipo: "lista",
            items: [
              {
                texto:
                  "Evidencias prácticas del nuevo nacimiento: Amor genuino por Cristo y su Palabra, deseo de obedecer, transformación progresiva del carácter, disciplina amorosa del Padre y perseverancia en la fe.",
              },
              {
                texto:
                  "Contraste crucial: Seguridad falsa (confiar en una lámpara de apariencia externa) vs. seguridad verdadera (fruto y morada real del Espíritu).",
              },
            ],
          },
        ],
      },

      /* ───────────── VII. APLICACIÓN PRÁCTICA ───────────── */
      {
        titulo: "APLICACIÓN PRÁCTICA",
        referencia: "2 Corintios 13:5; Juan 17:3",
        desarrollo: "",
        bloques: [
          {
            tipo: "texto",
            texto: "Examínate a la luz del aceite (realidad de Cristo en ti):",
          },
          {
            tipo: "versiculo",
            referencia: "2 Corintios 13:5",
            version: "NVI",
            texto:
              "Examínense para ver si están en la fe; pruébense a sí mismos. ¿No se dan cuenta de que Jesucristo está en ustedes? ¡A menos que fracasen en la prueba!",
          },
          {
            tipo: "lista",
            items: [
              { texto: "Vive confiado, no atemorizado: Descansa en la obra perfecta del Esposo celestial." },
              {
                texto:
                  "Persevera en la gracia: Aunque el Novio parezca tardar, el Espíritu Santo nos sostiene hasta el fin.",
              },
              {
                texto:
                  "Recuerda que la fe es personal, no transferible: Nadie puede creer ni nacer de nuevo en lugar de otro.",
              },
              {
                texto:
                  "Ten un corazón evangelístico: Comparte el Evangelio mientras la puerta de la gracia sigue abierta.",
              },
              { texto: "Disfruta desde ahora la vida eterna (conocer íntimamente a Dios):" },
            ],
          },
          {
            tipo: "versiculo",
            referencia: "Juan 17:3",
            version: "NVI",
            texto:
              "Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien tú has enviado.",
          },
        ],
      },
    ],
    aplicacion: [],
    cuidadoPastoral: "",
    ilustracion: "",
    conclusion: [
      "La parábola de las diez vírgenes no es una amenaza para infundir terror en el creyente genuino, sino una solemne advertencia contra la religiosidad superficial y la apariencia vacía. El Nuevo Pacto nos enseña a velar con gozosa confianza: Cristo mismo nos asegura la entrada a las bodas, y su Espíritu Santo habita en nosotros",
    ],
  },
];
