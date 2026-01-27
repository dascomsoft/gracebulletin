#!/bin/bash

echo "🔍 DIAGNOSTIC DU SYSTÈME DE PHOTOS"

# 1. Trouver le dossier ecole details
echo "1. 📁 Recherche du dossier 'ecole details':"
find . -type d -name "*ecole*" -o -name "*details*" 2>/dev/null | grep -i "ecole\|details"

# 2. Vérifier la structure
echo -e "\n2. 📸 Structure trouvée:"
if [ -d "frontend/public/ecole details" ]; then
    echo "   ✅ Dossier trouvé: frontend/public/ecole details"
    cd "frontend/public/ecole details"
    echo "   📊 Contenu:"
    ls -la | head -10
    echo -e "\n   🏫 Sous-dossiers (classes):"
    find . -maxdepth 1 -type d | sort
    echo -e "\n   👤 Photos trouvées:"
    find . -name "*.jpg" -o -name "*.jpeg" | wc -l | xargs echo "   Total:"
    find . -name "*.jpg" -o -name "*.jpeg" | head -5
else
    echo "   ❌ Dossier non trouvé au chemin attendu"
    
    # Chercher ailleurs
    echo "   🔍 Recherche alternative..."
    find /home/dascom -type d -name "*ecole*" 2>/dev/null | head -5
fi

# 3. Vérifier la base de données
echo -e "\n3. 💾 Base de données:"
if [ -f "/home/dascom/.config/grace-bulletin/database.db" ]; then
    echo "   ✅ Base trouvée"
    sqlite3 /home/dascom/.config/grace-bulletin/database.db << SQL
SELECT 'Classes:' as label;
SELECT id, name, section, cycle FROM classes ORDER BY section, cycle, level;
SELECT 'Élèves:' as label;
SELECT COUNT(*) as total FROM students;
SELECT '---' as separator;
SQL
else
    echo "   ❌ Base non trouvée"
fi

# 4. Tester l'import manuellement
echo -e "\n4. 🧪 Test d'import manuel:"
cd /home/dascom/gracebulletin/server/database
node -e "
const fs = require('fs');
const path = require('path');

// Tester plusieurs chemins
const testPaths = [
    path.join(__dirname, '../../../frontend/public/ecole details'),
    '/home/dascom/gracebulletin/frontend/public/ecole details',
    path.join(process.cwd(), '../../../frontend/public/ecole details'),
    '/home/dascom/ecole details'
];

console.log('Chemins testés:');
testPaths.forEach(p => {
    const exists = fs.existsSync(p);
    console.log(\`  \${exists ? '✅' : '❌'} \${p}\`);
    
    if (exists) {
        const folders = fs.readdirSync(p, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        console.log(\`    → \${folders.length} dossiers: \${folders.join(', ')}\`);
    }
});
"

echo -e "\n✅ Diagnostic terminé"
