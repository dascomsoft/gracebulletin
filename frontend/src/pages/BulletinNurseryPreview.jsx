import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BulletinNurseryPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        meta,
        monthHeaders,
        subjectsData,
        summary,
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
        if (confirm("Are you sure you want to finalize and clear the form?")) {
            localStorage.removeItem('nurseryFormData');
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

    const SUBJECTS = [
        "Initial to Mathematic 1",
        "Initial to English language",
        "Pre-Reading",
        "Alphabet sound",
        "Sound and word building",
        "Spelling",
        "Writing",
        "Picture Talk",
        "Rhymes / Songs",
        "Environment education",
        "Nature talk",
        "Practical life Activity",
        "Sensory and perc Educ",
        "Motor activity",
        "ICT",
        "French",
        "Expression by Gesture",
        "Drawing / colouring",
        "Conduct",
        "Relationship with classmates",
        "Attendance",
        "General Remarks"
    ];

    const REMARKS_OPTIONS = [
        "Good", "Very good", "Excellent", "Average", "Fair",
        "Above Average", "Regular", "Irregular", "Friendly",
        "Unfriendly", "Fairly good", "Neat"
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
            {/* Header - invisible during printing */}
            <div className="w-full max-w-6xl mb-2 print:hidden">
                <div className="bg-blue-600 text-white p-2 rounded shadow">
                    <h1 className="text-lg font-bold text-center">Nursery Report Card Preview</h1>
                    <p className="text-center text-blue-100 text-xs">
                        Check all information before printing. Your data is automatically saved.
                    </p>
                </div>
            </div>

            {/* Main page */}
            <div className="bg-white w-full max-w-6xl shadow-sm p-4 print:shadow-none print:max-w-full print:p-4">

                {/* Header */}
                <div className="w-full mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
                    <div
                        className="
      flex flex-col items-center text-gray-600 text-xs print:text-xs
      md:flex-row md:justify-between md:items-start
    "
                    >
                        {/* Bloc gauche */}
                        <div className="text-left mb-2 md:mb-0 md:w-1/3">
                            <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
                            <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
                        </div>

                        {/* Bloc centre */}
                        <div className="text-center md:flex-1 md:mx-2">
                            <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
                                  BILINGUAL SCHOOL GROUP THE GRACE OF GOD
                            </div>
                            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
                                SCHOOL REPORT
                            </div>
                        </div>

                        {/* Bloc droite */}
                        <div className="text-right mt-2 md:mt-0 md:w-1/3">
                            <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
                            <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
                            <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
                        </div>
                    </div>
                </div>

                {/* Section Photo + Student Information */}
                <div className="flex flex-col md:flex-row gap-3 mb-4 print:mb-3 print:gap-2">
                    {/* Zone Photo */}
                    {photoEleve && (
                        <div className="flex flex-col items-center md:w-1/6 print:w-1/6">
                            <div className="w-16 h-16 print:w-12 print:h-12 border border-gray-300 rounded overflow-hidden mb-1">
                                <img 
                                    src={photoEleve} 
                                    alt="Student photo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-[8px] print:text-[6px] text-gray-500 text-center">
                                Photo
                            </div>
                        </div>
                    )}

                    {/* Student Information */}
                    <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 text-xs print:text-[10px] ${photoEleve ? 'flex-1' : 'w-full'}`}>
                        <div><strong>NAME:</strong> {meta.studentName || "................................."}</div>
                        <div><strong>TEACHER NAME:</strong> {meta.teacherName || "................................."}</div>
                        <div><strong>SEX:</strong> {meta.sex || "................................."}</div>
                        <div><strong>CLASS:</strong> {meta.className || "................................."}</div>
                        <div><strong>TERM:</strong> {meta.term || "................................."}</div>
                        <div><strong>ACADEMIC YEAR:</strong> {meta.academicYear || "................................."}</div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="overflow-x-auto print:overflow-visible mb-4 print:mb-3">
                    <table className="w-full text-[10px] border-collapse print:text-[9px] border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-1 text-center w-8">EVALUATION</th>
                                <th className="border border-gray-400 p-1 text-center">{monthHeaders.m1}</th>
                                <th className="border border-gray-400 p-1 text-center">{monthHeaders.m2}</th>
                                <th className="border border-gray-400 p-1 text-center">{monthHeaders.m3}</th>
                                <th className="border border-gray-400 p-1 text-center w-20" rowSpan="2">APPRECIATION</th>
                            </tr>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-1 font-semibold">SUBJECTS</th>
                                <th className="border border-gray-400 p-1 text-center">Remarks</th>
                                <th className="border border-gray-400 p-1 text-center">Remarks</th>
                                <th className="border border-gray-400 p-1 text-center">Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {SUBJECTS.map((subject, index) => (
                                <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="border border-gray-400 p-1 font-medium">{subject}</td>
                                    <td className="border border-gray-400 p-1 text-center">{subjectsData[subject]?.remarks1 || "-"}</td>
                                    <td className="border border-gray-400 p-1 text-center">{subjectsData[subject]?.remarks2 || "-"}</td>
                                    <td className="border border-gray-400 p-1 text-center">{subjectsData[subject]?.remarks3 || "-"}</td>
                                    <td className="border border-gray-400 p-1 text-center">{subjectsData[subject]?.appreciation || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Section - Appreciation Legend + Summary of Work */}
                <div className="mt-o grid grid-cols-1 lg:grid-cols-2 gap-4 print:gap-3 print:">
                    {/* Appreciation Legend */}
                    <div className="border border-gray-300 rounded p-3 print:p-2 text-[10px] print:text-[9px]">
                        <div className="font-semibold text-center mb-2">Appreciation Legend</div>
                        <div className="space-y-1">
                            <div><strong>Excellent</strong> — Outstanding performance</div>
                            <div><strong>Very good</strong> — Above average performance</div>
                            <div><strong>Good</strong> — Meets expectations</div>
                            <div><strong>Average</strong> — Meets basic requirements</div>
                            <div><strong>Fair</strong> — Below average but improving</div>
                            <div><strong>Above Average</strong> — Better than typical</div>
                            <div><strong>Regular</strong> — Consistent attendance</div>
                            <div><strong>Irregular</strong> — Inconsistent performance</div>
                            <div><strong>Friendly</strong> — Positive social interactions</div>
                            <div><strong>Unfriendly</strong> — Needs social improvement</div>
                            <div><strong>Fairly good</strong> — Satisfactory performance</div>
                            <div><strong>Neat</strong> — Organized and tidy work</div>
                        </div>
                    </div>

                    {/* Summary of Work */}
                    <div className="border-2 border-gray-400 rounded p-3 print:p-2 text-[10px] print:text-[9px]">
                        <div className="font-bold text-center mb-2">Summary of Work</div>

                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-center">
                                    <div className="text-gray-600">Result</div>
                                    <div className="font-semibold border-b border-gray-300 py-1">{summary.result || "-"}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-600">Position</div>
                                    <div className="font-semibold border-b border-gray-300 py-1">{summary.position || "-"}</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-gray-600">Appreciation</div>
                                <div className="font-semibold border-b border-gray-300 py-1">{summary.appreciation || "-"}</div>
                            </div>

                            {/* Signatures */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <div className="text-gray-600 text-[8px]">Teacher's Visa</div>
                                    <div className="border border-gray-300 rounded p-1 h-10 flex items-center justify-center">
                                        <span className="text-gray-500 text-[7px]">{summary.teacherSignature || "Signature"}</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-gray-600 text-[8px]">Headmaster's Visa</div>
                                    <div className="border border-gray-300 rounded p-1 h-10 flex items-center justify-center">
                                        <span className="text-gray-500 text-[7px]">{summary.headmasterSignature || "Signature"}</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-gray-600 text-[8px]">Parent's Visa</div>
                                    <div className="border border-gray-300 rounded p-1 h-10 flex items-center justify-center">
                                        <span className="text-gray-500 text-[7px]">{summary.parentSignature || "Signature"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                   <div className="text-center text-[8px] mt-2 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5  print:mt-2 mb-2 print:mb-0 print:mx-4">
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
            <div className="w-full max-w-6xl mt-4 print:hidden">
                <div className="flex justify-between gap-2">
                    <button
                        onClick={handleBackToEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                        ← Back to Edit
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        >
                            📥 Download
                        </button>

                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                            🖨️ Print
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

            {/* Print CSS optimized */}
            <style jsx>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.5cm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        margin: 0;
                        padding: 0;
                        font-size: 9px;
                        line-height: 1.2;
                    }
                    table {
                        page-break-inside: avoid;
                        font-size: 8px;
                    }
                    th, td {
                        padding: 2px;
                        line-height: 1.1;
                    }
                    * {
                        box-sizing: border-box;
                    }
                }
            `}</style>
        </div>
    );
};

export default BulletinNurseryPreview;