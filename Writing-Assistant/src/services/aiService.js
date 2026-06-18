import axios from 'axios';

// Retrieve the OpenRouter API key from Vite environment variables.
// Vite only exposes variables prefixed with VITE_ at build/runtime.
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = import.meta.env.VITE_AI_MODEL || 'openai/gpt-3.5-turbo';

export async function sendMessage(messages) {
  // Ensure the API key is present before making the request.
  // Detect missing or placeholder API key.
  if (!API_KEY || API_KEY === 'your_openrouter_api_key_here') {
    console.error('OpenRouter API key is missing or not set to a real value.');
    return {
      response: 'API key is missing or invalid. Please set VITE_OPENROUTER_API_KEY in the .env file with a valid OpenRouter key.',
      success: false,
    };
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      response: response.data?.choices?.[0]?.message?.content ?? 'No response content',
      success: true,
    };
  } catch (error) {
    // Provide more detailed error information for debugging.
    const status = error?.response?.status;
    const statusText = error?.response?.statusText;
    console.error(`Error calling AI API (status ${status} ${statusText}):`, error);
    return {
      response: `AI request failed (status ${status}). Please check your API key and usage limits.`,
      success: false,
    };
  }
}

export function generatePrompt(template, input) {
  // Combine template with user input
  return `${template}: ${input}`;
}