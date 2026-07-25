import urllib.request
import json

url = "https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1"
slug = "largest-element-in-array4009"

req = urllib.request.Request(
    f"https://www.geeksforgeeks.org/problems/{slug}/1",
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode()
        import re
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if m:
            parsed = json.loads(m.group(1))
            props = parsed.get('props', {}).get('pageProps', {})
            st = props.get('initialState', {})
            if isinstance(st, str):
                st = json.loads(st)
            probData = st.get('problemData', {}).get('allData', {}).get('probData', {})
            print("Extracted Title:", probData.get('problem_name'))
            print("Extracted Difficulty:", probData.get('difficulty'))
            print("Extracted Content Len:", len(probData.get('problem_question', '')))
except Exception as e:
    print("Error:", e)
