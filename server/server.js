import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicialización corregida de Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/preguntar", async (req, res) => {
  try {
    const pregunta = req.body.pregunta;

    if (!pregunta) {
      return res.status(400).json({ respuesta: "Por favor, ingresa una pregunta válida." });
    }

    console.log("Procesando pregunta:", pregunta);

    const respuesta = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
      Eres Tiburcio, la inteligencia artificial especializada en informática de la Academia Naval Almirante Illingworth.
      
      Categorías de especialidad:
      - Soporte Técnico
      - Programación y bases de datos
      - Sistemas operativos y redes
      - Desarrollo web
      - Aplicaciones ofimáticas
      
      Pregunta del usuario:
      ${pregunta}
      `,
    });

    res.json({
      respuesta: respuesta.text,
    });

  } catch (error) {
    console.error("Error en Gemini:", error);

    if (error.status === 503) {
      return res.status(503).json({
        respuesta: "Mis sistemas tácticos están un poco saturados por la alta demanda en la red. Soy un tiburón ocupado, soldado. Intenta preguntarme de nuevo en unos segundos.",
      });
    }

    res.status(500).json({
      respuesta: "He perdido conexión con el servidor central. Por favor, intenta de nuevo más tarde.",
    });

  } // Se añadió la llave de cierre que faltaba
}); // Se añadió la llave y paréntesis de cierre que faltaba

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor de IA iniciado en el puerto ${PORT}`);
});