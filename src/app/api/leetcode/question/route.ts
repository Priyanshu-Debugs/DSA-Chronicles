import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Problem slug query parameter is required" }, { status: 400 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Referer": "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    const query = `
      query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          content
          difficulty
          topicTags {
            name
            slug
          }
          codeSnippets {
            lang
            langSlug
            code
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables: { titleSlug: slug } }),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: `LeetCode API error: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();
    const question = data?.data?.question;

    if (!question) {
      return NextResponse.json({ error: `Question '${slug}' not found on LeetCode` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      question: {
        id: question.questionId,
        frontendId: question.questionFrontendId,
        title: question.title,
        titleSlug: question.titleSlug,
        content: question.content,
        difficulty: question.difficulty,
        topicTags: question.topicTags || [],
        codeSnippets: question.codeSnippets || [],
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("LeetCode Question API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
