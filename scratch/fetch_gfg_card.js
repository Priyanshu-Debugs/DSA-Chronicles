async function fetchGfgCard(username) {
  const url = `https://gfgstatscard.vercel.app/${username}?raw=true`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`GFG Card HTTP Error for ${username}:`, res.status, res.statusText);
      return;
    }
    const data = await res.json();
    console.log(`\nGFG stats for ${username}:`);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

async function run() {
  await fetchGfgCard('sandeep_jain');
  await fetchGfgCard('kunal_kushwaha');
}

run();
