async function fetchGfgSolved(username) {
  try {
    const res = await fetch('https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({ handle: username })
    });

    if (!res.ok) {
      console.error('GFG API HTTP Error:', res.status, res.statusText);
      return;
    }

    const data = await res.json();
    console.log(`\nGFG Solved Problems API Success for ${username}`);
    console.log('Status:', data.status);
    console.log('Total Count:', data.count);
    
    // Log sample entries from different difficulties
    if (data.result) {
      Object.keys(data.result).forEach(diff => {
        const problems = Object.values(data.result[diff]);
        console.log(`- Difficulty ${diff}: found ${problems.length} solved problems.`);
        if (problems.length > 0) {
          console.log(`  Sample:`, problems[0]);
        }
      });
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

async function scrapeGfgProfile(username) {
  const url = `https://www.geeksforgeeks.org/profile/${username}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.error('GFG Profile Fetch Error:', res.status, res.statusText);
      return;
    }
    const html = await res.text();
    
    // Extract using regex
    const scoreMatch = html.match(/\\\"score\\\":\s*(\d+)/) || html.match(/"score":\s*(\d+)/);
    const solvedMatch = html.match(/\\\"total_problems_solved\\\":\s*(\d+)/) || html.match(/"total_problems_solved":\s*(\d+)/);
    const rankMatch = html.match(/\\\"institute_rank\\\":\s*(\d+)/) || html.match(/"institute_rank":\s*(\d+)/);
    const instMatch = html.match(/\\\"institution\\\":\s*\\\"([^\\\"]*)\\\"/);
    const nameMatch = html.match(/\\\"mentor\\\":\s*\{[^}]*\\\"name\\\":\s*\\\"([^\\\"]*)\\\"/);

    console.log(`\nGFG Scraped Profile Stats for ${username}:`);
    console.log('- Coding Score:', scoreMatch ? scoreMatch[1] : 'Not Found');
    console.log('- Total Solved:', solvedMatch ? solvedMatch[1] : 'Not Found');
    console.log('- Institute Rank:', rankMatch ? rankMatch[1] : 'Not Found');
    console.log('- Institution:', instMatch ? instMatch[1].replace(/\\/g, '') : 'Not Found');
    console.log('- Mentor/Real Name:', nameMatch ? nameMatch[1].replace(/\\/g, '') : 'Not Found');

  } catch (err) {
    console.error('Profile Scrape Error:', err);
  }
}

async function run() {
  await fetchGfgSolved('kunal_kushwaha');
  await scrapeGfgProfile('kunal_kushwaha');
}

run();
