const database = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        console.log('📦 Initialisation base de données...');
        
        // Connecter
        await database.connect();
        
        // Lire et exécuter le schéma
        const schemaPath = path.join(__dirname, 'schema.sql');
        if (!fs.existsSync(schemaPath)) {
            throw new Error(`Fichier schema.sql introuvable: ${schemaPath}`);
        }
        
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await database.exec(schema);
        
        console.log('✅ Base de données initialisée');
        
        return { success: true };
        
    } catch (error) {
        console.error('❌ Erreur initialisation DB:', error);
        return { success: false, error: error.message };
    }
}

module.exports = initializeDatabase;