

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chemin de la base de données
const dbPath = path.join(process.env.HOME || process.env.USERPROFILE, '.config', 'grace-bulletin', 'database.db');
console.log('📁 Chemin base de données:', dbPath);

// Assurer le dossier existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('📁 Dossier créé:', dbDir);
}

// Connexion à la base de données
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erreur connexion SQLite:', err.message);
    } else {
        console.log('✅ Connecté à la base SQLite');
        initializeDatabase();
    }
});

// Initialisation de la base
function initializeDatabase() {
    // Table bulletins (selon votre schéma)
    db.run(`
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
            is_finalized BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (student_id) REFERENCES students(id),
            UNIQUE(student_id, bulletin_type, trimester, academic_year)
        )
    `, (err) => {
        if (err) {
            console.error('❌ Erreur création table bulletins:', err.message);
        } else {
            console.log('✅ Table bulletins prête');
        }
    });
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

// Fonction pour obtenir l'année scolaire courante
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

// ============================================
// ROUTES API
// ============================================

// 1. Route de santé
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'API Grace Bulletin en marche',
        timestamp: new Date().toISOString(),
        port: PORT,
        database: dbPath,
        academic_year: getCurrentAcademicYear()
    });
});

// 2. Route pour l'année scolaire courante
app.get('/api/academic-year/current', (req, res) => {
    res.json({ 
        academic_year: getCurrentAcademicYear(),
        server_time: new Date().toISOString()
    });
});

// 3. Récupérer toutes les classes avec filtres
app.get('/api/classes', (req, res) => {
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

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 4. Récupérer une classe spécifique
app.get('/api/classes/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM classes WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row || {});
    });
});

// 5. Récupérer les élèves d'une classe
app.get('/api/students', (req, res) => {
    const { classId } = req.query;
    let query = 'SELECT * FROM students';
    const params = [];

    if (classId) {
        query += ' WHERE class_id = ?';
        params.push(classId);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Pour chaque élève, vérifier s'il a un bulletin
        const studentsWithBulletinInfo = rows.map(student => {
            return new Promise((resolve) => {
                db.get(
                    'SELECT COUNT(*) as count FROM bulletins WHERE student_id = ?',
                    [student.id],
                    (err, result) => {
                        student.hasBulletin = result.count > 0;
                        resolve(student);
                    }
                );
            });
        });

        Promise.all(studentsWithBulletinInfo).then(students => {
            res.json(students);
        });
    });
});

// 6. Récupérer un élève spécifique
app.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT s.*, c.name as className, c.section, c.cycle
        FROM students s
        LEFT JOIN classes c ON s.class_id = c.id
        WHERE s.id = ?
    `;
    
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (row) {
            // Ajouter un nom d'affichage pour la section
            row.sectionDisplay = row.section === 'francophone' ? 'Section Francophone' : 'Anglophone Section';
            res.json(row);
        } else {
            res.status(404).json({ error: 'Élève non trouvé' });
        }
    });
});

// 7. Récupérer le bulletin d'un élève
app.get('/api/bulletins/:studentId', (req, res) => {
    const { studentId } = req.params;
    
    db.get(
        'SELECT * FROM bulletins WHERE student_id = ? ORDER BY created_at DESC LIMIT 1',
        [studentId],
        (err, bulletin) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            if (bulletin) {
                // Parser les données JSON stockées
                try {
                    bulletin.subjects = JSON.parse(bulletin.subjects || '[]');
                    bulletin.comments = bulletin.comments || '';
                } catch (e) {
                    bulletin.subjects = [];
                }
                res.json(bulletin);
            } else {
                res.json(null);
            }
        }
    );
});





// 8. Ajouter un élève (ROUTE CORRIGÉE - VERSION COMPLÈTE)
// 8. Ajouter un élève (ROUTE SIMPLIFIÉE ET CORRECTE)
app.post('/api/student', (req, res) => {
    console.log('📥 Requête ajout élève reçue:', req.body);
    
    const { 
        first_name, 
        last_name, 
        matricule, 
        class_id,
        sex = '',
        academic_year = getCurrentAcademicYear()
    } = req.body;

    // Validation
    if (!first_name || !last_name || !class_id) {
        return res.status(400).json({ 
            error: 'Données manquantes',
            required: ['first_name', 'last_name', 'class_id']
        });
    }

    try {
        // Générer un matricule si non fourni
        const finalMatricule = matricule || `MAT-${Date.now().toString().slice(-6)}`;
        
        // Générer le nom complet
        const full_name = `${first_name} ${last_name}`.trim();
        
        // Récupérer le nom de la classe
        db.get('SELECT name FROM classes WHERE id = ?', [class_id], (err, classRow) => {
            if (err) {
                console.error('❌ Erreur récupération classe:', err);
                return res.status(500).json({ error: err.message });
            }
            
            const class_name = classRow ? classRow.name : '';
            
            // REQUÊTE SQL SIMPLIFIÉE ET CORRECTE
            db.run(
                `INSERT INTO students 
                 (first_name, last_name, full_name, matricule, class_id, class_name, 
                  sex, academic_year, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
                [
                    first_name.trim(),
                    last_name.trim(),
                    full_name,
                    finalMatricule,
                    class_id,
                    class_name,
                    sex,
                    academic_year
                ],
                function(err) {
                    if (err) {
                        console.error('❌ Erreur ajout élève:', err.message);
                        res.status(500).json({ error: err.message });
                    } else {
                        console.log('✅ Nouvel élève ajouté:', this.lastID);
                        res.json({ 
                            success: true, 
                            message: 'Élève ajouté avec succès',
                            studentId: this.lastID,
                            matricule: finalMatricule
                        });
                    }
                }
            );
        });
    } catch (error) {
        console.error('❌ Erreur générale:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
// 9. Supprimer un élève
app.delete('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    
    db.run(
        'DELETE FROM students WHERE id = ?',
        [studentId],
        function(err) {
            if (err) {
                console.error('❌ Erreur suppression élève:', err.message);
                res.status(500).json({ error: err.message });
            } else {
                if (this.changes === 0) {
                    res.status(404).json({ error: 'Élève non trouvé' });
                } else {
                    console.log('✅ Élève supprimé:', studentId);
                    res.json({ 
                        success: true, 
                        message: 'Élève supprimé avec succès'
                    });
                }
            }
        }
    );
});

// 10. Récupérer élèves d'une classe
app.get('/api/class/:classId/students', (req, res) => {
    const { classId } = req.params;
    
    db.all(
        `SELECT s.*, c.display_name as class_display_name, c.section, c.cycle
         FROM students s
         LEFT JOIN classes c ON s.class_id = c.id
         WHERE s.class_id = ? AND s.status = 'active'
         ORDER BY s.full_name`,
        [classId],
        (err, rows) => {
            if (err) {
                console.error('❌ Erreur récupération élèves:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    );
});

// 11. SAUVEGARDE BULLETIN
app.post('/api/bulletins/save', (req, res) => {
    console.log('📥 Requête sauvegarde reçue:', {
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
        nom_eleve,
        matricule = '',
        sex = '',
        classe,
        enseignant = '',
        photo_data = '',
        data_json,
        moyenne_generale = '',
        appreciation = '',
        rang_position = '',
        decision = '',
        totals_json = '{}',
        is_finalized = false
    } = req.body;

    // Validation
    if (!student_id || !bulletin_type || !trimester || !academic_year) {
        return res.status(400).json({ 
            error: 'Données manquantes',
            required: ['student_id', 'bulletin_type', 'trimester', 'academic_year']
        });
    }

    try {
        // Préparer les données JSON
        const dataJsonString = typeof data_json === 'object' ? JSON.stringify(data_json) : data_json;
        const totalsJsonString = typeof totals_json === 'object' ? JSON.stringify(totals_json) : totals_json;

        // Vérifier si bulletin existe déjà
        db.get(
            `SELECT id FROM bulletins 
             WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?`,
            [student_id, bulletin_type, trimester, academic_year],
            (err, existing) => {
                if (err) {
                    console.error('❌ Erreur recherche bulletin:', err);
                    return res.status(500).json({ error: err.message });
                }

                if (existing) {
                    // MISE À JOUR
                    db.run(
                        `UPDATE bulletins SET 
                            data_json = ?,
                            moyenne_generale = ?,
                            appreciation = ?,
                            rang_position = ?,
                            decision = ?,
                            totals_json = ?,
                            photo_data = ?,
                            is_finalized = ?,
                            updated_at = CURRENT_TIMESTAMP
                         WHERE id = ?`,
                        [
                            dataJsonString,
                            moyenne_generale,
                            appreciation,
                            rang_position,
                            decision,
                            totalsJsonString,
                            photo_data,
                            is_finalized ? 1 : 0,
                            existing.id
                        ],
                        function(err) {
                            if (err) {
                                console.error('❌ Erreur mise à jour:', err);
                                res.status(500).json({ error: err.message });
                            } else {
                                console.log('✅ Bulletin mis à jour:', existing.id);
                                res.json({ 
                                    success: true, 
                                    message: 'Bulletin mis à jour',
                                    id: existing.id,
                                    action: 'update'
                                });
                            }
                        }
                    );
                } else {
                    // CRÉATION
                    db.run(
                        `INSERT INTO bulletins (
                            student_id, bulletin_type, trimester, sequence_type, academic_year,
                            nom_eleve, matricule, sex, classe, enseignant, photo_data, data_json,
                            moyenne_generale, appreciation, rang_position, decision, totals_json,
                            is_finalized
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            student_id, bulletin_type, trimester, sequence_type, academic_year,
                            nom_eleve, matricule, sex, classe, enseignant, photo_data, dataJsonString,
                            moyenne_generale, appreciation, rang_position, decision, totalsJsonString,
                            is_finalized ? 1 : 0
                        ],
                        function(err) {
                            if (err) {
                                console.error('❌ Erreur création:', err);
                                res.status(500).json({ error: err.message });
                            } else {
                                console.log('✅ Nouveau bulletin créé:', this.lastID);
                                res.json({ 
                                    success: true, 
                                    message: 'Bulletin créé',
                                    id: this.lastID,
                                    action: 'create'
                                });
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        console.error('❌ Erreur générale:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 12. Récupérer bulletins d'un élève
app.get('/api/student/:studentId/bulletins', (req, res) => {
    const { studentId } = req.params;
    
    db.all(
        `SELECT * FROM bulletins WHERE student_id = ? ORDER BY trimester, bulletin_type`,
        [studentId],
        (err, rows) => {
            if (err) {
                console.error('❌ Erreur récupération bulletins:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Parser JSON
            const bulletins = rows.map(row => {
                try {
                    row.data_json = JSON.parse(row.data_json);
                } catch (e) {
                    row.data_json = {};
                }
                return row;
            });
            
            res.json(bulletins);
        }
    );
});

// 13. Vérifier si bulletin existe
app.get('/api/bulletins/check', (req, res) => {
    const { studentId, bulletinType, trimester, academicYear = getCurrentAcademicYear() } = req.query;
    
    db.get(
        `SELECT * FROM bulletins 
         WHERE student_id = ? AND bulletin_type = ? AND trimester = ? AND academic_year = ?`,
        [studentId, bulletinType, trimester, academicYear],
        (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            if (row) {
                try {
                    row.data_json = JSON.parse(row.data_json);
                } catch (e) {
                    row.data_json = {};
                }
            }
            
            res.json(row || null);
        }
    );
});

// 14. Route pour les bulletins organisés par trimestre
app.get('/api/student/:studentId/bulletins-overview', (req, res) => {
    const { studentId } = req.params;
    
    db.all(
        'SELECT * FROM bulletins WHERE student_id = ? ORDER BY trimester, bulletin_type',
        [studentId],
        (err, rows) => {
            if (err) {
                console.error('❌ Erreur récupération bulletins:', err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Organiser par trimestre
            const organized = {
                by_trimester: {
                    1: [],
                    2: [],
                    3: [],
                    annual: []
                },
                totals: rows.length
            };
            
            rows.forEach(bulletin => {
                try {
                    if (bulletin.data_json && typeof bulletin.data_json === 'string') {
                        bulletin.data_json = JSON.parse(bulletin.data_json);
                    }
                } catch (e) {
                    // Ignorer l'erreur de parsing
                }
                
                if (bulletin.bulletin_type && bulletin.bulletin_type.includes('annual')) {
                    organized.by_trimester.annual.push(bulletin);
                } else if (bulletin.trimester === 1) {
                    organized.by_trimester[1].push(bulletin);
                } else if (bulletin.trimester === 2) {
                    organized.by_trimester[2].push(bulletin);
                } else if (bulletin.trimester === 3) {
                    organized.by_trimester[3].push(bulletin);
                }
            });
            
            res.json(organized);
        }
    );
});

// 15. Promouvoir un élève
app.post('/api/student/:id/promote', (req, res) => {
    const studentId = req.params.id;
    
    db.run(
        `UPDATE students 
         SET academic_year = ?
         WHERE id = ?`,
        [getCurrentAcademicYear(), studentId],
        function(err) {
            if (err) {
                console.error('❌ Erreur promotion élève:', err.message);
                res.status(500).json({ error: err.message });
            } else {
                console.log('✅ Élève promu:', studentId);
                res.json({ 
                    success: true, 
                    message: 'Élève promu avec succès'
                });
            }
        }
    );
});

// 16. Route générique pour tester
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API fonctionne!',
        current_academic_year: getCurrentAcademicYear(),
        routes: {
            health: 'GET /api/health',
            add_student: 'POST /api/student',
            save_bulletin: 'POST /api/bulletins/save',
            get_student: 'GET /api/students/:id',
            get_bulletins: 'GET /api/student/:studentId/bulletins',
            current_year: 'GET /api/academic-year/current'
        }
    });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`📅 Année scolaire courante: ${getCurrentAcademicYear()}`);
    console.log(`📊 Routes disponibles:`);
    console.log(`   GET  /api/health - Vérification santé`);
    console.log(`   POST /api/student - Ajouter élève (corrigée)`);
    console.log(`   POST /api/bulletins/save - Sauvegarde bulletin`);
    console.log(`   GET  /api/academic-year/current - Année scolaire`);
    console.log(`   GET  /api/test - Toutes les routes`);
});

// Gestion des erreurs
process.on('uncaughtException', (err) => {
    console.error('⚠️ Exception non gérée:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Rejet non géré:', reason);
});