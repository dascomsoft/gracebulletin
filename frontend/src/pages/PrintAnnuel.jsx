import React, { useEffect, useState } from 'react';

const PrintAnnuel = () => {
    const [printData, setPrintData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('printAnnuelData');
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
        return <div>Chargement...</div>;
    }

    const { meta, data: termData, summary, totalResult, annualAverage } = printData;

    return (
        <div className="print-container" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            lineHeight: '1.1',
            padding: '0.5cm',
            maxWidth: '21cm',
            margin: '0 auto'
        }}>
            {/* Header en français */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '10px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold' }}>RÉPUBLIQUE DU CAMEROUN</div>
                <div style={{ fontSize: '8px' }}>Paix-Travail-Patrie</div>
                <div style={{ fontSize: '9px' }}>Ministère de l'Éducation de base</div>
                <div style={{ fontSize: '9px' }}>Délégation Régionale du Centre</div>
                <div style={{ fontSize: '9px' }}>Délégation Départementale du Mfoundi</div>
                
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '5px' }}>
                    GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
                </div>
                <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    BULLETIN SCOLAIRE (ANNUEL)
                </div>
                
                <div style={{ fontSize: '9px', fontWeight: 'bold', marginTop: '5px' }}>REPUBLIC OF CAMEROON</div>
                <div style={{ fontSize: '8px' }}>Peace-Work-Fatherland</div>
                <div style={{ fontSize: '9px' }}>Ministry of Basic Education</div>
                <div style={{ fontSize: '9px' }}>Centre Regional Delegation</div>
                <div style={{ fontSize: '9px' }}>Divisional Delegation of Mfoundi Division</div>
            </div>

            {/* Student Info en français */}
            <div style={{ marginBottom: '10px', fontSize: '9px' }}>
                <div><strong>Nom:</strong> {meta.studentName || "-"}</div>
                <div><strong>Classe:</strong> {meta.className || "-"}</div>
                <div><strong>Année Scolaire:</strong> {meta.schoolYear || "-"}</div>
                <div><strong>Sexe:</strong> {meta.sex || "-"}</div>
            </div>

            {/* Results Table en français */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8px', marginBottom: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ border: '1px solid #000', padding: '3px' }}>Trimestres</th>
                        <th style={{ border: '1px solid #000', padding: '3px' }}>Résultats</th>
                        <th style={{ border: '1px solid #000', padding: '3px' }}>Position</th>
                        <th style={{ border: '1px solid #000', padding: '3px' }}>Remarques</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>1er Trimestre</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term1.result || "-"}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term1.position || "-"}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }} rowSpan="3">{summary.remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>2ème Trimestre</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term2.result || "-"}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term2.position || "-"}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>3ème Trimestre</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term3.result || "-"}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term3.position || "-"}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold' }}>TOTAL</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', fontWeight: 'bold' }}>{totalResult || "0.00"}</td>
                        <td style={{ border: '1px solid #000', padding: '3px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '3px' }}></td>
                    </tr>
                </tbody>
            </table>

            {/* Summary Section en français */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '5px' }}>
                        <strong>Moyenne Annuelle:</strong> {annualAverage || "0.00"}
                    </div>
                    <div>
                        <strong>Position Annuelle:</strong> {summary.annualPosition || "-"}
                    </div>
                </div>
            </div>

            {/* Décision du Conseil de Classe */}
            <div style={{ border: '1px solid #000', padding: '5px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '5px' }}>DÉCISION DU CONSEIL DE CLASSE</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><strong>Promu en:</strong> {summary.councilDecision.promotedTo || "-"}</div>
                    <div><strong>Redoubler la classe:</strong> {summary.councilDecision.repeatClass || "Non"}</div>
                </div>
            </div>

            {/* Signatures en français */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1, border: '1px solid #000', padding: '5px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>Chef d'Établissement</div>
                    <div style={{ height: '40px', marginBottom: '5px' }}>
                        {summary.headObservation || ""}
                    </div>
                    <div style={{ borderTop: '1px solid #000', textAlign: 'center', paddingTop: '3px' }}>
                        {summary.headSignature || "Signature"}
                    </div>
                </div>
                
                <div style={{ flex: 1, border: '1px solid #000', padding: '5px' }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>Parent</div>
                    <div style={{ height: '40px', marginBottom: '5px' }}></div>
                    <div style={{ borderTop: '1px solid #000', textAlign: 'center', paddingTop: '3px' }}>
                        {summary.parentSignature || "Signature"}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '9px', marginBottom: '10px' }}>
                Yaoundé, le ___________
            </div>

            {/* Contact Info en français */}
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

export default PrintAnnuel;