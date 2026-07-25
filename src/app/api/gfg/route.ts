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

    let codingScore = 0;
    let totalProblemsSolved = 0;
    let instituteRank = "N/A";
    let institute = "N/A";
    let mentorName = username;
    let profilePicture: string | null = null;

    // 1. Primary: Fetch user profile data from GFG Auth API
    try {
      const authApiUrl = `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${encodeURIComponent(username)}`;
      const authRes = await fetch(authApiUrl, { headers, cache: "no-store" });
      
      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData && authData.data) {
          const uData = authData.data;
          mentorName = uData.name || username;
          codingScore = uData.score || 0;
          totalProblemsSolved = uData.total_problems_solved || 0;
          if (uData.institute_rank) instituteRank = String(uData.institute_rank);
          if (uData.institute_name) institute = uData.institute_name;
          
          if (uData.profile_image_url) {
            let img = uData.profile_image_url;
            if (img.startsWith("//")) img = `https:${img}`;
            profilePicture = img;
          }
        }
      }
    } catch (authErr) {
      console.warn("Failed to fetch GFG Auth API:", authErr);
    }

    // Fallback: If profile picture wasn't found via Auth API, scrape public HTML page
    if (!profilePicture) {
      try {
        const profileUrl = `https://www.geeksforgeeks.org/profile/${username}`;
        const profileRes = await fetch(profileUrl, { headers, cache: "no-store" });
        if (profileRes.ok) {
          const html = await profileRes.text();
          const imgMatch = html.match(/"(https?:\/\/media\.geeksforgeeks\.org\/[^\"]*?(?:auth|profile|user)[^\"]*?\.(?:png|jpg|jpeg|svg|webp))"/i);
          if (imgMatch) {
            profilePicture = imgMatch[1];
          }
        }
      } catch (profileErr) {
        console.warn("Failed to scrape GFG profile fallback HTML:", profileErr);
      }
    }

    // 2. Query GFG practice API for solved problems list
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
        
        solvedProblemsList.sort((a, b) => (b.subTime || "").localeCompare(a.subTime || ""));
      }
    } catch (practiceErr) {
      console.warn("Failed to fetch GFG solved problems list:", practiceErr);
    }

    // Fallback if problem count is 0
    if (totalProblemsSolved === 0 && solvedProblemsList.length > 0) {
      totalProblemsSolved = solvedProblemsList.length;
    }

    const defaultAvatar = "https://media.geeksforgeeks.org/gfg-gg-logo.svg";

    return NextResponse.json({
      success: true,
      userName: username,
      mentorName,
      profilePicture: profilePicture || defaultAvatar,
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
