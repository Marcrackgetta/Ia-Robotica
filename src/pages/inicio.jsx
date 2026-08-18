import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hablar, actualizarHolograma } from "../voz";

function Inicio() {
  const navigate = useNavigate();
  const [escuchando, setEscuchando] = useState(false);

  // ==========================================
  // PRESENTACIÓN CON MEMORIA DE SESIÓN
  // ==========================================
  function presentarInformante() {
    // 1. Siempre actualizamos el holograma para que no se quede pegado 
    // con la información de la materia anterior.
    actualizarHolograma("TIBURCIO", "Esperando selección de materia o pregunta...");

    // 2. Verificamos en la memoria del navegador si ya hizo la presentación larga
    if (sessionStorage.getItem("tiburcio_presentado")) {
      return; // Si ya se presentó, cortamos la función aquí para que se quede callado.
    }

    // 3. Si es la primera vez, marcamos la memoria como "true" y lo hacemos hablar
    sessionStorage.setItem("tiburcio_presentado", "true");

    const presentacion =
      "Hola. Soy Tiburcio, su guía del área de informática de la Academia Naval Almirante Illingworth. Puedo mostrarte información sobre las materias. ¿Qué deseas conocer?";

    hablar(presentacion);
  }

  function preguntarATiburcio() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Edge.");
      return;
    }

    const reconocimiento = new SpeechRecognition();
    reconocimiento.lang = "es-ES";
    reconocimiento.interimResults = false;

    reconocimiento.onstart = () => {
      setEscuchando(true);
      window.speechSynthesis.cancel(); 
      actualizarHolograma("ESCUCHANDO...", "Dime, ¿en qué te puedo ayudar?");
    };

    reconocimiento.onresult = async (evento) => {
      const preguntaUsuario = evento.results[0][0].transcript;
      console.log("🗣️ Usuario dijo:", preguntaUsuario);
      
      const textoLimpioUsuario = preguntaUsuario.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (textoLimpioUsuario.includes("soporte")) {
        actualizarHolograma("NAVEGANDO", "Abriendo Soporte Técnico...");
        hablar("Enseguida. Te llevo al módulo de Soporte Técnico.");
        navigate("/soporte");
        return; 
      }
      
      if (textoLimpioUsuario.includes("programacion") || textoLimpioUsuario.includes("base de datos") || textoLimpioUsuario.includes("bases de datos")) {
        actualizarHolograma("NAVEGANDO", "Abriendo Programación y Base de Datos...");
        hablar("Perfecto. Vamos al módulo de Programación y Bases de Datos.");
        navigate("/programacion");
        return;
      }
      
      if (textoLimpioUsuario.includes("redes") || textoLimpioUsuario.includes("sistemas operativos")) {
        actualizarHolograma("NAVEGANDO", "Abriendo Sistemas Operativos y Redes...");
        hablar("Claro que sí. Abriendo Sistemas Operativos y Redes.");
        navigate("/redes");
        return;
      }
      
      if (textoLimpioUsuario.includes("diseno") || textoLimpioUsuario.includes("desarrollo web") || textoLimpioUsuario.includes("paginas web")) {
        actualizarHolograma("NAVEGANDO", "Abriendo Diseño y Desarrollo Web...");
        hablar("Muy bien. Entrando a Diseño y Desarrollo Web.");
        navigate("/diseno-web");
        return;
      }
      
      if (textoLimpioUsuario.includes("ofimatica") || textoLimpioUsuario.includes("aplicaciones ofimaticas") || textoLimpioUsuario.includes("excel") || textoLimpioUsuario.includes("word")) {
        actualizarHolograma("NAVEGANDO", "Abriendo Aplicaciones Ofimáticas...");
        hablar("Entendido. Te muestro Aplicaciones Ofimáticas.");
        navigate("/ofimatica");
        return;
      }

      actualizarHolograma("PENSANDO...", `Tú: "${preguntaUsuario}"`);

      try {
        const peticion = await fetch("http://localhost:3000/preguntar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pregunta: preguntaUsuario }),
        });

        if (!peticion.ok) throw new Error("Error en el servidor");

        const datos = await peticion.json();
        
        actualizarHolograma("TIBURCIO RESPONDE", datos.respuesta); 
        hablar(datos.respuesta); 

      } catch (error) {
        console.error("Error al consultar:", error);
        actualizarHolograma("ERROR DE CONEXIÓN", "No pude conectar con mi cerebro (Backend).");
        hablar("Lo siento, estoy experimentando problemas de conexión en este momento.");
      }
    };

    reconocimiento.onerror = (evento) => {
      console.error("🚨 Error en el micrófono:", evento.error);
      actualizarHolograma("ERROR DE AUDIO", `Motivo: ${evento.error}`);
      setEscuchando(false);
    };

    reconocimiento.onend = () => {
      setEscuchando(false);
    };

    reconocimiento.start();
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
    };
  }, []);

  return (
    <div className="contenedor">
      <h1>TIBURCIO</h1>
      <p>Informante del área de informática</p>

      <button 
        className="boton" 
        style={{ 
          backgroundColor: escuchando ? "#dc2626" : "#16a34a", 
          marginBottom: "30px",
          transform: escuchando ? "scale(1.05)" : "scale(1)",
          boxShadow: escuchando ? "0 0 15px #dc2626" : "none",
          transition: "all 0.3s ease"
        }}
        onClick={preguntarATiburcio}
      >
        {escuchando ? "🎙️ Te estoy escuchando..." : "🎤 Hablar con Tiburcio"}
      </button>

      <button className="boton soporte" onClick={() => navigate("/soporte")}>
        Soporte Técnico
      </button>

      <button className="boton programacion" onClick={() => navigate("/programacion")}>
        Programación y Base de Datos
      </button>

      <button className="boton redes" onClick={() => navigate("/redes")}>
        Sistemas Operativos y Redes
      </button>

      <button className="boton diseno" onClick={() => navigate("/diseno-web")}>
        Diseño y Desarrollo Web
      </button>

      <button className="boton ofimatica" onClick={() => navigate("/ofimatica")}>
        Aplicaciones Ofimáticas
      </button>
    </div>
  );
}

export default Inicio;