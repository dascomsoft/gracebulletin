


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    const handleDownload = () => {
        window.print();
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

    // Template aligné avec le nouveau formulaire
    const COMPETENCES_TEMPLATE_PREVIEW = [
        {
            key: "1A",
            title: "1A- Communiquer en Anglais",
            description: "Écoute - expression orale - écriture - lecture",
            Notes: { "Savoir-être": 5, Oral: 20, Écrit: 15 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "1B",
            title: "1B- Communiquer en Français",
            description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
            Notes: { "Savoir-être": 5, Oral: 20, Écrit: 15 },
            evaluations: ["Savoir-être", "Oral", "Écrit"]
        },
        {
            key: "1C",
            title: "1C- Communiquer dans une Langue Nationale",
            description: "Coutumes - traditions - mode de vie - interprétation des phénomènes",
            Notes: { Oral: 15, Pratique: 5 },
            evaluations: ["Oral", "Pratique"]
        },
        {
            key: "2A",
            title: "2A- Utiliser les Notions de Base en Mathématiques",
            description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
            Notes: { "Savoir-être": 5, Oral: 10, Pratique: 15, Écrit: 20 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "2B",
            title: "2B- Utiliser les Notions de Base en Sciences et Technologie",
            description: "Éducation à la santé et à l'environnement - technologie et ingénierie",
            Notes: { "Savoir-être": 5, Oral: 10, Pratique: 15, Écrit: 20 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "3A",
            title: "3A- Pratiquer les Valeurs Sociales",
            description: "Histoire et géographie",
            Notes: { "Savoir-être": 10, Oral: 6, Pratique: 2, Écrit: 2 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "3B",
            title: "3B- Pratiquer les Valeurs Civiques",
            description: "Éducation civique - droits de l'homme - éducation morale",
            Notes: { "Savoir-être": 10, Oral: 6, Pratique: 2, Écrit: 2 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "4A",
            title: "4A- Démontrer l'Autonomie, l'Esprit d'Initiative, la Créativité et l'Entreprenariat dans les Études Professionnelles",
            description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
            Notes: { "Savoir-être": 2, Oral: 3, Pratique: 10, Écrit: 5 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "4B",
            title: "4B- Démontrer l'autonomie, l'esprit d'initiative, la créativité et l'entreprenariat",
            description: "Outils agricoles - agriculture et jardinage - élevage",
            Notes: { "Savoir-être": 2, Oral: 3, Pratique: 10, Écrit: 5 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "5",
            title: "5- Utiliser les Concepts de Base et les Outils des Technologies de l'Information et de la Communication",
            description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
            Notes: { "Savoir-être": 5, Oral: 5, Pratique: 20, Écrit: 10 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "6A",
            title: "6-A Pratiquer les Activités Physiques et Sportives",
            description: "Mouvement - saut - sports d'équipe - gymnastique - relais - sprint",
            Notes: { "Savoir-être": 3, Oral: 3, Pratique: 10, Écrit: 4 },
            evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
        },
        {
            key: "6B",
            title: "6-B Pratiquer les Activités Artistiques",
            description: "Arts visuels - arts du spectacle",
            Notes: { "Savoir-être": 4, Oral: 4, Pratique: 10, Écrit: 2 },
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
            {/* En-tête - invisible durant l'impression */}
            <div className="w-full max-w-4xl mb-2 print:hidden">
                <div className="bg-blue-600 text-white p-2 rounded shadow">
                    <h1 className="text-lg font-bold text-center">Aperçu du Bulletin</h1>
                    <p className="text-center text-blue-100 text-xs">
                        Vérifiez toutes les informations avant l'impression. Vos données sont automatiquement sauvegardées.
                    </p>
                </div>
            </div>

            {/* Page principale - Conteneur d'impression */}
            <div className="bg-white w-full max-w-4xl shadow-sm p-3 print:shadow-none print:max-w-full print:p-0 print:min-h-[27.7cm] print:overflow-hidden">

                {/* En-tête compact pour impression */}
                <div className="w-full mb-1 print:mb-0 print:pt-2 print:px-4 border-b border-gray-300 print:border-b print:pb-1">
                    <div className="flex flex-col items-center text-gray-600 text-xs print:text-[9px] md:flex-row md:justify-between md:items-start">
                        {/* Bloc gauche */}
                        <div className="text-left mb-1 md:mb-0 md:w-1/3 print:w-1/3">
                            <div className="font-bold text-[11px] sm:text-xs print:text-[9px]">RÉPUBLIQUE DU CAMEROUN</div>
                            <div className="text-[9px] sm:text-[10px] print:text-[7px]">Paix-Travail-Patrie</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Ministère de l'Éducation de base</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Délégation Régionale du Centre</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Délégation Départementale du Mfoundi</div>
                        </div>

                        {/* Bloc centre */}
                        <div className="text-center md:flex-1 md:mx-2 print:mx-1">
                            <div className="font-extrabold text-sm sm:text-base print:text-[11px]">
                                GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
                            </div>
                            <div className="text-[13px] sm:text-[16px] print:text-[13px] font-bold">
                                BULLETIN SCOLAIRE
                            </div>
                        </div>

                        {/* Bloc droite */}
                        <div className="text-right mt-1 md:mt-0 md:w-1/3 print:w-1/3">
                            <div className="font-bold text-[11px] sm:text-xs print:text-[9px]">REPUBLIC OF CAMEROON</div>
                            <div className="text-[9px] sm:text-[10px] print:text-[7px]">Peace-Work-Fatherland</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Ministry of Basic Education</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Centre Regional Delegation</div>
                            <div className="text-[10px] sm:text-xs print:text-[8px]">Divisional Delegation of Mfoundi Division</div>
                        </div>
                    </div>
                </div>

                {/* Section Photo + Informations de l'Élève - Compact */}
                <div className="flex flex-col my-4 md:flex-row gap-2 mb-1 print:mb-0 print:gap-1 print:px-4 print:pt-1">
                    {/* Zone Photo */}
                    {photoEleve && (
                        <div className="flex flex-col items-center md:w-1/6 print:w-1/6">
                            <div className="w-16 h-16 print:w-12 print:h-12 border border-gray-300 rounded overflow-hidden mb-0.5">
                                <img
                                    src={photoEleve}
                                    alt="Photo de l'élève"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-[8px] print:text-[6px] text-gray-500 text-center">
                                Photo
                            </div>
                        </div>
                    )}

                    {/* Informations de l'Élève - Compact */}
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

                {/* Tableau des Compétences - Ultra compact */}
                <div className="overflow-x-auto print:overflow-visible mb-1 print:mb-0 print:px-4">
                    <table className="w-full text-[9px] print:text-[7px] border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200 print:bg-gray-200">
                                <th className="border border-gray-400 p-0.5 w-20 print:w-16">Compétences</th>
                                <th className="border border-gray-400 p-0.5 w-32 print:w-28">Description</th>
                                <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">Éval</th>
                                <th className="border border-gray-400 p-0.5 text-center w-8 print:w-6">Notes</th>
                                <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
                                    {entetesPeriodes.h1}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
                                    {entetesPeriodes.h2}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-12 print:w-10">
                                    {entetesPeriodes.h3}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-16 print:w-14">Appréciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {COMPETENCES_TEMPLATE_PREVIEW.map(competenceTemplate => {
                                const donneesCompetence = donnees[competenceTemplate.key];
                                if (!donneesCompetence) return null;

                                return (
                                    <React.Fragment key={competenceTemplate.key}>
                                        {competenceTemplate.evaluations.map((ev, i) => (
                                            <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top font-semibold" rowSpan={competenceTemplate.evaluations.length}>
                                                        <div className="text-[9px] print:text-[7px] leading-tight">{competenceTemplate.title}</div>
                                                    </td>
                                                )}
                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top" rowSpan={competenceTemplate.evaluations.length}>
                                                        <div className="text-[8px] print:text-[6px] text-gray-600 leading-tight">{competenceTemplate.description}</div>
                                                    </td>
                                                )}

                                                <td className="border border-gray-400 p-0.5 text-center align-top">{ev}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{competenceTemplate.Notes[ev]}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{donneesCompetence.evaluations[ev].m1 || "-"}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{donneesCompetence.evaluations[ev].m2 || "-"}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{donneesCompetence.evaluations[ev].m3 || "-"}</td>

                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top text-center" rowSpan={competenceTemplate.evaluations.length}>
                                                        <div className="text-[8px] print:text-[6px]">{donneesCompetence.appreciation || "-"}</div>
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

                {/* Section inférieure - Ultra compacte */}
                <div className="flex flex-col gap-4 mt-9 mb-2 print:mb-0 print:gap-3 print:px-4 md:flex-row md:flex-wrap md:justify-between md:items-start md:gap-3 lg:flex-nowrap text-[8px] print:text-[7px]">

                    {/* Légende des Appréciations - Compact */}
                    <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
                        <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[7px]">Légende</div>
                        <div className="space-y-0.5">
                            <div><strong>Acquis</strong> - Maîtrisé</div>
                            <div><strong>En cours</strong> - Progression</div>
                            <div><strong>Expert</strong> - Performance +</div>
                            <div><strong>Non acquis</strong> - Pas acquis</div>
                        </div>
                    </div>

                    {/* Périodes - Compact */}
                    <div className="w-full md:w-[48%] lg:w-1/4 border border-gray-300 rounded p-1 print:p-0.5">
                        <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[7px]">Périodes</div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['h1', 'h2', 'h3'].map((header) => (
                                <div key={header} className="text-center">
                                    <div className="font-semibold text-[8px] print:text-[7px]">{entetesPeriodes[header]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['t1', 't2', 't3'].map((total) => (
                                <div key={total} className="text-center">
                                    <div className="text-gray-600 text-[7px] print:text-[6px]">Totaux</div>
                                    <div className="font-semibold text-[8px] print:text-[7px]">{totaux[total]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['m1', 'm2', 'm3'].map((moy) => (
                                <div key={moy} className="text-center">
                                    <div className="text-gray-600 text-[7px] print:text-[6px]">Moyenne</div>
                                    <div className="font-semibold text-[8px] print:text-[7px]">{moyennes[moy]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5">
                            {['app1', 'app2', 'app3'].map((app) => (
                                <div key={app} className="text-center">
                                    <div className="text-gray-600 text-[7px] print:text-[6px]">Appréciation</div>
                                    <div className="font-semibold text-[8px] print:text-[7px]">{infoPeriodes[app] || "-"}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Résumé du Travail - Compact */}
                    <div className="w-full md:w-[48%] lg:w-1/4 border-2 border-gray-400 rounded p-1 print:p-3">
                        <div className="font-semibold text-center mb-0.5 print:mb-0.5 text-[9px] print:text-[7px]">Résumé</div>

                        <div className="space-y-3">
                            <div className="text-center">
                                <div className="text-gray-600 text-[7px] print:text-[6px]">Moy Générale</div>
                                <div className="font-bold text-blue-700 text-[9px] print:text-[10px]">{moyenneGenerale}</div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px] print:text-[6px]">Appréciation</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
                                    {resume?.appreciationGlobale || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px] print:text-[6px]">Position</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
                                    {resume?.position || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600 text-[7px] print:text-[6px]">Décision</div>
                                <div className="border border-gray-300 rounded p-1 min-h-4 text-center flex items-center justify-center text-[8px] print:text-[7px]">
                                    {resume?.decision || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visas - Compact */}
                    <div className="w-full md:w-[48%] lg:w-1/4">
                        <div className="space-y-2">
                            {['Enseignant', 'Directeur', 'Parent'].map((role) => (
                                <div key={role} className="border border-gray-300 rounded p-5 text-center">
                                    <div className="font-semibold text-[7px] print:text-[6px]">Visa {role}</div>
                                    <div className="h-6 print:h-5 mt-0.5 flex items-center justify-center border-t border-gray-200">
                                        <div className="text-[6px] print:text-[5px] text-gray-400">Signature</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact - Compact */}
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
            </div>

            {/* Boutons d'Action */}
            <div className="w-full max-w-4xl mt-3 print:hidden">
                <div className="flex justify-between gap-2">
                    <button
                        onClick={handleBackToEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                        ← Retour à l'Édition
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        >
                            📥 Télécharger
                        </button>

                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                            🖨️ Imprimer
                        </button>

                        <button
                            onClick={handleFinalSubmit}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                        >
                            ✅ Finaliser
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS d'impression optimisé pour une seule page A4 */}
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
                        font-size: 7px;
                    }
                    th, td {
                        padding: 1px 2px;
                        line-height: 1;
                    }
                    .print\\:text-\\[7px\\] {
                        font-size: 7px;
                    }
                    .print\\:text-\\[6px\\] {
                        font-size: 6px;
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