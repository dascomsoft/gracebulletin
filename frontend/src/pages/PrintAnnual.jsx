// import React, { useEffect, useState } from 'react';

// const PrintAnnual = () => {
//     const [printData, setPrintData] = useState(null);

//     useEffect(() => {
//         const data = localStorage.getItem('printAnnualData');
//         if (data) {
//             setPrintData(JSON.parse(data));
//             setTimeout(() => {
//                 window.print();
//                 setTimeout(() => window.close(), 1000);
//             }, 500);
//         } else {
//             document.body.innerHTML = '<h1>No data to print</h1>';
//         }
//     }, []);

//     if (!printData) {
//         return <div>Loading...</div>;
//     }

//     const { meta, data: termData, summary, totalResult, annualAverage } = printData;

//     return (
//         <div className="print-container" style={{
//             fontFamily: 'Arial, sans-serif',
//             fontSize: '10px',
//             lineHeight: '1.1',
//             padding: '0.5cm',
//             maxWidth: '21cm',
//             margin: '0 auto'
//         }}>
//             {/* Header */}
//             <div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '10px' }}>
//                 <div style={{ fontSize: '9px', fontWeight: 'bold' }}>RÉPUBLIQUE DU CAMEROUN</div>
//                 <div style={{ fontSize: '8px' }}>Paix-Travail-Patrie</div>
//                 <div style={{ fontSize: '9px' }}>Ministère de l'Éducation de base</div>
//                 <div style={{ fontSize: '9px' }}>Délégation Régionale du Centre</div>
//                 <div style={{ fontSize: '9px' }}>Délégation Départementale du Mfoundi</div>
                
//                 <div style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '5px' }}>
//                     BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//                 </div>
//                 <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
//                     SCHOOL REPORT (ANNUAL)
//                 </div>
                
//                 <div style={{ fontSize: '9px', fontWeight: 'bold', marginTop: '5px' }}>REPUBLIC OF CAMEROON</div>
//                 <div style={{ fontSize: '8px' }}>Peace-Work-Fatherland</div>
//                 <div style={{ fontSize: '9px' }}>Ministry of Basic Education</div>
//                 <div style={{ fontSize: '9px' }}>Centre Regional Delegation</div>
//                 <div style={{ fontSize: '9px' }}>Divisional Delegation of Mfoundi Division</div>
//             </div>

//             {/* Student Info */}
//             <div style={{ marginBottom: '10px', fontSize: '9px' }}>
//                 <div><strong>Name:</strong> {meta.studentName || "-"}</div>
//                 <div><strong>Class:</strong> {meta.className || "-"}</div>
//                 <div><strong>School Year:</strong> {meta.schoolYear || "-"}</div>
//                 <div><strong>Sex:</strong> {meta.sex || "-"}</div>
//             </div>

//             {/* Results Table */}
//             <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8px', marginBottom: '10px' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f0f0f0' }}>
//                         <th style={{ border: '1px solid #000', padding: '3px' }}>Terms</th>
//                         <th style={{ border: '1px solid #000', padding: '3px' }}>Results</th>
//                         <th style={{ border: '1px solid #000', padding: '3px' }}>Position</th>
//                         <th style={{ border: '1px solid #000', padding: '3px' }}>Remarks</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>1st Term</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term1.result || "-"}</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term1.position || "-"}</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }} rowSpan="3">{summary.remarks || "-"}</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>2nd Term</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term2.result || "-"}</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term2.position || "-"}</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>3rd Term</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term3.result || "-"}</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{termData.term3.position || "-"}</td>
//                     </tr>
//                     <tr>
//                         <td style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold' }}>TOTAL</td>
//                         <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center', fontWeight: 'bold' }}>{totalResult || "0.00"}</td>
//                         <td style={{ border: '1px solid #000', padding: '3px' }}></td>
//                         <td style={{ border: '1px solid #000', padding: '3px' }}></td>
//                     </tr>
//                 </tbody>
//             </table>

//             {/* Summary Section */}
//             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//                 <div style={{ flex: 1 }}>
//                     <div style={{ marginBottom: '5px' }}>
//                         <strong>Annual Average:</strong> {annualAverage || "0.00"}
//                     </div>
//                     <div>
//                         <strong>Annual Position:</strong> {summary.annualPosition || "-"}
//                     </div>
//                 </div>
//             </div>

//             {/* Class Council's Decision */}
//             <div style={{ border: '1px solid #000', padding: '5px', marginBottom: '10px' }}>
//                 <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '5px' }}>CLASS COUNCIL'S DECISION</div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <div><strong>Promoted to:</strong> {summary.councilDecision.promotedTo || "-"}</div>
//                     <div><strong>To repeat class:</strong> {summary.councilDecision.repeatClass || "No"}</div>
//                 </div>
//             </div>

//             {/* Signatures */}
//             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//                 <div style={{ flex: 1, border: '1px solid #000', padding: '5px' }}>
//                     <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>Head of Institution</div>
//                     <div style={{ height: '40px', marginBottom: '5px' }}>
//                         {summary.headObservation || ""}
//                     </div>
//                     <div style={{ borderTop: '1px solid #000', textAlign: 'center', paddingTop: '3px' }}>
//                         {summary.headSignature || "Signature"}
//                     </div>
//                 </div>
                
//                 <div style={{ flex: 1, border: '1px solid #000', padding: '5px' }}>
//                     <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '3px' }}>Parent</div>
//                     <div style={{ height: '40px', marginBottom: '5px' }}></div>
//                     <div style={{ borderTop: '1px solid #000', textAlign: 'center', paddingTop: '3px' }}>
//                         {summary.parentSignature || "Signature"}
//                     </div>
//                 </div>
//             </div>

//             <div style={{ textAlign: 'right', fontSize: '9px', marginBottom: '10px' }}>
//                 Yaoundé, the ___________
//             </div>

//             {/* Contact Info */}
//             <div style={{ textAlign: 'center', fontSize: '7px', marginTop: '10px', padding: '3px', backgroundColor: '#e6f2ff', border: '1px solid #99ccff' }}>
//                 <div>Telephone: (+237) 696-308-503 / WhatsApp: 651989899</div>
//                 <div>Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, opposite the mini market)</div>
//                 <div>Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025</div>
//             </div>

//             {/* Print Styles */}
//             <style>{`
//                 @media print {
//                     @page {
//                         size: A4 portrait;
//                         margin: 0.5cm;
//                     }
//                     body {
//                         margin: 0;
//                         padding: 0;
//                         font-size: 9px;
//                     }
//                     .print-container {
//                         width: 100%;
//                     }
//                     table {
//                         page-break-inside: avoid;
//                     }
//                     button {
//                         display: none !important;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default PrintAnnual;





































import React, { useEffect, useState } from 'react';

const PrintAnnual = () => {
    const [printData, setPrintData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('printAnnualData');
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
        return <div>Loading...</div>;
    }

    const { meta, data: termData, summary, totalResult, annualAverage } = printData;

    return (
        <div className="print-container p-4 sm:p-6 max-w-4xl mx-auto bg-white text-gray-800" style={{
            fontFamily: 'Arial, sans-serif',
        }}>
            {/* En-tête exactement comme demandé */}
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
                        SCHOOL REPORT (ANNUAL)
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

            {/* Student Info - Format exact comme l'image */}
            <div className="mb-4">
                <div className="font-bold text-sm mb-1">
                    Student: {meta.studentName || "DASCOM SOFT"} - Class: {meta.className || "NURSERY 2"} - Annual Report
                </div>
                <div className="text-xs mb-3">ID: {meta.id || "187"}</div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="font-semibold">Name:</span> {meta.studentName || "DASCOM SOFT"}</div>
                    <div><span className="font-semibold">School Year:</span> {meta.schoolYear || "2025-2026"}</div>
                    <div><span className="font-semibold">Class:</span> {meta.className || "Select Class"}</div>
                    <div><span className="font-semibold">Sex:</span> {meta.sex || "Select Sex"}</div>
                </div>
            </div>

            {/* Tableau des résultats */}
            <table className="w-full border-collapse border border-gray-800 text-xs mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-800 p-2 text-left">Terms</th>
                        <th className="border border-gray-800 p-2 text-left">Results</th>
                        <th className="border border-gray-800 p-2 text-left">Position</th>
                        <th className="border border-gray-800 p-2 text-left">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-800 p-2">1st Term</td>
                        <td className="border border-gray-800 p-2">{termData.term1?.result || "0.00"}</td>
                        <td className="border border-gray-800 p-2">{termData.term1?.position || "e.g., 5th/30"}</td>
                        <td className="border border-gray-800 p-2">{termData.term1?.remark || "Acquired"}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2">2nd Term</td>
                        <td className="border border-gray-800 p-2">{termData.term2?.result || "0.00"}</td>
                        <td className="border border-gray-800 p-2">{termData.term2?.position || "e.g., 5th/30"}</td>
                        <td className="border border-gray-800 p-2">{termData.term2?.remark || ""}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2">3rd Term</td>
                        <td className="border border-gray-800 p-2">{termData.term3?.result || "0.00"}</td>
                        <td className="border border-gray-800 p-2">{termData.term3?.position || "e.g., 5th/30"}</td>
                        <td className="border border-gray-800 p-2">{termData.term3?.remark || "ACQUIRED"}</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-800 p-2 font-bold">TOTAL</td>
                        <td className="border border-gray-800 p-2 font-bold">{totalResult || "0.00"}</td>
                        <td className="border border-gray-800 p-2"></td>
                        <td className="border border-gray-800 p-2"></td>
                    </tr>
                </tbody>
            </table>

            {/* Annual Average et Position */}
            <div className="flex gap-8 text-sm mb-4">
                <div><span className="font-semibold">Annual Average:</span> {annualAverage || "0.00"}</div>
                <div><span className="font-semibold">Annual Position:</span> {summary.annualPosition || "e.g., 5th/30"}</div>
            </div>

            {/* CLASS COUNCIL'S DECISION */}
            <div className="mb-4">
                <div className="font-bold text-sm mb-2">CLASS COUNCIL'S DECISION</div>
                <div className="flex gap-8 text-xs">
                    <div><span className="font-semibold">Promoted to:</span> {summary.councilDecision?.promotedTo || "Nursery 1"}</div>
                    <div><span className="font-semibold">To repeat class:</span> {summary.councilDecision?.repeatClass || "No"}</div>
                </div>
            </div>

            {/* Signatures */}
            <div className="mb-4">
                <div className="font-semibold text-xs mb-1">Head of the institution's observation and signature:</div>
                <div className="border border-gray-800 min-h-[60px] p-2 text-xs mb-2">
                    {summary.headObservation || "Enter head's observations..."}
                </div>
                
                <div className="font-semibold text-xs mb-1">Parent and signature:</div>
                <div className="border border-gray-800 min-h-[60px] p-2 text-xs mb-3">
                    {summary.parentComment || "Parent's comments..."}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <div className="font-semibold text-xs mb-1">Head's signature</div>
                        <div className="border-b border-gray-800 min-h-[25px]">
                            {summary.headSignature || ""}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs mb-1">Parent's signature</div>
                        <div className="border-b border-gray-800 min-h-[25px]">
                            {summary.parentSignature || ""}
                        </div>
                    </div>
                </div>
            </div>

            {/* Date */}
            <div className="text-right text-xs mt-4">
                Yaoundé, the ______
            </div>

            {/* Styles d'impression */}
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

export default PrintAnnual;