#!/bin/bash

echo "🔍 DIAGNOSTIC COMPLET Grace Bulletin"

echo "1. ✅ Processus en cours:"
ps aux | grep -E "(electron|node.*server|vite)" | grep -v grep

echo -e "\n2. 📡 Test API:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000/api/health
curl -s http://localhost:3000/api/classes?section=anglophone | jq '. | length' | xargs echo "Classes anglophones:"

echo -e "\n3. 💾 Base de données:"
ls -la /home/dascom/.config/grace-bulletin/database.db 2>/dev/null || echo "Base non trouvée"

echo -e "\n4. 📁 Frontend:"
ls -la frontend/dist/index.html 2>/dev/null || echo "Build frontend non trouvé"

echo -e "\n5. 🌐 Ports ouverts:"
netstat -tulpn 2>/dev/null | grep -E "(3000|5173|8080)" || echo "Ports non trouvés"

echo -e "\n6. 🔧 Configuration Electron:"
cd server && cat package.json | grep -A5 '"scripts"'

echo -e "\n✅ Diagnostic terminé"
