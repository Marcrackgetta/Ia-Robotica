import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/preguntar", async (req, res) => {
  try {
    const pregunta = req.body.pregunta;

    const respuesta = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
      Eres Tiburcio, la inteligencia artificial especializada en informática de la Academia Naval Almirante Illingworth.

      Categorías:

      - Soporte técnico
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
    console.log(error);

    res.status(500).json({
      respuesta: "Ocurrió un error.",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});