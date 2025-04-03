import { OpenAI } from "openai";

// Distance to the hill
const distance = 100;

// Create prompt including inputs should include chain of thought
const boot_sequence = `left left up right`;

// Define the skills and their parameters
const skillsInfo = `
Here are some skills you have:

skill: book_trip
parameters: location, when, budget, currency

skill: find_hotel
parameters: location, check_in, check_out, budget

skill: order_food
parameters: cuisine, delivery_address, payment_method

Figure out which skill to use based on a user's prompt and extract the necessary parameters.
Respond with the extracted data in JSON format with columns: skill, parameters, extracted_data.
`;

// User input (replace this with actual user input)
const user_input = "Indicación: I want to book a place to stay in New York .";

// Create the prompt for the language model
const prompt = `
${skillsInfo}
User prompt: ${user_input}
Extract the following information from the user's prompt: location, when, budget, currency.
Respond with the extracted data in JSON format.
`;

// Call the language model with the prompt
const messages = [
  {
    role: "developer",
    content: "You are an expert in extracting structured data from user prompts. Use the provided skills and parameters to determine the appropriate skill and extract the necessary information."
  },
  {
    role: "user",
    content: prompt
  }
];

// Create client
const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

// Send the request
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: messages,
});



// Print the answer
console.log(completion.choices[0]?.message?.content);
