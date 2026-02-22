


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

console.log('📂 isDev =', isDev);
console.log('📂 __dirname =', __dirname);
console.log('📂 resourcesPath =', process.resourcesPath);
console.log('📂 app.getPath("exe") =', app.getPath('exe'));
console.log('📂 app.getPath("userData") =', app.getPath('userData'));

if (isDev) {
    // Développement
    FRONTEND_PUBLIC_PATH = path.join(__dirname, '../../frontend/public');
    FRONTEND_DIST_PATH = path.join(__dirname, '../../frontend/dist');
    DB_PATH = path.join(__dirname, 'database.sqlite');
} else {
    // Production - chercher dans tous les endroits possibles
    const possiblePaths = [
        path.join(process.resourcesPath, 'app.asar', 'frontend', 'dist'),
        path.join(process.resourcesPath, 'app.asar', 'frontend'),
        path.join(process.resourcesPath, 'frontend', 'dist'),
        path.join(process.resourcesPath, 'frontend'),
        path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend', 'dist'),
        path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend'),
        path.join(path.dirname(app.getPath('exe')), 'resources', 'frontend', 'dist'),
        path.join(path.dirname(app.getPath('exe')), 'resources', 'frontend'),
        path.join(__dirname, '../../frontend/dist'),
        path.join(__dirname, '../../frontend')
    ];
    
    console.log('🔍 Recherche du frontend en production...');
    let frontendPath = null;
    
    for (const testPath of possiblePaths) {
        console.log(`📁 Test: ${testPath}`);
        if (fs.existsSync(testPath) && fs.existsSync(path.join(testPath, 'index.html'))) {
            frontendPath = testPath;
            console.log('✅ Frontend trouvé à:', testPath);
            break;
        }
    }
    
    if (!frontendPath) {
        console.error('❌ Frontend non trouvé! Utilisation du chemin par défaut');
        frontendPath = path.join(__dirname, '../../frontend/dist');
    }
    
    FRONTEND_DIST_PATH = frontendPath;
    FRONTEND_PUBLIC_PATH = path.join(path.dirname(frontendPath), 'public');
    DB_PATH = path.join(app.getPath('userData'), 'database.sqlite');
}

console.log(`📁 Dist path: ${FRONTEND_DIST_PATH}`);
console.log(`📁 Public path: ${FRONTEND_PUBLIC_PATH}`);
console.log(`🗄️  DB path: ${DB_PATH}`);
console.log(`📁 index.html existe? ${fs.existsSync(path.join(FRONTEND_DIST_PATH, 'index.html'))}`);

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

// Table bulletins
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
    const tableInfo = db.prepare("PRAGMA table_info(bulletins)").all();
    const hasIsDraft = tableInfo.some(col => col.name === 'is_draft');
    
    if (!hasIsDraft) {
        console.log('📝 Ajout de la colonne is_draft à la table bulletins...');
        db.exec(`ALTER TABLE bulletins ADD COLUMN is_draft INTEGER DEFAULT 1;`);
        console.log('✅ Colonne is_draft ajoutée avec succès');
    }
} catch (error) {
    console.error('❌ Erreur lors de la vérification/ajout de colonne:', error);
}

// ============ CLASSES PAR DÉFAUT ============
const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
if (classesCount.count === 0) {
    console.log('📚 Insertion des classes par défaut...');
    
    const defaultClasses = [
        ['PETITE SECTION', 'Petite Section', 'francophone', 'maternelle', 1],
        ['MOYENNE SECTION', 'Moyenne Section', 'francophone', 'maternelle', 2],
        ['GRANDE SECTION', 'Grande Section', 'francophone', 'maternelle', 3],
        ['SIL', 'SIL', 'francophone', 'primaire', 4],
        ['CP', 'CP', 'francophone', 'primaire', 5],
        ['CEI', 'CEI', 'francophone', 'primaire', 6],
        ['CEII', 'CEII', 'francophone', 'primaire', 7],
        ['CM1', 'CM1', 'francophone', 'primaire', 8],
        ['CM2', 'CM2', 'francophone', 'primaire', 9],
        ['PRE-NURSERY', 'Pre-Nursery', 'anglophone', 'nursery', 1],
        ['NURSERY 1', 'Nursery 1', 'anglophone', 'nursery', 2],
        ['NURSERY 2', 'Nursery 2', 'anglophone', 'nursery', 3],
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

// ============ IMPORT AUTOMATIQUE DES ÉLÈVES ============
function importStudentsFromFolders() {
    console.log('🔍 Recherche des élèves dans les dossiers...');
    
    try {
        const ecoleDetailsDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details');
        
        if (!fs.existsSync(ecoleDetailsDir)) {
            console.log('📁 Dossier ecole details non trouvé');
            return;
        }

        const classes = db.prepare('SELECT id, name FROM classes').all();
        let totalImported = 0;
        let totalSkipped = 0;

        const folders = fs.readdirSync(ecoleDetailsDir).filter(item => {
            const itemPath = path.join(ecoleDetailsDir, item);
            return fs.statSync(itemPath).isDirectory();
        });

        console.log(`📁 Dossiers trouvés: ${folders.join(', ')}`);

        const folderMap = {
            'NURSERY1 AND PRE-NURSERY': ['PRE-NURSERY', 'NURSERY 1'],
            'NURSERY2': ['NURSERY 2'],
            'CLASS1': ['CLASS 1'],
            'CLASS2': ['CLASS 2'],
            'CLASS4': ['CLASS 4']
        };

        folders.forEach(folderName => {
            let classId = null;
            let className = null;
            
            const possibleNames = folderMap[folderName] || [folderName, folderName.replace(/\s+/g, ''), folderName.replace(/(\d+)/, ' $1')];
            
            for (const possibleName of possibleNames) {
                const found = classes.find(c => c.name === possibleName);
                if (found) {
                    classId = found.id;
                    className = found.name;
                    break;
                }
            }

            if (!classId) {
                console.log(`⚠️ Aucune classe trouvée pour le dossier: ${folderName}`);
                return;
            }

            const classFolder = path.join(ecoleDetailsDir, folderName);
            const files = fs.readdirSync(classFolder);
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

            if (imageFiles.length === 0) return;

            console.log(`📸 Classe ${className} (dossier: ${folderName}): ${imageFiles.length} photos trouvées`);

            imageFiles.forEach(file => {
                try {
                    const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
                    const parts = fileNameWithoutExt.split(' ');
                    
                    if (parts.length >= 2) {
                        const lastName = parts[0].trim().toUpperCase();
                        const firstName = parts.slice(1).join(' ').trim();
                        
                        const existing = db.prepare(`
                            SELECT id FROM students 
                            WHERE first_name = ? AND last_name = ? AND class_id = ?
                        `).get(firstName, lastName, classId);
                        
                        if (!existing) {
                            const matricule = `AUTO-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`;
                            
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
        const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get();
        console.log(`👥 Total élèves dans la base: ${totalStudents.count}`);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
    }
}

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
appExpress.get('/ecole-details/*', (req, res) => {
    const filePath = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', req.params[0]);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Photo non trouvée' });
    }
});

appExpress.get('/temp/*', (req, res) => {
    const filePath = path.join(FRONTEND_PUBLIC_PATH, 'temp', req.params[0]);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Photo temporaire non trouvée' });
    }
});

// ============ API ROUTES ============
appExpress.get('/api/health', (req, res) => {
    res.json({ status: 'OK', academic_year: getCurrentAcademicYear(), db: DB_PATH, mode: isDev ? 'dev' : 'prod' });
});

appExpress.get('/api/academic-year/current', (req, res) => {
    res.json({ academic_year: getCurrentAcademicYear() });
});

appExpress.post('/api/upload/student-photo', (req, res) => {
    console.log('📸 Upload de photo démarré...');
    
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) { cb(null, tempDir); },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(file.originalname);
                cb(null, 'temp-photo-' + uniqueSuffix + ext);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) cb(null, true);
            else cb(new Error('Seules les images sont autorisées'), false);
        }
    }).single('photo');
    
    upload(req, res, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
        res.json({ success: true, photo_path: 'temp/' + req.file.filename, filename: req.file.filename });
    });
});

appExpress.get('/api/classes/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (!isNaN(id)) {
            const classe = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
            if (!classe) return res.status(404).json({ error: 'Classe non trouvée' });
            return res.json(classe);
        }
        return res.status(404).json({ error: 'Route non trouvée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/classes/:section/:cycle', (req, res) => {
    try {
        const { section, cycle } = req.params;
        const classes = db.prepare(`SELECT * FROM classes WHERE section = ? AND cycle = ? ORDER BY level`).all(section, cycle);
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/classes', (req, res) => {
    try {
        const { section, cycle } = req.query;
        let sql = 'SELECT * FROM classes WHERE 1=1';
        const params = [];
        if (section) { sql += ' AND section = ?'; params.push(section); }
        if (cycle) { sql += ' AND cycle = ?'; params.push(cycle); }
        sql += ' ORDER BY level';
        const classes = db.prepare(sql).all(params);
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/class/:id/students', (req, res) => {
    try {
        const { id } = req.params;
        const students = db.prepare(`
            SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            WHERE s.class_id = ? AND s.status = 'active'
            ORDER BY s.full_name
        `).all(id);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/student/:id', (req, res) => {
    try {
        const { id } = req.params;
        const student = db.prepare(`
            SELECT s.*, c.name as class_display_name, c.section, c.cycle
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            WHERE s.id = ?
        `).get(id);
        if (!student) return res.status(404).json({ error: 'Élève non trouvé' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.post('/api/student', (req, res) => {
    try {
        const { first_name, last_name, class_id, sex = '', photo_path = '' } = req.body;
        if (!first_name || !last_name || !class_id) return res.status(400).json({ error: 'Données manquantes' });

        const classRow = db.prepare('SELECT name FROM classes WHERE id = ?').get(class_id);
        if (!classRow) return res.status(400).json({ error: 'Classe non trouvée' });

        const class_name = classRow.name;
        const full_name = `${first_name} ${last_name}`.trim();
        const matricule = `MAT-${Date.now().toString().slice(-6)}`;
        const academic_year = getCurrentAcademicYear();
        
        let finalPhotoPath = '';
        if (photo_path) {
            const tempFilename = path.basename(photo_path);
            const tempPath = path.join(tempDir, tempFilename);
            const cleanFirstName = first_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
            const cleanLastName = last_name.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
            const ext = path.extname(tempFilename);
            const newFilename = `${cleanLastName} ${cleanFirstName}${ext}`;
            const classDir = path.join(ecoleDetailsDir, class_name);
            if (!fs.existsSync(classDir)) fs.mkdirSync(classDir, { recursive: true });
            const finalPath = path.join(classDir, newFilename);
            if (fs.existsSync(tempPath)) {
                fs.renameSync(tempPath, finalPath);
                finalPhotoPath = `ecole-details/${class_name}/${newFilename}`;
            }
        }

        const result = db.prepare(`
            INSERT INTO students 
            (first_name, last_name, full_name, matricule, class_id, class_name, sex, academic_year, photo_path, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        `).run(first_name.trim(), last_name.trim(), full_name, matricule, class_id, class_name, sex, academic_year, finalPhotoPath);

        res.json({ success: true, studentId: result.lastInsertRowid, matricule, full_name, photo_path: finalPhotoPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.delete('/api/student/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
        res.json({ success: true, changes: result.changes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============ ROUTES DE BULLETINS ============
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

    if (!student_id || !bulletin_type || !trimester) {
        return res.status(400).json({ error: 'Données manquantes', required: ['student_id', 'bulletin_type', 'trimester'] });
    }

    try {
        const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
        const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

        const existing = db.prepare(`
            SELECT id FROM bulletins 
            WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?
        `).get(student_id, bulletin_type, trimester, academic_year);

        if (existing) {
            db.prepare(`
                UPDATE bulletins SET 
                    data_json = ?,
                    moyenne_generale = ?,
                    appreciation = ?,
                    rang_position = ?,
                    decision = ?,
                    totals_json = ?,
                    photo_data = ?,
                    is_finalized = ?,
                    is_draft = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(dataJsonString, moyenne_generale, appreciation, rang_position, decision, totalsJsonString, photo_data, is_finalized ? 1 : 0, is_draft, existing.id);
            
            res.json({ success: true, id: existing.id, action: 'update', message: 'Bulletin mis à jour' });
        } else {
            const result = db.prepare(`
                INSERT INTO bulletins (
                    student_id, bulletin_type, trimester, sequence_type, academic_year,
                    nom_eleve, matricule, sex, classe, enseignant, photo_data, data_json,
                    moyenne_generale, appreciation, rang_position, decision, totals_json,
                    is_finalized, is_draft
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(student_id, bulletin_type, trimester, sequence_type, academic_year,
                nom_eleve, matricule, sex, classe, enseignant, photo_data, dataJsonString,
                moyenne_generale, appreciation, rang_position, decision, totalsJsonString,
                is_finalized ? 1 : 0, is_draft);
            
            res.json({ success: true, id: result.lastInsertRowid, action: 'create', message: 'Bulletin créé' });
        }
    } catch (error) {
        console.error('❌ Erreur sauvegarde bulletin:', error);
        res.status(500).json({ error: error.message });
    }
}

// Routes PUT
appExpress.put('/api/bulletin/:id', (req, res) => {
    const { id } = req.params;
    const { data_json, appreciation, rang_position, decision, is_draft = 1, is_finalized = 0, moyenne_generale = '', totals_json = '{}' } = req.body;

    try {
        const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
        const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

        const result = db.prepare(`
            UPDATE bulletins SET 
                data_json = ?, appreciation = ?, rang_position = ?, decision = ?, is_draft = ?, is_finalized = ?, moyenne_generale = ?, totals_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(dataJsonString, appreciation, rang_position, decision, is_draft, is_finalized, moyenne_generale, totalsJsonString, id);
        
        if (result.changes === 0) return res.status(404).json({ error: 'Bulletin non trouvé' });
        res.json({ success: true, id: parseInt(id), action: 'update', message: 'Bulletin mis à jour' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.put('/api/bulletins/:id', (req, res) => {
    return appExpress._router.handle({ ...req, url: `/api/bulletin/${req.params.id}`, method: 'PUT' }, res, () => {});
});

// Routes POST
appExpress.post('/api/bulletins/save', handleBulletinSave);
appExpress.post('/api/bulletin/anglophone', (req, res) => { req.body.bulletin_type = 'anglophone'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/francophone', (req, res) => { req.body.bulletin_type = 'francophone'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/maternelle', (req, res) => { req.body.bulletin_type = 'maternelle'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/save', (req, res) => { if (!req.body.bulletin_type) req.body.bulletin_type = 'maternelle'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/primaire', (req, res) => { req.body.bulletin_type = 'primaire'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/nursery', (req, res) => { req.body.bulletin_type = 'nursery'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/primary', (req, res) => { req.body.bulletin_type = 'primary'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/annual', (req, res) => { req.body.bulletin_type = 'annual'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/annual', (req, res) => { req.body.bulletin_type = 'annual'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletin/annuel', (req, res) => { req.body.bulletin_type = 'annuel'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/annuel', (req, res) => { req.body.bulletin_type = 'annuel'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/anglophone', (req, res) => { req.body.bulletin_type = 'anglophone'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/francophone', (req, res) => { req.body.bulletin_type = 'francophone'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/maternelle', (req, res) => { req.body.bulletin_type = 'maternelle'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/primaire', (req, res) => { req.body.bulletin_type = 'primaire'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/nursery', (req, res) => { req.body.bulletin_type = 'nursery'; handleBulletinSave(req, res); });
appExpress.post('/api/bulletins/primary', (req, res) => { req.body.bulletin_type = 'primary'; handleBulletinSave(req, res); });

// Routes GET bulletins
appExpress.get('/api/student/:studentId/bulletins', (req, res) => {
    try {
        const bulletins = db.prepare(`SELECT * FROM bulletins WHERE student_id = ? ORDER BY trimester, bulletin_type`).all(req.params.studentId);
        bulletins.forEach(b => {
            if (b.data_json && typeof b.data_json === 'string') {
                try { b.data_json = JSON.parse(b.data_json); } catch { b.data_json = {}; }
            }
        });
        res.json(bulletins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/bulletins/:id', (req, res) => {
    try {
        const bulletin = db.prepare('SELECT * FROM bulletins WHERE id = ?').get(req.params.id);
        if (!bulletin) return res.status(404).json({ error: 'Bulletin non trouvé' });
        if (bulletin.data_json && typeof bulletin.data_json === 'string') {
            try { bulletin.data_json = JSON.parse(bulletin.data_json); } catch { bulletin.data_json = {}; }
        }
        res.json(bulletin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/bulletin/:id', (req, res) => {
    return appExpress._router.handle({ ...req, url: `/api/bulletins/${req.params.id}`, method: 'GET' }, res, () => {});
});

appExpress.get('/api/bulletins/check', (req, res) => {
    try {
        const { studentId, bulletinType, trimester, academicYear = getCurrentAcademicYear() } = req.query;
        const bulletin = db.prepare(`SELECT * FROM bulletins WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?`).get(studentId, bulletinType, trimester, academicYear);
        if (bulletin && bulletin.data_json && typeof bulletin.data_json === 'string') {
            try { bulletin.data_json = JSON.parse(bulletin.data_json); } catch { bulletin.data_json = {}; }
        }
        res.json(bulletin || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes DELETE
appExpress.delete('/api/bulletins/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM bulletins WHERE id = ?').run(req.params.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Bulletin non trouvé' });
        res.json({ success: true, message: 'Bulletin supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.delete('/api/bulletin/:id', (req, res) => {
    return appExpress._router.handle({ ...req, url: `/api/bulletins/${req.params.id}`, method: 'DELETE' }, res, () => {});
});

// Routes debug
appExpress.get('/api/debug/students', (req, res) => {
    try {
        const students = db.prepare(`SELECT s.*, c.name as class_name FROM students s LEFT JOIN classes c ON s.class_id = c.id ORDER BY c.name, s.last_name`).all();
        const stats = { total: students.length, byClass: {} };
        students.forEach(s => { const className = s.class_name || 'Sans classe'; stats.byClass[className] = (stats.byClass[className] || 0) + 1; });
        res.json({ success: true, stats, students: students.map(s => ({ id: s.id, name: `${s.first_name} ${s.last_name}`, class: s.class_name, photo: s.photo_path })) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

appExpress.get('/api/test', (req, res) => {
    const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
    const studentsCount = db.prepare('SELECT COUNT(*) as count FROM students').get();
    res.json({ message: '✅ API fonctionne !', academic_year: getCurrentAcademicYear(), mode: isDev ? 'dev' : 'prod', stats: { classes: classesCount.count, students: studentsCount.count } });
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
        webPreferences: { nodeIntegration: false, contextIsolation: true },
        icon: path.join(FRONTEND_PUBLIC_PATH, 'icon.ico')
    });

    mainWindow.once('ready-to-show', () => { mainWindow.show(); mainWindow.focus(); });

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
        console.log('🔄 Chargement depuis Vite (http://localhost:5173)');
    } else {
        let indexPath = '';
        const possiblePaths = [
            path.join(FRONTEND_DIST_PATH, 'index.html'),
            path.join(process.resourcesPath, 'app.asar', 'frontend', 'dist', 'index.html'),
            path.join(process.resourcesPath, 'frontend', 'dist', 'index.html'),
            path.join(path.dirname(app.getPath('exe')), 'resources', 'app.asar', 'frontend', 'dist', 'index.html'),
            path.join(path.dirname(app.getPath('exe')), 'resources', 'frontend', 'dist', 'index.html'),
            path.join(__dirname, '../../frontend/dist/index.html')
        ];
        
        console.log('🔍 Recherche de index.html en production...');
        for (const testPath of possiblePaths) {
            console.log('📁 Test:', testPath);
            if (fs.existsSync(testPath)) {
                indexPath = testPath;
                console.log('✅ Trouvé à:', indexPath);
                break;
            }
        }
        
        if (indexPath && fs.existsSync(indexPath)) {
            console.log('📂 Chargement de:', indexPath);
            mainWindow.loadFile(indexPath).catch(err => {
                console.error('❌ Erreur loadFile:', err);
                mainWindow.loadURL('http://localhost:3000');
            });
        } else {
            console.error('❌ index.html non trouvé!');
            mainWindow.loadURL('http://localhost:3000');
        }
    }

    mainWindow.on('closed', () => { mainWindow = null; });
}

// ============ DÉMARRAGE ============
const server = appExpress.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur API intégré: http://localhost:${PORT}`);
    console.log(`📅 Année scolaire: ${getCurrentAcademicYear()}`);
    app.whenReady().then(() => setTimeout(createWindow, 1500));
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { server.close(); app.quit(); } });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

console.log('🎓 Gestion Bulletin - Version compatible Windows');