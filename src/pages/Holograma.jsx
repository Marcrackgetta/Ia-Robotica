import { useEffect, useState } from "react";

function Holograma() {
  const [contenido, setContenido] = useState({
    titulo: "TIBURCIO",
    texto: "Sistema holográfico listo.",
    imagen: null,
  });

  useEffect(() => {
    const canal = new BroadcastChannel("tiburcio-holograma");

    canal.onmessage = (evento) => {
      if (!evento.data) {
        return;
      }

      setContenido({
        titulo: evento.data.titulo || "TIBURCIO",
        texto:
          evento.data.texto || "Sistema holográfico listo.",
        imagen: evento.data.imagen || null,
      });
    };

    return () => {
      canal.close();
    };
  }, []);

  return (
    <div className="pantalla-holograma">

      <div className="proyeccion">
        <div className="proyeccion-panel">

          <h1>{contenido.titulo}</h1>

          {contenido.imagen && (
            <img
              src={contenido.imagen}
              alt={contenido.titulo}
            />
          )}

          <p>{contenido.texto}</p>

        </div>
      </div>

      <div className="base-holograma">

        <div className="punto-holograma punto-arriba" />

        <div className="punto-holograma punto-abajo" />

        <div className="punto-holograma punto-izquierda" />

        <div className="punto-holograma punto-derecha" />

      </div>

    </div>
  );
}

export default Holograma;