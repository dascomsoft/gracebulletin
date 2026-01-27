const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Database {
    constructor() {
        // Chemin dans AppData/grace-bulletin/database.db
        const dbPath = path.join(
            process.env.APPDATA || 
            (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : 
            process.env.HOME + '/.config'), 
            'grace-bulletin', 
            'database.db'
        );
        
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        this.dbPath = dbPath;
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Erreur connexion SQLite:', err);
                    reject(err);
                } else {
                    console.log('✅ SQLite connecté:', this.dbPath);
                    resolve();
                }
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    console.error('Erreur SQL run:', err, sql);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    console.error('Erreur SQL get:', err, sql);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error('Erreur SQL all:', err, sql);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    exec(sql) {
        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    console.error('Erreur SQL exec:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('Erreur fermeture SQLite:', err);
                    reject(err);
                } else {
                    console.log('SQLite fermé');
                    resolve();
                }
            });
        });
    }
}

const database = new Database();
module.exports = database;