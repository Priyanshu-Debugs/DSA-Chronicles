import json
import re

with open("scratch/subagent_report.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find all lines starting with "### Step" and see the arguments or url
steps = re.findall(r'### Step (\d+): (\w+)\nArguments:\n(\{.*?\})', content, re.DOTALL)
print(f"Parsed {len(steps)} steps.")
for num, name, args_str in steps:
    try:
        args = json.loads(args_str)
        if name == 'open_browser_url':
            print(f"Step {num}: open_browser_url -> {args.get('Url')}")
        elif name == 'execute_browser_javascript':
            # Let's see what JavaScriptDescription is
            desc = args.get('JavaScriptDescription') or ""
            print(f"Step {num}: execute_browser_javascript -> {desc}")
        elif name == 'write_to_file' or name == 'write_file':
            print(f"Step {num}: write_to_file -> {args.get('TargetFile') or args.get('AbsolutePath')}")
    except Exception as e:
        print(f"Step {num} parse error: {e}")
