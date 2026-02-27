import React, { useEffect, useState } from 'react';

const PrintNewNurseryBulletin = () => {
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
            document.body.innerHTML = '<h1>No data to print</h1>';
        }
    }, []);

    if (!printData) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    const { meta, monthHeaders, subjectsData, summary, studentPhoto } = printData;

    // Convertir l'objet subjectsData en tableau pour l'affichage
    const subjectsList = Object.entries(subjectsData || {});

    // Limiter l'affichage si nécessaire (optionnel)
    const displaySubjects = subjectsList; // Ou .slice(0, 20) si trop long

    return (
        <div className="print-container" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            lineHeight: '1.3',
            padding: '0.5cm',
            maxWidth: '21cm',
            margin: '0 auto'
        }}>
            {/* En-tête officiel - ÉPURÉ */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '2px solid #000',
                paddingBottom: '5px',
                marginBottom: '10px',
                fontWeight: 'bold'
            }}>
                <div style={{ width: '28%', fontSize: '9px' }}>
                    <div>RÉPUBLIQUE DU CAMEROUN</div>
                    <div style={{ fontWeight: 'normal' }}>Paix-Travail-Patrie</div>
                    <div style={{ fontWeight: 'normal' }}>Ministère de l'Éducation de base</div>
                </div>

                <div style={{ width: '38%', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px' }}>BILINGUAL SCHOOL GROUP THE GRACE OF GOD</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>NURSERY SCHOOL REPORT</div>
                </div>

                <div style={{ width: '28%', textAlign: 'right', fontSize: '9px' }}>
                    <div>REPUBLIC OF CAMEROON</div>
                    <div style={{ fontWeight: 'normal' }}>Peace-Work-Fatherland</div>
                    <div style={{ fontWeight: 'normal' }}>Ministry of Basic Education</div>
                </div>
            </div>

            {/* Section Photo + Infos Élève - ÉPURÉ */}
            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '15px'
            }}>
                {/* Photo - taille normale */}
                <div style={{
                    width: '90px',
                    height: '90px',
                    border: '2px solid #000',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: '#f5f5f5'
                }}>
                    {studentPhoto ? (
                        <img src={studentPhoto} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                            📷
                        </div>
                    )}
                </div>

                {/* Infos élève - 2 colonnes */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px',
                    border: '1px solid #ccc',
                    padding: '8px',
                    borderRadius: '4px'
                }}>
                    <div><strong> Name:</strong> {meta?.studentName || "_________________"}</div>
                    <div><strong>Sex:</strong> {meta?.sex || "_____"}</div>
                    <div><strong>Class:</strong> {meta?.className || "_________________"}</div>
                    <div><strong>Term:</strong> {meta?.term || "_________________"}</div>
                    <div><strong>Year:</strong> {meta?.academicYear || "_________________"}</div>
                    <div><strong>Teacher:</strong> {meta?.teacherName || "_________________"}</div>
                </div>
            </div>

            {/* Tableau principal - AÉRÉ */}
            <div style={{ marginBottom: '15px' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '9px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#e0e0e0' }}>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'left' }}>SUBJECTS</th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }} colSpan="3">MONTHLY REMARKS</th>
                            <th style={{ border: '2px solid #000', padding: '6px', textAlign: 'center' }}>APPRECIATION</th>
                        </tr>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '2px solid #000', padding: '4px' }}></th>
                            <th style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}>{monthHeaders?.m1 || "Month-1"}</th>
                            <th style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}>{monthHeaders?.m2 || "Month-2"}</th>
                            <th style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}>{monthHeaders?.m3 || "Month-3"}</th>
                            <th style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {displaySubjects.map(([subject, data], index) => (
                            <tr key={subject} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: '500' }}>{subject}</td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{data?.remarks1 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{data?.remarks2 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{data?.remarks3 || "—"}</td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontWeight: '600' }}>{data?.appreciation || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Section inférieure - 2 LIGNES ÉPURÉES */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '15px',
                marginTop: '15px'
            }}>
                {/* Légende - ÉPURÉE */}
                <div style={{
                    border: '2px solid #000',
                    padding: '8px',
                    backgroundColor: '#fafafa'
                }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', fontSize: '11px' }}>📋 APPRECIATION LEGEND</div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '4px 8px',
                        fontSize: '9px'
                    }}>
                        <div><span style={{ fontWeight: 'bold' }}>Excellent</span> — Outstanding</div>
                        <div><span style={{ fontWeight: 'bold' }}>Very good</span> — Above average</div>
                        <div><span style={{ fontWeight: 'bold' }}>Good</span> — Meets expectations</div>
                        <div><span style={{ fontWeight: 'bold' }}>Average</span> — Basic requirements</div>
                        <div><span style={{ fontWeight: 'bold' }}>Fair</span> — Below average</div>
                        <div><span style={{ fontWeight: 'bold' }}>Regular</span> — Consistent</div>
                        <div><span style={{ fontWeight: 'bold' }}>Irregular</span> — Inconsistent</div>
                        <div><span style={{ fontWeight: 'bold' }}>Friendly</span> — Social skills</div>
                    </div>
                </div>

                {/* Résumé + Signatures */}
                <div style={{
                    border: '2px solid #000',
                    padding: '8px',
                    backgroundColor: '#fafafa'
                }}>
                    {/* Résumé */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '5px',
                        marginBottom: '10px',
                        paddingBottom: '8px',
                        borderBottom: '1px dashed #999'
                    }}>
                        <div><strong>Result:</strong> {summary?.result || "—"}</div>
                        <div><strong>Position:</strong> {summary?.position || "—"}</div>
                        <div><strong>Appreciation:</strong> {summary?.appreciation || "—"}</div>
                    </div>

                    {/* Signatures */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px'
                    }}>
                        {["Teacher", "Headmaster", "Parent"].map((role, idx) => (
                            <div key={role} style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{role}'s Visa</div>
                                <div style={{
                                    borderBottom: '2px solid #000',
                                    minHeight: '25px',
                                    fontSize: '9px',
                                    padding: '2px 0'
                                }}>
                                    {idx === 0 ? summary?.teacherSignature || "" :
                                     idx === 1 ? summary?.headmasterSignature || "" :
                                     summary?.parentSignature || ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pied de page - ÉPURÉ */}
            <div style={{
                marginTop: '15px',
                padding: '6px',
                backgroundColor: '#eef6ff',
                border: '1px solid #99ccff',
                textAlign: 'center',
                fontSize: '8px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <span>📞 (+237) 696-308-503</span>
                    <span>💬 WhatsApp: 651989899</span>
                    <span>📍 YAOUNDÉ - AKOK-NDOE-2</span>
                </div>
                <div style={{ marginTop: '2px' }}>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</div>
            </div>

            {/* Styles d'impression */}
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.5cm;
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

export default PrintNewNurseryBulletin;