const database = require('./db');
const fs = require('fs');
const path = require('path');

function initializeDatabase() {
    try {
        console.log('📦 Initialisation base de données...');
        
        // Créer les tables directement
        database.run(`
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

        database.run(`
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

        database.run(`
            CREATE TABLE IF NOT EXISTS bulletins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER,
                bulletin_type TEXT,
                trimester TEXT,
                academic_year TEXT,
                nom_eleve TEXT,
                classe TEXT,
                enseignant TEXT,
                data_json TEXT,
                appreciation TEXT,
                rang_position TEXT,
                decision TEXT,
                is_draft INTEGER DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES students(id)
            )
        `);

        // Vérifier si des classes existent
        const classes = database.all('SELECT COUNT(*) as count FROM classes');
        
        if (classes[0].count === 0) {
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

            for (const cls of defaultClasses) {
                database.run(
                    'INSERT INTO classes (name, display_name, section, cycle, level) VALUES (?, ?, ?, ?, ?)',
                    cls
                );
            }
            console.log('✅ Classes par défaut insérées');
        }

        console.log('✅ Base de données initialisée avec succès');
        return { success: true };
        
    } catch (error) {
        console.error('❌ Erreur initialisation base de données:', error);
        return { success: false, error: error.message };
    }
}

module.exports = initializeDatabase;