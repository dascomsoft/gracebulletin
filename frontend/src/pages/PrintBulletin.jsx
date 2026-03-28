





import React, { useEffect, useState } from 'react';

const PrintBulletin = () => {
    const [bulletinData, setBulletinData] = useState(null);
    const [bulletinType, setBulletinType] = useState('anglophone'); // Type par défaut

    useEffect(() => {
    // Récupérer les données depuis localStorage
    const data = localStorage.getItem('printBulletinData');
    
    if (!data) {
        document.body.innerHTML = '<h1>Aucune donnée à imprimer</h1>';
        return;
    }

    try {
        const parsedData = JSON.parse(data);
        console.log('📦 Données reçues:', parsedData);
        
        setBulletinData(parsedData);
        
        // ✅ Utiliser le bulletinType des données (AJOUTÉ DANS LE FORMULAIRE)
        if (parsedData.bulletinType) {
            setBulletinType(parsedData.bulletinType);
            console.log('📌 Type détecté:', parsedData.bulletinType);
        }
        
        // Imprimer automatiquement
        setTimeout(() => {
            window.print();
            // Fermer après impression
            setTimeout(() => window.close(), 1000);
        }, 500);
        
    } catch (error) {
        console.error('❌ Erreur parsing:', error);
        document.body.innerHTML = '<h1>Erreur de chargement des données</h1>';
    }
}, []);







    if (!bulletinData) {
        return <div>Chargement...</div>;
    }

    const { meta, studentPhoto, periodHeaders, data, totals, averages, periodInfo, overallAvg, summary } = bulletinData;

    // Définir les templates en fonction du type
    const getSkillsTemplate = () => {
        switch(bulletinType) {
            case 'francophone':
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
            
            case 'maternelle':
                return [
                    { key: "langage", title: "Langage Oral et Écrit", desc: "Communication, vocabulaire, pré-lecture, pré-écriture", scl: { Expression: 20, Compréhension: 15, Vocabulaire: 15 }, evals: ["Expression", "Compréhension", "Vocabulaire"] },
                    { key: "maths", title: "Découverte du Monde - Mathématiques", desc: "Nombres, formes, grandeurs, espace, temps", scl: { Nombres: 20, Formes: 10, Mesures: 10, Espace: 10 }, evals: ["Nombres", "Formes", "Mesures", "Espace"] },
                    { key: "motricite", title: "Activités Physiques et Motricité", desc: "Déplacements, équilibre, coordination, motricité fine", scl: { Globale: 15, Fine: 15, Coordination: 10 }, evals: ["Globale", "Fine", "Coordination"] },
                    { key: "artistique", title: "Activités Artistiques", desc: "Arts plastiques, musique, expression corporelle", scl: { Créativité: 15, Expression: 15, Sensibilité: 10 }, evals: ["Créativité", "Expression", "Sensibilité"] },
                    { key: "social", title: "Vivre Ensemble - Socialisation", desc: "Autonomie, respect, coopération, règles de vie", scl: { Autonomie: 15, Socialisation: 15, Règles: 10 }, evals: ["Autonomie", "Socialisation", "Règles"] },
                    { key: "sciences", title: "Découverte du Monde - Sciences", desc: "Observation, expérimentation, environnement", scl: { Observation: 15, Expérimentation: 15, Curiosité: 10 }, evals: ["Observation", "Expérimentation", "Curiosité"] }
                ];
            
            case 'nursery':
                return [
                    { key: "language", title: "Language Development", desc: "Listening, speaking, vocabulary, pre-reading skills", scl: { Listening: 15, Speaking: 15, Vocabulary: 10 }, evals: ["Listening", "Speaking", "Vocabulary"] },
                    { key: "cognitive", title: "Cognitive Development", desc: "Numbers, shapes, colors, matching, sorting", scl: { Numbers: 15, Shapes: 10, Colors: 10, Matching: 5 }, evals: ["Numbers", "Shapes", "Colors", "Matching"] },
                    { key: "motor", title: "Motor Skills Development", desc: "Gross motor, fine motor, coordination", scl: { Gross: 15, Fine: 15, Coordination: 10 }, evals: ["Gross", "Fine", "Coordination"] },
                    { key: "social", title: "Social & Emotional Development", desc: "Sharing, cooperation, self-help, emotional expression", scl: { Sharing: 10, Cooperation: 10, "Self-help": 10, Emotions: 10 }, evals: ["Sharing", "Cooperation", "Self-help", "Emotions"] },
                    { key: "creative", title: "Creative Development", desc: "Art, music, imaginative play, creativity", scl: { Art: 10, Music: 10, Play: 10, Creativity: 10 }, evals: ["Art", "Music", "Play", "Creativity"] },
                    { key: "discovery", title: "Discovery of the World", desc: "Nature, science exploration, curiosity", scl: { Nature: 10, Science: 10, Curiosity: 10, Exploration: 10 }, evals: ["Nature", "Science", "Curiosité", "Exploration"] }
                ];
            
            default: // anglophone
                return [
                    { key: "1A", title: "1A- Communicate in English", desc: "Listening - speaking - writing - reading", scl: { Attitude: 5, Oral: 20, Written: 15 }, evals: ["Attitude", "Oral", "Written"] },
                    { key: "1B", title: "1B- Communicate in French", desc: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary", scl: { Attitude: 5, Oral: 20, Written: 15 }, evals: ["Attitude", "Oral", "Written"] },
                    { key: "1C", title: "1C- Communicate in One National Language", desc: "Customs - traditions - mode of life - interpretation of phenomena", scl: { Oral: 15, Practical: 5 }, evals: ["Oral", "Practical"] },
                    { key: "2A", title: "2A- Use basic Notions in Mathematics", desc: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry", scl: { Attitude: 5, Oral: 10, Practical: 15, Written: 30 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "2B", title: "2B- Use basic Notions in science and technology", desc: "Health and environmental education - technology and engineering", scl: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "3A", title: "3A- Practise Social Value", desc: "History and geography", scl: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "3B", title: "3B- Practise Citizenship values", desc: "Civics - human right - moral education", scl: { Attitude: 10, Oral: 10, Practical: 5, Written: 5 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "4A", title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies", desc: "Needles work - house craft - laundry and food nutrition", scl: { Attitude: 3, Oral: 2, Practical: 6, Written: 4 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "4B", title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship", desc: "Agricultural tool - farming and gardening - livestock farming", scl: { Attitude: 3, Oral: 2, Practical: 6, Written: 4 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "5", title: "5- Use Basic Concepts and Tools of Information and Communication Technologies", desc: "The computer and ICT tools - Internet and communication ethics", scl: { Attitude: 3, Oral: 3, Practical: 10, Written: 4 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "6A", title: "6-A Practise Physical and Sports Activities", desc: "Movement - jumping - team sports - gymnastics - relay - sprint", scl: { Attitude: 3, Oral: 3, Practical: 10, Written: 4 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "6B", title: "6-B Practice Physical sport", desc: "For physically challenged", scl: { Attitude: 8, Oral: 12, Practical: 0, Written: 0 }, evals: ["Attitude", "Oral", "Practical", "Written"] },
                    { key: "6C", title: "6-C Practice Artistic Activities", desc: "Visual arts - performing arts", scl: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 }, evals: ["Attitude", "Oral", "Practical", "Written"] }
                ];
        }
    };

    const skillsTemplate = getSkillsTemplate();

    // Définir les titres en fonction du type
    const getHeaderTitle = () => {
        switch(bulletinType) {
            case 'francophone':
                return "BULLETIN SCOLAIRE - FRANCOPHONE";
            case 'maternelle':
                return "BULLETIN MATERNELLE";
            case 'nursery':
                return "NURSERY SCHOOL REPORT";
            default:
                return "SCHOOL REPORT - ANGLOPHONE";
        }
    };

    return (
        <div className="print-container" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            lineHeight: '1.1',
            padding: '0.5cm',
            maxWidth: '21cm',
            margin: '0 auto'
        }}>
            {/* Header - MODIFIÉ POUR CORRESPONDRE AUX AUTRES */}
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
                        BILINGUAL SCHOOL GROUP THE GRACE OF GOD
                    </div>
                    <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
                        {getHeaderTitle()}
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
                        <div style={{ fontSize: '7px', textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'No Photo' : 'Aucune Photo'}
                        </div>
                    )}
                </div>
                
                <div style={{ flex: 1, fontSize: '9px' }}>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Name:' : 'Nom:'}</strong> {meta.studentName || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Sex:' : 'Sexe:'}</strong> {meta.sex || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Class:' : 'Classe:'}</strong> {meta.className || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Level:' : 'Niveau:'}</strong> {meta.level || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Term:' : 'Trimestre:'}</strong> {meta.term || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Year:' : 'Année:'}</strong> {meta.year || "-"}</div>
                    <div><strong>{bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Teacher:' : 'Enseignant:'}</strong> {meta.teacher || "-"}</div>
                </div>
            </div>

            {/* Skills Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7px', marginBottom: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ border: '1px solid #000', padding: '2px', width: '25%' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Skills' : 'Compétences'}
                        </th>
                        <th style={{ border: '1px solid #000', padding: '2px', width: '35%' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Description' : 'Description'}
                        </th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Eval' : 'Évaluation'}
                        </th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>SCL</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h1}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h2}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{periodHeaders.h3}</th>
                        <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appreciation' : 'Appréciation'}
                        </th>
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
                        {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appreciation Legend' : 'Légende des Appréciations'}
                    </div>
                    {bulletinType === 'anglophone' || bulletinType === 'nursery' ? (
                        <>
                            <div><strong>Acquired</strong> - Mastered skill</div>
                            <div><strong>In process</strong> - Progressing</div>
                            <div><strong>Expert</strong> - Above expectations</div>
                            <div><strong>Not acquired</strong> - Not yet acquired</div>
                        </>
                    ) : (
                        <>
                            <div><strong>Acquis</strong> - Compétence maîtrisée</div>
                            <div><strong>En cours d'acquisition</strong> - En progression</div>
                            <div><strong>Expert</strong> - Performance excellente</div>
                            <div><strong>Non acquis</strong> - Pas encore acquis</div>
                        </>
                    )}
                </div>

                {/* Periods */}
                <div style={{ flex: 1, border: '1px solid #000', padding: '5px', fontSize: '8px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>
                        {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Periods' : 'Périodes'}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h1}</strong></div>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h2}</strong></div>
                        <div style={{ textAlign: 'center' }}><strong>{periodHeaders.h3}</strong></div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Total:' : 'Total:'} {totals.t1}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Total:' : 'Total:'} {totals.t2}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Total:' : 'Total:'} {totals.t3}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Avg:' : 'Moy:'} {averages.a1}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Avg:' : 'Moy:'} {averages.a2}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Avg:' : 'Moy:'} {averages.a3}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appr:' : 'Appr:'} {periodInfo.app1 || "-"}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appr:' : 'Appr:'} {periodInfo.app2 || "-"}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appr:' : 'Appr:'} {periodInfo.app3 || "-"}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div style={{ flex: 1, border: '2px solid #000', padding: '5px', fontSize: '8px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>
                        {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Summary' : 'Résumé'}
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                        <div style={{ fontSize: '7px' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Overall Average' : 'Moyenne Générale'}
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{overallAvg}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '7px' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Appreciation:' : 'Appréciation:'}
                        </div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.overallAppreciation || "-"}
                        </div>
                    </div>
                    <div style={{ marginTop: '3px' }}>
                        <div style={{ fontSize: '7px' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Position:' : 'Position:'}
                        </div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.position || "-"}
                        </div>
                    </div>
                    <div style={{ marginTop: '3px' }}>
                        <div style={{ fontSize: '7px' }}>
                            {bulletinType === 'anglophone' || bulletinType === 'nursery' ? 'Decision:' : 'Décision:'}
                        </div>
                        <div style={{ border: '1px solid #000', padding: '2px', minHeight: '15px', textAlign: 'center' }}>
                            {summary.decision || "-"}
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div style={{ flex: 1 }}>
                    {['Teacher', 'Headmaster', 'Parent'].map((role) => (
                        <div key={role} style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', marginBottom: '5px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '7px' }}>
                                {bulletinType === 'anglophone' || bulletinType === 'nursery' 
                                    ? `${role}'s Visa`
                                    : role === 'Teacher' ? "Visa de l'Enseignant" 
                                    : role === 'Headmaster' ? "Visa du Directeur" 
                                    : "Visa du Parent"}
                            </div>
                            <div style={{ height: '30px', marginTop: '2px' }}></div>
                        </div>
                    ))}
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
                    button {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintBulletin;