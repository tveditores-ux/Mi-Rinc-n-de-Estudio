import type { SVGProps } from "react";

const RUTAS: Record<string, string> = {
  deshacer: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
  rehacer: "m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13",
  tachado: "M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 1.5 7.3A4 4 0 0 1 8 18M4 12h16",
  alinIzq: "M4 6h16M4 12h10M4 18h14",
  alinCentro: "M4 6h16M7 12h10M5 18h14",
  alinDer: "M4 6h16M10 12h10M6 18h14",
  justificar: "M4 6h16M4 12h16M4 18h16",
  listaVinetas: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  listaNumerada: "M10 6h10M10 12h10M10 18h10M4 5h1v4M4 9h2M4 14h2a1 1 0 0 1 0 2l-2 2h2",
  sangriaMas: "M3 8l4 4-4 4M11 6h10M11 12h10M11 18h10M3 6v0",
  sangriaMenos: "M7 8l-4 4 4 4M11 6h10M11 12h10M11 18h10",
  linea: "M4 12h16",
  cita: "M6 17a4 4 0 0 1 4-4V7a8 8 0 0 0-6 8v2h2zm10 0a4 4 0 0 1 4-4V7a8 8 0 0 0-6 8v2h2z",
  borrador: "m7 21-4.3-4.3a1 1 0 0 1 0-1.4l9.6-9.6a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.8L13 19M22 21H7M5 11l9 9",
  buscar: "m21 21-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z",
  imprimir: "M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z",
  descargar: "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  guardar: "M5 3h11l3 3v15H5zM8 3v5h7V3M7 21v-7h10v7",
  reproducir: "M7 4v16l13-8z",
  pausa: "M7 4h4v16H7zM13 4h4v16h-4z",
  detener: "M6 6h12v12H6z",
  anterior: "M18 5v14L8 12zM6 5v14",
  siguiente: "M6 5v14l10-7zM18 5v14",
  volumen: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9.5 9.5 0 0 1 0 14",
  voz: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm7-3a7 7 0 0 1-14 0M12 19v3M8 22h8",
  libro: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  zoomMas: "m21 21-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0zM10.5 8v5M8 10.5h5",
  zoomMenos: "m21 21-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0zM8 10.5h5",
  restaurar: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
  copiar: "M8 8h12v12H8zM16 8V4H4v12h4",
  cerrar: "M6 6l12 12M18 6 6 18",
  menu: "M4 6h16M4 12h16M4 18h16",
  cursor: "M4 4h6M7 4v16M4 20h6M14 8h6M17 8v8M14 16h6",
  panel: "M3 4h18v16H3zM15 4v16",
  archivo: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mas: "M12 5v14M5 12h14",
  reloj: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  tipografia: "M4 7V4h16v3M9 20h6M12 4v16",
  flechaAbajo: "m6 9 6 6 6-6",
  ojo: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  papelera: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6",
  simbolo: "M7 8a5 5 0 1 1 8.5 3.5L12 15M12 19h.01",
  fecha: "M4 5h16v16H4zM4 10h16M8 3v4M16 3v4",
  actualizar: "M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6",
  marcador: "M5 4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-7-4-7 4V4.5Z",
  ajustes: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  biblia: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5M12 7v6M9.5 9.5h5",
};

interface Props extends SVGProps<SVGSVGElement> {
  nombre: keyof typeof RUTAS | string;
  tamano?: number;
}

export function Icono({ nombre, tamano = 18, ...resto }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamano}
      height={tamano}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...resto}
    >
      <path d={RUTAS[nombre] ?? ""} />
    </svg>
  );
}
