








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReportPreview from './ReportPreview';

// const AnnualReport = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     schoolYear: '2025-2026',
//     class: 'Pre-Nursery',
//     term1: { result: '', position: '' },
//     term2: { result: '', position: '' },
//     term3: { result: '', position: '' },
//     remarks: 'Acquired',
//     councilDecision: {
//       promotedTo: 'Nursery 1',
//       repeatClass: 'No'
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
//       class: 'Pre-Nursery',
//       term1: { result: '', position: '' },
//       term2: { result: '', position: '' },
//       term3: { result: '', position: '' },
//       remarks: 'Acquired',
//       councilDecision: {
//         promotedTo: 'Nursery 1',
//         repeatClass: 'No'
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
//       isEnglish={true}
//       onFinalize={() => {
//         if (confirm("Are you sure you want to finalize and clear the form?")) {
//           localStorage.removeItem('annualReportFormData');
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
//     'Pre-Nursery', 'Nursery 1', 'Nursery 2', 
//     'Class 1', 'Class 2', 'Class 3', 
//     'Class 4', 'Class 5', 'Class 6'
//   ];

//   const remarksOptions = [
//     'Acquired', 'In the process of acquire', 'Expert', 'Not acquired',
//     'Excellent', 'Very good', 'Good', 'Average', 'Fair', 'Above Average',
//     'Regular', 'Irregular', 'Friendly', 'Unfriendly', 'Fairly good', 'Neat'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         {/* Header */}
//         <div className="
//           flex flex-col items-center text-gray-600 text-xs print:text-xs
//           md:flex-row md:justify-between md:items-start border-b pb-4 mb-4
//         ">
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
//               BILINGUAL SCHOOL GROUP THE GRACE OF GOD
//             </div>
//             <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//               SCHOOL REPORT
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
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 placeholder="Enter student name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">School Year:</label>
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
//             <label className="block text-sm font-medium text-gray-700 mb-1">Class:</label>
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
//                   <th className="border border-gray-300 px-2 py-1">Terms</th>
//                   <th className="border border-gray-300 px-2 py-1">Results</th>
//                   <th className="border border-gray-300 px-2 py-1">Position</th>
//                   <th className="border border-gray-300 px-2 py-1">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border border-gray-300 px-2 py-1">1st Term</td>
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
//                   <td className="border border-gray-300 px-2 py-1">2nd Term</td>
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
//                   <td className="border border-gray-300 px-2 py-1">3rd Term</td>
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
//               <label className="block text-sm font-medium text-gray-700 mb-1">Annual Average:</label>
//               <input
//                 type="text"
//                 value={calculateAnnualAverage()}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Annual Position:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           {/* Class Council's Decision */}
//           <div className="border border-gray-300 rounded-md p-4">
//             <h3 className="font-bold text-sm mb-2">CLASS COUNCIL'S DECISION</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Promoted to:</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">To repeat class:</label>
//                 <select
//                   value={formData.councilDecision.repeatClass}
//                   onChange={(e) => handleCouncilDecisionChange('repeatClass', e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 >
//                   <option value="No">No</option>
//                   <option value="Yes">Yes</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Signatures */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Head of the institution's observation and signature:</label>
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
//                 placeholder="Head's signature"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Parent and signature:</label>
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
//                 placeholder="Parent's signature"
//               />
//             </div>
//           </div>

//           <div className="text-right">
//             <p className="text-sm">Yaoundé, the ___________</p>
//           </div>

//           {/* Footer */}
//           <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
//             <div className="receipt-footer">
//               <div>
//                 <p>Telephone: (+237) 696-308-503 / WhatsApp: 651989899</p>
//                 <p>Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, opposite the mini market)</p>
//               </div>
//               <div>
//                 <p>Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025</p>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => navigate('/anglophone')}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//             >
//               Back
//             </button>
//             <div className="space-x-2">
//               <button
//                 onClick={resetForm}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setShowPreview(true)}
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//               >
//                 Preview & Print
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnnualReport;




























































































import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000';

const CLASS_OPTIONS = [
  'Pre-Nursery', 'Nursery 1', 'Nursery 2', 
  'Class 1', 'Class 2', 'Class 3', 
  'Class 4', 'Class 5', 'Class 6'
];

const REMARKS_OPTIONS = [
  'Acquired', 'In the process of acquire', 'Expert', 'Not acquired',
  'Excellent', 'Very good', 'Good', 'Average', 'Fair', 'Above Average',
  'Regular', 'Irregular', 'Friendly', 'Unfriendly', 'Fairly good', 'Neat'
];

export default function AnnualReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId: paramStudentId } = useParams();
  
  console.log("🔍 DEBUG AnnualReport:", {
    paramStudentId,
    locationState: location.state,
    url: location.pathname,
    apiBaseUrl: API_BASE_URL
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
    
    const saved = localStorage.getItem('annualReportData');
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
        
        // Rechercher un bulletin annuel existant
        const annualBulletin = bulletins.find(b => 
          b.bulletin_type === 'annual' || 
          b.bulletin_type === 'annuel' ||
          b.bulletin_type?.includes('annual') ||
          b.bulletin_type?.includes('annuel')
        );
        
        if (annualBulletin) {
          console.log('✅ Existing annual bulletin found:', annualBulletin);
          setBulletinId(annualBulletin.id);
          setIsEditing(true);
          
          const savedData = JSON.parse(annualBulletin.data_json);
          if (savedData.meta) setMeta(prev => ({ ...prev, ...savedData.meta }));
          if (savedData.data) setData(savedData.data);
          if (savedData.summary) setSummary(savedData.summary);
        } else {
          console.log('ℹ️ No existing annual bulletin found');
        }
      } else {
        console.error(`❌ Error loading bulletins: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error loading bulletins:', error);
    }
  };

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
    remarks: "Acquired",
    councilDecision: {
      promotedTo: "Nursery 1",
      repeatClass: "No"
    },
    headObservation: "",
    headSignature: "",
    parentSignature: "",
    annualPosition: ""
  });

  const saveData = (data) => {
    try {
      localStorage.setItem('annualReportData', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
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
      
      console.log(`🔍 Checking studentId: ${studentId} (type: ${typeof studentId})`);
      
      if (!studentId) {
        console.error("❌ CRITICAL ERROR: studentId is null/undefined");
        alert("❌ ERROR: No student selected.\n\nPlease return to student list and click 'Create Annual Bulletin'.");
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
        bulletin_type: 'annual',
        trimester: 'Annual',
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

      console.log('📤 Payload to API:', payload);
      
      let url, method;
      if (bulletinId) {
        url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
        method = 'PUT';
        console.log(`🔄 Updating bulletin ID: ${bulletinId} - URL: ${url}`);
      } else {
        url = `${API_BASE_URL}/api/bulletin/annual`;
        method = 'POST';
        console.log('🆕 Creating new annual bulletin - URL:', url);
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
        alert('✅ Annual bulletin finalized successfully!');
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
      data,
      summary,
      totalResult,
      annualAverage
    };
    
    localStorage.setItem('printAnnualData', JSON.stringify(printData));
    
    const printUrl = `${window.location.origin}/print-annual`;
    console.log('🖨️ Opening:', printUrl);
    window.open(printUrl, '_blank');
  };

  const handlePrintOnly = () => {
    console.log('🖨️ Print only...');
    handlePrint();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
      localStorage.removeItem('annualReportData');
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
        remarks: "Acquired",
        councilDecision: {
          promotedTo: "Nursery 1",
          repeatClass: "No"
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
              Student: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
              {studentInfo.class_name && ` - Class: ${studentInfo.class_name}`}
              {studentInfo.sex && ` - Sex: ${studentInfo.sex}`}
              {` - Annual Report`}
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
              ERROR: No student selected!
            </span>
          </div>
          <div className="mt-2 text-xs text-red-600">
            You must first select a student from the student list.
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
              Annual bulletin loaded (ID: {bulletinId})
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
        {/* Header */}
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

        {renderStudentInfo()}
        {renderSaveStatus()}

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                value={meta.studentName}
                onChange={(e) => changeMeta("studentName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter student name"
                disabled={!!studentInfo}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Year:</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Class:</label>
              <select
                value={meta.className}
                onChange={(e) => changeMeta("className", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                disabled={!!studentInfo}
              >
                <option value="">Select Class</option>
                {CLASS_OPTIONS.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex:</label>
              <select
                value={meta.sex}
                onChange={(e) => changeMeta("sex", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                disabled={!!studentInfo}
              >
                <option value="">Select Sex</option>
                <option>Boy</option>
                <option>Girl</option>
              </select>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1">Terms</th>
                  <th className="border border-gray-300 px-2 py-1">Results</th>
                  <th className="border border-gray-300 px-2 py-1">Position</th>
                  <th className="border border-gray-300 px-2 py-1">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1st Term</td>
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
                      placeholder="e.g., 5th/30"
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
                  <td className="border border-gray-300 px-2 py-1">2nd Term</td>
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
                      placeholder="e.g., 5th/30"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3rd Term</td>
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
                      placeholder="e.g., 5th/30"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Average:</label>
              <input
                type="text"
                value={annualAverage || "0.00"}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Position:</label>
              <input
                type="text"
                value={summary.annualPosition}
                onChange={(e) => handleSummaryChange('annualPosition', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="e.g., 5th/30"
              />
            </div>
          </div>

          {/* Class Council's Decision */}
          <div className="border border-gray-300 rounded-md p-4">
            <h3 className="font-bold text-sm mb-2">CLASS COUNCIL'S DECISION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promoted to:</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">To repeat class:</label>
                <select
                  value={summary.councilDecision.repeatClass}
                  onChange={(e) => handleCouncilDecisionChange('repeatClass', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Head of the institution's observation and signature:</label>
              <textarea
                value={summary.headObservation}
                onChange={(e) => handleSummaryChange('headObservation', e.target.value)}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter head's observations..."
              ></textarea>
              <input
                type="text"
                value={summary.headSignature}
                onChange={(e) => handleSummaryChange('headSignature', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Head's signature"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent and signature:</label>
              <textarea
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Parent's comments..."
              ></textarea>
              <input
                type="text"
                value={summary.parentSignature}
                onChange={(e) => handleSummaryChange('parentSignature', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Parent's signature"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm">Yaoundé, the ___________</p>
          </div>

          {/* Footer */}
          <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
            <div className="receipt-footer">
              <div>
                <p>Telephone: (+237) 696-308-503 / WhatsApp: 651989899</p>
                <p>Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, opposite the mini market)</p>
              </div>
              <div>
                <p>Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
    </div>
  );
}