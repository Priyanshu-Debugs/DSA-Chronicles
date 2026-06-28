import os

brain_dir = r"C:\Users\Priyanshu\.gemini\antigravity-ide\brain"
print(f"Scanning {brain_dir} using os.walk...")

found_count = 0
for root, dirs, files in os.walk(brain_dir):
    for file in files:
        if file == "transcript_full.jsonl":
            path = os.path.join(root, file)
            size = os.path.getsize(path)
            found_count += 1
            print(f"Found transcript: {path} ({size} bytes)")
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    print(f"  Contains '/greedy': {'/greedy' in content}")
                    print(f"  Contains '/graphs': {'/graphs' in content}")
                    print(f"  Contains '/dp': {'/dp' in content}")
            except Exception as e:
                print(f"  Error reading: {e}")

print(f"Total transcripts found: {found_count}")
