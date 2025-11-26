// BulletinMaternelle.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
        activities: "- Initiation aux Mthematiques , - Education Sensorielle et perceptive , -Technologie de l'information et de la communication , - Sciences et technologies"
    },
     {
        key: "vie",
        title: "Domaine 3 : VIE COURANTE",
        activities: "-Education à la santé(Nutrition et à environnement)"
    },
    {
        key: "art",
        title: "Dmaine 4 : CREATION ARTISTIQUE",
        activities: "-Activités manuelles , -Creation artistique"
    },
    {
        key: "motricite",
        title: "Domaine 5 : MOTRICITE GENERALE",
        activities: "-Motrice generale"
    },
   
];

export default function BulletinMaternelle() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Fonction pour charger les données sauvegardées
    const loadSavedData = () => {
        try {
            const saved = localStorage.getItem('bulletinMaternelleData');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
        return null;
    };

    // Fonction pour sauvegarder les données
    const saveData = (data) => {
        try {
            localStorage.setItem('bulletinMaternelleData', JSON.stringify(data));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    // Fonction pour effacer les données sauvegardées
    const clearSavedData = () => {
        try {
            localStorage.removeItem('bulletinMaternelleData');
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
        }
    };

    // Charger les données sauvegardées au montage du composant
    const savedData = loadSavedData();

    const [entetesPeriodes, setEntetesPeriodes] = useState(
        savedData?.entetesPeriodes || {
            h1: PERIODE_OPTIONS[0],
            h2: PERIODE_OPTIONS[1],
            h3: PERIODE_OPTIONS[2]
        }
    );

    const [meta, setMeta] = useState(savedData?.meta || {
        nomEleve: "",
        matricule: "",
        sexe: "",
        classe: "",
        trimestre: "",
        anneeScolaire: "",
        enseignant: ""
    });

    const [donnees, setDonnees] = useState(() => {
        if (savedData?.donnees) {
            return savedData.donnees;
        } else {
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
        }
    });

    const [resume, setResume] = useState(savedData?.resume || {
        appreciation: "",
        rang: "",
        decision: ""
    });

    // État pour la photo de l'élève
    const [photoEleve, setPhotoEleve] = useState(savedData?.photoEleve || null);

    // Sauvegarder les données à chaque changement
    useEffect(() => {
        const formData = {
            entetesPeriodes,
            meta,
            donnees,
            resume,
            photoEleve
        };
        saveData(formData);
    }, [entetesPeriodes, meta, donnees, resume, photoEleve]);

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

    // Fonction pour gérer la sélection de photo
    const handlePhotoSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner un fichier image valide.');
                return;
            }

            // Vérifier la taille du fichier (max 5MB)
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

    // Fonction pour déclencher le sélecteur de fichiers
    const handleAjouterPhoto = () => {
        fileInputRef.current?.click();
    };

    // Fonction pour supprimer la photo
    const handleSupprimerPhoto = () => {
        setPhotoEleve(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleApercu = () => {
        const payload = {
            meta,
            entetesPeriodes,
            donnees,
            resume,
            photoEleve
        };
        saveData(payload);
        navigate("/preview-maternelle", { state: payload });
    };

    const handleReinitialiser = () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
            clearSavedData();
            window.location.reload();
        }
    };

    // Générer les options d'année scolaire
    const anneesScolaires = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Input fichier caché pour la photo */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelection}
                accept="image/*"
                className="hidden"
            />

            {/* En-tête */}
            <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
                <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start "
                >
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
                {/* Section Photo + Informations */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Zone Photo */}
                    <div className="flex flex-col items-center md:w-1/4">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-3 overflow-hidden">
                            {photoEleve ? (
                                <img 
                                    src={photoEleve} 
                                    alt="Photo de l'élève" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-gray-400 text-center text-xs p-2">
                                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Photo de l'élève
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full">
                            <button
                                type="button"
                                onClick={handleAjouterPhoto}
                                className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Ajouter une photo
                            </button>
                            
                            {photoEleve && (
                                <button
                                    type="button"
                                    onClick={handleSupprimerPhoto}
                                    className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Supprimer
                                </button>
                            )}
                        </div>
                        
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Format recommandé : 3x4 cm
                        </p>
                    </div>

                    {/* Champs d'information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                        <input
                            className="border px-3 py-2 rounded"
                            placeholder="Nom complet"
                            value={meta.nomEleve}
                            onChange={(e) => changerMeta("nomEleve", e.target.value)}
                        />
                        <input
                            className="border px-3 py-2 rounded"
                            placeholder="Numéro Matricule"
                            value={meta.matricule}
                            onChange={(e) => changerMeta("matricule", e.target.value)}
                        />
                        <select
                            className="border px-3 py-2 rounded"
                            value={meta.sexe}
                            onChange={e => changerMeta("sexe", e.target.value)}
                        >
                            <option value="">Sexe</option>
                            <option>Masculin</option>
                            <option>Féminin</option>
                        </select>

                        <select
                            className="border px-3 py-2 rounded"
                            value={meta.classe}
                            onChange={e => changerMeta("classe", e.target.value)}
                        >
                            <option value="">Classe</option>
                            {CLASS_OPTIONS.map(classe => (
                                <option key={classe} value={classe}>{classe}</option>
                            ))}
                        </select>

                        <select
                            className="border px-3 py-2 rounded"
                            value={meta.trimestre}
                            onChange={e => changerMeta("trimestre", e.target.value)}
                        >
                            <option value="">Trimestre</option>
                            {TRIMESTRE_OPTIONS.map(trimestre => (
                                <option key={trimestre} value={trimestre}>{trimestre}</option>
                            ))}
                        </select>

                        <select
                            className="border px-3 py-2 rounded"
                            value={meta.anneeScolaire}
                            onChange={e => changerMeta("anneeScolaire", e.target.value)}
                        >
                            <option value="">Année Scolaire</option>
                            {anneesScolaires.map(annee => (
                                <option key={annee} value={annee}>{annee}</option>
                            ))}
                        </select>

                        <input
                            className="border px-3 py-2 rounded md:col-span-2"
                            placeholder="Enseignant"
                            value={meta.enseignant}
                            onChange={e => changerMeta("enseignant", e.target.value)}
                        />
                    </div>
                </div>

                {/* Début du tableau */}
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 w-48">Domaines</th>
                                <th className="border p-2 w-96">Activités</th>
                                <th className="border p-2 text-center w-24">
                                    <select className="text-xs" value={entetesPeriodes.h1} onChange={(e) => changerEntete("h1", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-24">
                                    <select className="text-xs" value={entetesPeriodes.h2} onChange={(e) => changerEntete("h2", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-24">
                                    <select className="text-xs" value={entetesPeriodes.h3} onChange={(e) => changerEntete("h3", e.target.value)}>
                                        {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-32">Appreciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {DOMAINES_TEMPLATE.map(domaine => {
                                const state = donnees[domaine.key];
                                return (
                                    <tr key={domaine.key} className="bg-white">
                                        <td className="border p-2 font-semibold">
                                            <div className="text-sm">{domaine.title}</div>
                                        </td>
                                        <td className="border p-2">
                                            <div className="text-xs text-gray-600">{domaine.activities}</div>
                                        </td>

                                        {/* Évaluations pour chaque période */}
                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full text-xs p-1"
                                                value={state.periode1 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode1", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full text-xs p-1"
                                                value={state.periode2 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode2", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full text-xs p-1"
                                                value={state.periode3 || ""}
                                                onChange={(e) => changerEvaluation(domaine.key, "periode3", e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </td>

                                        <td className="border p-1 text-center">
                                            <select
                                                className="w-full text-xs p-1"
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
                <div className="mt-6 border rounded p-4 text-xs">
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
                            <div className="text-xs font-medium mb-1">Appréciation</div>
                            <select
                                className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                value={resume.appreciation}
                                onChange={(e) => changerResume("appreciation", e.target.value)}
                            >
                                <option value="">- Sélectionner -</option>
                                {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>

                        <div>
                            <div className="text-xs font-medium mb-1">Rang</div>
                            <input
                                className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                value={resume.rang}
                                onChange={(e) => changerResume("rang", e.target.value)}
                                placeholder="Ex: 5ème"
                            />
                        </div>

                        <div>
                            <div className="text-xs font-medium mb-1">Décision</div>
                            <select
                                className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
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

                {/* Information de Contact */}
                  <div className="text-center text-[8px] mt-9 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5  print:mt-9 mb-2 print:mb-0 print:mx-4">
                    <div className="receipt-footer">
                        <div>
                            <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
                            <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
                        </div>
                        <div>
                            <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mt-6 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded text-sm w-full sm:w-auto hover:bg-gray-100 transition"
                    >
                        Retour
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleReinitialiser}
                            className="px-4 py-2 border rounded text-sm hover:bg-gray-100 transition w-full sm:w-auto"
                        >
                            Réinitialiser
                        </button>
                        <button
                            onClick={handleApercu}
                            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition w-full sm:w-auto"
                        >
                            Aperçu & Impression
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}