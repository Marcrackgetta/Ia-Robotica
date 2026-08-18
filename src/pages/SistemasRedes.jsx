import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import redes1 from "../img/redes1.png";
import redes2 from "../img/redes2.png";
import redes3 from "../img/redes3.png";
import redes4 from "../img/redes4.png";

function SistemasRedes() {
  const navigate = useNavigate();

  useEffect(() => {
    const mensaje = new SpeechSynthesisUtterance(
      "Bienvenido a Sistemas Operativos y Redes. En esta materia aprenderás cómo funcionan los sistemas operativos y cómo administrar computadoras. También estudiarás redes informáticas, dispositivos de comunicación, direcciones IP y conexión entre equipos."
    );

    mensaje.lang = "es-ES";
    mensaje.rate = 0.95;

    mensaje.onend = () => {
      const pregunta = new SpeechSynthesisUtterance(
        "¿Deseas conocer otra materia del área de informática?"
      );

      pregunta.lang = "es-ES";

      pregunta.onend = () => {
        navigate("/");
      };

      window.speechSynthesis.speak(pregunta);
    };

    window.speechSynthesis.speak(mensaje);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [navigate]);

  return (
    <div className="redes-page redes-theme">
      <div className="redes-grid"></div>
      <div className="redes-glow glow-1"></div>
      <div className="redes-glow glow-2"></div>
      <div className="redes-glow glow-3"></div>

      <main className="redes-container">
        <header className="redes-header">
          <div className="redes-tag">
            <span className="tag-dot"></span>
            ÁREA DE INFORMÁTICA
          </div>

          <h1>
            SISTEMAS &
            <span> REDES</span>
          </h1>

          <div className="titulo-linea"></div>

          <p className="redes-description">
            Administración de sistemas operativos y conectividad de redes informáticas.
          </p>
        </header>

        <section className="redes-cards">
          <article className="redes-card">
            <div className="card-number">01</div>
            <div className="card-image">
              <img src={redes1} alt="Sistemas Operativos" />
            </div>
            <div className="card-content">
              <span>S.O.</span>
              <h2>Gestión de Sistemas</h2>
              <p>Instalación, control de procesos y administración de privilegios en entornos operativos.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">02</div>
            <div className="card-image">
              <img src={redes2} alt="Redes de Computadoras" />
            </div>
            <div className="card-content">
              <span>TOPOLOGÍAS</span>
              <h2>Redes LAN y WAN</h2>
              <p>Estructuración de redes físicas y lógicas, modelos de comunicación y medios de transmisión.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">03</div>
            <div className="card-image">
              <img src={redes3} alt="Direccionamiento IP" />
            </div>
            <div className="card-content">
              <span>CONEXIÓN</span>
              <h2>Direccionamiento IP</h2>
              <p>Configuración de subredes, enrutadores, puertas de enlace y protocolos de red.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">04</div>
            <div className="card-image">
              <img src={redes4} alt="Seguridad y Servicios" />
            </div>
            <div className="card-content">
              <span>SEGURIDAD</span>
              <h2>Servicios y Servidores</h2>
              <p>Implementación de servicios de red básicos, seguridad perimetral y diagnóstico de tráfico.</p>
            </div>
          </article>
        </section>

        <footer className="soporte-footer">
          <div className="footer-info">
            <span className="footer-line"></span>
            <p>SISTEMAS OPERATIVOS • REDES • IP • SEGURIDAD</p>
          </div>

          <button className="soporte-back" onClick={() => navigate("/")}>
            <span className="back-icon">←</span>
            Volver al menú
          </button>
        </footer>
      </main>
    </div>
  );
}

export default SistemasRedes;