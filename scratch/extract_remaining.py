import json
import re
import os

transcript_path = r"C:\Users\Priyanshu\.gemini\antigravity-ide\brain\f1aed70d-cf98-4add-a37a-5c5b538b4e9e\.system_generated\logs\transcript_full.jsonl"
output_path = r"C:\Users\Priyanshu\Documents\DSA\scratch\remaining_dsa_data.json"

print(f"Reading from {transcript_path}...")

responses = []
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'BROWSER_SUBAGENT':
                responses.append(data)
        except Exception as e:
            pass

print(f"Found {len(responses)} BROWSER_SUBAGENT responses.")

if len(responses) >= 3:
    last_response = responses[-1]
    content = last_response.get('content', '')
    print(f"Response content length: {len(content)}")
    
    # Let's search for the json block
    match = re.search(r'```json\s*(\{.*?\})\s*```', content, re.DOTALL)
    if match:
        json_str = match.group(1)
        try:
            parsed_json = json.loads(json_str)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'w', encoding='utf-8') as out_f:
                json.dump(parsed_json, out_f, indent=2)
            print(f"Successfully wrote remaining JSON to {output_path}!")
        except Exception as err:
            print(f"Failed to parse JSON: {err}")
            # Try parsing with some relaxed settings or clean up
    else:
        print("Could not find a json block in the last response. Writing the raw content to scratch/last_response.txt")
        with open("scratch/last_response.txt", "w", encoding="utf-8") as out_f:
            out_f.write(content)
else:
    print("Not enough subagent responses found.")
