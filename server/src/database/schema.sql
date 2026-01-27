-- ============================================
-- SCHEMA DE BASE DE DONNÉES - GESTION BULLETIN
-- ============================================

-- Table des classes (organisation hiérarchique)
CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,              -- "Petite Section", "CP", "Nursery 1"
    display_name TEXT NOT NULL,             -- Nom d'affichage
    section TEXT NOT NULL,                  -- 'francophone' ou 'anglophone'
    cycle TEXT NOT NULL,                    -- 'maternelle', 'primaire', 'nursery', 'primary'
    level INTEGER,                          -- Niveau hiérarchique (1, 2, 3...)
    academic_year TEXT DEFAULT '2025-2026',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des élèves (avec import automatique depuis photos)
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    -- full_name TEXT NOT NULL,
    photo_filename TEXT,                    -- Ex: "ASSONFACK GEMINA.jpeg"
    photo_path TEXT,                        -- Chemin complet
    class_id INTEGER NOT NULL,
    class_name TEXT NOT NULL,               -- Redondant pour faciliter les requêtes
    matricule TEXT UNIQUE,
    sex TEXT,                               -- 'Masculin', 'Féminin', 'Male', 'Female'
    -- date_of_birth DATE,
    -- place_of_birth TEXT,
    -- parent_name TEXT,
    -- parent_phone TEXT,
    address TEXT,
    academic_year TEXT DEFAULT '2025-2026',
    status TEXT DEFAULT 'active',           -- 'active', 'graduated', 'transferred'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (class_id) REFERENCES classes(id),
    UNIQUE( first_name,  last_name , academic_year, class_name)  -- Un élève unique par année/classe
);

-- Table des bulletins (TOUS types de bulletins)
CREATE TABLE IF NOT EXISTS bulletins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    bulletin_type TEXT NOT NULL,            -- 'maternelle', 'primaire_fr', 'primaire_en', 'nursery', 'annual'
    trimester INTEGER NOT NULL,             -- 1, 2, 3, 0 pour annual
    sequence_type TEXT,                     -- 'mois', 'trimestre' (pour logique séquences)
    academic_year TEXT NOT NULL,
    
    -- MÉTADONNÉES (communes à tous les bulletins)
    nom_eleve TEXT,
    matricule TEXT,
    sex TEXT,
    classe TEXT,
    enseignant TEXT,
    photo_data TEXT,                        -- Base64 de la photo (optionnel)
    
    -- DONNÉES SPÉCIFIQUES (JSON structuré selon le type)
    data_json TEXT NOT NULL,
    
    -- RÉSULTATS CALCULÉS
    moyenne_generale TEXT,
    appreciation TEXT,
    rang_position TEXT,
    decision TEXT,                          -- 'Admis', 'Echoue', 'Passed', 'Failed'
    totals_json TEXT,                       -- JSON des totaux
    
    -- SIGNATURES
    teacher_signature TEXT,
    headmaster_signature TEXT,
    parent_signature TEXT,
    
    -- MÉTADONNÉES TECHNIQUES
    is_finalized BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE(student_id, bulletin_type, trimester, academic_year)
);

-- Table des séquences d'évaluation (pour logique "ajouter séquence")
CREATE TABLE IF NOT EXISTS evaluation_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bulletin_id INTEGER NOT NULL,
    sequence_number INTEGER NOT NULL,       -- 1, 2, 3 (mois/séquence)
    sequence_label TEXT,                    -- "Mois-1", "Trimestre-1"
    
    -- Données selon le type de bulletin
    data_json TEXT NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (bulletin_id) REFERENCES bulletins(id),
    UNIQUE(bulletin_id, sequence_number)
);

-- Table des promotions/transferts (pour logique "mise à jour classe")
CREATE TABLE IF NOT EXISTS student_promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    from_class_id INTEGER NOT NULL,
    to_class_id INTEGER NOT NULL,
    from_academic_year TEXT NOT NULL,
    to_academic_year TEXT NOT NULL,
    promotion_type TEXT NOT NULL,           -- 'promotion', 'retention', 'transfer'
    decision_based_on TEXT,                 -- 'annual_bulletin', 'manual'
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (from_class_id) REFERENCES classes(id),
    FOREIGN KEY (to_class_id) REFERENCES classes(id)
);

-- Table des années scolaires
CREATE TABLE IF NOT EXISTS academic_years (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year_label TEXT NOT NULL UNIQUE,        -- "2024-2025"
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEX POUR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id, academic_year);
CREATE INDEX IF NOT EXISTS idx_students_name ON students(full_name);
CREATE INDEX IF NOT EXISTS idx_bulletins_student ON bulletins(student_id, academic_year);
CREATE INDEX IF NOT EXISTS idx_bulletins_type ON bulletins(bulletin_type, trimester);
CREATE INDEX IF NOT EXISTS idx_classes_section ON classes(section, cycle);

-- ============================================
-- DONNÉES DE BASE (INSERTIONS INITIALES)
-- ============================================

-- Insérer les années scolaires
INSERT OR IGNORE INTO academic_years (year_label, is_current) VALUES 
('2024-2025', 1),
('2025-2026', 0),
('2026-2027', 0);

-- Insérer les classes francophones (selon votre structure)
INSERT OR IGNORE INTO classes (name, display_name, section, cycle, level) VALUES
-- MATERNELLE
('PETITE SECTION', 'Petite Section', 'francophone', 'maternelle', 1),
('MOYENNE SECTION', 'Moyenne Section', 'francophone', 'maternelle', 2),
('GRANDE SECTION', 'Grande Section', 'francophone', 'maternelle', 3),

-- PRIMAIRE FRANCOPHONE
('SIL', 'SIL', 'francophone', 'primaire', 1),
('CP', 'CP', 'francophone', 'primaire', 2),
('CEI', 'CEI', 'francophone', 'primaire', 3),
('CEII', 'CEII', 'francophone', 'primaire', 4),
('CM1', 'CM1', 'francophone', 'primaire', 5),
('CM2', 'CM2', 'francophone', 'primaire', 6),

-- PRIMAIRE ANGLOPHONE
('CLASS1', 'Class 1', 'anglophone', 'primary', 1),
('CLASS2', 'Class 2', 'anglophone', 'primary', 2),
('CLASS4', 'Class 4', 'anglophone', 'primary', 3),

-- NURSERY
('NURSERY1 AND PRE-NURSERY', 'Pre-Nursery & Nursery 1', 'anglophone', 'nursery', 1),
('NURSERY2', 'Nursery 2', 'anglophone', 'nursery', 2);

















