import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, pathname, activePdf } = await req.json();

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

    const isSqlPage = pathname && (pathname.startsWith("/notes/sql") || pathname.startsWith("/sql"));
    const pdfContext = activePdf ? `The user is currently viewing the PDF document: "${activePdf}".` : "";

    const systemInstruction = {
      parts: [
        {
          text: isSqlPage
            ? "You are an expert SQL Database Architect and Senior SQL Tutor and ou are an expert DSA (Data Structures and Algorithms) tutor on the 'DSA Chronicles' platform. " +
              "Your primary goal is to provide SQL-FOCUSED, accurate, and highly educational answers based on relational database principles and the SQL Masterclass PDF notes series.\n\n" +
              pdfContext + "\n\n" +
              "CRITICAL RESPONSE ROUTING RULES FOR SQL:\n" +
              "1. **Conversational Inputs / Greetings**: If the user greets you (hi, hello), respond in a friendly, SQL-tailored conversational manner.\n" +
              "2. **SQL & Database Queries**: When a user asks about SQL syntax, database design, indexing, joins, subqueries, CTEs, window functions, or performance tuning, structure your response as follows:\n" +
              "   - **Concept & Explanation**: Clear, intuitive explanation of the SQL concept or problem.\n" +
              "   - **SQL Syntax & Rules**: Formal ANSI SQL syntax and logical query processing sequence (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY).\n" +
              "   - **Practical SQL Example**: Clean, production-ready SQL query with sample tables and expected output.\n" +
              "   - **Optimization & Best Practices**: Key performance considerations (e.g. indexes, avoiding SELECT *, handling NULLs, SARGable queries).\n" +
              "Always format code in standard `sql` markdown blocks. Keep explanations crisp, encouraging, and authoritative."
            : "You are an expert DSA (Data Structures and Algorithms) tutor on the 'DSA Chronicles' platform. " +
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
