import urllib.request
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
    'Referer': 'https://leetcode.com'
}

def graphql_query(query, variables):
    req = urllib.request.Request(
        'https://leetcode.com/graphql',
        data=json.dumps({'query': query, 'variables': variables}).encode(),
        headers=headers
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return {'error': str(e)}

# 1. Test question content (Full Question + Description)
q_query = """
query questionContent($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    titleSlug
    content
    difficulty
    topicTags {
      name
      slug
    }
    codeSnippets {
      lang
      langSlug
      code
    }
  }
}
"""

res_q = graphql_query(q_query, {'titleSlug': 'two-sum'})
print("=== QUESTION CONTENT (TWO-SUM) ===")
print("Question Title:", res_q.get('data', {}).get('question', {}).get('title'))
print("Content snippet:", (res_q.get('data', {}).get('question', {}).get('content') or '')[:300])

# 2. Test recent AC submissions for a public user
sub_query = """
query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
    lang
  }
}
"""

res_sub = graphql_query(sub_query, {'username': 'priyanshu', 'limit': 5})
print("\n=== RECENT AC SUBMISSIONS ===")
print(json.dumps(res_sub, indent=2)[:500])

# 3. Test submission details for one submission id
sub_id = None
subs = res_sub.get('data', {}).get('recentAcSubmissionList', [])
if subs:
    sub_id = subs[0].get('id')

if sub_id:
    detail_query = """
    query submissionDetails($submissionId: Int!) {
      submissionDetails(submissionId: $submissionId) {
        runtime
        memory
        code
        timestamp
        lang {
          name
          verboseName
        }
        question {
          questionId
          titleSlug
        }
      }
    }
    """
    res_detail = graphql_query(detail_query, {'submissionId': int(sub_id)})
    print(f"\n=== SUBMISSION DETAILS FOR ID {sub_id} ===")
    print(json.dumps(res_detail, indent=2)[:500])
