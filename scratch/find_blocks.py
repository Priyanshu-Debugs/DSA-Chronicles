import re

with open("scratch/subagent_report.txt", "r", encoding="utf-8") as f:
    content = f.read()

# find all blocks of ```...```
blocks = re.findall(r'```(\w*)\n(.*?)```', content, re.DOTALL)
print(f"Found {len(blocks)} code blocks.")
for idx, (lang, block_content) in enumerate(blocks):
    print(f"Block {idx}: language='{lang}', length={len(block_content)}")
    print(f"Snippet: {block_content[:150]}...")
