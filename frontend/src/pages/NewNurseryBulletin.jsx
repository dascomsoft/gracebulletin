import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// IMPORT POUR ELECTRON
const { ipcRenderer } = (() => {
    try {
        if (window.require) {
            return window.require('electron');
        }
    } catch (e) { }
    return { ipcRenderer: null };
})();

// Constantes du deuxième bulletin
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

const API_BASE_URL = 'http://localhost:3000';

export default function NewNurseryBulletin() {
    const navigate = useNavigate();
    const location = useLocation();
    const { studentId: paramStudentId } = useParams();

    console.log("🚀 NOUVEAU BULLETIN AVEC 22 MATIÈRES ET PHOTO");

    // États
    const [saving, setSaving] = useState(false);
    const [bulletinId, setBulletinId] = useState(null);
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [studentInfo, setStudentInfo] = useState(null);

    // NOUVEL ÉTAT POUR LA PHOTO
    const [studentPhoto, setStudentPhoto] = useState(null);

    const [monthHeaders, setMonthHeaders] = useState({
        m1: MONTH_OPTIONS[0],
        m2: MONTH_OPTIONS[1],
        m3: MONTH_OPTIONS[2]
    });

    const [meta, setMeta] = useState({
        studentName: "",
        teacherName: "",
        sex: "",
        className: "",
        term: "",
        academicYear: "",
        student_id: null
    });

    const [subjectsData, setSubjectsData] = useState(() => {
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
    });

    const [summary, setSummary] = useState({
        result: "",
        position: "",
        appreciation: "",
        teacherSignature: "",
        headmasterSignature: "",
        parentSignature: ""
    });

    // Récupérer l'ID
    const [studentId, setStudentId] = useState(() => {
        if (paramStudentId) return parseInt(paramStudentId);
        if (location.state?.studentId) return parseInt(location.state.studentId);
        return null;
    });

    const [currentTrimester, setCurrentTrimester] = useState(() => {
        return location.state?.trimestre || 'Term 1';
    });

    // Mettre à jour meta
    useEffect(() => {
        setMeta(prev => ({ ...prev, term: currentTrimester, student_id: studentId }));
    }, [currentTrimester, studentId]);

    // Nettoyage localStorage au chargement
    useEffect(() => {
        console.log("🧹 Nettoyage des anciennes données...");
        localStorage.removeItem('bulletinNurseryData');
        localStorage.removeItem('nurseryFormData');
    }, []);

    // Charger les données
    useEffect(() => {
        if (studentId) {
            loadStudentInfo(studentId);
            loadStudentBulletins(studentId);
        }
    }, [studentId]);

    const loadStudentInfo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/student/${id}`);
            if (response.ok) {
                const student = await response.json();
                setStudentInfo(student);
                setMeta(prev => ({
                    ...prev,
                    studentName: student.nom_complet || student.full_name || "",
                    sex: student.sex || student.sexe || "",
                    className: student.class_name || "",
                    student_id: student.id
                }));
            }
        } catch (error) {
            console.error('Error loading student info:', error);
        }
    };

    const loadStudentBulletins = async (studentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/student/${studentId}/bulletins`);
            if (!response.ok) return;

            const bulletins = await response.json();
            const currentBulletin = bulletins.find(b => b.trimester === currentTrimester);

            if (currentBulletin) {
                let bulletinData = currentBulletin.data_json;
                if (typeof bulletinData === 'string') {
                    bulletinData = JSON.parse(bulletinData);
                }

                if (bulletinData.monthHeaders) setMonthHeaders(bulletinData.monthHeaders);
                if (bulletinData.meta) setMeta(prev => ({ ...prev, ...bulletinData.meta }));
                if (bulletinData.subjectsData) setSubjectsData(bulletinData.subjectsData);
                if (bulletinData.summary) setSummary(bulletinData.summary);
                if (bulletinData.studentPhoto) setStudentPhoto(bulletinData.studentPhoto); // 👈 CHARGER LA PHOTO

                setBulletinId(currentBulletin.id);
                console.log("✅ Bulletin chargé ID:", currentBulletin.id);
            }
        } catch (error) {
            console.error('Error loading bulletins:', error);
        }
    };

    const getCurrentAcademicYear = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        return month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
    };

    // FONCTIONS POUR LA PHOTO (copiées de l'ancien bulletin)
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

    const saveToDatabase = async (isDraft = true) => {
        try {
            setSaving(true);

            if (!studentId) {
                alert("❌ No student selected.");
                setSaving(false);
                return null;
            }

            const formData = {
                monthHeaders,
                meta: { ...meta, student_id: studentId, term: currentTrimester },
                subjectsData,
                summary,
                studentPhoto  // 👈 INCLURE LA PHOTO DANS LES DONNÉES
            };

            const payload = {
                student_id: studentId,
                bulletin_type: 'nursery',
                trimester: currentTrimester,
                academic_year: meta.academicYear || getCurrentAcademicYear(),
                nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
                classe: meta.className || studentInfo?.class_name || "",
                enseignant: meta.teacherName || "",
                appreciation: summary.appreciation || "",
                rang_position: summary.position || "",
                decision: summary.result || "",
                data_json: JSON.stringify(formData),
                is_draft: isDraft ? 1 : 0
            };

            let url, method;
            if (bulletinId) {
                url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
                method = 'PUT';
            } else {
                url = `${API_BASE_URL}/api/bulletin/nursery`;
                method = 'POST';
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API Error ${response.status}`);

            const result = await response.json();

            if (!bulletinId && result.id) {
                setBulletinId(result.id);
            }

            if (isDraft) {
                setIsDraftSaved(true);
                alert('✅ Draft saved successfully!');
            } else {
                alert('✅ Bulletin finalized successfully!');
                handlePrint();
            }

            return result;

        } catch (error) {
            console.error('Save error:', error);
            alert(`❌ Error: ${error.message}`);
            return null;
        } finally {
            setSaving(false);
        }
    };

    const handlePrint = () => {
        console.log('🖨️ Impression');

        if (ipcRenderer) {
            ipcRenderer.send('print-bulletin');
        } else {
            window.print();
        }
    };





    // Handlers
    const changeMonthHeader = (k, v) => setMonthHeaders(p => ({ ...p, [k]: v }));
    const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
    const changeSubjectData = (subject, field, value) => {
        setSubjectsData(prev => ({
            ...prev,
            [subject]: { ...prev[subject], [field]: value }
        }));
    };
    const changeSummary = (k, v) => setSummary(p => ({ ...p, [k]: v }));

    const handleSaveDraft = () => saveToDatabase(true);
    const handleFinalize = () => saveToDatabase(false);
    const handlePrintOnly = () => handlePrint();

    const handleReset = () => {
        if (confirm("Are you sure you want to reset?")) {
            setMonthHeaders({ m1: MONTH_OPTIONS[0], m2: MONTH_OPTIONS[1], m3: MONTH_OPTIONS[2] });
            setMeta({
                studentName: "",
                teacherName: "",
                sex: "",
                className: "",
                term: currentTrimester,
                academicYear: "",
                student_id: studentId
            });

            const resetSubjects = {};
            SUBJECTS.forEach(subject => {
                resetSubjects[subject] = { remarks1: "", remarks2: "", remarks3: "", appreciation: "" };
            });
            setSubjectsData(resetSubjects);

            setSummary({
                result: "", position: "", appreciation: "",
                teacherSignature: "", headmasterSignature: "", parentSignature: ""
            });

            setStudentPhoto(null);  // 👈 RÉINITIALISER LA PHOTO
            setBulletinId(null);
            setIsDraftSaved(false);
        }
    };

    const academicYears = Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => `${y}-${y + 1}`);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            {/* BANNIÈRE DE CONFIRMATION */}
            {/* <div className="w-full max-w-6xl mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-center font-bold">
                ✅ NOUVEAU BULLETIN AVEC PHOTO - 22 MATIÈRES
            </div> */}

            {/* Header */}
            <div className="w-full max-w-6xl mb-2 border-b border-gray-300 pb-2">
                <div className="flex flex-col items-center text-gray-600 text-xs md:flex-row md:justify-between">
                    <div className="text-left mb-2 md:mb-0 md:w-1/3">
                        <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
                        <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
                    </div>

                    <div className="text-center md:flex-1 md:mx-2">
                        <div className="font-extrabold text-sm sm:text-base md:text-lg">
                            BILINGUAL SCHOOL GROUP THE GRACE OF GOD
                        </div>
                        <div className="text-[13px] sm:text-[16px] md:text-xl font-bold">SCHOOL REPORT</div>
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

      

            {/* Form container */}
            <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">

                <div className="flex flex-col md:flex-row gap-6  items-start">

                    <div className="flex flex-row items-center gap-4 mb-1">
                        {/* Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 relative">
                                {studentPhoto ? (
                                    <>
                                        <img
                                            src={studentPhoto}
                                            alt="Student"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={handleRemovePhoto}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                            type="button"
                                        >
                                            ×
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs">No photo</span>
                                    </div>
                                )}
                            </div>
                            {/* Bouton Add Photo - seulement à l'écran */}
                            <label className="cursor-pointer bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors inline-flex items-center gap-1 mt-1 print:hidden">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Add Photo</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>

                        {/* Info élève sur UNE LIGNE */}
                        <div className="flex-1">
                            <div className="text-lg text-blue-700">
                                <strong>Élève:</strong> {studentInfo?.nom_complet || studentInfo?.full_name || "-"}
                                {studentInfo?.class_name && <span> - <strong>Classe:</strong> {studentInfo.class_name}</span>}
                                <span> - <strong>Trimestre:</strong> {currentTrimester}</span>
                                {meta.year && <span> - <strong>Année:</strong> {meta.year}</span>}
                            </div>
                        </div>
                    </div>
                </div>












                {/* Main Table */}
                <div className="overflow-x-auto mb-6">
                    <table className="w-full text-xl border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-2 text-center w-100">EVALUATION</th>
                                <th className="border border-gray-400 p-2 text-center" colSpan="3">MONTHLY REMARKS</th>
                                <th className="border border-gray-400 p-2 text-center w-32" rowSpan="2">APPRECIATION</th>
                            </tr>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-2 font-semibold">SUBJECTS</th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select className="text-xs bg-transparent" value={monthHeaders.m1} onChange={(e) => changeMonthHeader("m1", e.target.value)}>
                                        {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select className="text-xs bg-transparent" value={monthHeaders.m2} onChange={(e) => changeMonthHeader("m2", e.target.value)}>
                                        {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                                <th className="border border-gray-400 p-2 text-center">
                                    <select className="text-xs bg-transparent" value={monthHeaders.m3} onChange={(e) => changeMonthHeader("m3", e.target.value)}>
                                        {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {SUBJECTS.map((subject, index) => (
                                <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="border border-gray-400 p-2 font-medium">{subject}</td>
                                    {[1, 2, 3].map(month => (
                                        <td key={month} className="border border-gray-400 p-1 text-center">
                                            <select
                                                className="w-full p-1 border-none outline-none bg-transparent"
                                                value={subjectsData[subject]?.[`remarks${month}`] || ""}
                                                onChange={(e) => changeSubjectData(subject, `remarks${month}`, e.target.value)}
                                            >
                                                <option value="">-</option>
                                                {REMARKS_OPTIONS.map(remark => (
                                                    <option key={remark}>{remark}</option>
                                                ))}
                                            </select>
                                        </td>
                                    ))}
                                    <td className="border border-gray-400 p-1 text-center">
                                        <select
                                            className="w-full  p-1 border-none outline-none bg-transparent"
                                            value={subjectsData[subject]?.appreciation || ""}
                                            onChange={(e) => changeSubjectData(subject, "appreciation", e.target.value)}
                                        >
                                            <option value="">-</option>
                                            {REMARKS_OPTIONS.map(remark => (
                                                <option key={remark}>{remark}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-lg">
                    {/* Legend */}
                    <div className="border rounded p-4 text-xs">
                        <div className="font-semibold mb-2">Appreciation Legend</div>
                        <ul className="list-disc ml-5 space-y-1">
                            {REMARKS_OPTIONS.map(r => <li key={r}><strong>{r}</strong></li>)}
                        </ul>
                    </div>

                    {/* Summary */}
                    <div className="border-2 border-gray-400 rounded p-4 text-lg">
                        <div className="font-bold mb-3 text-center">Summary of Work</div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="font-medium mb-1">Result</div>
                                    <select className="w-full border px-2 py-1 rounded text-sm" value={summary.result} onChange={(e) => changeSummary("result", e.target.value)}>
                                        <option value="">- Select -</option>
                                        {RESULT_OPTIONS.map(r => <option key={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <div className=" font-medium mb-1">Position</div>
                                    <input className="w-full border px-2 py-1 rounded text-sm" value={summary.position} onChange={(e) => changeSummary("position", e.target.value)} placeholder="Position" />
                                </div>
                            </div>
                            <div>
                                <div className="font-medium mb-1">Appreciation</div>
                                <select className="w-full border px-2 py-1 rounded " value={summary.appreciation} onChange={(e) => changeSummary("appreciation", e.target.value)}>
                                    <option value="">- Select -</option>
                                    {REMARKS_OPTIONS.map(r => <option key={r}>{r}</option>)}
                                </select>
                            </div>
                            {/* Signatures */}
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {["teacherSignature", "headmasterSignature", "parentSignature"].map((field, idx) => (
                                    <div key={field} className="text-center">
                                        <div className="text-xs font-medium mb-1">
                                            {idx === 0 ? "Teacher's" : idx === 1 ? "Headmaster's" : "Parent's"} Visa
                                        </div>
                                        <div className="border rounded p-2 h-16 flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">{summary[field] || "Signature"}</span>
                                        </div>
                                        <input className="w-full mt-1 text-center border-none outline-none text-xs" value={summary[field]} onChange={(e) => changeSummary(field, e.target.value)} placeholder="Name" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* School Info */}
                {/* <div className="mt-8 text-center text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="font-bold text-blue-800 mb-2">School Information</div>
                    <div><strong>Phone:</strong> +237 696 308 503 | <strong>Head Office:</strong> Yaounde - Nkolbisson</div>
                </div> */}







                <style>{`
    @media print {
        @page {
            size: A4;
            margin: 0.5cm;
        }

        body {
            zoom: 0.55;
        }

        td, th {
            padding: 3px !important;
            line-height: 1.1 !important;
        }

        .p-4 {
            padding: 6px !important;
        }

        button {
            display: none !important;
        }

        .receipt-footer {
            display: none !important;
        }

        /* ✅ AJOUTER CE BLOC POUR CACHER LES FLÈCHES DES SELECTS */
        select {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: inherit !important;
            color: black !important;
        }
        
        select::-ms-expand {
            display: none !important;
        }
    }
`}</style>








                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                    <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-4 py-2 border rounded text-sm hover:bg-gray-50">
                        ← Back
                    </button>

                    <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                        <button onClick={handlePrintOnly} disabled={!studentId} className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50">
                            🖨️ Print
                        </button>
                        <button onClick={handleReset} className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50">
                            Reset
                        </button>
                        <button onClick={handleSaveDraft} disabled={saving || !studentId} className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50">
                            {saving ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button onClick={handleFinalize} disabled={saving || !studentId} className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50">
                            {saving ? 'Saving...' : '✅ Finalize'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}