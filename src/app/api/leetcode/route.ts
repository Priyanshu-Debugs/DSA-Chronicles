import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username query parameter is required" }, { status: 400 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Referer": "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    // Helper to send query to LeetCode GraphQL
    const fetchLeetCode = async (query: string, variables: any) => {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`LeetCode GraphQL error: ${res.statusText}`);
      }
      return res.json();
    };

    // 1. Fetch user stats (Solved counts, Avatar, Ranking)
    const statsQuery = `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            userAvatar
            ranking
          }
        }
      }
    `;

    // 2. Fetch accepted submissions (Real-time solved problem titles and slugs)
    const submissionsQuery = `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
          lang
        }
      }
    `;

    const [statsRes, submissionsRes] = await Promise.all([
      fetchLeetCode(statsQuery, { username }).catch(err => {
        console.error("Stats query failed:", err);
        return null;
      }),
      fetchLeetCode(submissionsQuery, { username, limit: 100 }).catch(err => {
        console.error("Submissions query failed:", err);
        return null;
      }),
    ]);

    if (!statsRes?.data?.matchedUser) {
      return NextResponse.json({ error: `User '${username}' not found or profile is completely private` }, { status: 404 });
    }

    const matchedUser = statsRes.data.matchedUser;
    const acSubmissionNum = matchedUser.submitStats?.acSubmissionNum || [];
    
    const totalSolved = acSubmissionNum.find((x: any) => x.difficulty === "All")?.count || 0;
    const easySolved = acSubmissionNum.find((x: any) => x.difficulty === "Easy")?.count || 0;
    const mediumSolved = acSubmissionNum.find((x: any) => x.difficulty === "Medium")?.count || 0;
    const hardSolved = acSubmissionNum.find((x: any) => x.difficulty === "Hard")?.count || 0;

    const ranking = matchedUser.profile?.ranking || null;
    const avatarUrl = matchedUser.profile?.userAvatar || null;

    const submissions = submissionsRes?.data?.recentAcSubmissionList || [];

    // Format output to be fully backwards compatible with our client-side states
    return NextResponse.json({
      success: true,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking,
      avatarUrl,
      submission: submissions,
      recentSubmissions: submissions,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Local LeetCode API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
