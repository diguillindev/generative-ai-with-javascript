import { OpenAI } from "openai";

// 1. Define el mensaje del sistema ("developer" o "system")
const systemMessage = {
  role: "developer", // O "developer", dependiendo del modelo
  content: "Soy un asistente de viajes amigable y entusiasta que ama compartir historias e ideas únicas sobre destinos turísticos."
};
// Define the context

const messages = [
  systemMessage, // Incluye el mensaje del sistema al inicio
  {
     "role": "user",
     "content": "I want to book a trip to Chile."
  },
  {
     "role": "assistant",
     "content": "Sure, when would you like to go?"
  },
  {
     "role": "user",
     "content": "Next month would be great."
  },
  {
     "role": "assistant",
     "content": "Got it, where in Chile would you like to visit?"
  },
  {
     "role": "user",
     "content": "I'm thinking of Valdivia. Tell me more about it."
  }
 ];

 // Create the web request

let temperature = 0.7; // Set the temperature to 0.5  ajustar la temperatura según el contexto de tu conversación

 // decide on the context window size

let max_tokens = 4096; // Set the context window size

 const openai = new OpenAI({
   baseURL: "https://models.inference.ai.azure.com",
   apiKey: process.env.GITHUB_TOKEN,
 });


 // 3. Send the request
 // -----------------------------------
 const completion = await openai.chat.completions.create({
     model: 'gpt-4o-mini',
     messages: messages,
     max_tokens: max_tokens,
     temperature: temperature,
 });


 // 4. Print the answer
 // -----------------------------------

 console.log(completion.choices[0]?.message?.content);
