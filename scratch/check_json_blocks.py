import re
import json

with open("scratch/subagent_report.txt", "r", encoding="utf-8") as f:
    content = f.read()

# find all blocks of ```json...```
json_blocks = re.findall(r'```json\n(.*?)```', content, re.DOTALL)
print(f"Found {len(json_blocks)} json blocks.")
for idx, block in enumerate(json_blocks):
    print(f"Block {idx} length: {len(block)}")
    try:
        data = json.loads(block)
        print(f"  Keys: {list(data.keys())}")
    except Exception as e:
        print(f"  Failed to parse block {idx}: {e}")
