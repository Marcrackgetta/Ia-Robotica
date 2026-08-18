import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import soporte1 from "../img/soporte1.png";
import soporte2 from "../img/soporte2.png";
import soporte3 from "../img/soporte3.png";
import soporte4 from "../img/soporte4.png";

function SoporteTecnico() {
  const navigate = useNavigate();

  useEffect(() => {
    const mensaje = new SpeechSynthesisUtterance(
      "Bienvenido a Soporte Técnico. En esta materia aprenderás mantenimiento preventivo y correctivo de computadoras, identificación de componentes, diagnóstico de fallas y procedimientos para mantener los equipos funcionando correctamente."
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
    <div className="soporte-page">

      {/* Fondo decorativo */}
      <div className="soporte-grid"></div>

      <div className="soporte-glow glow-1"></div>
      <div className="soporte-glow glow-2"></div>
      <div className="soporte-glow glow-3"></div>

      {/* Contenido principal */}
      <main className="soporte-container">

        {/* Encabezado */}
        <header className="soporte-header">

          <div className="soporte-tag">
            <span className="tag-dot"></span>
            ÁREA DE INFORMÁTICA
          </div>

          <h1>
            SOPORTE
            <span> TÉCNICO</span>
          </h1>

          <div className="titulo-linea"></div>

          <p className="soporte-description">
            Mantenimiento, reparación y diagnóstico de hardware y software.
          </p>

        </header>

        {/* Tarjetas de contenido */}
        <section className="soporte-cards">

          {/* Tarjeta 1 */}
          <article className="soporte-card">

            <div className="card-number">
              01
            </div>

            <div className="card-image">
              <img
                src={soporte1}
                alt="Mantenimiento de computadoras"
              />
            </div>

            <div className="card-content">
              <span>HARDWARE</span>

              <h2>
                Mantenimiento Preventivo
              </h2>

              <p>
                Aprende técnicas para la limpieza, optimización y cuidado
                periódico de componentes de hardware.
              </p>
            </div>

          </article>

          {/* Tarjeta 2 */}
          <article className="soporte-card">

            <div className="card-number">
              02
            </div>

            <div className="card-image">
              <img
                src={soporte2}
                alt="Diagnóstico de fallas"
              />
            </div>

            <div className="card-content">
              <span>DIAGNÓSTICO</span>

              <h2>
                Detección de Fallas
              </h2>

              <p>
                Identifica y soluciona problemas comunes en el arranque,
                componentes defectuosos y errores del sistema.
              </p>
            </div>

          </article>

          {/* Tarjeta 3 */}
          <article className="soporte-card">

            <div className="card-number">
              03
            </div>

            <div className="card-image">
              <img
                src={soporte3}
                alt="Reparación y ensamblaje"
              />
            </div>

            <div className="card-content">
              <span>REPARACIÓN</span>

              <h2>
                Ensamblaje y Partes
              </h2>

              <p>
                Conoce la función de cada componente interno y realiza
                procedimientos de sustitución y armado.
              </p>
            </div>

          </article>

          {/* Tarjeta 4 */}
          <article className="soporte-card">

            <div className="card-number">
              04
            </div>

            <div className="card-image">
              <img
                src={soporte4}
                alt="Sistemas y Software"
              />
            </div>

            <div className="card-content">
              <span>SOFTWARE</span>

              <h2>
                Sistemas Operativos
              </h2>

              <p>
                Instalación, configuración de controladores y soporte técnico
                a nivel de software e interactividad.
              </p>
            </div>

          </article>

        </section>

        {/* Parte inferior */}
        <footer className="soporte-footer">

          <div className="footer-info">
            <span className="footer-line"></span>

            <p>
              HARDWARE • DIAGNÓSTICO • MANTENIMIENTO • INFORMÁTICA
            </p>
          </div>

          <button
            className="soporte-back"
            onClick={() => navigate("/")}
          >
            <span className="back-icon">←</span>
            Volver al menú
          </button>

        </footer>

      </main>

    </div>
  );
}

export default SoporteTecnico;