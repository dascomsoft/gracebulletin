import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// IMPORT POUR ELECTRON
const { ipcRenderer } = (() => {
    try {
        if (window.require) {
            return window.require('electron');
        }
    } catch (e) {}
    return { ipcRenderer: null };
})();

const PERIODE_OPTIONS = [
    "Mois-1", "Mois-2", "Mois-3", "Mois-4", "Mois-5", "Mois-6", "Mois-7",
    "Trimestre-1", "Trimestre-2", "Trimestre-3"
];

const TRIMESTRE_OPTIONS = ["Trimestre-1", "Trimestre-2", "Trimestre-3"];
const APPRECIATIONS = ["Acquis", "Non Acquis", "Expert"];
const DECISIONS = ["Admis", "Echoue"];
const CLASS_OPTIONS = ["Petite Section", "Moyenne Section", "Grande Section"];

const DOMAINES_TEMPLATE = [
    {
        key: "langues",
        title: "Domaine 1 : LANGUES ET COMMUNICATIONS",
        activities: "-Graphisme , -English , -Langues nationales , -Expression gestuelle"
    },
    {
        key: "sciences",
        title: "Domaine 2 : EVEIL SCIENTIFIQUE ET TECHNOLOGIQUE",
        activities: "- Initiation aux Mathématiques , - Education Sensorielle et perceptive , -Technologie de l'information et de la communication , - Sciences et technologies"
    },
    {
        key: "vie",
        title: "Domaine 3 : VIE COURANTE",
        activities: "-Education à la santé(Nutrition et à environnement)"
    },
    {
        key: "art",
        title: "Domaine 4 : CREATION ARTISTIQUE",
        activities: "-Activités manuelles , -Creation artistique"
    },
    {
        key: "motricite",
        title: "Domaine 5 : MOTRICITE GENERALE",
        activities: "-Motrice generale"
    },
];

const API_BASE_URL = 'http://localhost:3000';

export default function BulletinMaternelle() {
    const navigate = useNavigate();
    const location = useLocation();
    const { studentId: paramStudentId } = useParams();
    
    console.log("🔍 DEBUG BulletinMaternelle:", {
        paramStudentId,
        locationState: location.state,
        url: location.pathname,
        apiBaseUrl: API_BASE_URL
    });

    const [currentTrimester, setCurrentTrimester] = useState(() => {
        if (location.state?.trimestre) {
            console.log(`✅ Trimestre depuis state: ${location.state.trimestre}`);
            return location.state.trimestre;
        }
        
        const saved = localStorage.getItem('bulletinMaternelleData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.meta?.term) {
                    return data.meta.term;
                }
            } catch (e) {
                console.error('Erreur lecture localStorage:', e);
            }
        }
        
        return 'Trimestre 1';
    });

    const [studentId, setStudentId] = useState(() => {
        if (paramStudentId) {
            const id = parseInt(paramStudentId);
            console.log(`✅ ID depuis URL: ${id} (type: ${typeof id})`);
            return id;
        }
        
        if (location.state?.studentId) {
            const id = parseInt(location.state.studentId);
            console.log(`✅ ID depuis state: ${id} (type: ${typeof id})`);
            return id;
        }
        
        const saved = localStorage.getItem('bulletinMaternelleData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.meta?.student_id) {
                    const id = parseInt(data.meta.student_id);
                    console.log(`✅ ID depuis localStorage: ${id} (type: ${typeof id})`);
                    return id;
                }
            } catch (e) {
                console.error('Erreur lecture localStorage:', e);
            }
        }
        
        console.warn("⚠️ Aucun ID d'élève trouvé");
        return null;
    });

    const [studentInfo, setStudentInfo] = useState(null);
    const [saving, setSaving] = useState(false);
    const [bulletinId, setBulletinId] = useState(null);
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // États du formulaire maternelle
    const [entetesPeriodes, setEntetesPeriodes] = useState({
        h1: PERIODE_OPTIONS[0],
        h2: PERIODE_OPTIONS[1],
        h3: PERIODE_OPTIONS[2]
    });

    const [meta, setMeta] = useState({
        nomEleve: "",
        matricule: "",
        sexe: "",
        classe: "",
        trimestre: currentTrimester,
        anneeScolaire: "",
        enseignant: "",
        student_id: studentId || null
    });

    const [donnees, setDonnees] = useState(() => {
        const racine = {};
        DOMAINES_TEMPLATE.forEach(domaine => {
            racine[domaine.key] = {
                periode1: "",
                periode2: "",
                periode3: "",
                expression: ""
            };
        });
        return racine;
    });

    const [resume, setResume] = useState({
        appreciation: "",
        rang: "",
        decision: ""
    });

    const [photoEleve, setPhotoEleve] = useState(null);

    useEffect(() => {
        if (studentId) {
            console.log(`🔄 Chargement info élève ID: ${studentId}`);
            loadStudentInfo(studentId);
            loadStudentBulletins(studentId);
        } else {
            console.warn("❌ Pas d'ID élève pour charger les infos");
        }
    }, [studentId]);

    const loadStudentInfo = async (id) => {
        try {
            console.log(`📡 Requête API élève pour ID: ${id}`);
            const url = `${API_BASE_URL}/api/student/${id}`;
            console.log(`📡 URL: ${url}`);
            
            const response = await fetch(url);
            console.log(`📡 Réponse status: ${response.status}`);
            
            if (response.ok) {
                const student = await response.json();
                console.log('✅ Info élève chargée:', student);
                setStudentInfo(student);
                setMeta(prev => ({
                    ...prev,
                    nomEleve: student.nom_complet || student.full_name || "",
                    sexe: student.sex || student.sexe || "",
                    classe: student.class_name || "",
                    student_id: student.id
                }));
            } else {
                const errorText = await response.text();
                console.error(`❌ Erreur API élève: ${response.status}`, errorText.substring(0, 200));
            }
        } catch (error) {
            console.error('❌ Erreur chargement info élève:', error);
        }
    };

    const loadStudentBulletins = async (studentId) => {
        try {
            console.log(`📡 Requête bulletins: http://localhost:3000/api/student/${studentId}/bulletins`);
            const response = await fetch(`http://localhost:3000/api/student/${studentId}/bulletins`);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const bulletins = await response.json();
            console.log(`✅ ${bulletins.length} bulletins trouvés`);
            
            const currentTrimester = location.state?.trimestre || 'Trimestre 1';
            console.log('📌 Recherche bulletin pour le trimestre:', currentTrimester);
            
            if (bulletins.length > 0) {
                const currentBulletin = bulletins.find(b => 
                    b.trimester === currentTrimester && b.bulletin_type === 'maternelle'
                );
                
                if (currentBulletin) {
                    console.log('✅ Bulletin existant trouvé:', currentBulletin);
                    
                    let bulletinData = currentBulletin.data_json;
                    
                    if (typeof bulletinData === 'string') {
                        try {
                            bulletinData = JSON.parse(bulletinData);
                            console.log('📦 data_json parsé (était une chaîne)');
                        } catch (e) {
                            console.warn('⚠️ Erreur parsing JSON:', e);
                            bulletinData = {};
                        }
                    } else {
                        console.log('📦 data_json déjà parsé (était un objet)');
                    }
                    
                    // Mettre à jour tous les états avec les données chargées
                    if (bulletinData.entetesPeriodes) {
                        setEntetesPeriodes(bulletinData.entetesPeriodes);
                    }
                    
                    if (bulletinData.meta) {
                        setMeta(prev => ({ ...prev, ...bulletinData.meta }));
                    }
                    
                    if (bulletinData.donnees) {
                        setDonnees(bulletinData.donnees);
                    }
                    
                    if (bulletinData.resume) {
                        setResume(bulletinData.resume);
                    }
                    
                    if (bulletinData.photoEleve) {
                        setPhotoEleve(bulletinData.photoEleve);
                    }
                    
                    setBulletinId(currentBulletin.id);
                    console.log('✅ Bulletin chargé avec succès, ID:', currentBulletin.id);
                } else {
                    console.log('ℹ️ Aucun bulletin pour ce trimestre');
                }
            } else {
                console.log('ℹ️ Aucun bulletin existant');
            }
        } catch (error) {
            console.error('❌ Erreur chargement bulletins:', error);
        }
    };

    const saveToDatabase = async (isDraft = true) => {
        try {
            setSaving(true);
            
            console.log(`🔍 Vérification studentId: ${studentId} (type: ${typeof studentId})`);
            
            if (!studentId) {
                console.error("❌ ERREUR CRITIQUE: studentId est null/undefined");
                alert("❌ ERREUR : Aucun élève sélectionné.\n\nVeuillez retourner à la liste des élèves et cliquer sur 'Créer bulletin'.");
                setSaving(false);
                return null;
            }

            const formData = {
                entetesPeriodes,
                meta: { ...meta, student_id: studentId, trimestre: currentTrimester },
                donnees,
                resume,
                photoEleve,
                isDraft
            };

            const payload = {
                student_id: studentId,
                bulletin_type: 'maternelle',
                trimester: currentTrimester,
                academic_year: meta.anneeScolaire || getCurrentAcademicYear(),
                nom_eleve: meta.nomEleve || studentInfo?.nom_complet || "",
                classe: meta.classe || studentInfo?.class_name || "",
                enseignant: meta.enseignant || "",
                appreciation: resume.appreciation || "",
                rang_position: resume.rang || "",
                decision: resume.decision || "",
                data_json: JSON.stringify(formData),
                is_draft: isDraft ? 1 : 0
            };

            console.log('📤 Payload envoyé à l\'API:', payload);
            console.log('📤 Type student_id:', typeof payload.student_id);
            console.log('📤 URL Base:', API_BASE_URL);
            
            let url, method;
            if (bulletinId) {
                url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
                method = 'PUT';
                console.log(`🔄 Mise à jour bulletin ID: ${bulletinId} - URL: ${url}`);
            } else {
                url = `${API_BASE_URL}/api/bulletin/maternelle`;
                method = 'POST';
                console.log('🆕 Création nouveau bulletin - URL:', url);
            }

            console.log(`📤 Envoi ${method} à: ${url}`);
            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            console.log(`📥 Réponse API (${response.status}):`, responseText.substring(0, 500));

            if (!response.ok) {
                throw new Error(`Erreur API ${response.status}: ${responseText.substring(0, 200)}`);
            }

            const result = JSON.parse(responseText);
            console.log('✅ Réponse API:', result);

            if (!bulletinId && result.id) {
                setBulletinId(result.id);
                setIsEditing(true);
            }

            if (isDraft) {
                setIsDraftSaved(true);
                alert('✅ Brouillon sauvegardé avec succès!');
            } else {
                alert('✅ Bulletin finalisé avec succès!');
                handlePrint();
            }

            return result;

        } catch (error) {
            console.error('❌ Erreur sauvegarde:', error);
            alert(`❌ Erreur lors de la sauvegarde: ${error.message}`);
            return null;
        } finally {
            setSaving(false);
        }
    };

    const getCurrentAcademicYear = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        if (month >= 8) {
            return `${year}-${year + 1}`;
        } else {
            return `${year - 1}-${year}`;
        }
    };

    // Fonctions de gestion des changements
    const changerEntete = (k, v) => setEntetesPeriodes(p => ({ ...p, [k]: v }));
    
    const changerMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

    const changerEvaluation = (cleDomaine, periode, valeur) => {
        setDonnees(prev => ({
            ...prev,
            [cleDomaine]: {
                ...prev[cleDomaine],
                [periode]: valeur
            }
        }));
    };

    const changerExpression = (cleDomaine, valeur) => {
        setDonnees(prev => ({
            ...prev,
            [cleDomaine]: {
                ...prev[cleDomaine],
                expression: valeur
            }
        }));
    };

    const changerResume = (k, v) => setResume(s => ({ ...s, [k]: v }));

    // Fonctions pour la photo
    const handlePhotoSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner un fichier image valide.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('La taille de l\'image ne doit pas dépasser 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoEleve(e.target.result);
            };
            reader.onerror = () => {
                alert('Erreur lors de la lecture du fichier.');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAjouterPhoto = () => {
        document.getElementById('photo-input')?.click();
    };

    const handleSupprimerPhoto = () => {
        setPhotoEleve(null);
        const input = document.getElementById('photo-input');
        if (input) input.value = '';
    };

    const handleSaveDraft = async () => {
        console.log('💾 Sauvegarde brouillon...');
        const result = await saveToDatabase(true);
        if (result) {
            console.log('✅ Brouillon sauvegardé');
        }
    };

    const handleFinalize = async () => {
        console.log('✅ Finalisation et impression...');
        const result = await saveToDatabase(false);
        if (result) {
            handlePrint();
        }
    };

const handlePrint = () => {
    console.log('🖨️ Impression');
    
    if (ipcRenderer) {
        ipcRenderer.send('print-bulletin');
    } else {
        window.print();
    }
};



    const handlePrintOnly = () => {
        handlePrint();
    };

    const handleReinitialiser = () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
            localStorage.removeItem('bulletinMaternelleData');
            setEntetesPeriodes({
                h1: PERIODE_OPTIONS[0],
                h2: PERIODE_OPTIONS[1],
                h3: PERIODE_OPTIONS[2]
            });
            setMeta({
                nomEleve: "",
                matricule: "",
                sexe: "",
                classe: "",
                trimestre: currentTrimester,
                anneeScolaire: "",
                enseignant: "",
                student_id: studentId || null
            });
            const racine = {};
            DOMAINES_TEMPLATE.forEach(domaine => {
                racine[domaine.key] = {
                    periode1: "",
                    periode2: "",
                    periode3: "",
                    expression: ""
                };
            });
            setDonnees(racine);
            setResume({
                appreciation: "",
                rang: "",
                decision: ""
            });
            setPhotoEleve(null);
            setBulletinId(null);
            setIsEditing(false);
            setIsDraftSaved(false);
        }
    };

    const renderStudentInfo = () => {
        if (studentInfo) {
            return (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600">👤</span>
                        <span className="text-sm text-blue-700">
                            Élève: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
                            {studentInfo.class_name && ` - Classe: ${studentInfo.class_name}`}
                            {studentInfo.sex && ` - Sexe: ${studentInfo.sex}`}
                            {` - Trimestre: ${currentTrimester}`}
                        </span>
                    </div>
                    {studentId && (
                        <div className="mt-2 text-xs text-gray-600">
                            ID: <code className="bg-gray-100 px-2 py-1 rounded">{studentId}</code>
                        </div>
                    )}
                </div>
            );
        } else if (!studentId) {
            return (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-red-600">❌</span>
                        <span className="text-sm text-red-700 font-semibold">
                            ERREUR : Aucun élève sélectionné !
                        </span>
                    </div>
                    <div className="mt-2 text-xs text-red-600">
                        Vous devez d'abord sélectionner un élève depuis la liste des élèves.
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                            Retour au tableau de bord
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderSaveStatus = () => {
        if (isDraftSaved) {
            return (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span className="text-sm text-green-700">
                            Brouillon sauvegardé
                        </span>
                    </div>
                </div>
            );
        }
        
        if (bulletinId) {
            return (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600">📁</span>
                        <span className="text-sm text-blue-700">
                            Bulletin chargé (ID: {bulletinId})
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Générer les options d'année scolaire
    const anneesScolaires = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Input fichier caché pour la photo */}
            <input
                type="file"
                id="photo-input"
                onChange={handlePhotoSelection}
                accept="image/*"
                className="hidden"
            />

            {/* En-tête */}
            <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
                <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
                    {/* Bloc gauche */}
                    <div className="text-left mb-2 md:mb-0 md:w-1/3">
                        <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
                    </div>

                    {/* Bloc centre */}
                    <div className="text-center md:flex-1 md:mx-2">
                        <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
                            GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
                        </div>
                        <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
                            BULLETIN SCOLAIRE
                        </div>
                    </div>

                    {/* Bloc droite */}
                    <div className="text-right mt-2 md:mt-0 md:w-1/3">
                        <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
                    </div>
                </div>
            </div>


            

            {/* Conteneur du formulaire */}
            <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">








            {/* Section Photo + Informations - Version simplifiée */}
<div className="flex flex-row items-center gap-4 mb-4">
    {/* Zone Photo */}
    <div className="flex-shrink-0">
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 relative">
            {photoEleve ? (
                <>
                    <img 
                        src={photoEleve} 
                        alt="Photo de l'élève" 
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        onClick={handleSupprimerPhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        type="button"
                    >
                        ×
                    </button>
                </>
            ) : (
                <div className="text-center text-gray-400">
                    <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">No photo</span>
                </div>
            )}
        </div>
        {/* Bouton Ajouter Photo - seulement à l'écran */}
        <button
            type="button"
            onClick={handleAjouterPhoto}
            className="mt-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center justify-center gap-1 print:hidden"
        >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Add Photo</span>
        </button>
    </div>

    {/* Info élève sur UNE LIGNE */}
    <div className="flex-1">
        <div className="text-lg text-blue-700">
            <strong>Élève:</strong> {meta.nomEleve || studentInfo?.nom_complet || studentInfo?.full_name || "-"}
            {meta.classe && <span> - <strong>Classe:</strong> {meta.classe}</span>}
            <span> - <strong>Trimestre:</strong> {meta.trimestre || currentTrimester}</span>
            {meta.anneeScolaire && <span> - <strong>Année:</strong> {meta.anneeScolaire}</span>}
        </div>
    </div>
</div>

                {/* Début du tableau */}
                <div className="overflow-x-auto">
                    <table className="w-full text-xl border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 w-48">Domaines</th>
                                <th className="border p-2 w-96">Activités</th>
                                <th className="border p-2 text-center w-40">
                                    <select className="text-xs" value={entetesPeriodes.h1} onChange={(e) => changerEntete("h1", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-40">
                                    <select className="text-xs" value={entetesPeriodes.h2} onChange={(e) => changerEntete("h2", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-40">
                                    <select className="text-xs" value={entetesPeriodes.h3} onChange={(e) => changerEntete("h3", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-35">Appreciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {DOMAINES_TEMPLATE.map(domaine => {
                                const state = donnees[domaine.key];
                                return (
                                    <tr key={domaine.key} className="bg-white">
                                        <td className="border p-2 font-semibold">
                                            <div className="">{domaine.title}</div>
                                        </td>
                                        <td className="border p-2">
                                            <div className=" text-gray-600">{domaine.activities}</div>
                                        </td>

                                        {/* Évaluations pour chaque période */}
                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full  p-1"
                                                value={state.periode1 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode1", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full  p-1"
                                                value={state.periode2 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode2", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full  p-1"
                                                value={state.periode3 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode3", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full  p-1"
                                                value={state.expression || ""}
                                                onChange={(e) => changerExpression(domaine.key, e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Légende des Appréciations */}
                <div className="mt-6 border rounded p-4 text-lg">
                    <div className="font-semibold mb-2">Légende des Appréciations</div>
                    <ul className="list-disc ml-5">
                        <li><strong>Acquis</strong> — L'élève maîtrise la compétence</li>
                        <li><strong>Non Acquis</strong> — L'élève ne maîtrise pas encore la compétence</li>
                        <li><strong>Expert</strong> — L'élève maîtrise parfaitement la compétence</li>
                    </ul>
                </div>

                {/* Résumé du Travail */}
                <div className="mt-6 border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                    <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé du Travail</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="text-lg font-medium mb-1">Appréciation</div>
                            <select
                                className="w-full border border-gray-300 px-2 py-1 rounded text-lg"
                                value={resume.appreciation}
                                onChange={(e) => changerResume("appreciation", e.target.value)}
                            >
                                <option value="">- Sélectionner -</option>
                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>

                        <div>
                            <div className="text-lg font-medium mb-1">Rang</div>
                            <input
                                className="w-full border border-gray-300 px-2 py-1 rounded text-lg"
                                value={resume.rang}
                                onChange={(e) => changerResume("rang", e.target.value)}
                                placeholder="Ex: 5ème"
                            />
                        </div>

                        <div>
                            <div className="text-lg font-medium mb-1">Décision</div>
                            <select
                                className="w-full border border-gray-300 px-2 py-1 rounded text-lg"
                                value={resume.decision}
                                onChange={(e) => changerResume("decision", e.target.value)}
                            >
                                <option value="">- Sélectionner -</option>
                                {DECISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section des Visas */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa Chef d'établissement</div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
                    </div>
                </div>

             
                         <style>{`
    @media print {
        @page {
            size: A4;
            margin: 0.5cm;
        }

        body {
            zoom: 0.60;
        }

        td, th {
            padding: 3px !important;
            line-height: 1.1 !important;
        }

        .p-4 {
            padding: 6px !important;
        }

        button {
            display: none !important;
        }

        .receipt-footer {
            display: none !important;
        }

        /* ✅ AJOUTER CE BLOC POUR CACHER LES FLÈCHES DES SELECTS */
        select {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: inherit !important;
            color: black !important;
        }
        
        select::-ms-expand {
            display: none !important;
        }
    }
`}</style>








                {/* Actions avec la logique du premier bulletin */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                    >
                        ← Retour
                    </button>

                    <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                        <button
                            onClick={handlePrintOnly}
                            disabled={!studentId}
                            className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            🖨️ Imprimer
                        </button>
                        
                        <button
                            onClick={handleReinitialiser}
                            className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
                        >
                            Réinitialiser
                        </button>
                        
                        <button
                            onClick={handleSaveDraft}
                            disabled={saving || !studentId}
                            className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Sauvegarde...' : 'Sauvegarder Brouillon'}
                        </button>
                        
                        <button
                            onClick={handleFinalize}
                            disabled={saving || !studentId}
                            className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Sauvegarde...' : '✅ Finaliser'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}