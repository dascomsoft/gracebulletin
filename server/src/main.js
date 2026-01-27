

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

// ============ CHEMINS ABSOLUS ============
const FRONTEND_PUBLIC_PATH = '/home/dascom/gracebulletin/frontend/public';
const FRONTEND_DIST_PATH = '/home/dascom/gracebulletin/frontend/dist';

// ============ IMPORTS BACKEND SQLITE ============
const database = require('./database/db');
const initializeDatabase = require('./database/init');
const seedDatabase = require('./database/seed');

let mainWindow;
let crashCount = 0;
const MAX_CRASH_RETRIES = 3;

// ============ CONFIGURATION MULTER POUR LES PHOTOS ============
// Configuration spéciale pour gérer FormData avec fichiers
const getStorage = (classId, firstName, lastName, className) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            // Utiliser le dossier EXISTANT "ecole details" dans la classe spécifique
            const uploadDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', className);
            
            // Créer le dossier de la classe s'il n'existe pas
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
                console.log(`📁 Dossier créé: ${uploadDir}`);
            }
            
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            // Utiliser le nom de l'élève comme nom de fichier
            if (firstName && lastName) {
                const cleanFirstName = firstName.trim().replace(/[^a-zA-Z]/g, '');
                const cleanLastName = lastName.trim().replace(/[^a-zA-Z]/g, '');
                const filename = `${cleanLastName.toUpperCase()} ${cleanFirstName.toUpperCase()}.jpeg`;
                cb(null, filename);
            } else {
                // Fallback : nom unique
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(file.originalname);
                cb(null, uniqueSuffix + ext);
            }
        }
    });
};

// Middleware pour parser multipart/form-data avec multer
const createUploadMiddleware = (req, res, next) => {
    // Récupérer les données du body (pour les routes qui ont déjà parsé le body)
    const class_id = req.body.class_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    
    if (!class_id) {
        return res.status(400).json({ error: 'Classe non spécifiée' });
    }
    
    // Récupérer le nom de la classe
    database.get('SELECT name FROM classes WHERE id = ?', [class_id], (err, classRow) => {
        if (err || !classRow) {
            return res.status(400).json({ error: 'Classe non trouvée' });
        }
        
        const className = classRow.name;
        const storage = getStorage(class_id, first_name, last_name, className);
        
        const upload = multer({ 
            storage: storage,
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Seules les images sont autorisées'), false);
                }
            }
        }).single('photo');
        
        // Stocker le className dans la requête pour l'utiliser plus tard
        req.className = className;
        upload(req, res, next);
    });
};

// Simple upload pour les changements de photo (sans besoin de class_id dans le body)
const simpleUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Pour les changements de photo, on utilise un dossier temporaire
            const uploadDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', 'temp');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, 'temp-' + uniqueSuffix + ext);
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

// ============ FONCTIONS UTILITAIRES ============
function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11
    
    // Année scolaire : septembre (8) à juin (5)
    if (month >= 8) { // Septembre à décembre
        return `${year}-${year + 1}`;
    } else { // Janvier à août
        return `${year - 1}-${year}`;
    }
}

function getFrontendPath() {
    // Utilisez le chemin absolu
    if (fs.existsSync(FRONTEND_DIST_PATH) && fs.existsSync(path.join(FRONTEND_DIST_PATH, 'index.html'))) {
        return FRONTEND_DIST_PATH;
    }
    return null;
}

// ============ API ROUTES COMPLÈTES ============
function setupAPI(serverApp) {
    // Route santé
    serverApp.get('/api/health', (req, res) => {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            academic_year: getCurrentAcademicYear()
        });
    });

    // Route pour l'année scolaire courante
    serverApp.get('/api/academic-year/current', (req, res) => {
        res.json({ 
            academic_year: getCurrentAcademicYear(),
            server_time: new Date().toISOString()
        });
    });

    // 1. ROUTE POUR UPLOADER UNE PHOTO - VERSION SIMPLIFIÉE
    serverApp.post('/api/upload/student-photo', (req, res) => {
        console.log('📸 Upload de photo démarré...');
        
        // SIMPLE : Accepter n'importe quel upload sans vérifier class_id
        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    // Mettre directement dans public/ avec chemin ABSOLU
                    console.log(`📁 Destination upload: ${FRONTEND_PUBLIC_PATH}`);
                    cb(null, FRONTEND_PUBLIC_PATH);
                },
                filename: function (req, file, cb) {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = path.extname(file.originalname);
                    const filename = 'temp-photo-' + uniqueSuffix + ext;
                    console.log(`📄 Nom fichier temporaire: ${filename}`);
                    cb(null, filename);
                }
            })
        }).single('photo');
        
        upload(req, res, function(err) {
            if (err) {
                console.error('❌ Erreur upload:', err);
                return res.status(500).json({ error: err.message });
            }
            
            if (!req.file) {
                console.error('❌ Aucun fichier uploadé');
                return res.status(400).json({ error: 'Aucun fichier' });
            }
            
            console.log(`✅ Photo uploadée: ${req.file.filename}, Chemin: ${req.file.path}`);
            
            res.json({
                success: true,
                photo_path: req.file.filename, // Juste le nom du fichier
                message: 'Photo uploadée'
            });
        });
    });

    // 2. ROUTE POUR CHANGER LA PHOTO D'UN ÉLÈVE
    serverApp.post('/api/student/:id/photo', (req, res) => {
        simpleUpload(req, res, async function(err) {
            try {
                if (err) {
                    throw err;
                }
                
                const { id } = req.params;
                
                if (!req.file) {
                    return res.status(400).json({ error: 'Aucun fichier téléchargé' });
                }

                // Récupérer l'élève pour connaître sa classe
                const student = await database.get(
                    'SELECT class_name, first_name, last_name FROM students WHERE id = ?',
                    [id]
                );
                
                if (!student) {
                    // Supprimer le fichier temporaire
                    fs.unlinkSync(req.file.path);
                    return res.status(404).json({ error: 'Élève non trouvé' });
                }

                // Générer le nouveau nom de fichier
                const cleanFirstName = student.first_name.trim().replace(/[^a-zA-Z]/g, '');
                const cleanLastName = student.last_name.trim().replace(/[^a-zA-Z]/g, '');
                const newFilename = `${cleanLastName.toUpperCase()} ${cleanFirstName.toUpperCase()}.jpeg`;
                
                // Chemin final - utilisez FRONTEND_PUBLIC_PATH
                const finalPath = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', student.class_name, newFilename);
                const tempPath = req.file.path;
                
                // Créer le dossier de la classe s'il n'existe pas
                const classDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', student.class_name);
                if (!fs.existsSync(classDir)) {
                    fs.mkdirSync(classDir, { recursive: true });
                }
                
                // Renommer/move le fichier
                fs.renameSync(tempPath, finalPath);
                
                const photoPath = `ecole details/${student.class_name}/${newFilename}`;
                
                // Mettre à jour la photo dans la base
                await database.run(
                    'UPDATE students SET photo_path = ? WHERE id = ?',
                    [photoPath, id]
                );

                // Récupérer les infos de l'élève
                const updatedStudent = await database.get(
                    'SELECT * FROM students WHERE id = ?',
                    [id]
                );
                
                res.json({
                    success: true,
                    message: 'Photo mise à jour avec succès',
                    photo_path: photoPath,
                    student: updatedStudent
                });
                
            } catch (error) {
                console.error('❌ Erreur changement photo:', error);
                res.status(500).json({ error: error.message });
            }
        });
    });

    // 3. Récupérer les classes
    serverApp.get('/api/classes/:section/:cycle', async (req, res) => {
        try {
            const { section, cycle } = req.params;
            const classes = await database.all(
                'SELECT * FROM classes WHERE section = ? AND cycle = ? ORDER BY level',
                [section, cycle]
            );
            res.json(classes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 4. Récupérer toutes les classes
    serverApp.get('/api/classes', async (req, res) => {
        try {
            const { section, cycle } = req.query;
            let query = 'SELECT * FROM classes WHERE 1=1';
            const params = [];

            if (section) {
                query += ' AND section = ?';
                params.push(section);
            }
            if (cycle) {
                query += ' AND cycle = ?';
                params.push(cycle);
            }

            const classes = await database.all(query, params);
            res.json(classes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 5. Récupérer une classe par ID
    serverApp.get('/api/classes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const classe = await database.get(
                'SELECT * FROM classes WHERE id = ?',
                [id]
            );
            
            if (!classe) {
                return res.status(404).json({ error: 'Classe non trouvée' });
            }
            
            res.json(classe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 6. Récupérer les élèves d'une classe
    serverApp.get('/api/class/:id/students', async (req, res) => {
        try {
            const { id } = req.params;
            const students = await database.all(
                `SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
                 FROM students s 
                 LEFT JOIN classes c ON s.class_id = c.id 
                 WHERE s.class_id = ? AND s.status = 'active'
                 ORDER BY s.full_name`,
                [id]
            );
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 7. Récupérer UN élève
    serverApp.get('/api/student/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const student = await database.get(
                `SELECT s.*, c.name as class_display_name, c.section, c.cycle
                 FROM students s 
                 LEFT JOIN classes c ON s.class_id = c.id 
                 WHERE s.id = ?`,
                [id]
            );
            
            if (!student) {
                return res.status(404).json({ error: 'Élève non trouvé' });
            }
            
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });




    


    // Ajoutez cette route pour récupérer UN bulletin spécifique :
serverApp.get('/api/bulletin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bulletin = await database.get(
            'SELECT * FROM bulletins WHERE id = ?',
            [id]
        );
        
        if (!bulletin) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        res.json(bulletin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Optionnel : route pour supprimer un bulletin
serverApp.delete('/api/bulletin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await database.run(
            'DELETE FROM bulletins WHERE id = ?',
            [id]
        );
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        res.json({ success: true, message: 'Bulletin supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






    // 8. Récupérer les bulletins d'un élève
    serverApp.get('/api/student/:id/bulletins', async (req, res) => {
        try {
            const { id } = req.params;
            const bulletins = await database.all(
                `SELECT * FROM bulletins WHERE student_id = ? ORDER BY trimester`,
                [id]
            );
            res.json(bulletins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 9. Tous les élèves (pour debug)
    serverApp.get('/api/students', async (req, res) => {
        try {
            const { classId } = req.query;
            let query = `SELECT s.*, c.name as class_display_name, c.section, c.cycle
                        FROM students s
                        LEFT JOIN classes c ON s.class_id = c.id`;
            const params = [];

            if (classId) {
                query += ' WHERE s.class_id = ?';
                params.push(classId);
            }

            query += ' ORDER BY s.class_name, s.full_name LIMIT 100';
            
            const students = await database.all(query, params);
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 10. AJOUTER UN ÉLÈVE AVEC PHOTO - ROUTE CORRIGÉE
    serverApp.post('/api/student', async (req, res) => {
        try {
            const { 
                first_name, 
                last_name, 
                matricule, 
                class_id,
                sex = '',
                photo_path = '',
                academic_year = getCurrentAcademicYear()
            } = req.body;

            console.log('📝 Ajout élève - Données reçues:', {
                first_name,
                last_name,
                matricule,
                class_id,
                sex,
                photo_path,
                academic_year
            });

            // Validation
            if (!first_name || !last_name || !class_id) {
                return res.status(400).json({ 
                    error: 'Données manquantes',
                    required: ['first_name', 'last_name', 'class_id']
                });
            }

            // Récupérer le nom de la classe
            const classRecord = await database.get(
                'SELECT name FROM classes WHERE id = ?',
                [class_id]
            );
            
            if (!classRecord) {
                return res.status(400).json({ error: 'Classe non trouvée' });
            }
            
            const class_name = classRecord.name;
            console.log(`📁 Classe trouvée: ${class_name}`);

            // Gérer la photo (si photo_path est fourni)
            let finalPhotoPath = '';
            if (photo_path) {
                // photo_path est juste un nom de fichier dans public/
                const tempFilename = photo_path;
                const cleanFirstName = first_name.trim().replace(/[^a-zA-Z]/g, '');
                const cleanLastName = last_name.trim().replace(/[^a-zA-Z]/g, '');
                
                // Garder l'extension originale
                const originalExt = path.extname(tempFilename); // .webp, .jpg, .png, etc.
                const newFilename = `${cleanLastName.toUpperCase()} ${cleanFirstName.toUpperCase()}${originalExt}`;
                
                // Chemins ABSOLUS
                const tempPath = path.join(FRONTEND_PUBLIC_PATH, tempFilename);
                const finalPath = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', class_name, newFilename);
                const classDir = path.join(FRONTEND_PUBLIC_PATH, 'ecole details', class_name);
                
                console.log(`📁 Traitement photo:`);
                console.log(`   📄 Fichier temporaire: ${tempFilename}`);
                console.log(`   📁 Chemin temporaire: ${tempPath}`);
                console.log(`   📁 Chemin final: ${finalPath}`);
                console.log(`   📁 Nom final: ${newFilename}`);
                console.log(`   📁 Dossier classe existe? ${fs.existsSync(classDir)}`);
                console.log(`   📁 Fichier temporaire existe? ${fs.existsSync(tempPath)}`);
                
                // Créer le dossier de la classe s'il n'existe pas
                if (!fs.existsSync(classDir)) {
                    fs.mkdirSync(classDir, { recursive: true });
                    console.log(`✅ Dossier créé: ${classDir}`);
                }
                
                // Vérifier si le fichier temporaire existe
                if (fs.existsSync(tempPath)) {
                    try {
                        // Copier d'abord, puis supprimer l'original
                        fs.copyFileSync(tempPath, finalPath);
                        fs.unlinkSync(tempPath);
                        finalPhotoPath = `ecole details/${class_name}/${newFilename}`;
                        console.log(`✅ Photo déplacée: ${tempFilename} → ${finalPhotoPath}`);
                    } catch (error) {
                        console.error('❌ Erreur déplacement photo:', error);
                        // Essayer rename comme fallback
                        try {
                            fs.renameSync(tempPath, finalPath);
                            finalPhotoPath = `ecole details/${class_name}/${newFilename}`;
                            console.log(`✅ Photo renommée: ${tempFilename} → ${finalPhotoPath}`);
                        } catch (renameError) {
                            console.error('❌ Erreur rename photo:', renameError);
                        }
                    }
                } else {
                    console.warn(`⚠️ Fichier temporaire non trouvé: ${tempPath}`);
                    // Liste les fichiers dans public/ pour debug
                    try {
                        const files = fs.readdirSync(FRONTEND_PUBLIC_PATH);
                        console.warn(`⚠️ Fichiers dans ${FRONTEND_PUBLIC_PATH}:`, files);
                    } catch (readError) {
                        console.error('❌ Impossible de lire le dossier public:', readError);
                    }
                }
            } else {
                console.log('📸 Aucune photo fournie pour cet élève');
            }

            // Générer un matricule si non fourni
            const finalMatricule = matricule || `MAT-${Date.now().toString().slice(-6)}`;
            
            // Générer le nom complet
            const full_name = `${first_name} ${last_name}`.trim();

            console.log(`📝 Insertion dans la base de données...`);
            console.log(`   👤 Nom complet: ${full_name}`);
            console.log(`   🔢 Matricule: ${finalMatricule}`);
            console.log(`   📸 Photo: ${finalPhotoPath || 'Aucune'}`);

            // Insérer avec photo
            const result = await database.run(
                `INSERT INTO students (
                    first_name, last_name, full_name, matricule, 
                    class_id, class_name, sex, photo_path,
                    academic_year, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', datetime('now'))`,
                [
                    first_name.trim(),
                    last_name.trim(),
                    full_name,
                    finalMatricule,
                    class_id,
                    class_name,
                    sex,
                    finalPhotoPath,
                    academic_year
                ]
            );
            
            console.log(`✅ Élève ajouté avec ID: ${result.id}`);
            
            res.json({ 
                success: true, 
                message: 'Élève ajouté avec succès',
                studentId: result.id,
                matricule: finalMatricule,
                photo_path: finalPhotoPath
            });
            
        } catch (error) {
            console.error('❌ Erreur ajout élève:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // 11. Supprimer un élève
    serverApp.delete('/api/student/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await database.run(
                'DELETE FROM students WHERE id = ?',
                [id]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Élève non trouvé' });
            }
            
            res.json({ 
                success: true, 
                message: 'Élève supprimé avec succès'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 12. Promouvoir un élève
    serverApp.post('/api/student/:id/promote', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await database.run(
                `UPDATE students SET academic_year = ? WHERE id = ?`,
                [getCurrentAcademicYear(), id]
            );
            
            res.json({ 
                success: true, 
                message: 'Élève promu avec succès'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // 13. Sauvegarder bulletin maternelle
    serverApp.post('/api/bulletin/maternelle', async (req, res) => {
        try {
            const bulletin = req.body;
            const result = await database.run(
                `INSERT INTO bulletins (
                    student_id, bulletin_type, trimester, academic_year,
                    nom_eleve, classe, enseignant,
                    data_json, appreciation, rang_position, decision,
                    created_at
                ) VALUES (?, 'maternelle', ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
                [
                    bulletin.student_id,
                    bulletin.trimester || 1,
                    getCurrentAcademicYear(),
                    bulletin.nom_eleve,
                    bulletin.classe,
                    bulletin.enseignant || '',
                    JSON.stringify(bulletin.data || {}),
                    bulletin.appreciation || '',
                    bulletin.rang_position || '',
                    bulletin.decision || ''
                ]
            );
            res.json({ id: result.id, message: 'Bulletin sauvegardé' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    //Sauvegarder bulletin primaire anglophone 
    // 15. SAUVEGARDER BULLETIN ANGLOPHONE - AJOUTEZ CETTE ROUTE
serverApp.post('/api/bulletin/anglophone', async (req, res) => {
    try {
        const bulletin = req.body;
        console.log('📝 Sauvegarde bulletin anglophone:', {
            student_id: bulletin.student_id,
            trimester: bulletin.trimester,
            is_draft: bulletin.is_draft
        });
        
        const result = await database.run(
            `INSERT INTO bulletins (
                student_id, bulletin_type, trimester, academic_year,
                nom_eleve, classe, enseignant,
                data_json, appreciation, rang_position, decision,
                is_draft, created_at, updated_at
            ) VALUES (?, 'anglophone', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
            [
                bulletin.student_id,
                bulletin.trimester || 'Term 1',
                bulletin.academic_year || getCurrentAcademicYear(),
                bulletin.nom_eleve || '',
                bulletin.classe || '',
                bulletin.enseignant || '',
                bulletin.data_json || '{}',
                bulletin.appreciation || '',
                bulletin.rang_position || '',
                bulletin.decision || '',
                bulletin.is_draft || 1
            ]
        );
        
        console.log(`✅ Bulletin sauvegardé avec ID: ${result.id}`);
        res.json({ id: result.id, message: 'Bulletin anglophone sauvegardé' });
    } catch (error) {
        console.error('❌ Erreur sauvegarde bulletin anglophone:', error);
        res.status(500).json({ error: error.message });
    }
});

// 16. MISE À JOUR BULLETIN - AJOUTEZ CETTE ROUTE AUSSI
serverApp.put('/api/bulletin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bulletin = req.body;
        
        const result = await database.run(
            `UPDATE bulletins SET
                student_id = ?,
                trimester = ?,
                academic_year = ?,
                nom_eleve = ?,
                classe = ?,
                enseignant = ?,
                data_json = ?,
                appreciation = ?,
                rang_position = ?,
                decision = ?,
                is_draft = ?,
                updated_at = datetime('now')
            WHERE id = ?`,
            [
                bulletin.student_id,
                bulletin.trimester || 'Term 1',
                bulletin.academic_year || getCurrentAcademicYear(),
                bulletin.nom_eleve || '',
                bulletin.classe || '',
                bulletin.enseignant || '',
                bulletin.data_json || '{}',
                bulletin.appreciation || '',
                bulletin.rang_position || '',
                bulletin.decision || '',
                bulletin.is_draft || 1,
                id
            ]
        );
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Bulletin non trouvé' });
        }
        
        res.json({ id, message: 'Bulletin mis à jour' });
    } catch (error) {
        console.error('❌ Erreur mise à jour bulletin:', error);
        res.status(500).json({ error: error.message });
    }
});

    // 14. Test route
    serverApp.get('/api/test', (req, res) => {
        res.json({
            message: 'API fonctionne!',
            current_academic_year: getCurrentAcademicYear(),
            routes: {
                health: 'GET /api/health',
                add_student: 'POST /api/student',
                upload_photo: 'POST /api/upload/student-photo',
                change_photo: 'POST /api/student/:id/photo',
                get_student: 'GET /api/student/:id',
                get_class_students: 'GET /api/class/:id/students',
                current_year: 'GET /api/academic-year/current'
            }
        });
    });

    console.log('✅ API routes configurées');
}

// ============ INITIALISATION DATABASE ============
async function initDatabase() {
    try {
        console.log('🔄 Initialisation SQLite...');
        await initializeDatabase();
        
        // DÉSACTIVER L'IMPORT AUTOMATIQUE DES PHOTOS
        console.log('⚠️  IMPORT AUTOMATIQUE DÉSACTIVÉ');
        
    } catch (error) {
        console.error('❌ Erreur initialisation DB:', error);
    }
}

// ============ CRÉATION FENÊTRE ============
function createSafeWindow() {
    try {
        mainWindow = new BrowserWindow({
            width: 1400,
            height: 900,
            minWidth: 1000,
            minHeight: 700,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                webSecurity: true
            }
        });

        mainWindow.webContents.on('crashed', () => {
            console.log('💥 Renderer crashé');
            handleRendererCrash();
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });

        mainWindow.webContents.on('did-finish-load', () => {
            console.log('✅ Application chargée');
            mainWindow.show();
            mainWindow.focus();
        });

        mainWindow.webContents.on('did-fail-load', () => {
            setTimeout(() => {
                if (mainWindow && !mainWindow.isDestroyed()) {
                    mainWindow.reload();
                }
            }, 2000);
        });

        // Charger depuis Vite dev server (port 5173)
        const viteDevServer = 'http://localhost:5173';
        mainWindow.loadURL(viteDevServer);
        
    } catch (error) {
        console.error('❌ Erreur création fenêtre:', error);
        emergencyRecovery();
    }
}

// ============ GESTION CRASH ============
function handleRendererCrash() {
    crashCount++;
    
    if (crashCount >= MAX_CRASH_RETRIES) {
        crashCount = 0;
        emergencyRecovery();
    } else {
        setTimeout(() => {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.reload();
            } else {
                createSafeWindow();
            }
        }, 2000);
    }
}

function emergencyRecovery() {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.destroy();
    }
    
    setTimeout(() => {
        createSafeWindow();
    }, 3000);
}

// ============ DÉMARRAGE APPLICATION ============
async function safeAppStart() {
    console.log('🚀 DÉMARRAGE GESTION BULLETIN');
  
    try {
        await initDatabase();
        
        const serverApp = express();
        const port = 3000;

        serverApp.use(cors());
        serverApp.use(express.json({ limit: '10mb' }));
        serverApp.use(express.urlencoded({ extended: true }));
        
        // ============ SERVIR FICHIERS STATIQUES ============
        // 1. Servir depuis public/ (pour les photos uploadées)
        serverApp.use(express.static(FRONTEND_PUBLIC_PATH));
        console.log(`📁 Servir fichiers depuis public/: ${FRONTEND_PUBLIC_PATH}`);
        
        // 2. Servir depuis dist/ (pour l'application React)
        const frontendPath = getFrontendPath();
        if (frontendPath) {
            serverApp.use(express.static(frontendPath));
            console.log(`📁 Servir application depuis: ${frontendPath}`);
        }
        // ====================================================

        setupAPI(serverApp);

        if (frontendPath) {
            serverApp.get('*', (req, res) => {
                res.sendFile(path.join(frontendPath, 'index.html'));
            });
        }

        serverApp.listen(port, () => {
            console.log(`✅ Express: http://localhost:${port}`);
        });

        setTimeout(() => {
            createSafeWindow();
        }, 1000);

    } catch (error) {
        console.error('❌ Erreur démarrage:', error);
        setTimeout(safeAppStart, 5000);
    }
}

// ============ ÉVÉNEMENTS ELECTRON ============
app.whenReady().then(() => {
    safeAppStart();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createSafeWindow();
    }
});

console.log('🛡️ Gestion Bulletin SQLite - Version Finale');




















