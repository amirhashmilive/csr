import json, os
with open('assets/images/fieldwork/manifest.json', encoding='utf-8') as f:
    d = json.load(f)
print('Total images:', d['totalImages'])
print('Categories:')
for c in d['categories']:
    print('  ' + c['name'] + ': ' + str(c['count']) + ' images')

print()
print('Spot-check (first image per category):')
missing = 0
for c in d['categories']:
    if c['images']:
        src = c['images'][0]['src']
        thumb = c['images'][0]['thumb']
        src_ok = os.path.exists(src)
        thumb_ok = os.path.exists(thumb)
        status = 'OK' if (src_ok and thumb_ok) else 'MISSING'
        if not (src_ok and thumb_ok):
            missing += 1
        print('  [' + status + '] ' + c['name'] + ': ' + src)
print()
print('Missing: ' + str(missing))
