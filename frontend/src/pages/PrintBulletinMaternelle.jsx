import React, { useEffect, useState } from 'react';

const PrintBulletinMaternelle = () => {
    const [printData, setPrintData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('printBulletinData');
        if (data) {
            setPrintData(JSON.parse(data));
            setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 1000);
            }, 500);
        } else {
            document.body.innerHTML = '<h1>Aucune donnée à imprimer</h1>';
        }
    }, []);

    if (!printData) {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    const { meta, entetesPeriodes, donnees, resume, photoEleve } = printData;

    // Convertir l'objet donnees en tableau pour l'affichage
    const domainesList = Object.entries(donnees || {});

    // Mapping des titres complets
    const titresDomaines = {
        langues: "LANGUES ET COMMUNICATIONS",
        sciences: "EVEIL SCIENTIFIQUE ET TECHNOLOGIQUE",
        vie: "VIE COURANTE",
        art: "CRÉATION ARTISTIQUE",
        motricite: "MOTRICITÉ GÉNÉRALE"
    };

    return (
        <div className="print-container" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px', // Augmenté de 10px à 12px
            lineHeight: '1.4',
            padding: '0.7cm', // Augmenté de 0.4cm à 0.7cm
            maxWidth: '21cm',
            margin: '0 auto'
        }}>
            {/* En-tête officiel - PLUS VISIBLE */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '2px solid #000',
                paddingBottom: '8px',
                marginBottom: '15px'
            }}>
                <div style={{ width: '28%', fontSize: '11px' }}>
                    <div style={{ fontWeight: 'bold' }}>RÉPUBLIQUE DU CAMEROUN</div>
                    <div>Paix-Travail-Patrie</div>
                    <div>Ministère de l'Éducation de base</div>
                </div>

                <div style={{ width: '38%', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>BULLETIN MATERNELLE</div>
                </div>

                <div style={{ width: '28%', textAlign: 'right', fontSize: '11px' }}>
                    <div style={{ fontWeight: 'bold' }}>REPUBLIC OF CAMEROON</div>
                    <div>Peace-Work-Fatherland</div>
                    <div>Ministry of Basic Education</div>
                </div>
            </div>

            {/* Section Photo + Infos Élève - BIEN VISIBLE */}
            <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px'
            }}>
                {/* Photo - taille normale */}
                <div style={{
                    width: '100px',
                    height: '100px',
                    border: '2px solid #000',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#f5f5f5'
                }}>
                    {photoEleve ? (
                        <img src={photoEleve} alt="Élève" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '30px' }}>
                            📷
                        </div>
                    )}
                </div>

                {/* Infos élève - 2 colonnes pour plus de lisibilité */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px 20px',
                    border: '1px solid #999',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '12px'
                }}>
                    <div><strong>Nom:</strong> {meta?.nomEleve || "_________________________"}</div>
                    <div><strong> Matricule:</strong> {meta?.matricule || "_________________"}</div>
                    <div><strong>Sexe:</strong> {meta?.sexe || "________"}</div>
                    <div><strong>Classe:</strong> {meta?.classe || "_________________"}</div>
                    <div><strong>Trimestre:</strong> {meta?.trimestre || "______________"}</div>
                    <div><strong>Année:</strong> {meta?.anneeScolaire || "______________"}</div>
                    <div><strong> Enseignant:</strong> {meta?.enseignant || "_________________________"}</div>
                </div>
            </div>

            {/* Tableau principal - BIEN VISIBLE */}
            <div style={{ marginBottom: '20px' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '11px' // Augmenté de 9px à 11px
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#e0e0e0' }}>
                            <th style={{ border: '2px solid #000', padding: '8px', textAlign: 'left' }}>Domaines</th>
                            <th style={{ border: '2px solid #000', padding: '8px', textAlign: 'center' }} colSpan="3">Périodes</th>
                            <th style={{ border: '2px solid #000', padding: '8px', textAlign: 'center' }}>Appréciation</th>
                        </tr>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '2px solid #000', padding: '6px' }}></th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }}>{entetesPeriodes?.h1 || "Période 1"}</th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }}>{entetesPeriodes?.h2 || "Période 2"}</th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }}>{entetesPeriodes?.h3 || "Période 3"}</th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {domainesList.map(([key, data], index) => (
                            <tr key={key} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>
                                    {titresDomaines[key] || key}
                                </td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data?.periode1 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data?.periode2 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data?.periode3 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{data?.expression || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Section inférieure - BIEN VISIBLE */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '20px',
                marginTop: '10px'
            }}>
                {/* Légende - complète */}
                <div style={{
                    border: '2px solid #000',
                    padding: '12px',
                    backgroundColor: '#fafafa'
                }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>LÉGENDE DES APPRÉCIATIONS</div>
                    <div style={{ fontSize: '12px' }}>
                        <div style={{ marginBottom: '6px' }}><span style={{ fontWeight: 'bold' }}>Acquis</span> — L'élève maîtrise la compétence</div>
                        <div style={{ marginBottom: '6px' }}><span style={{ fontWeight: 'bold' }}>Non Acquis</span> — L'élève ne maîtrise pas encore</div>
                        <div style={{ marginBottom: '6px' }}><span style={{ fontWeight: 'bold' }}>Expert</span> — Maîtrise parfaite de la compétence</div>
                    </div>
                </div>

                {/* Résumé + Signatures */}
                <div style={{
                    border: '2px solid #000',
                    padding: '12px',
                    backgroundColor: '#fafafa'
                }}>
                    {/* Résumé - 3 colonnes bien visibles */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        marginBottom: '15px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #999',
                        fontSize: '12px'
                    }}>
                        <div><strong>Appréciation:</strong> {resume?.appreciation || "—"}</div>
                        <div><strong>Rang:</strong> {resume?.rang || "—"}</div>
                        <div><strong>Décision:</strong> {resume?.decision || "—"}</div>
                    </div>

                    {/* Signatures - alignées horizontalement */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '15px',
                        fontSize: '12px'
                    }}>
                        {["Enseignant", "Directeur", "Parent"].map((role) => (
                            <div key={role} style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{role}</div>
                                <div style={{
                                    borderBottom: '2px solid #000',
                                    minHeight: '30px',
                                    marginTop: '5px'
                                }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pied de page - bien visible */}
            <div style={{
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#eef6ff',
                border: '1px solid #99ccff',
                textAlign: 'center',
                fontSize: '10px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '3px' }}>
                    <span>📞 (+237) 696-308-503</span>
                    <span>💬 WhatsApp: 651989899</span>
                    <span>📍 YAOUNDÉ - AKOK-NDOE-2</span>
                </div>
                <div>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</div>
            </div>

            {/* Styles d'impression */}
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.7cm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .print-container {
                        width: 100%;
                        page-break-after: avoid;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintBulletinMaternelle;