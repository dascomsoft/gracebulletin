

// import React, { useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const MOIS_OPTIONS = Array.from({ length: 10 }, (_, i) => `Mois-${i + 1}`);
// const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
// const APPRECIATIONS = ["Non acquis", "En cours d'acquisition", "Expert", "Acquis"];
// const APPRECIATIONS_MOIS = ["A", "NS", "A+"];

// const COMPETENCES_TEMPLATE = [
//     {
//         key: "1A",
//         title: "1A- Communiquer en Anglais",
//         description: "Écoute - expression orale - écriture - lecture",
//         sclValues: { Attitude: 5, Oral: 20, Écrit: 15 },
//         evaluations: ["Attitude", "Oral", "Écrit"]
//     },
//     {
//         key: "1B",
//         title: "1B- Communiquer en Français",
//         description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
//         sclValues: { Attitude: 5, Oral: 20, Écrit: 15 },
//         evaluations: ["Attitude", "Oral", "Écrit"]
//     },
//     {
//         key: "1C",
//         title: "1C- Communiquer dans une Langue Nationale",
//         description: "Coutumes - traditions - mode de vie - interprétation des phénomènes",
//         sclValues: { Oral: 15, Pratique: 5 },
//         evaluations: ["Oral", "Pratique"]
//     },
//     {
//         key: "2A",
//         title: "2A- Utiliser les Notions de Base en Mathématiques",
//         description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
//         sclValues: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 20 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "2B",
//         title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
//         description: "Éducation à la santé et à l'environnement - technologie et ingénierie",
//         sclValues: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 20 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "3A",
//         title: "3A- Pratiquer les Valeurs Sociales",
//         description: "Histoire et géographie",
//         sclValues: { Attitude: 10, Oral: 6, Pratique: 2, Écrit: 2 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "3B",
//         title: "3B- Pratiquer les Valeurs Civiques",
//         description: "Éducation civique - droits de l'homme - éducation morale",
//         sclValues: { Attitude: 10, Oral: 6, Pratique: 2, Écrit: 2 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "4A",
//         title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat dans les Études Professionnelles",
//         description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
//         sclValues: { Attitude: 2, Oral: 3, Pratique: 10, Écrit: 5 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "4B",
//         title: "4B- Démontrer l'autonomie, l'esprit d'initiative, la créativité et l'entreprenariat",
//         description: "Outils agricoles - agriculture et jardinage - élevage",
//         sclValues: { Attitude: 2, Oral: 3, Pratique: 10, Écrit: 5 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "5",
//         title: "5- Utiliser les Concepts de Base et les Outils des Technologies de l'Information et de la Communication",
//         description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
//         sclValues: { Attitude: 5, Oral: 5, Pratique: 20, Écrit: 10 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "6A",
//         title: "6-A Pratiquer les Activités Physiques et Sportives",
//         description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
//         sclValues: { Attitude: 3, Oral: 3, Pratique: 10, Écrit: 4 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     },
//     {
//         key: "6B",
//         title: "6-B Pratiquer les Activités Artistiques",
//         description: "Arts visuels - arts du spectacle",
//         sclValues: { Attitude: 4, Oral: 4, Pratique: 10, Écrit: 2 },
//         evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
//     }
// ];

// export default function BulletinForm() {
//     const navigate = useNavigate();

//     // Fonction pour charger les données sauvegardées
//     const loadSavedData = () => {
//         try {
//             const saved = localStorage.getItem('bulletinFormData');
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
//             localStorage.setItem('bulletinFormData', JSON.stringify(data));
//         } catch (error) {
//             console.error('Erreur lors de la sauvegarde des données:', error);
//         }
//     };

//     // Fonction pour effacer les données sauvegardées
//     const clearSavedData = () => {
//         try {
//             localStorage.removeItem('bulletinFormData');
//         } catch (error) {
//             console.error('Erreur lors de la suppression des données:', error);
//         }
//     };

//     // Charger les données sauvegardées au montage du composant
//     const savedData = loadSavedData();

//     const [entetesPeriodes, setEntetesPeriodes] = useState(
//         savedData?.entetesPeriodes || { h1: MOIS_OPTIONS[0], h2: MOIS_OPTIONS[1], h3: MOIS_OPTIONS[2] }
//     );

//     const [meta, setMeta] = useState(savedData?.meta || {
//         nomEleve: "",
//         sexe: "",
//         classe: "",
//         niveau: "",
//         trimestre: "",
//         anneeScolaire: "",
//         enseignant: ""
//     });

//     const [donnees, setDonnees] = useState(() => {
//         if (savedData?.donnees) {
//             return savedData.donnees;
//         } else {
//             const racine = {};
//             COMPETENCES_TEMPLATE.forEach(s => {
//                 const evaluations = {};
//                 s.evaluations.forEach(ev => (evaluations[ev] = { m1: "", m2: "", m3: "" }));
//                 racine[s.key] = { appreciation: "", evaluations };
//             });
//             return racine;
//         }
//     });

//     const [infoPeriodes, setInfoPeriodes] = useState(savedData?.infoPeriodes || {
//         pos1: "", pos2: "", pos3: "",
//         app1: "", app2: "", app3: ""
//     });

//     // État pour le résumé
//     const [resume, setResume] = useState(savedData?.resume || {
//         appreciationGlobale: "",
//         position: "",
//         decision: ""
//     });

//     // Sauvegarder les données à chaque changement
//     useEffect(() => {
//         const formData = {
//             entetesPeriodes,
//             meta,
//             donnees,
//             infoPeriodes,
//             resume
//         };
//         saveData(formData);
//     }, [entetesPeriodes, meta, donnees, infoPeriodes, resume]);

//     const changerEntete = (k, v) => setEntetesPeriodes(p => ({ ...p, [k]: v }));
//     const changerMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

//     const changerNote = (cleCompetence, labelEvaluation, cleMois, valeur) => {
//         setDonnees(prev => ({
//             ...prev,
//             [cleCompetence]: {
//                 ...prev[cleCompetence],
//                 evaluations: {
//                     ...prev[cleCompetence].evaluations,
//                     [labelEvaluation]: { ...prev[cleCompetence].evaluations[labelEvaluation], [cleMois]: valeur ? Number(valeur) : "" }
//                 }
//             }
//         }));
//     };

//     const changerAppreciationGroupe = (cleCompetence, valeur) => {
//         setDonnees(prev => ({ ...prev, [cleCompetence]: { ...prev[cleCompetence], appreciation: valeur } }));
//     };

//     const changerInfoPeriode = (k, v) => setInfoPeriodes(p => ({ ...p, [k]: v }));

//     // Fonction pour changer le résumé
//     const changerResume = (k, v) => setResume(s => ({ ...s, [k]: v }));

//     // Calculs des totaux
//     const totaux = useMemo(() => {
//         let sommeNotes1 = 0, sommeNotes2 = 0, sommeNotes3 = 0;
//         let sommeSCL1 = 0, sommeSCL2 = 0, sommeSCL3 = 0;

//         COMPETENCES_TEMPLATE.forEach(competence => {
//             const donneesCompetence = donnees[competence.key];
//             competence.evaluations.forEach(ev => {
//                 const donneesEvaluation = donneesCompetence.evaluations[ev];

//                 if (donneesEvaluation.m1 !== "" && !isNaN(donneesEvaluation.m1)) {
//                     sommeNotes1 += Number(donneesEvaluation.m1);
//                     sommeSCL1 += competence.sclValues[ev];
//                 }

//                 if (donneesEvaluation.m2 !== "" && !isNaN(donneesEvaluation.m2)) {
//                     sommeNotes2 += Number(donneesEvaluation.m2);
//                     sommeSCL2 += competence.sclValues[ev];
//                 }

//                 if (donneesEvaluation.m3 !== "" && !isNaN(donneesEvaluation.m3)) {
//                     sommeNotes3 += Number(donneesEvaluation.m3);
//                     sommeSCL3 += competence.sclValues[ev];
//                 }
//             });
//         });

//         return {
//             t1: `${sommeNotes1}/${sommeSCL1}`,
//             t2: `${sommeNotes2}/${sommeSCL2}`,
//             t3: `${sommeNotes3}/${sommeSCL3}`,
//             brut: { sommeNotes1, sommeSCL1, sommeNotes2, sommeSCL2, sommeNotes3, sommeSCL3 }
//         };
//     }, [donnees]);

//     // Calculs des moyennes
//     const moyennes = useMemo(() => {
//         const { sommeNotes1, sommeSCL1, sommeNotes2, sommeSCL2, sommeNotes3, sommeSCL3 } = totaux.brut;

//         const m1 = sommeSCL1 > 0 ? Math.round((sommeNotes1 / sommeSCL1) * 20 * 100) / 100 : 0;
//         const m2 = sommeSCL2 > 0 ? Math.round((sommeNotes2 / sommeSCL2) * 20 * 100) / 100 : 0;
//         const m3 = sommeSCL3 > 0 ? Math.round((sommeNotes3 / sommeSCL3) * 20 * 100) / 100 : 0;

//         return {
//             m1: sommeSCL1 > 0 ? `${m1}/20` : "0/20",
//             m2: sommeSCL2 > 0 ? `${m2}/20` : "0/20",
//             m3: sommeSCL3 > 0 ? `${m3}/20` : "0/20",
//             brut: { m1, m2, m3 }
//         };
//     }, [totaux]);

//     // calcul moyenne générale
//     const moyenneGenerale = useMemo(() => {
//         const { m1, m2, m3 } = moyennes.brut;
//         const moyenne = Math.round(((m1 + m2 + m3) / 3) * 100) / 100;
//         return `${moyenne}/20`;
//     }, [moyennes]);

//     const handleApercu = () => {
//         const payload = {
//             meta,
//             entetesPeriodes,
//             donnees,
//             totaux,
//             moyennes,
//             infoPeriodes,
//             moyenneGenerale,
//             resume
//         };
//         // Sauvegarder avant de naviguer
//         saveData(payload);
//         navigate("/apercu-primaire", { state: payload });
//     };

//     const handleReinitialiser = () => {
//         if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
//             clearSavedData();
//             window.location.reload();
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//             {/* En-tête */}
//             <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//                 <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-sta">
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
//                 {/* Champs d'information */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
//                     <input className="border px-3 py-2 rounded" placeholder="Nom complet" value={meta.nomEleve} onChange={(e) => changerMeta("nomEleve", e.target.value)} />
//                     <select className="border px-3 py-2 rounded" value={meta.sexe} onChange={e => changerMeta("sexe", e.target.value)}>
//                         <option value="">Sexe</option>
//                         <option>Masculin</option>
//                         <option>Féminin</option>
//                     </select>
//                     <select className="border px-3 py-2 rounded" value={meta.classe} onChange={e => changerMeta("classe", e.target.value)}>
//                         <option value="">Classe</option>
//                         <option>SIL</option>
//                         <option>CP</option>
//                         <option>CE1</option>
//                         <option>CE2</option>
//                         <option>CM1</option>
//                         <option>CM2</option>
//                         <option>Class 1</option>
//                         <option>Class 2</option>
//                         <option>Class 3</option>
//                         <option>Class 4</option>
//                         <option>Class 5</option>
//                         <option>Class 6</option>
//                     </select>

//                     <select className="border px-3 py-2 rounded" value={meta.niveau} onChange={e => changerMeta("niveau", e.target.value)}>
//                         <option value="">Niveau</option>
//                         <option>Niveau 1</option>
//                         <option>Niveau 2</option>
//                         <option>Niveau 3</option>
//                         <option>Niveau 4</option>
//                         <option>Niveau 5</option>
//                         <option>Niveau 6</option>
//                     </select>

//                     <select className="border px-3 py-2 rounded" value={meta.trimestre} onChange={e => changerMeta("trimestre", e.target.value)}>
//                         <option value="">Trimestre</option>
//                         <option>Trimestre 1</option>
//                         <option>Trimestre 2</option>
//                         <option>Trimestre 3</option>
//                     </select>

//                     <select className="border px-3 py-2 rounded" value={meta.anneeScolaire} onChange={e => changerMeta("anneeScolaire", e.target.value)}>
//                         <option value="">Année Scolaire</option>
//                         {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
//                     </select>

//                     <input className="border px-3 py-2 rounded" placeholder="Enseignant" value={meta.enseignant} onChange={e => changerMeta("enseignant", e.target.value)} />
//                 </div>

//                 {/* Début du tableau */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border p-2 w-36">Compétences</th>
//                                 <th className="border p-2 w-96">Description</th>
//                                 <th className="border p-2 text-center w-20">Évaluation</th>
//                                 <th className="border p-2 text-center w-14">SCl</th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h1} onChange={(e) => changerEntete("h1", e.target.value)}>
//                                         {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h2} onChange={(e) => changerEntete("h2", e.target.value)}>
//                                         {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={entetesPeriodes.h3} onChange={(e) => changerEntete("h3", e.target.value)}>
//                                         {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-28">Appréciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {COMPETENCES_TEMPLATE.map(competence => {
//                                 const state = donnees[competence.key];
//                                 return (
//                                     <React.Fragment key={competence.key}>
//                                         {competence.evaluations.map((ev, i) => (
//                                             <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top font-semibold" rowSpan={competence.evaluations.length}>
//                                                         <div className="text-sm">{competence.title}</div>
//                                                     </td>
//                                                 )}
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={competence.evaluations.length}>
//                                                         <div className="text-xs text-gray-600">{competence.description}</div>
//                                                     </td>
//                                                 )}

//                                                 <td className="border p-2 text-center align-top">{ev}</td>

//                                                 {/* SCl: afficher la valeur SCl correspondante */}
//                                                 <td className="border p-2 text-center align-top">{competence.sclValues[ev]}</td>

//                                                 {/* sélections des mois */}
//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evaluations[ev].m1 || ""} onChange={(e) => changerNote(competence.key, ev, "m1", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evaluations[ev].m2 || ""} onChange={(e) => changerNote(competence.key, ev, "m2", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evaluations[ev].m3 || ""} onChange={(e) => changerNote(competence.key, ev, "m3", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={competence.evaluations.length}>
//                                                         <select className="w-full text-sm p-1" value={state.appreciation || ""} onChange={(e) => changerAppreciationGroupe(competence.key, e.target.value)}>
//                                                             <option value="">-</option>
//                                                             {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                                         </select>
//                                                     </td>
//                                                 )}
//                                             </tr>
//                                         ))}
//                                     </React.Fragment>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Légende des Appréciations + Périodes */}
//                 <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Légende des Appréciations */}
//                     <div className="border rounded p-4 text-xs">
//                         <div className="font-semibold mb-2">Légende des Appréciations</div>
//                         <ul className="list-disc ml-5">
//                             <li><strong>Acquis</strong> — L'élève a maîtrisé la compétence.</li>
//                             <li><strong>En cours d'acquisition</strong> — Progression mais pas encore maîtrisé.</li>
//                             <li><strong>Expert</strong> — Performance au-dessus des attentes.</li>
//                             <li><strong>Non acquis</strong> — Compétence pas encore acquise.</li>
//                         </ul>
//                     </div>

//                     {/* Périodes */}
//                     <div className="border rounded p-4 text-sm">
//                         <div className="font-semibold mb-2">Périodes</div>

//                         <div className="grid grid-cols-3 gap-2 text-xs mb-3">
//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={entetesPeriodes.h1} onChange={e => changerEntete("h1", e.target.value)}>
//                                     {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>

//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={entetesPeriodes.h2} onChange={e => changerEntete("h2", e.target.value)}>
//                                     {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>

//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={entetesPeriodes.h3} onChange={e => changerEntete("h3", e.target.value)}>
//                                     {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Totaux (auto) */}
//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totaux</div>
//                                 <div className="font-semibold mt-1">{totaux.t1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totaux</div>
//                                 <div className="font-semibold mt-1">{totaux.t2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totaux</div>
//                                 <div className="font-semibold mt-1">{totaux.t3}</div>
//                             </div>
//                         </div>

//                         {/* Moyenne par mois (auto, sur 20) */}
//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Moyenne (/20)</div>
//                                 <div className="font-semibold mt-1">{moyennes.m1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Moyenne (/20)</div>
//                                 <div className="font-semibold mt-1">{moyennes.m2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Moyenne (/20)</div>
//                                 <div className="font-semibold mt-1">{moyennes.m3}</div>
//                             </div>
//                         </div>

//                         {/* Appréciation par mois (A / NS / A+) */}
//                         <div className="grid grid-cols-3 gap-2 text-xs">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Appréciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={infoPeriodes.app1} onChange={(e) => changerInfoPeriode("app1", e.target.value)}>
//                                     <option value="">-</option>
//                                     {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>

//                             <div className="text-center">
//                                 <div className="text-gray-600">Appréciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={infoPeriodes.app2} onChange={(e) => changerInfoPeriode("app2", e.target.value)}>
//                                     <option value="">-</option>
//                                     {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>

//                             <div className="text-center">
//                                 <div className="text-gray-600">Appréciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={infoPeriodes.app3} onChange={(e) => changerInfoPeriode("app3", e.target.value)}>
//                                     <option value="">-</option>
//                                     {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Résumé + Signatures - VERSION COMPACTE */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                     {/* Résumé du Travail - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé</div>

//                         <div className="space-y-3">
//                             <div className="text-center">
//                                 <div className="text-xs text-gray-600 mb-1">Moyenne Générale</div>
//                                 <div className="text-lg font-bold text-blue-700">{moyenneGenerale}</div>
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Appréciation</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={resume.appreciationGlobale}
//                                     onChange={(e) => changerResume("appreciationGlobale", e.target.value)}
//                                 >
//                                     <option value="">- Sélectionner -</option>
//                                     <option>Non acquis</option>
//                                     <option>En cours d'acquisition</option>
//                                     <option>Acquis</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Position</div>
//                                 <input
//                                     className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={resume.position}
//                                     onChange={(e) => changerResume("position", e.target.value)}
//                                     placeholder="Ex: 5ème/30"
//                                 />
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Décision</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={resume.decision}
//                                     onChange={(e) => changerResume("decision", e.target.value)}
//                                 >
//                                     <option value="">- Sélectionner -</option>
//                                     <option>Admis</option>
//                                     <option>Ajourné</option>
//                                     <option>Redouble</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Visa de l'Enseignant - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
//                     </div>

//                     {/* Visa du Directeur - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Directeur</div>
//                     </div>

//                     {/* Visa du Parent - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
//                     </div>
//                 </div>

//                 {/* Information de Contact - En dessous des signatures */}
//                 <div className="mt-20 text-center text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="font-bold text-blue-800 mb-2">Informations de l'École</div>
//                     <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//                         <div><strong>Téléphone:</strong> +237 696 308 503</div>
//                         <div><strong>Siège Social:</strong> Yaoundé - Nkolbisson (Quartier Mbouda)</div>
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
//                             onClick={handleReinitialiser}
//                             className="px-4 py-2 border rounded text-sm hover:bg-gray-100 transition w-full sm:w-auto"
//                         >
//                             Réinitialiser
//                         </button>
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






































































































import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MOIS_OPTIONS = Array.from({ length: 10 }, (_, i) => `Mois-${i + 1}`);
const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
const APPRECIATIONS = ["Non acquis", "En cours d'acquisition", "Expert", "Acquis"];
const APPRECIATIONS_MOIS = ["A", "NS", "A+"];

const COMPETENCES_TEMPLATE = [
    {
        key: "1A",
        title: "1A- Communiquer en Anglais",
        description: "Écoute - expression orale - écriture - lecture",
        sclValues: { Attitude: 5, Oral: 20, Écrit: 15 },
        evaluations: ["Attitude", "Oral", "Écrit"]
    },
    {
        key: "1B",
        title: "1B- Communiquer en Français",
        description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
        sclValues: { Attitude: 5, Oral: 20, Écrit: 15 },
        evaluations: ["Attitude", "Oral", "Écrit"]
    },
    {
        key: "1C",
        title: "1C- Communiquer dans une Langue Nationale",
        description: "Coutumes - traditions - mode de vie - interprétation des phénomènes",
        sclValues: { Oral: 15, Pratique: 5 },
        evaluations: ["Oral", "Pratique"]
    },
    {
        key: "2A",
        title: "2A- Utiliser les Notions de Base en Mathématiques",
        description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
        sclValues: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 20 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "2B",
        title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
        description: "Éducation à la santé et à l'environnement - technologie et ingénierie",
        sclValues: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 20 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "3A",
        title: "3A- Pratiquer les Valeurs Sociales",
        description: "Histoire et géographie",
        sclValues: { Attitude: 10, Oral: 6, Pratique: 2, Écrit: 2 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "3B",
        title: "3B- Pratiquer les Valeurs Civiques",
        description: "Éducation civique - droits de l'homme - éducation morale",
        sclValues: { Attitude: 10, Oral: 6, Pratique: 2, Écrit: 2 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "4A",
        title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat dans les Études Professionnelles",
        description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
        sclValues: { Attitude: 2, Oral: 3, Pratique: 10, Écrit: 5 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "4B",
        title: "4B- Démontrer l'autonomie, l'esprit d'initiative, la créativité et l'entreprenariat",
        description: "Outils agricoles - agriculture et jardinage - élevage",
        sclValues: { Attitude: 2, Oral: 3, Pratique: 10, Écrit: 5 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "5",
        title: "5- Utiliser les Concepts de Base et les Outils des Technologies de l'Information et de la Communication",
        description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
        sclValues: { Attitude: 5, Oral: 5, Pratique: 20, Écrit: 10 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "6A",
        title: "6-A Pratiquer les Activités Physiques et Sportives",
        description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
        sclValues: { Attitude: 3, Oral: 3, Pratique: 10, Écrit: 4 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    },
    {
        key: "6B",
        title: "6-B Pratiquer les Activités Artistiques",
        description: "Arts visuels - arts du spectacle",
        sclValues: { Attitude: 4, Oral: 4, Pratique: 10, Écrit: 2 },
        evaluations: ["Attitude", "Oral", "Pratique", "Écrit"]
    }
];

export default function BulletinForm() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Fonction pour charger les données sauvegardées
    const loadSavedData = () => {
        try {
            const saved = localStorage.getItem('bulletinFormData');
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
            localStorage.setItem('bulletinFormData', JSON.stringify(data));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    // Fonction pour effacer les données sauvegardées
    const clearSavedData = () => {
        try {
            localStorage.removeItem('bulletinFormData');
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
        }
    };

    // Charger les données sauvegardées au montage du composant
    const savedData = loadSavedData();

    const [entetesPeriodes, setEntetesPeriodes] = useState(
        savedData?.entetesPeriodes || { h1: MOIS_OPTIONS[0], h2: MOIS_OPTIONS[1], h3: MOIS_OPTIONS[2] }
    );

    const [meta, setMeta] = useState(savedData?.meta || {
        nomEleve: "",
        sexe: "",
        classe: "",
        niveau: "",
        trimestre: "",
        anneeScolaire: "",
        enseignant: ""
    });

    const [donnees, setDonnees] = useState(() => {
        if (savedData?.donnees) {
            return savedData.donnees;
        } else {
            const racine = {};
            COMPETENCES_TEMPLATE.forEach(s => {
                const evaluations = {};
                s.evaluations.forEach(ev => (evaluations[ev] = { m1: "", m2: "", m3: "" }));
                racine[s.key] = { appreciation: "", evaluations };
            });
            return racine;
        }
    });

    const [infoPeriodes, setInfoPeriodes] = useState(savedData?.infoPeriodes || {
        pos1: "", pos2: "", pos3: "",
        app1: "", app2: "", app3: ""
    });

    // État pour le résumé
    const [resume, setResume] = useState(savedData?.resume || {
        appreciationGlobale: "",
        position: "",
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
            infoPeriodes,
            resume,
            photoEleve
        };
        saveData(formData);
    }, [entetesPeriodes, meta, donnees, infoPeriodes, resume, photoEleve]);

    const changerEntete = (k, v) => setEntetesPeriodes(p => ({ ...p, [k]: v }));
    const changerMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

    const changerNote = (cleCompetence, labelEvaluation, cleMois, valeur) => {
        setDonnees(prev => ({
            ...prev,
            [cleCompetence]: {
                ...prev[cleCompetence],
                evaluations: {
                    ...prev[cleCompetence].evaluations,
                    [labelEvaluation]: { ...prev[cleCompetence].evaluations[labelEvaluation], [cleMois]: valeur ? Number(valeur) : "" }
                }
            }
        }));
    };

    const changerAppreciationGroupe = (cleCompetence, valeur) => {
        setDonnees(prev => ({ ...prev, [cleCompetence]: { ...prev[cleCompetence], appreciation: valeur } }));
    };

    const changerInfoPeriode = (k, v) => setInfoPeriodes(p => ({ ...p, [k]: v }));

    // Fonction pour changer le résumé
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

    // Calculs des totaux
    const totaux = useMemo(() => {
        let sommeNotes1 = 0, sommeNotes2 = 0, sommeNotes3 = 0;
        let sommeSCL1 = 0, sommeSCL2 = 0, sommeSCL3 = 0;

        COMPETENCES_TEMPLATE.forEach(competence => {
            const donneesCompetence = donnees[competence.key];
            competence.evaluations.forEach(ev => {
                const donneesEvaluation = donneesCompetence.evaluations[ev];

                if (donneesEvaluation.m1 !== "" && !isNaN(donneesEvaluation.m1)) {
                    sommeNotes1 += Number(donneesEvaluation.m1);
                    sommeSCL1 += competence.sclValues[ev];
                }

                if (donneesEvaluation.m2 !== "" && !isNaN(donneesEvaluation.m2)) {
                    sommeNotes2 += Number(donneesEvaluation.m2);
                    sommeSCL2 += competence.sclValues[ev];
                }

                if (donneesEvaluation.m3 !== "" && !isNaN(donneesEvaluation.m3)) {
                    sommeNotes3 += Number(donneesEvaluation.m3);
                    sommeSCL3 += competence.sclValues[ev];
                }
            });
        });

        return {
            t1: `${sommeNotes1}/${sommeSCL1}`,
            t2: `${sommeNotes2}/${sommeSCL2}`,
            t3: `${sommeNotes3}/${sommeSCL3}`,
            brut: { sommeNotes1, sommeSCL1, sommeNotes2, sommeSCL2, sommeNotes3, sommeSCL3 }
        };
    }, [donnees]);

    // Calculs des moyennes
    const moyennes = useMemo(() => {
        const { sommeNotes1, sommeSCL1, sommeNotes2, sommeSCL2, sommeNotes3, sommeSCL3 } = totaux.brut;

        const m1 = sommeSCL1 > 0 ? Math.round((sommeNotes1 / sommeSCL1) * 20 * 100) / 100 : 0;
        const m2 = sommeSCL2 > 0 ? Math.round((sommeNotes2 / sommeSCL2) * 20 * 100) / 100 : 0;
        const m3 = sommeSCL3 > 0 ? Math.round((sommeNotes3 / sommeSCL3) * 20 * 100) / 100 : 0;

        return {
            m1: sommeSCL1 > 0 ? `${m1}/20` : "0/20",
            m2: sommeSCL2 > 0 ? `${m2}/20` : "0/20",
            m3: sommeSCL3 > 0 ? `${m3}/20` : "0/20",
            brut: { m1, m2, m3 }
        };
    }, [totaux]);

    // calcul moyenne générale
    const moyenneGenerale = useMemo(() => {
        const { m1, m2, m3 } = moyennes.brut;
        const moyenne = Math.round(((m1 + m2 + m3) / 3) * 100) / 100;
        return `${moyenne}/20`;
    }, [moyennes]);

    const handleApercu = () => {
        const payload = {
            meta,
            entetesPeriodes,
            donnees,
            totaux,
            moyennes,
            infoPeriodes,
            moyenneGenerale,
            resume,
            photoEleve
        };
        // Sauvegarder avant de naviguer
        saveData(payload);
        navigate("/apercu-primaire", { state: payload });
    };

    const handleReinitialiser = () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
            clearSavedData();
            window.location.reload();
        }
    };

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
                <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-sta">
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
                            <option>SIL</option>
                            <option>CP</option>
                            <option>CE1</option>
                            <option>CE2</option>
                            <option>CM1</option>
                            <option>CM2</option>
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>
                            <option>Class 5</option>
                            <option>Class 6</option>
                        </select>

                        <select 
                            className="border px-3 py-2 rounded" 
                            value={meta.niveau} 
                            onChange={e => changerMeta("niveau", e.target.value)}
                        >
                            <option value="">Niveau</option>
                            <option>Niveau 1</option>
                            <option>Niveau 2</option>
                            <option>Niveau 3</option>
                            <option>Niveau 4</option>
                            <option>Niveau 5</option>
                            <option>Niveau 6</option>
                        </select>

                        <select 
                            className="border px-3 py-2 rounded" 
                            value={meta.trimestre} 
                            onChange={e => changerMeta("trimestre", e.target.value)}
                        >
                            <option value="">Trimestre</option>
                            <option>Trimestre 1</option>
                            <option>Trimestre 2</option>
                            <option>Trimestre 3</option>
                        </select>

                        <select 
                            className="border px-3 py-2 rounded" 
                            value={meta.anneeScolaire} 
                            onChange={e => changerMeta("anneeScolaire", e.target.value)}
                        >
                            <option value="">Année Scolaire</option>
                            {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => (
                                <option key={y}>{y}-{y + 1}</option>
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
                                <th className="border p-2 w-36">Compétences</th>
                                <th className="border p-2 w-96">Description</th>
                                <th className="border p-2 text-center w-20">Évaluation</th>
                                <th className="border p-2 text-center w-14">SCl</th>
                                <th className="border p-2 text-center w-24">
                                    <select 
                                        className="text-xs" 
                                        value={entetesPeriodes.h1} 
                                        onChange={(e) => changerEntete("h1", e.target.value)}
                                    >
                                        {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-24">
                                    <select 
                                        className="text-xs" 
                                        value={entetesPeriodes.h2} 
                                        onChange={(e) => changerEntete("h2", e.target.value)}
                                    >
                                        {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-24">
                                    <select 
                                        className="text-xs" 
                                        value={entetesPeriodes.h3} 
                                        onChange={(e) => changerEntete("h3", e.target.value)}
                                    >
                                        {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border p-2 text-center w-28">Appréciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {COMPETENCES_TEMPLATE.map(competence => {
                                const state = donnees[competence.key];
                                return (
                                    <React.Fragment key={competence.key}>
                                        {competence.evaluations.map((ev, i) => (
                                            <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                {i === 0 && (
                                                    <td className="border p-2 align-top font-semibold" rowSpan={competence.evaluations.length}>
                                                        <div className="text-sm">{competence.title}</div>
                                                    </td>
                                                )}
                                                {i === 0 && (
                                                    <td className="border p-2 align-top" rowSpan={competence.evaluations.length}>
                                                        <div className="text-xs text-gray-600">{competence.description}</div>
                                                    </td>
                                                )}

                                                <td className="border p-2 text-center align-top">{ev}</td>

                                                {/* SCl: afficher la valeur SCl correspondante */}
                                                <td className="border p-2 text-center align-top">{competence.sclValues[ev]}</td>

                                                {/* sélections des mois */}
                                                <td className="border p-1 text-center">
                                                    <select 
                                                        className="w-full text-xs p-1" 
                                                        value={state.evaluations[ev].m1 || ""} 
                                                        onChange={(e) => changerNote(competence.key, ev, "m1", e.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                                                    </select>
                                                </td>

                                                <td className="border p-1 text-center">
                                                    <select 
                                                        className="w-full text-xs p-1" 
                                                        value={state.evaluations[ev].m2 || ""} 
                                                        onChange={(e) => changerNote(competence.key, ev, "m2", e.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                                                    </select>
                                                </td>

                                                <td className="border p-1 text-center">
                                                    <select 
                                                        className="w-full text-xs p-1" 
                                                        value={state.evaluations[ev].m3 || ""} 
                                                        onChange={(e) => changerNote(competence.key, ev, "m3", e.target.value)}
                                                    >
                                                        <option value="">-</option>
                                                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                                                    </select>
                                                </td>

                                                {i === 0 && (
                                                    <td className="border p-2 align-top" rowSpan={competence.evaluations.length}>
                                                        <select 
                                                            className="w-full text-sm p-1" 
                                                            value={state.appreciation || ""} 
                                                            onChange={(e) => changerAppreciationGroupe(competence.key, e.target.value)}
                                                        >
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

                {/* Légende des Appréciations + Périodes */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Légende des Appréciations */}
                    <div className="border rounded p-4 text-xs">
                        <div className="font-semibold mb-2">Légende des Appréciations</div>
                        <ul className="list-disc ml-5">
                            <li><strong>Acquis</strong> — L'élève a maîtrisé la compétence.</li>
                            <li><strong>En cours d'acquisition</strong> — Progression mais pas encore maîtrisé.</li>
                            <li><strong>Expert</strong> — Performance au-dessus des attentes.</li>
                            <li><strong>Non acquis</strong> — Compétence pas encore acquise.</li>
                        </ul>
                    </div>

                    {/* Périodes */}
                    <div className="border rounded p-4 text-sm">
                        <div className="font-semibold mb-2">Périodes</div>

                        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                            <div>
                                <select 
                                    className="w-full border px-2 py-1 rounded text-sm" 
                                    value={entetesPeriodes.h1} 
                                    onChange={e => changerEntete("h1", e.target.value)}
                                >
                                    {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>

                            <div>
                                <select 
                                    className="w-full border px-2 py-1 rounded text-sm" 
                                    value={entetesPeriodes.h2} 
                                    onChange={e => changerEntete("h2", e.target.value)}
                                >
                                    {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>

                            <div>
                                <select 
                                    className="w-full border px-2 py-1 rounded text-sm" 
                                    value={entetesPeriodes.h3} 
                                    onChange={e => changerEntete("h3", e.target.value)}
                                >
                                    {MOIS_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Totaux (auto) */}
                        <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
                            <div className="text-center">
                                <div className="text-gray-600">Totaux</div>
                                <div className="font-semibold mt-1">{totaux.t1}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Totaux</div>
                                <div className="font-semibold mt-1">{totaux.t2}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Totaux</div>
                                <div className="font-semibold mt-1">{totaux.t3}</div>
                            </div>
                        </div>

                        {/* Moyenne par mois (auto, sur 20) */}
                        <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
                            <div className="text-center">
                                <div className="text-gray-600">Moyenne (/20)</div>
                                <div className="font-semibold mt-1">{moyennes.m1}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Moyenne (/20)</div>
                                <div className="font-semibold mt-1">{moyennes.m2}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600">Moyenne (/20)</div>
                                <div className="font-semibold mt-1">{moyennes.m3}</div>
                            </div>
                        </div>

                        {/* Appréciation par mois (A / NS / A+) */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                                <div className="text-gray-600">Appréciation</div>
                                <select 
                                    className="mt-1 w-full border px-2 py-1 rounded text-sm" 
                                    value={infoPeriodes.app1} 
                                    onChange={(e) => changerInfoPeriode("app1", e.target.value)}
                                >
                                    <option value="">-</option>
                                    {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
                                </select>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-600">Appréciation</div>
                                <select 
                                    className="mt-1 w-full border px-2 py-1 rounded text-sm" 
                                    value={infoPeriodes.app2} 
                                    onChange={(e) => changerInfoPeriode("app2", e.target.value)}
                                >
                                    <option value="">-</option>
                                    {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
                                </select>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-600">Appréciation</div>
                                <select 
                                    className="mt-1 w-full border px-2 py-1 rounded text-sm" 
                                    value={infoPeriodes.app3} 
                                    onChange={(e) => changerInfoPeriode("app3", e.target.value)}
                                >
                                    <option value="">-</option>
                                    {APPRECIATIONS_MOIS.map(a => <option key={a}>{a}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Résumé + Signatures - VERSION COMPACTE */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Résumé du Travail - Compact */}
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé</div>

                        <div className="space-y-3">
                            <div className="text-center">
                                <div className="text-xs text-gray-600 mb-1">Moyenne Générale</div>
                                <div className="text-lg font-bold text-blue-700">{moyenneGenerale}</div>
                            </div>

                            <div>
                                <div className="text-xs font-medium mb-1">Appréciation</div>
                                <select
                                    className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={resume.appreciationGlobale}
                                    onChange={(e) => changerResume("appreciationGlobale", e.target.value)}
                                >
                                    <option value="">- Sélectionner -</option>
                                    <option>Non acquis</option>
                                    <option>En cours d'acquisition</option>
                                    <option>Acquis</option>
                                    <option>Expert</option>
                                </select>
                            </div>

                            <div>
                                <div className="text-xs font-medium mb-1">Position</div>
                                <input
                                    className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={resume.position}
                                    onChange={(e) => changerResume("position", e.target.value)}
                                    placeholder="Ex: 5ème/30"
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
                                    <option>Admis</option>
                                    <option>Ajourné</option>
                                    <option>Redouble</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Visa de l'Enseignant - Compact */}
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
                    </div>

                    {/* Visa du Directeur - Compact */}
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Directeur</div>
                    </div>

                    {/* Visa du Parent - Compact */}
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
                    </div>
                </div>

                {/* Information de Contact - En dessous des signatures */}
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