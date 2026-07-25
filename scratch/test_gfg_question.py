import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

slug = "largest-element-in-array4009"
url = f"https://www.geeksforgeeks.org/problems/{slug}/1"

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode()
        match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if match:
            parsed = json.loads(match.group(1))
            props = parsed.get('props', {}).get('pageProps', {})
            initial_state = props.get('initialState', {})
            if isinstance(initial_state, str):
                initial_state = json.loads(initial_state)
            prob_data = initial_state.get('problemData', {}).get('allData', {}).get('probData', {})
            print("probData keys:", list(prob_data.keys()))
            print("Name:", prob_data.get('problem_name'))
            print("Difficulty:", prob_data.get('difficulty'))
            print("Question HTML sample:", str(prob_data.get('problem_question'))[:400])
            print("Expected Time Complexity:", prob_data.get('expected_time_complexity'))
            print("Expected Auxiliary Space:", prob_data.get('expected_space_complexity'))
            print("Constraints:", prob_data.get('constraints'))
except Exception as e:
    print("ERROR:", e)
