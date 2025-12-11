
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const BulletinPreview = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const {
//         meta,
//         entetesPeriodes,
//         donnees,
//         totaux,
//         moyennes,
//         infoPeriodes,
//         moyenneGenerale,
//         resume,
//         photoEleve
//     } = location.state || {};

//     const handlePrint = () => {
//         window.print();
//     };

//     const handleDownload = () => {
//         window.print();
//     };

//     const handleBackToEdit = () => {
//         navigate(-1);
//     };

//     const handleFinalSubmit = () => {
//         if (confirm("Êtes-vous sûr de vouloir finaliser et vider le formulaire ?")) {
//             localStorage.removeItem('bulletinFormData');
//             navigate("/dashboard");
//         }
//     };

//     // CORRIGÉ : Template aligné EXACTEMENT avec le formulaire
//     const COMPETENCES_TEMPLATE_PREVIEW = [
//         {
//             key: "1A",
//             title: "1A- Communiquer en Anglais",
//             description: "Écoute - expression orale - écriture - lecture",
//             Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
//             evaluations: ["Savoir-être", "Oral", "Écrit"]
//         },
//         {
//             key: "1B",
//             title: "1B- Communiquer en Français",
//             description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
//             Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
//             evaluations: ["Savoir-être", "Oral", "Écrit"]
//         },
//         {
//             key: "1C",
//             title: "1C- Pratiguer une Langue Nationale",
//             description: "Coutumes - traditions - mode de vie - interprétation des phénomènes",
//             Notes: { "Savoir-être": 2, Oral: 10, Pratique: 2, Écrit: 6 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "2A",
//             title: "2A- Utiliser les Notions de Base en Mathématiques",
//             description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
//             Notes: { "Savoir-être": 4, Oral: 8, Écrit: 28 },
//             evaluations: ["Savoir-être", "Oral", "Écrit"]
//         },
//         {
//             key: "2B",
//             title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
//             description: "Éducation à la santé et à l'environnement - technologie et ingénierie",
//             Notes: { "Savoir-être": 7, Oral: 6, Pratique: 20, Écrit: 7 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "3A",
//             title: "3A- Pratiquer les Valeurs Sociales",
//             description: "Histoire et géographie",
//             Notes: { "Savoir-être": 4, Oral: 3, Pratique: 5, Écrit: 8 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "3B",
//             title: "3B- Pratiquer les Valeurs Citoyennes",
//             description: "Éducation civique - droits de l'homme - éducation morale",
//             Notes: { "Savoir-être": 3, Oral: 3, Pratique: 5, Écrit: 9 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "4A",
//             title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat dans les Études Professionnelles",
//             description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
//             Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "4B",
//             title: "4B- Démontrer l'autonomie, l'esprit d'initiative, de créativité et d'entreprenariat",
//             description: "Outils agricoles - agriculture et jardinage - élevage",
//             Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "5",
//             title: "5- Utiliser les Concepts de Base et les Outils des Technologies de l'Information et de la Communication",
//             description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
//             Notes: { "Savoir-être": 6, Oral: 4, Pratique: 20, Écrit: 10 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "6A",
//             title: "6-A Pratiquer les Activités Physiques et Sportives pour les apprenants aptent",
//             description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
//             Notes: { "Savoir-être": 4, Oral: 2, Pratique: 12, Écrit: 2 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         },
//         {
//             key: "6B",
//             title: "6-B Pratiquer les Activités Physiques et Sportives pour les apprenants inaptent",
//             description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
//             Notes: { "Savoir-être": 2, Oral: 3, Écrit: 15 },
//             evaluations: ["Savoir-être", "Oral", "Écrit"]
//         },
//         {
//             key: "6C",
//             title: "6-C Pratiquer les Activités Artistiques",
//             description: "Arts visuels - arts du spectacle",
//             Notes: { "Savoir-être": 2, Oral: 2, Pratique: 12, Écrit: 4 },
//             evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//         }
//     ];

//     if (!location.state) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="text-xl font-bold text-red-600 mb-4">Aucune donnée trouvée</div>
//                     <button
//                         onClick={() => navigate("/")}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                     >
//                         Retour au Formulaire
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
//             {/* En-tête - invisible durant l'impression */}
//             <div className="w-full max-w-4xl mb-2 print:hidden">
//                 <div className="bg-blue-600 text-white p-2 rounded shadow">
//                     <h1 className="text-lg font-bold text-center">Aperçu du Bulletin</h1>
//                     <p className="text-center text-blue-100 text-xs">
//                         Vérifiez toutes les informations avant l'impression. Vos données sont automatiquement sauvegardées.
//                     </p>
//                 </div>
//             </div>

//             {/* Page principale - Conteneur d'impression */}
//             <div className="bg-white w-full max-w-4xl shadow-sm p-3 print:shadow-none print:max-w-full print:p-0 print:min-h-[27.7cm] print:overflow-hidden">

//                 {/* En-tête compact pour impression */}
//                 <div className="w-full mb-1 print:mb-0 print:pt-2 print:px-4 border-b border-gray-300 print:border-b print:pb-1">
//                     <div className="flex flex-col items-center text-gray-600 text-xs print:text-[9px] md:flex-row md:justify-between md:items-start">
//                         {/* Bloc gauche */}
//                         <div className="text-left mb-1 md:mb-0 md:w-1/3 print:w-1/3">
//                             <div className="font-bold text-[11px] sm:text-xs print:text-[9px]">RÉPUBLIQUE DU CAMEROUN</div>
//                             <div className="text-[9px] sm:text-[10px] print:text-[7px]">Paix-Travail-Patrie</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Ministère de l'Éducation de base</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Délégation Régionale du Centre</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Délégation Départementale du Mfoundi</div>
//                         </div>

//                         {/* Bloc centre */}
//                         <div className="text-center md:flex-1 md:mx-2 print:mx-1">
//                             <div className="font-extrabold text-sm sm:text-base print:text-[11px]">
//                                 GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
//                             </div>
//                             <div className="text-[13px] sm:text-[16px] print:text-[13px] font-bold">
//                                 BULLETIN SCOLAIRE
//                             </div>
//                         </div>

//                         {/* Bloc droite */}
//                         <div className="text-right mt-1 md:mt-0 md:w-1/3 print:w-1/3">
//                             <div className="font-bold text-[11px] sm:text-xs print:text-[9px]">REPUBLIC OF CAMEROON</div>
//                             <div className="text-[9px] sm:text-[10px] print:text-[7px]">Peace-Work-Fatherland</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Ministry of Basic Education</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Centre Regional Delegation</div>
//                             <div className="text-[10px] sm:text-xs print:text-[8px]">Divisional Delegation of Mfoundi Division</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Section Photo + Informations de l'Élève - Compact */}
//                 <div className="flex flex-col my-4 md:flex-row gap-2 mb-1 print:mb-0 print:gap-1 print:px-4 print:pt-1">
//                     {/* Zone Photo */}
//                     {photoEleve && (
//                         <div className="flex flex-col items-center md:w-1/6 print:w-1/6">
//                             <div className="w-16 h-16 print:w-12 print:h-12 border border-gray-300 rounded overflow-hidden mb-0.5">
//                                 <img
//                                     src={photoEleve}
//                                     alt="Photo de l'élève"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                             <div className="text-[8px] print:text-[6px] text-gray-500 text-center">
//                                 Photo
//                             </div>
//                         </div>
//                     )}

//                     {/* Informations de l'Élève - Compact */}
//                     <div className={`grid grid-cols-2 md:grid-cols-4 gap-1 text-xs print:text-[8px] ${photoEleve ? 'flex-1' : 'w-full'}`}>
//                         <div><strong className="font-extrabold">Nom:</strong> {meta.nomEleve || "-"}</div>
//                         <div><strong>Sexe:</strong> {meta.sexe || "-"}</div>
//                         <div><strong>Classe:</strong> {meta.classe || "-"}</div>
//                         <div><strong>Niveau:</strong> {meta.niveau || "-"}</div>
//                         <div><strong>Trimestre:</strong> {meta.trimestre || "-"}</div>
//                         <div><strong>Année:</strong> {meta.anneeScolaire || "-"}</div>
//                         <div className="md:col-span-2"><strong>Enseignant:</strong> {meta.enseignant || "-"}</div>
//                     </div>
//                 </div>

//                 {/* Tableau des Compétences - Ultra compact */}
//                 <div className="overflow-x-auto print:overflow-visible mb-1 print:mb-0 print:px-4">
//                     <table className="w-full text-[9px] print:text-[7px] border-collapse border border-gray-400">
//                         <thead>
//                             <tr className="bg-gray-200 print:bg-gray-200">
//                                 <th className="border border-gray-400 p-0.5 w-20 print:w-16">Compétences</th>
//                                 <th className="border border-gray-400 p-0.5 w-32 print:w-28">Description</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">Éval</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-8 print:w-6">Notes</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
//                                     {entetesPeriodes.h1}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
//                                     {entetesPeriodes.h2}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
//                                     {entetesPeriodes.h3}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-16 print:w-14">Appréciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {COMPETENCES_TEMPLATE_PREVIEW.map(competenceTemplate => {
//                                 const donneesCompetence = donnees[competenceTemplate.key];
                                
//                                 // Protection contre les données manquantes
//                                 if (!donneesCompetence) {
//                                     console.warn(`Données manquantes pour la compétence: ${competenceTemplate.key}`);
//                                     return null;
//                                 }

//                                 // Protection contre evaluations manquant
//                                 const evaluations = donneesCompetence.evaluations || {};

//                                 return (
//                                     <React.Fragment key={competenceTemplate.key}>
//                                         {competenceTemplate.evaluations.map((ev, i) => {
//                                             const evalData = evaluations[ev] || {};
                                            
//                                             return (
//                                                 <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                                     {i === 0 && (
//                                                         <td className="border border-gray-400 p-0.5 align-top font-semibold" rowSpan={competenceTemplate.evaluations.length}>
//                                                             <div className="text-[9px] print:text-[9px] leading-tight">{competenceTemplate.title}</div>
//                                                         </td>
//                                                     )}
//                                                     {i === 0 && (
//                                                         <td className="border border-gray-400 p-0.5 align-top" rowSpan={competenceTemplate.evaluations.length}>
//                                                             <div className="text-[8px] print:text-[8px] text-gray-600 leading-tight">{competenceTemplate.description}</div>
//                                                         </td>
//                                                     )}

//                                                     <td className="border border-gray-400 p-0.5 text-center align-top">{ev}</td>
//                                                     <td className="border border-gray-400 p-0.5 text-center align-top">{competenceTemplate.Notes[ev]}</td>
//                                                     <td className="border border-gray-400 p-0.5 text-center align-top">{evalData.m1 || "-"}</td>
//                                                     <td className="border border-gray-400 p-0.5 text-center align-top">{evalData.m2 || "-"}</td>
//                                                     <td className="border border-gray-400 p-0.5 text-center align-top">{evalData.m3 || "-"}</td>

//                                                     {i === 0 && (
//                                                         <td className="border border-gray-400 p-0.5 align-top text-center" rowSpan={competenceTemplate.evaluations.length}>
//                                                             <div className="text-[8px] print:text-[6px]">{donneesCompetence.appreciation || "-"}</div>
//                                                         </td>
//                                                     )}
//                                                 </tr>
//                                             );
//                                         })}
//                                     </React.Fragment>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Section inférieure - Ultra compacte */}
//                 <div className="flex flex-col gap-4 mt-9 mb-2 print:mb-0 print:gap-3 print:px-4 md:flex-row md:flex-wrap md:justify-between md:items-start md:gap-3 lg:flex-nowrap text-[8px] print:text-[7px]">

//                     {/* Légende des Appréciations - Compact */}
//                     <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
//                         <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[9px]">Légende</div>
//                         <div className="space-y-0.5">
//                             <div><strong>Acquis</strong> - Maîtrisé</div>
//                             <div><strong>En cours</strong> - Progression</div>
//                             <div><strong>Expert</strong> - Performance +</div>
//                             <div><strong>Non acquis</strong> - Pas acquis</div>
//                         </div>
//                     </div>

//                     {/* Périodes - Compact */}
//                     <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
//                         <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[8px]">Périodes</div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['h1', 'h2', 'h3'].map((header) => (
//                                 <div key={header} className="text-center">
//                                     <div className="font-semibold text-[8px] print:text-[7px]">{entetesPeriodes[header]}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['t1', 't2', 't3'].map((total) => (
//                                 <div key={total} className="text-center">
//                                     <div className="text-gray-600 text-[8px] print:text-[7px]">Totaux</div>
//                                     <div className="font-semibold text-[8px] print:text-[7px]">{totaux[total] || "0/0"}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['m1', 'm2', 'm3'].map((moy) => (
//                                 <div key={moy} className="text-center">
//                                     <div className="text-gray-600 text-[7px] print:text-[8px]">Moyenne</div>
//                                     <div className="font-semibold text-[8px] print:text-[7px]">{moyennes[moy] || "0/20"}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5">
//                             {['app1', 'app2', 'app3'].map((app) => (
//                                 <div key={app} className="text-center">
//                                     <div className="text-gray-600 text-[7px] print:text-[6px]">Appréciation</div>
//                                     <div className="font-semibold text-[8px] print:text-[7px]">{infoPeriodes[app] || "-"}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Résumé du Travail - Compact */}
//                     <div className="w-full md:w-[48%] lg:w-1/4 border-2 border-gray-400 rounded p-1 print:p-3">
//                         <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[9px]">Résumé</div>

//                         <div className="space-y-3">
//                             <div className="text-center">
//                                 <div className="text-gray-600 text-[7px] print:text-[6px]">Moy Générale</div>
//                                 <div className="font-bold text-blue-700 text-[9px] print:text-[10px]">{moyenneGenerale || "0/20"}</div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600 text-[7px] print:text-[6px]">Appréciation</div>
//                                 <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
//                                     {resume?.appreciationGlobale || "-"}
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600 text-[7px] print:text-[6px]">Position</div>
//                                 <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
//                                     {resume?.position || "-"}
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600 text-[7px] print:text-[6px]">Décision</div>
//                                 <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
//                                     {resume?.decision || "-"}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Visas - Compact */}
//                     <div className="w-full md:w-[48%] lg:w-1/4">
//                         <div className="space-y-2">
//                             {['Enseignant', 'Directeur', 'Parent'].map((role) => (
//                                 <div key={role} className="border border-gray-300 rounded p-5 text-center">
//                                     <div className="font-semibold text-[7px] print:text-[6px]">Visa {role}</div>
//                                     <div className="h-6 print:h-5 mt-0.5 flex items-center justify-center border-t border-gray-200">
//                                         <div className="text-[6px] print:text-[5px] text-gray-400">Signature</div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Contact - Compact */}
//                 <div className="text-center text-[8px] mt-9 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5  print:mt-9 mb-2 print:mb-0 print:mx-4">
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
//             </div>

//             {/* Boutons d'Action */}
//             <div className="w-full max-w-4xl mt-3 print:hidden">
//                 <div className="flex justify-between gap-2">
//                     <button
//                         onClick={handleBackToEdit}
//                         className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
//                     >
//                         ← Retour à l'Édition
//                     </button>

//                     <div className="flex gap-2">
//                         <button
//                             onClick={handleDownload}
//                             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
//                         >
//                             📥 Télécharger
//                         </button>

//                         <button
//                             onClick={handlePrint}
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
//                         >
//                             🖨️ Imprimer
//                         </button>

//                         <button
//                             onClick={handleFinalSubmit}
//                             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
//                         >
//                             ✅ Finaliser
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* CSS d'impression optimisé pour une seule page A4 */}
//             <style jsx>{`
//                 @media print {
//                     @page {
//                         size: A4 portrait;
//                         margin: 0.3cm;
//                     }
//                     body {
//                         -webkit-print-color-adjust: exact;
//                         print-color-adjust: exact;
//                         margin: 0;
//                         padding: 0;
//                         background: white;
//                     }
//                     * {
//                         box-sizing: border-box;
//                     }
//                     table {
//                         page-break-inside: avoid;
//                         font-size:10px;
//                     }
//                     th, td {
//                         padding: 1px 2px;
//                         line-height: 1;
//                     }
//                     .print\\:text-\\[10px\\] {
//                         font-size: 10px;
//                     }
//                     .print\\:text-\\[7px\\] {
//                         font-size: 7px;
//                     }
//                     .print\\:w-16 {
//                         width: 4rem;
//                     }
//                     .print\\:w-10 {
//                         width: 2.5rem;
//                     }
//                     .print\\:w-6 {
//                         width: 1.5rem;
//                     }
//                     .print\\:h-12 {
//                         height: 3rem;
//                     }
//                     .print\\:h-5 {
//                         height: 1.25rem;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default BulletinPreview;




















import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const BulletinPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        meta,
        entetesPeriodes,
        donnees,
        totaux,
        moyennes,
        infoPeriodes,
        moyenneGenerale,
        resume,
        photoEleve
    } = location.state || {};

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            const marginLeft = 15;
            const marginTop = 15;
            const pageWidth = pdf.internal.pageSize.getWidth() - (marginLeft * 2);
            let yPos = marginTop;
            
            pdf.setFont("helvetica", "normal");
            
            // 1. EN-TÊTE
            pdf.setFontSize(8);
            
            // Gauche
            pdf.text("RÉPUBLIQUE DU CAMEROUN", marginLeft, yPos);
            pdf.text("Paix-Travail-Patrie", marginLeft, yPos + 4);
            pdf.text("Ministère de l'Éducation de base", marginLeft, yPos + 8);
            pdf.text("Délégation Régionale du Centre", marginLeft, yPos + 12);
            pdf.text("Délégation Départementale du Mfoundi", marginLeft, yPos + 16);
            
            // Droite
            pdf.text("REPUBLIC OF CAMEROON", marginLeft + pageWidth, yPos, { align: "right" });
            pdf.text("Peace-Work-Fatherland", marginLeft + pageWidth, yPos + 4, { align: "right" });
            pdf.text("Ministry of Basic Education", marginLeft + pageWidth, yPos + 8, { align: "right" });
            pdf.text("Centre Regional Delegation", marginLeft + pageWidth, yPos + 12, { align: "right" });
            pdf.text("Divisional Delegation of Mfoundi Division", marginLeft + pageWidth, yPos + 16, { align: "right" });
            
            // Titre centre
            yPos += 22;
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU", marginLeft + pageWidth/2, yPos, { align: "center" });
            yPos += 8;
            pdf.setFontSize(14);
            pdf.text("BULLETIN SCOLAIRE", marginLeft + pageWidth/2, yPos, { align: "center" });
            
            // Ligne de séparation
            yPos += 6;
            pdf.setDrawColor(0);
            pdf.setLineWidth(0.3);
            pdf.line(marginLeft, yPos, marginLeft + pageWidth, yPos);
            
            // 2. INFORMATIONS ÉLÈVE
            yPos += 10;
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            
            // Informations sur 2 colonnes
            const infos = [
                { label: "Nom:", value: meta.nomEleve || "-" },
                { label: "Sexe:", value: meta.sexe || "-" },
                { label: "Classe:", value: meta.classe || "-" },
                { label: "Niveau:", value: meta.niveau || "-" },
                { label: "Trimestre:", value: meta.trimestre || "-" },
                { label: "Année scolaire:", value: meta.anneeScolaire || "-" },
                { label: "Enseignant:", value: meta.enseignant || "-" }
            ];
            
            infos.forEach((info, i) => {
                const x = marginLeft + ((i % 2) * 90);
                const rowY = yPos + Math.floor(i / 2) * 6;
                pdf.setFont("helvetica", "bold");
                pdf.text(info.label, x, rowY);
                pdf.setFont("helvetica", "normal");
                pdf.text(info.value, x + 20, rowY);
            });
            
            yPos += 20;
            pdf.line(marginLeft, yPos, marginLeft + pageWidth, yPos);
            
            // 3. TABLEAU SIMPLIFIÉ
            yPos += 8;
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            
            // En-têtes
            pdf.text("COMPÉTENCES", marginLeft, yPos);
            pdf.text("ÉVAL.", marginLeft + 90, yPos);
            pdf.text("NOTES", marginLeft + 110, yPos);
            pdf.text(entetesPeriodes.h1, marginLeft + 130, yPos);
            pdf.text(entetesPeriodes.h2, marginLeft + 150, yPos);
            pdf.text(entetesPeriodes.h3, marginLeft + 170, yPos);
            
            yPos += 4;
            pdf.setDrawColor(150);
            pdf.line(marginLeft, yPos, marginLeft + pageWidth, yPos);
            pdf.setDrawColor(0);
            
            // Données
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            
            const COMPETENCES_TEMPLATE_PREVIEW = [
                {
                    key: "1A",
                    title: "1A- Communiquer en Anglais",
                    Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
                    evaluations: ["Savoir-être", "Oral", "Écrit"]
                },
                {
                    key: "1B",
                    title: "1B- Communiquer en Français",
                    Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
                    evaluations: ["Savoir-être", "Oral", "Écrit"]
                },
                {
                    key: "1C",
                    title: "1C- Pratiguer une Langue Nationale",
                    Notes: { "Savoir-être": 2, Oral: 10, Pratique: 2, Écrit: 6 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "2A",
                    title: "2A- Utiliser les Notions de Base en Mathématiques",
                    Notes: { "Savoir-être": 4, Oral: 8, Écrit: 28 },
                    evaluations: ["Savoir-être", "Oral", "Écrit"]
                },
                {
                    key: "2B",
                    title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
                    Notes: { "Savoir-être": 7, Oral: 6, Pratique: 20, Écrit: 7 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "3A",
                    title: "3A- Pratiquer les Valeurs Sociales",
                    Notes: { "Savoir-être": 4, Oral: 3, Pratique: 5, Écrit: 8 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "3B",
                    title: "3B- Pratiquer les Valeurs Citoyennes",
                    Notes: { "Savoir-être": 3, Oral: 3, Pratique: 5, Écrit: 9 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "4A",
                    title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat",
                    Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "4B",
                    title: "4B- Démontrer l'autonomie, l'esprit d'initiative, de créativité et d'entreprenariat",
                    Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "5",
                    title: "5- Utiliser les Concepts de Base et les Outils des TIC",
                    Notes: { "Savoir-être": 6, Oral: 4, Pratique: 20, Écrit: 10 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "6A",
                    title: "6-A Activités Physiques et Sportives (aptes)",
                    Notes: { "Savoir-être": 4, Oral: 2, Pratique: 12, Écrit: 2 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                },
                {
                    key: "6B",
                    title: "6-B Activités Physiques et Sportives (inaptes)",
                    Notes: { "Savoir-être": 2, Oral: 3, Écrit: 15 },
                    evaluations: ["Savoir-être", "Oral", "Écrit"]
                },
                {
                    key: "6C",
                    title: "6-C Activités Artistiques",
                    Notes: { "Savoir-être": 2, Oral: 2, Pratique: 12, Écrit: 4 },
                    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
                }
            ];
            
            COMPETENCES_TEMPLATE_PREVIEW.forEach(competence => {
                const donneesCompetence = donnees[competence.key];
                if (!donneesCompetence) return;
                
                if (yPos > 240) {
                    pdf.addPage();
                    yPos = marginTop;
                }
                
                // Titre compétence
                yPos += 5;
                pdf.setFont("helvetica", "bold");
                pdf.text(competence.title, marginLeft, yPos);
                
                // Évaluations
                competence.evaluations.forEach((ev, i) => {
                    const evalData = donneesCompetence.evaluations?.[ev] || {};
                    yPos += 4;
                    pdf.setFont("helvetica", "normal");
                    
                    pdf.text(ev, marginLeft + 90, yPos);
                    pdf.text(competence.Notes[ev]?.toString() || "0", marginLeft + 110, yPos);
                    pdf.text(evalData.m1?.toString() || "-", marginLeft + 130, yPos);
                    pdf.text(evalData.m2?.toString() || "-", marginLeft + 150, yPos);
                    pdf.text(evalData.m3?.toString() || "-", marginLeft + 170, yPos);
                });
                
                yPos += 3;
                pdf.setDrawColor(180);
                pdf.setLineWidth(0.1);
                pdf.line(marginLeft, yPos, marginLeft + pageWidth, yPos);
                pdf.setDrawColor(0);
            });
            
            // 4. RÉSUMÉ ET SIGNATURES
            yPos += 15;
            
            // Résumé
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.text("RÉSUMÉ", marginLeft, yPos);
            
            yPos += 8;
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "normal");
            
            const resumeData = [
                { label: "Moyenne Générale:", value: moyenneGenerale || "0/20" },
                { label: "Appréciation:", value: resume?.appreciationGlobale || "-" },
                { label: "Position:", value: resume?.position || "-" },
                { label: "Décision:", value: resume?.decision || "-" }
            ];
            
            resumeData.forEach((row, i) => {
                const rowY = yPos + (i * 6);
                pdf.text(row.label, marginLeft, rowY);
                pdf.setFont("helvetica", "bold");
                pdf.text(row.value, marginLeft + 45, rowY);
                pdf.setFont("helvetica", "normal");
            });
            
            // Signatures
            yPos += 30;
            const startX = marginLeft + 30;
            
            pdf.setFontSize(8);
            pdf.text("Visa enseignant", startX, yPos, { align: "center" });
            pdf.text("Visa directeur", startX + 60, yPos, { align: "center" });
            pdf.text("Visa parent", startX + 120, yPos, { align: "center" });
            
            yPos += 4;
            [0, 1, 2].forEach(i => {
                pdf.rect(startX + (i * 60), yPos, 50, 15);
            });
            
            // Pied de page
            yPos += 25;
            pdf.setFontSize(7);
            pdf.text("Téléphone: (+237) 696-308-503 / WhatsApp: 651989899", marginLeft + pageWidth/2, yPos, { align: "center" });
            yPos += 3;
            pdf.text("Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)", marginLeft + pageWidth/2, yPos, { align: "center" });
            
            // Télécharger
            const fileName = `Bulletin_${meta.nomEleve?.replace(/\s+/g, '_') || 'Eleve'}.pdf`;
            pdf.save(fileName);
            
        } catch (error) {
            console.error("Erreur PDF:", error);
            alert("Erreur lors de la génération du PDF. Essayez d'imprimer.");
        }
    };

    const handleBackToEdit = () => {
        navigate(-1);
    };

    const handleFinalSubmit = () => {
        if (confirm("Êtes-vous sûr de vouloir finaliser et vider le formulaire ?")) {
            localStorage.removeItem('bulletinFormData');
            navigate("/dashboard");
        }
    };

    // Template
    const COMPETENCES_TEMPLATE_PREVIEW = [
        {
            key: "1A",
            title: "1A- Communiquer en Anglais",
            description: "Écoute - expression orale - écriture - lecture",
            Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "1B",
            title: "1B- Communiquer en Français",
            description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
            Notes: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "1C",
            title: "1C- Pratiguer une Langue Nationale",
            description: "Coutumes - traditions - mode de vie - interprétation des phénomènes",
            Notes: { "Savoir-être": 2, Oral: 10, Pratique: 2, Écrit: 6 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "2A",
            title: "2A- Utiliser les Notions de Base en Mathématiques",
            description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
            Notes: { "Savoir-être": 4, Oral: 8, Écrit: 28 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "2B",
            title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
            description: "Éducation à la santé et à l'environnement - technologie et ingénierie",
            Notes: { "Savoir-être": 7, Oral: 6, Pratique: 20, Écrit: 7 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "3A",
            title: "3A- Pratiquer les Valeurs Sociales",
            description: "Histoire et géographie",
            Notes: { "Savoir-être": 4, Oral: 3, Pratique: 5, Écrit: 8 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "3B",
            title: "3B- Pratiquer les Valeurs Citoyennes",
            description: "Éducation civique - droits de l'homme - éducation morale",
            Notes: { "Savoir-être": 3, Oral: 3, Pratique: 5, Écrit: 9 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "4A",
            title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat dans les Études Professionnelles",
            description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
            Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "4B",
            title: "4B- Démontrer l'autonomie, l'esprit d'initiative, de créativité et d'entreprenariat",
            description: "Outils agricoles - agriculture et jardinage - élevage",
            Notes: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "5",
            title: "5- Utiliser les Concepts de Base et les Outils des Technologies de l'Information et de la Communication",
            description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
            Notes: { "Savoir-être": 6, Oral: 4, Pratique: 20, Écrit: 10 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "6A",
            title: "6-A Pratiquer les Activités Physiques et Sportives pour les apprenants aptent",
            description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
            Notes: { "Savoir-être": 4, Oral: 2, Pratique: 12, Écrit: 2 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "6B",
            title: "6-B Pratiquer les Activités Physiques et Sportives pour les apprenants inaptent",
            description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
            Notes: { "Savoir-être": 2, Oral: 3, Écrit: 15 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "6C",
            title: "6-C Pratiquer les Activités Artistiques",
            description: "Arts visuels - arts du spectacle",
            Notes: { "Savoir-être": 2, Oral: 2, Pratique: 12, Écrit: 4 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        }
    ];

    if (!location.state) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-4">Aucune donnée trouvée</div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Retour au Formulaire
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
            {/* Header */}
            <div className="w-full max-w-4xl mb-2 print:hidden">
                <div className="bg-blue-600 text-white p-2 rounded shadow">
                    <h1 className="text-lg font-bold text-center">Aperçu du Bulletin</h1>
                    <p className="text-center text-blue-100 text-xs">
                        Vérifiez avant impression.
                    </p>
                </div>
            </div>

            {/* Main content */}
            <div className="bg-white w-full max-w-4xl shadow-sm p-3 print:shadow-none print:max-w-full print:p-0 print:min-h-[27.7cm]">
                {/* Header for print */}
                <div className="w-full mb-1 print:mb-0 print:pt-2 print:px-4 border-b border-gray-300">
                    <div className="flex flex-col items-center text-gray-600 text-xs print:text-[9px] md:flex-row md:justify-between md:items-start">
                        <div className="text-left mb-1 md:mb-0 md:w-1/3 print:w-1/3">
                            <div className="font-bold text-[11px] print:text-[9px]">RÉPUBLIQUE DU CAMEROUN</div>
                            <div className="text-[9px] print:text-[7px]">Paix-Travail-Patrie</div>
                            <div className="text-[10px] print:text-[8px]">Ministère de l'Éducation de base</div>
                            <div className="text-[10px] print:text-[8px]">Délégation Régionale du Centre</div>
                            <div className="text-[10px] print:text-[8px]">Délégation Départementale du Mfoundi</div>
                        </div>

                        <div className="text-center md:flex-1 md:mx-2 print:mx-1">
                            <div className="font-extrabold text-sm print:text-[11px]">
                                GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
                            </div>
                            <div className="text-[13px] print:text-[13px] font-bold">
                                BULLETIN SCOLAIRE
                            </div>
                        </div>

                        <div className="text-right mt-1 md:mt-0 md:w-1/3 print:w-1/3">
                            <div className="font-bold text-[11px] print:text-[9px]">REPUBLIC OF CAMEROON</div>
                            <div className="text-[9px] print:text-[7px]">Peace-Work-Fatherland</div>
                            <div className="text-[10px] print:text-[8px]">Ministry of Basic Education</div>
                            <div className="text-[10px] print:text-[8px]">Centre Regional Delegation</div>
                            <div className="text-[10px] print:text-[8px]">Divisional Delegation of Mfoundi Division</div>
                        </div>
                    </div>
                </div>

                {/* Student info */}
                <div className="flex flex-col my-4 md:flex-row gap-2 mb-1 print:mb-0 print:gap-1 print:px-4 print:pt-1">
                    {photoEleve && (
                        <div className="flex flex-col items-center md:w-1/6 print:w-1/6">
                            <div className="w-16 h-16 print:w-12 print:h-12 border border-gray-300 rounded overflow-hidden mb-0.5">
                                <img src={photoEleve} alt="Photo" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-[8px] print:text-[6px] text-gray-500">Photo</div>
                        </div>
                    )}

                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-1 text-xs print:text-[8px] ${photoEleve ? 'flex-1' : 'w-full'}`}>
                        <div><strong>Nom:</strong> {meta.nomEleve || "-"}</div>
                        <div><strong>Sexe:</strong> {meta.sexe || "-"}</div>
                        <div><strong>Classe:</strong> {meta.classe || "-"}</div>
                        <div><strong>Niveau:</strong> {meta.niveau || "-"}</div>
                        <div><strong>Trimestre:</strong> {meta.trimestre || "-"}</div>
                        <div><strong>Année:</strong> {meta.anneeScolaire || "-"}</div>
                        <div className="md:col-span-2"><strong>Enseignant:</strong> {meta.enseignant || "-"}</div>
                    </div>
                </div>

                {/* Competencies table */}
                <div className="overflow-x-auto print:overflow-visible mb-1 print:mb-0 print:px-4">
                    <table className="w-full text-[9px] print:text-[7px] border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-0.5 w-20 print:w-16">Compétences</th>
                                <th className="border p-0.5 w-32 print:w-28">Description</th>
                                <th className="border p-0.5 text-center w-12 print:w-10">Éval</th>
                                <th className="border p-0.5 text-center w-8 print:w-6">Notes</th>
                                <th className="border p-0.5 text-center w-12 print:w-10">{entetesPeriodes.h1}</th>
                                <th className="border p-0.5 text-center w-12 print:w-10">{entetesPeriodes.h2}</th>
                                <th className="border p-0.5 text-center w-12 print:w-10">{entetesPeriodes.h3}</th>
                                <th className="border p-0.5 text-center w-16 print:w-14">Appréciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {COMPETENCES_TEMPLATE_PREVIEW.map(competence => {
                                const donneesCompetence = donnees[competence.key];
                                if (!donneesCompetence) return null;
                                const evaluations = donneesCompetence.evaluations || {};

                                return (
                                    <React.Fragment key={competence.key}>
                                        {competence.evaluations.map((ev, i) => {
                                            const evalData = evaluations[ev] || {};
                                            return (
                                                <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                    {i === 0 && (
                                                        <td className="border p-0.5 align-top font-semibold" rowSpan={competence.evaluations.length}>
                                                            <div className="text-[9px] leading-tight">{competence.title}</div>
                                                        </td>
                                                    )}
                                                    {i === 0 && (
                                                        <td className="border p-0.5 align-top" rowSpan={competence.evaluations.length}>
                                                            <div className="text-[8px] text-gray-600 leading-tight">{competence.description}</div>
                                                        </td>
                                                    )}

                                                    <td className="border p-0.5 text-center align-top">{ev}</td>
                                                    <td className="border p-0.5 text-center align-top">{competence.Notes[ev]}</td>
                                                    <td className="border p-0.5 text-center align-top">{evalData.m1 || "-"}</td>
                                                    <td className="border p-0.5 text-center align-top">{evalData.m2 || "-"}</td>
                                                    <td className="border p-0.5 text-center align-top">{evalData.m3 || "-"}</td>

                                                    {i === 0 && (
                                                        <td className="border p-0.5 text-center align-top" rowSpan={competence.evaluations.length}>
                                                            <div className="text-[8px]">{donneesCompetence.appreciation || "-"}</div>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Summary section */}
                <div className="flex flex-col gap-4 mt-3 mb-2 print:mb-0 print:gap-3 print:px-4 md:flex-row md:flex-wrap lg:flex-nowrap text-[8px] print:text-[7px]">

                    <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
                        <div className="font-semibold text-center mb-0.5 text-[9px]">Légende</div>
                        <div className="space-y-0.5">
                            <div><strong>Acquis</strong> - Maîtrisé</div>
                            <div><strong>En cours</strong> - Progression</div>
                            <div><strong>Expert</strong> - Performance +</div>
                            <div><strong>Non acquis</strong> - Pas acquis</div>
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
                        <div className="font-semibold text-center mb-0.5 text-[9px]">Périodes</div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['h1', 'h2', 'h3'].map((header) => (
                                <div key={header} className="text-center">
                                    <div className="font-semibold text-[8px]">{entetesPeriodes[header]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['t1', 't2', 't3'].map((total) => (
                                <div key={total} className="text-center">
                                    <div className="text-gray-600 text-[8px]">Totaux</div>
                                    <div className="font-semibold text-[8px]">{totaux[total] || "0/0"}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['m1', 'm2', 'm3'].map((moy) => (
                                <div key={moy} className="text-center">
                                    <div className="text-gray-600 text-[7px]">Moyenne</div>
                                    <div className="font-semibold text-[8px]">{moyennes[moy] || "0/20"}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5">
                            {['app1', 'app2', 'app3'].map((app) => (
                                <div key={app} className="text-center">
                                    <div className="text-gray-600 text-[7px]">Appréciation</div>
                                    <div className="font-semibold text-[8px]">{infoPeriodes[app] || "-"}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] lg:w-1/4 border-2 border-gray-400 rounded p-1 print:p-3">
                        <div className="font-semibold text-center mb-0.5 text-[9px]">Résumé</div>

                        <div className="space-y-3">
                            <div className="text-center">
                                <div className="text-gray-600 text-[7px]">Moy Générale</div>
                                <div className="font-bold text-blue-700 text-[9px]">{moyenneGenerale || "0/20"}</div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px]">Appréciation</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px]">
                                    {resume?.appreciationGlobale || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px]">Position</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px]">
                                    {resume?.position || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px]">Décision</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px]">
                                    {resume?.decision || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] lg:w-1/4">
                        <div className="space-y-2">
                            {['Enseignant', 'Directeur', 'Parent'].map((role) => (
                                <div key={role} className="border border-gray-300 rounded p-5 text-center">
                                    <div className="font-semibold text-[7px]">Visa {role}</div>
                                    <div className="h-6 print:h-5 mt-0.5 flex items-center justify-center border-t border-gray-200">
                                        <div className="text-[6px] text-gray-400">Signature</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-[8px] mt-9 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 print:mt-9 mb-2 print:mb-0 print:mx-4">
                    <div>
                        <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
                        <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
                        <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
                    </div>
                </div>
            </div>

            {/* Action buttons - SIMPLIFIÉ */}
            <div className="w-full max-w-4xl mt-3 print:hidden">
                <div className="flex justify-between gap-2">
                    <button
                        onClick={handleBackToEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                    >
                        ← Retour
                    </button>

                    <div className="flex gap-2">
                        {/* BOUTON TÉLÉCHARGER PDF */}
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2"
                        >
                            📥 Télécharger PDF
                        </button>

                        {/* BOUTON IMPRIMER */}
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2"
                        >
                            🖨️ Imprimer
                        </button>

                        <button
                            onClick={handleFinalSubmit}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                        >
                            ✅ Finaliser
                        </button>
                    </div>
                </div>
            </div>

            {/* Print CSS */}
            
<style jsx>{`
    @media print {
        @page {
            size: A4 portrait;
            margin: 0.3cm;
        }
        body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
            background: white;
        }
        * {
            box-sizing: border-box;
        }
        table {
            page-break-inside: avoid;
            font-size:10px;
        }
        th, td {
            padding: 1px 2px;
            line-height: 1;
        }
        .print\\:text-\\[10px\\] {
            font-size: 10px;
        }
        .print\\:text-\\[7px\\] {
            font-size: 7px;
        }
        .print\\:w-16 {
            width: 4rem;
        }
        .print\\:w-10 {
            width: 2.5rem;
        }
        .print\\:w-6 {
            width: 1.5rem;
        }
        .print\\:h-12 {
            height: 3rem;
        }
        .print\\:h-5 {
            height: 1.25rem;
        }
    }
`}</style>


        </div>
    );
};

export default BulletinPreview;