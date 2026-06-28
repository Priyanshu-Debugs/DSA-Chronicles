import re

with open("src/data/a2zDsaSheet.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for stepId and stepTitle
steps = re.findall(r'"stepId":\s*"(.*?)",\s*"stepTitle":\s*"(.*?)"', content)
print("Steps in current a2zDsaSheet.ts:")
for sid, stitle in steps:
    print(f"  ID: {sid} -> {stitle}")
