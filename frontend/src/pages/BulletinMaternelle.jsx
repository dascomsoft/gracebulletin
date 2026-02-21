// // BulletinMaternelle.js
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const PERIODE_OPTIONS = [
//     "Mois-1", "Mois-2", "Mois-3", "Mois-4", "Mois-5", "Mois-6", "Mois-7",
//     "Trimestre-1", "Trimestre-2", "Trimestre-3"
// ];

// const TRIMESTRE_OPTIONS = ["Trimestre-1", "Trimestre-2", "Trimestre-3"];
// const APPRECIATIONS = ["Acquis", "Non Acquis", "Expert"];
// const DECISIONS = ["Admis", "Echoue"];
// const CLASS_OPTIONS = ["Petite Section", "Moyenne Section", "Grande Section"];

// const DOMAINES_TEMPLATE = [
//     {
//         title: "COMMUNIQUER EN FRANCAIS"
//     },
//     {
//         title: "COMMUNIQUER EN ANGLAIS"
//     },
//     {
//         title: "PRATIQUER UNE LANGUE NATIONALE"
//     },
//     {
//         title: "MATHEMATIQUES"
//     },
//     {
//         title: "SCIENCE ET TECHNOLOGIE"
//     },
//     {
//         title: "VALEURS SOCIALES"
//     },
//     {
//         title: "VALEURS CITOYENNES"
//     },
//     {
//         title: "DEMONTRER L'AUTONOMIE"
//     },
//     {
//         title: "TIC"
//     },
//     {
//         title: "ACTIVITES SPORTIVE"
//     },
//     {
//         title: "ACTIVITES ARTISTIQUES"
//     }
// ];

// export default function BulletinMaternelle() {
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);







//     // Fonction pour charger les données sauvegardées
//     const loadSavedData = () => {
//         try {
//             const saved = localStorage.getItem('bulletinMaternelleData');
//             if (saved) {
//                 return JSON.parse(saved);
//             }
//         } catch (error) {
//             console.error('Erreur lors du chargement des données:', error);
//         }
//         return null;
//     };

//     // Fonction pour sauvegarder les données
//     const saveData = (data) => {
//         try {
//             localStorage.setItem('bulletinMaternelleData', JSON.stringify(data));
//         } catch (error) {
//             console.error('Erreur lors de la sauvegarde des données:', error);
//         }
//     };

//     // Fonction pour effacer les données sauvegardées
//     const clearSavedData = () => {
//         try {
//             localStorage.removeItem('bulletinMaternelleData');
//         } catch (error) {
//             console.error('Erreur lors de la suppression des données:', error);
//         }
//     };

//     // Charger les données sauvegardées au montage du composant
//     const savedData = loadSavedData();

//     const [entetesPeriodes, setEntetesPeriodes] = useState(
//         savedData?.entetesPeriodes || {
//             h1: PERIODE_OPTIONS[0],
//             h2: PERIODE_OPTIONS[1],
//             h3: PERIODE_OPTIONS[2]
//         }
//     );

//     const [meta, setMeta] = useState(savedData?.meta || {
//         nomEleve: "",
//         matricule: "",
//         sexe: "",
//         classe: "",
//         trimestre: "",
//         anneeScolaire: "",
//         enseignant: ""
//     });

//     const [donnees, setDonnees] = useState(() => {
//         if (savedData?.donnees) {
//             return savedData.donnees;
//         } else {
//             const racine = {};
//             DOMAINES_TEMPLATE.forEach((domaine, index) => {
//                 racine[`domaine${index}`] = {
//                     periode1: "",
//                     periode2: "",
//                     periode3: "",
//                     expression: ""
//                 };
//             });
//             return racine;
//         }
//     });

//     const [resume, setResume] = useState(savedData?.resume || {
//         appreciation: "",
//         rang: "",
//         decision: ""
//     });

//     // État pour la photo de l'élève
//     const [photoEleve, setPhotoEleve] = useState(savedData?.photoEleve || null);

//     // Sauvegarder les données à chaque changement
//     useEffect(() => {
//         const formData = {
//             entetesPeriodes,
//             meta,
//             donnees,
//             resume,
//             photoEleve
//         };
//         saveData(formData);
//     }, [entetesPeriodes, meta, donnees, resume, photoEleve]);

//     const changerEntete = (k, v) => setEntetesPeriodes(p => ({ ...p, [k]: v }));
//     const changerMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

//     const changerEvaluation = (index, periode, valeur) => {
//         const cle = `domaine${index}`;
//         setDonnees(prev => ({
//             ...prev,
//             [cle]: {
//                 ...prev[cle],
//                 [periode]: valeur
//             }
//         }));
//     };

//     const changerExpression = (index, valeur) => {
//         const cle = `domaine${index}`;
//         setDonnees(prev => ({
//             ...prev,
//             [cle]: {
//                 ...prev[cle],
//                 expression: valeur
//             }
//         }));
//     };

//     const changerResume = (k, v) => setResume(s => ({ ...s, [k]: v }));

//     // Fonction pour gérer la sélection de photo
//     const handlePhotoSelection = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Vérifier le type de fichier
//             if (!file.type.startsWith('image/')) {
//                 alert('Veuillez sélectionner un fichier image valide.');
//                 return;
//             }

//             // Vérifier la taille du fichier (max 5MB)
//             if (file.size > 5 * 1024 * 1024) {
//                 alert('La taille de l\'image ne doit pas dépasser 5MB.');
//                 return;
//             }

//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setPhotoEleve(e.target.result);
//             };
//             reader.onerror = () => {
//                 alert('Erreur lors de la lecture du fichier.');
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Fonction pour déclencher le sélecteur de fichiers
//     const handleAjouterPhoto = () => {
//         fileInputRef.current?.click();
//     };

//     // Fonction pour supprimer la photo
//     const handleSupprimerPhoto = () => {
//         setPhotoEleve(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handleApercu = () => {
//         const payload = {
//             meta,
//             entetesPeriodes,
//             donnees,
//             resume,
//             photoEleve
//         };
//         saveData(payload);
//         navigate("/preview-maternelle", { state: payload });
//     };

//     const handleReinitialiser = () => {
//         if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
//             clearSavedData();
//             window.location.reload();
//         }
//     };

//     // Générer les options d'année scolaire
//     const anneesScolaires = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//             {/* Input fichier caché pour la photo */}
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handlePhotoSelection}
//                 accept="image/*"
//                 className="hidden"
//             />

//             {/* En-tête */}
//             <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//                 <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
//                     {/* Bloc gauche */}
//                     <div className="text-left mb-2 md:mb-0 md:w-1/3">
//                         <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
//                         <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
//                     </div>

//                     {/* Bloc centre */}
//                     <div className="text-center md:flex-1 md:mx-2">
//                         <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
//                             GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
//                         </div>
//                         <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//                             BULLETIN SCOLAIRE
//                         </div>
//                     </div>

//                     {/* Bloc droite */}
//                     <div className="text-right mt-2 md:mt-0 md:w-1/3">
//                         <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
//                         <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Conteneur du formulaire */}
//             <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
//                 {/* Section Photo + Informations */}
//                 <div className="flex flex-col md:flex-row gap-6 mb-6">
//                     {/* Zone Photo */}
//                     <div className="flex flex-col items-center md:w-1/4">
//                         <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-3 overflow-hidden">
//                             {photoEleve ? (
//                                 <img 
//                                     src={photoEleve} 
//                                     alt="Photo de l'élève" 
//                                     className="w-full h-full object-cover rounded-lg"
//                                 />
//                             ) : (
//                                 <div className="text-gray-400 text-center text-xs p-2">
//                                     <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     Photo de l'élève
//                                 </div>
//                             )}
//                         </div>
                        
//                         <div className="flex flex-col gap-2 w-full">
//                             <button
//                                 type="button"
//                                 onClick={handleAjouterPhoto}
//                                 className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center justify-center gap-1"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                                 </svg>
//                                 Ajouter une photo
//                             </button>
                            
//                             {photoEleve && (
//                                 <button
//                                     type="button"
//                                     onClick={handleSupprimerPhoto}
//                                     className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                     </svg>
//                                     Supprimer
//                                 </button>
//                             )}
//                         </div>
                        
//                         <p className="text-xs text-gray-500 text-center mt-2">
//                             Format recommandé : 3x4 cm
//                         </p>
//                     </div>

//                     {/* Champs d'information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
//                         <input
//                             className="border px-3 py-2 rounded"
//                             placeholder="Nom complet"
//                             value={meta.nomEleve}
//                             onChange={(e) => changerMeta("nomEleve", e.target.value)}
//                         />
//                         <input
//                             className="border px-3 py-2 rounded"
//                             placeholder="Numéro Matricule"
//                             value={meta.matricule}
//                             onChange={(e) => changerMeta("matricule", e.target.value)}
//                         />
//                         <select
//                             className="border px-3 py-2 rounded"
//                             value={meta.sexe}
//                             onChange={e => changerMeta("sexe", e.target.value)}
//                         >
//                             <option value="">Sexe</option>
//                             <option>Masculin</option>
//                             <option>Féminin</option>
//                         </select>

//                         <select
//                             className="border px-3 py-2 rounded"
//                             value={meta.classe}
//                             onChange={e => changerMeta("classe", e.target.value)}
//                         >
//                             <option value="">Classe</option>
//                             {CLASS_OPTIONS.map(classe => (
//                                 <option key={classe} value={classe}>{classe}</option>
//                             ))}
//                         </select>

//                         <select
//                             className="border px-3 py-2 rounded"
//                             value={meta.trimestre}
//                             onChange={e => changerMeta("trimestre", e.target.value)}
//                         >
//                             <option value="">Trimestre</option>
//                             {TRIMESTRE_OPTIONS.map(trimestre => (
//                                 <option key={trimestre} value={trimestre}>{trimestre}</option>
//                             ))}
//                         </select>

//                         <select
//                             className="border px-3 py-2 rounded"
//                             value={meta.anneeScolaire}
//                             onChange={e => changerMeta("anneeScolaire", e.target.value)}
//                         >
//                             <option value="">Année Scolaire</option>
//                             {anneesScolaires.map(annee => (
//                                 <option key={annee} value={annee}>{annee}</option>
//                             ))}
//                         </select>

//                         <input
//                             className="border px-3 py-2 rounded md:col-span-2"
//                             placeholder="Enseignant"
//                             value={meta.enseignant}
//                             onChange={e => changerMeta("enseignant", e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Début du tableau */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border p-2 w-48">Domaines</th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h1} onChange={(e) => changerEntete("h1", e.target.value)}>
//                                         {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h2} onChange={(e) => changerEntete("h2", e.target.value)}>
//                                         {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h3} onChange={(e) => changerEntete("h3", e.target.value)}>
//                                         {PERIODE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-32">Appreciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {DOMAINES_TEMPLATE.map((domaine, index) => {
//                                 const cle = `domaine${index}`;
//                                 const state = donnees[cle];
//                                 return (
//                                     <tr key={index} className="bg-white">
//                                         <td className="border p-2 font-semibold">
//                                             <div className="text-sm">{domaine.title}</div>
//                                         </td>

//                                         {/* Évaluations pour chaque période */}
//                                         <td className="border p-1 text-center">
//                                             <select
//                                                 className="w-full text-xs p-1"
//                                                 value={state?.periode1 || ""}
//                                                 onChange={(e) => changerEvaluation(index, "periode1", e.target.value)}
//                                             >
//                                                 <option value="">-</option>
//                                                 {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                             </select>
//                                         </td>

//                                         <td className="border p-1 text-center">
//                                             <select
//                                                 className="w-full text-xs p-1"
//                                                 value={state?.periode2 || ""}
//                                                 onChange={(e) => changerEvaluation(index, "periode2", e.target.value)}
//                                             >
//                                                 <option value="">-</option>
//                                                 {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                             </select>
//                                         </td>

//                                         <td className="border p-1 text-center">
//                                             <select
//                                                 className="w-full text-xs p-1"
//                                                 value={state?.periode3 || ""}
//                                                 onChange={(e) => changerEvaluation(index, "periode3", e.target.value)}
//                                             >
//                                                 <option value="">-</option>
//                                                 {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                             </select>
//                                         </td>

//                                         <td className="border p-1 text-center">
//                                             <select
//                                                 className="w-full text-xs p-1"
//                                                 value={state?.expression || ""}
//                                                 onChange={(e) => changerExpression(index, e.target.value)}
//                                             >
//                                                 <option value="">-</option>
//                                                 {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                             </select>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Légende des Appréciations */}
//                 <div className="mt-6 border rounded p-4 text-xs">
//                     <div className="font-semibold mb-2">Légende des Appréciations</div>
//                     <ul className="list-disc ml-5">
//                         <li><strong>Acquis</strong> — L'élève maîtrise la compétence</li>
//                         <li><strong>Non Acquis</strong> — L'élève ne maîtrise pas encore la compétence</li>
//                         <li><strong>Expert</strong> — L'élève maîtrise parfaitement la compétence</li>
//                     </ul>
//                 </div>

//                 {/* Résumé du Travail */}
//                 <div className="mt-6 border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                     <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé du Travail</div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <div className="text-xs font-medium mb-1">Appréciation</div>
//                             <select
//                                 className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                 value={resume.appreciation}
//                                 onChange={(e) => changerResume("appreciation", e.target.value)}
//                             >
//                                 <option value="">- Sélectionner -</option>
//                                 {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <div className="text-xs font-medium mb-1">Rang</div>
//                             <input
//                                 className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                 value={resume.rang}
//                                 onChange={(e) => changerResume("rang", e.target.value)}
//                                 placeholder="Ex: 5ème"
//                             />
//                         </div>

//                         <div>
//                             <div className="text-xs font-medium mb-1">Décision</div>
//                             <select
//                                 className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                 value={resume.decision}
//                                 onChange={(e) => changerResume("decision", e.target.value)}
//                             >
//                                 <option value="">- Sélectionner -</option>
//                                 {DECISIONS.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Section des Visas */}
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
//                     </div>

//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa Chef d'établissement</div>
//                     </div>

//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
//                     </div>
//                 </div>

//                 {/* Information de Contact */}
//                 <div className="text-center text-[8px] mt-9 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 print:mt-9 mb-2 print:mb-0 print:mx-4">
//                     <div className="receipt-footer">
//                         <div>
//                             <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
//                             <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
//                         </div>
//                         <div>
//                             <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mt-6 w-full">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="px-4 py-2 border rounded text-sm w-full sm:w-auto hover:bg-gray-100 transition"
//                     >
//                         Retour
//                     </button>

//                     <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                         <button
//                             onClick={handleApercu}
//                             className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition w-full sm:w-auto"
//                         >
//                             Aperçu & Impression
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




































































































import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => `Mois-${i + 1}`);
const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
const APPRECIATIONS = ["Non acquis", "En cours d'acquisition", "Expert", "Acquis"];
const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

const SKILLS_TEMPLATE = [
  {
    key: "langage",
    title: "Langage Oral et Écrit",
    description: "Communication, vocabulaire, pré-lecture, pré-écriture",
    sclValues: { Expression: 20, Compréhension: 15, Vocabulaire: 15 },
    evaluations: ["Expression", "Compréhension", "Vocabulaire"]
  },
  {
    key: "maths",
    title: "Découverte du Monde - Mathématiques",
    description: "Nombres, formes, grandeurs, espace, temps",
    sclValues: { Nombres: 20, Formes: 10, Mesures: 10, Espace: 10 },
    evaluations: ["Nombres", "Formes", "Mesures", "Espace"]
  },
  {
    key: "motricite",
    title: "Activités Physiques et Motricité",
    description: "Déplacements, équilibre, coordination, motricité fine",
    sclValues: { Globale: 15, Fine: 15, Coordination: 10 },
    evaluations: ["Globale", "Fine", "Coordination"]
  },
  {
    key: "artistique",
    title: "Activités Artistiques",
    description: "Arts plastiques, musique, expression corporelle",
    sclValues: { Créativité: 15, Expression: 15, Sensibilité: 10 },
    evaluations: ["Créativité", "Expression", "Sensibilité"]
  },
  {
    key: "social",
    title: "Vivre Ensemble - Socialisation",
    description: "Autonomie, respect, coopération, règles de vie",
    sclValues: { Autonomie: 15, Socialisation: 15, Règles: 10 },
    evaluations: ["Autonomie", "Socialisation", "Règles"]
  },
  {
    key: "sciences",
    title: "Découverte du Monde - Sciences",
    description: "Observation, expérimentation, environnement",
    sclValues: { Observation: 15, Expérimentation: 15, Curiosité: 10 },
    evaluations: ["Observation", "Expérimentation", "Curiosité"]
  }
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
          studentName: student.nom_complet || student.full_name || "",
          sex: student.sex || student.sexe || "",
          className: student.class_name || "",
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












  // const loadStudentBulletins = async (id) => {
  //   try {
  //     const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
  //     console.log(`📡 Requête bulletins: ${url}`);
      
  //     const response = await fetch(url);
  //     if (response.ok) {
  //       const bulletins = await response.json();
  //       console.log(`✅ ${bulletins.length} bulletins trouvés`);
        
  //       const currentTrimesterBulletin = bulletins.find(b => 
  //         b.bulletin_type === 'maternelle' && 
  //         (b.trimester === currentTrimester || 
  //          (currentTrimester === 'Trimestre 1' && b.trimester === 'Term 1') ||
  //          (currentTrimester === 'Trimestre 2' && b.trimester === 'Term 2') ||
  //          (currentTrimester === 'Trimestre 3' && b.trimester === 'Term 3'))
  //       );
        
  //       if (currentTrimesterBulletin) {
  //         console.log('✅ Bulletin existant trouvé:', currentTrimesterBulletin);
  //         setBulletinId(currentTrimesterBulletin.id);
  //         setIsEditing(true);
          
  //         const savedData = JSON.parse(currentTrimesterBulletin.data_json);
  //         if (savedData.periodHeaders) setPeriodHeaders(savedData.periodHeaders);
  //         if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
  //         if (savedData.data) setData(savedData.data);
  //         if (savedData.periodInfo) setPeriodInfo(savedData.periodInfo);
  //         if (savedData.summary) setSummary(savedData.summary);
  //         if (savedData.studentPhoto) setStudentPhoto(savedData.studentPhoto);
  //       } else {
  //         console.log(`ℹ️ Aucun bulletin maternelle existant pour ${currentTrimester}`);
  //       }
  //     } else {
  //       console.error(`❌ Erreur chargement bulletins: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('❌ Erreur chargement bulletins:', error);
  //   }
  // };


const loadStudentBulletins = async (studentId) => {
    try {
        console.log(`📡 Requête bulletins: http://localhost:3000/api/student/${studentId}/bulletins`);
        const response = await fetch(`http://localhost:3000/api/student/${studentId}/bulletins`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const bulletins = await response.json();
        console.log(`✅ ${bulletins.length} bulletins trouvés`);
        
        // Récupère le trimestre depuis location.state
        const currentTrimester = location.state?.trimestre || 'Trimestre 1';
        console.log('📌 Recherche bulletin pour le trimestre:', currentTrimester);
        
        if (bulletins.length > 0) {
            const currentBulletin = bulletins.find(b => 
                b.trimester === currentTrimester
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
                if (bulletinData.periodHeaders) {
                    setPeriodHeaders(bulletinData.periodHeaders);
                }
                
                if (bulletinData.meta) {
                    setMeta(prev => ({ ...prev, ...bulletinData.meta }));
                }
                
                if (bulletinData.data) {
                    setData(bulletinData.data);
                }
                
                if (bulletinData.periodInfo) {
                    setPeriodInfo(bulletinData.periodInfo);
                }
                
                if (bulletinData.summary) {
                    setSummary(bulletinData.summary);
                }
                
                if (bulletinData.studentPhoto) {
                    setStudentPhoto(bulletinData.studentPhoto);
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












  const initializeData = () => {
    const root = {};
    SKILLS_TEMPLATE.forEach(s => {
      const evals = {};
      s.evaluations.forEach(ev => (evals[ev] = { m1: "", m2: "", m3: "" }));
      root[s.key] = { appreciation: "", evals };
    });
    return root;
  };

  const [periodHeaders, setPeriodHeaders] = useState({
    h1: MONTH_OPTIONS[0], 
    h2: MONTH_OPTIONS[1], 
    h3: MONTH_OPTIONS[2]
  });

  const [meta, setMeta] = useState({
    studentName: "",
    sex: "",
    className: "",
    level: "",
    term: currentTrimester,
    year: "",
    teacher: "",
    student_id: studentId || null
  });

  const [studentPhoto, setStudentPhoto] = useState(null);
  const [data, setData] = useState(() => initializeData());
  const [periodInfo, setPeriodInfo] = useState({
    pos1: "", pos2: "", pos3: "",
    app1: "", app2: "", app3: ""
  });
  const [summary, setSummary] = useState({
    overallAppreciation: "",
    position: "",
    decision: ""
  });

  const saveData = (data) => {
    try {
      localStorage.setItem('bulletinMaternelleData', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Erreur sauvegarde localStorage:', error);
    }
  };

  useEffect(() => {
    const formData = {
      periodHeaders,
      meta,
      studentPhoto,
      data,
      periodInfo,
      summary
    };
    saveData(formData);
  }, [periodHeaders, meta, studentPhoto, data, periodInfo, summary]);

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

      const totals = calculateTotals();
      const averages = calculateAverages(totals);
      const overallAvg = calculateOverallAverage(averages);

      const formData = {
        periodHeaders,
        meta: { ...meta, student_id: studentId, term: currentTrimester },
        studentPhoto,
        data,
        periodInfo,
        summary,
        totals,
        averages,
        overallAvg,
        isDraft
      };

      const payload = {
        student_id: studentId,
        bulletin_type: 'maternelle',
        trimester: currentTrimester,
        academic_year: meta.year || getCurrentAcademicYear(),
        nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
        classe: meta.className || studentInfo?.class_name || "",
        enseignant: meta.teacher || "",
        appreciation: summary.overallAppreciation || "",
        rang_position: summary.position || "",
        decision: summary.decision || "",
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

  const calculateTotals = () => {
    let sumNotes1 = 0, sumNotes2 = 0, sumNotes3 = 0;
    let sumSCL1 = 0, sumSCL2 = 0, sumSCL3 = 0;

    SKILLS_TEMPLATE.forEach(skill => {
      const skillData = data[skill.key];
      skill.evaluations.forEach(ev => {
        const evalData = skillData.evals[ev];

        if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
          sumNotes1 += Number(evalData.m1);
          sumSCL1 += skill.sclValues[ev];
        }

        if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
          sumNotes2 += Number(evalData.m2);
          sumSCL2 += skill.sclValues[ev];
        }

        if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
          sumNotes3 += Number(evalData.m3);
          sumSCL3 += skill.sclValues[ev];
        }
      });
    });

    return {
      t1: `${sumNotes1}/${sumSCL1}`,
      t2: `${sumNotes2}/${sumSCL2}`,
      t3: `${sumNotes3}/${sumSCL3}`,
      raw: { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 }
    };
  };

  const calculateAverages = (totals) => {
    const { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 } = totals.raw;

    const a1 = sumSCL1 > 0 ? Math.round((sumNotes1 / sumSCL1) * 20 * 100) / 100 : 0;
    const a2 = sumSCL2 > 0 ? Math.round((sumNotes2 / sumSCL2) * 20 * 100) / 100 : 0;
    const a3 = sumSCL3 > 0 ? Math.round((sumNotes3 / sumSCL3) * 20 * 100) / 100 : 0;

    return {
      a1: sumSCL1 > 0 ? `${a1}/20` : "0/20",
      a2: sumSCL2 > 0 ? `${a2}/20` : "0/20",
      a3: sumSCL3 > 0 ? `${a3}/20` : "0/20",
      raw: { a1, a2, a3 }
    };
  };

  const calculateOverallAverage = (averages) => {
    const { a1, a2, a3 } = averages.raw;
    const average = Math.round(((a1 + a2 + a3) / 3) * 100) / 100;
    return `${average}/20`;
  };

  const totals = useMemo(() => calculateTotals(), [data]);
  const averages = useMemo(() => calculateAverages(totals), [totals]);
  const overallAvg = useMemo(() => calculateOverallAverage(averages), [averages]);

  const changeHeader = (k, v) => setPeriodHeaders(p => ({ ...p, [k]: v }));
  const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
  
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemovePhoto = () => setStudentPhoto(null);
  
  const changeNote = (skillKey, evalLabel, monthKey, value) => {
    setData(prev => ({
      ...prev,
      [skillKey]: {
        ...prev[skillKey],
        evals: {
          ...prev[skillKey].evals,
          [evalLabel]: { ...prev[skillKey].evals[evalLabel], [monthKey]: value ? Number(value) : "" }
        }
      }
    }));
  };
  
  const changeGroupApp = (skillKey, value) => {
    setData(prev => ({ ...prev, [skillKey]: { ...prev[skillKey], appreciation: value } }));
  };
  
  const changePeriodInfo = (k, v) => setPeriodInfo(p => ({ ...p, [k]: v }));
  const changeSummary = (k, v) => setSummary(s => ({ ...s, [k]: v }));

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
    console.log('🖨️ Préparation impression...');
    
    const printData = {
      meta: { ...meta, student_id: studentId },
      studentPhoto,
      periodHeaders,
      data,
      totals,
      averages,
      periodInfo,
      overallAvg,
      summary
    };
    
    localStorage.setItem('printBulletinData', JSON.stringify(printData));
    
    window.open('/print-bulletin-maternelle', '_blank');
  };

  const handlePrintOnly = () => {
    console.log('🖨️ Impression uniquement...');
    handlePrint();
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
      localStorage.removeItem('bulletinMaternelleData');
      setPeriodHeaders({ h1: MONTH_OPTIONS[0], h2: MONTH_OPTIONS[1], h3: MONTH_OPTIONS[2] });
      setMeta({
        studentName: "",
        sex: "",
        className: "",
        level: "",
        term: currentTrimester,
        year: "",
        teacher: "",
        student_id: studentId || null
      });
      setStudentPhoto(null);
      setData(initializeData());
      setPeriodInfo({ pos1: "", pos2: "", pos3: "", app1: "", app2: "", app3: "" });
      setSummary({ overallAppreciation: "", position: "", decision: "" });
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
        <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
          <div className="text-left mb-2 md:mb-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
          </div>

          <div className="text-center md:flex-1 md:mx-2">
            <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
              GROUPE SCOLAIRE BILINGUE THE GRACE OF GOD
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              BULLETIN MATERNELLE
            </div>
          </div>

          <div className="text-right mt-2 md:mt-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
        {renderStudentInfo()}
        {renderSaveStatus()}

        <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3 relative bg-gray-50">
              {studentPhoto ? (
                <>
                  <img
                    src={studentPhoto}
                    alt="Student"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Aucune photo</span>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Ajouter Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Cliquez pour sélectionner une photo
            </p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input 
                className="border px-3 py-2 rounded" 
                placeholder="Nom complet" 
                value={meta.studentName} 
                onChange={(e) => changeMeta("studentName", e.target.value)} 
                disabled={!!studentInfo}
              />
              {/* <select 
                className="border px-3 py-2 rounded" 
                value={meta.sex} 
                onChange={e => changeMeta("sex", e.target.value)}
                disabled={!!studentInfo}
              >
                <option value="">Sexe</option>
                <option>Masculin</option>
                <option>Féminin</option>
              </select> */}
              <select 
                className="border px-3 py-2 rounded" 
                value={meta.className} 
                onChange={e => changeMeta("className", e.target.value)}
                disabled={!!studentInfo}
              >
                <option value="">Section</option>
                <option>TPS (Toute Petite Section)</option>
                <option>PS (Petite Section)</option>
                <option>MS (Moyenne Section)</option>
                <option>GS (Grande Section)</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
                <option value="">Niveau</option>
                <option>TPS</option>
                <option>PS</option>
                <option>MS</option>
                <option>GS</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
                <option value="">Période</option>
                <option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
                <option>Term 1</option><option>Term 2</option><option>Term 3</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.year} onChange={e => changeMeta("year", e.target.value)}>
                <option value="">Année scolaire</option>
                {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
              </select>

              <input className="border px-3 py-2 rounded md:col-span-3" placeholder="Enseignante" value={meta.teacher} onChange={e => changeMeta("teacher", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 w-36">Domaines d'Apprentissage</th>
                <th className="border p-2 w-96">Compétences visées</th>
                <th className="border p-2 text-center w-20">Évaluation</th>
                <th className="border p-2 text-center w-14">SCL</th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-28">Appréciation</th>
              </tr>
            </thead>

            <tbody>
              {SKILLS_TEMPLATE.map(skill => {
                const state = data[skill.key];
                return (
                  <React.Fragment key={skill.key}>
                    {skill.evaluations.map((ev, i) => (
                      <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {i === 0 && (
                          <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
                            <div className="text-sm">{skill.title}</div>
                          </td>
                        )}
                        {i === 0 && (
                          <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                            <div className="text-xs text-gray-600">{skill.description}</div>
                          </td>
                        )}

                        <td className="border p-2 text-center align-top">{ev}</td>
                        <td className="border p-2 text-center align-top">{skill.sclValues[ev]}</td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m1 || ""} onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m2 || ""} onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m3 || ""} onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        {i === 0 && (
                          <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                            <select className="w-full text-sm p-1" value={state.appreciation || ""} onChange={(e) => changeGroupApp(skill.key, e.target.value)}>
                              <option value="">-</option>
                              {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded p-4 text-xs">
            <div className="font-semibold mb-2">Observations de l'Enseignante</div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Progrès significatifs dans le langage</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Bonnes interactions sociales</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">↗</span>
                <span className="text-sm">À encourager en motricité fine</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Légende des Appréciations</div>
              <ul className="list-disc ml-5 text-xs">
                <li><strong>Acquis</strong> — L'enfant a maîtrisé la compétence.</li>
                <li><strong>En cours d'acquisition</strong> — En progression.</li>
                <li><strong>Expert</strong> — Performance au-dessus des attentes.</li>
                <li><strong>Non acquis</strong> — Compétence non encore acquise.</li>
              </ul>
            </div>
          </div>

          <div className="border rounded p-4 text-sm">
            <div className="font-semibold mb-2">Périodes d'Évaluation</div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Bilan Périodique</div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Moyenne Générale</div>
                <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Appréciation Générale</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.overallAppreciation}
                  onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
                >
                  <option value="">- Sélectionner -</option>
                  <option>Non acquis</option>
                  <option>En cours d'acquisition</option>
                  <option>Acquis</option>
                  <option>Expert</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Progression</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.position}
                  onChange={(e) => changeSummary("position", e.target.value)}
                >
                  <option value="">- Sélectionner -</option>
                  <option>Excellente progression</option>
                  <option>Bonne progression</option>
                  <option>Progression normale</option>
                  <option>Progression à soutenir</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Passage</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.decision}
                  onChange={(e) => changeSummary("decision", e.target.value)}
                >
                  <option value="">- Sélectionner -</option>
                  <option>Passe en section supérieure</option>
                  <option>Maintien recommandé</option>
                  <option>À suivre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignante</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature et cachet
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Directeur</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature et cachet
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa des Parents</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature et date
            </div>
          </div>
        </div>

        <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
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
              onClick={handleReset}
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