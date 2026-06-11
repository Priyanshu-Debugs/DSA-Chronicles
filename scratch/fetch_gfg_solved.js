async function fetchGfgSolved(username) {
  const url = `https://gfg-stats.tashif.codes/${username}/solved-problems?timestamp=${Date.now()}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`GFG Stats HTTP Error for ${username}:`, res.status, res.statusText);
      return;
    }
    const data = await res.json();
    console.log(`\nGFG Solved Problems for ${username} (first 5):`);
    const list = data.problems || [];
    console.log('Total count in list:', list.length);
    console.log(JSON.stringify(list.slice(0, 5), null, 2));
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

fetchGfgSolved('kunal_kushwaha');
