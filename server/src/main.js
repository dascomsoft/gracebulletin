
// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   // Chemin CORRECT : depuis src/ vers build/
//   mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
//   mainWindow.webContents.openDevTools(); // Pour voir les erreurs
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });




































// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false,                // 🔥 Permet de charger assets localement
//       allowRunningInsecureContent: true  // 🔥 Evite les blocages de scripts
//     }
//   });

//   // Chemin CORRECT : depuis src/ vers build/
//   mainWindow.loadFile(path.join(__dirname, '../build/index.html'));

//   mainWindow.webContents.openDevTools(); // Pour voir les erreurs
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });








// const { app, BrowserWindow, protocol } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   // Permet à Electron de résoudre correctement les chemins relatifs
//   protocol.interceptFileProtocol('file', (request, callback) => {
//     let url = request.url.substr(7); // supprime "file://"
//     callback({ path: path.normalize(url) });
//   });

//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false,                // permet Vite + React
//       allowRunningInsecureContent: true
//     }
//   });

//   mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
//   mainWindow.webContents.openDevTools();
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
























// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcryptjs');
// const cors = require('cors');

// let mainWindow;

// function createWindow() {
//   const serverApp = express();
//   const port = 3000;

//   // Middleware
//   serverApp.use(cors());
//   serverApp.use(express.json());

//   // Servir le build React
//   serverApp.use(express.static(path.join(__dirname, '../build')));

//   // Base de données SQLite
//   const dbPath = path.join(__dirname, '../database.db');
//   const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) console.error('Erreur DB:', err);
//     else {
//       console.log('✅ Base de données connectée');
//       // Créer table users
//       db.run(`
//         CREATE TABLE IF NOT EXISTS users (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           username TEXT UNIQUE NOT NULL,
//           password TEXT NOT NULL,
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//     }
//   });

//   // Routes API
//   serverApp.post('/api/signup', async (req, res) => {
//     const { username, password } = req.body;
    
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.run(
//         'INSERT INTO users (username, password) VALUES (?, ?)',
//         [username, hashedPassword],
//         function(err) {
//           if (err) {
//             res.status(400).json({ message: 'Utilisateur existe déjà' });
//           } else {
//             res.json({ message: 'Compte créé avec succès' });
//           }
//         }
//       );
//     } catch (error) {
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   });

//   serverApp.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
    
//     db.get(
//       'SELECT * FROM users WHERE username = ?',
//       [username],
//       async (err, user) => {
//         if (err || !user) {
//           res.status(401).json({ message: 'Utilisateur non trouvé' });
//         } else {
//           const isValid = await bcrypt.compare(password, user.password);
//           if (isValid) {
//             res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username } });
//           } else {
//             res.status(401).json({ message: 'Mot de passe incorrect' });
//           }
//         }
//       }
//     );
//   });

//   serverApp.listen(port, () => {
//     console.log(`🚀 Serveur sur http://localhost:${port}`);
//   });

//   // Fenêtre Electron
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL(`http://localhost:${port}`);
//   mainWindow.webContents.openDevTools();
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });























































// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcryptjs');
// const cors = require('cors');

// let mainWindow;

// function createWindow() {
//   const serverApp = express();
//   const port = 3000;

//   console.log('🚀 Démarrage du serveur Express...');

//   // Middleware
//   serverApp.use(cors());
//   serverApp.use(express.json());

//   // Servir le build React
//   serverApp.use(express.static(path.join(__dirname, '../build')));

//   // Base de données SQLite
//   const dbPath = path.join(__dirname, '../database.db');
//   const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//       console.error('❌ Erreur DB:', err);
//     } else {
//       console.log('✅ Base de données connectée:', dbPath);
//       // Créer table users
//       db.run(`
//         CREATE TABLE IF NOT EXISTS users (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           username TEXT UNIQUE NOT NULL,
//           password TEXT NOT NULL,
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//       `, (err) => {
//         if (err) console.error('❌ Erreur table:', err);
//         else console.log('✅ Table users prête');
//       });
//     }
//   });

//   // Routes API
//   serverApp.post('/api/signup', async (req, res) => {
//     console.log('📝 Inscription attempt:', req.body);
    
//     const { username, password } = req.body;
    
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.run(
//         'INSERT INTO users (username, password) VALUES (?, ?)',
//         [username, hashedPassword],
//         function(err) {
//           if (err) {
//             console.error('❌ Erreur inscription:', err);
//             res.status(400).json({ message: 'Utilisateur existe déjà' });
//           } else {
//             console.log('✅ Utilisateur créé:', username);
//             res.json({ message: 'Compte créé avec succès' });
//           }
//         }
//       );
//     } catch (error) {
//       console.error('❌ Erreur serveur:', error);
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//   });

//   serverApp.post('/api/login', (req, res) => {
//     console.log('🔐 Connexion attempt:', req.body);
    
//     const { username, password } = req.body;
    
//     db.get(
//       'SELECT * FROM users WHERE username = ?',
//       [username],
//       async (err, user) => {
//         if (err || !user) {
//           console.log('❌ Utilisateur non trouvé:', username);
//           res.status(401).json({ message: 'Utilisateur non trouvé' });
//         } else {
//           const isValid = await bcrypt.compare(password, user.password);
//           if (isValid) {
//             console.log('✅ Connexion réussie:', username);
//             res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username } });
//           } else {
//             console.log('❌ Mot de passe incorrect:', username);
//             res.status(401).json({ message: 'Mot de passe incorrect' });
//           }
//         }
//       }
//     );
//   });

//   // Route de test
//   serverApp.get('/api/test', (req, res) => {
//     console.log('✅ Test API appelé');
//     res.json({ message: 'API fonctionne!' });
//   });

//   serverApp.listen(port, () => {
//     console.log(`🚀 Serveur Express sur http://localhost:${port}`);
//   });

//   // Fenêtre Electron
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL(`http://localhost:${port}`);
//   mainWindow.webContents.openDevTools();
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });
























const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

let mainWindow;

function createWindow() {
  const serverApp = express();
  const port = 3000;

  console.log('🚀 Démarrage du serveur Express...');

  // MIDDLEWARE CORRIGÉ
  serverApp.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
  serverApp.use(express.json({ limit: '10mb' }));
  serverApp.use(express.urlencoded({ extended: true }));

  // Servir le build React
  serverApp.use(express.static(path.join(__dirname, '../build')));

  // Base de données SQLite
  const dbPath = path.join(__dirname, '../database.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Erreur DB:', err);
    } else {
      console.log('✅ Base de données connectée:', dbPath);
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) console.error('❌ Erreur table:', err);
        else console.log('✅ Table users prête');
      });
    }
  });

  // Middleware de logging pour les requêtes
  serverApp.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
  });

  // Routes API
  serverApp.post('/api/signup', async (req, res) => {
    console.log('📝 Inscription attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username et password requis' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function(err) {
          if (err) {
            console.error('❌ Erreur inscription:', err.message);
            if (err.message.includes('UNIQUE')) {
              res.status(400).json({ message: 'Utilisateur existe déjà' });
            } else {
              res.status(500).json({ message: 'Erreur base de données' });
            }
          } else {
            console.log('✅ Utilisateur créé:', username);
            res.json({ message: 'Compte créé avec succès' });
          }
        }
      );
    } catch (error) {
      console.error('❌ Erreur serveur:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  serverApp.post('/api/login', (req, res) => {
    console.log('🔐 Connexion attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username et password requis' });
    }

    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, user) => {
        if (err) {
          console.error('❌ Erreur DB:', err);
          res.status(500).json({ message: 'Erreur base de données' });
        } else if (!user) {
          console.log('❌ Utilisateur non trouvé:', username);
          res.status(401).json({ message: 'Utilisateur non trouvé' });
        } else {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            console.log('✅ Connexion réussie:', username);
            res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username } });
          } else {
            console.log('❌ Mot de passe incorrect:', username);
            res.status(401).json({ message: 'Mot de passe incorrect' });
          }
        }
      }
    );
  });

  serverApp.listen(port, () => {
    console.log(`🚀 Serveur Express sur http://localhost:${port}`);
  });

  // Fenêtre Electron
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false // Important pour le développement
    }
  });

  mainWindow.loadURL(`http://localhost:${port}`);
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});