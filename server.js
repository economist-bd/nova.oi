// server.js - The Backend Brain 🧠

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads the API key from the .env file

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Express app and the Google AI model
const app = express();
const PORT = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware to handle JSON data and enable CORS
app.use(express.json());
app.use(cors()); // Allows your frontend to talk to this server

// Define the main chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // A simple instruction for the AI model
    const prompt = `You are Nova, a helpful AI assistant. You are speaking with a user from Bangladesh. Please respond in a friendly and helpful manner, primarily in Bengali. User's message: "${userMessage}"`;

    // Send the prompt to the Gemini API
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();

    // Send the AI's response back to the frontend
    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});