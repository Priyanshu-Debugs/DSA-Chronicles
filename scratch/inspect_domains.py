import json
from urllib.parse import urlparse

# Load both files
with open("scratch/extracted_dsa_data.json", "r", encoding="utf-8") as f:
    part1 = json.load(f)
with open("scratch/remaining_dsa_data.json", "r", encoding="utf-8") as f:
    part2 = json.load(f)

all_data = {}
all_data.update(part1)
all_data.update(part2)

domains = set()

for page, val in all_data.items():
    # val can be list or dict
    categories = []
    if isinstance(val, dict):
        for k, probs in val.items():
            categories.append(probs)
    elif isinstance(val, list):
        for item in val:
            categories.append(item.get('problems', []))
            
    for probs in categories:
        for p in probs:
            for key in ['cn', 'gfg', 'lc']:
                url = p.get(key, '')
                if url:
                    parsed = urlparse(url)
                    domains.add(parsed.netloc)

print("All unique domains in extracted data:")
for d in sorted(domains):
    print(f"  {d}")
