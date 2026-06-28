with open("scratch/subagent_report.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    for term in ["greedy", "graphs", "dp"]:
        if term in line.lower():
            print(f"Line {i+1} containing '{term}': {line.strip()[:150]}")
