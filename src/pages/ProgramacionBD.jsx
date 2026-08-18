import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import programacionBD1 from "../img/programacionBD1.png";
import programacionBD2 from "../img/programacionBD2.png";
import programacionBD3 from "../img/programacionBD3.png";
import programacionBD4 from "../img/programacionBD4.png";

import { hablar, actualizarHolograma } from "../voz";

function ProgramacionBD() {
  const navigate = useNavigate();

  useEffect(() => {
    actualizarHolograma(
      "PROGRAMACIÓN Y BD",
      "Creación de programas y administración de bases de datos.",
      programacionBD1
    );

    hablar(
      "Bienvenido a Programación y Base de Datos. En esta materia aprenderás sobre lógica de programación, desarrollo de software, algoritmos y gestión de bases de datos.",
      () => {
        hablar("¿Deseas conocer otra materia del área de informática?", () => navigate("/"));
      }
    );

    return () => window.speechSynthesis.cancel();
  }, [navigate]);

  return (
    <div className="programacion-page">
      {/* Fondo decorativo */}
      <div className="programacion-grid"></div>

      <div className="programacion-glow glow-1"></div>
      <div className="programacion-glow glow-2"></div>
      <div className="programacion-glow glow-3"></div>

      {/* Contenido principal */}
      <main className="programacion-container">
        {/* Encabezado */}
        <header className="programacion-header">
          <div className="programacion-tag">
            <span className="tag-dot"></span>
            ÁREA DE INFORMÁTICA
          </div>

          <h1>
            PROGRAMACIÓN
            <span> Y BASE DE DATOS</span>
          </h1>

          <div className="titulo-linea"></div>

          <p className="programacion-description">
            Creación de programas y administración de bases de datos.
          </p>
        </header>

        {/* Tarjetas de contenido */}
        <section className="programacion-cards">
          {/* Tarjeta 1 */}
          <article className="programacion-card">
            <div className="card-number">01</div>
            <div className="card-image">
              <img
                src={programacionBD1}
                alt="Programación y Base de Datos"
              />
            </div>
            <div className="card-content">
              <span>PROGRAMACIÓN</span>
              <h2>Desarrollo de programas</h2>
              <div className="card-linea"></div>
              <p>
                Aprende a crear soluciones mediante
                algoritmos y lenguajes de programación.
              </p>
            </div>
          </article>

          {/* Tarjeta 2 */}
          <article className="programacion-card">
            <div className="card-number">02</div>
            <div className="card-image">
              <img
                src={programacionBD2}
                alt="Programación"
              />
            </div>
            <div className="card-content">
              <span>ALGORITMOS</span>
              <h2>Lógica de programación</h2>
              <div className="card-linea"></div>
              <p>
                Aprende a organizar instrucciones y
                resolver problemas de manera estructurada.
              </p>
            </div>
          </article>

          {/* Tarjeta 3 */}
          <article className="programacion-card">
            <div className="card-number">03</div>
            <div className="card-image">
              <img
                src={programacionBD3}
                alt="Base de Datos"
              />
            </div>
            <div className="card-content">
              <span>BASE DE DATOS</span>
              <h2>Gestión de información</h2>
              <div className="card-linea"></div>
              <p>
                Organiza, almacena y administra información
                utilizando estructuras de bases de datos.
              </p>
            </div>
          </article>

          {/* Tarjeta 4 */}
          <article className="programacion-card">
            <div className="card-number">04</div>
            <div className="card-image">
              <img
                src={programacionBD4}
                alt="Bases de Datos"
              />
            </div>
            <div className="card-content">
              <span>TECNOLOGÍA</span>
              <h2>Datos y sistemas</h2>
              <div className="card-linea"></div>
              <p>
                Comprende cómo los programas y las bases
                de datos trabajan juntos.
              </p>
            </div>
          </article>
        </section>

        {/* Parte inferior */}
        <footer className="programacion-footer">
          <div className="footer-info">
            <span className="footer-line"></span>
            <p>PROGRAMACIÓN • BASE DE DATOS • INFORMÁTICA</p>
          </div>

          <button
            className="programacion-back"
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

export default ProgramacionBD;