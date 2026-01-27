const express = require('express');
const cors = require('cors');
const database = require('./database/db');

class BulletinAPI {
    constructor() {
        this.app = express();
        this.port = 3001;
        
        this.initializeMiddleware();
        this.initializeDatabase();
        this.initializeRoutes();
    }

    initializeMiddleware() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '10mb' })); // Pour photos base64
        this.app.use(express.urlencoded({ extended: true }));
    }

    async initializeDatabase() {
        try {
            await database.connect();
            console.log('Base de données connectée pour API');
        } catch (error) {
            console.error('Erreur connexion DB API:', error);
        }
    }

    initializeRoutes() {
        // ========== ROUTES ÉLÈVES ==========
        this.app.get('/api/students', this.getStudents.bind(this));
        this.app.get('/api/student/:id', this.getStudent.bind(this));
        this.app.post('/api/student', this.createStudent.bind(this));
        this.app.put('/api/student/:id', this.updateStudent.bind(this));
        this.app.delete('/api/student/:id', this.deleteStudent.bind(this));
        
        // ========== ROUTES CLASSES ==========
        this.app.get('/api/classes/:section/:cycle', this.getClasses.bind(this));
        this.app.get('/api/class/:id/students', this.getClassStudents.bind(this));
        
        // ========== ROUTES BULLETINS ==========
        this.app.get('/api/student/:id/bulletins', this.getStudentBulletins.bind(this));
        this.app.get('/api/bulletin/:id', this.getBulletin.bind(this));
        
        // Bulletin Maternelle
        this.app.post('/api/bulletin/maternelle', this.saveBulletinMaternelle.bind(this));
        
        // Bulletin Primaire
        this.app.post('/api/bulletin/primaire', this.saveBulletinPrimaire.bind(this));
        
        // Bulletin Nursery
        this.app.post('/api/bulletin/nursery', this.saveBulletinNursery.bind(this));
        
        // Bulletin Annuel
        this.app.post('/api/bulletin/annual', this.saveBulletinAnnual.bind(this));
        
        // ========== ROUTES SÉQUENCES ==========
        this.app.post('/api/bulletin/:id/sequence', this.addSequence.bind(this));
        this.app.get('/api/bulletin/:id/sequences', this.getSequences.bind(this));
        
        // ========== ROUTES PROMOTION ==========
        this.app.post('/api/class/:id/promote', this.promoteClass.bind(this));
        this.app.post('/api/student/:id/promote', this.promoteStudent.bind(this));
        
        // ========== STATISTIQUES ==========
        this.app.get('/api/stats/overview', this.getOverviewStats.bind(this));
        
        // ========== HEALTH CHECK ==========
        this.app.get('/api/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });
        
        // Gestion des erreurs
        this.app.use(this.errorHandler.bind(this));
    }

    // ========== HANDLERS ÉLÈVES ==========
    async getStudents(req, res) {
        try {
            const { class: className, section, cycle, academic_year = '2024-2025' } = req.query;
            
            let sql = `
                SELECT s.*, c.name as class_display_name, c.section, c.cycle
                FROM students s
                JOIN classes c ON s.class_id = c.id
                WHERE s.academic_year = ?
            `;
            const params = [academic_year];
            
            if (className) {
                sql += ' AND c.name = ?';
                params.push(className);
            }
            if (section) {
                sql += ' AND c.section = ?';
                params.push(section);
            }
            if (cycle) {
                sql += ' AND c.cycle = ?';
                params.push(cycle);
            }
            
            sql += ' ORDER BY s.full_name';
            
            const students = await database.all(sql, params);
            res.json(students);
            
        } catch (error) {
            console.error('Erreur getStudents:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getStudent(req, res) {
        try {
            const { id } = req.params;
            
            const student = await database.get(`
                SELECT s.*, c.name as class_display_name, c.section, c.cycle
                FROM students s
                JOIN classes c ON s.class_id = c.id
                WHERE s.id = ?
            `, [id]);
            
            if (!student) {
                return res.status(404).json({ error: 'Élève non trouvé' });
            }
            
            res.json(student);
            
        } catch (error) {
            console.error('Erreur getStudent:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async createStudent(req, res) {
        try {
            const {
                first_name, last_name, full_name,
                class_id, class_name, sex,
                date_of_birth, parent_name, parent_phone,
                address, photo_filename, academic_year = '2024-2025'
            } = req.body;
            
            // Générer matricule
            const matricule = `GB-${Date.now().toString().slice(-8)}`;
            
            const result = await database.run(
                `INSERT INTO students (
                    first_name, last_name, full_name,
                    class_id, class_name, matricule, sex,
                    date_of_birth, parent_name, parent_phone,
                    address, photo_filename, academic_year,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
                [
                    first_name, last_name, full_name,
                    class_id, class_name, matricule, sex,
                    date_of_birth, parent_name, parent_phone,
                    address, photo_filename, academic_year
                ]
            );
            
            res.json({
                id: result.id,
                message: 'Élève créé avec succès',
                matricule
            });
            
        } catch (error) {
            console.error('Erreur createStudent:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStudent(req, res) {
        try {
            const { id } = req.params;
            
            // Vérifier si l'élève existe
            const student = await database.get('SELECT id FROM students WHERE id = ?', [id]);
            if (!student) {
                return res.status(404).json({ error: 'Élève non trouvé' });
            }
            
            // Supprimer les bulletins associés
            await database.run('DELETE FROM bulletins WHERE student_id = ?', [id]);
            
            // Supprimer l'élève
            await database.run('DELETE FROM students WHERE id = ?', [id]);
            
            res.json({ message: 'Élève supprimé avec succès' });
            
        } catch (error) {
            console.error('Erreur deleteStudent:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // ========== HANDLERS CLASSES ==========
    async getClasses(req, res) {
        try {
            const { section, cycle } = req.params;
            
            const classes = await database.all(`
                SELECT * FROM classes 
                WHERE section = ? AND cycle = ?
                ORDER BY level
            `, [section, cycle]);
            
            res.json(classes);
            
        } catch (error) {
            console.error('Erreur getClasses:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getClassStudents(req, res) {
        try {
            const { id } = req.params;
            const { academic_year = '2024-2025' } = req.query;
            
            const students = await database.all(`
                SELECT s.*, c.name as class_display_name
                FROM students s
                JOIN classes c ON s.class_id = c.id
                WHERE s.class_id = ? AND s.academic_year = ?
                ORDER BY s.full_name
            `, [id, academic_year]);
            
            res.json(students);
            
        } catch (error) {
            console.error('Erreur getClassStudents:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // ========== HANDLERS BULLETINS ==========
    async getStudentBulletins(req, res) {
        try {
            const { id } = req.params;
            const { academic_year = '2024-2025' } = req.query;
            
            const bulletins = await database.all(`
                SELECT 
                    id, bulletin_type, trimester, academic_year,
                    moyenne_generale, appreciation, rang_position, decision,
                    created_at, updated_at, is_finalized
                FROM bulletins 
                WHERE student_id = ? AND academic_year = ?
                ORDER BY trimester
            `, [id, academic_year]);
            
            res.json(bulletins);
            
        } catch (error) {
            console.error('Erreur getStudentBulletins:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async saveBulletinMaternelle(req, res) {
        try {
            const {
                student_id,
                trimester,
                academic_year,
                meta,
                entetesPeriodes,
                donnees,
                resume,
                photoEleve,
                is_finalized = false
            } = req.body;
            
            // Vérifier si l'élève existe
            const student = await database.get('SELECT id FROM students WHERE id = ?', [student_id]);
            if (!student) {
                return res.status(404).json({ error: 'Élève non trouvé' });
            }
            
            // Préparer les données JSON
            const dataJson = JSON.stringify({
                meta,
                entetesPeriodes,
                donnees,
                resume,
                photoEleve
            });
            
            const result = await database.run(
                `INSERT OR REPLACE INTO bulletins (
                    student_id, bulletin_type, trimester, academic_year,
                    nom_eleve, matricule, sex, classe, enseignant,
                    data_json, appreciation, rang_position, decision,
                    photo_data, is_finalized, created_at, updated_at
                ) VALUES (?, 'maternelle', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                          COALESCE((SELECT created_at FROM bulletins 
                                   WHERE student_id = ? AND bulletin_type = 'maternelle' 
                                   AND trimester = ? AND academic_year = ?), datetime('now')),
                          datetime('now'))`,
                [
                    student_id, trimester, academic_year,
                    meta.nomEleve, meta.matricule, meta.sexe, meta.classe, meta.enseignant,
                    dataJson, resume.appreciation, resume.rang, resume.decision,
                    photoEleve, is_finalized ? 1 : 0,
                    student_id, trimester, academic_year  // Pour le COALESCE
                ]
            );
            
            res.json({
                id: result.id,
                message: 'Bulletin maternelle sauvegardé',
                bulletin_id: result.id
            });
            
        } catch (error) {
            console.error('Erreur saveBulletinMaternelle:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async saveBulletinPrimaire(req, res) {
        try {
            const {
                student_id,
                trimester,
                academic_year,
                meta,
                entetesPeriodes,
                donnees,
                totaux,
                moyennes,
                infoPeriodes,
                moyenneGenerale,
                resume,
                photoEleve,
                is_finalized = false
            } = req.body;
            
            const dataJson = JSON.stringify({
                meta,
                entetesPeriodes,
                donnees,
                totaux,
                moyennes,
                infoPeriodes,
                moyenneGenerale,
                resume,
                photoEleve
            });
            
            const result = await database.run(
                `INSERT OR REPLACE INTO bulletins (
                    student_id, bulletin_type, trimester, academic_year,
                    nom_eleve, matricule, sex, classe, enseignant,
                    data_json, moyenne_generale, appreciation, rang_position, decision,
                    totals_json, photo_data, is_finalized, created_at, updated_at
                ) VALUES (?, 'primaire_fr', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                          COALESCE((SELECT created_at FROM bulletins 
                                   WHERE student_id = ? AND bulletin_type = 'primaire_fr' 
                                   AND trimester = ? AND academic_year = ?), datetime('now')),
                          datetime('now'))`,
                [
                    student_id, trimester, academic_year,
                    meta.nomEleve, meta.matricule, meta.sexe, meta.classe, meta.enseignant,
                    dataJson, moyenneGenerale, resume.appreciationGlobale, resume.position, resume.decision,
                    JSON.stringify(totaux), photoEleve, is_finalized ? 1 : 0,
                    student_id, trimester, academic_year
                ]
            );
            
            res.json({
                id: result.id,
                message: 'Bulletin primaire sauvegardé',
                bulletin_id: result.id
            });
            
        } catch (error) {
            console.error('Erreur saveBulletinPrimaire:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // ========== HANDLER SÉQUENCES ==========
    async addSequence(req, res) {
        try {
            const { id: bulletin_id } = req.params;
            const { sequence_number, sequence_label, data } = req.body;
            
            // Vérifier si le bulletin existe
            const bulletin = await database.get('SELECT id FROM bulletins WHERE id = ?', [bulletin_id]);
            if (!bulletin) {
                return res.status(404).json({ error: 'Bulletin non trouvé' });
            }
            
            const result = await database.run(
                `INSERT OR REPLACE INTO evaluation_sequences (
                    bulletin_id, sequence_number, sequence_label, data_json,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, 
                          COALESCE((SELECT created_at FROM evaluation_sequences 
                                   WHERE bulletin_id = ? AND sequence_number = ?), datetime('now')),
                          datetime('now'))`,
                [
                    bulletin_id, sequence_number, sequence_label, JSON.stringify(data),
                    bulletin_id, sequence_number
                ]
            );
            
            res.json({
                id: result.id,
                message: 'Séquence ajoutée',
                sequence_id: result.id
            });
            
        } catch (error) {
            console.error('Erreur addSequence:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // ========== HANDLER PROMOTION CLASSE ==========
    async promoteClass(req, res) {
        try {
            const { id: class_id } = req.params;
            const { to_academic_year, promote_all = true } = req.body;
            
            // Récupérer la classe
            const classInfo = await database.get('SELECT * FROM classes WHERE id = ?', [class_id]);
            if (!classInfo) {
                return res.status(404).json({ error: 'Classe non trouvée' });
            }
            
            // Trouver la classe supérieure
            const nextClass = await database.get(`
                SELECT * FROM classes 
                WHERE section = ? AND cycle = ? AND level = ?
            `, [classInfo.section, classInfo.cycle, classInfo.level + 1]);
            
            if (!nextClass) {
                return res.status(400).json({ error: 'Pas de classe supérieure disponible' });
            }
            
            // Récupérer les élèves de la classe
            const students = await database.all(`
                SELECT s.*, b.decision 
                FROM students s
                LEFT JOIN bulletins b ON s.id = b.student_id 
                    AND b.bulletin_type LIKE '%annual%' 
                    AND b.academic_year = ?
                    AND b.is_finalized = 1
                WHERE s.class_id = ? AND s.academic_year = ?
            `, [classInfo.academic_year, class_id, classInfo.academic_year]);
            
            let promoted = 0;
            let retained = 0;
            const results = [];
            
            // Promouvoir chaque élève selon sa décision
            for (const student of students) {
                if (student.decision === 'Admis' || student.decision === 'Passed') {
                    // Promotion
                    await database.run(
                        `INSERT INTO student_promotions 
                         (student_id, from_class_id, to_class_id, 
                          from_academic_year, to_academic_year, promotion_type)
                         VALUES (?, ?, ?, ?, ?, 'promotion')`,
                        [student.id, class_id, nextClass.id, classInfo.academic_year, to_academic_year]
                    );
                    
                    // Mettre à jour l'élève
                    await database.run(
                        `UPDATE students 
                         SET class_id = ?, class_name = ?, academic_year = ?, updated_at = datetime('now')
                         WHERE id = ?`,
                        [nextClass.id, nextClass.name, to_academic_year, student.id]
                    );
                    
                    promoted++;
                    results.push({ student: student.full_name, action: 'promoted', new_class: nextClass.name });
                    
                } else {
                    // Redoublement
                    await database.run(
                        `INSERT INTO student_promotions 
                         (student_id, from_class_id, to_class_id, 
                          from_academic_year, to_academic_year, promotion_type)
                         VALUES (?, ?, ?, ?, ?, 'retention')`,
                        [student.id, class_id, class_id, classInfo.academic_year, to_academic_year]
                    );
                    
                    // Mettre à jour l'année seulement
                    await database.run(
                        `UPDATE students 
                         SET academic_year = ?, updated_at = datetime('now')
                         WHERE id = ?`,
                        [to_academic_year, student.id]
                    );
                    
                    retained++;
                    results.push({ student: student.full_name, action: 'retained', new_class: classInfo.name });
                }
            }
            
            res.json({
                message: 'Promotion de classe terminée',
                summary: {
                    total: students.length,
                    promoted,
                    retained,
                    next_class: nextClass.name
                },
                details: results
            });
            
        } catch (error) {
            console.error('Erreur promoteClass:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // ========== GESTION ERREURS ==========
    errorHandler(err, req, res, next) {
        console.error('Erreur API:', err);
        res.status(500).json({
            error: 'Erreur interne du serveur',
            message: err.message,
            timestamp: new Date().toISOString()
        });
    }

    // Démarrer le serveur
    start() {
        this.app.listen(this.port, () => {
            console.log(`API backend démarrée sur http://localhost:${this.port}`);
        });
    }
}

// Démarrer si exécuté directement
if (require.main === module) {
    const api = new BulletinAPI();
    api.start();
}

module.exports = BulletinAPI;