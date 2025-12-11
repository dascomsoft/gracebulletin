// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const BulletinPreview = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const {
//         meta,
//         studentPhoto,
//         periodHeaders,
//         data,
//         totals,
//         averages,
//         periodInfo,
//         overallAvg,
//         summary
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
//         if (confirm("Are you sure you want to finalize and clear the form?")) {
//             localStorage.removeItem('bulletinFormData');
//             navigate("/dashboard");
//         }
//     };

//     if (!location.state) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="text-xl font-bold text-red-600 mb-4">No data found</div>
//                     <button
//                         onClick={() => navigate("/")}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                     >
//                         Back to Form
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
//             {/* Header - invisible durant l'impression */}
//             <div className="w-full max-w-4xl mb-2 print:hidden">
//                 <div className="bg-blue-600 text-white p-2 rounded shadow">
//                     <h1 className="text-lg font-bold text-center">Report Card Preview</h1>
//                     <p className="text-center text-blue-100 text-xs">
//                         Check all information before printing. Your data is automatically saved.
//                     </p>
//                 </div>
//             </div>

//             {/* Page principale - TOUT RESSERRÉ VERS LE HAUT */}
//             <div className="bg-white w-full max-w-4xl shadow-sm p-3 print:shadow-none print:max-w-full print:p-1" style={{ minHeight: '27.5cm' }}>

//                 {/* Header - TRÈS COMPACT */}
//                 <div className="w-full mb-0 print:mb-0 border-b border-gray-300 pb-0 print:pb-0">
//                     <div className="flex flex-col items-center text-gray-600 text-[10px] print:text-[9px] md:flex-row md:justify-between md:items-start">
//                         {/* Bloc gauche */}
//                         <div className="text-left mb-0 md:mb-0 md:w-1/3">
//                             <div className="font-bold">RÉPUBLIQUE DU CAMEROUN</div>
//                             <div className="text-[8px]">Paix-Travail-Patrie</div>
//                             <div className="text-[9px]">Ministère de l'Éducation de base</div>
//                             <div className="text-[9px]">Délégation Régionale du Centre</div>
//                             <div className="text-[9px]">Délégation Départementale du Mfoundi</div>
//                         </div>

//                         {/* Bloc centre */}
//                         <div className="text-center md:flex-1 md:mx-1">
//                             <div className="font-extrabold text-[11px] print:text-[10px]">
//                                 BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//                             </div>
//                             <div className="text-[12px] print:text-[11px] font-bold">
//                                 SCHOOL REPORT
//                             </div>
//                         </div>

//                         {/* Bloc droite */}
//                         <div className="text-right mt-0 md:mt-0 md:w-1/3">
//                             <div className="font-bold">REPUBLIC OF CAMEROON</div>
//                             <div className="text-[8px]">Peace-Work-Fatherland</div>
//                             <div className="text-[9px]">Ministry of Basic Education</div>
//                             <div className="text-[9px]">Centre Regional Delegation</div>
//                             <div className="text-[9px]">Divisional Delegation of Mfoundi Division</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Section Photo et Informations - TRÈS COMPACTE */}
//                 <div className="flex flex-col md:flex-row items-start gap-2 print:mb-0 my-3">
//                     {/* Photo de l'élève - TAILLE AGRANDIE */}
//                     <div className="flex-shrink-0">
//                         <div className="w-20 h-20 border border-gray-300 rounded overflow-hidden bg-gray-50 flex items-center justify-center print:w-18 print:h-18">
//                             {studentPhoto ? (
//                                 <img
//                                     src={studentPhoto}
//                                     alt="Student"
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="text-center text-gray-400 text-[9px]">
//                                     <svg className="w-5 h-5 mx-auto mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     No Photo
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Informations de l'élève - TEXTE AGRANDI */}
//                     <div className="flex-1 grid grid-cols-2 gap-0.5 text-[10px] print:text-[9px]">
//                         <div><strong>Name:</strong> {meta.studentName || "-"}</div>
//                         <div><strong>Sex:</strong> {meta.sex || "-"}</div>
//                         <div><strong>Class:</strong> {meta.className || "-"}</div>
//                         <div><strong>Level:</strong> {meta.level || "-"}</div>
//                         <div><strong>Term:</strong> {meta.term || "-"}</div>
//                         <div><strong>Year:</strong> {meta.year || "-"}</div>
//                         <div className="col-span-2"><strong>Teacher:</strong> {meta.teacher || "-"}</div>
//                     </div>
//                 </div>

//                 {/* Skills Table - TAILLE AGRANDIE MAIS COMPACTE */}
//                 <div className="overflow-x-auto print:overflow-visible mb-0 print:mb-0 mt-4">
//                     <table className="w-full text-[9px] print:text-[8px] border-collapse border border-gray-400">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="border border-gray-400 p-0.5 w-24">Skills</th>
//                                 <th className="border border-gray-400 p-0.5 w-36">Description</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-14">Eval</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-10">SCl</th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-14">
//                                     {periodHeaders.h1}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-14">
//                                     {periodHeaders.h2}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-14">
//                                     {periodHeaders.h3}
//                                 </th>
//                                 <th className="border border-gray-400 p-0.5 text-center w-18">Appreciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {[
//                                 {
//                                     key: "1A",
//                                     title: "1A- Communicate in English",
//                                     description: "Listening - speaking - writing - reading",
//                                     sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//                                     evaluations: ["Attitude", "Oral", "Written"]
//                                 },
//                                 {
//                                     key: "1B",
//                                     title: "1B- Communicate in French",
//                                     description: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary",
//                                     sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//                                     evaluations: ["Attitude", "Oral", "Written"]
//                                 },
//                                 {
//                                     key: "1C",
//                                     title: "1C- Communicate in One National Language",
//                                     description: "Customs - traditions - mode of life - interpretation of phenomena",
//                                     sclValues: { Oral: 15, Practical: 5 },
//                                     evaluations: ["Oral", "Practical"]
//                                 },
//                                 {
//                                     key: "2A",
//                                     title: "2A- Use basic Notions in Mathematics",
//                                     description: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry",
//                                     sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "2B",
//                                     title: "2B- Use basic Notions in science and technology",
//                                     description: "Health and environmental education - technology and engineering",
//                                     sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "3A",
//                                     title: "3A- Practise Social Value",
//                                     description: "History and geography",
//                                     sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "3B",
//                                     title: "3B- Practise Citizenship values",
//                                     description: "Civics - human right - moral education",
//                                     sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "4A",
//                                     title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies",
//                                     description: "Needles work - house craft - laundry and food nutrition",
//                                     sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "4B",
//                                     title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship",
//                                     description: "Agricultural tool - farming and gardening - livestock farming",
//                                     sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "5",
//                                     title: "5- Use Basic Concepts and Tools of Information and Communication Technologies",
//                                     description: "The computer and ICT tools - Internet and communication ethics",
//                                     sclValues: { Attitude: 5, Oral: 5, Practical: 20, Written: 10 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },
//                                 {
//                                     key: "6A",
//                                     title: "6-A Practise Physical and Sports Activities",
//                                     description: "Movement - jumping - team sports - gymnastics - relay - sprint",
//                                     sclValues: { Attitude: 3, Oral: 3, Practical: 10, Written: 4 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },

//                                 {
//                                     key: "6B",
//                                     title: "6-B Practice Physical sport",
//                                     description: "For physically challenged",
//                                     sclValues: { Attitude: 8, Oral: 12, Practical: 0, Written: 0 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },

//                                 {
//                                     key: "6C",
//                                     title: "6-C Practice Artistic Activities",
//                                     description: "Visual arts - performing arts",
//                                     sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 },
//                                     evaluations: ["Attitude", "Oral", "Practical", "Written"]
//                                 },


//                             ].map(skillTemplate => {
//                                 const skillData = data[skillTemplate.key];
//                                 if (!skillData) return null;

//                                 return (
//                                     <React.Fragment key={skillTemplate.key}>
//                                         {skillTemplate.evaluations.map((ev, i) => (
//                                             <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                                 {i === 0 && (
//                                                     <td className="border border-gray-400 p-0.5 align-top font-semibold" rowSpan={skillTemplate.evaluations.length}>
//                                                         <div className="text-[10px] leading-tight">{skillTemplate.title}</div>
//                                                     </td>
//                                                 )}
//                                                 {i === 0 && (
//                                                     <td className="border border-gray-400 p-0.5 align-top" rowSpan={skillTemplate.evaluations.length}>
//                                                         <div className="text-[8px] text-gray-600 leading-tight">{skillTemplate.description}</div>
//                                                     </td>
//                                                 )}

//                                                 <td className="border border-gray-400 p-0.5 text-center align-top">{ev}</td>
//                                                 <td className="border border-gray-400 p-0.5 text-center align-top">{skillTemplate.sclValues[ev]}</td>
//                                                 <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m1 || "-"}</td>
//                                                 <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m2 || "-"}</td>
//                                                 <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m3 || "-"}</td>

//                                                 {i === 0 && (
//                                                     <td className="border border-gray-400 p-0.5 align-top text-center" rowSpan={skillTemplate.evaluations.length}>
//                                                         {skillData.appreciation || "-"}
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

//                 {/* Sections inférieures - PLUS GRANDES MAIS COMPACTES */}
//                 <div className="flex flex-col md:flex-row gap-2 mt-10 print:mt-10 print:gap-2 text-[9px] print:text-[8px]">
//                     {/* Appreciation Legend - AGRANDI */}
//                     <div className="flex-1 border border-gray-300 rounded p-1">
//                         <div className="font-semibold text-center mb-0.5">Appreciation Legend</div>
//                         <div className="space-y-0.5">
//                             <div><strong>Acquired</strong> - Mastered skill</div>
//                             <div><strong>In process</strong> - Progressing</div>
//                             <div><strong>Expert</strong> - Above expectations</div>
//                             <div><strong>Not acquired</strong> - Not yet acquired</div>
//                         </div>
//                     </div>

//                     {/* Periods - AGRANDI */}
//                     <div className="flex-1 border border-gray-300 rounded p-1">
//                         <div className="font-semibold text-center mb-0.5">Periods</div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['h1', 'h2', 'h3'].map((header) => (
//                                 <div key={header} className="text-center">
//                                     <div className="font-semibold text-[8px]">{periodHeaders[header]}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['t1', 't2', 't3'].map((total) => (
//                                 <div key={total} className="text-center">
//                                     <div className="text-gray-600">Total</div>
//                                     <div className="font-semibold">{totals[total]}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5 mb-0.5">
//                             {['a1', 'a2', 'a3'].map((avg) => (
//                                 <div key={avg} className="text-center">
//                                     <div className="text-gray-600">Avg</div>
//                                     <div className="font-semibold">{averages[avg]}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-3 gap-0.5">
//                             {['app1', 'app2', 'app3'].map((app) => (
//                                 <div key={app} className="text-center">
//                                     <div className="text-gray-600">Appr</div>
//                                     <div className="font-semibold">{periodInfo[app] || "-"}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Summary of Work - AGRANDI */}
//                     <div className="flex-1 border-2 border-gray-400 rounded p-1">
//                         <div className="font-semibold text-center mb-0.5">Summary</div>

//                         <div className="space-y-0.5">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Overall Avg</div>
//                                 <div className="font-bold text-blue-700 text-[10px]">{overallAvg}</div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
//                                     {summary?.overallAppreciation || "-"}
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600">Position</div>
//                                 <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
//                                     {summary?.position || "-"}
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="text-gray-600">Decision</div>
//                                 <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
//                                     {summary?.decision || "-"}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Signatures - AGRANDIES */}
//                     <div className="flex-1">
//                         <div className="space-y-0.5">
//                             {['Teacher', 'Headmaster', 'Parent'].map((role) => (
//                                 <div key={role} className="border border-gray-300 rounded p-0.5 text-center">
//                                     <div className="font-semibold text-[8px]">{role}'s Visa</div>
//                                     <div className="h-7 mt-0.5 flex items-center justify-center">
//                                         {/* Signature area */}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Contact - AGRANDI */}
//                 <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
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

//             {/* Action Buttons */}
//             <div className="w-full max-w-4xl mt-3 print:hidden">
//                 <div className="flex justify-between gap-2">
//                     <button
//                         onClick={handleBackToEdit}
//                         className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
//                     >
//                         ← Back to Edit
//                     </button>

//                     <div className="flex gap-2">
//                         <button
//                             onClick={handleDownload}
//                             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
//                         >
//                             📥 Download
//                         </button>

//                         <button
//                             onClick={handlePrint}
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
//                         >
//                             🖨️ Print
//                         </button>

//                         <button
//                             onClick={handleFinalSubmit}
//                             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
//                         >
//                             ✅ Finalize
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Print CSS optimized for single page A4 */}
//             <style jsx>{`
//                 @media print {
//                     @page {
//                         size: A4 portrait;
//                         margin: 0.4cm;
//                     }
//                     body {
//                         -webkit-print-color-adjust: exact;
//                         print-color-adjust: exact;
//                         margin: 0;
//                         padding: 0;
//                         font-size: 8px;
//                         line-height: 1.1;
//                     }
//                     .print-container {
//                         width: 100%;
//                         min-height: 27.5cm;
//                         padding: 0.4cm;
//                     }
//                     table {
//                         page-break-inside: avoid;
//                         font-size: 7px;
//                     }
//                     th, td {
//                         padding: 2px;
//                         line-height: 1;
//                     }
//                     * {
//                         box-sizing: border-box;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default BulletinPreview;














































import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const BulletinPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        meta,
        studentPhoto,
        periodHeaders,
        data,
        totals,
        averages,
        periodInfo,
        overallAvg,
        summary
    } = location.state || {};

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Définir les marges
        const marginLeft = 10;
        const marginTop = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const contentWidth = pageWidth - (marginLeft * 2);
        
        let currentY = marginTop;

        // Fonction pour ajouter du texte avec gestion du saut de page
        const addText = (text, fontSize = 10, isBold = false, align = 'left', yOffset = 0) => {
            currentY += yOffset;
            
            // Vérifier si on dépasse la page
            if (currentY > pageHeight - 20) {
                doc.addPage();
                currentY = marginTop;
            }
            
            doc.setFontSize(fontSize);
            doc.setFont(undefined, isBold ? 'bold' : 'normal');
            
            let xPos = marginLeft;
            if (align === 'center') {
                xPos = pageWidth / 2;
                doc.text(text, xPos, currentY, { align: 'center' });
            } else if (align === 'right') {
                xPos = pageWidth - marginLeft;
                doc.text(text, xPos, currentY, { align: 'right' });
            } else {
                doc.text(text, xPos, currentY);
            }
            
            currentY += fontSize / 3;
        };

        // Fonction pour ajouter une ligne horizontale
        const addLine = () => {
            currentY += 2;
            doc.setLineWidth(0.1);
            doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
            currentY += 3;
        };

        // En-tête
        addText("RÉPUBLIQUE DU CAMEROUN", 9, true, 'center', 5);
        addText("Paix-Travail-Patrie", 7, false, 'center');
        addText("Ministère de l'Éducation de base", 8, false, 'center');
        addText("Délégation Régionale du Centre", 8, false, 'center');
        addText("Délégation Départementale du Mfoundi", 8, false, 'center');
        
        currentY += 2;
        
        // Titre de l'école
        addText("BILINGUAL SCHOOL GROUP THE GRACE OF GOD", 10, true, 'center', 5);
        addText("SCHOOL REPORT", 11, true, 'center', 2);
        
        currentY += 2;
        
        // En-tête anglais
        addText("REPUBLIC OF CAMEROON", 9, true, 'center');
        addText("Peace-Work-Fatherland", 7, false, 'center');
        addText("Ministry of Basic Education", 8, false, 'center');
        addText("Centre Regional Delegation", 8, false, 'center');
        addText("Divisional Delegation of Mfoundi Division", 8, false, 'center');
        
        addLine();
        
        // Informations de l'élève
        addText(`Name: ${meta?.studentName || "-"}`, 9, false, 'left', 5);
        addText(`Sex: ${meta?.sex || "-"}`, 9, false, 'left');
        addText(`Class: ${meta?.className || "-"}`, 9, false, 'left');
        addText(`Level: ${meta?.level || "-"}`, 9, false, 'left');
        addText(`Term: ${meta?.term || "-"}`, 9, false, 'left');
        addText(`Year: ${meta?.year || "-"}`, 9, false, 'left');
        addText(`Teacher: ${meta?.teacher || "-"}`, 9, false, 'left');
        
        currentY += 5;
        
        // En-tête du tableau
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        
        // Dessiner l'en-tête du tableau
        const colWidths = [25, 35, 12, 8, 12, 12, 12, 18];
        const headers = ["Skills", "Description", "Eval", "SCl", periodHeaders?.h1 || "P1", periodHeaders?.h2 || "P2", periodHeaders?.h3 || "P3", "Appreciation"];
        
        let xPos = marginLeft;
        for (let i = 0; i < headers.length; i++) {
            doc.text(headers[i], xPos + colWidths[i]/2, currentY, { align: 'center' });
            xPos += colWidths[i];
        }
        
        currentY += 4;
        
        // Dessiner la ligne de l'en-tête
        doc.setLineWidth(0.1);
        doc.line(marginLeft, currentY, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY);
        currentY += 2;
        
        // Données du tableau
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);
        
        const skillTemplates = [
            { key: "1A", title: "1A- Communicate in English", description: "Listening - speaking - writing - reading", sclValues: { Attitude: 5, Oral: 20, Written: 15 }, evaluations: ["Attitude", "Oral", "Written"] },
            { key: "1B", title: "1B- Communicate in French", description: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary", sclValues: { Attitude: 5, Oral: 20, Written: 15 }, evaluations: ["Attitude", "Oral", "Written"] },
            { key: "1C", title: "1C- Communicate in One National Language", description: "Customs - traditions - mode of life - interpretation of phenomena", sclValues: { Oral: 15, Practical: 5 }, evaluations: ["Oral", "Practical"] },
            { key: "2A", title: "2A- Use basic Notions in Mathematics", description: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry", sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "2B", title: "2B- Use basic Notions in science and technology", description: "Health and environmental education - technology and engineering", sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "3A", title: "3A- Practise Social Value", description: "History and geography", sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "3B", title: "3B- Practise Citizenship values", description: "Civics - human right - moral education", sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "4A", title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies", description: "Needles work - house craft - laundry and food nutrition", sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "4B", title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship", description: "Agricultural tool - farming and gardening - livestock farming", sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "5", title: "5- Use Basic Concepts and Tools of Information and Communication Technologies", description: "The computer and ICT tools - Internet and communication ethics", sclValues: { Attitude: 5, Oral: 5, Practical: 20, Written: 10 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "6A", title: "6-A Practise Physical and Sports Activities", description: "Movement - jumping - team sports - gymnastics - relay - sprint", sclValues: { Attitude: 3, Oral: 3, Practical: 10, Written: 4 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "6B", title: "6-B Practice Physical sport", description: "For physically challenged", sclValues: { Attitude: 8, Oral: 12, Practical: 0, Written: 0 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
            { key: "6C", title: "6-C Practice Artistic Activities", description: "Visual arts - performing arts", sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 }, evaluations: ["Attitude", "Oral", "Practical", "Written"] },
        ];
        
        skillTemplates.forEach(skillTemplate => {
            const skillData = data?.[skillTemplate.key];
            if (!skillData) return;
            
            skillTemplate.evaluations.forEach((ev, i) => {
                // Vérifier si besoin d'une nouvelle page
                if (currentY > pageHeight - 30) {
                    doc.addPage();
                    currentY = marginTop;
                }
                
                let cellX = marginLeft;
                
                // Première cellule (Skills) - seulement pour la première ligne
                if (i === 0) {
                    doc.text(skillTemplate.title, cellX + 2, currentY, { maxWidth: colWidths[0] - 4 });
                }
                cellX += colWidths[0];
                
                // Description - seulement pour la première ligne
                if (i === 0) {
                    doc.text(skillTemplate.description, cellX + 2, currentY, { maxWidth: colWidths[1] - 4 });
                }
                cellX += colWidths[1];
                
                // Eval
                doc.text(ev, cellX + colWidths[2]/2, currentY, { align: 'center' });
                cellX += colWidths[2];
                
                // SCl
                doc.text(skillTemplate.sclValues[ev].toString(), cellX + colWidths[3]/2, currentY, { align: 'center' });
                cellX += colWidths[3];
                
                // Périodes
                doc.text(skillData.evals?.[ev]?.m1 || "-", cellX + colWidths[4]/2, currentY, { align: 'center' });
                cellX += colWidths[4];
                
                doc.text(skillData.evals?.[ev]?.m2 || "-", cellX + colWidths[5]/2, currentY, { align: 'center' });
                cellX += colWidths[5];
                
                doc.text(skillData.evals?.[ev]?.m3 || "-", cellX + colWidths[6]/2, currentY, { align: 'center' });
                cellX += colWidths[6];
                
                // Appreciation - seulement pour la première ligne
                if (i === 0) {
                    doc.text(skillData.appreciation || "-", cellX + colWidths[7]/2, currentY, { align: 'center', maxWidth: colWidths[7] - 4 });
                }
                
                currentY += 5;
            });
            
            // Ligne de séparation après chaque compétence
            doc.setLineWidth(0.05);
            doc.line(marginLeft, currentY - 2, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY - 2);
        });
        
        currentY += 10;
        
        // Sections inférieures
        // Appreciation Legend
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.text("Appreciation Legend", marginLeft, currentY);
        currentY += 4;
        doc.setFont(undefined, 'normal');
        doc.text("Acquired - Mastered skill", marginLeft, currentY);
        currentY += 4;
        doc.text("In process - Progressing", marginLeft, currentY);
        currentY += 4;
        doc.text("Expert - Above expectations", marginLeft, currentY);
        currentY += 4;
        doc.text("Not acquired - Not yet acquired", marginLeft, currentY);
        
        currentY += 10;
        
        // Summary
        doc.setFont(undefined, 'bold');
        doc.text("Summary", pageWidth/2, currentY, { align: 'center' });
        currentY += 4;
        doc.setFont(undefined, 'normal');
        doc.text(`Overall Average: ${overallAvg || "-"}`, pageWidth/2, currentY, { align: 'center' });
        currentY += 4;
        doc.text(`Appreciation: ${summary?.overallAppreciation || "-"}`, pageWidth/2, currentY, { align: 'center' });
        currentY += 4;
        doc.text(`Position: ${summary?.position || "-"}`, pageWidth/2, currentY, { align: 'center' });
        currentY += 4;
        doc.text(`Decision: ${summary?.decision || "-"}`, pageWidth/2, currentY, { align: 'center' });
        
        currentY += 10;
        
        // Signatures
        const signatureWidth = 50;
        const signatureStart = (pageWidth - (signatureWidth * 3)) / 2;
        
        doc.text("Teacher's Visa", signatureStart + signatureWidth/2, currentY, { align: 'center' });
        doc.text("Headmaster's Visa", signatureStart + signatureWidth * 1.5, currentY, { align: 'center' });
        doc.text("Parent's Visa", signatureStart + signatureWidth * 2.5, currentY, { align: 'center' });
        
        currentY += 15;
        
        // Lignes pour signatures
        doc.setLineWidth(0.3);
        doc.line(signatureStart, currentY, signatureStart + signatureWidth, currentY);
        doc.line(signatureStart + signatureWidth, currentY, signatureStart + signatureWidth * 2, currentY);
        doc.line(signatureStart + signatureWidth * 2, currentY, signatureStart + signatureWidth * 3, currentY);
        
        currentY += 15;
        
        // Contact info
        doc.setFontSize(7);
        doc.text("Téléphone: (+237) 696-308-503 / WhatsApp: 651989899", pageWidth/2, currentY, { align: 'center' });
        currentY += 3;
        doc.text("Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)", pageWidth/2, currentY, { align: 'center' });
        currentY += 3;
        doc.text("Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025", pageWidth/2, currentY, { align: 'center' });
        
        // Sauvegarder le PDF
        const fileName = `bulletin_${meta?.studentName?.replace(/\s+/g, '_') || 'student'}_${meta?.className?.replace(/\s+/g, '_') || 'class'}_${meta?.term || 'term'}_${meta?.year || 'year'}.pdf`;
        doc.save(fileName);
    };

    const handleBackToEdit = () => {
        navigate(-1);
    };

    const handleFinalSubmit = () => {
        if (confirm("Are you sure you want to finalize and clear the form?")) {
            localStorage.removeItem('bulletinFormData');
            navigate("/dashboard");
        }
    };

    if (!location.state) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-4">No data found</div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Back to Form
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
            {/* Header - invisible durant l'impression */}
            <div className="w-full max-w-4xl mb-2 print:hidden">
                <div className="bg-blue-600 text-white p-2 rounded shadow">
                    <h1 className="text-lg font-bold text-center">Report Card Preview</h1>
                    <p className="text-center text-blue-100 text-xs">
                        Check all information before printing or downloading. Your data is automatically saved.
                    </p>
                </div>
            </div>

            {/* Page principale */}
            <div className="bg-white w-full max-w-4xl shadow-sm p-3 print:shadow-none print:max-w-full print:p-1" style={{ minHeight: '27.5cm' }}>

                {/* Header */}
                <div className="w-full mb-0 print:mb-0 border-b border-gray-300 pb-0 print:pb-0">
                    <div className="flex flex-col items-center text-gray-600 text-[10px] print:text-[9px] md:flex-row md:justify-between md:items-start">
                        {/* Bloc gauche */}
                        <div className="text-left mb-0 md:mb-0 md:w-1/3">
                            <div className="font-bold">RÉPUBLIQUE DU CAMEROUN</div>
                            <div className="text-[8px]">Paix-Travail-Patrie</div>
                            <div className="text-[9px]">Ministère de l'Éducation de base</div>
                            <div className="text-[9px]">Délégation Régionale du Centre</div>
                            <div className="text-[9px]">Délégation Départementale du Mfoundi</div>
                        </div>

                        {/* Bloc centre */}
                        <div className="text-center md:flex-1 md:mx-1">
                            <div className="font-extrabold text-[11px] print:text-[10px]">
                                BILINGUAL SCHOOL GROUP THE GRACE OF GOD
                            </div>
                            <div className="text-[12px] print:text-[11px] font-bold">
                                SCHOOL REPORT
                            </div>
                        </div>

                        {/* Bloc droite */}
                        <div className="text-right mt-0 md:mt-0 md:w-1/3">
                            <div className="font-bold">REPUBLIC OF CAMEROON</div>
                            <div className="text-[8px]">Peace-Work-Fatherland</div>
                            <div className="text-[9px]">Ministry of Basic Education</div>
                            <div className="text-[9px]">Centre Regional Delegation</div>
                            <div className="text-[9px]">Divisional Delegation of Mfoundi Division</div>
                        </div>
                    </div>
                </div>

                {/* Section Photo et Informations */}
                <div className="flex flex-col md:flex-row items-start gap-2 print:mb-0 my-3">
                    {/* Photo de l'élève */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 border border-gray-300 rounded overflow-hidden bg-gray-50 flex items-center justify-center print:w-18 print:h-18">
                            {studentPhoto ? (
                                <img
                                    src={studentPhoto}
                                    alt="Student"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center text-gray-400 text-[9px]">
                                    <svg className="w-5 h-5 mx-auto mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    No Photo
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informations de l'élève */}
                    <div className="flex-1 grid grid-cols-2 gap-0.5 text-[10px] print:text-[9px]">
                        <div><strong>Name:</strong> {meta.studentName || "-"}</div>
                        <div><strong>Sex:</strong> {meta.sex || "-"}</div>
                        <div><strong>Class:</strong> {meta.className || "-"}</div>
                        <div><strong>Level:</strong> {meta.level || "-"}</div>
                        <div><strong>Term:</strong> {meta.term || "-"}</div>
                        <div><strong>Year:</strong> {meta.year || "-"}</div>
                        <div className="col-span-2"><strong>Teacher:</strong> {meta.teacher || "-"}</div>
                    </div>
                </div>

                {/* Skills Table */}
                <div className="overflow-x-auto print:overflow-visible mb-0 print:mb-0 mt-4">
                    <table className="w-full text-[9px] print:text-[8px] border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-0.5 w-24">Skills</th>
                                <th className="border border-gray-400 p-0.5 w-36">Description</th>
                                <th className="border border-gray-400 p-0.5 text-center w-14">Eval</th>
                                <th className="border border-gray-400 p-0.5 text-center w-10">SCl</th>
                                <th className="border border-gray-400 p-0.5 text-center w-14">
                                    {periodHeaders.h1}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-14">
                                    {periodHeaders.h2}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-14">
                                    {periodHeaders.h3}
                                </th>
                                <th className="border border-gray-400 p-0.5 text-center w-18">Appreciation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                {
                                    key: "1A",
                                    title: "1A- Communicate in English",
                                    description: "Listening - speaking - writing - reading",
                                    sclValues: { Attitude: 5, Oral: 20, Written: 15 },
                                    evaluations: ["Attitude", "Oral", "Written"]
                                },
                                {
                                    key: "1B",
                                    title: "1B- Communicate in French",
                                    description: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary",
                                    sclValues: { Attitude: 5, Oral: 20, Written: 15 },
                                    evaluations: ["Attitude", "Oral", "Written"]
                                },
                                {
                                    key: "1C",
                                    title: "1C- Communicate in One National Language",
                                    description: "Customs - traditions - mode of life - interpretation of phenomena",
                                    sclValues: { Oral: 15, Practical: 5 },
                                    evaluations: ["Oral", "Practical"]
                                },
                                {
                                    key: "2A",
                                    title: "2A- Use basic Notions in Mathematics",
                                    description: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry",
                                    sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "2B",
                                    title: "2B- Use basic Notions in science and technology",
                                    description: "Health and environmental education - technology and engineering",
                                    sclValues: { Attitude: 5, Oral: 10, Practical: 15, Written: 20 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "3A",
                                    title: "3A- Practise Social Value",
                                    description: "History and geography",
                                    sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "3B",
                                    title: "3B- Practise Citizenship values",
                                    description: "Civics - human right - moral education",
                                    sclValues: { Attitude: 10, Oral: 6, Practical: 2, Written: 2 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "4A",
                                    title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies",
                                    description: "Needles work - house craft - laundry and food nutrition",
                                    sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "4B",
                                    title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship",
                                    description: "Agricultural tool - farming and gardening - livestock farming",
                                    sclValues: { Attitude: 2, Oral: 3, Practical: 10, Written: 5 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "5",
                                    title: "5- Use Basic Concepts and Tools of Information and Communication Technologies",
                                    description: "The computer and ICT tools - Internet and communication ethics",
                                    sclValues: { Attitude: 5, Oral: 5, Practical: 20, Written: 10 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "6A",
                                    title: "6-A Practise Physical and Sports Activities",
                                    description: "Movement - jumping - team sports - gymnastics - relay - sprint",
                                    sclValues: { Attitude: 3, Oral: 3, Practical: 10, Written: 4 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "6B",
                                    title: "6-B Practice Physical sport",
                                    description: "For physically challenged",
                                    sclValues: { Attitude: 8, Oral: 12, Practical: 0, Written: 0 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                                {
                                    key: "6C",
                                    title: "6-C Practice Artistic Activities",
                                    description: "Visual arts - performing arts",
                                    sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 },
                                    evaluations: ["Attitude", "Oral", "Practical", "Written"]
                                },
                            ].map(skillTemplate => {
                                const skillData = data[skillTemplate.key];
                                if (!skillData) return null;

                                return (
                                    <React.Fragment key={skillTemplate.key}>
                                        {skillTemplate.evaluations.map((ev, i) => (
                                            <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top font-semibold" rowSpan={skillTemplate.evaluations.length}>
                                                        <div className="text-[10px] leading-tight">{skillTemplate.title}</div>
                                                    </td>
                                                )}
                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top" rowSpan={skillTemplate.evaluations.length}>
                                                        <div className="text-[8px] text-gray-600 leading-tight">{skillTemplate.description}</div>
                                                    </td>
                                                )}

                                                <td className="border border-gray-400 p-0.5 text-center align-top">{ev}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{skillTemplate.sclValues[ev]}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m1 || "-"}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m2 || "-"}</td>
                                                <td className="border border-gray-400 p-0.5 text-center align-top">{skillData.evals[ev].m3 || "-"}</td>

                                                {i === 0 && (
                                                    <td className="border border-gray-400 p-0.5 align-top text-center" rowSpan={skillTemplate.evaluations.length}>
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
                </div>

                {/* Sections inférieures */}
                <div className="flex flex-col md:flex-row gap-2 mt-10 print:mt-10 print:gap-2 text-[9px] print:text-[8px]">
                    {/* Appreciation Legend */}
                    <div className="flex-1 border border-gray-300 rounded p-1">
                        <div className="font-semibold text-center mb-0.5">Appreciation Legend</div>
                        <div className="space-y-0.5">
                            <div><strong>Acquired</strong> - Mastered skill</div>
                            <div><strong>In process</strong> - Progressing</div>
                            <div><strong>Expert</strong> - Above expectations</div>
                            <div><strong>Not acquired</strong> - Not yet acquired</div>
                        </div>
                    </div>

                    {/* Periods */}
                    <div className="flex-1 border border-gray-300 rounded p-1">
                        <div className="font-semibold text-center mb-0.5">Periods</div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['h1', 'h2', 'h3'].map((header) => (
                                <div key={header} className="text-center">
                                    <div className="font-semibold text-[8px]">{periodHeaders[header]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['t1', 't2', 't3'].map((total) => (
                                <div key={total} className="text-center">
                                    <div className="text-gray-600">Total</div>
                                    <div className="font-semibold">{totals[total]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
                            {['a1', 'a2', 'a3'].map((avg) => (
                                <div key={avg} className="text-center">
                                    <div className="text-gray-600">Avg</div>
                                    <div className="font-semibold">{averages[avg]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-0.5">
                            {['app1', 'app2', 'app3'].map((app) => (
                                <div key={app} className="text-center">
                                    <div className="text-gray-600">Appr</div>
                                    <div className="font-semibold">{periodInfo[app] || "-"}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary of Work */}
                    <div className="flex-1 border-2 border-gray-400 rounded p-1">
                        <div className="font-semibold text-center mb-0.5">Summary</div>

                        <div className="space-y-0.5">
                            <div className="text-center">
                                <div className="text-gray-600">Overall Avg</div>
                                <div className="font-bold text-blue-700 text-[10px]">{overallAvg}</div>
                            </div>

                            <div>
                                <div className="text-gray-600">Appreciation</div>
                                <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
                                    {summary?.overallAppreciation || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600">Position</div>
                                <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
                                    {summary?.position || "-"}
                                </div>
                            </div>

                            <div>
                                <div className="text-gray-600">Decision</div>
                                <div className="border border-gray-300 rounded p-0.5 min-h-5 text-center flex items-center justify-center text-[8px]">
                                    {summary?.decision || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="flex-1">
                        <div className="space-y-0.5">
                            {['Teacher', 'Headmaster', 'Parent'].map((role) => (
                                <div key={role} className="border border-gray-300 rounded p-0.5 text-center">
                                    <div className="font-semibold text-[8px]">{role}'s Visa</div>
                                    <div className="h-7 mt-0.5 flex items-center justify-center">
                                        {/* Signature area */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
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

            {/* Action Buttons */}
            <div className="w-full max-w-4xl mt-3 print:hidden">
                <div className="flex justify-between gap-2">
                    <button
                        onClick={handleBackToEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                        ← Back to Edit
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                        >
                            <span>📥</span>
                            Download PDF
                        </button>

                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                        >
                            <span>🖨️</span>
                            Print
                        </button>

                        <button
                            onClick={handleFinalSubmit}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                        >
                            ✅ Finalize
                        </button>
                    </div>
                </div>
            </div>

            {/* Print CSS optimized for single page A4 */}
            <style jsx>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.4cm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        margin: 0;
                        padding: 0;
                        font-size: 8px;
                        line-height: 1.1;
                    }
                    table {
                        page-break-inside: avoid;
                        font-size: 7px;
                    }
                    th, td {
                        padding: 2px;
                        line-height: 1;
                    }
                    * {
                        box-sizing: border-box;
                    }
                }
            `}</style>
        </div>
    );
};

export default BulletinPreview;