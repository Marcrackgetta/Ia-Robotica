import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import ofimatica1 from "../img/ofimatica1.png";
import ofimatica2 from "../img/ofimatica2.png";
import ofimatica3 from "../img/ofimatica3.png";
import ofimatica4 from "../img/ofimatica4.png";

function Ofimatica() {
  const navigate = useNavigate();

  useEffect(() => {
    const mensaje = new SpeechSynthesisUtterance(
      "Bienvenido a Aplicaciones Ofimáticas. En esta materia aprenderás a utilizar herramientas como Word, Excel y PowerPoint. Aprenderás a crear documentos, trabajar con hojas de cálculo, organizar información y desarrollar presentaciones digitales."
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
    <div className="ofimatica-page ofimatica-theme">
      <div className="ofimatica-grid"></div>
      <div className="ofimatica-glow glow-1"></div>
      <div className="ofimatica-glow glow-2"></div>
      <div className="ofimatica-glow glow-3"></div>

      <main className="ofimatica-container">
        <header className="ofimatica-header">
          <div className="ofimatica-tag">
            <span className="tag-dot"></span>
            ÁREA DE INFORMÁTICA
          </div>

          <h1>
            APLICACIONES
            <span> OFIMÁTICAS</span>
          </h1>

          <div className="titulo-linea"></div>

          <p className="soporte-description">
            Uso profesional de Word, Excel, PowerPoint y herramientas de productividad.
          </p>
        </header>

        <section className="soporte-cards">
          <article className="soporte-card">
            <div className="card-number">01</div>
            <div className="card-image">
              <img src={ofimatica1} alt="Procesador de Texto" />
            </div>
            <div className="card-content">
              <span>DOCUMENTOS</span>
              <h2>Procesador de Texto</h2>
              <p>Creación de informes profesionales, formato de texto y tablas avanzadas con Word.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">02</div>
            <div className="card-image">
              <img src={ofimatica2} alt="Hojas de Cálculo" />
            </div>
            <div className="card-content">
              <span>DATOS</span>
              <h2>Hojas de Cálculo</h2>
              <p>Manejo de fórmulas, funciones matemáticas, bases de datos y gráficos con Excel.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">03</div>
            <div className="card-image">
              <img src={ofimatica3} alt="Presentaciones Digitales" />
            </div>
            <div className="card-content">
              <span>DISEÑO VISUAL</span>
              <h2>Presentaciones</h2>
              <p>Estructuración de diapositivas interactivas, animaciones y recursos con PowerPoint.</p>
            </div>
          </article>

          <article className="soporte-card">
            <div className="card-number">04</div>
            <div className="card-image">
              <img src={ofimatica4} alt="Herramientas Cloud" />
            </div>
            <div className="card-content">
              <span>NUBE</span>
              <h2>Productividad Cloud</h2>
              <p>Almacenamiento en la nube y trabajo colaborativo en tiempo real.</p>
            </div>
          </article>
        </section>

        <footer className="soporte-footer">
          <div className="footer-info">
            <span className="footer-line"></span>
            <p>WORD • EXCEL • POWERPOINT • CLOUD</p>
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

export default Ofimatica;