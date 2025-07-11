// server.js - The Backend Brain 🧠

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const prompt = `You are Nova, a helpful AI assistant. You are speaking with a user from Bangladesh. Please respond in a friendly and helpful manner, primarily in Bengali. User's message: "${userMessage}"`;
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to get response from AI', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
