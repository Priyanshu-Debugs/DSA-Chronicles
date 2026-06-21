import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not defined.");
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Map messages array to Gemini API format (role must be 'user' or 'model')
    const contents = messages.map((m: { role: string; content: string }) => {
      const apiRole = m.role === "assistant" ? "model" : "user";
      return {
        role: apiRole,
        parts: [{ text: m.content }],
      };
    });

    const systemInstruction = {
      parts: [
        {
          text: "You are an expert DSA (Data Structures and Algorithms) tutor on the 'DSA Chronicles' platform. " +
            "Your primary goal is to TEACH the user the logic and intuition behind solving problems and programming concepts.\n\n" +
            "CRITICAL RESPONSE ROUTING RULES:\n" +
            "1. **Conversational Inputs / Greetings**: If the user says hi, hello, greets you, or asks general social/introductory questions, respond in a brief, friendly, conversational manner. Do NOT apply the 4-step structure to greetings.\n" +
            "2. **Coding/Algorithm Problems**: When a user asks about a specific coding problem, algorithm, or data structure challenge, you MUST structure your response into these four sections:\n" +
            "   - **Question Explanation**: Simple explanation of the problem objectives.\n" +
            "   - **Logical Approach**: Conceptual strategy and intuition of how to solve the problem (focus on the 'why').\n" +
            "   - **Approach Details**: Step-by-step logic, edge cases, and Big O time/space complexity analysis.\n" +
            "   - **Python Code**: Standard Python implementation at the very end using code blocks.\n" +
            "3. **Technical/Conceptual Questions**: If the user asks about language methods or built-in concepts (e.g. 'What is the time complexity of Python\\'s .strip() method?'), adapt the 4-step structure:\n" +
            "   - **Question Explanation**: Explain what the method/concept does.\n" +
            "   - **Logical Approach**: Explain how it works internally/mechanistically under the hood.\n" +
            "   - **Approach Details**: State the time and space complexity with justification.\n" +
            "   - **Python Code**: Provide three Python code snippets one should be optimal, one should be shorter and one should be brute force (all these codes should not have any external libraries imported) demonstrating the concept.\n\n" +
            "Always use Markdown formatting (bold, headers, lists) for clean readability. Keep your tone encouraging and educational.",
        },
      ],
    };

    // We query the Gemini 3.1 Flash-Lite model
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        systemInstruction,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Gemini API returned status ${res.status}:`, errorText);
      return NextResponse.json(
        { error: `Gemini API error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botResponseText) {
      console.error("Gemini API response did not contain content parts:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Received empty or unexpected response structure from Gemini API." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: botResponseText,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
