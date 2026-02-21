// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const Database = require('better-sqlite3');

// // ============ CONFIGURATION ============
// const isDev = !app.isPackaged;
// console.log(`🎓 Mode: ${isDev ? 'DÉVELOPPEMENT' : 'PRODUCTION'}`);

// // ============ CHEMINS INTELLIGENTS ============
// let FRONTEND_PUBLIC_PATH, FRONTEND_DIST_PATH, DB_PATH;

// if (isDev) {
//     // Développement
//     FRONTEND_PUBLIC_PATH = path.join(__dirname, '../../frontend/public');
//     FRONTEND_DIST_PATH = path.join(__dirname, '../../frontend/dist');
//     DB_PATH = path.join(__dirname, 'database.sqlite');
// } else {
//     // Production
//     const possiblePaths = [
//         path.join(process.resourcesPath, 'app.asar', 'frontend'),
//         path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend'),
//         path.join(__dirname, '../../frontend')
//     ];
    
//     let frontendPath = possiblePaths.find(p => fs.existsSync(p)) || path.join(__dirname, '../../frontend');
    
//     FRONTEND_PUBLIC_PATH = path.join(frontendPath, 'public');
//     FRONTEND_DIST_PATH = path.join(frontendPath, 'dist');
//     DB_PATH = path.join(app.getPath('userData'), 'database.sqlite');
// }

// console.log(`📁 Public: ${FRONTEND_PUBLIC_PATH}`);
// console.log(`📁 Dist: ${FRONTEND_DIST_PATH}`);
// console.log(`🗄️  DB: ${DB_PATH}`);

// // ============ BASE DE DONNÉES ============
// const dbDir = path.dirname(DB_PATH);
// if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// const db = new Database(DB_PATH);
// db.pragma('foreign_keys = ON');

// // ============ INITIALISATION DES TABLES ============
// console.log('🔄 Initialisation de la base de données...');

// // Table classes
// db.exec(`
//     CREATE TABLE IF NOT EXISTS classes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         display_name TEXT,
//         section TEXT,
//         cycle TEXT,
//         level INTEGER,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
// `);

// // Table students
// db.exec(`
//     CREATE TABLE IF NOT EXISTS students (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         first_name TEXT NOT NULL,
//         last_name TEXT NOT NULL,
//         full_name TEXT,
//         matricule TEXT UNIQUE,
//         class_id INTEGER,
//         class_name TEXT,
//         sex TEXT,
//         photo_path TEXT,
//         academic_year TEXT,
//         status TEXT DEFAULT 'active',
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (class_id) REFERENCES classes(id)
//     )
// `);

// // Table bulletins
// db.exec(`
//     CREATE TABLE IF NOT EXISTS bulletins (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         student_id INTEGER NOT NULL,
//         bulletin_type TEXT NOT NULL,
//         trimester INTEGER NOT NULL,
//         academic_year TEXT NOT NULL,
//         nom_eleve TEXT,
//         classe TEXT,
//         data_json TEXT,
//         appreciation TEXT,
//         decision TEXT,
//         is_finalized BOOLEAN DEFAULT 0,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (student_id) REFERENCES students(id)
//     )
// `);

// // ============ CLASSES PAR DÉFAUT ============
// const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
// if (classesCount.count === 0) {
//     console.log('📚 Insertion des classes par défaut...');
    
//     const defaultClasses = [
//         // Francophone - Maternelle
//         ['PETITE SECTION', 'Petite Section', 'francophone', 'maternelle', 1],
//         ['MOYENNE SECTION', 'Moyenne Section', 'francophone', 'maternelle', 2],
//         ['GRANDE SECTION', 'Grande Section', 'francophone', 'maternelle', 3],
//         // Francophone - Primaire
//         ['SIL', 'SIL', 'francophone', 'primaire', 4],
//         ['CP', 'CP', 'francophone', 'primaire', 5],
//         ['CEI', 'CEI', 'francophone', 'primaire', 6],
//         ['CEII', 'CEII', 'francophone', 'primaire', 7],
//         ['CM1', 'CM1', 'francophone', 'primaire', 8],
//         ['CM2', 'CM2', 'francophone', 'primaire', 9],
//         // Anglophone - Nursery
//         ['PRE-NURSERY', 'Pre-Nursery', 'anglophone', 'nursery', 1],
//         ['NURSERY 1', 'Nursery 1', 'anglophone', 'nursery', 2],
//         ['NURSERY 2', 'Nursery 2', 'anglophone', 'nursery', 3],
//         // Anglophone - Primary
//         ['CLASS 1', 'Class 1', 'anglophone', 'primary', 4],
//         ['CLASS 2', 'Class 2', 'anglophone', 'primary', 5],
//         ['CLASS 3', 'Class 3', 'anglophone', 'primary', 6],
//         ['CLASS 4', 'Class 4', 'anglophone', 'primary', 7],
//         ['CLASS 5', 'Class 5', 'anglophone', 'primary', 8],
//         ['CLASS 6', 'Class 6', 'anglophone', 'primary', 9]
//     ];
    
//     const insert = db.prepare('INSERT INTO classes (name, display_name, section, cycle, level) VALUES (?, ?, ?, ?, ?)');
//     defaultClasses.forEach(cls => insert.run(cls));
//     console.log('✅ Classes par défaut insérées');
// }

// console.log('✅ Base de données prête');

// // ============ FONCTIONS UTILITAIRES ============
// function getCurrentAcademicYear() {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     return month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
// }

// // ============ SERVEUR EXPRESS ============
// const appExpress = express();
// const PORT = 3000;

// appExpress.use(cors());
// appExpress.use(express.json({ limit: '10mb' }));
// appExpress.use(express.urlencoded({ extended: true }));
// appExpress.use('/public', express.static(FRONTEND_PUBLIC_PATH));
// appExpress.use(express.static(FRONTEND_PUBLIC_PATH));

// // ============ API ROUTES ============

// // 1. Santé
// appExpress.get('/api/health', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         academic_year: getCurrentAcademicYear(),
//         db: DB_PATH,
//         mode: isDev ? 'dev' : 'prod'
//     });
// });

// // 2. Année scolaire
// appExpress.get('/api/academic-year/current', (req, res) => {
//     res.json({ academic_year: getCurrentAcademicYear() });
// });

// // 3. TOUTES LES ROUTES POUR LES CLASSES

// // Route 3a: Classes avec paramètres dans l'URL (utilisée par ClassList.jsx)
// appExpress.get('/api/classes/:section/:cycle', (req, res) => {
//     try {
//         const { section, cycle } = req.params;
//         console.log(`📋 Récupération des classes: section=${section}, cycle=${cycle}`);
        
//         const classes = db.prepare(`
//             SELECT * FROM classes 
//             WHERE section = ? AND cycle = ? 
//             ORDER BY level
//         `).all(section, cycle);
        
//         console.log(`📊 ${classes.length} classes trouvées`);
//         res.json(classes);
//     } catch (error) {
//         console.error('❌ Erreur récupération classes:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route 3b: Classes avec query parameters (format alternatif)
// appExpress.get('/api/classes', (req, res) => {
//     try {
//         const { section, cycle } = req.query;
//         let sql = 'SELECT * FROM classes WHERE 1=1';
//         const params = [];
        
//         if (section) {
//             sql += ' AND section = ?';
//             params.push(section);
//         }
//         if (cycle) {
//             sql += ' AND cycle = ?';
//             params.push(cycle);
//         }
//         sql += ' ORDER BY level';
        
//         const classes = db.prepare(sql).all(params);
//         res.json(classes);
//     } catch (error) {
//         console.error('❌ Erreur récupération classes:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route 4: Classe par ID
// appExpress.get('/api/classes/id/:id', (req, res) => {
//     try {
//         const classe = db.prepare('SELECT * FROM classes WHERE id = ?').get(req.params.id);
//         if (!classe) {
//             return res.status(404).json({ error: 'Classe non trouvée' });
//         }
//         res.json(classe);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 5. Élèves d'une classe
// appExpress.get('/api/class/:id/students', (req, res) => {
//     try {
//         const students = db.prepare(`
//             SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
//             FROM students s
//             LEFT JOIN classes c ON s.class_id = c.id
//             WHERE s.class_id = ? AND s.status = 'active'
//             ORDER BY s.full_name
//         `).all(req.params.id);
        
//         res.json(students);
//     } catch (error) {
//         console.error('❌ Erreur récupération élèves:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 6. Élève par ID
// appExpress.get('/api/student/:id', (req, res) => {
//     try {
//         const student = db.prepare(`
//             SELECT s.*, c.name as class_display_name, c.section, c.cycle
//             FROM students s
//             LEFT JOIN classes c ON s.class_id = c.id
//             WHERE s.id = ?
//         `).get(req.params.id);
        
//         if (!student) {
//             return res.status(404).json({ error: 'Élève non trouvé' });
//         }
        
//         res.json(student);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 7. Ajouter un élève
// appExpress.post('/api/student', (req, res) => {
//     try {
//         const { first_name, last_name, class_id, sex = '' } = req.body;
        
//         if (!first_name || !last_name || !class_id) {
//             return res.status(400).json({ error: 'Données manquantes' });
//         }

//         const classRow = db.prepare('SELECT name FROM classes WHERE id = ?').get(class_id);
//         if (!classRow) {
//             return res.status(400).json({ error: 'Classe non trouvée' });
//         }

//         const full_name = `${first_name} ${last_name}`.trim();
//         const matricule = `MAT-${Date.now().toString().slice(-6)}`;
//         const academic_year = getCurrentAcademicYear();
        
//         const result = db.prepare(`
//             INSERT INTO students 
//             (first_name, last_name, full_name, matricule, class_id, class_name, sex, academic_year, status)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
//         `).run(
//             first_name.trim(),
//             last_name.trim(),
//             full_name,
//             matricule,
//             class_id,
//             classRow.name,
//             sex,
//             academic_year
//         );

//         res.json({ 
//             success: true, 
//             studentId: result.lastInsertRowid,
//             matricule,
//             full_name,
//             message: 'Élève ajouté avec succès'
//         });
//     } catch (error) {
//         console.error('❌ Erreur ajout élève:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 8. Supprimer un élève
// appExpress.delete('/api/student/:id', (req, res) => {
//     try {
//         const result = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
//         res.json({ 
//             success: true, 
//             changes: result.changes,
//             message: result.changes ? 'Élève supprimé' : 'Élève non trouvé'
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 9. Bulletins d'un élève
// appExpress.get('/api/student/:id/bulletins', (req, res) => {
//     try {
//         const bulletins = db.prepare(`
//             SELECT * FROM bulletins 
//             WHERE student_id = ? 
//             ORDER BY trimester
//         `).all(req.params.id);
//         res.json(bulletins);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 10. Sauvegarder un bulletin
// appExpress.post('/api/bulletins/save', (req, res) => {
//     try {
//         const bulletin = req.body;
        
//         // Vérifier si le bulletin existe déjà
//         const existing = db.prepare(`
//             SELECT id FROM bulletins 
//             WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
//         `).get(
//             bulletin.student_id,
//             bulletin.bulletin_type,
//             bulletin.trimester,
//             bulletin.academic_year || getCurrentAcademicYear()
//         );

//         if (existing) {
//             // Mise à jour
//             db.prepare(`
//                 UPDATE bulletins 
//                 SET data_json = ?, 
//                     appreciation = ?, 
//                     decision = ?, 
//                     is_finalized = ?, 
//                     updated_at = CURRENT_TIMESTAMP
//                 WHERE id = ?
//             `).run(
//                 JSON.stringify(bulletin.data || {}),
//                 bulletin.appreciation || '',
//                 bulletin.decision || '',
//                 bulletin.is_finalized ? 1 : 0,
//                 existing.id
//             );
//             res.json({ success: true, id: existing.id, action: 'update' });
//         } else {
//             // Création
//             const result = db.prepare(`
//                 INSERT INTO bulletins 
//                 (student_id, bulletin_type, trimester, academic_year, nom_eleve, classe, data_json, appreciation, decision, is_finalized)
//                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `).run(
//                 bulletin.student_id,
//                 bulletin.bulletin_type,
//                 bulletin.trimester,
//                 bulletin.academic_year || getCurrentAcademicYear(),
//                 bulletin.nom_eleve || '',
//                 bulletin.classe || '',
//                 JSON.stringify(bulletin.data || {}),
//                 bulletin.appreciation || '',
//                 bulletin.decision || '',
//                 bulletin.is_finalized ? 1 : 0
//             );
//             res.json({ success: true, id: result.lastInsertRowid, action: 'create' });
//         }
//     } catch (error) {
//         console.error('❌ Erreur sauvegarde bulletin:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 11. Route test complète
// appExpress.get('/api/test', (req, res) => {
//     // Récupérer quelques stats pour le test
//     const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
//     const studentsCount = db.prepare('SELECT COUNT(*) as count FROM students').get();
    
//     res.json({
//         message: '✅ API intégrée fonctionne parfaitement !',
//         academic_year: getCurrentAcademicYear(),
//         mode: isDev ? 'dev' : 'prod',
//         db_path: DB_PATH,
//         stats: {
//             classes: classesCount.count,
//             students: studentsCount.count
//         },
//         routes: {
//             classes_by_params: 'GET /api/classes/:section/:cycle',
//             classes_by_query: 'GET /api/classes?section=&cycle=',
//             class_by_id: 'GET /api/classes/id/:id',
//             class_students: 'GET /api/class/:id/students',
//             student_by_id: 'GET /api/student/:id',
//             add_student: 'POST /api/student',
//             delete_student: 'DELETE /api/student/:id',
//             student_bulletins: 'GET /api/student/:id/bulletins',
//             save_bulletin: 'POST /api/bulletins/save'
//         }
//     });
// });

// // 12. Route pour récupérer une photo

// // Route pour récupérer une classe par ID (celle qui manque)
// appExpress.get('/api/classes/:id', (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(`📋 Récupération classe ID: ${id}`);
        
//         const classe = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
        
//         if (!classe) {
//             return res.status(404).json({ error: 'Classe non trouvée' });
//         }
        
//         res.json(classe);
//     } catch (error) {
//         console.error('❌ Erreur récupération classe:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route pour uploader une photo
// appExpress.post('/api/upload/student-photo', (req, res) => {
//     console.log('📸 Upload de photo démarré...');
    
//     const multer = require('multer');
    
//     const upload = multer({
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 const uploadDir = path.join(FRONTEND_PUBLIC_PATH, 'temp');
//                 if (!fs.existsSync(uploadDir)) {
//                     fs.mkdirSync(uploadDir, { recursive: true });
//                 }
//                 cb(null, uploadDir);
//             },
//             filename: function (req, file, cb) {
//                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//                 const ext = path.extname(file.originalname);
//                 const filename = 'temp-photo-' + uniqueSuffix + ext;
//                 cb(null, filename);
//             }
//         }),
//         limits: { fileSize: 5 * 1024 * 1024 },
//         fileFilter: (req, file, cb) => {
//             if (file.mimetype.startsWith('image/')) {
//                 cb(null, true);
//             } else {
//                 cb(new Error('Seules les images sont autorisées'), false);
//             }
//         }
//     }).single('photo');
    
//     upload(req, res, function(err) {
//         if (err) {
//             console.error('❌ Erreur upload:', err);
//             return res.status(500).json({ error: err.message });
//         }
        
//         if (!req.file) {
//             return res.status(400).json({ error: 'Aucun fichier' });
//         }
        
//         console.log(`✅ Photo uploadée: ${req.file.filename}`);
        
//         res.json({
//             success: true,
//             photo_path: 'temp/' + req.file.filename,
//             message: 'Photo uploadée'
//         });
//     });
// });
















// appExpress.get('/api/photo/:path(*)', (req, res) => {
//     const photoPath = path.join(FRONTEND_PUBLIC_PATH, req.params.path);
//     if (fs.existsSync(photoPath)) {
//         res.sendFile(photoPath);
//     } else {
//         res.status(404).json({ error: 'Photo non trouvée' });
//     }
// });

// // ============ SERVIR LE FRONTEND ============
// // En production, servir les fichiers statiques du frontend
// if (!isDev) {
//     appExpress.use(express.static(FRONTEND_DIST_PATH));
    
//     // Pour le routage côté client (React Router)
//     appExpress.get('*', (req, res) => {
//         if (!req.path.startsWith('/api')) {
//             res.sendFile(path.join(FRONTEND_DIST_PATH, 'index.html'));
//         }
//     });
// }

// // ============ FENÊTRE ELECTRON ============
// let mainWindow;

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 1400,
//         height: 900,
//         minWidth: 1000,
//         minHeight: 700,
//         show: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true
//         },
//         icon: path.join(FRONTEND_PUBLIC_PATH, 'icon.ico')
//     });

//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//         mainWindow.focus();
//     });

//     // Charger l'application
//     if (isDev) {
//         // Développement : serveur Vite
//         mainWindow.loadURL('http://localhost:5173');
//         mainWindow.webContents.openDevTools();
//         console.log('🔄 Chargement depuis Vite (http://localhost:5173)');
//     } else {
//         // Production : fichiers statiques
//         const indexPath = path.join(FRONTEND_DIST_PATH, 'index.html');
//         console.log(`🔄 Chargement depuis ${indexPath}`);
//         mainWindow.loadFile(indexPath);
//     }

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });
// }

// // ============ DÉMARRAGE ============
// const server = appExpress.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Serveur API intégré: http://localhost:${PORT}`);
//     console.log(`📅 Année scolaire: ${getCurrentAcademicYear()}`);
    
//     // Tester la connexion DB
//     try {
//         const test = db.prepare('SELECT 1').get();
//         console.log('✅ Connexion DB OK');
//     } catch (error) {
//         console.error('❌ Erreur DB:', error);
//     }
    
//     app.whenReady().then(() => {
//         setTimeout(createWindow, 1500);
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         server.close();
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// console.log('🎓 Gestion Bulletin - Version Professionnelle');
// console.log('📝 Routes API disponibles:');
// console.log('   GET  /api/test');
// console.log('   GET  /api/health');
// console.log('   GET  /api/classes/:section/:cycle');
// console.log('   GET  /api/class/:id/students');
// console.log('   POST /api/student');















// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const Database = require('better-sqlite3');
// const multer = require('multer');

// // ============ CONFIGURATION ============
// const isDev = !app.isPackaged;
// console.log(`🎓 Mode: ${isDev ? 'DÉVELOPPEMENT' : 'PRODUCTION'}`);

// // ============ CHEMINS INTELLIGENTS ============
// let FRONTEND_PUBLIC_PATH, FRONTEND_DIST_PATH, DB_PATH;

// if (isDev) {
//     // Développement
//     FRONTEND_PUBLIC_PATH = path.join(__dirname, '../../frontend/public');
//     FRONTEND_DIST_PATH = path.join(__dirname, '../../frontend/dist');
//     DB_PATH = path.join(__dirname, 'database.sqlite');
// } else {
//     // Production
//     const possiblePaths = [
//         path.join(process.resourcesPath, 'app.asar', 'frontend'),
//         path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend'),
//         path.join(__dirname, '../../frontend')
//     ];
    
//     let frontendPath = possiblePaths.find(p => fs.existsSync(p)) || path.join(__dirname, '../../frontend');
    
//     FRONTEND_PUBLIC_PATH = path.join(frontendPath, 'public');
//     FRONTEND_DIST_PATH = path.join(frontendPath, 'dist');
//     DB_PATH = path.join(app.getPath('userData'), 'database.sqlite');
// }

// console.log(`📁 Public: ${FRONTEND_PUBLIC_PATH}`);
// console.log(`📁 Dist: ${FRONTEND_DIST_PATH}`);
// console.log(`🗄️  DB: ${DB_PATH}`);

// // ============ CRÉATION DES DOSSIERS NÉCESSAIRES ============
// const tempDir = path.join(FRONTEND_PUBLIC_PATH, 'temp');
// if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir, { recursive: true });
//     console.log('📁 Dossier temp créé');
// }

// const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
// if (!fs.existsSync(ecoleDetailsDir)) {
//     fs.mkdirSync(ecoleDetailsDir, { recursive: true });
//     console.log('📁 Dossier ecole details créé');
// }

// // ============ BASE DE DONNÉES ============
// const dbDir = path.dirname(DB_PATH);
// if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// const db = new Database(DB_PATH);
// db.pragma('foreign_keys = ON');

// // ============ INITIALISATION DES TABLES ============
// console.log('🔄 Initialisation de la base de données...');

// // Table classes
// db.exec(`
//     CREATE TABLE IF NOT EXISTS classes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         display_name TEXT,
//         section TEXT,
//         cycle TEXT,
//         level INTEGER,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
// `);

// // Table students
// db.exec(`
//     CREATE TABLE IF NOT EXISTS students (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         first_name TEXT NOT NULL,
//         last_name TEXT NOT NULL,
//         full_name TEXT,
//         matricule TEXT UNIQUE,
//         class_id INTEGER,
//         class_name TEXT,
//         sex TEXT,
//         photo_path TEXT,
//         academic_year TEXT,
//         status TEXT DEFAULT 'active',
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (class_id) REFERENCES classes(id)
//     )
// `);

// // Table bulletins (version complète avec toutes les colonnes)
// db.exec(`
//     CREATE TABLE IF NOT EXISTS bulletins (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         student_id INTEGER NOT NULL,
//         bulletin_type TEXT NOT NULL,
//         trimester INTEGER NOT NULL,
//         sequence_type TEXT,
//         academic_year TEXT NOT NULL,
//         nom_eleve TEXT,
//         matricule TEXT,
//         sex TEXT,
//         classe TEXT,
//         enseignant TEXT,
//         photo_data TEXT,
//         data_json TEXT NOT NULL,
//         moyenne_generale TEXT,
//         appreciation TEXT,
//         rang_position TEXT,
//         decision TEXT,
//         totals_json TEXT,
//         teacher_signature TEXT,
//         headmaster_signature TEXT,
//         parent_signature TEXT,
//         is_finalized INTEGER DEFAULT 0,
//         is_draft INTEGER DEFAULT 1,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (student_id) REFERENCES students(id),
//         UNIQUE(student_id, bulletin_type, trimester, academic_year)
//     )
// `);

// // ============ VÉRIFICATION ET AJOUT DES COLONNES MANQUANTES ============
// try {
//     // Vérifier si la colonne is_draft existe dans bulletins
//     const tableInfo = db.prepare("PRAGMA table_info(bulletins)").all();
//     const hasIsDraft = tableInfo.some(col => col.name === 'is_draft');
    
//     if (!hasIsDraft) {
//         console.log('📝 Ajout de la colonne is_draft à la table bulletins...');
//         db.exec(`ALTER TABLE bulletins ADD COLUMN is_draft INTEGER DEFAULT 1;`);
//         console.log('✅ Colonne is_draft ajoutée avec succès');
//     } else {
//         console.log('✅ Colonne is_draft déjà présente');
//     }
// } catch (error) {
//     console.error('❌ Erreur lors de la vérification/ajout de colonne:', error);
// }

// // ============ CLASSES PAR DÉFAUT ============
// const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
// if (classesCount.count === 0) {
//     console.log('📚 Insertion des classes par défaut...');
    
//     const defaultClasses = [
//         // Francophone - Maternelle
//         ['PETITE SECTION', 'Petite Section', 'francophone', 'maternelle', 1],
//         ['MOYENNE SECTION', 'Moyenne Section', 'francophone', 'maternelle', 2],
//         ['GRANDE SECTION', 'Grande Section', 'francophone', 'maternelle', 3],
//         // Francophone - Primaire
//         ['SIL', 'SIL', 'francophone', 'primaire', 4],
//         ['CP', 'CP', 'francophone', 'primaire', 5],
//         ['CEI', 'CEI', 'francophone', 'primaire', 6],
//         ['CEII', 'CEII', 'francophone', 'primaire', 7],
//         ['CM1', 'CM1', 'francophone', 'primaire', 8],
//         ['CM2', 'CM2', 'francophone', 'primaire', 9],
//         // Anglophone - Nursery
//         ['PRE-NURSERY', 'Pre-Nursery', 'anglophone', 'nursery', 1],
//         ['NURSERY 1', 'Nursery 1', 'anglophone', 'nursery', 2],
//         ['NURSERY 2', 'Nursery 2', 'anglophone', 'nursery', 3],
//         // Anglophone - Primary
//         ['CLASS 1', 'Class 1', 'anglophone', 'primary', 4],
//         ['CLASS 2', 'Class 2', 'anglophone', 'primary', 5],
//         ['CLASS 3', 'Class 3', 'anglophone', 'primary', 6],
//         ['CLASS 4', 'Class 4', 'anglophone', 'primary', 7],
//         ['CLASS 5', 'Class 5', 'anglophone', 'primary', 8],
//         ['CLASS 6', 'Class 6', 'anglophone', 'primary', 9]
//     ];
    
//     const insert = db.prepare('INSERT INTO classes (name, display_name, section, cycle, level) VALUES (?, ?, ?, ?, ?)');
//     defaultClasses.forEach(cls => insert.run(cls));
//     console.log('✅ Classes par défaut insérées');
// }

// // ============ FONCTIONS UTILITAIRES ============
// function getCurrentAcademicYear() {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     return month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
// }

// // ============ IMPORT AUTOMATIQUE DES ÉLÈVES DEPUIS LES DOSSIERS ============
// function importStudentsFromFolders() {
//     console.log('🔍 Recherche des élèves dans les dossiers...');
    
//     try {
//         const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
        
//         if (!fs.existsSync(ecoleDetailsDir)) {
//             console.log('📁 Dossier ecole details non trouvé');
//             return;
//         }

//         // Récupérer toutes les classes de la base de données
//         const classes = db.prepare('SELECT id, name FROM classes').all();
//         let totalImported = 0;
//         let totalSkipped = 0;

//         // Lire tous les dossiers dans ecole details
//         const folders = fs.readdirSync(ecoleDetailsDir).filter(item => {
//             const itemPath = path.join(ecoleDetailsDir, item);
//             return fs.statSync(itemPath).isDirectory();
//         });

//         console.log(`📁 Dossiers trouvés: ${folders.join(', ')}`);

//         // Dictionnaire de correspondance pour les classes anglophones
//         const folderMap = {
//             'NURSERY1 AND PRE-NURSERY': ['PRE-NURSERY', 'NURSERY 1'],
//             'NURSERY2': ['NURSERY 2'],
//             'CLASS1': ['CLASS 1'],
//             'CLASS2': ['CLASS 2'],
//             'CLASS4': ['CLASS 4']
//         };

//         // Pour chaque dossier, trouver la classe correspondante
//         folders.forEach(folderName => {
//             let classId = null;
//             let className = null;
            
//             // Chercher dans le dictionnaire de correspondance
//             const possibleNames = folderMap[folderName] || [folderName, folderName.replace(/\s+/g, ''), folderName.replace(/(\d+)/, ' $1')];
            
//             for (const possibleName of possibleNames) {
//                 const found = classes.find(c => c.name === possibleName);
//                 if (found) {
//                     classId = found.id;
//                     className = found.name;
//                     break;
//                 }
//             }

//             // Si pas trouvé, essayer une correspondance partielle
//             if (!classId) {
//                 for (const cls of classes) {
//                     if (folderName.includes(cls.name) || cls.name.includes(folderName) ||
//                         cls.name.replace(/\s+/g, '') === folderName.replace(/\s+/g, '')) {
//                         classId = cls.id;
//                         className = cls.name;
//                         console.log(`  🔀 Correspondance partielle: ${folderName} -> ${className}`);
//                         break;
//                     }
//                 }
//             }

//             if (!classId) {
//                 console.log(`⚠️ Aucune classe trouvée pour le dossier: ${folderName}`);
//                 return;
//             }

//             const classFolder = path.join(ecoleDetailsDir, folderName);
            
//             // Lire tous les fichiers du dossier
//             const files = fs.readdirSync(classFolder);
            
//             // Filtrer les images
//             const imageFiles = files.filter(file => 
//                 /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
//             );

//             if (imageFiles.length === 0) return;

//             console.log(`📸 Classe ${className} (dossier: ${folderName}): ${imageFiles.length} photos trouvées`);

//             // Pour chaque photo, extraire le nom de l'élève
//             imageFiles.forEach(file => {
//                 try {
//                     // Enlever l'extension
//                     const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
                    
//                     // Extraire le nom (format: "NOM Prenom" ou "NOM Prenom Prenom")
//                     const parts = fileNameWithoutExt.split(' ');
                    
//                     if (parts.length >= 2) {
//                         const lastName = parts[0].trim().toUpperCase();
//                         const firstName = parts.slice(1).join(' ').trim();
                        
//                         // Vérifier si l'élève existe déjà
//                         const existing = db.prepare(`
//                             SELECT id FROM students 
//                             WHERE first_name = ? AND last_name = ? AND class_id = ?
//                         `).get(firstName, lastName, classId);
                        
//                         if (!existing) {
//                             // Générer un matricule unique
//                             const matricule = `AUTO-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`;
                            
//                             // Ajouter l'élève à la base de données
//                             db.prepare(`
//                                 INSERT INTO students 
//                                 (first_name, last_name, full_name, matricule, class_id, class_name, photo_path, academic_year, status)
//                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
//                             `).run(
//                                 firstName,
//                                 lastName,
//                                 `${firstName} ${lastName}`,
//                                 matricule,
//                                 classId,
//                                 className,
//                                 `ecole-details/${folderName}/${file}`,
//                                 getCurrentAcademicYear()
//                             );
                            
//                             totalImported++;
//                             console.log(`  ✅ Importé: ${firstName} ${lastName} dans ${className}`);
//                         } else {
//                             totalSkipped++;
//                         }
//                     }
//                 } catch (err) {
//                     console.error(`  ❌ Erreur pour ${file}:`, err.message);
//                 }
//             });
//         });

//         console.log(`📊 Bilan importation: ${totalImported} nouveaux élèves, ${totalSkipped} déjà existants`);
        
//         // Afficher le nombre total d'élèves dans la base
//         const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get();
//         console.log(`👥 Total élèves dans la base: ${totalStudents.count}`);
        
//     } catch (error) {
//         console.error('❌ Erreur lors de l\'importation:', error);
//     }
// }

// // Exécuter l'importation
// importStudentsFromFolders();

// console.log('✅ Base de données prête');

// // ============ SERVEUR EXPRESS ============
// const appExpress = express();
// const PORT = 3000;

// appExpress.use(cors());
// appExpress.use(express.json({ limit: '10mb' }));
// appExpress.use(express.urlencoded({ extended: true }));
// appExpress.use('/public', express.static(FRONTEND_PUBLIC_PATH));
// appExpress.use(express.static(FRONTEND_PUBLIC_PATH));

// // ============ MIDDLEWARE DE DEBUG ============
// appExpress.use((req, res, next) => {
//     console.log(`\n🔍 REQUÊTE: ${req.method} ${req.url}`);
//     if (req.method === 'POST' || req.method === 'PUT') {
//         console.log('📦 CORPS:', JSON.stringify(req.body, null, 2));
//     }
//     next();
// });

// // ============ ROUTES POUR LES PHOTOS ============

// // Route pour servir les photos depuis ecole details
// appExpress.get('/ecole-details/*', (req, res) => {
//     const filePath = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', req.params[0]);
//     if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//     } else {
//         res.status(404).json({ error: 'Photo non trouvée' });
//     }
// });

// // Route pour servir les photos depuis temp
// appExpress.get('/temp/*', (req, res) => {
//     const filePath = path.join(FRONTEND_PUBLIC_PATH, 'temp', req.params[0]);
//     if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//     } else {
//         res.status(404).json({ error: 'Photo temporaire non trouvée' });
//     }
// });

// // ============ ROUTES DE DEBUG ============

// // Route pour debugger les correspondances classe/dossier
// appExpress.get('/api/debug/class-folders', (req, res) => {
//     try {
//         const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
//         const folders = fs.readdirSync(ecoleDetailsDir).filter(f => {
//             return fs.statSync(path.join(ecoleDetailsDir, f)).isDirectory();
//         });
        
//         const classes = db.prepare('SELECT id, name FROM classes').all();
        
//         const result = {
//             folders: folders,
//             classes: classes,
//             matches: []
//         };
        
//         folders.forEach(folder => {
//             const match = classes.find(c => 
//                 c.name.includes(folder) || 
//                 folder.includes(c.name) ||
//                 c.name.replace(/\s+/g, '') === folder.replace(/\s+/g, '')
//             );
            
//             result.matches.push({
//                 folder,
//                 matchedClass: match || null
//             });
//         });
        
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============ API ROUTES ============

// // 1. Santé
// appExpress.get('/api/health', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         academic_year: getCurrentAcademicYear(),
//         db: DB_PATH,
//         mode: isDev ? 'dev' : 'prod'
//     });
// });

// // 2. Année scolaire
// appExpress.get('/api/academic-year/current', (req, res) => {
//     res.json({ academic_year: getCurrentAcademicYear() });
// });

// // 3. ROUTE POUR UPLOADER UNE PHOTO
// appExpress.post('/api/upload/student-photo', (req, res) => {
//     console.log('📸 Upload de photo démarré...');
    
//     const upload = multer({
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, tempDir);
//             },
//             filename: function (req, file, cb) {
//                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//                 const ext = path.extname(file.originalname);
//                 const filename = 'temp-photo-' + uniqueSuffix + ext;
//                 cb(null, filename);
//             }
//         }),
//         limits: { fileSize: 5 * 1024 * 1024 },
//         fileFilter: (req, file, cb) => {
//             if (file.mimetype.startsWith('image/')) {
//                 cb(null, true);
//             } else {
//                 cb(new Error('Seules les images sont autorisées'), false);
//             }
//         }
//     }).single('photo');
    
//     upload(req, res, function(err) {
//         if (err) {
//             console.error('❌ Erreur upload:', err);
//             return res.status(500).json({ error: err.message });
//         }
        
//         if (!req.file) {
//             return res.status(400).json({ error: 'Aucun fichier' });
//         }
        
//         console.log(`✅ Photo uploadée: ${req.file.filename}`);
        
//         res.json({
//             success: true,
//             photo_path: 'temp/' + req.file.filename,
//             filename: req.file.filename,
//             message: 'Photo uploadée avec succès'
//         });
//     });
// });

// // 4. ROUTE POUR RÉCUPÉRER UNE CLASSE PAR ID
// appExpress.get('/api/classes/:id', (req, res) => {
//     try {
//         const { id } = req.params;
        
//         if (!isNaN(id)) {
//             console.log(`📋 Récupération classe ID: ${id}`);
//             const classe = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
            
//             if (!classe) {
//                 return res.status(404).json({ error: 'Classe non trouvée' });
//             }
            
//             return res.json(classe);
//         }
        
//         return res.status(404).json({ error: 'Route non trouvée' });
//     } catch (error) {
//         console.error('❌ Erreur récupération classe:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 5. ROUTE POUR LES CLASSES PAR SECTION/CYCLE
// appExpress.get('/api/classes/:section/:cycle', (req, res) => {
//     try {
//         const { section, cycle } = req.params;
//         console.log(`📋 Récupération des classes: section=${section}, cycle=${cycle}`);
        
//         const classes = db.prepare(`
//             SELECT * FROM classes 
//             WHERE section = ? AND cycle = ? 
//             ORDER BY level
//         `).all(section, cycle);
        
//         console.log(`📊 ${classes.length} classes trouvées`);
//         res.json(classes);
//     } catch (error) {
//         console.error('❌ Erreur récupération classes:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 6. ROUTE POUR LES CLASSES AVEC QUERY PARAMETERS
// appExpress.get('/api/classes', (req, res) => {
//     try {
//         const { section, cycle } = req.query;
//         let sql = 'SELECT * FROM classes WHERE 1=1';
//         const params = [];
        
//         if (section) {
//             sql += ' AND section = ?';
//             params.push(section);
//         }
//         if (cycle) {
//             sql += ' AND cycle = ?';
//             params.push(cycle);
//         }
//         sql += ' ORDER BY level';
        
//         const classes = db.prepare(sql).all(params);
//         res.json(classes);
//     } catch (error) {
//         console.error('❌ Erreur récupération classes:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 7. ÉLÈVES D'UNE CLASSE
// appExpress.get('/api/class/:id/students', (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(`📋 Récupération des élèves pour la classe ${id}`);
        
//         const students = db.prepare(`
//             SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
//             FROM students s
//             LEFT JOIN classes c ON s.class_id = c.id
//             WHERE s.class_id = ? AND s.status = 'active'
//             ORDER BY s.full_name
//         `).all(id);
        
//         console.log(`📊 ${students.length} élèves trouvés`);
//         res.json(students);
//     } catch (error) {
//         console.error('❌ Erreur récupération élèves:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 8. ÉLÈVE PAR ID
// appExpress.get('/api/student/:id', (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const student = db.prepare(`
//             SELECT s.*, c.name as class_display_name, c.section, c.cycle
//             FROM students s
//             LEFT JOIN classes c ON s.class_id = c.id
//             WHERE s.id = ?
//         `).get(id);
        
//         if (!student) {
//             return res.status(404).json({ error: 'Élève non trouvé' });
//         }
        
//         res.json(student);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 9. AJOUTER UN ÉLÈVE (AVEC DÉPLACEMENT DE PHOTO)
// appExpress.post('/api/student', (req, res) => {
//     try {
//         const { first_name, last_name, class_id, sex = '', photo_path = '' } = req.body;
        
//         if (!first_name || !last_name || !class_id) {
//             return res.status(400).json({ error: 'Données manquantes' });
//         }

//         const classRow = db.prepare('SELECT name FROM classes WHERE id = ?').get(class_id);
//         if (!classRow) {
//             return res.status(400).json({ error: 'Classe non trouvée' });
//         }

//         const class_name = classRow.name;
//         const full_name = `${first_name} ${last_name}`.trim();
//         const matricule = `MAT-${Date.now().toString().slice(-6)}`;
//         const academic_year = getCurrentAcademicYear();
        
//         // Gérer le déplacement de la photo si elle existe
//         let finalPhotoPath = '';
//         if (photo_path) {
//             const tempFilename = path.basename(photo_path);
//             const tempPath = path.join(tempDir, tempFilename);
            
//             // Créer le nom de fichier définitif avec le nom de l'élève
//             const cleanFirstName = first_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
//             const cleanLastName = last_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
//             const ext = path.extname(tempFilename);
//             const newFilename = `${cleanLastName} ${cleanFirstName}${ext}`;
            
//             // Dossier de destination pour la classe
//             const classDir = path.join(ecoleDetailsDir, class_name);
//             if (!fs.existsSync(classDir)) {
//                 fs.mkdirSync(classDir, { recursive: true });
//             }
            
//             const finalPath = path.join(classDir, newFilename);
            
//             // Déplacer le fichier
//             if (fs.existsSync(tempPath)) {
//                 fs.renameSync(tempPath, finalPath);
//                 finalPhotoPath = `ecole-details/${class_name}/${newFilename}`;
//                 console.log(`✅ Photo déplacée vers: ${finalPhotoPath}`);
//             }
//         }

//         // Insérer l'élève dans la base de données
//         const result = db.prepare(`
//             INSERT INTO students 
//             (first_name, last_name, full_name, matricule, class_id, class_name, sex, academic_year, photo_path, status)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
//         `).run(
//             first_name.trim(),
//             last_name.trim(),
//             full_name,
//             matricule,
//             class_id,
//             class_name,
//             sex,
//             academic_year,
//             finalPhotoPath
//         );

//         res.json({ 
//             success: true, 
//             studentId: result.lastInsertRowid,
//             matricule,
//             full_name,
//             photo_path: finalPhotoPath,
//             message: 'Élève ajouté avec succès'
//         });
//     } catch (error) {
//         console.error('❌ Erreur ajout élève:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 10. SUPPRIMER UN ÉLÈVE
// appExpress.delete('/api/student/:id', (req, res) => {
//     try {
//         const result = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
//         res.json({ 
//             success: true, 
//             changes: result.changes,
//             message: result.changes ? 'Élève supprimé' : 'Élève non trouvé'
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============ ROUTES DE BULLETINS (COMPLÈTES) ============


// //ROUTE BULLETIN ANNUEL

// // Route pour bulletin annuel
// appExpress.post('/api/bulletin/annual', (req, res) => {
//     console.log('📥 Route /api/bulletin/annual appelée');
//     req.body.bulletin_type = 'annual';
//     handleBulletinSave(req, res);
// });

// // Route pour bulletin annuel au pluriel
// appExpress.post('/api/bulletins/annual', (req, res) => {
//     console.log('📥 Route /api/bulletins/annual appelée');
//     req.body.bulletin_type = 'annual';
//     handleBulletinSave(req, res);
// });







// // Fonction de gestion commune pour la création
// function handleBulletinSave(req, res) {
//     console.log('📥 Traitement bulletin - Données reçues:', {
//         student_id: req.body.student_id,
//         bulletin_type: req.body.bulletin_type,
//         trimester: req.body.trimester
//     });

//     const {
//         student_id,
//         bulletin_type,
//         trimester,
//         sequence_type = 'mois',
//         academic_year = getCurrentAcademicYear(),
//         nom_eleve = '',
//         matricule = '',
//         sex = '',
//         classe = '',
//         enseignant = '',
//         photo_data = '',
//         data_json = '{}',
//         moyenne_generale = '',
//         appreciation = '',
//         rang_position = '',
//         decision = '',
//         totals_json = '{}',
//         is_finalized = false,
//         is_draft = 1
//     } = req.body;

//     // Validation
//     if (!student_id || !bulletin_type || !trimester) {
//         return res.status(400).json({ 
//             error: 'Données manquantes',
//             required: ['student_id', 'bulletin_type', 'trimester']
//         });
//     }

//     try {
//         // Préparer les données JSON
//         const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
//         const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

//         // Vérifier si le bulletin existe déjà
//         const existing = db.prepare(`
//             SELECT id FROM bulletins 
//             WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
//         `).get(student_id, bulletin_type, trimester, academic_year);

//         if (existing) {
//             // MISE À JOUR (via POST - rediriger vers PUT)
//             console.log(`🔄 Bulletin existant ID: ${existing.id}, redirection vers PUT`);
            
//             // Appeler la route PUT
//             const putReq = { 
//                 ...req, 
//                 params: { id: existing.id },
//                 body: req.body,
//                 method: 'PUT',
//                 url: `/api/bulletin/${existing.id}`
//             };
            
//             return appExpress._router.handle(putReq, res, () => {});
//         } else {
//             // CRÉATION
//             const result = db.prepare(`
//                 INSERT INTO bulletins (
//                     student_id, bulletin_type, trimester, sequence_type, academic_year,
//                     nom_eleve, matricule, sex, classe, enseignant, photo_data, data_json,
//                     moyenne_generale, appreciation, rang_position, decision, totals_json,
//                     is_finalized, is_draft
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `).run(
//                 student_id, bulletin_type, trimester, sequence_type, academic_year,
//                 nom_eleve, matricule, sex, classe, enseignant, photo_data, dataJsonString,
//                 moyenne_generale, appreciation, rang_position, decision, totalsJsonString,
//                 is_finalized ? 1 : 0,
//                 is_draft
//             );
            
//             console.log(`✅ Nouveau bulletin créé ID: ${result.lastInsertRowid}`);
//             res.json({ 
//                 success: true, 
//                 id: result.lastInsertRowid, 
//                 action: 'create',
//                 message: 'Bulletin créé avec succès'
//             });
//         }
//     } catch (error) {
//         console.error('❌ Erreur sauvegarde bulletin:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // ============ ROUTES DE MISE À JOUR (PUT) ============

// // Route pour mettre à jour un bulletin existant (PUT)
// appExpress.put('/api/bulletin/:id', (req, res) => {
//     console.log(`📥 Route PUT /api/bulletin/${req.params.id} appelée`);
    
//     const { id } = req.params;
//     const {
//         data_json,
//         appreciation = '',
//         rang_position = '',
//         decision = '',
//         is_draft = 1,
//         is_finalized = 0,
//         moyenne_generale = '',
//         totals_json = '{}'
//     } = req.body;

//     try {
//         // Préparer les données JSON
//         const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
//         const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

//         // Mise à jour
//         const result = db.prepare(`
//             UPDATE bulletins SET 
//                 data_json = ?,
//                 appreciation = ?,
//                 rang_position = ?,
//                 decision = ?,
//                 is_draft = ?,
//                 is_finalized = ?,
//                 moyenne_generale = ?,
//                 totals_json = ?,
//                 updated_at = CURRENT_TIMESTAMP
//             WHERE id = ?
//         `).run(
//             dataJsonString,
//             appreciation,
//             rang_position,
//             decision,
//             is_draft,
//             is_finalized,
//             moyenne_generale,
//             totalsJsonString,
//             id
//         );
        
//         if (result.changes === 0) {
//             return res.status(404).json({ error: 'Bulletin non trouvé' });
//         }
        
//         console.log(`✅ Bulletin mis à jour ID: ${id}`);
//         res.json({ 
//             success: true, 
//             id: parseInt(id), 
//             action: 'update',
//             message: 'Bulletin mis à jour avec succès'
//         });
//     } catch (error) {
//         console.error('❌ Erreur mise à jour bulletin:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route alternative avec /api/bulletins (pluriel)
// appExpress.put('/api/bulletins/:id', (req, res) => {
//     console.log(`📥 Route PUT /api/bulletins/${req.params.id} appelée`);
//     // Rediriger vers la route principale
//     return appExpress._router.handle(
//         { ...req, url: `/api/bulletin/${req.params.id}`, method: 'PUT' },
//         res,
//         () => {}
//     );
// });

// // ============ ROUTES DE CRÉATION (POST) ============

// // ROUTE PRINCIPALE (pluriel)
// appExpress.post('/api/bulletins/save', handleBulletinSave);

// // ROUTES DE COMPATIBILITÉ (singulier) - POUR TOUTES LES SECTIONS

// // Pour section anglophone
// appExpress.post('/api/bulletin/anglophone', (req, res) => {
//     console.log('📥 Route /api/bulletin/anglophone appelée');
//     req.body.bulletin_type = 'anglophone';
//     handleBulletinSave(req, res);
// });

// // Pour section francophone
// appExpress.post('/api/bulletin/francophone', (req, res) => {
//     console.log('📥 Route /api/bulletin/francophone appelée');
//     req.body.bulletin_type = 'francophone';
//     handleBulletinSave(req, res);
// });

// // Pour section maternelle
// appExpress.post('/api/bulletin/maternelle', (req, res) => {
//     console.log('📥 Route /api/bulletin/maternelle appelée');
//     req.body.bulletin_type = 'maternelle';
//     handleBulletinSave(req, res);
// });

// // Route générique
// appExpress.post('/api/bulletin/save', (req, res) => {
//     console.log('📥 Route /api/bulletin/save appelée');
//     if (!req.body.bulletin_type) {
//         req.body.bulletin_type = 'maternelle';
//     }
//     handleBulletinSave(req, res);
// });

// // Route pour primaire
// appExpress.post('/api/bulletin/primaire', (req, res) => {
//     console.log('📥 Route /api/bulletin/primaire appelée');
//     req.body.bulletin_type = 'primaire';
//     handleBulletinSave(req, res);
// });

// // Route pour nursery
// appExpress.post('/api/bulletin/nursery', (req, res) => {
//     console.log('📥 Route /api/bulletin/nursery appelée');
//     req.body.bulletin_type = 'nursery';
//     handleBulletinSave(req, res);
// });

// // Route pour primary
// appExpress.post('/api/bulletin/primary', (req, res) => {
//     console.log('📥 Route /api/bulletin/primary appelée');
//     req.body.bulletin_type = 'primary';
//     handleBulletinSave(req, res);
// });

// // ROUTES AU PLURIEL AUSSI (pour être sûr)
// appExpress.post('/api/bulletins/anglophone', (req, res) => {
//     console.log('📥 Route /api/bulletins/anglophone appelée');
//     req.body.bulletin_type = 'anglophone';
//     handleBulletinSave(req, res);
// });

// appExpress.post('/api/bulletins/francophone', (req, res) => {
//     console.log('📥 Route /api/bulletins/francophone appelée');
//     req.body.bulletin_type = 'francophone';
//     handleBulletinSave(req, res);
// });

// appExpress.post('/api/bulletins/maternelle', (req, res) => {
//     console.log('📥 Route /api/bulletins/maternelle appelée');
//     req.body.bulletin_type = 'maternelle';
//     handleBulletinSave(req, res);
// });

// appExpress.post('/api/bulletins/primaire', (req, res) => {
//     console.log('📥 Route /api/bulletins/primaire appelée');
//     req.body.bulletin_type = 'primaire';
//     handleBulletinSave(req, res);
// });

// appExpress.post('/api/bulletins/nursery', (req, res) => {
//     console.log('📥 Route /api/bulletins/nursery appelée');
//     req.body.bulletin_type = 'nursery';
//     handleBulletinSave(req, res);
// });

// appExpress.post('/api/bulletins/primary', (req, res) => {
//     console.log('📥 Route /api/bulletins/primary appelée');
//     req.body.bulletin_type = 'primary';
//     handleBulletinSave(req, res);
// });

// // ============ ROUTES DE LECTURE (CORRIGÉES) ============

// // Récupérer tous les bulletins d'un élève (CORRIGÉ)
// appExpress.get('/api/student/:studentId/bulletins', (req, res) => {
//     try {
//         const { studentId } = req.params;
        
//         const bulletins = db.prepare(`
//             SELECT * FROM bulletins 
//             WHERE student_id = ? 
//             ORDER BY trimester, bulletin_type
//         `).all(studentId);
        
//         console.log(`📤 Envoi de ${bulletins.length} bulletins pour l'élève ${studentId}`);
        
//         // Parser les données JSON seulement si c'est une chaîne
//         bulletins.forEach(bulletin => {
//             if (bulletin.data_json && typeof bulletin.data_json === 'string') {
//                 try {
//                     bulletin.data_json = JSON.parse(bulletin.data_json);
//                 } catch (e) {
//                     console.warn(`⚠️ Erreur parsing JSON pour bulletin ${bulletin.id}:`, e.message);
//                     bulletin.data_json = {};
//                 }
//             } else if (bulletin.data_json && typeof bulletin.data_json === 'object') {
//                 // Déjà un objet, ne pas reparser
//                 console.log(`✅ Bulletin ${bulletin.id}: data_json déjà parsé`);
//             }
//         });
        
//         res.json(bulletins);
//     } catch (error) {
//         console.error('❌ Erreur récupération bulletins:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Récupérer un bulletin spécifique (CORRIGÉ)
// appExpress.get('/api/bulletins/:id', (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const bulletin = db.prepare('SELECT * FROM bulletins WHERE id = ?').get(id);
        
//         if (!bulletin) {
//             return res.status(404).json({ error: 'Bulletin non trouvé' });
//         }
        
//         // Parser les données JSON seulement si c'est une chaîne
//         if (bulletin.data_json && typeof bulletin.data_json === 'string') {
//             try {
//                 bulletin.data_json = JSON.parse(bulletin.data_json);
//             } catch (e) {
//                 console.warn(`⚠️ Erreur parsing JSON pour bulletin ${id}:`, e.message);
//                 bulletin.data_json = {};
//             }
//         }
        
//         res.json(bulletin);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Récupérer un bulletin spécifique (version singulier)
// appExpress.get('/api/bulletin/:id', (req, res) => {
//     return appExpress._router.handle(
//         { ...req, url: `/api/bulletins/${req.params.id}`, method: 'GET' },
//         res,
//         () => {}
//     );
// });

// // Vérifier si un bulletin existe
// appExpress.get('/api/bulletins/check', (req, res) => {
//     try {
//         const { studentId, bulletinType, trimester, academicYear = getCurrentAcademicYear() } = req.query;
        
//         const bulletin = db.prepare(`
//             SELECT * FROM bulletins 
//             WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
//         `).get(studentId, bulletinType, trimester, academicYear);
        
//         if (bulletin) {
//             // Parser les données JSON
//             if (bulletin.data_json && typeof bulletin.data_json === 'string') {
//                 try {
//                     bulletin.data_json = JSON.parse(bulletin.data_json);
//                 } catch (e) {
//                     bulletin.data_json = {};
//                 }
//             }
//         }
        
//         res.json(bulletin || null);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============ ROUTES DE SUPPRESSION ============

// // Supprimer un bulletin
// appExpress.delete('/api/bulletins/:id', (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const result = db.prepare('DELETE FROM bulletins WHERE id = ?').run(id);
        
//         if (result.changes === 0) {
//             return res.status(404).json({ error: 'Bulletin non trouvé' });
//         }
        
//         res.json({ 
//             success: true, 
//             message: 'Bulletin supprimé avec succès' 
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Supprimer un bulletin (version singulier)
// appExpress.delete('/api/bulletin/:id', (req, res) => {
//     return appExpress._router.handle(
//         { ...req, url: `/api/bulletins/${req.params.id}`, method: 'DELETE' },
//         res,
//         () => {}
//     );
// });

// // ROUTE DEBUG POUR VOIR LES ÉLÈVES IMPORTÉS
// appExpress.get('/api/debug/students', (req, res) => {
//     try {
//         const students = db.prepare(`
//             SELECT s.*, c.name as class_name 
//             FROM students s
//             LEFT JOIN classes c ON s.class_id = c.id
//             ORDER BY c.name, s.last_name
//         `).all();
        
//         const stats = {
//             total: students.length,
//             byClass: {}
//         };
        
//         students.forEach(s => {
//             const className = s.class_name || 'Sans classe';
//             if (!stats.byClass[className]) {
//                 stats.byClass[className] = 0;
//             }
//             stats.byClass[className]++;
//         });
        
//         res.json({
//             success: true,
//             stats,
//             students: students.map(s => ({
//                 id: s.id,
//                 name: `${s.first_name} ${s.last_name}`,
//                 class: s.class_name,
//                 photo: s.photo_path
//             }))
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ROUTE TEST
// appExpress.get('/api/test', (req, res) => {
//     const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
//     const studentsCount = db.prepare('SELECT COUNT(*) as count FROM students').get();
    
//     res.json({
//         message: '✅ API fonctionne parfaitement !',
//         academic_year: getCurrentAcademicYear(),
//         mode: isDev ? 'dev' : 'prod',
//         stats: {
//             classes: classesCount.count,
//             students: studentsCount.count
//         }
//     });
// });

// // ============ SERVIR LE FRONTEND ============
// if (!isDev) {
//     appExpress.use(express.static(FRONTEND_DIST_PATH));
    
//     appExpress.get('*', (req, res) => {
//         if (!req.path.startsWith('/api') && !req.path.startsWith('/ecole-details') && !req.path.startsWith('/temp')) {
//             res.sendFile(path.join(FRONTEND_DIST_PATH, 'index.html'));
//         }
//     });
// }

// // ============ FENÊTRE ELECTRON ============
// let mainWindow;

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 1400,
//         height: 900,
//         minWidth: 1000,
//         minHeight: 700,
//         show: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true
//         },
//         icon: path.join(FRONTEND_PUBLIC_PATH, 'icon.ico')
//     });

//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//         mainWindow.focus();
//     });

//     if (isDev) {
//         mainWindow.loadURL('http://localhost:5173');
//         mainWindow.webContents.openDevTools();
//         console.log('🔄 Chargement depuis Vite (http://localhost:5173)');
//     } else {
//         const indexPath = path.join(FRONTEND_DIST_PATH, 'index.html');
//         console.log(`🔄 Chargement depuis ${indexPath}`);
//         mainWindow.loadFile(indexPath);
//     }

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });
// }

// // ============ DÉMARRAGE ============
// const server = appExpress.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Serveur API intégré: http://localhost:${PORT}`);
//     console.log(`📅 Année scolaire: ${getCurrentAcademicYear()}`);
    
//     app.whenReady().then(() => {
//         setTimeout(createWindow, 1500);
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         server.close();
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// console.log('🎓 Gestion Bulletin - Version Finale avec parsing JSON corrigé');











































































































































const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Database = require('better-sqlite3');
const multer = require('multer');

// ============ CONFIGURATION ============
const isDev = !app.isPackaged;
console.log(`🎓 Mode: ${isDev ? 'DÉVELOPPEMENT' : 'PRODUCTION'}`);

// ============ CHEMINS INTELLIGENTS ============
let FRONTEND_PUBLIC_PATH, FRONTEND_DIST_PATH, DB_PATH;

if (isDev) {
    // Développement
    FRONTEND_PUBLIC_PATH = path.join(__dirname, '../../frontend/public');
    FRONTEND_DIST_PATH = path.join(__dirname, '../../frontend/dist');
    DB_PATH = path.join(__dirname, 'database.sqlite');
} else {
    // Production
    const possiblePaths = [
        path.join(process.resourcesPath, 'app.asar', 'frontend'),
        path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend'),
        path.join(__dirname, '../../frontend')
    ];
    
    let frontendPath = possiblePaths.find(p => fs.existsSync(p)) || path.join(__dirname, '../../frontend');
    
    FRONTEND_PUBLIC_PATH = path.join(frontendPath, 'public');
    FRONTEND_DIST_PATH = path.join(frontendPath, 'dist');
    DB_PATH = path.join(app.getPath('userData'), 'database.sqlite');
}

console.log(`📁 Public: ${FRONTEND_PUBLIC_PATH}`);
console.log(`📁 Dist: ${FRONTEND_DIST_PATH}`);
console.log(`🗄️  DB: ${DB_PATH}`);

// ============ CRÉATION DES DOSSIERS NÉCESSAIRES ============
const tempDir = path.join(FRONTEND_PUBLIC_PATH, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log('📁 Dossier temp créé');
}

const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
if (!fs.existsSync(ecoleDetailsDir)) {
    fs.mkdirSync(ecoleDetailsDir, { recursive: true });
    console.log('📁 Dossier ecole details créé');
}

// ============ BASE DE DONNÉES ============
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

// ============ INITIALISATION DES TABLES ============
console.log('🔄 Initialisation de la base de données...');

// Table classes
db.exec(`
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        display_name TEXT,
        section TEXT,
        cycle TEXT,
        level INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Table students
db.exec(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        full_name TEXT,
        matricule TEXT UNIQUE,
        class_id INTEGER,
        class_name TEXT,
        sex TEXT,
        photo_path TEXT,
        academic_year TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes(id)
    )
`);

// Table bulletins (version complète avec toutes les colonnes)
db.exec(`
    CREATE TABLE IF NOT EXISTS bulletins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        bulletin_type TEXT NOT NULL,
        trimester INTEGER NOT NULL,
        sequence_type TEXT,
        academic_year TEXT NOT NULL,
        nom_eleve TEXT,
        matricule TEXT,
        sex TEXT,
        classe TEXT,
        enseignant TEXT,
        photo_data TEXT,
        data_json TEXT NOT NULL,
        moyenne_generale TEXT,
        appreciation TEXT,
        rang_position TEXT,
        decision TEXT,
        totals_json TEXT,
        teacher_signature TEXT,
        headmaster_signature TEXT,
        parent_signature TEXT,
        is_finalized INTEGER DEFAULT 0,
        is_draft INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id),
        UNIQUE(student_id, bulletin_type, trimester, academic_year)
    )
`);

// ============ VÉRIFICATION ET AJOUT DES COLONNES MANQUANTES ============
try {
    // Vérifier si la colonne is_draft existe dans bulletins
    const tableInfo = db.prepare("PRAGMA table_info(bulletins)").all();
    const hasIsDraft = tableInfo.some(col => col.name === 'is_draft');
    
    if (!hasIsDraft) {
        console.log('📝 Ajout de la colonne is_draft à la table bulletins...');
        db.exec(`ALTER TABLE bulletins ADD COLUMN is_draft INTEGER DEFAULT 1;`);
        console.log('✅ Colonne is_draft ajoutée avec succès');
    } else {
        console.log('✅ Colonne is_draft déjà présente');
    }
} catch (error) {
    console.error('❌ Erreur lors de la vérification/ajout de colonne:', error);
}

// ============ CLASSES PAR DÉFAUT ============
const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
if (classesCount.count === 0) {
    console.log('📚 Insertion des classes par défaut...');
    
    const defaultClasses = [
        // Francophone - Maternelle
        ['PETITE SECTION', 'Petite Section', 'francophone', 'maternelle', 1],
        ['MOYENNE SECTION', 'Moyenne Section', 'francophone', 'maternelle', 2],
        ['GRANDE SECTION', 'Grande Section', 'francophone', 'maternelle', 3],
        // Francophone - Primaire
        ['SIL', 'SIL', 'francophone', 'primaire', 4],
        ['CP', 'CP', 'francophone', 'primaire', 5],
        ['CEI', 'CEI', 'francophone', 'primaire', 6],
        ['CEII', 'CEII', 'francophone', 'primaire', 7],
        ['CM1', 'CM1', 'francophone', 'primaire', 8],
        ['CM2', 'CM2', 'francophone', 'primaire', 9],
        // Anglophone - Nursery
        ['PRE-NURSERY', 'Pre-Nursery', 'anglophone', 'nursery', 1],
        ['NURSERY 1', 'Nursery 1', 'anglophone', 'nursery', 2],
        ['NURSERY 2', 'Nursery 2', 'anglophone', 'nursery', 3],
        // Anglophone - Primary
        ['CLASS 1', 'Class 1', 'anglophone', 'primary', 4],
        ['CLASS 2', 'Class 2', 'anglophone', 'primary', 5],
        ['CLASS 3', 'Class 3', 'anglophone', 'primary', 6],
        ['CLASS 4', 'Class 4', 'anglophone', 'primary', 7],
        ['CLASS 5', 'Class 5', 'anglophone', 'primary', 8],
        ['CLASS 6', 'Class 6', 'anglophone', 'primary', 9]
    ];
    
    const insert = db.prepare('INSERT INTO classes (name, display_name, section, cycle, level) VALUES (?, ?, ?, ?, ?)');
    defaultClasses.forEach(cls => insert.run(cls));
    console.log('✅ Classes par défaut insérées');
}

// ============ FONCTIONS UTILITAIRES ============
function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

// ============ IMPORT AUTOMATIQUE DES ÉLÈVES DEPUIS LES DOSSIERS ============
function importStudentsFromFolders() {
    console.log('🔍 Recherche des élèves dans les dossiers...');
    
    try {
        const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
        
        if (!fs.existsSync(ecoleDetailsDir)) {
            console.log('📁 Dossier ecole details non trouvé');
            return;
        }

        // Récupérer toutes les classes de la base de données
        const classes = db.prepare('SELECT id, name FROM classes').all();
        let totalImported = 0;
        let totalSkipped = 0;

        // Lire tous les dossiers dans ecole details
        const folders = fs.readdirSync(ecoleDetailsDir).filter(item => {
            const itemPath = path.join(ecoleDetailsDir, item);
            return fs.statSync(itemPath).isDirectory();
        });

        console.log(`📁 Dossiers trouvés: ${folders.join(', ')}`);

        // Dictionnaire de correspondance pour les classes anglophones
        const folderMap = {
            'NURSERY1 AND PRE-NURSERY': ['PRE-NURSERY', 'NURSERY 1'],
            'NURSERY2': ['NURSERY 2'],
            'CLASS1': ['CLASS 1'],
            'CLASS2': ['CLASS 2'],
            'CLASS4': ['CLASS 4']
        };

        // Pour chaque dossier, trouver la classe correspondante
        folders.forEach(folderName => {
            let classId = null;
            let className = null;
            
            // Chercher dans le dictionnaire de correspondance
            const possibleNames = folderMap[folderName] || [folderName, folderName.replace(/\s+/g, ''), folderName.replace(/(\d+)/, ' $1')];
            
            for (const possibleName of possibleNames) {
                const found = classes.find(c => c.name === possibleName);
                if (found) {
                    classId = found.id;
                    className = found.name;
                    break;
                }
            }

            // Si pas trouvé, essayer une correspondance partielle
            if (!classId) {
                for (const cls of classes) {
                    if (folderName.includes(cls.name) || cls.name.includes(folderName) ||
                        cls.name.replace(/\s+/g, '') === folderName.replace(/\s+/g, '')) {
                        classId = cls.id;
                        className = cls.name;
                        console.log(`  🔀 Correspondance partielle: ${folderName} -> ${className}`);
                        break;
                    }
                }
            }

            if (!classId) {
                console.log(`⚠️ Aucune classe trouvée pour le dossier: ${folderName}`);
                return;
            }

            const classFolder = path.join(ecoleDetailsDir, folderName);
            
            // Lire tous les fichiers du dossier
            const files = fs.readdirSync(classFolder);
            
            // Filtrer les images
            const imageFiles = files.filter(file => 
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
            );

            if (imageFiles.length === 0) return;

            console.log(`📸 Classe ${className} (dossier: ${folderName}): ${imageFiles.length} photos trouvées`);

            // Pour chaque photo, extraire le nom de l'élève
            imageFiles.forEach(file => {
                try {
                    // Enlever l'extension
                    const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
                    
                    // Extraire le nom (format: "NOM Prenom" ou "NOM Prenom Prenom")
                    const parts = fileNameWithoutExt.split(' ');
                    
                    if (parts.length >= 2) {
                        const lastName = parts[0].trim().toUpperCase();
                        const firstName = parts.slice(1).join(' ').trim();
                        
                        // Vérifier si l'élève existe déjà
                        const existing = db.prepare(`
                            SELECT id FROM students 
                            WHERE first_name = ? AND last_name = ? AND class_id = ?
                        `).get(firstName, lastName, classId);
                        
                        if (!existing) {
                            // Générer un matricule unique
                            const matricule = `AUTO-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`;
                            
                            // Ajouter l'élève à la base de données
                            db.prepare(`
                                INSERT INTO students 
                                (first_name, last_name, full_name, matricule, class_id, class_name, photo_path, academic_year, status)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
                            `).run(
                                firstName,
                                lastName,
                                `${firstName} ${lastName}`,
                                matricule,
                                classId,
                                className,
                                `ecole-details/${folderName}/${file}`,
                                getCurrentAcademicYear()
                            );
                            
                            totalImported++;
                            console.log(`  ✅ Importé: ${firstName} ${lastName} dans ${className}`);
                        } else {
                            totalSkipped++;
                        }
                    }
                } catch (err) {
                    console.error(`  ❌ Erreur pour ${file}:`, err.message);
                }
            });
        });

        console.log(`📊 Bilan importation: ${totalImported} nouveaux élèves, ${totalSkipped} déjà existants`);
        
        // Afficher le nombre total d'élèves dans la base
        const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get();
        console.log(`👥 Total élèves dans la base: ${totalStudents.count}`);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
    }
}

// Exécuter l'importation
importStudentsFromFolders();

console.log('✅ Base de données prête');

// ============ SERVEUR EXPRESS ============
const appExpress = express();
const PORT = 3000;

appExpress.use(cors());
appExpress.use(express.json({ limit: '10mb' }));
appExpress.use(express.urlencoded({ extended: true }));
appExpress.use('/public', express.static(FRONTEND_PUBLIC_PATH));
appExpress.use(express.static(FRONTEND_PUBLIC_PATH));

// ============ MIDDLEWARE DE DEBUG ============
appExpress.use((req, res, next) => {
    console.log(`\n🔍 REQUÊTE: ${req.method} ${req.url}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('📦 CORPS:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// ============ ROUTES POUR LES PHOTOS ============

// Route pour servir les photos depuis ecole details
appExpress.get('/ecole-details/*', (req, res) => {
    const filePath = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', req.params[0]);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Photo non trouvée' });
    }
});

// Route pour servir les photos depuis temp
appExpress.get('/temp/*', (req, res) => {
    const filePath = path.join(FRONTEND_PUBLIC_PATH, 'temp', req.params[0]);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Photo temporaire non trouvée' });
    }
});

// ============ ROUTES DE DEBUG ============

// Route pour debugger les correspondances classe/dossier
appExpress.get('/api/debug/class-folders', (req, res) => {
    try {
        const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
        const folders = fs.readdirSync(ecoleDetailsDir).filter(f => {
            return fs.statSync(path.join(ecoleDetailsDir, f)).isDirectory();
        });
        
        const classes = db.prepare('SELECT id, name FROM classes').all();
        
        const result = {
            folders: folders,
            classes: classes,
            matches: []
        };
        
        folders.forEach(folder => {
            const match = classes.find(c => 
                c.name.includes(folder) || 
                folder.includes(c.name) ||
                c.name.replace(/\s+/g, '') === folder.replace(/\s+/g, '')
            );
            
            result.matches.push({
                folder,
                matchedClass: match || null
            });
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============ API ROUTES ============

// 1. Santé
appExpress.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        academic_year: getCurrentAcademicYear(),
        db: DB_PATH,
        mode: isDev ? 'dev' : 'prod'
    });
});

// 2. Année scolaire
appExpress.get('/api/academic-year/current', (req, res) => {
    res.json({ academic_year: getCurrentAcademicYear() });
});

// 3. ROUTE POUR UPLOADER UNE PHOTO
appExpress.post('/api/upload/student-photo', (req, res) => {
    console.log('📸 Upload de photo démarré...');
    
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, tempDir);
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(file.originalname);
                const filename = 'temp-photo-' + uniqueSuffix + ext;
                cb(null, filename);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Seules les images sont autorisées'), false);
            }
        }
    }).single('photo');
    
    upload(req, res, function(err) {
        if (err) {
            console.error('❌ Erreur upload:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier' });
        }
        
        console.log(`✅ Photo uploadée: ${req.file.filename}`);
        
        res.json({
            success: true,
            photo_path: 'temp/' + req.file.filename,
            filename: req.file.filename,
            message: 'Photo uploadée avec succès'
        });
    });
});

// 4. ROUTE POUR RÉCUPÉRER UNE CLASSE PAR ID
appExpress.get('/api/classes/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        if (!isNaN(id)) {
            console.log(`📋 Récupération classe ID: ${id}`);
            const classe = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
            
            if (!classe) {
                return res.status(404).json({ error: 'Classe non trouvée' });
            }
            
            return res.json(classe);
        }
        
        return res.status(404).json({ error: 'Route non trouvée' });
    } catch (error) {
        console.error('❌ Erreur récupération classe:', error);
        res.status(500).json({ error: error.message });
    }
});

// 5. ROUTE POUR LES CLASSES PAR SECTION/CYCLE
appExpress.get('/api/classes/:section/:cycle', (req, res) => {
    try {
        const { section, cycle } = req.params;
        console.log(`📋 Récupération des classes: section=${section}, cycle=${cycle}`);
        
        const classes = db.prepare(`
            SELECT * FROM classes 
            WHERE section = ? AND cycle = ? 
            ORDER BY level
        `).all(section, cycle);
        
        console.log(`📊 ${classes.length} classes trouvées`);
        res.json(classes);
    } catch (error) {
        console.error('❌ Erreur récupération classes:', error);
        res.status(500).json({ error: error.message });
    }
});

// 6. ROUTE POUR LES CLASSES AVEC QUERY PARAMETERS
appExpress.get('/api/classes', (req, res) => {
    try {
        const { section, cycle } = req.query;
        let sql = 'SELECT * FROM classes WHERE 1=1';
        const params = [];
        
        if (section) {
            sql += ' AND section = ?';
            params.push(section);
        }
        if (cycle) {
            sql += ' AND cycle = ?';
            params.push(cycle);
        }
        sql += ' ORDER BY level';
        
        const classes = db.prepare(sql).all(params);
        res.json(classes);
    } catch (error) {
        console.error('❌ Erreur récupération classes:', error);
        res.status(500).json({ error: error.message });
    }
});

// 7. ÉLÈVES D'UNE CLASSE
appExpress.get('/api/class/:id/students', (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📋 Récupération des élèves pour la classe ${id}`);
        
        const students = db.prepare(`
            SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            WHERE s.class_id = ? AND s.status = 'active'
            ORDER BY s.full_name
        `).all(id);
        
        console.log(`📊 ${students.length} élèves trouvés`);
        res.json(students);
    } catch (error) {
        console.error('❌ Erreur récupération élèves:', error);
        res.status(500).json({ error: error.message });
    }
});

// 8. ÉLÈVE PAR ID
appExpress.get('/api/student/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const student = db.prepare(`
            SELECT s.*, c.name as class_display_name, c.section, c.cycle
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            WHERE s.id = ?
        `).get(id);
        
        if (!student) {
            return res.status(404).json({ error: 'Élève non trouvé' });
        }
        
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9. AJOUTER UN ÉLÈVE (AVEC DÉPLACEMENT DE PHOTO)
appExpress.post('/api/student', (req, res) => {
    try {
        const { first_name, last_name, class_id, sex = '', photo_path = '' } = req.body;
        
        if (!first_name || !last_name || !class_id) {
            return res.status(400).json({ error: 'Données manquantes' });
        }

        const classRow = db.prepare('SELECT name FROM classes WHERE id = ?').get(class_id);
        if (!classRow) {
            return res.status(400).json({ error: 'Classe non trouvée' });
        }

        const class_name = classRow.name;
        const full_name = `${first_name} ${last_name}`.trim();
        const matricule = `MAT-${Date.now().toString().slice(-6)}`;
        const academic_year = getCurrentAcademicYear();
        
        // Gérer le déplacement de la photo si elle existe
        let finalPhotoPath = '';
        if (photo_path) {
            const tempFilename = path.basename(photo_path);
            const tempPath = path.join(tempDir, tempFilename);
            
            // Créer le nom de fichier définitif avec le nom de l'élève
            const cleanFirstName = first_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
            const cleanLastName = last_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
            const ext = path.extname(tempFilename);
            const newFilename = `${cleanLastName} ${cleanFirstName}${ext}`;
            
            // Dossier de destination pour la classe
            const classDir = path.join(ecoleDetailsDir, class_name);
            if (!fs.existsSync(classDir)) {
                fs.mkdirSync(classDir, { recursive: true });
            }
            
            const finalPath = path.join(classDir, newFilename);
            
            // Déplacer le fichier
            if (fs.existsSync(tempPath)) {
                fs.renameSync(tempPath, finalPath);
                finalPhotoPath = `ecole-details/${class_name}/${newFilename}`;
                console.log(`✅ Photo déplacée vers: ${finalPhotoPath}`);
            }
        }

        // Insérer l'élève dans la base de données
        const result = db.prepare(`
            INSERT INTO students 
            (first_name, last_name, full_name, matricule, class_id, class_name, sex, academic_year, photo_path, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        `).run(
            first_name.trim(),
            last_name.trim(),
            full_name,
            matricule,
            class_id,
            class_name,
            sex,
            academic_year,
            finalPhotoPath
        );

        res.json({ 
            success: true, 
            studentId: result.lastInsertRowid,
            matricule,
            full_name,
            photo_path: finalPhotoPath,
            message: 'Élève ajouté avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur ajout élève:', error);
        res.status(500).json({ error: error.message });
    }
});

// 10. SUPPRIMER UN ÉLÈVE
appExpress.delete('/api/student/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
        res.json({ 
            success: true, 
            changes: result.changes,
            message: result.changes ? 'Élève supprimé' : 'Élève non trouvé'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============ ROUTES DE BULLETINS (COMPLÈTES) ============

// Fonction de gestion commune pour la création
function handleBulletinSave(req, res) {
    console.log('📥 Traitement bulletin - Données reçues:', {
        student_id: req.body.student_id,
        bulletin_type: req.body.bulletin_type,
        trimester: req.body.trimester
    });

    const {
        student_id,
        bulletin_type,
        trimester,
        sequence_type = 'mois',
        academic_year = getCurrentAcademicYear(),
        nom_eleve = '',
        matricule = '',
        sex = '',
        classe = '',
        enseignant = '',
        photo_data = '',
        data_json = '{}',
        moyenne_generale = '',
        appreciation = '',
        rang_position = '',
        decision = '',
        totals_json = '{}',
        is_finalized = false,
        is_draft = 1
    } = req.body;

    // Validation
    if (!student_id || !bulletin_type || !trimester) {
        return res.status(400).json({ 
            error: 'Données manquantes',
            required: ['student_id', 'bulletin_type', 'trimester']
        });
    }

    try {
        // Préparer les données JSON
        const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
        const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

        // Vérifier si le bulletin existe déjà
        const existing = db.prepare(`
            SELECT id FROM bulletins 
            WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
        `).get(student_id, bulletin_type, trimester, academic_year);

        if (existing) {
            // MISE À JOUR (via POST - rediriger vers PUT)
            console.log(`🔄 Bulletin existant ID: ${existing.id}, redirection vers PUT`);
            
            // Appeler la route PUT
            const putReq = { 
                ...req, 
                params: { id: existing.id },
                body: req.body,
                method: 'PUT',
                url: `/api/bulletin/${existing.id}`
            };
            
            return appExpress._router.handle(putReq, res, () => {});
        } else {
            // CRÉATION
            const result = db.prepare(`
                INSERT INTO bulletins (
                    student_id, bulletin_type, trimester, sequence_type, academic_year,
                    nom_eleve, matricule, sex, classe, enseignant, photo_data, data_json,
                    moyenne_generale, appreciation, rang_position, decision, totals_json,
                    is_finalized, is_draft
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
                student_id, bulletin_type, trimester, sequence_type, academic_year,
                nom_eleve, matricule, sex, classe, enseignant, photo_data, dataJsonString,
                moyenne_generale, appreciation, rang_position, decision, totalsJsonString,
                is_finalized ? 1 : 0,
                is_draft
            );
            
            console.log(`✅ Nouveau bulletin créé ID: ${result.lastInsertRowid}`);
            res.json({ 
                success: true, 
                id: result.lastInsertRowid, 
                action: 'create',
                message: 'Bulletin créé avec succès'
            });
        }
    } catch (error) {
        console.error('❌ Erreur sauvegarde bulletin:', error);
        res.status(500).json({ error: error.message });
    }
}

// ============ ROUTES DE MISE À JOUR (PUT) ============

// Route pour mettre à jour un bulletin existant (PUT)
appExpress.put('/api/bulletin/:id', (req, res) => {
    console.log(`📥 Route PUT /api/bulletin/${req.params.id} appelée`);
    
    const { id } = req.params;
    const {
        data_json,
        appreciation = '',
        rang_position = '',
        decision = '',
        is_draft = 1,
        is_finalized = 0,
        moyenne_generale = '',
        totals_json = '{}'
    } = req.body;

    try {
        // Préparer les données JSON
        const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
        const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

        // Mise à jour
        const result = db.prepare(`
            UPDATE bulletins SET 
                data_json = ?,
                appreciation = ?,
                rang_position = ?,
                decision = ?,
                is_draft = ?,
                is_finalized = ?,
                moyenne_generale = ?,
                totals_json = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(
            dataJsonString,
            appreciation,
            rang_position,
            decision,
            is_draft,
            is_finalized,
            moyenne_generale,
            totalsJsonString,
            id
        );
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        console.log(`✅ Bulletin mis à jour ID: ${id}`);
        res.json({ 
            success: true, 
            id: parseInt(id), 
            action: 'update',
            message: 'Bulletin mis à jour avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur mise à jour bulletin:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route alternative avec /api/bulletins (pluriel)
appExpress.put('/api/bulletins/:id', (req, res) => {
    console.log(`📥 Route PUT /api/bulletins/${req.params.id} appelée`);
    // Rediriger vers la route principale
    return appExpress._router.handle(
        { ...req, url: `/api/bulletin/${req.params.id}`, method: 'PUT' },
        res,
        () => {}
    );
});

// ============ ROUTES DE CRÉATION (POST) ============

// ROUTE PRINCIPALE (pluriel)
appExpress.post('/api/bulletins/save', handleBulletinSave);

// ROUTES DE COMPATIBILITÉ (singulier) - POUR TOUTES LES SECTIONS

// Pour section anglophone
appExpress.post('/api/bulletin/anglophone', (req, res) => {
    console.log('📥 Route /api/bulletin/anglophone appelée');
    req.body.bulletin_type = 'anglophone';
    handleBulletinSave(req, res);
});

// Pour section francophone
appExpress.post('/api/bulletin/francophone', (req, res) => {
    console.log('📥 Route /api/bulletin/francophone appelée');
    req.body.bulletin_type = 'francophone';
    handleBulletinSave(req, res);
});

// Pour section maternelle
appExpress.post('/api/bulletin/maternelle', (req, res) => {
    console.log('📥 Route /api/bulletin/maternelle appelée');
    req.body.bulletin_type = 'maternelle';
    handleBulletinSave(req, res);
});

// Route générique
appExpress.post('/api/bulletin/save', (req, res) => {
    console.log('📥 Route /api/bulletin/save appelée');
    if (!req.body.bulletin_type) {
        req.body.bulletin_type = 'maternelle';
    }
    handleBulletinSave(req, res);
});

// Route pour primaire
appExpress.post('/api/bulletin/primaire', (req, res) => {
    console.log('📥 Route /api/bulletin/primaire appelée');
    req.body.bulletin_type = 'primaire';
    handleBulletinSave(req, res);
});

// Route pour nursery
appExpress.post('/api/bulletin/nursery', (req, res) => {
    console.log('📥 Route /api/bulletin/nursery appelée');
    req.body.bulletin_type = 'nursery';
    handleBulletinSave(req, res);
});

// Route pour primary
appExpress.post('/api/bulletin/primary', (req, res) => {
    console.log('📥 Route /api/bulletin/primary appelée');
    req.body.bulletin_type = 'primary';
    handleBulletinSave(req, res);
});

// ROUTES POUR BULLETINS ANNUELS (placées ici, APRÈS la définition de handleBulletinSave)
appExpress.post('/api/bulletin/annual', (req, res) => {
    console.log('📥 Route /api/bulletin/annual appelée');
    req.body.bulletin_type = 'annual';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/annual', (req, res) => {
    console.log('📥 Route /api/bulletins/annual appelée');
    req.body.bulletin_type = 'annual';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletin/annuel', (req, res) => {
    console.log('📥 Route /api/bulletin/annuel appelée');
    req.body.bulletin_type = 'annuel';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/annuel', (req, res) => {
    console.log('📥 Route /api/bulletins/annuel appelée');
    req.body.bulletin_type = 'annuel';
    handleBulletinSave(req, res);
});

// ROUTES AU PLURIEL AUSSI (pour être sûr)
appExpress.post('/api/bulletins/anglophone', (req, res) => {
    console.log('📥 Route /api/bulletins/anglophone appelée');
    req.body.bulletin_type = 'anglophone';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/francophone', (req, res) => {
    console.log('📥 Route /api/bulletins/francophone appelée');
    req.body.bulletin_type = 'francophone';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/maternelle', (req, res) => {
    console.log('📥 Route /api/bulletins/maternelle appelée');
    req.body.bulletin_type = 'maternelle';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/primaire', (req, res) => {
    console.log('📥 Route /api/bulletins/primaire appelée');
    req.body.bulletin_type = 'primaire';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/nursery', (req, res) => {
    console.log('📥 Route /api/bulletins/nursery appelée');
    req.body.bulletin_type = 'nursery';
    handleBulletinSave(req, res);
});

appExpress.post('/api/bulletins/primary', (req, res) => {
    console.log('📥 Route /api/bulletins/primary appelée');
    req.body.bulletin_type = 'primary';
    handleBulletinSave(req, res);
});

// ============ ROUTES DE LECTURE (CORRIGÉES) ============

// Récupérer tous les bulletins d'un élève (CORRIGÉ)
appExpress.get('/api/student/:studentId/bulletins', (req, res) => {
    try {
        const { studentId } = req.params;
        
        const bulletins = db.prepare(`
            SELECT * FROM bulletins 
            WHERE student_id = ? 
            ORDER BY trimester, bulletin_type
        `).all(studentId);
        
        console.log(`📤 Envoi de ${bulletins.length} bulletins pour l'élève ${studentId}`);
        
        // Parser les données JSON seulement si c'est une chaîne
        bulletins.forEach(bulletin => {
            if (bulletin.data_json && typeof bulletin.data_json === 'string') {
                try {
                    bulletin.data_json = JSON.parse(bulletin.data_json);
                } catch (e) {
                    console.warn(`⚠️ Erreur parsing JSON pour bulletin ${bulletin.id}:`, e.message);
                    bulletin.data_json = {};
                }
            } else if (bulletin.data_json && typeof bulletin.data_json === 'object') {
                // Déjà un objet, ne pas reparser
                console.log(`✅ Bulletin ${bulletin.id}: data_json déjà parsé`);
            }
        });
        
        res.json(bulletins);
    } catch (error) {
        console.error('❌ Erreur récupération bulletins:', error);
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un bulletin spécifique (CORRIGÉ)
appExpress.get('/api/bulletins/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const bulletin = db.prepare('SELECT * FROM bulletins WHERE id = ?').get(id);
        
        if (!bulletin) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        // Parser les données JSON seulement si c'est une chaîne
        if (bulletin.data_json && typeof bulletin.data_json === 'string') {
            try {
                bulletin.data_json = JSON.parse(bulletin.data_json);
            } catch (e) {
                console.warn(`⚠️ Erreur parsing JSON pour bulletin ${id}:`, e.message);
                bulletin.data_json = {};
            }
        }
        
        res.json(bulletin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un bulletin spécifique (version singulier)
appExpress.get('/api/bulletin/:id', (req, res) => {
    return appExpress._router.handle(
        { ...req, url: `/api/bulletins/${req.params.id}`, method: 'GET' },
        res,
        () => {}
    );
});

// Vérifier si un bulletin existe
appExpress.get('/api/bulletins/check', (req, res) => {
    try {
        const { studentId, bulletinType, trimester, academicYear = getCurrentAcademicYear() } = req.query;
        
        const bulletin = db.prepare(`
            SELECT * FROM bulletins 
            WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
        `).get(studentId, bulletinType, trimester, academicYear);
        
        if (bulletin) {
            // Parser les données JSON
            if (bulletin.data_json && typeof bulletin.data_json === 'string') {
                try {
                    bulletin.data_json = JSON.parse(bulletin.data_json);
                } catch (e) {
                    bulletin.data_json = {};
                }
            }
        }
        
        res.json(bulletin || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============ ROUTES DE SUPPRESSION ============

// Supprimer un bulletin
appExpress.delete('/api/bulletins/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const result = db.prepare('DELETE FROM bulletins WHERE id = ?').run(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        res.json({ 
            success: true, 
            message: 'Bulletin supprimé avec succès' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un bulletin (version singulier)
appExpress.delete('/api/bulletin/:id', (req, res) => {
    return appExpress._router.handle(
        { ...req, url: `/api/bulletins/${req.params.id}`, method: 'DELETE' },
        res,
        () => {}
    );
});

// ROUTE DEBUG POUR VOIR LES ÉLÈVES IMPORTÉS
appExpress.get('/api/debug/students', (req, res) => {
    try {
        const students = db.prepare(`
            SELECT s.*, c.name as class_name 
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            ORDER BY c.name, s.last_name
        `).all();
        
        const stats = {
            total: students.length,
            byClass: {}
        };
        
        students.forEach(s => {
            const className = s.class_name || 'Sans classe';
            if (!stats.byClass[className]) {
                stats.byClass[className] = 0;
            }
            stats.byClass[className]++;
        });
        
        res.json({
            success: true,
            stats,
            students: students.map(s => ({
                id: s.id,
                name: `${s.first_name} ${s.last_name}`,
                class: s.class_name,
                photo: s.photo_path
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ROUTE TEST
appExpress.get('/api/test', (req, res) => {
    const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
    const studentsCount = db.prepare('SELECT COUNT(*) as count FROM students').get();
    
    res.json({
        message: '✅ API fonctionne parfaitement !',
        academic_year: getCurrentAcademicYear(),
        mode: isDev ? 'dev' : 'prod',
        stats: {
            classes: classesCount.count,
            students: studentsCount.count
        }
    });
});

// ============ SERVIR LE FRONTEND ============
if (!isDev) {
    appExpress.use(express.static(FRONTEND_DIST_PATH));
    
    appExpress.get('*', (req, res) => {
        if (!req.path.startsWith('/api') && !req.path.startsWith('/ecole-details') && !req.path.startsWith('/temp')) {
            res.sendFile(path.join(FRONTEND_DIST_PATH, 'index.html'));
        }
    });
}

// ============ FENÊTRE ELECTRON ============
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        icon: path.join(FRONTEND_PUBLIC_PATH, 'icon.ico')
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
        console.log('🔄 Chargement depuis Vite (http://localhost:5173)');
    } else {
        const indexPath = path.join(FRONTEND_DIST_PATH, 'index.html');
        console.log(`🔄 Chargement depuis ${indexPath}`);
        mainWindow.loadFile(indexPath);
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// ============ DÉMARRAGE ============
const server = appExpress.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur API intégré: http://localhost:${PORT}`);
    console.log(`📅 Année scolaire: ${getCurrentAcademicYear()}`);
    
    app.whenReady().then(() => {
        setTimeout(createWindow, 1500);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        server.close();
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

console.log('🎓 Gestion Bulletin - Version Finale avec routes bulletins annuelles');