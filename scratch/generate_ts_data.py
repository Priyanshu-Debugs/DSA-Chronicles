import json
import re

# Load parts
with open("scratch/extracted_dsa_data.json", "r", encoding="utf-8") as f:
    part1 = json.load(f)
with open("scratch/remaining_dsa_data.json", "r", encoding="utf-8") as f:
    part2 = json.load(f)

all_data = {}
all_data.update(part1)
all_data.update(part2)

def slugify(name):
    # retain some special characters but replace spaces and hyphens with underscores
    # convert to lowercase
    slug = name.lower()
    # replace spaces, forward slashes, pipes and hyphens with underscores
    slug = re.sub(r'[\s\-\|/]+', '_', slug)
    # clean up double underscores
    while '__' in slug:
        slug = slug.replace('__', '_')
    # strip underscores from ends
    slug = slug.strip('_')
    return slug

def parse_urls(problem):
    # collect all non-empty links
    links = [problem.get(k, '') for k in ['cn', 'gfg', 'lc']]
    links = [l for l in links if l]
    
    leetcode_url = ""
    gfg_url = ""
    
    # Identify leetcode.com links
    for l in links:
        if 'leetcode.com' in l:
            leetcode_url = l
            break
            
    # Identify geeksforgeeks.org links
    for l in links:
        if 'geeksforgeeks.org' in l:
            gfg_url = l
            break
            
    # If no leetcode link, check for takeuforward link
    if not leetcode_url:
        for l in links:
            if 'takeuforward.org' in l:
                leetcode_url = l
                break
                
    leetcode_slug = None
    gfg_slug = None
    
    if 'leetcode.com/problems/' in leetcode_url:
        parts = leetcode_url.split('/problems/')
        if len(parts) > 1:
            leetcode_slug = parts[1].split('/')[0].split('?')[0].split('#')[0].strip()
            
    if 'practice.geeksforgeeks.org/problems/' in gfg_url:
        parts = gfg_url.split('/problems/')
        if len(parts) > 1:
            gfg_slug = parts[1].split('/')[0].split('?')[0].split('#')[0].strip()
            
    return leetcode_url, gfg_url, leetcode_slug, gfg_slug

# Order of pages we want to generate
PAGES_ORDER = [
    ("bit_manipulation", 8, "Step 8: Bit Manipulation"),
    ("stack_n_queue", 9, "Step 9: Stack & Queue"),
    ("heaps", 10, "Step 10: Heaps"),
    ("greedy", 11, "Step 11: Greedy"),
    ("binary_tree", 12, "Step 12: Binary Tree"),
    ("binary_search_tree", 13, "Step 13: Binary Search Tree"),
    ("graphs", 14, "Step 14: Graphs"),
    ("dp", 15, "Step 15: DP"),
    ("tries", 16, "Step 16: Tries")
]

new_steps = []

for page_key, step_num, step_title in PAGES_ORDER:
    if page_key not in all_data:
        print(f"Warning: {page_key} not in data")
        continue
        
    page_data = all_data[page_key]
    
    # Normalize categories: they should be a list of dicts: {'title': ..., 'problems': ...}
    categories = []
    if isinstance(page_data, dict):
        # Sort by step number in title if possible
        keys = list(page_data.keys())
        # Try to sort keys by 'Step X' prefix
        def get_step_idx(k):
            m = re.search(r'Step\s*(\d+)', k, re.IGNORECASE)
            return int(m.group(1)) if m else 99
        keys.sort(key=get_step_idx)
        for k in keys:
            categories.append({
                'title': k,
                'problems': page_data[k]
            })
    elif isinstance(page_data, list):
        categories = page_data
        
    lessons = []
    for lesson_num, cat in enumerate(categories, 1):
        raw_title = cat.get('title', 'No Title')
        
        # Clean lesson title
        cleaned_core = re.sub(r'^Step\s*\d+[\.:\s]*', '', raw_title).strip()
        # Fix missing space in "ProgrammingMedium" or similar if any
        cleaned_core = re.sub(r'([a-z])([A-Z])', r'\1 \2', cleaned_core)
        lesson_title = f"Lesson {lesson_num}: {cleaned_core}"
        
        # Topic
        topic_id = f"s{step_num}-l{lesson_num}-t1"
        topic_title = f"{cleaned_core} Problems"
        
        # Problems
        problems = []
        for prob_idx, raw_prob in enumerate(cat.get('problems', [])):
            name = raw_prob.get('name', 'Unknown')
            lc_url, gfg_url, lc_slug, gfg_slug = parse_urls(raw_prob)
            
            prob_id = f"{prob_idx}_{slugify(name)}"
            
            p_dict = {
                "id": prob_id,
                "name": name,
                "leetcodeUrl": lc_url,
                "gfgUrl": gfg_url
            }
            if lc_slug:
                p_dict["leetcodeSlug"] = lc_slug
            if gfg_slug:
                p_dict["gfgSlug"] = gfg_slug
                
            problems.append(p_dict)
            
        lessons.append({
            "lessonId": f"s{step_num}-l{lesson_num}",
            "lessonTitle": lesson_title,
            "topics": [
                {
                    "topicId": topic_id,
                    "topicTitle": topic_title,
                    "problems": problems
                }
            ]
        })
        
    new_steps.append({
        "stepId": f"step-{step_num}",
        "stepTitle": step_title,
        "lessons": lessons
    })

# Save new steps to file
with open("scratch/formatted_steps.json", "w", encoding="utf-8") as f:
    json.dump(new_steps, f, indent=2)

print(f"Generated {len(new_steps)} steps in scratch/formatted_steps.json")
