import os
import glob

def fix_encoding(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original = content
    replacements = {
        'â€”': '—',
        'â€“': '–',
        'â€™': '’',
        'â€œ': '“',
        'â€': '”',
        'â€¢': '•',
        'â€': '”'
    }
    
    for bad, good in replacements.items():
        content = content.replace(bad, good)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for filepath in glob.glob('**/*.html', recursive=True):
    fix_encoding(filepath)
