import React, { useEffect, useState } from 'react';

const PrintBulletinFrancophone = () => {
    const [bulletinData, setBulletinData] = useState(null);
    const [bulletinType, setBulletinType] = useState('francophone');

    useEffect(() => {
        // Récupérer les données depuis localStorage
        const data = localStorage.getItem('printBulletinData');
        if (data) {
            setBulletinData(JSON.parse(data));
        } else {
            document.body.innerHTML = '<h1>Aucune donnée à imprimer</h1>';
        }

        // Imprimer automatiquement
        setTimeout(() => {
            window.print();
            // Fermer après impression
            setTimeout(() => window.close(), 1000);
        }, 500);
    }, []);

    if (!bulletinData) {
        return <div>Chargement...</div>;
    }

    const { meta, studentPhoto, periodHeaders, data, totals, averages, periodInfo, overallAvg, summary } = bulletinData;

    // Définir les templates pour le francophone
    const getSkillsTemplate = () => {
        return [
            { key: "1A", title: "1A- Communiquer en français", desc: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire", scl: { Attitude: 5, Oral: 20, Écrit: 15 }, evals: ["Attitude", "Oral", "Écrit"] },
            { key: "1B", title: "1B- Communiquer en anglais", desc: "Listening - speaking - writing - reading", scl: { Attitude: 5, Oral: 15, Écrit: 10 }, evals: ["Attitude", "Oral", "Écrit"] },
            { key: "1C", title: "1C- Communiquer en Langue nationale", desc: "Us et coutumes - traditions - mode de vie - interprétation des phénomènes", scl: { Oral: 15, Pratique: 5 }, evals: ["Oral", "Pratique"] },
            { key: "2A", title: "2A- Utiliser les Notions de base en Mathématiques", desc: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie", scl: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 30 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "2B", title: "2B- Utiliser les Notions de base en sciences et technologie", desc: "Santé et éducation environnementale - technologie et ingénierie", scl: { Attitude: 5, Oral: 10, Pratique: 15, Écrit: 20 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "3A", title: "3A- Pratiquer les Valeurs Sociales", desc: "Histoire et géographie", scl: { Attitude: 10, Oral: 6, Pratique: 2, Écrit: 2 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "3B", title: "3B- Pratiquer les Valeurs citoyennes", desc: "Éducation civique - droits humains - éducation morale", scl: { Attitude: 10, Oral: 10, Pratique: 5, Écrit: 5 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "4A", title: "4A- Faire preuve d'Autonomie, d'Esprit d'Initiative de Créativité et d'Entrepreneuriat dans les Études Professionnelles", desc: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire", scl: { Attitude: 3, Oral: 2, Pratique: 6, Écrit: 4 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "4B", title: "4B- Faire preuve d'autonomie, d'esprit d'initiative de créativité et d'entrepreneuriat", desc: "Outil agricole - agriculture et jardinage - élevage", scl: { Attitude: 3, Oral: 2, Pratique: 6, Écrit: 4 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "5", title: "5- Utiliser les Notions et Outils de base des Technologies de l'Information et de la Communication", desc: "L'ordinateur et les outils TIC - Internet et éthique de la communication", scl: { Attitude: 3, Oral: 3, Pratique: 10, Écrit: 4 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "6A", title: "6-A Pratiquer les Activités Physiques et Sportives", desc: "Mouvement - saut - sports collectifs - gymnastique - relais - sprint", scl: { Attitude: 3, Oral: 3, Pratique: 10, Écrit: 4 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "6B", title: "6-B Pratiquer les Activités Physiques", desc: "Pour les personnes physiquement handicapées", scl: { Attitude: 8, Oral: 12, Pratique: 0, Écrit: 0 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] },
            { key: "6C", title: "6-C Pratiquer les Activités Artistiques", desc: "Arts visuels - arts du spectacle", scl: { Attitude: 4, Oral: 4, Pratique: 10, Écrit: 2 }, evals: ["Attitude", "Oral", "Pratique", "Écrit"] }
        ];
    };

    const skillsTemplate = getSkillsTemplate();

    return (
        <div className="print-container" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            lineHeight: '1.1',
            padding: '0.5cm',
            maxWidth: '21cm',
            margin: '0 auto'
        }}>
            {/* En-tête horizontal identique aux autres */}
            <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start border-b pb-4 mb-4">
                {/* Left Block */}
                <div className="text-left mb-2 md:mb-0 md:w-1/3">
                    <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
                </div>

                {/* Center Block */}
                <div className="text-center md:flex-1 md:mx-2">
                    <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
                        GROUPE SCOLAIRE BILINGUE THE GRACE OF GOD
                    </div>
                    <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
                        BULLETIN SCOLAIRE - FRANCOPHONE
                    </div>
                </div>

                {/* Right Block */}
                <div className="text-right mt-2 md:mt-0 md:w-1/3">
                    <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
                    <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
                </div>
            </div>

            {/* Student Info */}
            <div style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
                <div style={{ width: '80px', height: '80px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {studentPhoto ? (
                        <img src={studentPhoto} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ fontSize: '7px', textAlign: 'center' }}>Aucune Photo</div>
                    )}
                </div>
                
                <div style={{ flex: 1, fontSize: '9px' }}>
                    <div><strong>Nom:</strong> {meta.studentName || "-"}</div>
                    <div><strong>Sexe:</strong> {meta.sex || "-"}</div>
                    <div><strong>Classe:</strong> {meta.className || "-"}</div>
                    <div><strong>Niveau:</strong> {meta.level || "-"}</div>
                    <div><strong>Trimestre:</strong> {meta.term || "-"}</div>
                    <div><strong>Année:</strong> {meta.year || "-"}</div>
                    <div><strong>Enseignant:</strong> {meta.teacher || "-"}</div>
                </div>
            </div>

            {/* Skills Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7px', marginBottom: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ border: '1px solid #000', padding: '2px', width: '25%' }}>Compétences</th>
                        <th style={{ border: '1px solid #000', padding: '2px', width: '35%' }}>Description</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>Évaluation</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>SCL</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h1}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h2}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h3}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>Appréciation</th>
                    </tr>
                </thead>
                <tbody>
                    {skillsTemplate.map(skill => {
                        const skillData = data[skill.key];
                        if (!skillData) return null;

                        return (
                            <React.Fragment key={skill.key}>
                                {skill.evals.map((ev, i) => (
                                    <tr key={ev + i} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                        {i === 0 && (
                                            <td style={{ border: '1px solid #000', padding: '2px', verticalAlign: 'top', fontWeight: 'bold' }} rowSpan={skill.evals.length}>
                                                {skill.title}
                                            </td>
                                        )}
                                        {i === 0 && (
                                            <td style={{ border: '1px solid #000', padding: '2px', verticalAlign: 'top' }} rowSpan={skill.evals.length}>
                                                {skill.desc}
                                            </td>
                                        )}
                                        <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{ev}</td>
                                        <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{skill.scl[ev]}</td>
                                        <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{skillData.evals[ev]?.m1 || "-"}</td>
                                        <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{skillData.evals[ev]?.m2 || "-"}</td>
                                        <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{skillData.evals[ev]?.m3 || "-"}</td>
                                        {i === 0 && (
                                            <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', verticalAlign: 'top' }} rowSpan={skill.evals.length}>
                                                {skillData.appreciation || "-"}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            {/* Footer Sections */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {/* Legend */}
                <div style={{ flex: 1, border: '1px solid #000', padding: '5px', fontSize: '8px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>
                        Légende des Appréciations
                    </div>
                    <>
                        <div><strong>Acquis</strong> - Compétence maîtrisée</div>
                        <div><strong>En cours d'acquisition</strong> - En progression</div>
                        <div><strong>Expert</strong> - Performance excellente</div>
                        <div><strong>Non acquis</strong> - Pas encore acquis</div>
                    </>
                </div>

                {/* Periods */}
                <div style={{ flex: 1, border: '1px solid #000', padding: '5px', fontSize: '8px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>
                        Périodes
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h1}</strong></div>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h2}</strong></div>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h3}</strong></div>
                        <div style={{ textAlign: 'center' }}>Total: {totals.t1}</div>
                        <div style={{ textAlign: 'center' }}>Total: {totals.t2}</div>
                        <div style={{ textAlign: 'center' }}>Total: {totals.t3}</div>
                        <div style={{ textAlign: 'center' }}>Moy: {averages.a1}</div>
                        <div style={{ textAlign: 'center' }}>Moy: {averages.a2}</div>
                        <div style={{ textAlign: 'center' }}>Moy: {averages.a3}</div>
                        <div style={{ textAlign: 'center' }}>Appr: {periodInfo.app1 || "-"}</div>
                        <div style={{ textAlign: 'center' }}>Appr: {periodInfo.app2 || "-"}</div>
                        <div style={{ textAlign: 'center' }}>Appr: {periodInfo.app3 || "-"}</div>
                    </div>
                </div>

                {/* Summary */}
                <div style={{ flex: 1, border: '2px solid #000', padding: '5px', fontSize: '8px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>
                        Résumé
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                        <div style={{ fontSize: '7px' }}>Moyenne Générale</div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{overallAvg}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '7px' }}>Appréciation:</div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.overallAppreciation || "-"}
                        </div>
                    </div>
                    <div style={{ marginTop: '3px' }}>
                        <div style={{ fontSize: '7px' }}>Position:</div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.position || "-"}
                        </div>
                    </div>
                    <div style={{ marginTop: '3px' }}>
                        <div style={{ fontSize: '7px' }}>Décision:</div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.decision || "-"}
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div style={{ flex: 1 }}>
                    <div style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', marginBottom: '5px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px' }}>Visa de l'Enseignant</div>
                        <div style={{ height: '30px', marginTop: '2px' }}></div>
                    </div>
                    <div style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', marginBottom: '5px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px' }}>Visa du Directeur</div>
                        <div style={{ height: '30px', marginTop: '2px' }}></div>
                    </div>
                    <div style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', marginBottom: '5px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px' }}>Visa du Parent</div>
                        <div style={{ height: '30px', marginTop: '2px' }}></div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div style={{ textAlign: 'center', fontSize: '7px', marginTop: '10px', padding: '3px', backgroundColor: '#e6f2ff', border: '1px solid #99ccff' }}>
                <div>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</div>
                <div>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</div>
                <div>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.5cm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        font-size: 9px;
                    }
                    .print-container {
                        width: 100%;
                    }
                    table {
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintBulletinFrancophone;