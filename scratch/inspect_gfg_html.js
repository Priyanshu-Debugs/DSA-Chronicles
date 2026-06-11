const fs = require('fs');
const path = require('path');

async function inspectGFG() {
  const username = 'shashank_khan_2004';
  const url = `https://www.geeksforgeeks.org/user/${username}/`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!res.ok) {
      console.error('GFG HTTP Error:', res.status, res.statusText);
      return;
    }

    const html = await res.text();
    console.log('GFG HTML Length:', html.length);

    // Save full HTML for raw inspection if needed
    const scratchDir = __dirname;
    const htmlPath = path.join(scratchDir, 'gfg_profile_raw.html');
    fs.writeFileSync(htmlPath, html);
    console.log('Saved raw HTML to:', htmlPath);

    // Find script tags
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    let count = 0;
    const scripts = [];

    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1].trim();
      if (scriptContent.length > 0) {
        count++;
        scripts.push({ index: count, length: scriptContent.length, content: scriptContent });
      }
    }

    console.log(`Found ${count} non-empty script tags.`);
    
    // Check script tags for typical keywords
    scripts.forEach(s => {
      const containsState = s.content.includes('state') || s.content.includes('STATE');
      const containsUserInfo = s.content.includes('userInfo') || s.content.includes('user_info') || s.content.includes('username');
      const containsSolved = s.content.includes('solved') || s.content.includes('solvedProblems');

      if (containsState || containsUserInfo || containsSolved) {
        console.log(`\n[Script #${s.index} - Length: ${s.length}]`);
        console.log(`- containsState: ${containsState}, containsUserInfo: ${containsUserInfo}, containsSolved: ${containsSolved}`);
        console.log('Snippet (first 300 chars):');
        console.log(s.content.substring(0, 300) + ' ...');
      }
    });

  } catch (err) {
    console.error('Inspection Error:', err);
  }
}

inspectGFG();
