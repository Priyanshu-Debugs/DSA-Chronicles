async function testGfgPic() {
  const username = 'priyanshudebugs';
  const url = `https://www.geeksforgeeks.org/profile/${username}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.error('GFG profile fetch failed:', res.status);
      return;
    }
    const html = await res.text();
    
    // Search for occurrences of auth/profile and print their surrounding context
    console.log('Finding all occurrences of auth/profile...');
    let idx = 0;
    while ((idx = html.indexOf('auth/profile/', idx)) !== -1) {
      console.log(`\nOccurrence at index ${idx}:`);
      console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 150)));
      idx += 13;
    }
    const extractStat = (html, key) => {
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

    const extractUserDataPic = (html) => {
      // 1. Escaped JSON form (Flight data format)
      const regexEscaped = /\\\"userData\\\":\s*\{[^}]*\\\"profile_image_url\\\":\s*\\\"([^\\\"]*)\\\"/;
      const matchEsc = html.match(regexEscaped);
      if (matchEsc) {
        return matchEsc[1].replace(/\\/g, '');
      }

      // 2. Standard JSON form
      const regexStandard = /"userData":\s*\{[^}]*"profile_image_url":\s*"([^"]*)"/;
      const matchStd = html.match(regexStandard);
      if (matchStd) {
        return matchStd[1];
      }

      return null;
    };

    console.log('extractUserDataPic(html):', extractUserDataPic(html));
  } catch (err) {
    console.error('Error:', err);
  }
}

testGfgPic();
