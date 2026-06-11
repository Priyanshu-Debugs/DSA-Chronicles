const fs = require('fs');
const path = require('path');

function parseGFG() {
  const filePath = path.join(__dirname, 'gfg_profile_raw.html');
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  
  // Find all JSON substrings or objects in self.__next_f.push
  const regex = /self\.__next_f\.push\(\[\d+,"([\s\S]*?)"\]\)/g;
  let match;
  let allText = '';
  
  while ((match = regex.exec(html)) !== null) {
    let chunk = match[1];
    // Unescape unicode strings
    chunk = chunk.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\u([0-9a-fA-F]{4})/g, (m, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
    allText += chunk + '\n';
  }

  console.log('Combined self.__next_f.push text length:', allText.length);
  
  // Let's search inside the combined Next.js state data
  const keywords = ['rank', 'score', 'solved', 'problems', 'gfg', 'shashank', 'institute'];
  keywords.forEach(kw => {
    const idx = allText.toLowerCase().indexOf(kw.toLowerCase());
    console.log(`- Keyword '${kw}' found at:`, idx);
    if (idx !== -1) {
      console.log(`  Snippet: ${allText.substring(Math.max(0, idx - 80), Math.min(allText.length, idx + 120))}`);
    }
  });

  // Let's write the combined text to a file so we can view it
  fs.writeFileSync(path.join(__dirname, 'gfg_next_state.txt'), allText);
  console.log('Saved parsed Next.js state text to gfg_next_state.txt');
}

parseGFG();
