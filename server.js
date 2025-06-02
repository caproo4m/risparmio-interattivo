const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Nuova sintassi
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { income } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Sei un esperto di risparmio personale." },
        { role: "user", content: `Ho ${income} euro al mese. Fammi un piano di risparmio dettagliato.` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error("Errore chiamata OpenAI:", err);
    res.status(500).json({ error: "Errore nel generare il piano" });
  }
});

app.listen(3000, () => console.log("✅ Server attivo su http://localhost:3000"));
