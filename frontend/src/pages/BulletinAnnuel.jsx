// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReportPreview from './ReportPreview';

// const BulletinAnnuel = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     schoolYear: '2025-2026',
//     class: 'Pré-Maternelle',
//     term1: { result: '', position: '' },
//     term2: { result: '', position: '' },
//     term3: { result: '', position: '' },
//     remarks: 'Acquis',
//     councilDecision: {
//       promotedTo: 'Maternelle 1',
//       repeatClass: 'Non'
//     },
//     headObservation: '',
//     headSignature: '',
//     parentSignature: ''
//   });
  
//   const [showPreview, setShowPreview] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleTermChange = (term, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [term]: {
//         ...prev[term],
//         [field]: value
//       }
//     }));
//   };

//   const handleCouncilDecisionChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       councilDecision: {
//         ...prev.councilDecision,
//         [field]: value
//       }
//     }));
//   };

//   const calculateAnnualAverage = () => {
//     const term1 = parseFloat(formData.term1.result) || 0;
//     const term2 = parseFloat(formData.term2.result) || 0;
//     const term3 = parseFloat(formData.term3.result) || 0;
    
//     if (term1 === 0 && term2 === 0 && term3 === 0) return '';
    
//     return ((term1 + term2 + term3) / 3).toFixed(2);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       schoolYear: '2025-2026',
//       class: 'Pré-Maternelle',
//       term1: { result: '', position: '' },
//       term2: { result: '', position: '' },
//       term3: { result: '', position: '' },
//       remarks: 'Acquis',
//       councilDecision: {
//         promotedTo: 'Maternelle 1',
//         repeatClass: 'Non'
//       },
//       headObservation: '',
//       headSignature: '',
//       parentSignature: ''
//     });
//   };

// if (showPreview) {
//   return (
//     <ReportPreview 
//       formData={formData} 
//       annualAverage={calculateAnnualAverage()}
//       onBack={() => setShowPreview(false)}
//       isEnglish={false}
//       onFinalize={() => {
//         if (confirm("Êtes-vous sûr de vouloir finaliser et vider le formulaire ?")) {
//           localStorage.removeItem('bulletinAnnuelFormData');
//           resetForm();
//           navigate("/dashboard");
//         }
//       }}
//     />
//   );
// }

//   const schoolYears = [];
//   for (let year = 2025; year <= 2049; year++) {
//     schoolYears.push(`${year}-${year + 1}`);
//   }

//   const classes = [
//     'Petite section-', 'Moyenne section', 'Grande section', 
//     'SIL', 'CP', 'CE1', 
//     'CE2', 'CM1', 'CM2'
//   ];

//   const remarksOptions = [
//     'Acquis', 'En cours d\'acquisition', 'Expert', 'Non acquis',
//     'Excellent', 'Très bien', 'Bien', 'Moyen', 'Passable', 'Au-dessus de la moyenne',
//     'Régulier', 'Irregulier', 'Aimable', 'Peu aimable', 'Assez bien', 'Soigné'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         {/* Header */}
//         <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start border-b pb-4 mb-4">
//           {/* Left Block */}
//           <div className="text-left mb-2 md:mb-0 md:w-1/3">
//             <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
//             <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
//           </div>

//           {/* Center Block */}
//           <div className="text-center md:flex-1 md:mx-2">
//             <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
//               GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
//             </div>
//             <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//               BULLETIN SCOLAIRE
//             </div>
//           </div>

//           {/* Right Block */}
//           <div className="text-right mt-2 md:mt-0 md:w-1/3">
//             <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
//             <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nom:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 placeholder="Entrez le nom de l'élève"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Année Scolaire:</label>
//               <select
//                 name="schoolYear"
//                 value={formData.schoolYear}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//               >
//                 {schoolYears.map(year => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Classe:</label>
//             <select
//               name="class"
//               value={formData.class}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//             >
//               {classes.map(cls => (
//                 <option key={cls} value={cls}>{cls}</option>
//               ))}
//             </select>
//           </div>

//           {/* Results Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-300 text-sm">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 px-2 py-1">Trimestres</th>
//                   <th className="border border-gray-300 px-2 py-1">Résultats</th>
//                   <th className="border border-gray-300 px-2 py-1">Position</th>
//                   <th className="border border-gray-300 px-2 py-1">Remarques</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border border-gray-300 px-2 py-1">1er Trimestre</td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term1.result}
//                       onChange={(e) => handleTermChange('term1', 'result', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term1.position}
//                       onChange={(e) => handleTermChange('term1', 'position', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1" rowSpan="3">
//                     <select
//                       value={formData.remarks}
//                       onChange={(e) => handleInputChange({target: {name: 'remarks', value: e.target.value}})}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     >
//                       {remarksOptions.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-300 px-2 py-1">2ème Trimestre</td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term2.result}
//                       onChange={(e) => handleTermChange('term2', 'result', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term2.position}
//                       onChange={(e) => handleTermChange('term2', 'position', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-300 px-2 py-1">3ème Trimestre</td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term3.result}
//                       onChange={(e) => handleTermChange('term3', 'result', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     <input
//                       type="text"
//                       value={formData.term3.position}
//                       onChange={(e) => handleTermChange('term3', 'position', e.target.value)}
//                       className="w-full border-0 focus:ring-0 p-0 text-center"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border border-gray-300 px-2 py-1 font-medium">TOTAL</td>
//                   <td className="border border-gray-300 px-2 py-1 text-center">
//                     {(
//                       (parseFloat(formData.term1.result) || 0) + 
//                       (parseFloat(formData.term2.result) || 0) + 
//                       (parseFloat(formData.term3.result) || 0)
//                     ).toFixed(2)}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1"></td>
//                   <td className="border border-gray-300 px-2 py-1"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Moyenne Annuelle:</label>
//               <input
//                 type="text"
//                 value={calculateAnnualAverage()}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Position Annuelle:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           {/* Class Council's Decision */}
//           <div className="border border-gray-300 rounded-md p-4">
//             <h3 className="font-bold text-sm mb-2">DÉCISION DU CONSEIL DE CLASSE</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Promu en:</label>
//                 <select
//                   value={formData.councilDecision.promotedTo}
//                   onChange={(e) => handleCouncilDecisionChange('promotedTo', e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 >
//                   {classes.map(cls => (
//                     <option key={cls} value={cls}>{cls}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Redoubler la classe:</label>
//                 <select
//                   value={formData.councilDecision.repeatClass}
//                   onChange={(e) => handleCouncilDecisionChange('repeatClass', e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 >
//                   <option value="Non">Non</option>
//                   <option value="Oui">Oui</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Signatures */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Observations et signature du chef d'établissement:</label>
//               <textarea
//                 name="headObservation"
//                 value={formData.headObservation}
//                 onChange={handleInputChange}
//                 rows="2"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//               ></textarea>
//               <input
//                 type="text"
//                 name="headSignature"
//                 value={formData.headSignature}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
//                 placeholder="Signature du chef"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Parent et signature:</label>
//               <textarea
//                 rows="2"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//               ></textarea>
//               <input
//                 type="text"
//                 name="parentSignature"
//                 value={formData.parentSignature}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
//                 placeholder="Signature du parent"
//               />
//             </div>
//           </div>

//           <div className="text-right">
//             <p className="text-sm">Yaoundé, le ___________</p>
//           </div>

//           {/* Footer */}
//           <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
//             <div className="receipt-footer">
//               <div>
//                 <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
//                 <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
//               </div>
//               <div>
//                 <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => navigate('/francophone')}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//             >
//               Retour
//             </button>
//             <div className="space-x-2">
//               <button
//                 onClick={resetForm}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//               >
//                 Réinitialiser
//               </button>
//               <button
//                 onClick={() => setShowPreview(true)}
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//               >
//                 Aperçu & Impression
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulletinAnnuel;









































































































import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000';

const CLASS_OPTIONS = [
  'Petite section', 'Moyenne section', 'Grande section', 
  'SIL', 'CP', 'CE1', 
  'CE2', 'CM1', 'CM2'
];

const REMARKS_OPTIONS = [
  'Acquis', 'En cours d\'acquisition', 'Expert', 'Non acquis',
  'Excellent', 'Très bien', 'Bien', 'Moyen', 'Passable', 'Au-dessus de la moyenne',
  'Régulier', 'Irregulier', 'Aimable', 'Peu aimable', 'Assez bien', 'Soigné'
];

export default function BulletinAnnuel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId: paramStudentId } = useParams();
  
  console.log("🔍 DEBUG BulletinAnnuel:", {
    paramStudentId,
    locationState: location.state,
    url: location.pathname,
    apiBaseUrl: API_BASE_URL
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
    
    const saved = localStorage.getItem('bulletinAnnuelData');
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

  const loadStudentBulletins = async (id) => {
    try {
      const url = `${API_BASE_URL}/api/student/${id}/bulletins`;
      console.log(`📡 Requête bulletins: ${url}`);
      
      const response = await fetch(url);
      if (response.ok) {
        const bulletins = await response.json();
        console.log(`✅ ${bulletins.length} bulletins trouvés`);
        
        // Rechercher un bulletin annuel existant
        const annualBulletin = bulletins.find(b => 
          b.bulletin_type === 'annuel' || 
          b.bulletin_type === 'annual' ||
          b.bulletin_type?.includes('annuel') ||
          b.bulletin_type?.includes('annual')
        );
        
        if (annualBulletin) {
          console.log('✅ Bulletin annuel existant trouvé:', annualBulletin);
          setBulletinId(annualBulletin.id);
          setIsEditing(true);
          
          const savedData = JSON.parse(annualBulletin.data_json);
          if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
          if (savedData.data) setData(savedData.data);
          if (savedData.summary) setSummary(savedData.summary);
        } else {
          console.log('ℹ️ Aucun bulletin annuel existant trouvé');
        }
      } else {
        console.error(`❌ Erreur chargement bulletins: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Erreur chargement bulletins:', error);
    }
  };

  function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month >= 8) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  }

  const [meta, setMeta] = useState({
    studentName: "",
    sex: "",
    className: "",
    schoolYear: getCurrentAcademicYear(),
    student_id: studentId || null
  });

  const [data, setData] = useState({
    term1: { result: "", position: "" },
    term2: { result: "", position: "" },
    term3: { result: "", position: "" }
  });

  const [summary, setSummary] = useState({
    remarks: "Acquis",
    councilDecision: {
      promotedTo: "Maternelle 1",
      repeatClass: "Non"
    },
    headObservation: "",
    headSignature: "",
    parentSignature: "",
    annualPosition: ""
  });

  const saveData = (data) => {
    try {
      localStorage.setItem('bulletinAnnuelData', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Erreur sauvegarde localStorage:', error);
    }
  };

  useEffect(() => {
    const formData = {
      meta,
      data,
      summary
    };
    saveData(formData);
  }, [meta, data, summary]);

  const saveToDatabase = async (isDraft = true) => {
    try {
      setSaving(true);
      
      console.log(`🔍 Vérification studentId: ${studentId} (type: ${typeof studentId})`);
      
      if (!studentId) {
        console.error("❌ ERREUR CRITIQUE: studentId est null/undefined");
        alert("❌ ERREUR : Aucun élève sélectionné.\n\nVeuillez retourner à la liste des élèves et cliquer sur 'Créer Bulletin Annuel'.");
        setSaving(false);
        return null;
      }

      const annualAverage = calculateAnnualAverage();
      const totalResult = calculateTotalResult();

      const formData = {
        meta: { ...meta, student_id: studentId },
        data,
        summary,
        annualAverage,
        totalResult,
        isDraft
      };

      const payload = {
        student_id: studentId,
        bulletin_type: 'annuel',
        trimester: 'Annuel',
        academic_year: meta.schoolYear || getCurrentAcademicYear(),
        nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
        classe: meta.className || studentInfo?.class_name || "",
        enseignant: "",
        appreciation: summary.remarks || "",
        rang_position: summary.annualPosition || "",
        decision: summary.councilDecision.promotedTo || "",
        data_json: JSON.stringify(formData),
        is_draft: isDraft ? 1 : 0
      };

      console.log('📤 Payload envoyé à l\'API:', payload);
      
      let url, method;
      if (bulletinId) {
        url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
        method = 'PUT';
        console.log(`🔄 Mise à jour bulletin ID: ${bulletinId} - URL: ${url}`);
      } else {
        url = `${API_BASE_URL}/api/bulletin/annuel`;
        method = 'POST';
        console.log('🆕 Création nouveau bulletin annuel - URL:', url);
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
        alert('✅ Bulletin annuel finalisé avec succès!');
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

  const calculateTotalResult = () => {
    const term1 = parseFloat(data.term1.result) || 0;
    const term2 = parseFloat(data.term2.result) || 0;
    const term3 = parseFloat(data.term3.result) || 0;
    return (term1 + term2 + term3).toFixed(2);
  };

  const calculateAnnualAverage = () => {
    const term1 = parseFloat(data.term1.result) || 0;
    const term2 = parseFloat(data.term2.result) || 0;
    const term3 = parseFloat(data.term3.result) || 0;
    
    if (term1 === 0 && term2 === 0 && term3 === 0) return '';
    
    return ((term1 + term2 + term3) / 3).toFixed(2);
  };

  const totalResult = useMemo(() => calculateTotalResult(), [data]);
  const annualAverage = useMemo(() => calculateAnnualAverage(), [data]);

  const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
  
  const handleTermChange = (term, field, value) => {
    setData(prev => ({
      ...prev,
      [term]: {
        ...prev[term],
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (k, v) => setSummary(s => ({ ...s, [k]: v }));

  const handleCouncilDecisionChange = (field, value) => {
    setSummary(prev => ({
      ...prev,
      councilDecision: {
        ...prev.councilDecision,
        [field]: value
      }
    }));
  };

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
      data,
      summary,
      totalResult,
      annualAverage
    };
    
    localStorage.setItem('printAnnuelData', JSON.stringify(printData));
    
    const printUrl = `${window.location.origin}/print-annuel`;
    console.log('🖨️ Ouverture:', printUrl);
    window.open(printUrl, '_blank');
  };

  const handlePrintOnly = () => {
    console.log('🖨️ Impression uniquement...');
    handlePrint();
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
      localStorage.removeItem('bulletinAnnuelData');
      setMeta({
        studentName: "",
        sex: "",
        className: "",
        schoolYear: getCurrentAcademicYear(),
        student_id: studentId || null
      });
      setData({
        term1: { result: "", position: "" },
        term2: { result: "", position: "" },
        term3: { result: "", position: "" }
      });
      setSummary({
        remarks: "Acquis",
        councilDecision: {
          promotedTo: "Maternelle 1",
          repeatClass: "Non"
        },
        headObservation: "",
        headSignature: "",
        parentSignature: "",
        annualPosition: ""
      });
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
              {` - Bulletin Annuel`}
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
              Bulletin annuel chargé (ID: {bulletinId})
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Generate school years
  const schoolYears = [];
  for (let year = 2024; year <= 2049; year++) {
    schoolYears.push(`${year}-${year + 1}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header - EN FRANÇAIS */}
        <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start border-b pb-4 mb-4">
          <div className="text-left mb-2 md:mb-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
          </div>

          <div className="text-center md:flex-1 md:mx-2">
            <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
              GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              BULLETIN SCOLAIRE (ANNUEL)
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

        {renderStudentInfo()}
        {renderSaveStatus()}

        {/* Form - EN FRANÇAIS */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom:</label>
              <input
                type="text"
                value={meta.studentName}
                onChange={(e) => changeMeta("studentName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Entrez le nom de l'élève"
                disabled={!!studentInfo}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année Scolaire:</label>
              <select
                value={meta.schoolYear}
                onChange={(e) => changeMeta("schoolYear", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {schoolYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe:</label>
              <select
                value={meta.className}
                onChange={(e) => changeMeta("className", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                disabled={!!studentInfo}
              >
                <option value="">Sélectionnez une classe</option>
                {CLASS_OPTIONS.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sexe:</label>
              <select
                value={meta.sex}
                onChange={(e) => changeMeta("sex", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                disabled={!!studentInfo}
              >
                <option value="">Sélectionnez le sexe</option>
                <option>Masculin</option>
                <option>Féminin</option>
              </select>
            </div>
          </div>

          {/* Table des Résultats - EN FRANÇAIS */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1">Trimestres</th>
                  <th className="border border-gray-300 px-2 py-1">Résultats</th>
                  <th className="border border-gray-300 px-2 py-1">Position</th>
                  <th className="border border-gray-300 px-2 py-1">Remarques</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1er Trimestre</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      step="0.01"
                      value={data.term1.result}
                      onChange={(e) => handleTermChange('term1', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={data.term1.position}
                      onChange={(e) => handleTermChange('term1', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="ex: 5ème/30"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1" rowSpan="3">
                    <select
                      value={summary.remarks}
                      onChange={(e) => handleSummaryChange('remarks', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    >
                      {REMARKS_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">2ème Trimestre</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      step="0.01"
                      value={data.term2.result}
                      onChange={(e) => handleTermChange('term2', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={data.term2.position}
                      onChange={(e) => handleTermChange('term2', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="ex: 5ème/30"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3ème Trimestre</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      step="0.01"
                      value={data.term3.result}
                      onChange={(e) => handleTermChange('term3', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={data.term3.position}
                      onChange={(e) => handleTermChange('term3', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                      placeholder="ex: 5ème/30"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-medium">TOTAL</td>
                  <td className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    {totalResult || "0.00"}
                  </td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moyenne Annuelle:</label>
              <input
                type="text"
                value={annualAverage || "0.00"}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position Annuelle:</label>
              <input
                type="text"
                value={summary.annualPosition}
                onChange={(e) => handleSummaryChange('annualPosition', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="ex: 5ème/30"
              />
            </div>
          </div>

          {/* Décision du Conseil de Classe - EN FRANÇAIS */}
          <div className="border border-gray-300 rounded-md p-4">
            <h3 className="font-bold text-sm mb-2">DÉCISION DU CONSEIL DE CLASSE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promu en:</label>
                <select
                  value={summary.councilDecision.promotedTo}
                  onChange={(e) => handleCouncilDecisionChange('promotedTo', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {CLASS_OPTIONS.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redoubler la classe:</label>
                <select
                  value={summary.councilDecision.repeatClass}
                  onChange={(e) => handleCouncilDecisionChange('repeatClass', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="Non">Non</option>
                  <option value="Oui">Oui</option>
                </select>
              </div>
            </div>
          </div>

          {/* Signatures - EN FRANÇAIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observations et signature du chef d'établissement:</label>
              <textarea
                value={summary.headObservation}
                onChange={(e) => handleSummaryChange('headObservation', e.target.value)}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Observations du chef d'établissement..."
              ></textarea>
              <input
                type="text"
                value={summary.headSignature}
                onChange={(e) => handleSummaryChange('headSignature', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Signature du chef"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent et signature:</label>
              <textarea
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Commentaires du parent..."
              ></textarea>
              <input
                type="text"
                value={summary.parentSignature}
                onChange={(e) => handleSummaryChange('parentSignature', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Signature du parent"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm">Yaoundé, le ___________</p>
          </div>

          {/* Footer - EN FRANÇAIS */}
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

          {/* Boutons d'Action - EN FRANÇAIS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              ← Retour
            </button>

            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrintOnly}
                disabled={!studentId}
                className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🖨️ Imprimer
              </button>
              
              <button
                onClick={handleReset}
                className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
              >
                Réinitialiser
              </button>
              
              <button
                onClick={handleSaveDraft}
                disabled={saving || !studentId}
                className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder Brouillon'}
              </button>
              
              <button
                onClick={handleFinalize}
                disabled={saving || !studentId}
                className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Sauvegarde...' : '✅ Finaliser'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}