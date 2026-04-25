import os
import json
import re

base_path = '/Users/isay6/Desktop/VIBOCAMISETAS'

# Folder to Section mapping
mapping = {
    'Laliga': 'LaLiga',
    'Premier': 'Premier League',
    'Bundesliga': 'Bundesliga',
    'Serie A': 'Serie A',
    'Ligue 1': 'Ligue 1',
    'Chandal': 'Chándal',
    'Chaquetas': 'Chaquetas',
    'Parkas': 'Chaquetas',
    'Sudaderas': 'Sudaderas',
    'Formula': 'Fórmula 1',
    'NBA_NFL': 'NBA / NFL',
    'World Cup': 'World Cup',
    'Retro': 'Retro',
    'DORSALES': 'MIX',
    'FRONTALES': 'MIX',
    'Liga Argentina': 'Liga Argentina',
    'Resto del Mundo': 'Resto del Mundo',
    'Pantalones': 'Pantalones',
    'Hoodie Suit': 'Suits / Conjuntos',
    'Jacket Suit': 'Suits / Conjuntos',
    'Polo Suit': 'Suits / Conjuntos'
}

def get_section(folder_name):
    # Check exact match first
    if folder_name in mapping:
        return mapping[folder_name]
    
    # Check partial match (e.g. "Laliga 1" matches "Laliga")
    for key, value in mapping.items():
        if key in folder_name:
            return value
    
    # Default categories for numbered folders or others
    if folder_name in ['1', '2', '3', '4']:
        return 'MIX'
    
    return folder_name # Keep as is if no mapping found

products = []
folders = [f for f in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, f))]

for folder in folders:
    if folder in ['scratch', 'MEDIDAS', '.git', '.vscode']:
        continue
        
    section = get_section(folder)
    folder_path = os.path.join(base_path, folder)
    
    files = os.listdir(folder_path)
    for file in files:
        if file.lower().endswith(('.webp', '.png', '.jpg', '.jpeg')):
            # Clean up name
            name = file.split('.')[0]
            name = re.sub(r'imgi_\d+_\d+', '', name) # Remove original imgi prefixes
            name = name.replace('_', ' ').strip()
            
            if not name:
                name = f"Producto {folder}"
            else:
                name = name.capitalize()

            products.append({
                'id': f"{folder}_{file}",
                'category': section,
                'image': f"{folder}/{file}",
                'name': name
            })

# Sort products by category
products.sort(key=lambda x: x['category'])

with open(os.path.join(base_path, 'products.js'), 'w') as f:
    f.write('const products = ')
    f.write(json.dumps(products, indent=4))
    f.write(';')

print(f"Generated products.js with {len(products)} products in unified sections.")
