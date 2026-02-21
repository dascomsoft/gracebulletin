// import React, { useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => `Mont-${i + 1}`);
// const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
// const APPRECIATIONS = ["Not acquired", "In the process of acquire", "Expert", "Acquired"];
// const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

// const SKILLS_TEMPLATE = [
//     {
//         key: "1A",
//         title: "1A- Communicate in English",
//         description: "Listening - speaking - writing - reading",
//         sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//         evaluations: ["Attitude", "Oral", "Written"]
//     },
//     {
//         key: "1B",
//         title: "1B- Communicate in French",
//         description: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary",
//         sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//         evaluations: ["Attitude", "Oral", "Written"]
//     },
//     {
//         key: "1C",
//         title: "1C- Communicate in One National Language",
//         description: "Customs - traditions - mode of life - interpretation of phenomena",
//         sclValues: { Oral: 15, Practical: 5 },
//         evaluations: ["Oral", "Practical"]
//     },
//     {
//         key: "2A",
//         title: "2A- Use basic Notions in Mathematics",
//         description: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry",
//         sclValues: { Attitude: 5, Oral: 10, Practical:15, Written:30 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "2B",
//         title: "2B- Use basic Notions in science and technology",
//         description: "Health and environmental education - technology and engineering",
//         sclValues: { Attitude: 5, Oral:10, Practical:15, Written:20 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "3A",
//         title: "3A- Practise Social Value",
//         description: "History and geography",
//         sclValues: { Attitude:10, Oral: 6, Practical:2, Written: 2 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "3B",
//         title: "3B- Practise Citizenship values",
//         description: "Civics - human right - moral education",
//         sclValues: { Attitude: 10, Oral:10, Practical:5, Written: 5 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "4A",
//         title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies",
//         description: "Needles work - house craft - laundry and food nutrition",
//         sclValues: { Attitude:3, Oral:2, Practical:6, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "4B",
//         title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship",
//         description: "Agricultural tool - farming and gardening - livestock farming",
//         sclValues: { Attitude:3, Oral: 2, Practical: 6, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "5",
//         title: "5- Use Basic Concepts and Tools of Information and Communication Technologies",
//         description: "The computer and ICT tools - Internet and communication ethics",
//         sclValues: { Attitude: 3, Oral:3, Practical: 10, Written:4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "6A",
//         title: "6-A Practise Physical and Sports Activities",
//         description: "Movement - jumping - team sports - gymnastics - relay - sprint",
//         sclValues: { Attitude: 3, Oral:3, Practical: 10, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },




//        {
//         key: "6B",
//         title: "6-B Practice Physical sport",
//         description: "For physically challenged",
//         sclValues: { Attitude:8, Oral:12, Practical:0, Written:0 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },




//     {
//         key: "6C",
//         title: "6-C Practice Artistic Activities",
//         description: "Visual arts - performing arts",
//         sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     }
// ];

// export default function BulletinForm() {


   






//     const navigate = useNavigate();

//     // Fonction pour charger les données sauvegardées
//     const loadSavedData = () => {
//         try {
//             const saved = localStorage.getItem('bulletinFormData');
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
//             localStorage.setItem('bulletinFormData', JSON.stringify(data));
//         } catch (error) {
//             console.error('Error saving data:', error);
//         }
//     };

//     // Fonction pour effacer les données sauvegardées
//     const clearSavedData = () => {
//         try {
//             localStorage.removeItem('bulletinFormData');
//         } catch (error) {
//             console.error('Error clearing saved data:', error);
//         }
//     };

//     // Charger les données sauvegardées au montage du composant
//     const savedData = loadSavedData();

//     const [periodHeaders, setPeriodHeaders] = useState(
//         savedData?.periodHeaders || { h1: MONTH_OPTIONS[0], h2: MONTH_OPTIONS[1], h3: MONTH_OPTIONS[2] }
//     );

//     const [meta, setMeta] = useState(savedData?.meta || {
//         studentName: "",
//         sex: "",
//         className: "",
//         level: "",
//         term: "",
//         year: "",
//         teacher: ""
//     });

//     // AJOUT: État pour la photo de l'élève
//     const [studentPhoto, setStudentPhoto] = useState(savedData?.studentPhoto || null);

//     const [data, setData] = useState(() => {
//         if (savedData?.data) {
//             return savedData.data;
//         } else {
//             const root = {};
//             SKILLS_TEMPLATE.forEach(s => {
//                 const evals = {};
//                 s.evaluations.forEach(ev => (evals[ev] = { m1: "", m2: "", m3: "" }));
//                 root[s.key] = { appreciation: "", evals };
//             });
//             return root;
//         }
//     });

//     const [periodInfo, setPeriodInfo] = useState(savedData?.periodInfo || {
//         pos1: "", pos2: "", pos3: "",
//         app1: "", app2: "", app3: ""
//     });

//     const [summary, setSummary] = useState(savedData?.summary || {
//         overallAppreciation: "",
//         position: "",
//         decision: ""
//     });

//     // Sauvegarder les données à chaque changement
//     useEffect(() => {
//         const formData = {
//             periodHeaders,
//             meta,
//             studentPhoto, // AJOUT: Inclure la photo dans la sauvegarde
//             data,
//             periodInfo,
//             summary
//         };
//         saveData(formData);
//     }, [periodHeaders, meta, studentPhoto, data, periodInfo, summary]);

//     const changeHeader = (k, v) => setPeriodHeaders(p => ({ ...p, [k]: v }));
//     const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));

//     // AJOUT: Fonction pour gérer l'upload de photo
//     const handlePhotoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Vérifier la taille du fichier (max 2MB)
//             if (file.size > 2 * 1024 * 1024) {
//                 alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 2MB.");
//                 return;
//             }

//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setStudentPhoto(e.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // AJOUT: Fonction pour supprimer la photo
//     const handleRemovePhoto = () => {
//         setStudentPhoto(null);
//     };

//     const changeNote = (skillKey, evalLabel, monthKey, value) => {
//         setData(prev => ({
//             ...prev,
//             [skillKey]: {
//                 ...prev[skillKey],
//                 evals: {
//                     ...prev[skillKey].evals,
//                     [evalLabel]: { ...prev[skillKey].evals[evalLabel], [monthKey]: value ? Number(value) : "" }
//                 }
//             }
//         }));
//     };

//     const changeGroupApp = (skillKey, value) => {
//         setData(prev => ({ ...prev, [skillKey]: { ...prev[skillKey], appreciation: value } }));
//     };

//     const changePeriodInfo = (k, v) => setPeriodInfo(p => ({ ...p, [k]: v }));

//     const changeSummary = (k, v) => setSummary(s => ({ ...s, [k]: v }));

//     // Nouveaux calculs selon vos spécifications
//     const totals = useMemo(() => {
//         let sumNotes1 = 0, sumNotes2 = 0, sumNotes3 = 0;
//         let sumSCL1 = 0, sumSCL2 = 0, sumSCL3 = 0;

//         SKILLS_TEMPLATE.forEach(skill => {
//             const skillData = data[skill.key];
//             skill.evaluations.forEach(ev => {
//                 const evalData = skillData.evals[ev];

//                 if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
//                     sumNotes1 += Number(evalData.m1);
//                     sumSCL1 += skill.sclValues[ev];
//                 }

//                 if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
//                     sumNotes2 += Number(evalData.m2);
//                     sumSCL2 += skill.sclValues[ev];
//                 }

//                 if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
//                     sumNotes3 += Number(evalData.m3);
//                     sumSCL3 += skill.sclValues[ev];
//                 }
//             });
//         });

//         return {
//             t1: `${sumNotes1}/${sumSCL1}`,
//             t2: `${sumNotes2}/${sumSCL2}`,
//             t3: `${sumNotes3}/${sumSCL3}`,
//             raw: { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 }
//         };
//     }, [data]);

//     // Nouveaux calculs des averages selon vos spécifications
//     const averages = useMemo(() => {
//         const { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 } = totals.raw;

//         const a1 = sumSCL1 > 0 ? Math.round((sumNotes1 / sumSCL1) * 20 * 100) / 100 : 0;
//         const a2 = sumSCL2 > 0 ? Math.round((sumNotes2 / sumSCL2) * 20 * 100) / 100 : 0;
//         const a3 = sumSCL3 > 0 ? Math.round((sumNotes3 / sumSCL3) * 20 * 100) / 100 : 0;

//         return {
//             a1: sumSCL1 > 0 ? `${a1}/20` : "0/20",
//             a2: sumSCL2 > 0 ? `${a2}/20` : "0/20",
//             a3: sumSCL3 > 0 ? `${a3}/20` : "0/20",
//             raw: { a1, a2, a3 }
//         };
//     }, [totals]);

//     // calcul overall average 
//     const overallAvg = useMemo(() => {
//         const { a1, a2, a3 } = averages.raw;
//         const average = Math.round(((a1 + a2 + a3) / 3) * 100) / 100;
//         return `${average}/20`;
//     }, [averages]);

//     const handlePreview = () => {
//         const payload = {
//             meta,
//             studentPhoto, // AJOUT: Inclure la photo dans le payload
//             periodHeaders,
//             data,
//             totals,
//             averages,
//             periodInfo,
//             overallAvg,
//             summary
//         };
//         saveData(payload);
//         navigate("/preview", { state: payload });
//     };

//     const handleReset = () => {
//         if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
//             clearSavedData();
//             window.location.reload();
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//             {/* Header */}
//             <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//                 <div
//                     className="
//       flex flex-col items-center text-gray-600 text-xs print:text-xs
//       md:flex-row md:justify-between md:items-start
//     "
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
//                             BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//                         </div>
//                         <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//                             SCHOOL REPORT
//                         </div>
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
//                 {/* MODIFICATION: Photo et informations côte à côte */}
//                 <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
//                     {/* Zone photo à gauche */}
//                     <div className="flex-shrink-0 flex flex-col items-center">
//                         <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3 relative bg-gray-50">
//                             {studentPhoto ? (
//                                 <>
//                                     <img
//                                         src={studentPhoto}
//                                         alt="Student"
//                                         className="w-full h-full object-cover rounded-lg"
//                                     />
//                                     <button
//                                         onClick={handleRemovePhoto}
//                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//                                         type="button"
//                                     >
//                                         ×
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="text-center text-gray-400">
//                                     <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     <span className="text-xs">No photo</span>
//                                 </div>
//                             )}
//                         </div>

//                         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             <span>Add Photo</span>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handlePhotoUpload}
//                                 className="hidden"
//                             />
//                         </label>
//                         <p className="text-xs text-gray-500 mt-2 text-center">
//                             Click to select photo
//                         </p>
//                     </div>

//                     {/* Informations élève à droite */}
//                     <div className="flex-1">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                             <input className="border px-3 py-2 rounded" placeholder="Full name" value={meta.studentName} onChange={(e) => changeMeta("studentName", e.target.value)} />
//                             <select className="border px-3 py-2 rounded" value={meta.sex} onChange={e => changeMeta("sex", e.target.value)}>
//                                 <option value="">Sex</option><option>Male</option><option>Female</option>
//                             </select>
//                             <select className="border px-3 py-2 rounded" value={meta.className} onChange={e => changeMeta("className", e.target.value)}>
//                                 <option value="">Class</option>
//                                 <option>SIL</option><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option>
//                                 <option>Class 1</option><option>Class 2</option><option>Class 3</option><option>Class 4</option><option>Class 5</option><option>Class 6</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
//                                 <option value="">Level / Niveau</option>
//                                 <option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option><option>Level 5</option><option>Level 6</option>
//                                 <option>Niveau 1</option><option>Niveau 2</option><option>Niveau 3</option><option>Niveau 4</option><option>Niveau 5</option><option>Niveau 6</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
//                                 <option value="">Term / Trimestre</option>
//                                 <option>Term 1</option><option>Term 2</option><option>Term 3</option><option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.year} onChange={e => changeMeta("year", e.target.value)}>
//                                 <option value="">Academic Year</option>
//                                 {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
//                             </select>

//                             <input className="border px-3 py-2 rounded md:col-span-3" placeholder="Teacher" value={meta.teacher} onChange={e => changeMeta("teacher", e.target.value)} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* debut du tableau*/}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border p-2 w-36">Skills</th>
//                                 <th className="border p-2 w-96">Description</th>
//                                 <th className="border p-2 text-center w-20">Evaluation</th>
//                                 <th className="border p-2 text-center w-14">SCl</th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-28">Appreciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {SKILLS_TEMPLATE.map(skill => {
//                                 const state = data[skill.key];
//                                 return (
//                                     <React.Fragment key={skill.key}>
//                                         {skill.evaluations.map((ev, i) => (
//                                             <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
//                                                         <div className="text-sm">{skill.title}</div>
//                                                     </td>
//                                                 )}
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                                         <div className="text-xs text-gray-600">{skill.description}</div>
//                                                     </td>
//                                                 )}

//                                                 <td className="border p-2 text-center align-top">{ev}</td>

//                                                 {/* SCl: afficher la valeur SCl correspondante */}
//                                                 <td className="border p-2 text-center align-top">{skill.sclValues[ev]}</td>

//                                                 {/* month selects */}
//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m1 || ""} onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m2 || ""} onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m3 || ""} onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                                         <select className="w-full text-sm p-1" value={state.appreciation || ""} onChange={(e) => changeGroupApp(skill.key, e.target.value)}>
//                                                             <option value="">-</option>
//                                                             {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                                         </select>
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

//                 {/* Appreciation Legend + Periods */}
//                 <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Appreciation Legend */}
//                     <div className="border rounded p-4 text-xs">
//                         <div className="font-semibold mb-2">Appreciation Legend</div>
//                         <ul className="list-disc ml-5">
//                             <li><strong>Acquired</strong> — The student has mastered the skill.</li>
//                             <li><strong>In the process of acquire</strong> — Progressing but not yet mastered.</li>
//                             <li><strong>Expert</strong> — Performance above expectations.</li>
//                             <li><strong>Not acquired</strong> — Skill not yet acquired.</li>
//                         </ul>
//                     </div>

//                     {/* Periods */}
//                     <div className="border rounded p-4 text-sm">
//                         <div className="font-semibold mb-2">Periods</div>

//                         <div className="grid grid-cols-3 gap-2 text-xs mb-3">
//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>

//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>

//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Totals (auto) - Nouveau format */}
//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t3}</div>
//                             </div>
//                         </div>

//                         {/* Average per month (auto, on 20) - Nouveau format */}
//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a3}</div>
//                             </div>
//                         </div>

//                         {/* Appreciation per month (A / NS / A+) */}
//                         <div className="grid grid-cols-3 gap-2 text-xs">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>

//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>

//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Summary + Signatures - COMPACT VERSION - CORRIGÉ */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                     {/* Summary of Work - Compact - CORRIGÉ */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Summary</div>

//                         <div className="space-y-3">
//                             <div className="text-center">
//                                 <div className="text-xs text-gray-600 mb-1">Overall Average</div>
//                                 <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Appreciation</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.overallAppreciation}
//                                     onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
//                                 >
//                                     <option value="">- Select -</option>
//                                     <option>Not acquired</option>
//                                     <option>In the process</option>
//                                     <option>Acquired</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Position</div>
//                                 <input
//                                     className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.position}
//                                     onChange={(e) => changeSummary("position", e.target.value)}
//                                     placeholder="Ex: 5ème/30"
//                                 />
//                             </div>

//                             <div>
//                                 <div className="text-xs font-medium mb-1">Decision</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.decision}
//                                     onChange={(e) => changeSummary("decision", e.target.value)}
//                                 >
//                                     <option value="">- Select -</option>
//                                     <option>Has succeeded</option>
//                                     <option>Has failed</option>
//                                     <option>Admis</option>
//                                     <option>Ajourné</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Teacher's Visa - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Teacher's Visa</div>
//                     </div>

//                     {/* Headmaster's Visa - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Headmaster's Visa</div>
//                     </div>

//                     {/* Parent's Visa - Compact */}
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Parent's Visa</div>
//                     </div>
//                 </div>

//                 {/* Contact Information - Below the signatures */}
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

//                 {/* actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
//                     {/* Bouton Back - toujours aligné à gauche */}
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 border rounded text-xs sm:text-sm order-1 sm:order-none"
//                     >
//                         Back
//                     </button>

//                     {/* Groupe de boutons de droite */}
//                     <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto order-2 sm:order-none">
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
































// import React, { useMemo, useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => `Month-${i + 1}`);
// const NOTE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);
// const APPRECIATIONS = ["Not acquired", "In the process of acquire", "Expert", "Acquired"];
// const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

// const SKILLS_TEMPLATE = [
//     {
//         key: "1A",
//         title: "1A- Communicate in English",
//         description: "Listening - speaking - writing - reading",
//         sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//         evaluations: ["Attitude", "Oral", "Written"]
//     },
//     {
//         key: "1B",
//         title: "1B- Communicate in French",
//         description: "Compréhension orale - lecture - production écrite - grammar - conjugation - vocabulary",
//         sclValues: { Attitude: 5, Oral: 20, Written: 15 },
//         evaluations: ["Attitude", "Oral", "Written"]
//     },
//     {
//         key: "1C",
//         title: "1C- Communicate in One National Language",
//         description: "Customs - traditions - mode of life - interpretation of phenomena",
//         sclValues: { Oral: 15, Practical: 5 },
//         evaluations: ["Oral", "Practical"]
//     },
//     {
//         key: "2A",
//         title: "2A- Use basic Notions in Mathematics",
//         description: "Sets and logic - number and numeration - measurement - graphs and statistics - geometry",
//         sclValues: { Attitude: 5, Oral: 10, Practical:15, Written:30 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "2B",
//         title: "2B- Use basic Notions in science and technology",
//         description: "Health and environmental education - technology and engineering",
//         sclValues: { Attitude: 5, Oral:10, Practical:15, Written:20 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "3A",
//         title: "3A- Practise Social Value",
//         description: "History and geography",
//         sclValues: { Attitude:10, Oral: 6, Practical:2, Written: 2 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "3B",
//         title: "3B- Practise Citizenship values",
//         description: "Civics - human right - moral education",
//         sclValues: { Attitude: 10, Oral:10, Practical:5, Written: 5 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "4A",
//         title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies",
//         description: "Needles work - house craft - laundry and food nutrition",
//         sclValues: { Attitude:3, Oral:2, Practical:6, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "4B",
//         title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship",
//         description: "Agricultural tool - farming and gardening - livestock farming",
//         sclValues: { Attitude:3, Oral: 2, Practical: 6, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "5",
//         title: "5- Use Basic Concepts and Tools of Information and Communication Technologies",
//         description: "The computer and ICT tools - Internet and communication ethics",
//         sclValues: { Attitude: 3, Oral:3, Practical: 10, Written:4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "6A",
//         title: "6-A Practise Physical and Sports Activities",
//         description: "Movement - jumping - team sports - gymnastics - relay - sprint",
//         sclValues: { Attitude: 3, Oral:3, Practical: 10, Written: 4 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "6B",
//         title: "6-B Practice Physical sport",
//         description: "For physically challenged",
//         sclValues: { Attitude:8, Oral:12, Practical:0, Written:0 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     },
//     {
//         key: "6C",
//         title: "6-C Practice Artistic Activities",
//         description: "Visual arts - performing arts",
//         sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 },
//         evaluations: ["Attitude", "Oral", "Practical", "Written"]
//     }
// ];

// // URL DE BASE POUR LES REQUÊTES API
// const API_BASE_URL = 'http://localhost:3000';

// export default function BulletinForm() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { studentId: paramStudentId } = useParams();
    
//     // Log de débogage pour identifier le problème
//     console.log("🔍 DEBUG BulletinForm:", {
//         paramStudentId,
//         locationState: location.state,
//         url: location.pathname,
//         apiBaseUrl: API_BASE_URL
//     });

//     // RÉCUPÉRATION DE L'ID ÉLÈVE
//     const [studentId, setStudentId] = useState(() => {
//         // Essayer d'abord le paramètre d'URL
//         if (paramStudentId) {
//             const id = parseInt(paramStudentId);
//             console.log(`✅ ID depuis URL: ${id} (type: ${typeof id})`);
//             return id;
//         }
        
//         // Ensuite l'état de navigation
//         if (location.state?.studentId) {
//             const id = parseInt(location.state.studentId);
//             console.log(`✅ ID depuis state: ${id} (type: ${typeof id})`);
//             return id;
//         }
        
//         // Enfin le localStorage
//         const saved = localStorage.getItem('bulletinFormData');
//         if (saved) {
//             try {
//                 const data = JSON.parse(saved);
//                 if (data.meta?.student_id) {
//                     const id = parseInt(data.meta.student_id);
//                     console.log(`✅ ID depuis localStorage: ${id} (type: ${typeof id})`);
//                     return id;
//                 }
//             } catch (e) {
//                 console.error('Erreur lecture localStorage:', e);
//             }
//         }
        
//         console.warn("⚠️ Aucun ID d'élève trouvé");
//         return null;
//     });

//     const [studentInfo, setStudentInfo] = useState(null);
//     const [saving, setSaving] = useState(false);
//     const [bulletinId, setBulletinId] = useState(null);
//     const [isDraftSaved, setIsDraftSaved] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);

//     // Charger les infos de l'élève si ID disponible
//     useEffect(() => {
//         if (studentId) {
//             console.log(`🔄 Chargement info élève ID: ${studentId}`);
//             loadStudentInfo(studentId);
//             loadStudentBulletins(studentId);
//         } else {
//             console.warn("❌ Pas d'ID élève pour charger les infos");
//         }
//     }, [studentId]);

//     const loadStudentInfo = async (id) => {
//         try {
//             console.log(`📡 Requête API élève pour ID: ${id}`);
//             const url = `${API_BASE_URL}/api/student/${id}`;
//             console.log(`📡 URL: ${url}`);
            
//             const response = await fetch(url);
//             console.log(`📡 Réponse status: ${response.status}`);
            
//             if (response.ok) {
//                 const student = await response.json();
//                 console.log('✅ Info élève chargée:', student);
//                 setStudentInfo(student);
//                 setMeta(prev => ({
//                     ...prev,
//                     studentName: student.nom_complet || student.full_name || "",
//                     sex: student.sex || student.sexe || "",
//                     className: student.class_name || "",
//                     student_id: student.id
//                 }));
//             } else {
//                 const errorText = await response.text();
//                 console.error(`❌ Erreur API élève: ${response.status}`, errorText.substring(0, 200));
//             }
//         } catch (error) {
//             console.error('❌ Erreur chargement info élève:', error);
//         }
//     };

//     // const loadStudentBulletins = async (id) => {
//     //     try {
//     //         const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
//     //         console.log(`📡 Requête bulletins: ${url}`);
            
//     //         const response = await fetch(url);
//     //         if (response.ok) {
//     //             const bulletins = await response.json();
//     //             console.log(`✅ ${bulletins.length} bulletins trouvés`);
                
//     //             const anglophoneBulletin = bulletins.find(b => b.bulletin_type === 'anglophone');
//     //             if (anglophoneBulletin) {
//     //                 console.log('✅ Bulletin existant trouvé:', anglophoneBulletin);
//     //                 setBulletinId(anglophoneBulletin.id);
//     //                 setIsEditing(true);
                    
//     //                 // Charger les données du bulletin
//     //                 const savedData = JSON.parse(anglophoneBulletin.data_json);
//     //                 if (savedData.periodHeaders) setPeriodHeaders(savedData.periodHeaders);
//     //                 if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
//     //                 if (savedData.data) setData(savedData.data);
//     //                 if (savedData.periodInfo) setPeriodInfo(savedData.periodInfo);
//     //                 if (savedData.summary) setSummary(savedData.summary);
//     //                 if (savedData.studentPhoto) setStudentPhoto(savedData.studentPhoto);
//     //             } else {
//     //                 console.log('ℹ️ Aucun bulletin anglophone existant');
//     //             }
//     //         } else {
//     //             console.error(`❌ Erreur chargement bulletins: ${response.status}`);
//     //         }
//     //     } catch (error) {
//     //         console.error('❌ Erreur chargement bulletins:', error);
//     //     }
//     // };









//       const loadStudentBulletins = async (id) => {
//     try {
//         const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
//         console.log(`📡 Requête bulletins: ${url}`);
        
//         const response = await fetch(url);
//         if (response.ok) {
//             const bulletins = await response.json();
//             console.log(`✅ ${bulletins.length} bulletins trouvés`);
            
//             // Déterminer le trimestre actuel
//             const currentTrimester = location.state?.trimestre || meta.term;
            
//             // Trouver le bulletin pour ce trimestre
//             const currentBulletin = bulletins.find(b => 
//                 b.bulletin_type === 'anglophone' && 
//                 b.trimester === currentTrimester
//             );
            
//             if (currentBulletin) {
//                 console.log('✅ Bulletin existant trouvé:', currentBulletin);
//                 setBulletinId(currentBulletin.id);
//                 setIsEditing(true);
                
//                 // Charger les données du bulletin
//                 const savedData = JSON.parse(currentBulletin.data_json);
//                 if (savedData.periodHeaders) setPeriodHeaders(savedData.periodHeaders);
//                 if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
//                 if (savedData.data) setData(savedData.data);
//                 if (savedData.periodInfo) setPeriodInfo(savedData.periodInfo);
//                 if (savedData.summary) setSummary(savedData.summary);
//                 if (savedData.studentPhoto) setStudentPhoto(savedData.studentPhoto);
//             } else {
//                 console.log('ℹ️ Aucun bulletin anglophone existant pour ce trimestre');
//             }
//         } else {
//             console.error(`❌ Erreur chargement bulletins: ${response.status}`);
//         }
//     } catch (error) {
//         console.error('❌ Erreur chargement bulletins:', error);
//     }
// };


















//     const loadSavedData = () => {
//         try {
//             const saved = localStorage.getItem('bulletinFormData');
//             if (saved) {
//                 console.log('📁 Données chargées depuis localStorage');
//                 return JSON.parse(saved);
//             }
//         } catch (error) {
//             console.error('❌ Erreur chargement données:', error);
//         }
//         return null;
//     };

//     const initializeData = () => {
//         const root = {};
//         SKILLS_TEMPLATE.forEach(s => {
//             const evals = {};
//             s.evaluations.forEach(ev => (evals[ev] = { m1: "", m2: "", m3: "" }));
//             root[s.key] = { appreciation: "", evals };
//         });
//         return root;
//     };

//     // États du formulaire
//     const [periodHeaders, setPeriodHeaders] = useState({
//         h1: MONTH_OPTIONS[0], 
//         h2: MONTH_OPTIONS[1], 
//         h3: MONTH_OPTIONS[2]
//     });

//     const [meta, setMeta] = useState({
//         studentName: "",
//         sex: "",
//         className: "",
//         level: "",
//         term: "",
//         year: "",
//         teacher: "",
//         student_id: studentId || null
//     });

//     const [studentPhoto, setStudentPhoto] = useState(null);
//     const [data, setData] = useState(() => initializeData());
//     const [periodInfo, setPeriodInfo] = useState({
//         pos1: "", pos2: "", pos3: "",
//         app1: "", app2: "", app3: ""
//     });
//     const [summary, setSummary] = useState({
//         overallAppreciation: "",
//         position: "",
//         decision: ""
//     });

//     // Sauvegarde automatique dans localStorage
//     const saveData = (data) => {
//         try {
//             localStorage.setItem('bulletinFormData', JSON.stringify(data));
//         } catch (error) {
//             console.error('❌ Erreur sauvegarde localStorage:', error);
//         }
//     };

//     useEffect(() => {
//         const formData = {
//             periodHeaders,
//             meta,
//             studentPhoto,
//             data,
//             periodInfo,
//             summary
//         };
//         saveData(formData);
//     }, [periodHeaders, meta, studentPhoto, data, periodInfo, summary]);

//     // FONCTION PRINCIPALE DE SAUVEGARDE
//     const saveToDatabase = async (isDraft = true) => {
//         try {
//             setSaving(true);
            
//             // VÉRIFICATION CRITIQUE DU studentId
//             console.log(`🔍 Vérification studentId: ${studentId} (type: ${typeof studentId})`);
            
//             if (!studentId) {
//                 console.error("❌ ERREUR CRITIQUE: studentId est null/undefined");
//                 alert("❌ ERREUR : Aucun élève sélectionné.\n\nVeuillez retourner à la liste des élèves et cliquer sur 'Créer bulletin'.");
//                 setSaving(false);
//                 return null;
//             }

//             // Calculs
//             const totals = calculateTotals();
//             const averages = calculateAverages(totals);
//             const overallAvg = calculateOverallAverage(averages);

//             // Préparation des données
//             const formData = {
//                 periodHeaders,
//                 meta: { ...meta, student_id: studentId },
//                 studentPhoto,
//                 data,
//                 periodInfo,
//                 summary,
//                 totals,
//                 averages,
//                 overallAvg,
//                 isDraft
//             };

//             // Préparation du payload pour l'API
//             // const payload = {
//             //     student_id: studentId,
//             //     bulletin_type: 'anglophone',
//             //     trimester: meta.term || 'Term 1',
//             //     academic_year: meta.year || getCurrentAcademicYear(),
//             //     nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
//             //     classe: meta.className || studentInfo?.class_name || "",
//             //     enseignant: meta.teacher || "",
//             //     appreciation: summary.overallAppreciation || "",
//             //     rang_position: summary.position || "",
//             //     decision: summary.decision || "",
//             //     data_json: JSON.stringify(formData),
//             //     is_draft: isDraft ? 1 : 0
//             // };


//             // Dans la fonction saveToDatabase, modifiez le payload :
// const payload = {
//     student_id: studentId,
//     bulletin_type: 'anglophone',
//     trimester: location.state?.trimestre || meta.term || 'Term 1', // Prendre le trimestre du state
//     academic_year: meta.year || getCurrentAcademicYear(),
//     nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
//     classe: meta.className || studentInfo?.class_name || "",
//     enseignant: meta.teacher || "",
//     appreciation: summary.overallAppreciation || "",
//     rang_position: summary.position || "",
//     decision: summary.decision || "",
//     data_json: JSON.stringify(formData),
//     is_draft: isDraft ? 1 : 0
// };





//             console.log('📤 Payload envoyé à l\'API:', payload);
//             console.log('📤 Type student_id:', typeof payload.student_id);
//             console.log('📤 URL Base:', API_BASE_URL);
            
//             // Déterminer l'URL et la méthode
//             let url, method;
//             if (bulletinId) {
//                 url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
//                 method = 'PUT';
//                 console.log(`🔄 Mise à jour bulletin ID: ${bulletinId} - URL: ${url}`);
//             } else {
//                 url = `${API_BASE_URL}/api/bulletin/anglophone`;
//                 method = 'POST';
//                 console.log('🆕 Création nouveau bulletin - URL:', url);
//             }

//             // Envoi à l'API
//             console.log(`📤 Envoi ${method} à: ${url}`);
//             const response = await fetch(url, {
//                 method,
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });

//             const responseText = await response.text();
//             console.log(`📥 Réponse API (${response.status}):`, responseText.substring(0, 500));

//             if (!response.ok) {
//                 throw new Error(`Erreur API ${response.status}: ${responseText.substring(0, 200)}`);
//             }

//             const result = JSON.parse(responseText);
//             console.log('✅ Réponse API:', result);

//             if (!bulletinId && result.id) {
//                 setBulletinId(result.id);
//                 setIsEditing(true);
//             }

//             if (isDraft) {
//                 setIsDraftSaved(true);
//                 alert('✅ Brouillon sauvegardé avec succès!');
//             } else {
//                 alert('✅ Bulletin finalisé avec succès!');
//             }

//             return result;

//         } catch (error) {
//             console.error('❌ Erreur sauvegarde:', error);
//             alert(`❌ Erreur lors de la sauvegarde: ${error.message}`);
//             return null;
//         } finally {
//             setSaving(false);
//         }
//     };

//     const getCurrentAcademicYear = () => {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = now.getMonth();
//         if (month >= 8) {
//             return `${year}-${year + 1}`;
//         } else {
//             return `${year - 1}-${year}`;
//         }
//     };

//     const calculateTotals = () => {
//         let sumNotes1 = 0, sumNotes2 = 0, sumNotes3 = 0;
//         let sumSCL1 = 0, sumSCL2 = 0, sumSCL3 = 0;

//         SKILLS_TEMPLATE.forEach(skill => {
//             const skillData = data[skill.key];
//             skill.evaluations.forEach(ev => {
//                 const evalData = skillData.evals[ev];

//                 if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
//                     sumNotes1 += Number(evalData.m1);
//                     sumSCL1 += skill.sclValues[ev];
//                 }

//                 if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
//                     sumNotes2 += Number(evalData.m2);
//                     sumSCL2 += skill.sclValues[ev];
//                 }

//                 if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
//                     sumNotes3 += Number(evalData.m3);
//                     sumSCL3 += skill.sclValues[ev];
//                 }
//             });
//         });

//         return {
//             t1: `${sumNotes1}/${sumSCL1}`,
//             t2: `${sumNotes2}/${sumSCL2}`,
//             t3: `${sumNotes3}/${sumSCL3}`,
//             raw: { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 }
//         };
//     };

//     const calculateAverages = (totals) => {
//         const { sumNotes1, sumSCL1, sumNotes2, sumSCL2, sumNotes3, sumSCL3 } = totals.raw;

//         const a1 = sumSCL1 > 0 ? Math.round((sumNotes1 / sumSCL1) * 20 * 100) / 100 : 0;
//         const a2 = sumSCL2 > 0 ? Math.round((sumNotes2 / sumSCL2) * 20 * 100) / 100 : 0;
//         const a3 = sumSCL3 > 0 ? Math.round((sumNotes3 / sumSCL3) * 20 * 100) / 100 : 0;

//         return {
//             a1: sumSCL1 > 0 ? `${a1}/20` : "0/20",
//             a2: sumSCL2 > 0 ? `${a2}/20` : "0/20",
//             a3: sumSCL3 > 0 ? `${a3}/20` : "0/20",
//             raw: { a1, a2, a3 }
//         };
//     };

//     const calculateOverallAverage = (averages) => {
//         const { a1, a2, a3 } = averages.raw;
//         const average = Math.round(((a1 + a2 + a3) / 3) * 100) / 100;
//         return `${average}/20`;
//     };

//     // Utilisation de useMemo pour éviter les recalculs inutiles
//     const totals = useMemo(() => calculateTotals(), [data]);
//     const averages = useMemo(() => calculateAverages(totals), [totals]);
//     const overallAvg = useMemo(() => calculateOverallAverage(averages), [averages]);

//     // Gestionnaires d'événements
//     const changeHeader = (k, v) => setPeriodHeaders(p => ({ ...p, [k]: v }));
//     const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
    
//     const handlePhotoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             if (file.size > 2 * 1024 * 1024) {
//                 alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 2MB.");
//                 return;
//             }
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setStudentPhoto(e.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
    
//     const handleRemovePhoto = () => setStudentPhoto(null);
    
//     const changeNote = (skillKey, evalLabel, monthKey, value) => {
//         setData(prev => ({
//             ...prev,
//             [skillKey]: {
//                 ...prev[skillKey],
//                 evals: {
//                     ...prev[skillKey].evals,
//                     [evalLabel]: { ...prev[skillKey].evals[evalLabel], [monthKey]: value ? Number(value) : "" }
//                 }
//             }
//         }));
//     };
    
//     const changeGroupApp = (skillKey, value) => {
//         setData(prev => ({ ...prev, [skillKey]: { ...prev[skillKey], appreciation: value } }));
//     };
    
//     const changePeriodInfo = (k, v) => setPeriodInfo(p => ({ ...p, [k]: v }));
//     const changeSummary = (k, v) => setSummary(s => ({ ...s, [k]: v }));

//     const handleSaveDraft = async () => {
//         console.log('💾 Sauvegarde brouillon...');
//         const result = await saveToDatabase(true);
//         if (result) {
//             console.log('✅ Brouillon sauvegardé');
//         }
//     };

//     const handleFinalize = async () => {
//         console.log('✅ Finalisation et impression...');
//         const result = await saveToDatabase(false);
//         if (result) {
//             handlePrint();
//         }
//     };

//     const handlePrint = () => {
//         console.log('🖨️ Préparation impression...');
        
//         // Préparer les données pour impression
//         const printData = {
//             meta: { ...meta, student_id: studentId },
//             studentPhoto,
//             periodHeaders,
//             data,
//             totals,
//             averages,
//             periodInfo,
//             overallAvg,
//             summary
//         };
        
//         // Sauvegarder pour la page d'impression
//         localStorage.setItem('printBulletinData', JSON.stringify(printData));
        
//         // Ouvrir la page d'impression
//         window.open('/print-bulletin', '_blank');
//     };

//     const handlePrintOnly = () => {
//         console.log('🖨️ Impression uniquement...');
//         handlePrint();
//     };

//     const handleReset = () => {
//         if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
//             localStorage.removeItem('bulletinFormData');
//             setPeriodHeaders({ h1: MONTH_OPTIONS[0], h2: MONTH_OPTIONS[1], h3: MONTH_OPTIONS[2] });
//             setMeta({
//                 studentName: "",
//                 sex: "",
//                 className: "",
//                 level: "",
//                 term: "",
//                 year: "",
//                 teacher: "",
//                 student_id: studentId || null
//             });
//             setStudentPhoto(null);
//             setData(initializeData());
//             setPeriodInfo({ pos1: "", pos2: "", pos3: "", app1: "", app2: "", app3: "" });
//             setSummary({ overallAppreciation: "", position: "", decision: "" });
//             setBulletinId(null);
//             setIsEditing(false);
//             setIsDraftSaved(false);
//         }
//     };

//     const renderStudentInfo = () => {
//         if (studentInfo) {
//             return (
//                 <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                     <div className="flex items-center gap-2">
//                         <span className="text-blue-600">👤</span>
//                         <span className="text-sm text-blue-700">
//                             Élève: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
//                             {studentInfo.class_name && ` - Classe: ${studentInfo.class_name}`}
//                             {studentInfo.sex && ` - Sexe: ${studentInfo.sex}`}
//                         </span>
//                     </div>
//                     {studentId && (
//                         <div className="mt-2 text-xs text-gray-600">
//                             ID: <code className="bg-gray-100 px-2 py-1 rounded">{studentId}</code>
//                         </div>
//                     )}
//                 </div>
//             );
//         } else if (!studentId) {
//             return (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <div className="flex items-center gap-2">
//                         <span className="text-red-600">❌</span>
//                         <span className="text-sm text-red-700 font-semibold">
//                             ERREUR : Aucun élève sélectionné !
//                         </span>
//                     </div>
//                     <div className="mt-2 text-xs text-red-600">
//                         Vous devez d'abord sélectionner un élève depuis la liste des élèves.
//                     </div>
//                     <div className="mt-3">
//                         <button
//                             onClick={() => navigate("/dashboard")}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
//                         >
//                             Retour au tableau de bord
//                         </button>
//                     </div>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const renderSaveStatus = () => {
//         if (isDraftSaved) {
//             return (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="flex items-center gap-2">
//                         <span className="text-green-600">✅</span>
//                         <span className="text-sm text-green-700">
//                             Brouillon sauvegardé
//                         </span>
//                     </div>
//                 </div>
//             );
//         }
        
//         if (bulletinId) {
//             return (
//                 <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                     <div className="flex items-center gap-2">
//                         <span className="text-blue-600">📁</span>
//                         <span className="text-sm text-blue-700">
//                             Bulletin chargé (ID: {bulletinId})
//                         </span>
//                     </div>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//             {/* Header */}
//             <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//                 <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
//                     <div className="text-left mb-2 md:mb-0 md:w-1/3">
//                         <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
//                         <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
//                         <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
//                     </div>

//                     <div className="text-center md:flex-1 md:mx-2">
//                         <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
//                             BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//                         </div>
//                         <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//                             SCHOOL REPORT
//                         </div>
//                     </div>

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
//                 {/* Informations élève */}
//                 {renderStudentInfo()}
//                 {renderSaveStatus()}

//                 <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
//                     {/* Photo */}
//                     <div className="flex-shrink-0 flex flex-col items-center">
//                         <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3 relative bg-gray-50">
//                             {studentPhoto ? (
//                                 <>
//                                     <img
//                                         src={studentPhoto}
//                                         alt="Student"
//                                         className="w-full h-full object-cover rounded-lg"
//                                     />
//                                     <button
//                                         onClick={handleRemovePhoto}
//                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//                                         type="button"
//                                     >
//                                         ×
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="text-center text-gray-400">
//                                     <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     <span className="text-xs">No photo</span>
//                                 </div>
//                             )}
//                         </div>

//                         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             <span>Add Photo</span>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handlePhotoUpload}
//                                 className="hidden"
//                             />
//                         </label>
//                         <p className="text-xs text-gray-500 mt-2 text-center">
//                             Click to select photo
//                         </p>
//                     </div>

//                     {/* Informations élève */}
//                     <div className="flex-1">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                             <input 
//                                 className="border px-3 py-2 rounded" 
//                                 placeholder="Full name" 
//                                 value={meta.studentName} 
//                                 onChange={(e) => changeMeta("studentName", e.target.value)} 
//                                 disabled={!!studentInfo}
//                             />
//                             <select 
//                                 className="border px-3 py-2 rounded" 
//                                 value={meta.sex} 
//                                 onChange={e => changeMeta("sex", e.target.value)}
//                                 disabled={!!studentInfo}
//                             >
//                                 <option value="">Sex</option>
//                                 <option>Male</option>
//                                 <option>Female</option>
//                             </select>
//                             <select 
//                                 className="border px-3 py-2 rounded" 
//                                 value={meta.className} 
//                                 onChange={e => changeMeta("className", e.target.value)}
//                                 disabled={!!studentInfo}
//                             >
//                                 <option value="">Class</option>
//                                 <option>SIL</option><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option>
//                                 <option>Class 1</option><option>Class 2</option><option>Class 3</option><option>Class 4</option><option>Class 5</option><option>Class 6</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
//                                 <option value="">Level / Niveau</option>
//                                 <option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option><option>Level 5</option><option>Level 6</option>
//                                 <option>Niveau 1</option><option>Niveau 2</option><option>Niveau 3</option><option>Niveau 4</option><option>Niveau 5</option><option>Niveau 6</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
//                                 <option value="">Term / Trimestre</option>
//                                 <option>Term 1</option><option>Term 2</option><option>Term 3</option><option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
//                             </select>

//                             <select className="border px-3 py-2 rounded" value={meta.year} onChange={e => changeMeta("year", e.target.value)}>
//                                 <option value="">Academic Year</option>
//                                 {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
//                             </select>

//                             <input className="border px-3 py-2 rounded md:col-span-3" placeholder="Teacher" value={meta.teacher} onChange={e => changeMeta("teacher", e.target.value)} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tableau */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border p-2 w-36">Skills</th>
//                                 <th className="border p-2 w-96">Description</th>
//                                 <th className="border p-2 text-center w-20">Evaluation</th>
//                                 <th className="border p-2 text-center w-14">SCl</th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-24">
//                                     <select className="text-xs" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
//                                         {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </th>
//                                 <th className="border p-2 text-center w-28">Appreciation</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {SKILLS_TEMPLATE.map(skill => {
//                                 const state = data[skill.key];
//                                 return (
//                                     <React.Fragment key={skill.key}>
//                                         {skill.evaluations.map((ev, i) => (
//                                             <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
//                                                         <div className="text-sm">{skill.title}</div>
//                                                     </td>
//                                                 )}
//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                                         <div className="text-xs text-gray-600">{skill.description}</div>
//                                                     </td>
//                                                 )}

//                                                 <td className="border p-2 text-center align-top">{ev}</td>
//                                                 <td className="border p-2 text-center align-top">{skill.sclValues[ev]}</td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m1 || ""} onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m2 || ""} onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 <td className="border p-1 text-center">
//                                                     <select className="w-full text-xs p-1" value={state.evals[ev].m3 || ""} onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}>
//                                                         <option value="">-</option>
//                                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                                     </select>
//                                                 </td>

//                                                 {i === 0 && (
//                                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                                         <select className="w-full text-sm p-1" value={state.appreciation || ""} onChange={(e) => changeGroupApp(skill.key, e.target.value)}>
//                                                             <option value="">-</option>
//                                                             {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                                         </select>
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

//                 {/* Appreciation Legend + Periods */}
//                 <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div className="border rounded p-4 text-xs">
//                         <div className="font-semibold mb-2">Appreciation Legend</div>
//                         <ul className="list-disc ml-5">
//                             <li><strong>Acquired</strong> — The student has mastered the skill.</li>
//                             <li><strong>In the process of acquire</strong> — Progressing but not yet mastered.</li>
//                             <li><strong>Expert</strong> — Performance above expectations.</li>
//                             <li><strong>Not acquired</strong> — Skill not yet acquired.</li>
//                         </ul>
//                     </div>

//                     <div className="border rounded p-4 text-sm">
//                         <div className="font-semibold mb-2">Periods</div>

//                         <div className="grid grid-cols-3 gap-2 text-xs mb-3">
//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>
//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>
//                             <div>
//                                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
//                                     {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Totals</div>
//                                 <div className="font-semibold mt-1">{totals.t3}</div>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a1}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a2}</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Average (/20)</div>
//                                 <div className="font-semibold mt-1">{averages.a3}</div>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-3 gap-2 text-xs">
//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-gray-600">Appreciation</div>
//                                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
//                                     <option value="">-</option>
//                                     {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Summary + Signatures */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Summary</div>
//                         <div className="space-y-3">
//                             <div className="text-center">
//                                 <div className="text-xs text-gray-600 mb-1">Overall Average</div>
//                                 <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
//                             </div>
//                             <div>
//                                 <div className="text-xs font-medium mb-1">Appreciation</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.overallAppreciation}
//                                     onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
//                                 >
//                                     <option value="">- Select -</option>
//                                     <option>Not acquired</option>
//                                     <option>In the process</option>
//                                     <option>Acquired</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <div className="text-xs font-medium mb-1">Position</div>
//                                 <input
//                                     className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.position}
//                                     onChange={(e) => changeSummary("position", e.target.value)}
//                                     placeholder="Ex: 5ème/30"
//                                 />
//                             </div>
//                             <div>
//                                 <div className="text-xs font-medium mb-1">Decision</div>
//                                 <select
//                                     className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                                     value={summary.decision}
//                                     onChange={(e) => changeSummary("decision", e.target.value)}
//                                 >
//                                     <option value="">- Select -</option>
//                                     <option>Has succeeded</option>
//                                     <option>Has failed</option>
//                                     <option>Admis</option>
//                                     <option>Ajourné</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Teacher's Visa</div>
//                     </div>

//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Headmaster's Visa</div>
//                     </div>

//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//                         <div className="font-bold text-base mb-3 text-center text-gray-800">Parent's Visa</div>
//                     </div>
//                 </div>

//                 {/* Contact */}
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

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
//                     >
//                         ← Back
//                     </button>

//                     <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
//                         <button
//                             onClick={handlePrintOnly}
//                             disabled={!studentId}
//                             className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             🖨️ Print
//                         </button>
                        
//                         <button
//                             onClick={handleReset}
//                             className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
//                         >
//                             Reset
//                         </button>
                        
//                         <button
//                             onClick={handleSaveDraft}
//                             disabled={saving || !studentId}
//                             className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {saving ? 'Saving...' : 'Save Draft'}
//                         </button>
                        
//                         <button
//                             onClick={handleFinalize}
//                             disabled={saving || !studentId}
//                             className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {saving ? 'Saving...' : '✅ Finalize'}
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
const APPRECIATIONS = ["Not acquired", "In the process of acquire", "Expert", "Acquired"];
const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

const SKILLS_TEMPLATE = [
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
        sclValues: { Attitude: 5, Oral: 10, Practical:15, Written:30 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "2B",
        title: "2B- Use basic Notions in science and technology",
        description: "Health and environmental education - technology and engineering",
        sclValues: { Attitude: 5, Oral:10, Practical:15, Written:20 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "3A",
        title: "3A- Practise Social Value",
        description: "History and geography",
        sclValues: { Attitude:10, Oral: 6, Practical:2, Written: 2 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "3B",
        title: "3B- Practise Citizenship values",
        description: "Civics - human right - moral education",
        sclValues: { Attitude: 10, Oral:10, Practical:5, Written: 5 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "4A",
        title: "4A- Demonstrate Autonomy, Spirit of Initiative Creativity and Entrepreneurship in Vocational Studies",
        description: "Needles work - house craft - laundry and food nutrition",
        sclValues: { Attitude:3, Oral:2, Practical:6, Written: 4 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "4B",
        title: "4B- Demonstrate autonomy, Spirit of Initiative Creativity and entrepreneurship",
        description: "Agricultural tool - farming and gardening - livestock farming",
        sclValues: { Attitude:3, Oral: 2, Practical: 6, Written: 4 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "5",
        title: "5- Use Basic Concepts and Tools of Information and Communication Technologies",
        description: "The computer and ICT tools - Internet and communication ethics",
        sclValues: { Attitude: 3, Oral:3, Practical: 10, Written:4 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "6A",
        title: "6-A Practise Physical and Sports Activities",
        description: "Movement - jumping - team sports - gymnastics - relay - sprint",
        sclValues: { Attitude: 3, Oral:3, Practical: 10, Written: 4 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "6B",
        title: "6-B Practice Physical sport",
        description: "For physically challenged",
        sclValues: { Attitude:8, Oral:12, Practical:0, Written:0 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    },
    {
        key: "6C",
        title: "6-C Practice Artistic Activities",
        description: "Visual arts - performing arts",
        sclValues: { Attitude: 4, Oral: 4, Practical: 10, Written: 2 },
        evaluations: ["Attitude", "Oral", "Practical", "Written"]
    }
];

const API_BASE_URL = 'http://localhost:3000';

export default function BulletinForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { studentId: paramStudentId } = useParams();
    
    console.log("🔍 DEBUG BulletinForm:", {
        paramStudentId,
        locationState: location.state,
        url: location.pathname,
        apiBaseUrl: API_BASE_URL
    });

    const [currentTrimester, setCurrentTrimester] = useState(() => {
        if (location.state?.trimestre) {
            console.log(`✅ Trimestre depuis state: ${location.state.trimestre}`);
            return location.state.trimestre;
        }
        
        const saved = localStorage.getItem('bulletinFormData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.meta?.term) {
                    return data.meta.term;
                }
            } catch (e) {
                console.error('Erreur lecture localStorage:', e);
            }
        }
        
        return 'Term 1';
    });

    const [studentId, setStudentId] = useState(() => {
        if (paramStudentId) {
            const id = parseInt(paramStudentId);
            console.log(`✅ ID depuis URL: ${id} (type: ${typeof id})`);
            return id;
        }
        
        if (location.state?.studentId) {
            const id = parseInt(location.state.studentId);
            console.log(`✅ ID depuis state: ${id} (type: ${typeof id})`);
            return id;
        }
        
        const saved = localStorage.getItem('bulletinFormData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.meta?.student_id) {
                    const id = parseInt(data.meta.student_id);
                    console.log(`✅ ID depuis localStorage: ${id} (type: ${typeof id})`);
                    return id;
                }
            } catch (e) {
                console.error('Erreur lecture localStorage:', e);
            }
        }
        
        console.warn("⚠️ Aucun ID d'élève trouvé");
        return null;
    });

    const [studentInfo, setStudentInfo] = useState(null);
    const [saving, setSaving] = useState(false);
    const [bulletinId, setBulletinId] = useState(null);
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (studentId) {
            console.log(`🔄 Chargement info élève ID: ${studentId}`);
            loadStudentInfo(studentId);
            loadStudentBulletins(studentId);
        } else {
            console.warn("❌ Pas d'ID élève pour charger les infos");
        }
    }, [studentId]);

    const loadStudentInfo = async (id) => {
        try {
            console.log(`📡 Requête API élève pour ID: ${id}`);
            const url = `${API_BASE_URL}/api/student/${id}`;
            console.log(`📡 URL: ${url}`);
            
            const response = await fetch(url);
            console.log(`📡 Réponse status: ${response.status}`);
            
            if (response.ok) {
                const student = await response.json();
                console.log('✅ Info élève chargée:', student);
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
                console.error(`❌ Erreur API élève: ${response.status}`, errorText.substring(0, 200));
            }
        } catch (error) {
            console.error('❌ Erreur chargement info élève:', error);
        }
    };








    // const loadStudentBulletins = async (id) => {
    //     try {
    //         const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
    //         console.log(`📡 Requête bulletins: ${url}`);
            
    //         const response = await fetch(url);
    //         if (response.ok) {
    //             const bulletins = await response.json();
    //             console.log(`✅ ${bulletins.length} bulletins trouvés`);
                
    //             const currentTrimesterBulletin = bulletins.find(b => 
    //                 b.bulletin_type === 'anglophone' && 
    //                 (b.trimester === currentTrimester || 
    //                  (currentTrimester === 'Term 1' && b.trimester === 'Trimestre 1') ||
    //                  (currentTrimester === 'Term 2' && b.trimester === 'Trimestre 2') ||
    //                  (currentTrimester === 'Term 3' && b.trimester === 'Trimestre 3'))
    //             );
                
    //             if (currentTrimesterBulletin) {
    //                 console.log('✅ Bulletin existant trouvé:', currentTrimesterBulletin);
    //                 setBulletinId(currentTrimesterBulletin.id);
    //                 setIsEditing(true);
                    
    //                 const savedData = JSON.parse(currentTrimesterBulletin.data_json);
    //                 if (savedData.periodHeaders) setPeriodHeaders(savedData.periodHeaders);
    //                 if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
    //                 if (savedData.data) setData(savedData.data);
    //                 if (savedData.periodInfo) setPeriodInfo(savedData.periodInfo);
    //                 if (savedData.summary) setSummary(savedData.summary);
    //                 if (savedData.studentPhoto) setStudentPhoto(savedData.studentPhoto);
    //             } else {
    //                 console.log(`ℹ️ Aucun bulletin anglophone existant pour ${currentTrimester}`);
    //             }
    //         } else {
    //             console.error(`❌ Erreur chargement bulletins: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error('❌ Erreur chargement bulletins:', error);
    //     }
    // };








const loadStudentBulletins = async (studentId) => {
    try {
        console.log(`📡 Requête bulletins: http://localhost:3000/api/student/${studentId}/bulletins`);
        const response = await fetch(`http://localhost:3000/api/student/${studentId}/bulletins`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const bulletins = await response.json();
        console.log(`✅ ${bulletins.length} bulletins trouvés`);
        
        // Récupère le trimestre depuis location.state
        const currentTrimester = location.state?.trimestre || 'Trimestre 1';
        console.log('📌 Recherche bulletin pour le trimestre:', currentTrimester);
        
        if (bulletins.length > 0) {
            const currentBulletin = bulletins.find(b => 
                b.trimester === currentTrimester
            );
            
            if (currentBulletin) {
                console.log('✅ Bulletin existant trouvé:', currentBulletin);
                
                let bulletinData = currentBulletin.data_json;
                
                if (typeof bulletinData === 'string') {
                    try {
                        bulletinData = JSON.parse(bulletinData);
                        console.log('📦 data_json parsé (était une chaîne)');
                    } catch (e) {
                        console.warn('⚠️ Erreur parsing JSON:', e);
                        bulletinData = {};
                    }
                } else {
                    console.log('📦 data_json déjà parsé (était un objet)');
                }
                
                // Mettre à jour tous les états avec les données chargées
                if (bulletinData.periodHeaders) {
                    setPeriodHeaders(bulletinData.periodHeaders);
                }
                
                if (bulletinData.meta) {
                    setMeta(prev => ({ ...prev, ...bulletinData.meta }));
                }
                
                if (bulletinData.data) {
                    setData(bulletinData.data);
                }
                
                if (bulletinData.periodInfo) {
                    setPeriodInfo(bulletinData.periodInfo);
                }
                
                if (bulletinData.summary) {
                    setSummary(bulletinData.summary);
                }
                
                if (bulletinData.studentPhoto) {
                    setStudentPhoto(bulletinData.studentPhoto);
                }
                
                setBulletinId(currentBulletin.id);
                console.log('✅ Bulletin chargé avec succès, ID:', currentBulletin.id);
            } else {
                console.log('ℹ️ Aucun bulletin pour ce trimestre');
            }
        } else {
            console.log('ℹ️ Aucun bulletin existant');
        }
    } catch (error) {
        console.error('❌ Erreur chargement bulletins:', error);
    }
};





















    const loadSavedData = () => {
        try {
            const saved = localStorage.getItem('bulletinFormData');
            if (saved) {
                console.log('📁 Données chargées depuis localStorage');
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('❌ Erreur chargement données:', error);
        }
        return null;
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
            localStorage.setItem('bulletinFormData', JSON.stringify(data));
        } catch (error) {
            console.error('❌ Erreur sauvegarde localStorage:', error);
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
            
            console.log(`🔍 Vérification studentId: ${studentId} (type: ${typeof studentId})`);
            
            if (!studentId) {
                console.error("❌ ERREUR CRITIQUE: studentId est null/undefined");
                alert("❌ ERREUR : Aucun élève sélectionné.\n\nVeuillez retourner à la liste des élèves et cliquer sur 'Créer bulletin'.");
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
                bulletin_type: 'anglophone',
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

            console.log('📤 Payload envoyé à l\'API:', payload);
            console.log('📤 Type student_id:', typeof payload.student_id);
            console.log('📤 URL Base:', API_BASE_URL);
            
            let url, method;
            if (bulletinId) {
                url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
                method = 'PUT';
                console.log(`🔄 Mise à jour bulletin ID: ${bulletinId} - URL: ${url}`);
            } else {
                url = `${API_BASE_URL}/api/bulletin/anglophone`;
                method = 'POST';
                console.log('🆕 Création nouveau bulletin - URL:', url);
            }

            console.log(`📤 Envoi ${method} à: ${url}`);
            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            console.log(`📥 Réponse API (${response.status}):`, responseText.substring(0, 500));

            if (!response.ok) {
                throw new Error(`Erreur API ${response.status}: ${responseText.substring(0, 200)}`);
            }

            const result = JSON.parse(responseText);
            console.log('✅ Réponse API:', result);

            if (!bulletinId && result.id) {
                setBulletinId(result.id);
                setIsEditing(true);
            }

            if (isDraft) {
                setIsDraftSaved(true);
                alert('✅ Brouillon sauvegardé avec succès!');
            } else {
                alert('✅ Bulletin finalisé avec succès!');
            }

            return result;

        } catch (error) {
            console.error('❌ Erreur sauvegarde:', error);
            alert(`❌ Erreur lors de la sauvegarde: ${error.message}`);
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
                alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 2MB.");
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
        console.log('💾 Sauvegarde brouillon...');
        const result = await saveToDatabase(true);
        if (result) {
            console.log('✅ Brouillon sauvegardé');
        }
    };

    const handleFinalize = async () => {
        console.log('✅ Finalisation et impression...');
        const result = await saveToDatabase(false);
        if (result) {
            handlePrint();
        }
    };

    const handlePrint = () => {
        console.log('🖨️ Préparation impression...');
        
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
        
        window.open('/print-bulletin', '_blank');
    };


     






    const handlePrintOnly = () => {
        console.log('🖨️ Impression uniquement...');
        handlePrint();
    };

    const handleReset = () => {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
            localStorage.removeItem('bulletinFormData');
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
                            Élève: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
                            {studentInfo.class_name && ` - Classe: ${studentInfo.class_name}`}
                            {studentInfo.sex && ` - Sexe: ${studentInfo.sex}`}
                            {` - Trimestre: ${currentTrimester}`}
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
                            ERREUR : Aucun élève sélectionné !
                        </span>
                    </div>
                    <div className="mt-2 text-xs text-red-600">
                        Vous devez d'abord sélectionner un élève depuis la liste des élèves.
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                            Retour au tableau de bord
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
                            Brouillon sauvegardé
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
                            Bulletin chargé (ID: {bulletinId})
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
                            SCHOOL REPORT
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
                                        alt="Student"
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
                                placeholder="Full name" 
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
                                <option>Male</option>
                                <option>Female</option>
                            </select> */}
                            <select 
                                className="border px-3 py-2 rounded" 
                                value={meta.className} 
                                onChange={e => changeMeta("className", e.target.value)}
                                disabled={!!studentInfo}
                            >
                                <option value="">Class</option>
                                <option>SIL</option><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option>
                                <option>Class 1</option><option>Class 2</option><option>Class 3</option><option>Class 4</option><option>Class 5</option><option>Class 6</option>
                            </select>

                            <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
                                <option value="">Level / Niveau</option>
                                <option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option><option>Level 5</option><option>Level 6</option>
                                <option>Niveau 1</option><option>Niveau 2</option><option>Niveau 3</option><option>Niveau 4</option><option>Niveau 5</option><option>Niveau 6</option>
                            </select>

                            <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
                                <option value="">Term / Trimestre</option>
                                <option>Term 1</option><option>Term 2</option><option>Term 3</option><option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
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
                                <th className="border p-2 w-36">Skills</th>
                                <th className="border p-2 w-96">Description</th>
                                <th className="border p-2 text-center w-20">Evaluation</th>
                                <th className="border p-2 text-center w-14">SCl</th>
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
                        <div className="font-semibold mb-2">Appreciation Legend</div>
                        <ul className="list-disc ml-5">
                            <li><strong>Acquired</strong> — The student has mastered the skill.</li>
                            <li><strong>In the process of acquire</strong> — Progressing but not yet mastered.</li>
                            <li><strong>Expert</strong> — Performance above expectations.</li>
                            <li><strong>Not acquired</strong> — Skill not yet acquired.</li>
                        </ul>
                    </div>

                    <div className="border rounded p-4 text-sm">
                        <div className="font-semibold mb-2">Periods</div>

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
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Summary</div>
                        <div className="space-y-3">
                            <div className="text-center">
                                <div className="text-xs text-gray-600 mb-1">Overall Average</div>
                                <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
                            </div>
                            <div>
                                <div className="text-xs font-medium mb-1">Appreciation</div>
                                <select
                                    className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={summary.overallAppreciation}
                                    onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
                                >
                                    <option value="">- Select -</option>
                                    <option>Not acquired</option>
                                    <option>In the process</option>
                                    <option>Acquired</option>
                                    <option>Expert</option>
                                </select>
                            </div>
                            <div>
                                <div className="text-xs font-medium mb-1">Position</div>
                                <input
                                    className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={summary.position}
                                    onChange={(e) => changeSummary("position", e.target.value)}
                                    placeholder="Ex: 5ème/30"
                                />
                            </div>
                            <div>
                                <div className="text-xs font-medium mb-1">Decision</div>
                                <select
                                    className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                                    value={summary.decision}
                                    onChange={(e) => changeSummary("decision", e.target.value)}
                                >
                                    <option value="">- Select -</option>
                                    <option>Has succeeded</option>
                                    <option>Has failed</option>
                                    <option>Admis</option>
                                    <option>Ajourné</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Teacher's Visa</div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Headmaster's Visa</div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                        <div className="font-bold text-base mb-3 text-center text-gray-800">Parent's Visa</div>
                    </div>
                </div>

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