import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // 1. Extract data if needed (e.g., if the user sends custom context)
    // const { customData } = await req.json();

    const promptText =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // 2. Call the Gemini Model
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      prompt: promptText,
      maxOutputTokens: 400, // Fixed naming for Vercel AI SDK 5.0+
      temperature: 0.8,
    });

    // 3. Return the stream
    return result.toTextStreamResponse();

  } catch (error: any) {
    // 4. Detailed Error Handling
    console.error('Gemini Pipeline Error:', error);

    // Check if it's a specific API error (like 401, 429, or 500)
    const status = error.status || 500;
    const message = error.message || 'An unexpected error occurred';

    // Return a structured JSON error response
    return NextResponse.json(
      { 
        success: false, 
        error: message,
        // Optional: hide detailed error in production for security
        type: error.name || 'InternalServerError' 
      }, 
      { status }
    );
  }
}