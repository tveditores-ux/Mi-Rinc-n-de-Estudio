import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type EstadoVoz = "inactivo" | "hablando" | "pausado";

export interface Fragmento {
  texto: string;
  bloque: number;
}

interface Preferencias {
  vozUri: string;
  velocidad: number;
  tono: number;
  volumen: number;
}

const PREFERENCIAS_INICIALES: Preferencias = { vozUri: "", velocidad: 0.95, tono: 1, volumen: 1 };

export function useVoz() {
  const soportado = typeof window !== "undefined" && "speechSynthesis" in window;
  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>([]);
  const [prefs, setPrefs] = useLocalStorage<Preferencias>("escritorio-voz-v1", PREFERENCIAS_INICIALES);
  const [estado, setEstado] = useState<EstadoVoz>("inactivo");
  const [indiceActual, setIndiceActual] = useState(-1);
  const [fragmentos, setFragmentos] = useState<Fragmento[]>([]);

  const fragmentosRef = useRef<Fragmento[]>([]);
  const canceladoRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const arranqueRef = useRef<number | null>(null);
  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;

  // Cargar las voces del sistema (algunos navegadores las entregan de forma asíncrona).
  useEffect(() => {
    if (!soportado) return;
    const cargar = () => {
      const lista = window.speechSynthesis.getVoices();
      if (lista.length) {
        const ordenadas = [...lista].sort((a, b) => {
          const ea = a.lang.toLowerCase().startsWith("es") ? 0 : 1;
          const eb = b.lang.toLowerCase().startsWith("es") ? 0 : 1;
          if (ea !== eb) return ea - eb;
          if (a.localService !== b.localService) return a.localService ? -1 : 1;
          return a.name.localeCompare(b.name);
        });
        setVoces(ordenadas);
      }
    };
    cargar();
    window.speechSynthesis.addEventListener("voiceschanged", cargar);
    const reintento = setTimeout(cargar, 800);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", cargar);
      clearTimeout(reintento);
    };
  }, [soportado]);

  const vozActual = useMemo(() => {
    if (!voces.length) return null;
    const elegida = voces.find((v) => v.voiceURI === prefs.vozUri);
    if (elegida) return elegida;
    return (
      voces.find((v) => /^es[-_](mx|es|us|419)/i.test(v.lang)) ??
      voces.find((v) => v.lang.toLowerCase().startsWith("es")) ??
      voces[0]
    );
  }, [voces, prefs.vozUri]);
  const vozRef = useRef<SpeechSynthesisVoice | null>(null);
  vozRef.current = vozActual;

  const limpiar = useCallback(() => {
    setEstado("inactivo");
    setIndiceActual(-1);
    utteranceRef.current = null;
  }, []);

  const hablarFragmento = useCallback(
    (i: number) => {
      const lista = fragmentosRef.current;
      if (canceladoRef.current) return;
      if (i >= lista.length) {
        limpiar();
        return;
      }
      const u = new SpeechSynthesisUtterance(lista[i].texto);
      const voz = vozRef.current;
      if (voz) {
        u.voice = voz;
        u.lang = voz.lang;
      } else {
        u.lang = "es-ES";
      }
      u.rate = prefsRef.current.velocidad;
      u.pitch = prefsRef.current.tono;
      u.volume = prefsRef.current.volumen;
      u.onend = () => {
        if (canceladoRef.current) return;
        hablarFragmento(i + 1);
      };
      u.onerror = (e) => {
        if (canceladoRef.current || e.error === "interrupted" || e.error === "canceled") return;
        hablarFragmento(i + 1);
      };
      utteranceRef.current = u;
      setIndiceActual(i);
      setEstado("hablando");
      window.speechSynthesis.speak(u);
    },
    [limpiar],
  );

  const detener = useCallback(() => {
    if (!soportado) return;
    if (arranqueRef.current) {
      window.clearTimeout(arranqueRef.current);
      arranqueRef.current = null;
    }
    canceladoRef.current = true;
    window.speechSynthesis.cancel();
    limpiar();
  }, [soportado, limpiar]);

  const hablar = useCallback(
    (lista: Fragmento[], desde = 0) => {
      if (!soportado || lista.length === 0) return;
      canceladoRef.current = true;
      window.speechSynthesis.cancel();
      fragmentosRef.current = lista;
      setFragmentos(lista);
      if (arranqueRef.current) window.clearTimeout(arranqueRef.current);
      // Pequeña pausa: algunos navegadores ignoran un speak() inmediato tras cancel().
      arranqueRef.current = window.setTimeout(() => {
        arranqueRef.current = null;
        canceladoRef.current = false;
        hablarFragmento(Math.max(0, Math.min(desde, lista.length - 1)));
      }, 80);
    },
    [soportado, hablarFragmento],
  );

  const pausar = useCallback(() => {
    if (!soportado || estado !== "hablando") return;
    window.speechSynthesis.pause();
    setEstado("pausado");
  }, [soportado, estado]);

  const reanudar = useCallback(() => {
    if (!soportado || estado !== "pausado") return;
    window.speechSynthesis.resume();
    setEstado("hablando");
  }, [soportado, estado]);

  const saltar = useCallback(
    (delta: number) => {
      const destino = indiceActual + delta;
      if (destino < 0 || destino >= fragmentosRef.current.length) return;
      hablar(fragmentosRef.current, destino);
    },
    [indiceActual, hablar],
  );

  const irA = useCallback(
    (indice: number) => {
      hablar(fragmentosRef.current, indice);
    },
    [hablar],
  );

  const probarVoz = useCallback(() => {
    hablar([{ texto: "Porque por gracia ustedes han sido salvados mediante la fe; esto no procede de ustedes, sino que es el regalo de Dios.", bloque: 0 }]);
  }, [hablar]);

  // Detener al desmontar.
  useEffect(() => {
    return () => {
      if (soportado) {
        canceladoRef.current = true;
        window.speechSynthesis.cancel();
      }
    };
  }, [soportado]);

  const actualizarPrefs = useCallback(
    (parcial: Partial<Preferencias>) => setPrefs((p) => ({ ...p, ...parcial })),
    [setPrefs],
  );

  return {
    soportado,
    voces,
    vozActual,
    prefs,
    actualizarPrefs,
    estado,
    indiceActual,
    fragmentos,
    hablar,
    pausar,
    reanudar,
    detener,
    saltar,
    irA,
    probarVoz,
  };
}

export type Voz = ReturnType<typeof useVoz>;
