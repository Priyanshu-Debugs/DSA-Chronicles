import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { a2zDsaSheetData } from "@/data/a2zDsaSheet";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { syncToken, platform, slug } = body;

    if (!syncToken || !platform || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // 1. Locate the user document matching the secret syncToken
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("syncToken", "==", syncToken));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Invalid syncToken" }, { status: 401 });
    }

    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;
    const userData = userDoc.data();
    const solvedMap = userData.solvedMap || {};

    // 2. Helper function to normalize and extract the problem slug
    const cleanSlug = (s: string) => {
      if (!s) return "";
      const cleaned = s.toLowerCase().trim();
      const parts = cleaned.split("/problems/");
      const base = parts.length > 1 ? parts[1].split("/")[0] : cleaned.split("/")[0];
      return base.split("?")[0].split("#")[0];
    };

    const targetSlug = cleanSlug(slug);
    if (!targetSlug) {
      return NextResponse.json({ error: "Invalid problem slug" }, { status: 400 });
    }

    // 3. Match the target slug against problems in the dataset
    let matchedProblemId = "";
    
    for (const step of a2zDsaSheetData) {
      for (const lesson of step.lessons) {
        for (const topic of lesson.topics) {
          for (const problem of topic.problems) {
            const leetCodeSlug = cleanSlug(problem.leetcodeUrl);
            const gfgSlug = cleanSlug(problem.gfgUrl);
            
            if (platform === "leetcode" && leetCodeSlug && leetCodeSlug === targetSlug) {
              matchedProblemId = problem.id;
              break;
            }
            if (platform === "gfg" && gfgSlug && gfgSlug === targetSlug) {
              matchedProblemId = problem.id;
              break;
            }
          }
          if (matchedProblemId) break;
        }
        if (matchedProblemId) break;
      }
      if (matchedProblemId) break;
    }

    if (!matchedProblemId) {
      return NextResponse.json(
        { error: `Problem '${slug}' (normalized: '${targetSlug}') not found in tracker data` },
        { status: 404 }
      );
    }

    // 4. Update the user's solved map with current date
    const dateStr = new Date().toISOString().split("T")[0];
    solvedMap[matchedProblemId] = {
      solved: true,
      date: dateStr,
    };

    // 5. Persist the updated solved map back to Firestore
    await setDoc(doc(db, "users", userId), { solvedMap }, { merge: true });

    return NextResponse.json({
      success: true,
      message: `Successfully synced! Solved: ${matchedProblemId}`,
    });
  } catch (err: any) {
    console.error("API sync error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
