import json

with open("scratch/extracted_dsa_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print("All keys in JSON:")
print(list(data.keys()))
