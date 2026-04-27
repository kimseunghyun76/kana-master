import os
import re

with open('js/data/lecture-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern to capture everything from e.g. "wlevel_1: [" to "]," or "}]," etc.
# Actually, let's just find the first level object by analyzing the brackets.
# It's an object of arrays.
import json

# A quick and dirty way to parse JS object into Python dict if it's close to JSON.
# But it's not JSON (no quotes on keys, single quotes, comments).
# So let's use regex to extract each array.
levels = ['wlevel_1', 'wlevel_2', 'wlevel_3', 'wlevel_4', 'wlevel_5', 'wlevel_6', 'wlevel_7', 'wlevel_8',
          'slevel_1', 'slevel_2', 'slevel_3', 'slevel_4', 'slevel_5', 'slevel_6']

out_dir = 'js/data/lecture-data-v2'
os.makedirs(out_dir, exist_ok=True)

loader_script = "window.LECTURE_DATA = {};\n"

for level in levels:
    # Find the start of the level
    pattern = rf'\b{level}\s*:\s*\['
    match = re.search(pattern, text)
    if not match:
        continue

    start_idx = match.end() - 1 # Include the '['
    
    # Simple bracket matching
    bracket_count = 0
    end_idx = -1
    for i in range(start_idx, len(text)):
        if text[i] == '[':
            bracket_count += 1
        elif text[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i + 1
                break
    
    if end_idx != -1:
        array_content = text[start_idx:end_idx]
        
        # Don't overwrite wlevel_1 and wlevel_2 since they have custom content
        if level not in ['wlevel_1', 'wlevel_2']:
            file_content = f"window.LECTURE_DATA = window.LECTURE_DATA || {{}};\nwindow.LECTURE_DATA.{level} = {array_content};\n"
            with open(f"{out_dir}/{level}.js", "w", encoding='utf-8') as f:
                f.write(file_content)
        
        loader_script += f"document.write('<script src=\"js/data/lecture-data-v2/{level}.js\"></script>');\n"

with open(f"{out_dir}/index.js", "w", encoding='utf-8') as f:
    f.write(loader_script)

print("Done.")
