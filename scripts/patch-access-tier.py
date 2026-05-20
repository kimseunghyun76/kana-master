#!/usr/bin/env python3
"""
curriculum.js에서 stageId 9, 10, 11 모듈의 accessTier: 'free'를 'plus'로 변경
UTF-8 인코딩 유지
"""
import re

filepath = 'apps/current-v3/js/curriculum.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# stageId 9, 10, 11 블록에서 accessTier: 'free' → 'plus'로 변경
# 각 모듈 객체 블록을 파싱하여 stageId가 9/10/11인 경우만 변경
lines = content.split('\n')
result = []
current_stage_id = 0

for line in lines:
    # stageId 감지
    m = re.search(r"stageId:\s*(\d+)", line)
    if m:
        current_stage_id = int(m.group(1))
    
    # stageId 9, 10, 11인 경우 accessTier: 'free' → 'plus'
    if current_stage_id >= 9 and "accessTier: 'free'" in line:
        line = line.replace("accessTier: 'free'", "accessTier: 'plus'")
    
    result.append(line)

new_content = '\n'.join(result)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

# 변경 확인
changed = [(i+1, l) for i, l in enumerate(new_content.split('\n')) if "accessTier: 'plus'" in l]
print(f"Changed {len(changed)} lines to 'plus':")
for lineno, line in changed:
    print(f"  Line {lineno}: {line.strip()}")
