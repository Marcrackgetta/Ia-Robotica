import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  const reconocimientoRef = useRef(null);
  const escuchandoRef = useRef(false);
  const iniciadoRef = useRef(false);

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function detenerReconocimiento() {
    if (reconocimientoRef.current) {
      try {
        reconocimientoRef.current.stop();
      } catch (error) {
        console.log("El reconocimiento ya estaba detenido.");
      }
    }

    reconocimientoRef.current = null;
    escuchandoRef.current = false;
  }

  function obtenerVozEspanol() {
    const voces = window.speechSynthesis.getVoices();
    return voces.find((voz) =>
      voz.lang.toLowerCase().startsWith("es")
    );
  }

  function hablar(texto, alTerminar = null) {
    window.speechSynthesis.cancel();

    const mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-ES";
    mensaje.rate = 0.95;
    mensaje.pitch = 1;
    mensaje.volume = 1;

    const voz = obtenerVozEspanol();

    if (voz) {
      mensaje.voice = voz;
    }

    mensaje.onstart = () => {
      console.log("🔊 Informante hablando...");
    };

    mensaje.onend = () => {
      console.log("✅ Informante terminó.");
      if (alTerminar) {
        alTerminar();
      }
    };

    mensaje.onerror = (evento) => {
      console.log("❌ Error de voz:", evento.error);
      if (alTerminar) {
        alTerminar();
      }
    };

    window.speechSynthesis.speak(mensaje);
  }

/*   function escucharMateria() {
    // Código comentado del micrófono...
  } */

  function presentarInformante() {
    if (iniciadoRef.current) {
      return;
    }

    iniciadoRef.current = true;

    const presentacion =
      "Hola. Soy Tiburcio, su guía del área de informática de la Academia Naval Almirante Illingworth. Puedo mostrarte información sobre Soporte Técnico, Programación y Base de Datos, Sistemas Operativos y Redes, Diseño y Desarrollo Web y Aplicaciones Ofimáticas. ¿Qué materia deseas conocer?";

    // ✅ CORRECCIÓN: Se pasa 'null' porque escucharMateria está comentada
    hablar(presentacion, null);
  }

  useEffect(() => {
    let temporizador;

    function iniciarAutomaticamente() {
      const voces = window.speechSynthesis.getVoices();

      if (voces.length > 0) {
        presentarInformante();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          presentarInformante();
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    }

    temporizador = setTimeout(() => {
      iniciarAutomaticamente();
    }, 100);

    return () => {
      clearTimeout(temporizador);
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
      detenerReconocimiento();
    };
  }, []);

  return (
    <div className="contenedor">
      <h1>TIBURCIO</h1>
      <p>Informante del área de informática</p>

      <button
        className="boton soporte"
        onClick={() => navigate("/soporte")}
      >
        Soporte Técnico
      </button>

      <button
        className="boton programacion"
        onClick={() => navigate("/programacion")}
      >
        Programación y Base de Datos
      </button>

      <button
        className="boton redes"
        onClick={() => navigate("/redes")}
      >
        Sistemas Operativos y Redes
      </button>

      <button
        className="boton diseno"
        onClick={() => navigate("/diseno-web")}
      >
        Diseño y Desarrollo Web
      </button>

      <button
        className="boton ofimatica"
        onClick={() => navigate("/ofimatica")}
      >
        Aplicaciones Ofimáticas
      </button>
    </div>
  );
}

export default Inicio;