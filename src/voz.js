// src/voz.js
export function obtenerVozEspanol() {
  const voces = window.speechSynthesis.getVoices();
  const nombresMasculinos = ["pablo", "alvaro", "tomas", "jorge", "carlos", "diego"];
  
  let vozTiburcio = voces.find(voz => 
    voz.lang.toLowerCase().startsWith("es") && 
    nombresMasculinos.some(nombre => voz.name.toLowerCase().includes(nombre)) &&
    (voz.name.includes("Natural") || voz.name.includes("Online") || voz.name.includes("Neural"))
  );

  if (!vozTiburcio) {
    vozTiburcio = voces.find(voz => 
      voz.lang.toLowerCase().startsWith("es") && 
      nombresMasculinos.some(nombre => voz.name.toLowerCase().includes(nombre))
    );
  }

  return vozTiburcio || voces.find((voz) => voz.lang.toLowerCase().startsWith("es"));
}

export function limpiarTextoParaVoz(texto) {
  if (!texto) return "";
  return texto
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
    .replace(/[*#_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function hablar(texto, alTerminar = null) {
  window.speechSynthesis.cancel();
  
  const textoLimpio = limpiarTextoParaVoz(texto);
  const mensaje = new SpeechSynthesisUtterance(textoLimpio);

  mensaje.lang = "es-ES";
  mensaje.rate = 1.0; 
  mensaje.pitch = 0.6; // Tono grave de Tiburón
  mensaje.volume = 1;

  const voz = obtenerVozEspanol();
  if (voz) mensaje.voice = voz;

  if (alTerminar) {
    mensaje.onend = alTerminar;
  }

  window.speechSynthesis.speak(mensaje);
}

export function actualizarHolograma(titulo, texto, imagen = null) {
  const canal = new BroadcastChannel("tiburcio-holograma");
  canal.postMessage({ titulo, texto, imagen });
}