import type { Cita } from "./temas";

/**
 * Texto completo de los versículos del bosquejo en la Nueva Versión Internacional (NVI).
 * Clave: id del tema. Valor: un arreglo por cada punto del bosquejo (en orden),
 * con las citas que se muestran dentro de ese punto.
 *
 * Santa Biblia, NUEVA VERSIÓN INTERNACIONAL® NVI® © 1999, 2015, 2022 por Biblica, Inc.®
 */

const HEB_4_16: Cita = {
  referencia: "Hebreos 4:16",
  texto:
    "Así que acerquémonos confiadamente al trono de la gracia para recibir la misericordia y encontrar la gracia que nos ayuden oportunamente.",
};

const HEB_10_22: Cita = {
  referencia: "Hebreos 10:22",
  texto:
    "Acerquémonos, pues, a Dios con corazón sincero y con la plena seguridad que da la fe, interiormente purificados de una conciencia culpable y los cuerpos lavados con agua pura.",
};

const ROM_8_15: Cita = {
  referencia: "Romanos 8:15",
  texto:
    "Y ustedes no recibieron un espíritu que de nuevo los esclavice al miedo, sino el Espíritu que los adopta como hijos y les permite clamar: «¡Abba! ¡Padre!».",
};

const JN_8_10_11: Cita = {
  referencia: "Juan 8:10-11",
  texto:
    "Entonces él se incorporó y le preguntó: —Mujer, ¿dónde están? ¿Ya nadie te condena? —Nadie, Señor. Jesús dijo: —Tampoco yo te condeno. Ahora vete, y no vuelvas a pecar.",
};

export const VERSICULOS_NVI: Record<string, Cita[][]> = {
  /* ───────────── SERIE 1 ───────────── */

  "dios-dejo-de-llevar-cuentas": [
    [
      {
        referencia: "Colosenses 2:14",
        texto:
          "…y anular la deuda que teníamos pendiente por los requisitos de la Ley. Él anuló esa deuda que nos era adversa, clavándola en la cruz.",
      },
    ],
    [
      {
        referencia: "Hebreos 8:12",
        texto: "Yo perdonaré sus iniquidades y nunca más me acordaré de sus pecados.",
      },
    ],
    [
      {
        referencia: "2 Corintios 5:19",
        texto:
          "Esto es, que en Cristo, Dios estaba reconciliando al mundo consigo mismo, no tomándole en cuenta sus pecados y encargándonos a nosotros el mensaje de la reconciliación.",
      },
    ],
  ],

  "perdona-porque-fuiste-perdonado": [
    [
      {
        referencia: "Mateo 6:14-15",
        texto:
          "Porque si perdonan a otros sus ofensas, también los perdonará a ustedes su Padre celestial. Pero si no perdonan a otros sus ofensas, tampoco su Padre perdonará a ustedes las suyas.",
      },
    ],
    [
      {
        referencia: "Efesios 4:32",
        texto:
          "Más bien, sean bondadosos y compasivos unos con otros y perdónense mutuamente, así como Dios los perdonó a ustedes en Cristo.",
      },
    ],
    [
      {
        referencia: "Lucas 7:47",
        texto:
          "Por esto te digo: si ella ha amado mucho, es que sus muchos pecados le han sido perdonados. Pero a quien poco se le perdona, poco ama.",
      },
    ],
  ],

  "hijos-no-empleados": [
    [
      {
        referencia: "Lucas 15:29",
        texto:
          "Pero él contestó: “¡Fíjate cuántos años te he servido sin desobedecer jamás tus órdenes y ni un cabrito me has dado para celebrar una fiesta con mis amigos!”",
      },
    ],
    [
      {
        referencia: "Lucas 15:31",
        texto: "Hijo mío —le dijo su padre—, tú siempre estás conmigo y todo lo que tengo es tuyo.",
      },
    ],
    [ROM_8_15],
  ],

  "la-gracia-que-ensena-a-decir-no": [
    [
      {
        referencia: "Romanos 8:3",
        texto:
          "En efecto, la Ley no pudo liberarnos porque la carne anuló su poder; por eso Dios envió a su propio Hijo en una condición semejante a la de los pecadores, para que se ofreciera en sacrificio por el pecado. Así condenó Dios al pecado en la carne…",
      },
    ],
    [
      {
        referencia: "Tito 2:11-12",
        texto:
          "En verdad, Dios ha manifestado a toda la humanidad su gracia, la cual trae salvación y nos enseña a rechazar la impiedad y las pasiones mundanas. Así podremos vivir en este mundo con dominio propio, justicia y devoción…",
      },
    ],
    [JN_8_10_11],
  ],

  "descansar-es-obedecer": [
    [
      {
        referencia: "Hebreos 3:18-19",
        texto:
          "¿Y a quiénes juró Dios que jamás entrarían en su reposo, sino a los que desobedecieron? Como podemos ver, no pudieron entrar por causa de su incredulidad.",
      },
    ],
    [
      {
        referencia: "Mateo 11:28-30",
        texto:
          "Vengan a mí todos ustedes que están cansados y agobiados; yo les daré descanso. Carguen con mi yugo y aprendan de mí, pues yo soy apacible y humilde de corazón, y encontrarán descanso para sus almas. Porque mi yugo es suave y mi carga es liviana.",
      },
    ],
    [
      {
        referencia: "Hebreos 4:9-10",
        texto:
          "Por consiguiente, queda todavía un reposo especial para el pueblo de Dios; porque el que entra en el reposo de Dios descansa también de sus obras, así como Dios descansó de las suyas.",
      },
    ],
  ],

  "el-martes-despues-de-pecar": [
    [
      {
        referencia: "Génesis 3:8-10",
        texto:
          "Cuando el día comenzó a refrescar, el hombre y la mujer oyeron que Dios el Señor andaba recorriendo el jardín; entonces corrieron a esconderse entre los árboles para que Dios no los viera. Pero Dios el Señor llamó al hombre y dijo: —¿Dónde estás? El hombre contestó: —Escuché que andabas por el jardín y tuve miedo porque estoy desnudo. Por eso me escondí.",
      },
    ],
    [
      {
        referencia: "1 Juan 2:1-2",
        texto:
          "Mis queridos hijos, escribo estas cosas para que no pequen. Pero si alguno peca, tenemos ante el Padre a un intercesor, a Jesucristo, el Justo. Él es el sacrificio por el perdón de nuestros pecados y no solo por los nuestros, sino por los de todo el mundo.",
      },
    ],
    [HEB_10_22],
  ],

  "el-espiritu-no-te-acusa": [
    [
      {
        referencia: "2 Corintios 7:10",
        texto:
          "La tristeza que proviene de Dios produce el arrepentimiento que lleva a la salvación, de la cual no hay que arrepentirse, mientras que la tristeza del mundo produce la muerte.",
      },
    ],
    [
      {
        referencia: "Juan 14:26",
        texto:
          "Pero el Consolador, el Espíritu Santo, a quien el Padre enviará en mi nombre, les enseñará todas las cosas y les hará recordar todo lo que he dicho.",
      },
    ],
    [
      {
        referencia: "Apocalipsis 12:10-11",
        texto:
          "Luego oí en el cielo un gran clamor: «Han llegado ya la salvación y el poder y el reino de nuestro Dios; ha llegado ya la autoridad de su Cristo. Porque ha sido expulsado el acusador de nuestros hermanos, el que los acusaba día y noche delante de nuestro Dios. Ellos lo han vencido por medio de la sangre del Cordero y por el mensaje del cual dieron testimonio; no valoraron tanto su vida como para evitar la muerte».",
      },
    ],
  ],

  "dar-sin-miedo": [
    [
      {
        referencia: "2 Corintios 8:9",
        texto:
          "Ya conocen la gracia de nuestro Señor Jesucristo, quien era rico y por causa de ustedes se hizo pobre, para que mediante su pobreza ustedes llegaran a ser ricos.",
      },
    ],
    [
      {
        referencia: "2 Corintios 9:7",
        texto:
          "Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, porque Dios ama al que da con alegría.",
      },
    ],
    [
      {
        referencia: "2 Corintios 9:8",
        texto:
          "Y Dios puede hacer que toda gracia abunde para ustedes, de manera que siempre, en toda circunstancia, tengan todo lo necesario y toda buena obra abunde en ustedes.",
      },
    ],
  ],

  "la-cena-no-es-un-examen": [
    [
      {
        referencia: "Lucas 22:21-22",
        texto:
          "Pero sepan que la mano del que va a traicionarme está con la mía sobre la mesa. El Hijo del hombre se irá según está determinado, pero ¡ay de aquel que lo traiciona!",
      },
    ],
    [
      {
        referencia: "1 Corintios 11:26",
        texto:
          "Porque cada vez que comen este pan y beben de esta copa, proclaman la muerte del Señor hasta que él venga.",
      },
    ],
    [
      {
        referencia: "1 Corintios 11:28-29",
        texto:
          "Así que cada uno debe examinarse a sí mismo antes de comer el pan y beber de la copa. Porque el que come y bebe sin discernir el cuerpo come y bebe su propia condena.",
      },
      {
        referencia: "1 Corintios 11:33",
        texto: "Así que, hermanos míos, cuando se reúnan para comer, espérense unos a otros.",
      },
    ],
  ],

  "ya-bendecido": [
    [
      {
        referencia: "Efesios 1:3",
        texto:
          "Bendito sea Dios, Padre de nuestro Señor Jesucristo, que nos ha bendecido en las regiones celestiales con toda bendición espiritual en Cristo.",
      },
    ],
    [
      {
        referencia: "Efesios 1:17-18",
        texto:
          "Pido que el Dios de nuestro Señor Jesucristo, el Padre glorioso, les dé el Espíritu de sabiduría y de revelación, para que lo conozcan mejor. Pido también que les sean iluminados los ojos del corazón para que sepan a qué esperanza él los ha llamado, cuál es la riqueza de su gloriosa herencia entre pueblo santo…",
      },
    ],
    [HEB_4_16],
  ],

  /* ───────────── SERIE 2 ───────────── */

  "con-el-rostro-descubierto": [
    [
      {
        referencia: "2 Corintios 3:14-15",
        texto:
          "Sin embargo, la mente de ellos se embotó, de modo que hasta el día de hoy tienen puesto el mismo velo al leer el antiguo pacto. El velo no les ha sido quitado, porque solo se quita en Cristo. Hasta el día de hoy, siempre que leen a Moisés, un velo les cubre el corazón.",
      },
    ],
    [
      {
        referencia: "2 Corintios 3:16",
        texto: "Pero cada vez que alguien se vuelve al Señor, el velo es quitado.",
      },
    ],
    [
      {
        referencia: "2 Corintios 3:18",
        texto:
          "Así, todos nosotros, que con el rostro descubierto reflejamos como en un espejo la gloria del Señor, somos transformados a su semejanza con más y más gloria por la acción del Señor, que es el Espíritu.",
      },
    ],
  ],

  "santo-antes-de-comportarte": [
    [
      {
        referencia: "1 Corintios 6:11",
        texto:
          "Y eso eran algunos de ustedes. Pero ya han sido lavados, santificados y justificados en el nombre del Señor Jesucristo y por el Espíritu de nuestro Dios.",
      },
    ],
    [
      {
        referencia: "Romanos 6:11",
        texto:
          "De la misma manera, también ustedes considérense muertos al pecado, pero vivos para Dios en Cristo Jesús.",
      },
    ],
    [
      {
        referencia: "Colosenses 3:12",
        texto:
          "Por lo tanto, como pueblo escogido de Dios, santo y amado, revístanse de afecto entrañable y de bondad, humildad, amabilidad y paciencia…",
      },
    ],
  ],

  "cristo-se-sento": [
    [
      {
        referencia: "Hebreos 10:11",
        texto:
          "Todo sacerdote celebra el culto día tras día ofreciendo repetidas veces los mismos sacrificios, que nunca pueden quitar los pecados.",
      },
    ],
    [
      {
        referencia: "Hebreos 10:12-14",
        texto:
          "Pero este sacerdote, después de ofrecer por los pecados un solo sacrificio para siempre, se sentó a la derecha de Dios en espera de que sus enemigos sean puestos por estrado de sus pies. Porque con un solo sacrificio ha perfeccionado para siempre a los que han sido santificados.",
      },
    ],
    [HEB_10_22],
  ],

  "el-duro-trato-del-cuerpo-no-sirve": [
    [
      {
        referencia: "Colosenses 2:20-23",
        texto:
          "Si con Cristo ustedes ya han muerto a los principios de este mundo, ¿por qué, como si todavía pertenecieran al mundo, se someten a preceptos tales como «no tomes en tus manos, no pruebes, no toques»? Estos preceptos, basados en reglas y enseñanzas humanas, se refieren a cosas que van a desaparecer con el uso. Tienen sin duda apariencia de sabiduría, con su afectada devoción, falsa humildad y severo trato del cuerpo, pero de nada sirven frente a los apetitos de la carne.",
      },
    ],
    [
      {
        referencia: "Romanos 7:8",
        texto:
          "Pero el pecado, aprovechando la oportunidad que le proporcionó el mandamiento, despertó en mí toda clase de codicia. Porque aparte de la Ley el pecado está muerto.",
      },
    ],
    [
      {
        referencia: "Colosenses 3:1-2",
        texto:
          "Ya que han resucitado con Cristo, busquen las cosas de arriba, donde está Cristo sentado a la derecha de Dios. Concentren su atención en las cosas de arriba, no en las de la tierra…",
      },
      {
        referencia: "Colosenses 3:5",
        texto:
          "Por tanto, hagan morir todo lo que es propio de la naturaleza terrenal: inmoralidad sexual, impureza, bajas pasiones, malos deseos y avaricia, la cual es idolatría.",
      },
    ],
  ],

  "cuando-dios-corrige-no-cobra": [
    [
      {
        referencia: "Isaías 53:5",
        texto:
          "Él fue traspasado por nuestras rebeliones y molido por nuestras iniquidades. Sobre él recayó el castigo, precio de nuestra paz y gracias a sus heridas fuimos sanados.",
      },
    ],
    [
      {
        referencia: "Hebreos 12:7-8",
        texto:
          "Lo que soportan es para su disciplina, pues Dios los está tratando como a hijos. Porque, ¿qué hijo hay a quien el padre no disciplina? Si a ustedes se les deja sin la disciplina que todos reciben, entonces son bastardos y no hijos legítimos.",
      },
    ],
    [
      {
        referencia: "Hebreos 12:10-11",
        texto:
          "En efecto, nuestros padres nos disciplinaban por un breve tiempo, como mejor les parecía; pero Dios lo hace para nuestro bien, a fin de que participemos de su santidad. Ciertamente, ninguna disciplina, en el momento de recibirla, parece agradable, sino más bien dolorosa; sin embargo, después produce una cosecha de justicia y paz para quienes han sido entrenados por ella.",
      },
    ],
  ],

  "sacerdotes-sin-templo": [
    [
      {
        referencia: "Juan 4:23-24",
        texto:
          "Pero se acerca la hora, y ha llegado ya, en que los verdaderos adoradores rendirán culto al Padre en espíritu y en verdad, porque así quiere el Padre que sean los que le adoren. Dios es espíritu y quienes lo adoran deben hacerlo en espíritu y en verdad.",
      },
    ],
    [
      {
        referencia: "Hebreos 13:15-16",
        texto:
          "Así que ofrezcamos continuamente a Dios, por medio de Jesucristo, un sacrificio de alabanza, es decir, el fruto de los labios que confiesan su nombre. No se olviden de hacer el bien y de compartir con otros lo que tienen, porque esos son los sacrificios que agradan a Dios.",
      },
    ],
    [
      {
        referencia: "Colosenses 3:23-24",
        texto:
          "Hagan lo que hagan, trabajen de buena gana, como para el Señor y no como para nadie en este mundo, conscientes de que el Señor los recompensará con la herencia. Ustedes sirven a Cristo el Señor.",
      },
    ],
  ],

  "la-mesa-que-pedro-abandono": [
    [
      {
        referencia: "Hechos 10:34-35",
        texto:
          "Pedro tomó la palabra y dijo: —Ahora comprendo que en realidad para Dios no hay favoritismos, sino que en toda nación él ve con agrado a los que le temen y actúan con justicia.",
      },
    ],
    [
      {
        referencia: "Gálatas 2:12-13",
        texto:
          "Antes que llegaran algunos de parte de Santiago, él solía comer con los no judíos. Pero cuando aquellos llegaron, comenzó a retraerse y a separarse de los no judíos por temor a los partidarios de la circuncisión. Entonces los demás judíos se le unieron en su hipocresía, y hasta el mismo Bernabé se dejó arrastrar por esa conducta hipócrita.",
      },
    ],
    [
      {
        referencia: "Gálatas 2:14",
        texto:
          "Cuando vi que no actuaban rectamente, como corresponde a la verdad del evangelio, le dije a Cefas delante de todos: «Si tú, que eres judío, vives como si no lo fueras, ¿por qué obligas a los no judíos a practicar el judaísmo?».",
      },
    ],
  ],

  "palabras-que-dan-gracia": [
    [
      {
        referencia: "Mateo 12:34",
        texto:
          "Camada de víboras, ¿cómo pueden ustedes que son malos decir algo bueno? De la abundancia del corazón habla la boca.",
      },
    ],
    [
      {
        referencia: "Efesios 4:29",
        texto:
          "Eviten toda conversación obscena. Por el contrario, que sus palabras contribuyan a la necesaria edificación y sean de bendición para quienes escuchan.",
      },
    ],
    [
      JN_8_10_11,
      {
        referencia: "Efesios 4:15",
        texto:
          "Más bien, al vivir la verdad con amor, creceremos hasta ser en todo como aquel que es la cabeza, es decir, Cristo.",
      },
    ],
  ],

  "embajadores-no-cobradores": [
    [
      {
        referencia: "2 Corintios 5:14-15",
        texto:
          "El amor de Cristo nos obliga, porque estamos convencidos de que uno murió por todos y por consiguiente todos murieron. Y él murió por todos, para que los que viven ya no vivan para sí, sino para el que murió por ellos y fue resucitado.",
      },
    ],
    [
      {
        referencia: "2 Corintios 5:18-19",
        texto:
          "Todo esto proviene de Dios, quien por medio de Cristo nos reconcilió consigo mismo y nos dio el ministerio de la reconciliación. Esto es, que en Cristo, Dios estaba reconciliando al mundo consigo mismo, no tomándole en cuenta sus pecados y encargándonos a nosotros el mensaje de la reconciliación.",
      },
    ],
    [
      {
        referencia: "2 Corintios 5:20",
        texto:
          "Así que somos embajadores de Cristo, como si Dios los exhortara a ustedes por medio de nosotros: «En nombre de Cristo les rogamos que se reconcilien con Dios».",
      },
    ],
  ],

  "una-vez-vuelto": [
    [
      {
        referencia: "Lucas 22:31-32",
        texto:
          "Simón, Simón, mira que Satanás ha pedido zarandearlos a ustedes como si fueran trigo. Pero yo he orado por ti, para que no falle tu fe. Y tú, cuando te hayas vuelto a mí, fortalece a tus hermanos.",
      },
    ],
    [
      {
        referencia: "Marcos 16:7",
        texto:
          "Pero vayan a decirles a sus discípulos y a Pedro: “Él va delante de ustedes a Galilea. Allí lo verán, tal como les dijo”.",
      },
    ],
    [
      {
        referencia: "1 Pedro 5:10",
        texto:
          "Luego de que ustedes hayan sufrido un poco de tiempo, Dios mismo, el Dios de toda gracia que los llamó a su gloria eterna en Cristo, los restaurará y los hará fuertes, firmes y estables.",
      },
    ],
  ],

  /* ───────────── SERIE 3 ───────────── */

  "abraham-estaba-dormido": [
    [
      {
        referencia: "Génesis 15:17-18",
        texto:
          "Cuando el sol se puso y cayó la noche, aparecieron un horno humeante y una antorcha encendida, los cuales pasaban entre los animales descuartizados. En aquel día el Señor hizo un pacto con Abram. Le dijo: —A tus descendientes daré esta tierra, desde el río de Egipto hasta el gran río, el Éufrates.",
      },
    ],
    [
      {
        referencia: "Hebreos 6:17-18",
        texto:
          "Por eso Dios, queriendo demostrar claramente a los herederos de la promesa que su propósito nunca cambia, confirmó con un juramento esa promesa. Lo hizo así para que, mediante la promesa y el juramento, que son dos realidades que nunca cambian y en las cuales es imposible que Dios mienta, tengamos un estímulo poderoso los que, buscando refugio, nos aferramos a la esperanza que está delante de nosotros.",
      },
    ],
    [
      {
        referencia: "Génesis 15:6",
        texto: "Abram creyó al Señor y el Señor se lo reconoció como justicia.",
      },
    ],
  ],

  "el-hijo-del-esfuerzo": [
    [
      {
        referencia: "Génesis 16:1-2",
        texto:
          "Saray, la esposa de Abram, no le había dado hijos. Pero como tenía una esclava egipcia llamada Agar, Saray dijo a Abram: —El Señor me ha hecho estéril. Por lo tanto, ve y acuéstate con mi esclava Agar. Tal vez por medio de ella podré formar una familia. Abram aceptó la propuesta que hizo Saray.",
      },
    ],
    [
      {
        referencia: "Génesis 17:18-19",
        texto:
          "Por eso le dijo a Dios: —¡Concédele a Ismael vivir bajo tu bendición! A lo que Dios contestó: —¡Pero es Sara, tu esposa, la que te dará un hijo, al que llamarás Isaac! Yo estableceré mi pacto con él y con sus descendientes, como pacto perpetuo.",
      },
    ],
    [
      {
        referencia: "Gálatas 4:28-31",
        texto:
          "Ustedes, hermanos, al igual que Isaac, son hijos por la promesa. Y así como en aquel tiempo el hijo nacido por decisión humana persiguió al hijo nacido por el Espíritu, así también sucede ahora. Pero ¿qué dice la Escritura? «¡Echa de aquí a la esclava y a su hijo! El hijo de la esclava jamás tendrá parte en la herencia con el hijo de la libre». Así que, hermanos, no somos hijos de la esclava, sino de la libre.",
      },
    ],
  ],

  "las-uvas-agrias": [
    [
      {
        referencia: "Ezequiel 18:20",
        texto:
          "La persona que peque morirá. Ningún hijo cargará con la culpa de su padre ni el padre con la del hijo. Al justo se le pagará con justicia y al malvado se le pagará con maldad.",
      },
    ],
    [
      {
        referencia: "Gálatas 3:13",
        texto:
          "Cristo nos rescató de la maldición de la Ley al hacerse maldición por nosotros, pues está escrito: «Maldito todo el que es colgado de un madero».",
      },
    ],
    [
      {
        referencia: "1 Pedro 1:18-19",
        texto:
          "Como bien saben, ustedes fueron rescatados de la vida absurda que heredaron de sus antepasados. El precio de su rescate no se pagó con cosas perecederas, como el oro o la plata, sino con la preciosa sangre de Cristo, como de un cordero sin mancha y sin defecto.",
      },
    ],
  ],

  "dos-montes": [
    [
      {
        referencia: "Éxodo 20:18-19",
        texto:
          "Ante ese espectáculo de truenos y relámpagos, de sonidos de trompeta y de la montaña envuelta en humo, los israelitas temblaban de miedo y se mantenían a distancia. Así que suplicaron a Moisés: —Háblanos tú y te escucharemos. Si Dios nos habla, seguramente moriremos.",
      },
    ],
    [
      {
        referencia: "Hebreos 12:22-24",
        texto:
          "Por el contrario, ustedes se han acercado al monte Sión, a la Jerusalén celestial, la ciudad del Dios viviente. Se han acercado a millares y millares de ángeles, a una asamblea gozosa, a la iglesia de los primogénitos inscritos en el cielo. Se han acercado a Dios, el Juez de todos; a los espíritus de los justos que han llegado a la perfección; a Jesús, el mediador de un nuevo pacto; y a la sangre rociada, que habla mejor que la de Abel.",
      },
    ],
    [ROM_8_15],
  ],

  "correr-a-la-ciudad-de-refugio": [
    [
      {
        referencia: "Deuteronomio 19:3",
        texto:
          "Dividirás en tres partes la tierra que el Señor tu Dios te da por herencia, y construirás caminos para que cualquiera que haya matado a alguien pueda ir a refugiarse en ellas.",
      },
    ],
    [
      {
        referencia: "Números 35:26-28",
        texto:
          "Pero si el acusado sale de los límites de la ciudad de refugio adonde huyó, el vengador podrá matarlo y no será culpable de homicidio si lo encuentra fuera de la ciudad. Así que el acusado debe permanecer en su ciudad de refugio hasta la muerte del sumo sacerdote. Después de eso podrá volver a su heredad.",
      },
    ],
    [
      {
        referencia: "Hebreos 6:19-20",
        texto:
          "Tenemos como firme y segura ancla del alma una esperanza que penetra hasta detrás de la cortina del santuario, hasta donde Jesús entró por nosotros para abrirnos camino, llegando a ser sumo sacerdote para siempre, según el orden de Melquisedec.",
      },
    ],
  ],

  "mirar-no-es-hacer": [
    [
      {
        referencia: "Números 21:8-9",
        texto:
          "…y el Señor le dijo: —Hazte una serpiente y ponla en un asta. Todos los que sean mordidos y la miren, vivirán. Moisés hizo una serpiente de bronce y la puso en un asta. Los que eran mordidos miraban a la serpiente de bronce y vivían.",
      },
    ],
    [
      {
        referencia: "Isaías 45:22",
        texto:
          "Vuelvan a mí y sean salvos, todos los confines de la tierra, porque yo soy Dios y no hay ningún otro.",
      },
    ],
    [
      {
        referencia: "2 Reyes 18:4",
        texto:
          "Quitó los altares paganos, destrozó las piedras sagradas y quebró las imágenes de la diosa Aserá. Además, destruyó la serpiente de bronce que Moisés había hecho, pues los israelitas todavía le quemaban incienso, y la llamaban Nejustán.",
      },
    ],
  ],

  "un-sumo-sacerdote-que-sabe": [
    [
      {
        referencia: "Hebreos 4:15",
        texto:
          "Porque no tenemos un sumo sacerdote incapaz de compadecerse de nuestras debilidades, sino uno que ha sido tentado en todo de la misma manera que nosotros, aunque sin pecado.",
      },
    ],
    [
      {
        referencia: "Hebreos 2:17-18",
        texto:
          "Por eso era preciso que en todo se pareciera a sus hermanos, para ser un sumo sacerdote fiel y compasivo al servicio de Dios, a fin de obtener el perdón de los pecados del pueblo. Por haber sufrido él mismo la tentación, puede socorrer a los que son tentados.",
      },
    ],
    [HEB_4_16],
  ],

  "la-circuncision-que-cuenta": [
    [
      {
        referencia: "Filipenses 3:4-6",
        texto:
          "Yo mismo tengo motivos para tal confianza. Si cualquier otro cree tener motivos para confiar en esfuerzos humanos, yo más: circuncidado al octavo día, del pueblo de Israel, de la tribu de Benjamín, un verdadero hebreo; en cuanto a la interpretación de la Ley, fariseo; en cuanto al celo, perseguidor de la iglesia; en cuanto a la justicia que la Ley exige, intachable.",
      },
    ],
    [
      {
        referencia: "Deuteronomio 30:6",
        texto:
          "El Señor tu Dios circuncidará tu corazón y el de tus descendientes, para que lo ames con todo tu corazón y con toda tu alma y así tengas vida.",
      },
    ],
    [
      {
        referencia: "Filipenses 3:7-9",
        texto:
          "Sin embargo, todo aquello que para mí era ganancia, ahora lo considero pérdida por causa de Cristo. Es más, todo lo considero pérdida por razón del incomparable valor de conocer a Cristo Jesús, mi Señor. Por él lo he perdido todo y lo tengo por estiércol, a fin de ganar a Cristo y encontrarme unido a él. No quiero mi propia justicia que procede de la Ley, sino la que se obtiene mediante la fe en Cristo, la justicia que procede de Dios, basada en la fe.",
      },
    ],
  ],

  "una-moabita-en-la-genealogia": [
    [
      {
        referencia: "Deuteronomio 23:3",
        texto:
          "No podrán entrar en la asamblea del Señor los amonitas ni los moabitas, ni ninguno de sus descendientes, hasta la décima generación.",
      },
    ],
    [
      {
        referencia: "Rut 2:12",
        texto:
          "¡Que el Señor te recompense por lo que has hecho! Que el Señor, Dios de Israel, bajo cuyas alas has venido a refugiarte, te lo pague con creces.",
      },
      {
        referencia: "Rut 3:9",
        texto:
          "—¿Quién eres? —preguntó. —Soy Rut, su sierva. Extienda sobre mí el borde de su manto, ya que usted es un pariente que me puede redimir.",
      },
    ],
    [
      {
        referencia: "Mateo 1:5",
        texto:
          "Salmón, padre de Booz, cuya madre fue Rajab; Booz, padre de Obed, cuya madre fue Rut; Obed, padre de Isaí…",
      },
    ],
  ],

  "el-jubileo-empezo-en-nazaret": [
    [
      {
        referencia: "Levítico 25:10",
        texto:
          "El año cincuenta será declarado santo, y se proclamará en el país la liberación de todos sus habitantes. Será para ustedes un jubileo y cada uno volverá a su heredad familiar y a su propio clan.",
      },
    ],
    [
      {
        referencia: "Isaías 61:1-2",
        texto:
          "El Espíritu del Señor y Dios está sobre mí, por cuanto me ha ungido para anunciar buenas noticias a los pobres. Me ha enviado a sanar los corazones heridos, a proclamar libertad a los cautivos y la liberación de los prisioneros, a pregonar el año del favor del Señor y el día de la venganza de nuestro Dios, a consolar a todos los que están de duelo…",
      },
    ],
    [
      {
        referencia: "Levítico 25:9",
        texto:
          "El día diez del mes séptimo, es decir, el día del Perdón, harás resonar la trompeta por todo el país.",
      },
    ],
  ],

  /* ───────────── SERIE 4 ───────────── */

  "bastate-mi-gracia": [
    [
      {
        referencia: "2 Corintios 12:7-8",
        texto:
          "Para evitar que me volviera presumido por estas sublimes revelaciones, una espina me fue clavada en el cuerpo, es decir, un mensajero de Satanás, para que me atormentara. Tres veces rogué al Señor que me la quitara…",
      },
    ],
    [
      {
        referencia: "2 Corintios 12:9",
        texto:
          "…pero él me dijo: «Te basta con mi gracia, pues mi poder se perfecciona en la debilidad». Por lo tanto, gustosamente presumiré más bien de mis debilidades, para que permanezca sobre mí el poder de Cristo.",
      },
    ],
    [
      {
        referencia: "2 Corintios 12:10",
        texto:
          "Por eso me regocijo en debilidades, insultos, privaciones, persecuciones y dificultades que sufro por Cristo; porque, cuando soy débil, entonces soy fuerte.",
      },
    ],
  ],

  "pan-para-hoy": [
    [
      {
        referencia: "Éxodo 16:4",
        texto:
          "Entonces el Señor dijo a Moisés: «Voy a hacer que llueva pan del cielo. El pueblo deberá salir todos los días a recoger su ración diaria. Voy a ponerlos a prueba, para ver si cumplen o no mis instrucciones…».",
      },
    ],
    [
      {
        referencia: "Éxodo 16:19-20",
        texto:
          "Entonces Moisés les dijo: —Nadie debe guardar nada para el día siguiente. Hubo algunos que no hicieron caso a Moisés y guardaron algo para el día siguiente, pero lo guardado se llenó de gusanos y comenzó a apestar. Entonces Moisés se enojó contra ellos.",
      },
    ],
    [
      {
        referencia: "Lamentaciones 3:22-23",
        texto:
          "Por el gran amor del Señor no hemos sido consumidos y su compasión jamás se agota. Cada mañana se renuevan sus bondades; ¡muy grande es su fidelidad!",
      },
    ],
  ],

  "levantate-y-come": [
    [
      {
        referencia: "1 Reyes 19:4",
        texto:
          "…y caminó todo un día por el desierto. Llegó adonde había un arbusto de retama y se sentó a su sombra con ganas de morirse. «¡Estoy harto, Señor! —protestó—. Quítame la vida, pues no soy mejor que mis antepasados».",
      },
    ],
    [
      {
        referencia: "1 Reyes 19:5-8",
        texto:
          "Luego se acostó debajo del arbusto y se quedó dormido. De repente, un ángel lo tocó y le dijo: «Levántate y come». Elías miró a su alrededor y vio a su cabecera un panecillo cocido sobre brasas y un jarro de agua. Comió, bebió y volvió a acostarse. El ángel del Señor regresó y, tocándolo, le dijo: «Levántate y come, porque te espera un largo viaje». Elías se levantó, comió y bebió. Una vez fortalecido por aquella comida, viajó cuarenta días y cuarenta noches hasta que llegó a Horeb, el monte de Dios.",
      },
    ],
    [
      {
        referencia: "1 Reyes 19:11-12",
        texto:
          "El Señor le ordenó: —Sal y preséntate ante mí en la montaña, porque estoy a punto de pasar por allí. Mientras estaba allí, el Señor pasó y vino un viento recio, tan violento que partió las montañas y destrozó las rocas, pero el Señor no estaba en el viento. Después del viento hubo un terremoto, pero el Señor tampoco estaba en el terremoto. Tras el terremoto vino un fuego, pero el Señor tampoco estaba en el fuego. Y después del fuego vino un suave murmullo.",
      },
    ],
  ],

  "deje-a-trofimo-enfermo": [
    [
      {
        referencia: "2 Timoteo 4:20",
        texto: "Erasto se quedó en Corinto; a Trófimo lo dejé enfermo en Mileto.",
      },
    ],
    [
      {
        referencia: "Juan 9:1-3",
        texto:
          "A su paso, Jesús vio a un hombre que era ciego de nacimiento. Y sus discípulos preguntaron: —Rabí, para que este hombre haya nacido ciego, ¿quién pecó, él o sus padres? —No está así debido a sus pecados ni a los de sus padres —respondió Jesús—, sino que esto sucedió para que la obra de Dios se hiciera evidente en su vida.",
      },
    ],
    [
      {
        referencia: "Santiago 5:14-16",
        texto:
          "¿Está enfermo alguno de ustedes? Haga llamar a los líderes de la iglesia para que oren por él y lo unjan con aceite en el nombre del Señor. La oración de fe sanará al enfermo y el Señor lo levantará. Y si ha cometido pecados, sus pecados se le perdonarán. Por eso, confiésense unos a otros sus pecados y oren unos por otros, para que sean sanados. La oración del justo es poderosa y eficaz.",
      },
    ],
  ],

  "llorar-con-esperanza": [
    [
      {
        referencia: "Juan 11:33-36",
        texto:
          "Al ver llorar a María y a los judíos que la habían acompañado, Jesús se turbó y se conmovió profundamente. —¿Dónde lo han puesto? —preguntó. —Ven a verlo, Señor —le respondieron. Jesús lloró. —¡Miren cuánto lo quería! —dijeron los judíos.",
      },
    ],
    [
      {
        referencia: "1 Tesalonicenses 4:13-14",
        texto:
          "Hermanos, no queremos que ignoren lo que va a pasar con los que ya han muerto, para que no se entristezcan como esos otros que no tienen esperanza. ¿Acaso no creemos que Jesús murió y resucitó? Así también Dios resucitará con Jesús a los que han muerto en unión con él.",
      },
    ],
    [
      {
        referencia: "Romanos 12:15",
        texto: "Alégrense con los que están alegres; lloren con los que lloran.",
      },
    ],
  ],

  /* Tema 36: todas las referencias del bosquejo, completas */
  "dios-mio-por-que": [
    [
      {
        referencia: "Salmo 13:1",
        texto: "¿Hasta cuándo, Señor, me tendrás en el olvido? ¿Hasta cuándo esconderás de mí tu rostro?",
      },
      {
        referencia: "Salmo 88:13-14",
        texto:
          "Yo, Señor, te ruego que me ayudes; por la mañana mi oración llega ante tu presencia. ¿Por qué me rechazas, Señor? ¿Por qué escondes de mí tu rostro?",
      },
      {
        referencia: "Salmo 88:18",
        texto: "Me has quitado amigos y seres queridos; ahora solo tengo amistad con las tinieblas.",
      },
      {
        referencia: "Habacuc 1:2",
        texto:
          "¿Hasta cuándo, Señor, he de pedirte ayuda sin que tú me escuches? ¿Hasta cuándo he de clamar «¡violencia!», sin que tú nos salves?",
      },
      {
        referencia: "Lamentaciones 3:1-8",
        texto:
          "Yo soy aquel que ha sufrido la aflicción bajo la vara de su ira. Me ha hecho andar en las tinieblas y no en la luz. Todo el día, una y otra vez, su mano se ha vuelto contra mí. Ha hecho que mi carne y mi piel envejezcan; me ha quebrantado los huesos. Me ha tendido un cerco de amargura y tribulaciones. Me obliga a vivir en las tinieblas, como a los que hace tiempo murieron. Me tiene encerrado, no puedo escapar; me ha puesto pesadas cadenas. Por más que grito y pido ayuda, él rechaza mi oración.",
      },
    ],
    [
      {
        referencia: "Mateo 27:46",
        texto:
          "Como a las tres de la tarde, Jesús gritó con fuerza: —Elí, Elí, ¿lema sabactani? —que significa “Dios mío, Dios mío, ¿por qué me has abandonado?”.",
      },
      {
        referencia: "Salmo 22:1",
        texto:
          "Dios mío, Dios mío, ¿por qué me has abandonado? ¿Por qué estás lejos para salvarme, tan lejos de mis gritos de angustia?",
      },
      {
        referencia: "Hebreos 5:7",
        texto:
          "En los días de su vida mortal, Jesús ofreció oraciones y súplicas con fuerte clamor y lágrimas al que podía salvarlo de la muerte y fue escuchado por su temor reverente.",
      },
      {
        referencia: "Hebreos 13:5",
        texto:
          "Manténganse libres del amor al dinero y conténtense con lo que tienen, porque Dios ha dicho: «Nunca los dejaré; jamás los abandonaré».",
      },
    ],
    [
      {
        referencia: "Salmo 13:5-6",
        texto:
          "Pero yo confío en tu gran amor; mi corazón se alegra en tu salvación. Cantaré salmos al Señor, porque ha sido bueno conmigo.",
      },
      {
        referencia: "Lamentaciones 3:21-24",
        texto:
          "Pero algo más me viene a la memoria, lo cual me llena de esperanza: Por el gran amor del Señor no hemos sido consumidos y su compasión jamás se agota. Cada mañana se renuevan sus bondades; ¡muy grande es su fidelidad! Me digo a mí mismo: «El Señor es mi herencia. ¡En él esperaré!».",
      },
      {
        referencia: "Salmo 22:24",
        texto:
          "Porque él no desprecia ni tiene en poco el sufrimiento del pobre; no esconde de él su rostro, sino que lo escucha cuando a él clama.",
      },
      {
        referencia: "Romanos 8:26",
        texto:
          "Así mismo, en nuestra debilidad el Espíritu acude a ayudarnos. No sabemos qué pedir, pero el Espíritu mismo intercede por nosotros con gemidos que no pueden expresarse con palabras.",
      },
      {
        referencia: "Isaías 50:10",
        texto:
          "¿Quién entre ustedes teme al Señor y obedece la voz de su siervo? Aunque camine en la oscuridad y sin un rayo de luz, que confíe en el nombre del Señor y dependa de su Dios.",
      },
    ],
  ],

  "aun-en-la-vejez-fructificaran": [
    [
      {
        referencia: "Isaías 46:3-4",
        texto:
          "Escúchenme, descendientes de Jacob, todo el resto del pueblo de Israel, a quienes he cargado desde el vientre y he llevado desde la cuna. Aun en la vejez, cuando ya peinen canas, yo seré el mismo, yo los sostendré. Yo los hice y cuidaré de ustedes; los sostendré y los libraré.",
      },
    ],
    [
      {
        referencia: "Salmo 92:12-14",
        texto:
          "Como palmeras florecen los justos; como cedros del Líbano crecen. Plantados en la casa del Señor, florecen en los atrios de nuestro Dios. Aun en su vejez, darán fruto, siempre estarán saludables y frondosos…",
      },
    ],
    [
      {
        referencia: "2 Corintios 4:16",
        texto:
          "Por tanto, no nos desanimamos. Al contrario, aunque por fuera nos vamos desgastando, por dentro nos vamos renovando día tras día.",
      },
    ],
  ],

  "la-espera-no-es-castigo": [
    [
      {
        referencia: "Juan 11:5-6",
        texto:
          "Jesús amaba a Marta, a su hermana y a Lázaro. A pesar de eso, cuando oyó que Lázaro estaba enfermo, se quedó dos días más donde se encontraba.",
        nota:
          "La NVI traduce la conjunción griega oun («por tanto»; RVR1960: «pues») como «A pesar de eso». En el original, el versículo 6 se presenta como consecuencia del amor del versículo 5: porque los amaba, se quedó.",
      },
    ],
    [
      {
        referencia: "Romanos 4:20-21",
        texto:
          "Ante la promesa de Dios no dudó como un incrédulo, sino que se reafirmó en su fe y dio gloria a Dios, plenamente convencido de que Dios tenía poder para cumplir lo que había prometido.",
      },
    ],
    [
      {
        referencia: "Isaías 40:31",
        texto:
          "…pero los que confían en el Señor renovarán sus fuerzas; levantarán el vuelo como las águilas, correrán y no se fatigarán, caminarán y no se cansarán.",
      },
    ],
  ],

  "librados-del-temor-de-la-muerte": [
    [
      {
        referencia: "Hebreos 2:14-15",
        texto:
          "Por tanto, ya que ellos son de carne y hueso, él también compartió esa naturaleza humana para anular, mediante la muerte, al que tiene el dominio de la muerte —es decir, al diablo—, y librar a todos los que por temor a la muerte estaban sometidos a esclavitud durante toda la vida.",
      },
    ],
    [
      {
        referencia: "1 Corintios 15:55-57",
        texto:
          "«¿Dónde está, oh muerte, tu victoria? ¿Dónde está, oh muerte, tu aguijón?». El aguijón de la muerte es el pecado y el poder del pecado es la Ley. ¡Pero gracias a Dios que nos da la victoria por medio de nuestro Señor Jesucristo!",
      },
    ],
    [
      {
        referencia: "Filipenses 1:21-23",
        texto:
          "Porque para mí el vivir es Cristo y el morir es ganancia. Ahora bien, si seguir viviendo en este cuerpo representa para mí un trabajo fructífero, ¿qué escogeré? ¡No lo sé! Me siento presionado por dos posibilidades: deseo partir y estar con Cristo, que es muchísimo mejor…",
      },
    ],
  ],

  "enjugara-toda-lagrima": [
    [
      {
        referencia: "Apocalipsis 21:3",
        texto:
          "Oí una potente voz que provenía del trono y decía: «¡Aquí, entre los seres humanos, está el santuario de Dios! Él habitará en medio de ellos y ellos serán su pueblo; Dios mismo estará con ellos y será su Dios.",
      },
    ],
    [
      {
        referencia: "Apocalipsis 21:4",
        texto:
          "Él enjugará toda lágrima de los ojos. Ya no habrá muerte ni llanto, tampoco lamento ni dolor, porque las primeras cosas han dejado de existir».",
      },
    ],
    [
      {
        referencia: "Apocalipsis 22:17",
        texto:
          "El Espíritu y la novia dicen: «¡Ven!»; y el que escuche diga: «¡Ven!». El que tenga sed, venga; y el que quiera, tome gratuitamente del agua de la vida.",
      },
    ],
  ],

  /* ───────────── TEMAS AÑADIDOS PARA LA SELECCIÓN ───────────── */

  "la-persona-de-fe-sabe-cambiar-de-plan": [
    [
      {
        referencia: "Santiago 4:13-16",
        texto:
          "Ahora escuchen esto, ustedes que dicen: «Hoy o mañana iremos a tal o cual ciudad, pasaremos allí un año, haremos negocios y ganaremos dinero». ¡Y eso que ni siquiera saben qué sucederá mañana! ¿Qué es su vida? Ustedes son como la niebla que aparece por un momento y luego se desvanece. Más bien, debieran decir: «Si el Señor quiere, viviremos y haremos esto o aquello». Pero ahora se jactan en sus fanfarronerías. Toda esta jactancia es mala.",
      },
      {
        referencia: "Proverbios 27:1",
        texto: "No te jactes del día de mañana, porque no sabes lo que el día traerá.",
      },
    ],
    [
      {
        referencia: "Hechos 16:6-10",
        texto:
          "Atravesaron la región de Frigia y Galacia, ya que el Espíritu Santo había impedido que predicaran la palabra en la provincia de Asia. Cuando llegaron cerca de Misia, intentaron pasar a Bitinia, pero el Espíritu de Jesús no se lo permitió. Entonces, pasando de largo por Misia, bajaron a Troas. Durante la noche Pablo tuvo una visión en la que un hombre de Macedonia, puesto de pie, rogaba: «Pasa a Macedonia y ayúdanos». Después de que Pablo tuvo la visión, enseguida nos preparamos para partir hacia Macedonia, convencidos de que Dios nos había llamado a anunciar las buenas noticias a los macedonios.",
      },
      {
        referencia: "Proverbios 16:9",
        texto: "El corazón del hombre traza su rumbo, pero sus pasos los dirige el Señor.",
      },
    ],
    [
      {
        referencia: "2 Corintios 1:15-17",
        texto:
          "Confiando en esto, quise visitarlos primero a ustedes para que recibieran una doble bendición; es decir, visitarlos de paso a Macedonia y verlos otra vez a mi regreso de allá. Así podrían ayudarme a seguir el viaje a Judea. Al proponerme esto, ¿acaso lo hice a la ligera? ¿O es que hago mis planes según criterios meramente humanos, de manera que diga «sí, sí» y «no, no» al mismo tiempo?",
      },
      {
        referencia: "2 Corintios 1:18-20",
        texto:
          "Pero tan cierto como que Dios es fiel, el mensaje que les hemos dirigido no es «sí» y «no». Porque el Hijo de Dios, Jesucristo, a quien Silvano, Timoteo y yo predicamos entre ustedes, no fue «sí» y «no»; en él siempre ha sido «sí». Todas las promesas que ha hecho Dios son «sí» en Cristo. Así que por medio de Cristo respondemos «amén» para la gloria de Dios.",
      },
      {
        referencia: "2 Corintios 1:23",
        texto:
          "¡Por mi vida! Invoco a Dios como testigo de que todavía no he ido a Corinto solo por consideración a ustedes.",
      },
    ],
  ],

  "leer-la-biblia-no-es-consultar-un-horoscopo": [
    [
      {
        referencia: "Mateo 4:5-7",
        texto:
          "Luego el diablo lo llevó a la ciudad santa e hizo que se pusiera de pie sobre la parte más alta del Templo y le dijo: —Si eres el Hijo de Dios, tírate abajo. Pues escrito está: “Ordenará que sus ángeles te protejan y ellos te sostendrán en sus manos para que no tropieces con piedra alguna”. —También está escrito: “No pongas a prueba al Señor tu Dios” —contestó Jesús.",
      },
      {
        referencia: "Juan 5:39-40",
        texto:
          "Ustedes estudian con diligencia las Escrituras porque piensan que en ellas hallan la vida eterna. ¡Y son ellas las que dan testimonio en mi favor! Sin embargo, ustedes no quieren venir a mí para tener esa vida.",
      },
    ],
    [
      {
        referencia: "Lucas 24:27",
        texto:
          "Entonces, comenzando por Moisés y por todos los Profetas, les explicó lo que se refería a él en todas las Escrituras.",
      },
      {
        referencia: "Lucas 24:32",
        texto:
          "Se decían el uno al otro: —¿No ardía nuestro corazón mientras conversaba con nosotros en el camino y nos explicaba las Escrituras?",
      },
      {
        referencia: "Lucas 24:44-45",
        texto:
          "Luego dijo: —Cuando todavía estaba yo con ustedes, les decía que tenía que cumplirse todo lo que está escrito acerca de mí en la Ley de Moisés, en los Profetas y en los Salmos. Entonces les abrió el entendimiento para que comprendieran las Escrituras.",
      },
    ],
    [
      {
        referencia: "2 Timoteo 3:14-17",
        texto:
          "Pero tú permanece firme en lo que has aprendido y de lo cual estás convencido, pues sabes de quiénes lo aprendiste. Desde tu niñez conoces las Sagradas Escrituras, que pueden darte la sabiduría necesaria para la salvación mediante la fe en Cristo Jesús. Toda la Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir y para instruir en la justicia, a fin de que el siervo de Dios esté enteramente capacitado para toda buena obra.",
      },
      {
        referencia: "Salmo 119:105",
        texto: "Tu palabra es una lámpara a mis pies; es una luz en mi sendero.",
      },
      {
        referencia: "Hechos 17:11",
        texto:
          "Estos eran de sentimientos más nobles que los de Tesalónica, de modo que estuvieron muy dispuestos a recibir el mensaje y todos los días examinaban las Escrituras para ver si era verdad lo que se les anunciaba.",
      },
    ],
  ],
};

/** Texto base en NVI para los temas que lo incluyen. */
export const TEXTO_BASE_NVI: Record<string, string> = {
  "dios-mio-por-que":
    "Dios mío, Dios mío, ¿por qué me has abandonado? ¿Por qué estás lejos para salvarme, tan lejos de mis gritos de angustia? [...] Como a las tres de la tarde, Jesús gritó con fuerza: —Elí, Elí, ¿lema sabactani? —que significa “Dios mío, Dios mío, ¿por qué me has abandonado?”.",
  "la-persona-de-fe-sabe-cambiar-de-plan":
    "Ahora escuchen esto, ustedes que dicen: «Hoy o mañana iremos a tal o cual ciudad, pasaremos allí un año, haremos negocios y ganaremos dinero». ¡Y eso que ni siquiera saben qué sucederá mañana! ¿Qué es su vida? Ustedes son como la niebla que aparece por un momento y luego se desvanece. Más bien, debieran decir: «Si el Señor quiere, viviremos y haremos esto o aquello».",
  "leer-la-biblia-no-es-consultar-un-horoscopo":
    "Entonces, comenzando por Moisés y por todos los Profetas, les explicó lo que se refería a él en todas las Escrituras. [...] Toda la Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir y para instruir en la justicia, a fin de que el siervo de Dios esté enteramente capacitado para toda buena obra.",
};
