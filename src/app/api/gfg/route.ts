import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username query parameter is required" }, { status: 400 });
    }

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    // Helper to extract values using regex patterns
    const extractStat = (html: string, key: string): string | null => {
      const regexEscapedStr = new RegExp(`\\\\"${key}\\\\\":\\s*\\\\"([^\\\\"]*)\\\\"`);
      const regexStr = new RegExp(`"${key}":\\s*"([^"]*)"`);
      const regexEscapedNum = new RegExp(`\\\\"${key}\\\\\":\\s*(\\d+)`);
      const regexNum = new RegExp(`"${key}":\\s*(\\d+)`);

      const matchEscStr = html.match(regexEscapedStr);
      if (matchEscStr) return matchEscStr[1].replace(/\\/g, '');
      const matchStr = html.match(regexStr);
      if (matchStr) return matchStr[1];
      const matchEscNum = html.match(regexEscapedNum);
      if (matchEscNum) return matchEscNum[1];
      const matchNum = html.match(regexNum);
      if (matchNum) return matchNum[1];

      return null;
    };

    // 1. Fetch public profile page HTML to parse stats
    const profileUrl = `https://www.geeksforgeeks.org/profile/${username}`;
    let codingScore = 0;
    let totalProblemsSolved = 0;
    let instituteRank = "N/A";
    let institute = "N/A";
    let mentorName = "N/A";
    let profilePicture: string | null = null;

    try {
      const profileRes = await fetch(profileUrl, { headers, cache: "no-store" });
      if (profileRes.ok) {
        const html = await profileRes.text();
        
        codingScore = parseInt(extractStat(html, "score") || "0");
        totalProblemsSolved = parseInt(extractStat(html, "total_problems_solved") || "0");
        
        const rank = extractStat(html, "institute_rank");
        if (rank) instituteRank = rank;
        
        const inst = extractStat(html, "institution");
        if (inst) institute = inst;
        
        // Try extracting real name if possible
        const nameMatch = html.match(/\\\"mentor\\\":\s*\{[^}]*\\\"name\\\":\s*\\\"([^\\\"]*)\\\"/);
        if (nameMatch) mentorName = nameMatch[1].replace(/\\/g, '');

        // Try extracting profile picture (specifically nested under userData to avoid matching other experts)
        const regexUserDataPic = /\\\"userData\\\":\s*\{[^}]*\\\"profile_image_url\\\":\s*\\\"([^\\\"]*)\\\"/;
        const matchUserDataPic = html.match(regexUserDataPic);
        if (matchUserDataPic) {
          profilePicture = matchUserDataPic[1].replace(/\\/g, '');
        } else {
          // Fallback
          const pPic = extractStat(html, "profile_image_url") || extractStat(html, "profile_img");
          if (pPic) profilePicture = pPic;
        }
      }
    } catch (profileErr) {
      console.warn("Failed to scrape GFG profile page:", profileErr);
    }

    // 2. Query GFG practice API directly for solved problems list
    const solvedProblemsList: Array<{ question: string; questionUrl: string; difficulty: string; subTime?: string }> = [];

    try {
      const practiceRes = await fetch("https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: username }),
        cache: "no-store",
      });

      if (practiceRes.ok) {
        const data = await practiceRes.json();
        if (data.result) {
          for (const difficulty in data.result) {
            const problems = data.result[difficulty];
            for (const probId in problems) {
              const p = problems[probId];
              solvedProblemsList.push({
                question: p.pname,
                questionUrl: `https://www.geeksforgeeks.org/problems/${p.slug}`,
                difficulty: difficulty,
                subTime: p.user_subtime || "",
              });
            }
          }
        }
        
        // Sort by user_subtime descending (most recent first)
        solvedProblemsList.sort((a, b) => {
          return (b.subTime || "").localeCompare(a.subTime || "");
        });
      }
    } catch (practiceErr) {
      console.warn("Failed to fetch GFG solved problems list:", practiceErr);
    }

    // Fallback: If scraping failed but problems API returned count, set total problems solved
    if (totalProblemsSolved === 0 && solvedProblemsList.length > 0) {
      totalProblemsSolved = solvedProblemsList.length;
    }

    return NextResponse.json({
      success: true,
      userName: username,
      mentorName,
      profilePicture: profilePicture || "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
      totalProblemsSolved,
      instituteRank,
      codingScore,
      institute,
      problems: solvedProblemsList,
      recentSolved: solvedProblemsList.slice(0, 20),
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Local GFG API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
