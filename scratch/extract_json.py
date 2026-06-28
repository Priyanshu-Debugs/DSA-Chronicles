import json

transcript_path = r"C:\Users\Priyanshu\.gemini\antigravity-ide\brain\f1aed70d-cf98-4add-a37a-5c5b538b4e9e\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                for tc in data.get('tool_calls', []):
                    if tc.get('name') == 'browser_subagent':
                        print(f"Line {i} - TaskName: {tc['args'].get('TaskName')}")
                        print(f"  RecordingName: {tc['args'].get('RecordingName')}")
                        # If there is a subagent id, we can print it too
                        print(f"  ReusedSubagentId: {tc['args'].get('ReusedSubagentId')}")
        except Exception as e:
            pass
