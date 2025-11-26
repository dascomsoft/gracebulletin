// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SUBJECTS = [
//     "Initial to Mathematic 1",
//     "Initial to English language",
//     "Pre-Reading",
//     "Alphabet sound",
//     "Sound and word building",
//     "Spelling",
//     "Writing",
//     "Picture Talk",
//     "Rhymes / Songs",
//     "Environment education",
//     "Nature talk",
//     "Practical life Activity",
//     "Sensory and perc Educ",
//     "Motor activity",
//     "ICT",
//     "French",
//     "Expression by Gesture",
//     "Drawing / colouring",
//     "Conduct",
//     "Relationship with classmates",
//     "Attendance",
//     "General Remarks"
// ];

// const REMARKS_OPTIONS = [
//     "Good", "Very good", "Excellent", "Average", "Fair",
//     "Above Average", "Regular", "Irregular", "Friendly",
//     "Unfriendly", "Fairly good", "Neat"
// ];

// const MONTH_OPTIONS = ["Month-1", "Month-2", "Month-3"];
// const CLASS_OPTIONS = ["Pre-Nursery", "Nursery 1", "Nursery 2"];
// const TERM_OPTIONS = ["Term 1", "Term 2", "Term 3"];
// const SEX_OPTIONS = ["Male", "Female"];
// const RESULT_OPTIONS = ["Passed", "Failed"];

// export default function BulletinNurseryForm() {
//     const navigate = useNavigate();

//     // Fonction pour charger les données sauvegardées
//     const loadSavedData = () => {
//         try {
//             const saved = localStorage.getItem('nurseryFormData');
//             if (saved) {
//                 return JSON.parse(saved);
//             }
//         } catch (error) {
//             console.error('Error loading saved data:', error);
//         }
//         return null;
//     };

//     // Fonction pour sauvegarder les données
//     const saveData = (data) => {
//         try {
//             localStorage.setItem('nurseryFormData', JSON.stringify(data));
//         } catch (error) {
//             console.error('Error saving data:', error);
//         }
//     };

//     // Fonction pour effacer les données sauvegardées
//     const clearSavedData = () => {
//         try {
//             localStorage.removeItem('nurseryFormData');
//         } catch (error) {
//             console.error('Error clearing saved data:', error);
//         }
//     };

//     // Charger les données sauvegardées au montage du composant
//     const savedData = loadSavedData();

//     const [monthHeaders, setMonthHeaders] = useState(
//         savedData?.monthHeaders || { m1: MONTH_OPTIONS[0], m2: MONTH_OPTIONS[1], m3: MONTH_OPTIONS[2] }
//     );

//     const [meta, setMeta] = useState(savedData?.meta || {
//         studentName: "",
//         teacherName: "",
//         sex: "",
//         className: "",
//         term: "",
//         academicYear: ""
//     });

//     const [subjectsData, setSubjectsData] = useState(() => {
//         if (savedData?.subjectsData) {
//             return savedData.subjectsData;
//         } else {
//             const data = {};
//             SUBJECTS.forEach(subject => {
//                 data[subject] = {
//                     remarks1: "",
//                     remarks2: "",
//                     remarks3: "",
//                     appreciation: ""
//                 };
//             });
//             return data;
//         }
//     });

//     const [summary, setSummary] = useState(savedData?.summary || {
//         result: "",
//         position: "",
//         appreciation: "",
//         teacherSignature: "",
//         headmasterSignature: "",
//         parentSignature: ""
//     });

//     // Sauvegarder les données à chaque changement
//     useEffect(() => {
//         const formData = {
//             monthHeaders,
//             meta,
//             subjectsData,
//             summary
//         };
//         saveData(formData);
//     }, [monthHeaders, meta, subjectsData, summary]);

//     const changeMonthHeader = (k, v) => setMonthHeaders(p => ({ ...p, [k]: v }));
//     const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

//     const changeSubjectData = (subject, field, value) => {
//         setSubjectsData(prev => ({
//             ...prev,
//             [subject]: {
//                 ...prev[subject],
//                 [field]: value
//             }
//         }));
//     };

//     const changeSummary = (k, v) => setSummary(p => ({ ...p, [k]: v }));

//     const handlePreview = () => {
//         const payload = {
//             meta,
//             monthHeaders,
//             subjectsData,
//             summary
//         };
//         // Sauvegarder avant de naviguer
//         saveData(payload);
//         navigate("/nursery-preview", { state: payload });
//     };

//     const handleReset = () => {
//         if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
//             clearSavedData();
//             window.location.reload();
//         }
//     };

//     // Générer les options d'année scolaire
//     const academicYears = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//             {/* Header - Identique à BulletinForm mais en anglais */}
//             <div className="w-full max-w-6xl  mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//                 <div
//                     className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-sta"
//                 >
//                     {/* Bloc gauche */}
//                     <div className="text-left mb-2 md:mb-0 md:w-1/3">
//                         <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
//                         <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
//                     </div>

//                     {/* Bloc centre */}
//                     <div className="text-center md:flex-1 md:mx-2">
//                         <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
//                              BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//                         </div>
//                         <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">SCHOOL REPORT</div>
//                     </div>

//                     {/* Bloc droite */}
//                     <div className="text-right mt-2 md:mt-0 md:w-1/3">
//                         <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
//                         <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
//                     </div>
//                 </div>
//             </div>


//             {/* Form container */}
//             <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
//                 {/* Student Information */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 text-sm">
//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">NAME</label>
//                         <input
//                             className="border px-3 py-2 rounded w-full"
//                             placeholder="Student name"
//                             value={meta.studentName}
//                             onChange={(e) => changeMeta("studentName", e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">TEACHER NAME</label>
//                         <input
//                             className="border px-3 py-2 rounded w-full"
//                             placeholder="Teacher name"
//                             value={meta.teacherName}
//                             onChange={(e) => changeMeta("teacherName", e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">SEX</label>
//                         <select
//                             className="border px-3 py-2 rounded w-full"
//                             value={meta.sex}
//                             onChange={e => changeMeta("sex", e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             {SEX_OPTIONS.map(sex => <option key={sex} value={sex}>{sex}</option>)}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">CLASS</label>
//                         <select
//                             className="border px-3 py-2 rounded w-full"
//                             value={meta.className}
//                             onChange={e => changeMeta("className", e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             {CLASS_OPTIONS.map(cls => <option key={cls} value={cls}>{cls}</option>)}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">TERM</label>
//                         <select
//                             className="border px-3 py-2 rounded w-full"
//                             value={meta.term}
//                             onChange={e => changeMeta("term", e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             {TERM_OPTIONS.map(term => <option key={term} value={term}>{term}</option>)}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">ACADEMIC YEAR</label>
//                         <select
//                             className="border px-3 py-2 rounded w-full"
//                             value={meta.academicYear}
//                             onChange={e => changeMeta("academicYear", e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
//                         </select>
//                     </div>
//                 </div>

//                 {/* Main Table */}
//                 <div className="overflow-x-auto mb-6">
//                     <table className="w-full text-xs border-collapse border border-gray-400">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="border border-gray-400 p-2 text-center w-8">EVALUATION</th>
//                                 <th className="border border-gray-400 p-2 text-center">
//                                     <select
//                                         className="text-xs bg-transparent border-none outline-none"
//                                         value={monthHeaders.m1}
//                                         onChange={(e) => changeMonthHeader("m1", e.target.value)}
//                                     >
//                                         {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border border-gray-400 p-2 text-center">
//                                     <select
//                                         className="text-xs bg-transparent border-none outline-none"
//                                         value={monthHeaders.m2}
//                                         onChange={(e) => changeMonthHeader("m2", e.target.value)}
//                                     >
//                                         {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border border-gray-400 p-2 text-center">
//                                     <select
//                                         className="text-xs bg-transparent border-none outline-none"
//                                         value={monthHeaders.m3}
//                                         onChange={(e) => changeMonthHeader("m3", e.target.value)}
//                                     >
//                                         {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border border-gray-400 p-2 text-center w-32" rowSpan="2">APPRECIATION</th>
//                             </tr>
//                             <tr className="bg-gray-200">
//                                 <th className="border border-gray-400 p-2 font-semibold">SUBJECTS</th>
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {SUBJECTS.map((subject, index) => (
//                                 <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                     <td className="border border-gray-400 p-2 font-medium">{subject}</td>

//                                     {/* Month 1 Remarks */}
//                                     <td className="border border-gray-400 p-1 text-center">
//                                         <select
//                                             className="w-full text-xs p-1 border-none outline-none bg-transparent"
//                                             value={subjectsData[subject]?.remarks1 || ""}
//                                             onChange={(e) => changeSubjectData(subject, "remarks1", e.target.value)}
//                                         >
//                                             <option value="">-</option>
//                                             {REMARKS_OPTIONS.map(remark => (
//                                                 <option key={remark} value={remark}>{remark}</option>
//                                             ))}
//                                         </select>
//                                     </td>

//                                     {/* Month 2 Remarks */}
//                                     <td className="border border-gray-400 p-1 text-center">
//                                         <select
//                                             className="w-full text-xs p-1 border-none outline-none bg-transparent"
//                                             value={subjectsData[subject]?.remarks2 || ""}
//                                             onChange={(e) => changeSubjectData(subject, "remarks2", e.target.value)}
//                                         >
//                                             <option value="">-</option>
//                                             {REMARKS_OPTIONS.map(remark => (
//                                                 <option key={remark} value={remark}>{remark}</option>
//                                             ))}
//                                         </select>
//                                     </td>

//                                     {/* Month 3 Remarks */}
//                                     <td className="border border-gray-400 p-1 text-center">
//                                         <select
//                                             className="w-full text-xs p-1 border-none outline-none bg-transparent"
//                                             value={subjectsData[subject]?.remarks3 || ""}
//                                             onChange={(e) => changeSubjectData(subject, "remarks3", e.target.value)}
//                                         >
//                                             <option value="">-</option>
//                                             {REMARKS_OPTIONS.map(remark => (
//                                                 <option key={remark} value={remark}>{remark}</option>
//                                             ))}
//                                         </select>
//                                     </td>

//                                     {/* Appreciation */}
//                                     <td className="border border-gray-400 p-1 text-center">
//                                         <select
//                                             className="w-full text-xs p-1 border-none outline-none bg-transparent"
//                                             value={subjectsData[subject]?.appreciation || ""}
//                                             onChange={(e) => changeSubjectData(subject, "appreciation", e.target.value)}
//                                         >
//                                             <option value="">-</option>
//                                             {REMARKS_OPTIONS.map(remark => (
//                                                 <option key={remark} value={remark}>{remark}</option>
//                                             ))}
//                                         </select>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Bottom Section - Appreciation Legend + Summary of Work */}
//                 <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Appreciation Legend */}
//                     <div className="border rounded p-4 text-xs">
//                         <div className="font-semibold mb-2">Appreciation Legend</div>
//                         <ul className="list-disc ml-5 space-y-1">
//                             <li><strong>Excellent</strong> — Outstanding performance in all areas</li>
//                             <li><strong>Very good</strong> — Above average performance</li>
//                             <li><strong>Good</strong> — Meets expectations consistently</li>
//                             <li><strong>Average</strong> — Meets basic requirements</li>
//                             <li><strong>Fair</strong> — Below average but improving</li>
//                             <li><strong>Above Average</strong> — Better than typical performance</li>
//                             <li><strong>Regular</strong> — Consistent attendance and participation</li>
//                             <li><strong>Irregular</strong> — Inconsistent performance</li>
//                             <li><strong>Friendly</strong> — Positive social interactions</li>
//                             <li><strong>Unfriendly</strong> — Needs improvement in social skills</li>
//                             <li><strong>Fairly good</strong> — Satisfactory performance</li>
//                             <li><strong>Neat</strong> — Organized and tidy work</li>
//                         </ul>
//                     </div>

//                     {/* Summary of Work */}
//                     <div className="border-2 border-gray-400 rounded p-4">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Summary of Work</div>

//                         <div className="space-y-4">
//                             <div className="grid grid-cols-2 gap-3">
//                                 <div>
//                                     <div className="text-xs font-medium mb-1">Result</div>
//                                     <select
//                                         className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                         value={summary.result}
//                                         onChange={(e) => changeSummary("result", e.target.value)}
//                                     >
//                                         <option value="">- Select -</option>
//                                         {RESULT_OPTIONS.map(result => (
//                                             <option key={result} value={result}>{result}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <div className="text-xs font-medium mb-1">Position</div>
//                                     <input
//                                         className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                         value={summary.position}
//                                         onChange={(e) => changeSummary("position", e.target.value)}
//                                         placeholder="Position in class"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Appreciation</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.appreciation}
//                                     onChange={(e) => changeSummary("appreciation", e.target.value)}
//                                 >
//                                     <option value="">- Select -</option>
//                                     {REMARKS_OPTIONS.map(remark => (
//                                         <option key={remark} value={remark}>{remark}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Signatures */}
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
//                                 <div className="text-center">
//                                     <div className="text-xs font-medium mb-1">Teacher's Visa</div>
//                                     <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
//                                         <span className="text-gray-500 text-xs">{summary.teacherSignature || "Signature"}</span>
//                                     </div>
//                                     <input
//                                         className="w-full mt-1 text-center border-none outline-none text-xs"
//                                         value={summary.teacherSignature}
//                                         onChange={(e) => changeSummary("teacherSignature", e.target.value)}
//                                         placeholder="Teacher's name"
//                                     />
//                                 </div>

//                                 <div className="text-center">
//                                     <div className="text-xs font-medium mb-1">Headmaster's Visa</div>
//                                     <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
//                                         <span className="text-gray-500 text-xs">{summary.headmasterSignature || "Signature"}</span>
//                                     </div>
//                                     <input
//                                         className="w-full mt-1 text-center border-none outline-none text-xs"
//                                         value={summary.headmasterSignature}
//                                         onChange={(e) => changeSummary("headmasterSignature", e.target.value)}
//                                         placeholder="Headmaster's name"
//                                     />
//                                 </div>

//                                 <div className="text-center">
//                                     <div className="text-xs font-medium mb-1">Parent's Visa</div>
//                                     <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
//                                         <span className="text-gray-500 text-xs">{summary.parentSignature || "Signature"}</span>
//                                     </div>
//                                     <input
//                                         className="w-full mt-1 text-center border-none outline-none text-xs"
//                                         value={summary.parentSignature}
//                                         onChange={(e) => changeSummary("parentSignature", e.target.value)}
//                                         placeholder="Parent's name"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="mt-8 text-center text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="font-bold text-blue-800 mb-2">School Information</div>
//                     <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//                         <div><strong>Phone:</strong> +237 696 308 503</div>
//                         <div><strong>Head Office:</strong> Yaounde - Nkolbisson (Quartier Mbouda)</div>
//                     </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
//                     {/* Bouton Back - toujours aligné à gauche */}
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm order-1 sm:order-0"
//                     >
//                         Back
//                     </button>

//                     {/* Groupe de boutons de droite */}
//                     <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto order-2 sm:order-0">
//                         <button
//                             onClick={handleReset}
//                             className="w-full xs:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm"
//                         >
//                             Reset
//                         </button>
//                         <button
//                             onClick={handlePreview}
//                             className="w-full xs:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-xs sm:text-sm"
//                         >
//                             Preview & Print
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }










































































import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const MONTH_OPTIONS = ["Month-1", "Month-2", "Month-3"];
const CLASS_OPTIONS = ["Pre-Nursery", "Nursery 1", "Nursery 2"];
const TERM_OPTIONS = ["Term 1", "Term 2", "Term 3"];
const SEX_OPTIONS = ["Male", "Female"];
const RESULT_OPTIONS = ["Passed", "Failed"];

export default function BulletinNurseryForm() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Fonction pour charger les données sauvegardées
    const loadSavedData = () => {
        try {
            const saved = localStorage.getItem('nurseryFormData');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
        return null;
    };

    // Fonction pour sauvegarder les données
    const saveData = (data) => {
        try {
            localStorage.setItem('nurseryFormData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    // Fonction pour effacer les données sauvegardées
    const clearSavedData = () => {
        try {
            localStorage.removeItem('nurseryFormData');
        } catch (error) {
            console.error('Error clearing saved data:', error);
        }
    };

    // Charger les données sauvegardées au montage du composant
    const savedData = loadSavedData();

    const [monthHeaders, setMonthHeaders] = useState(
        savedData?.monthHeaders || { m1: MONTH_OPTIONS[0], m2: MONTH_OPTIONS[1], m3: MONTH_OPTIONS[2] }
    );

    const [meta, setMeta] = useState(savedData?.meta || {
        studentName: "",
        teacherName: "",
        sex: "",
        className: "",
        term: "",
        academicYear: ""
    });

    const [subjectsData, setSubjectsData] = useState(() => {
        if (savedData?.subjectsData) {
            return savedData.subjectsData;
        } else {
            const data = {};
            SUBJECTS.forEach(subject => {
                data[subject] = {
                    remarks1: "",
                    remarks2: "",
                    remarks3: "",
                    appreciation: ""
                };
            });
            return data;
        }
    });

    const [summary, setSummary] = useState(savedData?.summary || {
        result: "",
        position: "",
        appreciation: "",
        teacherSignature: "",
        headmasterSignature: "",
        parentSignature: ""
    });

    // État pour la photo de l'élève
    const [photoEleve, setPhotoEleve] = useState(savedData?.photoEleve || null);

    // Sauvegarder les données à chaque changement
    useEffect(() => {
        const formData = {
            monthHeaders,
            meta,
            subjectsData,
            summary,
            photoEleve
        };
        saveData(formData);
    }, [monthHeaders, meta, subjectsData, summary, photoEleve]);

    const changeMonthHeader = (k, v) => setMonthHeaders(p => ({ ...p, [k]: v }));
    const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

    const changeSubjectData = (subject, field, value) => {
        setSubjectsData(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                [field]: value
            }
        }));
    };

    const changeSummary = (k, v) => setSummary(p => ({ ...p, [k]: v }));

    // Fonction pour gérer la sélection de photo
    const handlePhotoSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            // Vérifier la taille du fichier (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should not exceed 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoEleve(e.target.result);
            };
            reader.onerror = () => {
                alert('Error reading file.');
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonction pour déclencher le sélecteur de fichiers
    const handleAddPhoto = () => {
        fileInputRef.current?.click();
    };

    // Fonction pour supprimer la photo
    const handleRemovePhoto = () => {
        setPhotoEleve(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePreview = () => {
        const payload = {
            meta,
            monthHeaders,
            subjectsData,
            summary,
            photoEleve
        };
        // Sauvegarder avant de naviguer
        saveData(payload);
        navigate("/nursery-preview", { state: payload });
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
            clearSavedData();
            window.location.reload();
        }
    };

    // Générer les options d'année scolaire
    const academicYears = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* Input fichier caché pour la photo */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelection}
                accept="image/*"
                className="hidden"
            />

            {/* Header - Identique à BulletinForm mais en anglais */}
            <div className="w-full max-w-6xl  mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
                <div
                    className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-sta"
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
                        <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">SCHOOL REPORT</div>
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

            {/* Form container */}
            <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
                {/* Section Photo + Student Information */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Zone Photo */}
                    <div className="flex flex-col items-center md:w-1/4">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-3 overflow-hidden">
                            {photoEleve ? (
                                <img 
                                    src={photoEleve} 
                                    alt="Student photo" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-gray-400 text-center text-xs p-2">
                                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Student Photo
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full">
                            <button
                                type="button"
                                onClick={handleAddPhoto}
                                className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Add Photo
                            </button>
                            
                            {photoEleve && (
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                </button>
                            )}
                        </div>
                        
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Recommended format: 3x4 cm
                        </p>
                    </div>

                    {/* Student Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 text-sm">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">NAME</label>
                            <input
                                className="border px-3 py-2 rounded w-full"
                                placeholder="Student name"
                                value={meta.studentName}
                                onChange={(e) => changeMeta("studentName", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">TEACHER NAME</label>
                            <input
                                className="border px-3 py-2 rounded w-full"
                                placeholder="Teacher name"
                                value={meta.teacherName}
                                onChange={(e) => changeMeta("teacherName", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">SEX</label>
                            <select
                                className="border px-3 py-2 rounded w-full"
                                value={meta.sex}
                                onChange={e => changeMeta("sex", e.target.value)}
                            >
                                <option value="">Select</option>
                                {SEX_OPTIONS.map(sex => <option key={sex} value={sex}>{sex}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">CLASS</label>
                            <select
                                className="border px-3 py-2 rounded w-full"
                                value={meta.className}
                                onChange={e => changeMeta("className", e.target.value)}
                            >
                                <option value="">Select</option>
                                {CLASS_OPTIONS.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">TERM</label>
                            <select
                                className="border px-3 py-2 rounded w-full"
                                value={meta.term}
                                onChange={e => changeMeta("term", e.target.value)}
                            >
                                <option value="">Select</option>
                                {TERM_OPTIONS.map(term => <option key={term} value={term}>{term}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">ACADEMIC YEAR</label>
                            <select
                                className="border px-3 py-2 rounded w-full"
                                value={meta.academicYear}
                                onChange={e => changeMeta("academicYear", e.target.value)}
                            >
                                <option value="">Select</option>
                                {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="overflow-x-auto mb-6">
                    <table className="w-full text-xs border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-2 text-center w-8">EVALUATION</th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select
                                        className="text-xs bg-transparent border-none outline-none"
                                        value={monthHeaders.m1}
                                        onChange={(e) => changeMonthHeader("m1", e.target.value)}
                                    >
                                        {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select
                                        className="text-xs bg-transparent border-none outline-none"
                                        value={monthHeaders.m2}
                                        onChange={(e) => changeMonthHeader("m2", e.target.value)}
                                    >
                                        {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select
                                        className="text-xs bg-transparent border-none outline-none"
                                        value={monthHeaders.m3}
                                        onChange={(e) => changeMonthHeader("m3", e.target.value)}
                                    >
                                        {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border border-gray-400 p-2 text-center w-32" rowSpan="2">APPRECIATION</th>
                            </tr>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-2 font-semibold">SUBJECTS</th>
                                <th className="border border-gray-400 p-2 text-center">Remarks</th>
                                <th className="border border-gray-400 p-2 text-center">Remarks</th>
                                <th className="border border-gray-400 p-2 text-center">Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {SUBJECTS.map((subject, index) => (
                                <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="border border-gray-400 p-2 font-medium">{subject}</td>

                                    {/* Month 1 Remarks */}
                                    <td className="border border-gray-400 p-1 text-center">
                                        <select
                                            className="w-full text-xs p-1 border-none outline-none bg-transparent"
                                            value={subjectsData[subject]?.remarks1 || ""}
                                            onChange={(e) => changeSubjectData(subject, "remarks1", e.target.value)}
                                        >
                                            <option value="">-</option>
                                            {REMARKS_OPTIONS.map(remark => (
                                                <option key={remark} value={remark}>{remark}</option>
                                            ))}
                                        </select>
                                    </td>

                                    {/* Month 2 Remarks */}
                                    <td className="border border-gray-400 p-1 text-center">
                                        <select
                                            className="w-full text-xs p-1 border-none outline-none bg-transparent"
                                            value={subjectsData[subject]?.remarks2 || ""}
                                            onChange={(e) => changeSubjectData(subject, "remarks2", e.target.value)}
                                        >
                                            <option value="">-</option>
                                            {REMARKS_OPTIONS.map(remark => (
                                                <option key={remark} value={remark}>{remark}</option>
                                            ))}
                                        </select>
                                    </td>

                                    {/* Month 3 Remarks */}
                                    <td className="border border-gray-400 p-1 text-center">
                                        <select
                                            className="w-full text-xs p-1 border-none outline-none bg-transparent"
                                            value={subjectsData[subject]?.remarks3 || ""}
                                            onChange={(e) => changeSubjectData(subject, "remarks3", e.target.value)}
                                        >
                                            <option value="">-</option>
                                            {REMARKS_OPTIONS.map(remark => (
                                                <option key={remark} value={remark}>{remark}</option>
                                            ))}
                                        </select>
                                    </td>

                                    {/* Appreciation */}
                                    <td className="border border-gray-400 p-1 text-center">
                                        <select
                                            className="w-full text-xs p-1 border-none outline-none bg-transparent"
                                            value={subjectsData[subject]?.appreciation || ""}
                                            onChange={(e) => changeSubjectData(subject, "appreciation", e.target.value)}
                                        >
                                            <option value="">-</option>
                                            {REMARKS_OPTIONS.map(remark => (
                                                <option key={remark} value={remark}>{remark}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Section - Appreciation Legend + Summary of Work */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Appreciation Legend */}
                    <div className="border rounded p-4 text-xs">
                        <div className="font-semibold mb-2">Appreciation Legend</div>
                        <ul className="list-disc ml-5 space-y-1">
                            <li><strong>Excellent</strong> — Outstanding performance in all areas</li>
                            <li><strong>Very good</strong> — Above average performance</li>
                            <li><strong>Good</strong> — Meets expectations consistently</li>
                            <li><strong>Average</strong> — Meets basic requirements</li>
                            <li><strong>Fair</strong> — Below average but improving</li>
                            <li><strong>Above Average</strong> — Better than typical performance</li>
                            <li><strong>Regular</strong> — Consistent attendance and participation</li>
                            <li><strong>Irregular</strong> — Inconsistent performance</li>
                            <li><strong>Friendly</strong> — Positive social interactions</li>
                            <li><strong>Unfriendly</strong> — Needs improvement in social skills</li>
                            <li><strong>Fairly good</strong> — Satisfactory performance</li>
                            <li><strong>Neat</strong> — Organized and tidy work</li>
                        </ul>
                    </div>

                    {/* Summary of Work */}
                    <div className="border-2 border-gray-400 rounded p-4">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Summary of Work</div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-xs font-medium mb-1">Result</div>
                                    <select
                                        className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                        value={summary.result}
                                        onChange={(e) => changeSummary("result", e.target.value)}
                                    >
                                        <option value="">- Select -</option>
                                        {RESULT_OPTIONS.map(result => (
                                            <option key={result} value={result}>{result}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <div className="text-xs font-medium mb-1">Position</div>
                                    <input
                                        className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                        value={summary.position}
                                        onChange={(e) => changeSummary("position", e.target.value)}
                                        placeholder="Position in class"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium mb-1">Appreciation</div>
                                <select
                                    className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={summary.appreciation}
                                    onChange={(e) => changeSummary("appreciation", e.target.value)}
                                >
                                    <option value="">- Select -</option>
                                    {REMARKS_OPTIONS.map(remark => (
                                        <option key={remark} value={remark}>{remark}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Signatures */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                <div className="text-center">
                                    <div className="text-xs font-medium mb-1">Teacher's Visa</div>
                                    <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">{summary.teacherSignature || "Signature"}</span>
                                    </div>
                                    <input
                                        className="w-full mt-1 text-center border-none outline-none text-xs"
                                        value={summary.teacherSignature}
                                        onChange={(e) => changeSummary("teacherSignature", e.target.value)}
                                        placeholder="Teacher's name"
                                    />
                                </div>

                                <div className="text-center">
                                    <div className="text-xs font-medium mb-1">Headmaster's Visa</div>
                                    <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">{summary.headmasterSignature || "Signature"}</span>
                                    </div>
                                    <input
                                        className="w-full mt-1 text-center border-none outline-none text-xs"
                                        value={summary.headmasterSignature}
                                        onChange={(e) => changeSummary("headmasterSignature", e.target.value)}
                                        placeholder="Headmaster's name"
                                    />
                                </div>

                                <div className="text-center">
                                    <div className="text-xs font-medium mb-1">Parent's Visa</div>
                                    <div className="border border-gray-300 rounded p-2 h-16 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">{summary.parentSignature || "Signature"}</span>
                                    </div>
                                    <input
                                        className="w-full mt-1 text-center border-none outline-none text-xs"
                                        value={summary.parentSignature}
                                        onChange={(e) => changeSummary("parentSignature", e.target.value)}
                                        placeholder="Parent's name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
                    {/* Bouton Back - toujours aligné à gauche */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm order-1 sm:order-0"
                    >
                        Back
                    </button>

                    {/* Groupe de boutons de droite */}
                    <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto order-2 sm:order-0">
                        <button
                            onClick={handleReset}
                            className="w-full xs:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handlePreview}
                            className="w-full xs:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-xs sm:text-sm"
                        >
                            Preview & Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}