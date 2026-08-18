import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import diseno1 from "../img/diseno1.png";
import diseno2 from "../img/diseno2.png";
import diseno3 from "../img/diseno3.png";
import diseno4 from "../img/diseno4.png";

function DisenoWeb() {
  const navigate = useNavigate();

  useEffect(() => {
    const mensaje = new SpeechSynthesisUtterance(
      "Bienvenido a Diseño y Desarrollo Web. En esta materia aprenderás a estructurar sitios web con HTML, aplicar estilos con CSS y crear páginas dinámicas e interactivas utilizando JavaScript."
    );
    mensaje.lang = "es-ES";
    mensaje.rate = 0.95;

    mensaje.onend = () => {
      const pregunta = new SpeechSynthesisUtterance(
        "¿Deseas conocer otra materia del área de informática?"
      );
      pregunta.lang = "es-ES";
      pregunta.onend = () => navigate("/");
      window.speechSynthesis.speak(pregunta);
    };

    window.speechSynthesis.speak(mensaje);
    return () => window.speechSynthesis.cancel();
  }, [navigate]);

  return (
    <div className="diseno-page">
      <div className="materia-grid"></div>
      <div className="materia-glow glow-1"></div>
      <div className="materia-glow glow-2"></div>

      <main className="materia-container">
        <header className="materia-header">
          <div className="materia-tag">
            <span className="tag-dot"></span>
            ÁREA DE INFORMÁTICA
          </div>
          <h1>
            DISEÑO <span>WEB</span>
          </h1>
          <div className="titulo-linea"></div>
          <p className="materia-description">
            Creación de sitios web modernos, maquetación responsive e interactividad.
          </p>
        </header>

        <section className="materia-cards">
          <article className="materia-card">
            <div className="card-number">01</div>
            <div className="card-image">
              <img src={diseno1} alt="Maquetación Web" />
            </div>
            <div className="card-content">
              <span>ESTRUCTURA Y ESTILO</span>
              <h2>HTML5 & CSS3</h2>
              <p>Estructuración semántica, hojas de estilo, Flexbox y CSS Grid layout.</p>
            </div>
          </article>

          <article className="materia-card">
            <div className="card-number">02</div>
            <div className="card-image">
              <img src={diseno2} alt="Diseño Responsive" />
            </div>
            <div className="card-content">
              <span>ADAPTABILIDAD</span>
              <h2>Diseño Responsive</h2>
              <p>Optimización para dispositivos móviles, tablets y escritorios mediante Media Queries.</p>
            </div>
          </article>

          <article className="materia-card">
            <div className="card-number">03</div>
            <div className="card-image">
              <img src={diseno3} alt="JavaScript Interactivo" />
            </div>
            <div className="card-content">
              <span>DINAMISMO</span>
              <h2>JavaScript</h2>
              <p>Lógica del lado del cliente, manipulación del DOM y eventos interactivos.</p>
            </div>
          </article>

          <article className="materia-card">
            <div className="card-number">04</div>
            <div className="card-image">
              <img src={diseno4} alt="Librerías y Frameworks" />
            </div>
            <div className="card-content">
              <span>DESARROLLO MODERNO</span>
              <h2>Frameworks & UI</h2>
              <p>Uso de librerías modernas como React para la creación de interfaces dinámicas.</p>
            </div>
          </article>
        </section>

        <footer className="materia-footer">
          <div className="footer-info">
            <span className="footer-line"></span>
            <p>HTML5 • CSS3 • JAVASCRIPT • REACT</p>
          </div>
          <button className="materia-back" onClick={() => navigate("/")}>
            <span className="back-icon">←</span> Volver al menú
          </button>
        </footer>
      </main>
    </div>
  );
}

export default DisenoWeb;