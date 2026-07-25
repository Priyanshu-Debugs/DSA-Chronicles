import urllib.request
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

handles = ['sandeep_jain', 'priyanshu', 'geeksforgeeks']

for h in handles:
    url = f'https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle={h}'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print(f'=== Handle: {h} ===')
            p_data = data.get('data', {})
            print('Name:', p_data.get('name'))
            print('Profile Img:', p_data.get('profile_image_url'))
            print('Score:', p_data.get('score'))
            print('Total Solved:', p_data.get('total_problems_solved'))
            print('Institute Rank:', p_data.get('institute_rank'))
            print('Institute Name:', p_data.get('institute_name'))
    except Exception as e:
        print(f'Error for {h}:', e)
