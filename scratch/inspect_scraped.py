import json

with open("scratch/extracted_dsa_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for page, categories in data.items():
    print(f"Page: {page}")
    for cat_name, problems in categories.items():
        print(f"  Category: '{cat_name}' with {len(problems)} problems")
