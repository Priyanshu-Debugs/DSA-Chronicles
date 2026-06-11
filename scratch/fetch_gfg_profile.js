async function testGFGScrape(username) {
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
    console.log('Successfully fetched GFG profile html. Length:', html.length);

    // Let's search for script tags containing INITIAL_STATE or NEXT_DATA
    const nextDataIndex = html.indexOf('__NEXT_DATA__');
    console.log('Contains __NEXT_DATA__:', nextDataIndex !== -1);
    
    if (nextDataIndex !== -1) {
      // Find start and end of next data script block
      const startScript = html.lastIndexOf('<script', nextDataIndex);
      const endScript = html.indexOf('</script>', nextDataIndex) + 9;
      const scriptTag = html.substring(startScript, endScript);
      console.log('\nFound __NEXT_DATA__ Script Block (truncated):');
      console.log(scriptTag.substring(0, 500) + ' ... [TRUNCATED] ... ' + scriptTag.substring(scriptTag.length - 200));

      // Parse JSON inside the script tag
      const jsonStart = html.indexOf('{', startScript);
      const jsonEnd = html.lastIndexOf('}', endScript) + 1;
      const jsonText = html.substring(jsonStart, jsonEnd);
      try {
        const data = JSON.parse(jsonText);
        console.log('\n--- Parsed JSON Keys ---');
        console.log(Object.keys(data));
        console.log('Props keys:', Object.keys(data.props || {}));
        if (data.props && data.props.pageProps) {
          console.log('pageProps keys:', Object.keys(data.props.pageProps));
          console.log('userInfo keys:', Object.keys(data.props.pageProps.userInfo || {}));
          // Log some key stats
          const ui = data.props.pageProps.userInfo || {};
          console.log('Username:', ui.username);
          console.log('Score:', ui.score || ui.coding_score);
          console.log('Rank:', ui.institute_rank);
          console.log('Institute:', ui.institute_name);
          console.log('Total Solved:', ui.total_problems_solved);
        }
      } catch (err) {
        console.error('Failed to parse JSON inside __NEXT_DATA__:', err);
      }
    } else {
      // Let's search for some other keywords
      console.log('Searching for profile keywords:');
      const keywords = ['score', 'Problems Solved', 'rank', 'institute'];
      keywords.forEach(kw => {
        const idx = html.toLowerCase().indexOf(kw.toLowerCase());
        console.log(`- '${kw}' found at:`, idx);
        if (idx !== -1) {
          console.log(`  Context: ${html.substring(Math.max(0, idx - 40), Math.min(html.length, idx + 100))}`);
        }
      });
    }

  } catch (err) {
    console.error('GFG Fetch Error:', err);
  }
}

async function run() {
  await testGFGScrape('shashank_khan_2004'); // testing a sample profile
}

run();
