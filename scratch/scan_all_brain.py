import os

brain_dir = r"C:\Users\Priyanshu\.gemini\antigravity-ide\brain"
for root, dirs, files in os.walk(brain_dir):
    # Only print if there are json/jsonl/md files
    filtered_files = [f for f in files if f.endswith(('.json', '.jsonl', '.md', '.txt'))]
    if filtered_files:
        print(f"Directory: {root}")
        for f in filtered_files:
            p = os.path.join(root, f)
            print(f"  {f} ({os.path.getsize(p)} bytes)")
