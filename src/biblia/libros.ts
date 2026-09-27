export interface Libro {
  id: number;
  nombre: string;
  abrev: string;
  capitulos: number;
  testamento: "AT" | "NT";
  /** Alias ya normalizados (minúsculas, sin acentos, sin puntos). */
  alias: string[];
}

const L = (id: number, nombre: string, abrev: string, capitulos: number, testamento: "AT" | "NT", alias: string[]): Libro => ({
  id,
  nombre,
  abrev,
  capitulos,
  testamento,
  alias,
});

export const LIBROS: Libro[] = [
  L(1, "Génesis", "Gn", 50, "AT", ["gen", "gn", "genesis"]),
  L(2, "Éxodo", "Éx", 40, "AT", ["ex", "exo", "exod", "exodo"]),
  L(3, "Levítico", "Lv", 27, "AT", ["lev", "lv", "levitico"]),
  L(4, "Números", "Nm", 36, "AT", ["num", "nm", "numeros"]),
  L(5, "Deuteronomio", "Dt", 34, "AT", ["deut", "dt", "deu", "deuteronomio"]),
  L(6, "Josué", "Jos", 24, "AT", ["jos", "josue"]),
  L(7, "Jueces", "Jue", 21, "AT", ["jue", "jc", "jz", "jueces"]),
  L(8, "Rut", "Rt", 4, "AT", ["rut", "rt", "ruth"]),
  L(9, "1 Samuel", "1 S", 31, "AT", ["1 sam", "1sam", "1 s", "1s", "1 samuel", "1samuel"]),
  L(10, "2 Samuel", "2 S", 24, "AT", ["2 sam", "2sam", "2 s", "2s", "2 samuel", "2samuel"]),
  L(11, "1 Reyes", "1 R", 22, "AT", ["1 re", "1re", "1 r", "1r", "1 rey", "1 reyes", "1reyes"]),
  L(12, "2 Reyes", "2 R", 25, "AT", ["2 re", "2re", "2 r", "2r", "2 rey", "2 reyes", "2reyes"]),
  L(13, "1 Crónicas", "1 Cr", 29, "AT", ["1 cr", "1cr", "1 cro", "1 cron", "1 cronicas", "1cronicas"]),
  L(14, "2 Crónicas", "2 Cr", 36, "AT", ["2 cr", "2cr", "2 cro", "2 cron", "2 cronicas", "2cronicas"]),
  L(15, "Esdras", "Esd", 10, "AT", ["esd", "esdras", "ezra"]),
  L(16, "Nehemías", "Neh", 13, "AT", ["neh", "ne", "nehemias"]),
  L(17, "Ester", "Est", 10, "AT", ["est", "ester", "esther"]),
  L(18, "Job", "Job", 42, "AT", ["job", "jb"]),
  L(19, "Salmos", "Sal", 150, "AT", ["sal", "slm", "salmo", "salmos", "ps", "psalm", "salm"]),
  L(20, "Proverbios", "Pr", 31, "AT", ["prov", "pr", "pro", "proverbios", "prv"]),
  L(21, "Eclesiastés", "Ec", 12, "AT", ["ecl", "ec", "eclesiastes", "qohelet", "qoh"]),
  L(22, "Cantares", "Cnt", 8, "AT", ["cnt", "cant", "cantar", "cantares", "cantar de los cantares", "cantico", "canticos", "ct"]),
  L(23, "Isaías", "Is", 66, "AT", ["is", "isa", "isaias"]),
  L(24, "Jeremías", "Jer", 52, "AT", ["jer", "jr", "jeremias"]),
  L(25, "Lamentaciones", "Lm", 5, "AT", ["lam", "lm", "lamentaciones"]),
  L(26, "Ezequiel", "Ez", 48, "AT", ["ez", "eze", "ezeq", "ezequiel"]),
  L(27, "Daniel", "Dn", 12, "AT", ["dan", "dn", "daniel"]),
  L(28, "Oseas", "Os", 14, "AT", ["os", "ose", "oseas"]),
  L(29, "Joel", "Jl", 3, "AT", ["jl", "joel"]),
  L(30, "Amós", "Am", 9, "AT", ["am", "amos"]),
  L(31, "Abdías", "Abd", 1, "AT", ["abd", "ab", "abdias"]),
  L(32, "Jonás", "Jon", 4, "AT", ["jon", "jns", "jonas"]),
  L(33, "Miqueas", "Mi", 7, "AT", ["miq", "mi", "miqueas"]),
  L(34, "Nahúm", "Nah", 3, "AT", ["nah", "na", "nahum"]),
  L(35, "Habacuc", "Hab", 3, "AT", ["hab", "habacuc"]),
  L(36, "Sofonías", "Sof", 3, "AT", ["sof", "so", "sofonias"]),
  L(37, "Hageo", "Hag", 2, "AT", ["hag", "hageo"]),
  L(38, "Zacarías", "Zac", 14, "AT", ["zac", "za", "zacarias"]),
  L(39, "Malaquías", "Mal", 4, "AT", ["mal", "malaquias"]),
  L(40, "Mateo", "Mt", 28, "NT", ["mt", "mat", "mateo"]),
  L(41, "Marcos", "Mr", 16, "NT", ["mr", "mc", "mar", "marcos"]),
  L(42, "Lucas", "Lc", 24, "NT", ["lc", "luc", "lucas"]),
  L(43, "Juan", "Jn", 21, "NT", ["jn", "jua", "juan"]),
  L(44, "Hechos", "Hch", 28, "NT", ["hch", "hech", "hechos", "hechos de los apostoles", "hc"]),
  L(45, "Romanos", "Ro", 16, "NT", ["ro", "rom", "romanos", "rm"]),
  L(46, "1 Corintios", "1 Co", 16, "NT", ["1 co", "1co", "1 cor", "1cor", "1 corintios", "1corintios"]),
  L(47, "2 Corintios", "2 Co", 13, "NT", ["2 co", "2co", "2 cor", "2cor", "2 corintios", "2corintios"]),
  L(48, "Gálatas", "Gá", 6, "NT", ["ga", "gal", "galatas", "gl"]),
  L(49, "Efesios", "Ef", 6, "NT", ["ef", "efe", "efesios"]),
  L(50, "Filipenses", "Fil", 4, "NT", ["fil", "flp", "fp", "filipenses"]),
  L(51, "Colosenses", "Col", 4, "NT", ["col", "colosenses"]),
  L(52, "1 Tesalonicenses", "1 Ts", 5, "NT", ["1 ts", "1ts", "1 tes", "1tes", "1 tesalonicenses", "1tesalonicenses"]),
  L(53, "2 Tesalonicenses", "2 Ts", 3, "NT", ["2 ts", "2ts", "2 tes", "2tes", "2 tesalonicenses", "2tesalonicenses"]),
  L(54, "1 Timoteo", "1 Ti", 6, "NT", ["1 ti", "1ti", "1 tim", "1tim", "1 timoteo", "1timoteo"]),
  L(55, "2 Timoteo", "2 Ti", 4, "NT", ["2 ti", "2ti", "2 tim", "2tim", "2 timoteo", "2timoteo"]),
  L(56, "Tito", "Tit", 3, "NT", ["tit", "tito", "tt"]),
  L(57, "Filemón", "Flm", 1, "NT", ["flm", "fl", "film", "filemon", "fm"]),
  L(58, "Hebreos", "He", 13, "NT", ["he", "heb", "hebreos", "hb"]),
  L(59, "Santiago", "Stg", 5, "NT", ["stg", "sant", "sgo", "santiago", "st"]),
  L(60, "1 Pedro", "1 P", 5, "NT", ["1 p", "1p", "1 pe", "1pe", "1 ped", "1 pedro", "1pedro"]),
  L(61, "2 Pedro", "2 P", 3, "NT", ["2 p", "2p", "2 pe", "2pe", "2 ped", "2 pedro", "2pedro"]),
  L(62, "1 Juan", "1 Jn", 5, "NT", ["1 jn", "1jn", "1 juan", "1juan"]),
  L(63, "2 Juan", "2 Jn", 1, "NT", ["2 jn", "2jn", "2 juan", "2juan"]),
  L(64, "3 Juan", "3 Jn", 1, "NT", ["3 jn", "3jn", "3 juan", "3juan"]),
  L(65, "Judas", "Jud", 1, "NT", ["jud", "judas"]),
  L(66, "Apocalipsis", "Ap", 22, "NT", ["ap", "apoc", "apocalipsis", "revelacion", "rev", "apc"]),
];

export const LIBRO_POR_ID = new Map(LIBROS.map((l) => [l.id, l]));

export function libroPorId(id: number): Libro {
  return LIBRO_POR_ID.get(id) ?? LIBROS[42];
}
