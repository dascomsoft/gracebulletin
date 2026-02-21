const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

// Déterminer le chemin de la base de données
const isDev = !app.isPackaged;
let dbPath;

if (isDev) {
  dbPath = path.join(__dirname, 'data.sqlite');
} else {
  dbPath = path.join(app.getPath('userData'), 'database.sqlite');
}

// Créer le dossier parent si nécessaire
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Ouvrir la base de données
const db = new Database(dbPath);

// Activer les foreign keys
db.pragma('foreign_keys = ON');

// Base de données avec méthodes compatibles
const database = {
  // Pour les requêtes qui retournent plusieurs lignes
  all: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    } catch (error) {
      console.error('❌ Erreur all:', error);
      throw error;
    }
  },
  
  // Pour les requêtes qui retournent une seule ligne
  get: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.get(...params);
    } catch (error) {
      console.error('❌ Erreur get:', error);
      throw error;
    }
  },
  
  // Pour les requêtes qui modifient (INSERT, UPDATE, DELETE)
  run: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      const result = stmt.run(...params);
      return { 
        id: result.lastInsertRowid, 
        changes: result.changes 
      };
    } catch (error) {
      console.error('❌ Erreur run:', error);
      throw error;
    }
  },
  
  // Exécuter plusieurs requêtes dans une transaction
  transaction: (callback) => {
    return db.transaction(callback);
  },
  
  // Fermer la base de données
  close: () => {
    db.close();
  }
};

module.exports = database;












































