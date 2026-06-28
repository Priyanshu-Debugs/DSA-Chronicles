import json

transcript_path = r"C:\Users\Priyanshu\.gemini\antigravity-ide\brain\f1aed70d-cf98-4add-a37a-5c5b538b4e9e\.system_generated\logs\transcript_full.jsonl"
output_path = r"C:\Users\Priyanshu\Documents\DSA\scratch\subagent_report.txt"

browser_subagent_responses = []

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'BROWSER_SUBAGENT':
                browser_subagent_responses.append(data)
        except Exception as e:
            pass

if len(browser_subagent_responses) >= 2:
    content = browser_subagent_responses[1].get('content', '')
    with open(output_path, "w", encoding="utf-8") as rf:
        rf.write(content)
    print(f"Subagent report written to {output_path}")
else:
    print("Could not find the second subagent response.")
