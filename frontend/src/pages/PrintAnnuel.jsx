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
        <div className="print-container p-4 sm:p-6 max-w-4xl mx-auto bg-white text-gray-800" style={{
            fontFamily: 'Arial, sans-serif',
        }}>
            {/* En-tête horizontal exactement comme demandé */}
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
                        GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
                    </div>
                    <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
                        BULLETIN SCOLAIRE (ANNUEL)
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
            <div className="mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="font-semibold">Nom:</span> {meta.studentName || "-"}</div>
                    <div><span className="font-semibold">Année Scolaire:</span> {meta.schoolYear || "-"}</div>
                    <div><span className="font-semibold">Classe:</span> {meta.className || "-"}</div>
                    <div><span className="font-semibold">Sexe:</span> {meta.sex || "-"}</div>
                </div>
            </div>

            {/* Results Table */}
            <table className="w-full border-collapse border border-gray-800 text-xs mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-800 p-2 text-left">Trimestres</th>
                        <th className="border border-gray-800 p-2 text-left">Résultats</th>
                        <th className="border border-gray-800 p-2 text-left">Position</th>
                        <th className="border border-gray-800 p-2 text-left">Remarques</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-800 p-2">1er Trimestre</td>
                        <td className="border border-gray-800 p-2">{termData.term1?.result || "-"}</td>
                        <td className="border border-gray-800 p-2">{termData.term1?.position || "-"}</td>
                        <td className="border border-gray-800 p-2" rowSpan="3">{summary.remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2">2ème Trimestre</td>
                        <td className="border border-gray-800 p-2">{termData.term2?.result || "-"}</td>
                        <td className="border border-gray-800 p-2">{termData.term2?.position || "-"}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2">3ème Trimestre</td>
                        <td className="border border-gray-800 p-2">{termData.term3?.result || "-"}</td>
                        <td className="border border-gray-800 p-2">{termData.term3?.position || "-"}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2 font-bold">TOTAL</td>
                        <td className="border border-gray-800 p-2 font-bold">{totalResult || "0.00"}</td>
                        <td className="border border-gray-800 p-2"></td>
                        <td className="border border-gray-800 p-2"></td>
                    </tr>
                </tbody>
            </table>

            {/* Summary Section */}
            <div className="flex gap-8 text-sm mb-4">
                <div><span className="font-semibold">Moyenne Annuelle:</span> {annualAverage || "0.00"}</div>
                <div><span className="font-semibold">Position Annuelle:</span> {summary.annualPosition || "-"}</div>
            </div>

            {/* Class Council's Decision */}
            <div className="mb-4">
                <div className="font-bold text-sm mb-2">DÉCISION DU CONSEIL DE CLASSE</div>
                <div className="flex gap-8 text-xs">
                    <div><span className="font-semibold">Promu en:</span> {summary.councilDecision?.promotedTo || "-"}</div>
                    <div><span className="font-semibold">Redoubler la classe:</span> {summary.councilDecision?.repeatClass || "Non"}</div>
                </div>
            </div>

            {/* Signatures */}
            <div className="mb-4">
                <div className="font-semibold text-xs mb-1">Observations et signature du chef d'établissement:</div>
                <div className="border border-gray-800 min-h-[60px] p-2 text-xs mb-2">
                    {summary.headObservation || ""}
                </div>
                
                <div className="font-semibold text-xs mb-1">Parent et signature:</div>
                <div className="border border-gray-800 min-h-[60px] p-2 text-xs mb-3">
                    {summary.parentComment || ""}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <div className="font-semibold text-xs mb-1">Signature du chef</div>
                        <div className="border-b border-gray-800 min-h-[25px]">
                            {summary.headSignature || ""}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs mb-1">Signature du parent</div>
                        <div className="border-b border-gray-800 min-h-[25px]">
                            {summary.parentSignature || ""}
                        </div>
                    </div>
                </div>
            </div>

            {/* Date */}
            <div className="text-right text-xs mt-4">
                Yaoundé, le ___________
            </div>

            {/* Contact Info */}
            <div className="text-center text-[8px] mt-6 p-2 bg-blue-50 border border-blue-200 rounded">
                <div>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</div>
                <div>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</div>
                <div>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0.7cm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .print-container {
                        width: 100%;
                        padding: 0.2cm;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintAnnuel;