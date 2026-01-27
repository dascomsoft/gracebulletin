
// import React, { useState, useEffect, useRef } from "react";
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
//     const fileInputRef = useRef(null);





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

//     // État pour la photo de l'élève
//     const [photoEleve, setPhotoEleve] = useState(savedData?.photoEleve || null);

//     // Sauvegarder les données à chaque changement
//     useEffect(() => {
//         const formData = {
//             monthHeaders,
//             meta,
//             subjectsData,
//             summary,
//             photoEleve
//         };
//         saveData(formData);
//     }, [monthHeaders, meta, subjectsData, summary, photoEleve]);

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

//     // Fonction pour gérer la sélection de photo
//     const handlePhotoSelection = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Vérifier le type de fichier
//             if (!file.type.startsWith('image/')) {
//                 alert('Please select a valid image file.');
//                 return;
//             }

//             // Vérifier la taille du fichier (max 5MB)
//             if (file.size > 5 * 1024 * 1024) {
//                 alert('Image size should not exceed 5MB.');
//                 return;
//             }

//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setPhotoEleve(e.target.result);
//             };
//             reader.onerror = () => {
//                 alert('Error reading file.');
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Fonction pour déclencher le sélecteur de fichiers
//     const handleAddPhoto = () => {
//         fileInputRef.current?.click();
//     };

//     // Fonction pour supprimer la photo
//     const handleRemovePhoto = () => {
//         setPhotoEleve(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const handlePreview = () => {
//         const payload = {
//             meta,
//             monthHeaders,
//             subjectsData,
//             summary,
//             photoEleve
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
//             {/* Input fichier caché pour la photo */}
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handlePhotoSelection}
//                 accept="image/*"
//                 className="hidden"
//             />

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
//                 {/* Section Photo + Student Information */}
//                 <div className="flex flex-col md:flex-row gap-6 mb-6">
//                     {/* Zone Photo */}
//                     <div className="flex flex-col items-center md:w-1/4">
//                         <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-3 overflow-hidden">
//                             {photoEleve ? (
//                                 <img 
//                                     src={photoEleve} 
//                                     alt="Student photo" 
//                                     className="w-full h-full object-cover rounded-lg"
//                                 />
//                             ) : (
//                                 <div className="text-gray-400 text-center text-xs p-2">
//                                     <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     Student Photo
//                                 </div>
//                             )}
//                         </div>
                        
//                         <div className="flex flex-col gap-2 w-full">
//                             <button
//                                 type="button"
//                                 onClick={handleAddPhoto}
//                                 className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center justify-center gap-1"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                                 </svg>
//                                 Add Photo
//                             </button>
                            
//                             {photoEleve && (
//                                 <button
//                                     type="button"
//                                     onClick={handleRemovePhoto}
//                                     className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                     </svg>
//                                     Remove
//                                 </button>
//                             )}
//                         </div>
                        
//                         <p className="text-xs text-gray-500 text-center mt-2">
//                             Recommended format: 3x4 cm
//                         </p>
//                     </div>

//                     {/* Student Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 text-sm">
//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">NAME</label>
//                             <input
//                                 className="border px-3 py-2 rounded w-full"
//                                 placeholder="Student name"
//                                 value={meta.studentName}
//                                 onChange={(e) => changeMeta("studentName", e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">TEACHER NAME</label>
//                             <input
//                                 className="border px-3 py-2 rounded w-full"
//                                 placeholder="Teacher name"
//                                 value={meta.teacherName}
//                                 onChange={(e) => changeMeta("teacherName", e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">SEX</label>
//                             <select
//                                 className="border px-3 py-2 rounded w-full"
//                                 value={meta.sex}
//                                 onChange={e => changeMeta("sex", e.target.value)}
//                             >
//                                 <option value="">Select</option>
//                                 {SEX_OPTIONS.map(sex => <option key={sex} value={sex}>{sex}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">CLASS</label>
//                             <select
//                                 className="border px-3 py-2 rounded w-full"
//                                 value={meta.className}
//                                 onChange={e => changeMeta("className", e.target.value)}
//                             >
//                                 <option value="">Select</option>
//                                 {CLASS_OPTIONS.map(cls => <option key={cls} value={cls}>{cls}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">TERM</label>
//                             <select
//                                 className="border px-3 py-2 rounded w-full"
//                                 value={meta.term}
//                                 onChange={e => changeMeta("term", e.target.value)}
//                             >
//                                 <option value="">Select</option>
//                                 {TERM_OPTIONS.map(term => <option key={term} value={term}>{term}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">ACADEMIC YEAR</label>
//                             <select
//                                 className="border px-3 py-2 rounded w-full"
//                                 value={meta.academicYear}
//                                 onChange={e => changeMeta("academicYear", e.target.value)}
//                             >
//                                 <option value="">Select</option>
//                                 {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Table */}
//                 <div className="overflow-x-auto mb-6">
//                     <table className="w-full text-xs border-collapse border border-gray-400">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="border border-gray-400 p-2 text-center w-20">EVALUATION</th> {/* CHANGÉ: de w-8 à w-20 */}
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
//                                 <th className="border border-gray-400 p-2 font-semibold w-80">SUBJECTS</th> {/* CHANGÉ: ajouté w-80 pour agrandir */}
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                                 <th className="border border-gray-400 p-2 text-center">Remarks</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {SUBJECTS.map((subject, index) => (
//                                 <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                     <td className="border border-gray-400 p-2 font-medium w-80"> {/* CHANGÉ: ajouté w-80 pour agrandir */}
//                                         <div className="text-[11px] leading-tight min-w-[300px]"> {/* CHANGÉ: ajouté min-w-[300px] */}
//                                             {subject}
//                                         </div>
//                                     </td>

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
//                    <div className="text-center text-[8px] mt-9 print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5  print:mt-9 mb-2 print:mb-0 print:mx-4">
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
//                         {/* <button
//                             onClick={handleReset}
//                             className="w-full xs:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm"
//                         >
//                             Reset
//                         </button> */}
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




















































































































































import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => `Month-${i + 1}`);
const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
const APPRECIATIONS = ["Not acquired", "In progress", "Good", "Excellent"];
const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

const SKILLS_TEMPLATE = [
  {
    key: "language",
    title: "Language Development",
    description: "Listening, speaking, vocabulary, pre-reading skills",
    sclValues: { Listening: 15, Speaking: 15, Vocabulary: 10 },
    evaluations: ["Listening", "Speaking", "Vocabulary"]
  },
  {
    key: "cognitive",
    title: "Cognitive Development",
    description: "Numbers, shapes, colors, matching, sorting",
    sclValues: { Numbers: 15, Shapes: 10, Colors: 10, Matching: 5 },
    evaluations: ["Numbers", "Shapes", "Colors", "Matching"]
  },
  {
    key: "motor",
    title: "Motor Skills Development",
    description: "Gross motor, fine motor, coordination",
    sclValues: { Gross: 15, Fine: 15, Coordination: 10 },
    evaluations: ["Gross", "Fine", "Coordination"]
  },
  {
    key: "social",
    title: "Social & Emotional Development",
    description: "Sharing, cooperation, self-help, emotional expression",
    sclValues: { Sharing: 10, Cooperation: 10, "Self-help": 10, Emotions: 10 },
    evaluations: ["Sharing", "Cooperation", "Self-help", "Emotions"]
  },
  {
    key: "creative",
    title: "Creative Development",
    description: "Art, music, imaginative play, creativity",
    sclValues: { Art: 10, Music: 10, Play: 10, Creativity: 10 },
    evaluations: ["Art", "Music", "Play", "Creativity"]
  },
  {
    key: "discovery",
    title: "Discovery of the World",
    description: "Nature, science exploration, curiosity",
    sclValues: { Nature: 10, Science: 10, Curiosity: 10, Exploration: 10 },
    evaluations: ["Nature", "Science", "Curiosity", "Exploration"]
  }
];

const API_BASE_URL = 'http://localhost:3000';

export default function BulletinNurseryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId: paramStudentId } = useParams();
  
  console.log("🔍 DEBUG BulletinNurseryForm:", {
    paramStudentId,
    locationState: location.state,
    url: location.pathname,
    apiBaseUrl: API_BASE_URL
  });

  const [currentTrimester, setCurrentTrimester] = useState(() => {
    if (location.state?.trimestre) {
      console.log(`✅ Term from state: ${location.state.trimestre}`);
      return location.state.trimestre;
    }
    
    const saved = localStorage.getItem('bulletinNurseryData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.meta?.term) {
          return data.meta.term;
        }
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }
    }
    
    return 'Term 1';
  });

  const [studentId, setStudentId] = useState(() => {
    if (paramStudentId) {
      const id = parseInt(paramStudentId);
      console.log(`✅ ID from URL: ${id} (type: ${typeof id})`);
      return id;
    }
    
    if (location.state?.studentId) {
      const id = parseInt(location.state.studentId);
      console.log(`✅ ID from state: ${id} (type: ${typeof id})`);
      return id;
    }
    
    const saved = localStorage.getItem('bulletinNurseryData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.meta?.student_id) {
          const id = parseInt(data.meta.student_id);
          console.log(`✅ ID from localStorage: ${id} (type: ${typeof id})`);
          return id;
        }
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }
    }
    
    console.warn("⚠️ No student ID found");
    return null;
  });

  const [studentInfo, setStudentInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [bulletinId, setBulletinId] = useState(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (studentId) {
      console.log(`🔄 Loading student info ID: ${studentId}`);
      loadStudentInfo(studentId);
      loadStudentBulletins(studentId);
    } else {
      console.warn("❌ No student ID to load info");
    }
  }, [studentId]);

  const loadStudentInfo = async (id) => {
    try {
      console.log(`📡 API request for student ID: ${id}`);
      const url = `${API_BASE_URL}/api/student/${id}`;
      console.log(`📡 URL: ${url}`);
      
      const response = await fetch(url);
      console.log(`📡 Response status: ${response.status}`);
      
      if (response.ok) {
        const student = await response.json();
        console.log('✅ Student info loaded:', student);
        setStudentInfo(student);
        setMeta(prev => ({
          ...prev,
          studentName: student.nom_complet || student.full_name || "",
          sex: student.sex || student.sexe || "",
          className: student.class_name || "",
          student_id: student.id
        }));
      } else {
        const errorText = await response.text();
        console.error(`❌ API error: ${response.status}`, errorText.substring(0, 200));
      }
    } catch (error) {
      console.error('❌ Error loading student info:', error);
    }
  };

  const loadStudentBulletins = async (id) => {
    try {
      const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
      console.log(`📡 Request bulletins: ${url}`);
      
      const response = await fetch(url);
      if (response.ok) {
        const bulletins = await response.json();
        console.log(`✅ ${bulletins.length} bulletins found`);
        
        const currentTrimesterBulletin = bulletins.find(b => 
          b.bulletin_type === 'nursery' && 
          (b.trimester === currentTrimester || 
           (currentTrimester === 'Term 1' && b.trimester === 'Trimestre 1') ||
           (currentTrimester === 'Term 2' && b.trimester === 'Trimestre 2') ||
           (currentTrimester === 'Term 3' && b.trimester === 'Trimestre 3'))
        );
        
        if (currentTrimesterBulletin) {
          console.log('✅ Existing bulletin found:', currentTrimesterBulletin);
          setBulletinId(currentTrimesterBulletin.id);
          setIsEditing(true);
          
          const savedData = JSON.parse(currentTrimesterBulletin.data_json);
          if (savedData.periodHeaders) setPeriodHeaders(savedData.periodHeaders);
          if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
          if (savedData.data) setData(savedData.data);
          if (savedData.periodInfo) setPeriodInfo(savedData.periodInfo);
          if (savedData.summary) setSummary(savedData.summary);
          if (savedData.studentPhoto) setStudentPhoto(savedData.studentPhoto);
        } else {
          console.log(`ℹ️ No existing nursery bulletin for ${currentTrimester}`);
        }
      } else {
        console.error(`❌ Error loading bulletins: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error loading bulletins:', error);
    }
  };

  const initializeData = () => {
    const root = {};
    SKILLS_TEMPLATE.forEach(s => {
      const evals = {};
      s.evaluations.forEach(ev => (evals[ev] = { m1: "", m2: "", m3: "" }));
      root[s.key] = { appreciation: "", evals };
    });
    return root;
  };

  const [periodHeaders, setPeriodHeaders] = useState({
    h1: MONTH_OPTIONS[0], 
    h2: MONTH_OPTIONS[1], 
    h3: MONTH_OPTIONS[2]
  });

  const [meta, setMeta] = useState({
    studentName: "",
    sex: "",
    className: "",
    level: "",
    term: currentTrimester,
    year: "",
    teacher: "",
    student_id: studentId || null
  });

  const [studentPhoto, setStudentPhoto] = useState(null);
  const [data, setData] = useState(() => initializeData());
  const [periodInfo, setPeriodInfo] = useState({
    pos1: "", pos2: "", pos3: "",
    app1: "", app2: "", app3: ""
  });
  const [summary, setSummary] = useState({
    overallAppreciation: "",
    position: "",
    decision: ""
  });

  const saveData = (data) => {
    try {
      localStorage.setItem('bulletinNurseryData', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
    }
  };

  useEffect(() => {
    const formData = {
      periodHeaders,
      meta,
      studentPhoto,
      data,
      periodInfo,
      summary
    };
    saveData(formData);
  }, [periodHeaders, meta, studentPhoto, data, periodInfo, summary]);

  const saveToDatabase = async (isDraft = true) => {
    try {
      setSaving(true);
      
      console.log(`🔍 Checking studentId: ${studentId} (type: ${typeof studentId})`);
      
      if (!studentId) {
        console.error("❌ CRITICAL ERROR: studentId is null/undefined");
        alert("❌ ERROR: No student selected.\n\nPlease return to student list and click 'Create Bulletin'.");
        setSaving(false);
        return null;
      }

      const totals = calculateTotals();
      const averages = calculateAverages(totals);
      const overallAvg = calculateOverallAverage(averages);

      const formData = {
        periodHeaders,
        meta: { ...meta, student_id: studentId, term: currentTrimester },
        studentPhoto,
        data,
        periodInfo,
        summary,
        totals,
        averages,
        overallAvg,
        isDraft
      };

      const payload = {
        student_id: studentId,
        bulletin_type: 'nursery',
        trimester: currentTrimester,
        academic_year: meta.year || getCurrentAcademicYear(),
        nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
        classe: meta.className || studentInfo?.class_name || "",
        enseignant: meta.teacher || "",
        appreciation: summary.overallAppreciation || "",
        rang_position: summary.position || "",
        decision: summary.decision || "",
        data_json: JSON.stringify(formData),
        is_draft: isDraft ? 1 : 0
      };

      console.log('📤 Payload to API:', payload);
      console.log('📤 student_id type:', typeof payload.student_id);
      console.log('📤 Base URL:', API_BASE_URL);
      
      let url, method;
      if (bulletinId) {
        url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
        method = 'PUT';
        console.log(`🔄 Updating bulletin ID: ${bulletinId} - URL: ${url}`);
      } else {
        url = `${API_BASE_URL}/api/bulletin/nursery`;
        method = 'POST';
        console.log('🆕 Creating new bulletin - URL:', url);
      }

      console.log(`📤 Sending ${method} to: ${url}`);
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log(`📥 API Response (${response.status}):`, responseText.substring(0, 500));

      if (!response.ok) {
        throw new Error(`API Error ${response.status}: ${responseText.substring(0, 200)}`);
      }

      const result = JSON.parse(responseText);
      console.log('✅ API Response:', result);

      if (!bulletinId && result.id) {
        setBulletinId(result.id);
        setIsEditing(true);
      }

      if (isDraft) {
        setIsDraftSaved(true);
        alert('✅ Draft saved successfully!');
      } else {
        alert('✅ Bulletin finalized successfully!');
      }

      return result;

    } catch (error) {
      console.error('❌ Save error:', error);
      alert(`❌ Error during save: ${error.message}`);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const getCurrentAcademicYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month >= 8) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  };

  const calculateTotals = () => {
    let sumNotes1 = 0, sumNotes2 = 0, sumNotes3 = 0;
    let sumSCL1 = 0, sumSCL2 = 0, sumSCL3 = 0;

    SKILLS_TEMPLATE.forEach(skill => {
      const skillData = data[skill.key];
      skill.evaluations.forEach(ev => {
        const evalData = skillData.evals[ev];

        if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
          sumNotes1 += Number(evalData.m1);
          sumSCL1 += skill.sclValues[ev];
        }

        if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
          sumNotes2 += Number(evalData.m2);
          sumSCL2 += skill.sclValues[ev];
        }

        if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
          sumNotes3 += Number(evalData.m3);
          sumSCL3 += skill.sclValues[ev];
        }
      });
    });

    return {
      t1: `${sumNotes1}/${sumSCL1}`,
      t2: `${sumNotes2}/${sumSCL2}`,
      t3: `${sumNotes3}/${sumSCL3}`,
      raw: { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 }
    };
  };

  const calculateAverages = (totals) => {
    const { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 } = totals.raw;

    const a1 = sumSCL1 > 0 ? Math.round((sumNotes1 / sumSCL1) * 20 * 100) / 100 : 0;
    const a2 = sumSCL2 > 0 ? Math.round((sumNotes2 / sumSCL2) * 20 * 100) / 100 : 0;
    const a3 = sumSCL3 > 0 ? Math.round((sumNotes3 / sumSCL3) * 20 * 100) / 100 : 0;

    return {
      a1: sumSCL1 > 0 ? `${a1}/20` : "0/20",
      a2: sumSCL2 > 0 ? `${a2}/20` : "0/20",
      a3: sumSCL3 > 0 ? `${a3}/20` : "0/20",
      raw: { a1, a2, a3 }
    };
  };

  const calculateOverallAverage = (averages) => {
    const { a1, a2, a3 } = averages.raw;
    const average = Math.round(((a1 + a2 + a3) / 3) * 100) / 100;
    return `${average}/20`;
  };

  const totals = useMemo(() => calculateTotals(), [data]);
  const averages = useMemo(() => calculateAverages(totals), [totals]);
  const overallAvg = useMemo(() => calculateOverallAverage(averages), [averages]);

  const changeHeader = (k, v) => setPeriodHeaders(p => ({ ...p, [k]: v }));
  const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
  
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Photo is too large. Please choose an image less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemovePhoto = () => setStudentPhoto(null);
  
  const changeNote = (skillKey, evalLabel, monthKey, value) => {
    setData(prev => ({
      ...prev,
      [skillKey]: {
        ...prev[skillKey],
        evals: {
          ...prev[skillKey].evals,
          [evalLabel]: { ...prev[skillKey].evals[evalLabel], [monthKey]: value ? Number(value) : "" }
        }
      }
    }));
  };
  
  const changeGroupApp = (skillKey, value) => {
    setData(prev => ({ ...prev, [skillKey]: { ...prev[skillKey], appreciation: value } }));
  };
  
  const changePeriodInfo = (k, v) => setPeriodInfo(p => ({ ...p, [k]: v }));
  const changeSummary = (k, v) => setSummary(s => ({ ...s, [k]: v }));

  const handleSaveDraft = async () => {
    console.log('💾 Saving draft...');
    const result = await saveToDatabase(true);
    if (result) {
      console.log('✅ Draft saved');
    }
  };

  const handleFinalize = async () => {
    console.log('✅ Finalizing and printing...');
    const result = await saveToDatabase(false);
    if (result) {
      handlePrint();
    }
  };

  const handlePrint = () => {
    console.log('🖨️ Preparing print...');
    
    const printData = {
      meta: { ...meta, student_id: studentId },
      studentPhoto,
      periodHeaders,
      data,
      totals,
      averages,
      periodInfo,
      overallAvg,
      summary
    };
    
    localStorage.setItem('printBulletinData', JSON.stringify(printData));
    
    window.open('/print-bulletin-nursery', '_blank');
  };

  const handlePrintOnly = () => {
    console.log('🖨️ Print only...');
    handlePrint();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
      localStorage.removeItem('bulletinNurseryData');
      setPeriodHeaders({ h1: MONTH_OPTIONS[0], h2: MONTH_OPTIONS[1], h3: MONTH_OPTIONS[2] });
      setMeta({
        studentName: "",
        sex: "",
        className: "",
        level: "",
        term: currentTrimester,
        year: "",
        teacher: "",
        student_id: studentId || null
      });
      setStudentPhoto(null);
      setData(initializeData());
      setPeriodInfo({ pos1: "", pos2: "", pos3: "", app1: "", app2: "", app3: "" });
      setSummary({ overallAppreciation: "", position: "", decision: "" });
      setBulletinId(null);
      setIsEditing(false);
      setIsDraftSaved(false);
    }
  };

  const renderStudentInfo = () => {
    if (studentInfo) {
      return (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">👤</span>
            <span className="text-sm text-blue-700">
              Child: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
              {studentInfo.class_name && ` - Class: ${studentInfo.class_name}`}
              {studentInfo.sex && ` - Sex: ${studentInfo.sex}`}
              {` - Term: ${currentTrimester}`}
            </span>
          </div>
          {studentId && (
            <div className="mt-2 text-xs text-gray-600">
              ID: <code className="bg-gray-100 px-2 py-1 rounded">{studentId}</code>
            </div>
          )}
        </div>
      );
    } else if (!studentId) {
      return (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-600">❌</span>
            <span className="text-sm text-red-700 font-semibold">
              ERROR: No child selected!
            </span>
          </div>
          <div className="mt-2 text-xs text-red-600">
            You must first select a child from the student list.
          </div>
          <div className="mt-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSaveStatus = () => {
    if (isDraftSaved) {
      return (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-sm text-green-700">
              Draft saved
            </span>
          </div>
        </div>
      );
    }
    
    if (bulletinId) {
      return (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">📁</span>
            <span className="text-sm text-blue-700">
              Bulletin loaded (ID: {bulletinId})
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
        <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
          <div className="text-left mb-2 md:mb-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
          </div>

          <div className="text-center md:flex-1 md:mx-2">
            <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
              BILINGUAL SCHOOL GROUP THE GRACE OF GOD
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              NURSERY SCHOOL REPORT
            </div>
          </div>

          <div className="text-right mt-2 md:mt-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
        {renderStudentInfo()}
        {renderSaveStatus()}

        <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3 relative bg-gray-50">
              {studentPhoto ? (
                <>
                  <img
                    src={studentPhoto}
                    alt="Child"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">No photo</span>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Add Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Click to select photo
            </p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input 
                className="border px-3 py-2 rounded" 
                placeholder="Child's full name" 
                value={meta.studentName} 
                onChange={(e) => changeMeta("studentName", e.target.value)} 
                disabled={!!studentInfo}
              />
              {/* <select 
                className="border px-3 py-2 rounded" 
                value={meta.sex} 
                onChange={e => changeMeta("sex", e.target.value)}
                disabled={!!studentInfo}
              >
                <option value="">Sex</option>
                <option>Boy</option>
                <option>Girl</option>
              </select> */}
              <select 
                className="border px-3 py-2 rounded" 
                value={meta.className} 
                onChange={e => changeMeta("className", e.target.value)}
                disabled={!!studentInfo}
              >
                <option value="">Class</option>
                <option>Creche</option>
                <option>Nursery 1</option>
                <option>Nursery 2</option>
                <option>Pre-Nursery</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
                <option value="">Level</option>
                <option>Level 1</option>
                <option>Level 2</option>
                <option>Level 3</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
                <option value="">Term / Period</option>
                <option>Term 1</option><option>Term 2</option><option>Term 3</option>
                <option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
              </select>

              <select className="border px-3 py-2 rounded" value={meta.year} onChange={e => changeMeta("year", e.target.value)}>
                <option value="">Academic Year</option>
                {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
              </select>

              <input className="border px-3 py-2 rounded md:col-span-3" placeholder="Teacher" value={meta.teacher} onChange={e => changeMeta("teacher", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 w-36">Development Areas</th>
                <th className="border p-2 w-96">Skills & Competencies</th>
                <th className="border p-2 text-center w-20">Evaluation</th>
                <th className="border p-2 text-center w-14">SCL</th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-xs" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-28">Appreciation</th>
              </tr>
            </thead>

            <tbody>
              {SKILLS_TEMPLATE.map(skill => {
                const state = data[skill.key];
                return (
                  <React.Fragment key={skill.key}>
                    {skill.evaluations.map((ev, i) => (
                      <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {i === 0 && (
                          <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
                            <div className="text-sm">{skill.title}</div>
                          </td>
                        )}
                        {i === 0 && (
                          <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                            <div className="text-xs text-gray-600">{skill.description}</div>
                          </td>
                        )}

                        <td className="border p-2 text-center align-top">{ev}</td>
                        <td className="border p-2 text-center align-top">{skill.sclValues[ev]}</td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m1 || ""} onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m2 || ""} onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        <td className="border p-1 text-center">
                          <select className="w-full text-xs p-1" value={state.evals[ev].m3 || ""} onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}>
                            <option value="">-</option>
                            {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>

                        {i === 0 && (
                          <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                            <select className="w-full text-sm p-1" value={state.appreciation || ""} onChange={(e) => changeGroupApp(skill.key, e.target.value)}>
                              <option value="">-</option>
                              {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
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

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded p-4 text-xs">
            <div className="font-semibold mb-2">Teacher's Observations</div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Good language development</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Active participation in activities</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">↗</span>
                <span className="text-sm">Needs encouragement in sharing</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Creative and imaginative play</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Appreciation Legend</div>
              <ul className="list-disc ml-5 text-xs">
                <li><strong>Excellent</strong> — Mastered the skill completely</li>
                <li><strong>Good</strong> — Performing well in this area</li>
                <li><strong>In progress</strong> — Still developing this skill</li>
                <li><strong>Not acquired</strong> — Needs more time and practice</li>
              </ul>
            </div>
          </div>

          <div className="border rounded p-4 text-sm">
            <div className="font-semibold mb-2">Evaluation Periods</div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Totals</div>
                <div className="font-semibold mt-1">{totals.t1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totals</div>
                <div className="font-semibold mt-1">{totals.t2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totals</div>
                <div className="font-semibold mt-1">{totals.t3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Average (/20)</div>
                <div className="font-semibold mt-1">{averages.a1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Average (/20)</div>
                <div className="font-semibold mt-1">{averages.a2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Average (/20)</div>
                <div className="font-semibold mt-1">{averages.a3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-600">Appreciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appreciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appreciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Periodic Summary</div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Overall Average</div>
                <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Overall Appreciation</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.overallAppreciation}
                  onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
                >
                  <option value="">- Select -</option>
                  <option>Not acquired</option>
                  <option>In progress</option>
                  <option>Good</option>
                  <option>Excellent</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Progress Level</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.position}
                  onChange={(e) => changeSummary("position", e.target.value)}
                >
                  <option value="">- Select -</option>
                  <option>Excellent progress</option>
                  <option>Good progress</option>
                  <option>Satisfactory progress</option>
                  <option>Needs more support</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Promotion</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.decision}
                  onChange={(e) => changeSummary("decision", e.target.value)}
                >
                  <option value="">- Select -</option>
                  <option>Ready for next level</option>
                  <option>Repeat recommended</option>
                  <option>Continue monitoring</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Teacher's Visa</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature and stamp
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Headmaster's Visa</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature and stamp
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Parent's Visa</div>
            <div className="text-center text-xs text-gray-500 mt-8">
              Signature and date
            </div>
          </div>
        </div>

        <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
          <div className="receipt-footer">
            <div>
              <p>Phone: (+237) 696-308-503 / WhatsApp: 651989899</p>
              <p>Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, facing mini market)</p>
            </div>
            <div>
              <p>Opening decree: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>

          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrintOnly}
              disabled={!studentId}
              className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🖨️ Print
            </button>
            
            <button
              onClick={handleReset}
              className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
            >
              Reset
            </button>
            
            <button
              onClick={handleSaveDraft}
              disabled={saving || !studentId}
              className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={handleFinalize}
              disabled={saving || !studentId}
              className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : '✅ Finalize'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}