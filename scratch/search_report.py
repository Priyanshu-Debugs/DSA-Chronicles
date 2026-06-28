with open("scratch/subagent_report.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

for term in ["greedy", "graphs", "dp", "error", "fail", "timeout"]:
    matches = [m.start() for m in re.finditer(term, content, re.IGNORECASE)]
    print(f"Term '{term}': found {len(matches)} occurrences")
    for idx in matches[:3]:
        # Print context
        start = max(0, idx - 40)
        end = min(len(content), idx + 80)
        print(f"  Context: {content[start:end].replace(chr(10), ' ')}")
