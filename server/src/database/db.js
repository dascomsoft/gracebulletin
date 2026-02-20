// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const fs = require('fs');

// class Database {
//     constructor() {
//         // Chemin dans AppData/grace-bulletin/database.db
//         const dbPath = path.join(
//             process.env.APPDATA || 
//             (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : 
//             process.env.HOME + '/.config'), 
//             'grace-bulletin', 
//             'database.db'
//         );
        
//         const dbDir = path.dirname(dbPath);
//         if (!fs.existsSync(dbDir)) {
//             fs.mkdirSync(dbDir, { recursive: true });
//         }
        
//         this.dbPath = dbPath;
//         this.db = null;
//     }

//     connect() {
//         return new Promise((resolve, reject) => {
//             this.db = new sqlite3.Database(this.dbPath, (err) => {
//                 if (err) {
//                     console.error('Erreur connexion SQLite:', err);
//                     reject(err);
//                 } else {
//                     console.log('✅ SQLite connecté:', this.dbPath);
//                     resolve();
//                 }
//             });
//         });
//     }

//     run(sql, params = []) {
//         return new Promise((resolve, reject) => {
//             this.db.run(sql, params, function(err) {
//                 if (err) {
//                     console.error('Erreur SQL run:', err, sql);
//                     reject(err);
//                 } else {
//                     resolve({ id: this.lastID, changes: this.changes });
//                 }
//             });
//         });
//     }

//     get(sql, params = []) {
//         return new Promise((resolve, reject) => {
//             this.db.get(sql, params, (err, row) => {
//                 if (err) {
//                     console.error('Erreur SQL get:', err, sql);
//                     reject(err);
//                 } else {
//                     resolve(row);
//                 }
//             });
//         });
//     }

//     all(sql, params = []) {
//         return new Promise((resolve, reject) => {
//             this.db.all(sql, params, (err, rows) => {
//                 if (err) {
//                     console.error('Erreur SQL all:', err, sql);
//                     reject(err);
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         });
//     }

//     exec(sql) {
//         return new Promise((resolve, reject) => {
//             this.db.exec(sql, (err) => {
//                 if (err) {
//                     console.error('Erreur SQL exec:', err);
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             });
//         });
//     }

//     close() {
//         return new Promise((resolve, reject) => {
//             this.db.close((err) => {
//                 if (err) {
//                     console.error('Erreur fermeture SQLite:', err);
//                     reject(err);
//                 } else {
//                     console.log('SQLite fermé');
//                     resolve();
//                 }
//             });
//         });
//     }
// }

// const database = new Database();
// module.exports = database;























































// Remplacer :
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(...);

// Par :
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

// Adapter les méthodes
const database = {
  // Pour les requêtes qui retournent plusieurs lignes
  all: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    } catch (error) {
      console.error('Erreur all:', error);
      throw error;
    }
  },
  
  // Pour les requêtes qui retournent une seule ligne
  get: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      return stmt.get(...params);
    } catch (error) {
      console.error('Erreur get:', error);
      throw error;
    }
  },
  
  // Pour les requêtes qui modifient (INSERT, UPDATE, DELETE)
  run: (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      const result = stmt.run(...params);
      return { id: result.lastInsertRowid, changes: result.changes };
    } catch (error) {
      console.error('Erreur run:', error);
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