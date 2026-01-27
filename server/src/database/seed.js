
const database = require('./db');
const fs = require('fs');
const path = require('path');

class StudentImporter {
    constructor() {
        // Chemin relatif vers les photos depuis le serveur
        this.photosBasePath = path.join(__dirname, '../../../frontend/public/ecole details');
    }

    async scanAndImport() {
        try {
            console.log('⚠️ IMPORT AUTOMATIQUE DÉSACTIVÉ TEMPORAIREMENT');
            return { imported: 0, errors: [] };
            
            /*
            // CODE ORIGINAL (COMMENTÉ)
            console.log('🔍 Scan du dossier photos...');
            
            if (!fs.existsSync(this.photosBasePath)) {
                console.warn('⚠️  Dossier photos non trouvé:', this.photosBasePath);
                return { imported: 0, errors: ['Dossier photos introuvable'] };
            }

            let imported = 0;
            const errors = [];

            // Lire les dossiers (classes)
            const folders = fs.readdirSync(this.photosBasePath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            console.log(`📁 ${folders.length} classes trouvées`);

            for (const folderName of folders) {
                try {
                    const classPath = path.join(this.photosBasePath, folderName);
                    const photos = fs.readdirSync(classPath)
                        .filter(f => /\.(jpe?g)$/i.test(f));

                    if (photos.length === 0) continue;

                    // Vérifier la classe en base
                    const classRecord = await database.get(
                        'SELECT id FROM classes WHERE name = ?',
                        [folderName]
                    );

                    if (!classRecord) {
                        console.warn(`⚠️  Classe ${folderName} non trouvée en base, ignorée`);
                        continue;
                    }

                    // Importer chaque élève
                    for (const photoFile of photos) {
                        try {
                            const studentName = this.cleanName(photoFile);
                            
                            // Vérifier existence
                            const existing = await database.get(
                                `SELECT id FROM students 
                                 WHERE full_name = ? AND class_id = ?`,
                                [studentName, classRecord.id]
                            );

                            if (existing) {
                                continue; // Déjà existant
                            }

                            // Insérer avec le bon format
                            await database.run(
                                `INSERT INTO students (
                                    first_name, last_name, full_name,
                                    photo_filename, photo_path,
                                    class_id, class_name, matricule,
                                    academic_year, status, created_at
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '2024-2025', 'active', datetime('now'))`,
                                [
                                    this.extractFirstName(studentName),
                                    this.extractLastName(studentName),
                                    studentName,
                                    photoFile,
                                    `ecole details/${folderName}/${photoFile}`,
                                    classRecord.id,
                                    folderName,
                                    this.generateMatricule(studentName, folderName)
                                ]
                            );

                            imported++;
                            if (imported % 10 === 0) {
                                console.log(`   ${imported} élèves importés...`);
                            }

                        } catch (err) {
                            errors.push(`${photoFile}: ${err.message}`);
                        }
                    }

                } catch (err) {
                    errors.push(`Classe ${folderName}: ${err.message}`);
                }
            }

            console.log(`✅ ${imported} élèves importés au total`);
            if (errors.length > 0) {
                console.log(`⚠️  ${errors.length} erreurs`);
            }

            return { imported, errors };
            */

        } catch (error) {
            console.error('❌ Erreur import:', error);
            return { imported: 0, errors: [error.message] };
        }
    }

    cleanName(filename) {
        return filename
            .replace(/\.jpe?g$/i, '')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    extractLastName(fullName) {
        return fullName.split(' ')[0] || '';
    }

    extractFirstName(fullName) {
        const parts = fullName.split(' ');
        return parts.length > 1 ? parts.slice(1).join(' ') : '';
    }

    generateMatricule(name, className) {
        const time = Date.now().toString().slice(-6);
        const nameCode = name.replace(/\s+/g, '').slice(0, 3).toUpperCase();
        const classCode = className.replace(/\s+/g, '').slice(0, 3).toUpperCase();
        return `GB-${classCode}-${nameCode}-${time}`;
    }
}

async function seedDatabase() {
    const importer = new StudentImporter();
    return await importer.scanAndImport();
}

module.exports = seedDatabase;