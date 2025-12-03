import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';

const app = express();

app.use(cors({
  origin: [
    'http://127.0.0.1:5500', 'http://localhost:5500',
    'http://127.0.0.1', 'http://localhost',
  ]
}));
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ error: 'Prompt kosong bro!' });
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Kamu adalah asisten cerdas dan ramah. Jawab dalam bahasa yang sama dengan user." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_completion_tokens: 2048,
    });

    const result = completion.choices[0]?.message?.content || "";
    res.json({ result });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>GROQ API SUDAH NYALA BRO!</h1><p>POST ke /generate-text → { "prompt": "apa aja" }</p>');
});

app.listen(3000, () => {
  console.log('Server Groq jalan mantap di http://localhost:3000');
});