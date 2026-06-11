const fs = require('fs');
const path = require('path');

async function testKunalLegacyGFG() {
  const username = 'kunal_kushwaha';
  const url = `https://auth.geeksforgeeks.org/user/${username}/profile`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      console.error('GFG HTTP Error:', res.status, res.statusText);
      return;
    }

    const html = await res.text();
    console.log('GFG Legacy HTML Length:', html.length);

    // Search for print-pattern
    const printPatternIndex = html.indexOf('print-pattern');
    console.log("Contains 'print-pattern':", printPatternIndex !== -1);
    if (printPatternIndex !== -1) {
      console.log('Context of print-pattern:');
      console.log(html.substring(printPatternIndex - 100, printPatternIndex + 200));
    }

    // Let's also check if it redirects
    console.log('Final URL fetched:', res.url);

  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testKunalLegacyGFG();
