import json

# Load first part
with open("scratch/extracted_dsa_data.json", "r", encoding="utf-8") as f:
    part1 = json.load(f)

# Load second part
with open("scratch/remaining_dsa_data.json", "r", encoding="utf-8") as f:
    part2 = json.load(f)

# Combine
all_data = {}
all_data.update(part1)
all_data.update(part2)

for page in ["bit_manipulation", "stack_n_queue", "heaps", "greedy", "binary_tree", "binary_search_tree", "graphs", "dp", "tries"]:
    if page not in all_data:
        print(f"Page {page} not found in all_data")
        continue
    
    val = all_data[page]
    print(f"Page: {page} -> type of value: {type(val)}")
    
    # If list (like remaining_dsa_data.json format)
    if isinstance(val, list):
        print(f"  List containing {len(val)} items:")
        for idx, item in enumerate(val):
            # Check if it has title and problems or nested topics
            title = item.get('title')
            problems = item.get('problems', [])
            print(f"    Item {idx}: '{title}' with {len(problems)} problems")
            if problems and idx == 0:
                print(f"      Sample problem: {problems[0]}")
    # If dict (like extracted_dsa_data.json format)
    elif isinstance(val, dict):
        print(f"  Dict containing {len(val)} keys:")
        for key, problems in val.items():
            print(f"    Key '{key}' with {len(problems)} problems")
            if problems:
                print(f"      Sample problem: {problems[0]}")
