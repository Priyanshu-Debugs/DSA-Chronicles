import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let slug = searchParams.get("slug");
    const urlParam = searchParams.get("url");

    // Extract slug from URL if provided
    if (!slug && urlParam) {
      const parts = urlParam.toLowerCase().split("/problems/");
      if (parts.length > 1) {
        slug = parts[1].split("/")[0].split("?")[0].split("#")[0];
      }
    }

    if (!slug) {
      return NextResponse.json({ error: "GFG problem slug or url query parameter is required" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim();
    const gfgProblemUrl = `https://www.geeksforgeeks.org/problems/${cleanSlug}/1`;

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    const res = await fetch(gfgProblemUrl, { headers, cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch GFG problem page (${res.status})` }, { status: res.status });
    }

    const html = await res.text();
    let title = "";
    let difficulty = "Medium";
    let content = "";
    let tags: Array<{ name: string }> = [];

    // Parse __NEXT_DATA__ payload
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (nextDataMatch) {
      try {
        const parsed = JSON.parse(nextDataMatch[1]);
        const props = parsed?.props?.pageProps || {};
        let initialState = props.initialState || {};
        if (typeof initialState === "string") {
          initialState = JSON.parse(initialState);
        }

        const probData = initialState?.problemData?.allData?.probData || {};
        if (probData.problem_name) title = probData.problem_name;
        if (probData.difficulty) difficulty = probData.difficulty;
        if (probData.problem_question) content = probData.problem_question;

        if (Array.isArray(probData.tags)) {
          tags = probData.tags.map((t: any) => ({ name: typeof t === "string" ? t : t.name || t.tag_name || "" })).filter((t: any) => t.name);
        }
      } catch (parseErr) {
        console.warn("Failed to parse GFG __NEXT_DATA__ JSON:", parseErr);
      }
    }

    // Fallback HTML regex parsing if __NEXT_DATA__ didn't yield content
    if (!content) {
      const problemStatementMatch = html.match(/<div[^>]*class="[^"]*problem-statement[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      if (problemStatementMatch) {
        content = problemStatementMatch[1];
      }
    }

    if (!content) {
      return NextResponse.json({ error: `Problem details for '${cleanSlug}' could not be extracted` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      question: {
        title: title || cleanSlug,
        titleSlug: cleanSlug,
        content,
        difficulty,
        topicTags: tags,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("GFG Question API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
