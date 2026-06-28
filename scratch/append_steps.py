import json

# Read the generated steps
with open("scratch/formatted_steps.json", "r", encoding="utf-8") as f:
    new_steps = json.load(f)

# Read the existing TS file
with open("src/data/a2zDsaSheet.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Locate the last closing bracket of the array
# We look for the last '];' at the end of the file.
last_bracket_idx = content.rfind('];')
if last_bracket_idx == -1:
    raise ValueError("Could not find ending array bracket '];' in a2zDsaSheet.ts")

# Generate the serialized steps string
steps_str = json.dumps(new_steps, indent=2)
# Strip the outer brackets [ and ] of the serialized string so we can append them inside the existing array
# steps_str starts with '[\n' and ends with '\n]'
if steps_str.startswith('[\n') and steps_str.endswith('\n]'):
    steps_str = steps_str[2:-2]

# Insert the comma and the new steps
modified_content = content[:last_bracket_idx] + ",\n" + steps_str + "\n];\n"

# Write the modified content back to the TS file
with open("src/data/a2zDsaSheet.ts", "w", encoding="utf-8") as f:
    f.write(modified_content)

print("Successfully appended new steps to a2zDsaSheet.ts!")
