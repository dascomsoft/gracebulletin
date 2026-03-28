



import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// IMPORT POUR ELECTRON
const { ipcRenderer } = (() => {
    try {
        if (window.require) {
            return window.require('electron');
        }
    } catch (e) {}
    return { ipcRenderer: null };
})();





const MONTH_OPTIONS = Array.from({ length: 10 }, (_, i) => `Mois-${i + 1}`);
const NOTE_OPTIONS = Array.from({ length: 50 }, (_, i) => i + 1);
const APPRECIATIONS = ["Non acquis", "En cours d'acquisition", "Expert", "Acquis"];
const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

const SKILLS_TEMPLATE = [
  {
    key: "1A",
    title: "1A- Communiquer en français",
    description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
    sclValues: { "Savoir-être": 5, Oral: 20, Écrit: 15 },
    evaluations: ["Savoir-être", "Oral", "Écrit"]
  },
  {
    key: "1B",
    title: "1B- Communiquer en anglais",
    description: "Listening - speaking - writing - reading",
    sclValues: { "Savoir-être": 5, Oral: 20, Écrit: 15 },
    evaluations: ["Savoir-être", "Oral", "Écrit"]
  },
  {
    key: "1C",
    title: "1C- Communiquer en Langue nationale",
    description: "Us et coutumes - traditions - mode de vie - interprétation des phénomènes",
    sclValues: {"Savoir-être": 2, Oral: 10, Pratique: 3, Écrit:5 },
    evaluations: ["Savoir-être","Oral", "Pratique" ,"Écrit"]
  },
  {
    key: "2A",
    title: "2A- Utiliser les Notions de base en Mathématiques",
    description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
    sclValues: { "Savoir-être": 5, Oral: 5, Écrit: 20 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  {
    key: "2B",
    title: "2B- Utiliser les Notions de base en sciences et technologie",
    description: "Santé et éducation environnementale - technologie et ingénierie",
    sclValues: { "Savoir-être": 5, Oral: 5, Pratique: 15, Écrit: 5 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  {
    key: "3A",
    title: "3A- Pratiquer les Valeurs Sociales",
    description: "Histoire et géographie",
    sclValues: { "Savoir-être": 4, Oral: 3, Pratique: 10, Écrit: 3 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  {
    key: "3B",
    title: "3B- Pratiquer les Valeurs citoyennes",
    description: "Éducation civique - droits humains - éducation morale",
    sclValues: { "Savoir-être": 2, Oral: 5, Pratique: 8, Écrit: 5 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  {
    key: "4A",
    title: "4A- Demontrer l'Autonomie, l'Esprit d'Initiative de Créativité et d'Entrepreneuriat dans les Études Professionnelles",
    description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
    sclValues: { "Savoir-être": 2, Oral: 5, Pratique: 10, Écrit: 3 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  // {
  //   key: "4B",
  //   title: "4B- Demontrer l'autonomie, l'esprit d'initiative de créativité et d'entrepreneuriat",
  //   description: "Outil agricole - agriculture et jardinage - élevage",
  //   sclValues: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
  //   evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  // },
  {
    key: "5",
    title: "5- Utiliser les Notions et Outils de base des Technologies de l'Information et de la Communication",
    description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
    sclValues: { "Savoir-être": 4, Oral: 3, Pratique: 10, Écrit: 3 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  {
    key: "6A",
    title: "6-A Pratiquer les Activités Physiques et Sportives pour les apprenants aptent",
    description: "Mouvement - saut - sports collectifs - gymnastique - relais - sprint",
    sclValues: { "Savoir-être": 4, Oral: 3, Pratique: 10, Écrit: 3 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  },
  // {
  //   key: "6B",
  //   title: "6-B Pratiquer les Activités Physiques",
  //   description: "Pour les personnes physiquement pour les apprenants inaptent",
  //   sclValues: { "Savoir-être": 2, Oral: 3,  Écrit: 15 },
  //   evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  // },
  {
    key: "6C",
    title: "6-C Pratiquer les Activités Artistiques",
    description: "Arts visuels - arts du spectacle",
    sclValues: { "Savoir-être": 4, Oral:3, Pratique: 10, Écrit: 3 },
    evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
  }
];

const API_BASE_URL = 'http://localhost:3000';

export default function PrimaireFrancophone() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId: paramStudentId } = useParams();
  
  console.log("🔍 DEBUG PrimaireFrancophone:", {
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
    
    const saved = localStorage.getItem('bulletinFrancophoneData');
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
    
    return 'Trimestre 1';
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
    
    const saved = localStorage.getItem('bulletinFrancophoneData');
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
      const saved = localStorage.getItem('bulletinFrancophoneData');
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
      localStorage.setItem('bulletinFrancophoneData', JSON.stringify(data));
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
        bulletin_type: 'francophone',
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
        url = `${API_BASE_URL}/api/bulletin/francophone`;
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
        
        // ✅ Vérification 1 : skillData existe
        if (!skillData || !skillData.evals) {
            console.log("⚠️ Données manquantes pour", skill.key);
            return;
        }

        skill.evaluations.forEach(ev => {
            const evalData = skillData.evals[ev];
            
            // ✅ Vérification 2 : evalData existe
            if (!evalData) {
                console.log("⚠️ Évaluation manquante pour", ev, "dans", skill.key);
                return;
            }

            // Période 1 avec sécurité
            if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
                sumNotes1 += Number(evalData.m1);
                sumSCL1 += skill.sclValues[ev] || 0; // ✅ Sécurité
            }

            // Période 2 avec sécurité
            if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
                sumNotes2 += Number(evalData.m2);
                sumSCL2 += skill.sclValues[ev] || 0; // ✅ Sécurité
            }

            // Période 3 avec sécurité
            if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
                sumNotes3 += Number(evalData.m3);
                sumSCL3 += skill.sclValues[ev] || 0; // ✅ Sécurité
            }
        });
    });

    return {
        t1: sumSCL1 > 0 ? `${sumNotes1}/${sumSCL1}` : "0/0",
        t2: sumSCL2 > 0 ? `${sumNotes2}/${sumSCL2}` : "0/0",
        t3: sumSCL3 > 0 ? `${sumNotes3}/${sumSCL3}` : "0/0",
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
    console.log('🖨️ Impression');
    
    if (ipcRenderer) {
        ipcRenderer.send('print-bulletin');
    } else {
        window.print();
    }
};



  const handlePrintOnly = () => {
    handlePrint();
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
      localStorage.removeItem('bulletinFrancophoneData');
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
              GROUPE SCOLAIRE BILINGUE THE GRACE OF GOD
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              BULLETIN SCOLAIRE
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





        <div className="overflow-x-auto">
          <table className="w-full text-xl border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 w-90 text-base">Compétences</th>
                <th className="border p-2 w-100 text-base">Description</th>
                <th className="border p-2 text-center w-20 text-base">Évaluation</th>
                <th className="border p-2 text-center w-14 text-base">SCL</th>
                <th className="border p-2 text-center w-24 text-base">
                  <select className="text-sm" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-sm" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-24">
                  <select className="text-sm" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
                    {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border p-2 text-center w-100 text-sm">Appréciation</th>
              </tr>
            </thead>

            <tbody>
              {SKILLS_TEMPLATE.map(skill => {
                const state = data[skill.key];
                return (





<React.Fragment key={skill.key}>
    {skill.evaluations.map((ev, i) => {
        // ✅ Sécurité : récupérer les données d'évaluation
        const evalData = state?.evals?.[ev];
        
        return (
            <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {i === 0 && (
                    <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
                        <div className="">{skill.title}</div>
                    </td>
                )}
                {i === 0 && (
                    <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                        <div className=" text-gray-600">{skill.description}</div>
                    </td>
                )}

                <td className="border p-2 text-center align-top">{ev}</td>
                <td className="border p-2 text-center align-top">{skill.sclValues?.[ev] || "-"}</td>

                {/* Période 1 */}
                <td className="border p-1 text-center">
                    <select 
                        className="w-full p-1" 
                        value={evalData?.m1 || ""} 
                        onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}
                    >
                        <option value="">-</option>
                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </td>

                {/* Période 2 */}
                <td className="border p-1 text-center">
                    <select 
                        className="w-full  p-1" 
                        value={evalData?.m2 || ""} 
                        onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}
                    >
                        <option value="">-</option>
                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </td>

                {/* Période 3 */}
                <td className="border p-1 text-center">
                    <select 
                        className="w-full  p-1" 
                        value={evalData?.m3 || ""} 
                        onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}
                    >
                        <option value="">-</option>
                        {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </td>

                {i === 0 && (
                    <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
                        <select 
                            className="w-full p-1" 
                            value={state?.appreciation || ""} 
                            onChange={(e) => changeGroupApp(skill.key, e.target.value)}
                        >
                            <option value="">-</option>
                            {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </td>
                )}
            </tr>
        );
    })}
</React.Fragment>




                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded p-4 text-sm">
            <div className="font-semibold mb-2">Légende des Appréciations</div>
            <ul className="list-disc ml-5">
              <li><strong>Acquis</strong> — L'élève a maîtrisé la compétence.</li>
              <li><strong>En cours d'acquisition</strong> — En progression mais pas encore maîtrisé.</li>
              <li><strong>Expert</strong> — Performance au-dessus des attentes.</li>
              <li><strong>Non acquis</strong> — Compétence non encore acquise.</li>
            </ul>
          </div>

          <div className="border rounded p-4 text-lg">
            <div className="font-semibold mb-2">Périodes</div>

            <div className="grid grid-cols-3 gap-2 text-lg mb-3">
              <div>
                <select className="w-full border px-2 py-1 rounded text-base" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-base" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <select className="w-full border px-2 py-1 rounded text-base" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
                  {MONTH_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-lg items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Totaux</div>
                <div className="font-semibold mt-1">{totals.t3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-lg items-center mb-2">
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a1}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a2}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Moyenne (/20)</div>
                <div className="font-semibold mt-1">{averages.a3}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Appréciation</div>
                <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
                  <option value="">-</option>
                  {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé</div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Moyenne Générale</div>
                <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Appréciation</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.overallAppreciation}
                  onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
                >
                  <option value="">- Sélectionner -</option>
                  <option>Non acquis</option>
                  <option>En cours d'acquisition</option>
                  <option>Acquis</option>
                  <option>Expert</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Rang / Position</div>
                <input
                  className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.position}
                  onChange={(e) => changeSummary("position", e.target.value)}
                  placeholder="Ex: 5ème/30"
                />
              </div>
              <div>
                <div className="text-xs font-medium mb-1">Décision</div>
                <select
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  value={summary.decision}
                  onChange={(e) => changeSummary("decision", e.target.value)}
                >
                  <option value="">- Sélectionner -</option>
                  <option>A réussi</option>
                  <option>A échoué</option>
                  <option>Admis</option>
                  <option>Ajourné</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Directeur</div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
          </div>
        </div>

<style>{`
    @media print {
        @page {
            size: A4;
            margin: 0.5cm;
        }

        body {
            zoom: 0.43;
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
  );
}

























































































































































































































































































































// import React, { useMemo, useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// // IMPORT POUR ELECTRON
// const { ipcRenderer } = (() => {
//     try {
//         if (window.require) {
//             return window.require('electron');
//         }
//     } catch (e) {}
//     return { ipcRenderer: null };
// })();

// // ✅ Changé : Mois -> Séquence
// const SEQUENCE_OPTIONS = Array.from({ length: 10 }, (_, i) => `Séquence ${i + 1}`);
// const NOTE_OPTIONS = Array.from({ length: 50 }, (_, i) => i + 1);
// const APPRECIATIONS = ["Non acquis", "En cours d'acquisition", "Expert", "Acquis"];
// const MONTH_APPRECIATIONS = ["A", "NS", "A+"];

// const SKILLS_TEMPLATE = [
//   {
//     key: "1A",
//     title: "1A- Communiquer en français",
//     description: "Compréhension orale - lecture - production écrite - grammaire - conjugaison - vocabulaire",
//     sclValues: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
//     evaluations: ["Savoir-être", "Oral", "Écrit"]
//   },
//   {
//     key: "1B",
//     title: "1B- Communiquer en anglais",
//     description: "Listening - speaking - writing - reading",
//     sclValues: { "Savoir-être": 3, Oral: 12, Écrit: 15 },
//     evaluations: ["Savoir-être", "Oral", "Écrit"]
//   },
//   {
//     key: "1C",
//     title: "1C- Communiquer en Langue nationale",
//     description: "Us et coutumes - traditions - mode de vie - interprétation des phénomènes",
//     sclValues: {"Savoir-être": 2, Oral: 10, Pratique: 2, Écrit:6},
//     evaluations: ["Savoir-être","Oral", "Pratique"]
//   },
//   {
//     key: "2A",
//     title: "2A- Utiliser les Notions de base en Mathématiques",
//     description: "Ensembles et logique - nombre et numération - mesure - graphiques et statistiques - géométrie",
//     sclValues: { "Savoir-être": 4, Oral: 8, Écrit: 28 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "2B",
//     title: "2B- Utiliser les Notions de base en sciences et technologie",
//     description: "Santé et éducation environnementale - technologie et ingénierie",
//     sclValues: { "Savoir-être": 7, Oral: 6, Pratique: 20, Écrit: 7 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "3A",
//     title: "3A- Pratiquer les Valeurs Sociales",
//     description: "Histoire et géographie",
//     sclValues: { "Savoir-être": 4, Oral: 3, Pratique: 5, Écrit: 8 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "3B",
//     title: "3B- Pratiquer les Valeurs citoyennes",
//     description: "Éducation civique - droits humains - éducation morale",
//     sclValues: { "Savoir-être": 3, Oral: 3, Pratique: 5, Écrit: 9 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "4A",
//     title: "4A- Demontrer l'Autonomie, l'Esprit d'Initiative de Créativité et d'Entrepreneuriat dans les Études Professionnelles",
//     description: "Travaux d'aiguille - arts ménagers - blanchisserie et nutrition alimentaire",
//     sclValues: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "4B",
//     title: "4B- Demontrer l'autonomie, l'esprit d'initiative de créativité et d'entrepreneuriat",
//     description: "Outil agricole - agriculture et jardinage - élevage",
//     sclValues: { "Savoir-être": 2, Oral: 5, Pratique: 11, Écrit: 2 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "5",
//     title: "5- Utiliser les Notions et Outils de base des Technologies de l'Information et de la Communication",
//     description: "L'ordinateur et les outils TIC - Internet et éthique de la communication",
//     sclValues: { "Savoir-être": 6, Oral: 4, Pratique: 20, Écrit: 10 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "6A",
//     title: "6-A Pratiquer les Activités Physiques et Sportives pour les apprenants aptent",
//     description: "Mouvement - saut - sports collectifs - gymnastique - relais - sprint",
//     sclValues: { "Savoir-être": 4, Oral: 2, Pratique: 12, Écrit: 2 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "6B",
//     title: "6-B Pratiquer les Activités Physiques",
//     description: "Pour les personnes physiquement pour les apprenants inaptent",
//     sclValues: { "Savoir-être": 2, Oral: 3,  Écrit: 15 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   },
//   {
//     key: "6C",
//     title: "6-C Pratiquer les Activités Artistiques",
//     description: "Arts visuels - arts du spectacle",
//     sclValues: { "Savoir-être": 2, Oral: 2, Pratique: 12, Écrit: 4 },
//     evaluations: ["Savoir-être", "Oral", "Pratique", "Écrit"]
//   }
// ];

// // ✅ Calcul du TOTAL ANNUEL (fixe pour l'année)
// const TOTAL_ANNUEL = (() => {
//     let total = 0;
//     SKILLS_TEMPLATE.forEach(skill => {
//         Object.values(skill.sclValues).forEach(value => {
//             total += value;
//         });
//     });
//     return total;
// })();

// console.log("📊 TOTAL ANNUEL (fixe) =", TOTAL_ANNUEL);

// const API_BASE_URL = 'http://localhost:3000';

// export default function PrimaireFrancophone() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { studentId: paramStudentId } = useParams();
  
//   console.log("🔍 DEBUG PrimaireFrancophone:", {
//     paramStudentId,
//     locationState: location.state,
//     url: location.pathname,
//     apiBaseUrl: API_BASE_URL
//   });

//   const [currentTrimester, setCurrentTrimester] = useState(() => {
//     if (location.state?.trimestre) {
//       console.log(`✅ Trimestre depuis state: ${location.state.trimestre}`);
//       return location.state.trimestre;
//     }
    
//     const saved = localStorage.getItem('bulletinFrancophoneData');
//     if (saved) {
//       try {
//         const data = JSON.parse(saved);
//         if (data.meta?.term) {
//           return data.meta.term;
//         }
//       } catch (e) {
//         console.error('Erreur lecture localStorage:', e);
//       }
//     }
    
//     return 'Trimestre 1';
//   });

//   const [studentId, setStudentId] = useState(() => {
//     if (paramStudentId) {
//       const id = parseInt(paramStudentId);
//       console.log(`✅ ID depuis URL: ${id} (type: ${typeof id})`);
//       return id;
//     }
    
//     if (location.state?.studentId) {
//       const id = parseInt(location.state.studentId);
//       console.log(`✅ ID depuis state: ${id} (type: ${typeof id})`);
//       return id;
//     }
    
//     const saved = localStorage.getItem('bulletinFrancophoneData');
//     if (saved) {
//       try {
//         const data = JSON.parse(saved);
//         if (data.meta?.student_id) {
//           const id = parseInt(data.meta.student_id);
//           console.log(`✅ ID depuis localStorage: ${id} (type: ${typeof id})`);
//           return id;
//         }
//       } catch (e) {
//         console.error('Erreur lecture localStorage:', e);
//       }
//     }
    
//     console.warn("⚠️ Aucun ID d'élève trouvé");
//     return null;
//   });

//   const [studentInfo, setStudentInfo] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [bulletinId, setBulletinId] = useState(null);
//   const [isDraftSaved, setIsDraftSaved] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (studentId) {
//       console.log(`🔄 Chargement info élève ID: ${studentId}`);
//       loadStudentInfo(studentId);
//       loadStudentBulletins(studentId);
//     } else {
//       console.warn("❌ Pas d'ID élève pour charger les infos");
//     }
//   }, [studentId]);

//   const loadStudentInfo = async (id) => {
//     try {
//       console.log(`📡 Requête API élève pour ID: ${id}`);
//       const url = `${API_BASE_URL}/api/student/${id}`;
//       console.log(`📡 URL: ${url}`);
      
//       const response = await fetch(url);
//       console.log(`📡 Réponse status: ${response.status}`);
      
//       if (response.ok) {
//         const student = await response.json();
//         console.log('✅ Info élève chargée:', student);
//         setStudentInfo(student);
//         setMeta(prev => ({
//           ...prev,
//           studentName: student.nom_complet || student.full_name || "",
//           sex: student.sex || student.sexe || "",
//           className: student.class_name || "",
//           student_id: student.id
//         }));
//       } else {
//         const errorText = await response.text();
//         console.error(`❌ Erreur API élève: ${response.status}`, errorText.substring(0, 200));
//       }
//     } catch (error) {
//       console.error('❌ Erreur chargement info élève:', error);
//     }
//   };

// const loadStudentBulletins = async (studentId) => {
//     try {
//         console.log(`📡 Requête bulletins: http://localhost:3000/api/student/${studentId}/bulletins`);
//         const response = await fetch(`http://localhost:3000/api/student/${studentId}/bulletins`);
        
//         if (!response.ok) {
//             throw new Error(`Erreur HTTP: ${response.status}`);
//         }
        
//         const bulletins = await response.json();
//         console.log(`✅ ${bulletins.length} bulletins trouvés`);
        
//         const currentTrimester = location.state?.trimestre || 'Trimestre 1';
//         console.log('📌 Recherche bulletin pour le trimestre:', currentTrimester);
        
//         if (bulletins.length > 0) {
//             const currentBulletin = bulletins.find(b => 
//                 b.trimester === currentTrimester
//             );
            
//             if (currentBulletin) {
//                 console.log('✅ Bulletin existant trouvé:', currentBulletin);
                
//                 let bulletinData = currentBulletin.data_json;
                
//                 if (typeof bulletinData === 'string') {
//                     try {
//                         bulletinData = JSON.parse(bulletinData);
//                         console.log('📦 data_json parsé (était une chaîne)');
//                     } catch (e) {
//                         console.warn('⚠️ Erreur parsing JSON:', e);
//                         bulletinData = {};
//                     }
//                 } else {
//                     console.log('📦 data_json déjà parsé (était un objet)');
//                 }
                
//                 if (bulletinData.periodHeaders) {
//                     setPeriodHeaders(bulletinData.periodHeaders);
//                 }
                
//                 if (bulletinData.meta) {
//                     setMeta(prev => ({ ...prev, ...bulletinData.meta }));
//                 }
                
//                 if (bulletinData.data) {
//                     setData(bulletinData.data);
//                 }
                
//                 if (bulletinData.periodInfo) {
//                     setPeriodInfo(bulletinData.periodInfo);
//                 }
                
//                 if (bulletinData.summary) {
//                     setSummary(bulletinData.summary);
//                 }
                
//                 if (bulletinData.studentPhoto) {
//                     setStudentPhoto(bulletinData.studentPhoto);
//                 }
                
//                 setBulletinId(currentBulletin.id);
//                 console.log('✅ Bulletin chargé avec succès, ID:', currentBulletin.id);
//             } else {
//                 console.log('ℹ️ Aucun bulletin pour ce trimestre');
//             }
//         } else {
//             console.log('ℹ️ Aucun bulletin existant');
//         }
//     } catch (error) {
//         console.error('❌ Erreur chargement bulletins:', error);
//     }
// };

//   const loadSavedData = () => {
//     try {
//       const saved = localStorage.getItem('bulletinFrancophoneData');
//       if (saved) {
//         console.log('📁 Données chargées depuis localStorage');
//         return JSON.parse(saved);
//       }
//     } catch (error) {
//       console.error('❌ Erreur chargement données:', error);
//     }
//     return null;
//   };

//   const initializeData = () => {
//     const root = {};
//     SKILLS_TEMPLATE.forEach(s => {
//       const evals = {};
//       s.evaluations.forEach(ev => (evals[ev] = { m1: "", m2: "", m3: "" }));
//       root[s.key] = { appreciation: "", evals };
//     });
//     return root;
//   };

//   // ✅ Changé : MONTH_OPTIONS -> SEQUENCE_OPTIONS
//   const [periodHeaders, setPeriodHeaders] = useState({
//     h1: SEQUENCE_OPTIONS[0], 
//     h2: SEQUENCE_OPTIONS[1], 
//     h3: SEQUENCE_OPTIONS[2]
//   });

//   const [meta, setMeta] = useState({
//     studentName: "",
//     sex: "",
//     className: "",
//     level: "",
//     term: currentTrimester,
//     year: "",
//     teacher: "",
//     student_id: studentId || null
//   });

//   const [studentPhoto, setStudentPhoto] = useState(null);
//   const [data, setData] = useState(() => initializeData());
//   const [periodInfo, setPeriodInfo] = useState({
//     pos1: "", pos2: "", pos3: "",
//     app1: "", app2: "", app3: ""
//   });
//   const [summary, setSummary] = useState({
//     overallAppreciation: "",
//     position: "",
//     decision: ""
//   });

//   const saveData = (data) => {
//     try {
//       localStorage.setItem('bulletinFrancophoneData', JSON.stringify(data));
//     } catch (error) {
//       console.error('❌ Erreur sauvegarde localStorage:', error);
//     }
//   };

//   useEffect(() => {
//     const formData = {
//       periodHeaders,
//       meta,
//       studentPhoto,
//       data,
//       periodInfo,
//       summary
//     };
//     saveData(formData);
//   }, [periodHeaders, meta, studentPhoto, data, periodInfo, summary]);

//   const saveToDatabase = async (isDraft = true) => {
//     try {
//       setSaving(true);
      
//       console.log(`🔍 Vérification studentId: ${studentId} (type: ${typeof studentId})`);
      
//       if (!studentId) {
//         console.error("❌ ERREUR CRITIQUE: studentId est null/undefined");
//         alert("❌ ERREUR : Aucun élève sélectionné.\n\nVeuillez retourner à la liste des élèves et cliquer sur 'Créer bulletin'.");
//         setSaving(false);
//         return null;
//       }

//       const totals = calculateTotals();
//       const averages = calculateAverages(totals);
//       const overallAvg = calculateOverallAverage(averages);

//       const formData = {
//         periodHeaders,
//         meta: { ...meta, student_id: studentId, term: currentTrimester },
//         studentPhoto,
//         data,
//         periodInfo,
//         summary,
//         totals,
//         averages,
//         overallAvg,
//         isDraft
//       };

//       const payload = {
//         student_id: studentId,
//         bulletin_type: 'francophone',
//         trimester: currentTrimester,
//         academic_year: meta.year || getCurrentAcademicYear(),
//         nom_eleve: meta.studentName || studentInfo?.nom_complet || "",
//         classe: meta.className || studentInfo?.class_name || "",
//         enseignant: meta.teacher || "",
//         appreciation: summary.overallAppreciation || "",
//         rang_position: summary.position || "",
//         decision: summary.decision || "",
//         data_json: JSON.stringify(formData),
//         is_draft: isDraft ? 1 : 0
//       };

//       console.log('📤 Payload envoyé à l\'API:', payload);
//       console.log('📤 Type student_id:', typeof payload.student_id);
//       console.log('📤 URL Base:', API_BASE_URL);
      
//       let url, method;
//       if (bulletinId) {
//         url = `${API_BASE_URL}/api/bulletin/${bulletinId}`;
//         method = 'PUT';
//         console.log(`🔄 Mise à jour bulletin ID: ${bulletinId} - URL: ${url}`);
//       } else {
//         url = `${API_BASE_URL}/api/bulletin/francophone`;
//         method = 'POST';
//         console.log('🆕 Création nouveau bulletin - URL:', url);
//       }

//       console.log(`📤 Envoi ${method} à: ${url}`);
//       const response = await fetch(url, {
//         method,
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const responseText = await response.text();
//       console.log(`📥 Réponse API (${response.status}):`, responseText.substring(0, 500));

//       if (!response.ok) {
//         throw new Error(`Erreur API ${response.status}: ${responseText.substring(0, 200)}`);
//       }

//       const result = JSON.parse(responseText);
//       console.log('✅ Réponse API:', result);

//       if (!bulletinId && result.id) {
//         setBulletinId(result.id);
//         setIsEditing(true);
//       }

//       if (isDraft) {
//         setIsDraftSaved(true);
//         alert('✅ Brouillon sauvegardé avec succès!');
//       } else {
//         alert('✅ Bulletin finalisé avec succès!');
//       }

//       return result;

//     } catch (error) {
//       console.error('❌ Erreur sauvegarde:', error);
//       alert(`❌ Erreur lors de la sauvegarde: ${error.message}`);
//       return null;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getCurrentAcademicYear = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     if (month >= 8) {
//       return `${year}-${year + 1}`;
//     } else {
//       return `${year - 1}-${year}`;
//     }
//   };

// // ✅ NOUVELLE VERSION - Total FIXE sur l'année
// const calculateTotals = () => {
//     let sumNotes1 = 0, sumNotes2 = 0, sumNotes3 = 0;
    
//     // On garde les SCL par séquence pour information
//     let sumSCL1 = 0, sumSCL2 = 0, sumSCL3 = 0;

//     SKILLS_TEMPLATE.forEach(skill => {
//         const skillData = data[skill.key];
        
//         if (!skillData || !skillData.evals) {
//             return;
//         }

//         skill.evaluations.forEach(ev => {
//             const evalData = skillData.evals[ev];
            
//             if (!evalData) return;

//             // Séquence 1 - on additionne les notes ET les SCL
//             if (evalData.m1 !== "" && !isNaN(evalData.m1)) {
//                 sumNotes1 += Number(evalData.m1);
//                 sumSCL1 += skill.sclValues[ev] || 0;
//             }

//             // Séquence 2
//             if (evalData.m2 !== "" && !isNaN(evalData.m2)) {
//                 sumNotes2 += Number(evalData.m2);
//                 sumSCL2 += skill.sclValues[ev] || 0;
//             }

//             // Séquence 3
//             if (evalData.m3 !== "" && !isNaN(evalData.m3)) {
//                 sumNotes3 += Number(evalData.m3);
//                 sumSCL3 += skill.sclValues[ev] || 0;
//             }
//         });
//     });

//     return {
//         // ✅ Total par séquence (dénominateur = TOTAL ANNUEL fixe)
//         t1: TOTAL_ANNUEL > 0 ? `${sumNotes1}/${TOTAL_ANNUEL}` : "0/0",
//         t2: TOTAL_ANNUEL > 0 ? `${sumNotes2}/${TOTAL_ANNUEL}` : "0/0",
//         t3: TOTAL_ANNUEL > 0 ? `${sumNotes3}/${TOTAL_ANNUEL}` : "0/0",
        
//         raw: { 
//             sumNotes1, 
//             sumNotes2, 
//             sumNotes3, 
//             sumSCL1, 
//             sumSCL2, 
//             sumSCL3,
//             totalAnnee: TOTAL_ANNUEL 
//         }
//     };
// };

// // ✅ NOUVELLE VERSION - Moyenne sur 20 basée sur le total FIXE
// const calculateAverages = (totals) => {
//     const { sumNotes1, sumNotes2, sumNotes3, totalAnnee } = totals.raw;

//     const a1 = totalAnnee > 0 ? Math.round((sumNotes1 / totalAnnee) * 20 * 100) / 100 : 0;
//     const a2 = totalAnnee > 0 ? Math.round((sumNotes2 / totalAnnee) * 20 * 100) / 100 : 0;
//     const a3 = totalAnnee > 0 ? Math.round((sumNotes3 / totalAnnee) * 20 * 100) / 100 : 0;

//     return {
//       a1: totalAnnee > 0 ? `${a1}/20` : "0/20",
//       a2: totalAnnee > 0 ? `${a2}/20` : "0/20",
//       a3: totalAnnee > 0 ? `${a3}/20` : "0/20",
//       raw: { a1, a2, a3 }
//     };
// };

//   const calculateOverallAverage = (averages) => {
//     const { a1, a2, a3 } = averages.raw;
//     const average = Math.round(((a1 + a2 + a3) / 3) * 100) / 100;
//     return `${average}/20`;
//   };

//   const totals = useMemo(() => calculateTotals(), [data]);
//   const averages = useMemo(() => calculateAverages(totals), [totals]);
//   const overallAvg = useMemo(() => calculateOverallAverage(averages), [averages]);

//   const changeHeader = (k, v) => setPeriodHeaders(p => ({ ...p, [k]: v }));
//   const changeMeta = (k, v) => setMeta(m => ({ ...m, [k]: v }));
  
//   const handlePhotoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         alert("La photo est trop volumineuse. Veuillez choisir une image de moins de 2MB.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setStudentPhoto(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const handleRemovePhoto = () => setStudentPhoto(null);
  
//   const changeNote = (skillKey, evalLabel, monthKey, value) => {
//     setData(prev => ({
//       ...prev,
//       [skillKey]: {
//         ...prev[skillKey],
//         evals: {
//           ...prev[skillKey].evals,
//           [evalLabel]: { ...prev[skillKey].evals[evalLabel], [monthKey]: value ? Number(value) : "" }
//         }
//       }
//     }));
//   };
  
//   const changeGroupApp = (skillKey, value) => {
//     setData(prev => ({ ...prev, [skillKey]: { ...prev[skillKey], appreciation: value } }));
//   };
  
//   const changePeriodInfo = (k, v) => setPeriodInfo(p => ({ ...p, [k]: v }));
//   const changeSummary = (k, v) => setSummary(s => ({ ...s, [k]: v }));

//   const handleSaveDraft = async () => {
//     console.log('💾 Sauvegarde brouillon...');
//     const result = await saveToDatabase(true);
//     if (result) {
//       console.log('✅ Brouillon sauvegardé');
//     }
//   };

//   const handleFinalize = async () => {
//     console.log('✅ Finalisation et impression...');
//     const result = await saveToDatabase(false);
//     if (result) {
//       handlePrint();
//     }
//   };

// const handlePrint = () => {
//     console.log('🖨️ Francophone');
    
//     const printData = {
//         meta: { ...meta, student_id: studentId },
//         studentPhoto,
//         periodHeaders,
//         data,
//         totals,
//         averages,
//         periodInfo,
//         overallAvg,
//         summary
//     };
    
//     localStorage.setItem('printBulletinData', JSON.stringify(printData));
    
//     if (ipcRenderer) {
//         ipcRenderer.send('print-bulletin', { type: 'francophone', data: printData });
//     } else {
//         window.open(`${window.location.origin}/#/print-bulletin-francophone`, '_blank');
//     }
// };

//   const handlePrintOnly = () => {
//     handlePrint();
//   };

//   const handleReset = () => {
//     if (confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.")) {
//       localStorage.removeItem('bulletinFrancophoneData');
//       setPeriodHeaders({ h1: SEQUENCE_OPTIONS[0], h2: SEQUENCE_OPTIONS[1], h3: SEQUENCE_OPTIONS[2] });
//       setMeta({
//         studentName: "",
//         sex: "",
//         className: "",
//         level: "",
//         term: currentTrimester,
//         year: "",
//         teacher: "",
//         student_id: studentId || null
//       });
//       setStudentPhoto(null);
//       setData(initializeData());
//       setPeriodInfo({ pos1: "", pos2: "", pos3: "", app1: "", app2: "", app3: "" });
//       setSummary({ overallAppreciation: "", position: "", decision: "" });
//       setBulletinId(null);
//       setIsEditing(false);
//       setIsDraftSaved(false);
//     }
//   };

//   const renderStudentInfo = () => {
//     if (studentInfo) {
//       return (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center gap-2">
//             <span className="text-blue-600">👤</span>
//             <span className="text-sm text-blue-700">
//               Élève: <strong>{studentInfo.nom_complet || studentInfo.full_name}</strong> 
//               {studentInfo.class_name && ` - Classe: ${studentInfo.class_name}`}
//               {studentInfo.sex && ` - Sexe: ${studentInfo.sex}`}
//               {` - Trimestre: ${currentTrimester}`}
//             </span>
//           </div>
//           {studentId && (
//             <div className="mt-2 text-xs text-gray-600">
//               ID: <code className="bg-gray-100 px-2 py-1 rounded">{studentId}</code>
//             </div>
//           )}
//         </div>
//       );
//     } else if (!studentId) {
//       return (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center gap-2">
//             <span className="text-red-600">❌</span>
//             <span className="text-sm text-red-700 font-semibold">
//               ERREUR : Aucun élève sélectionné !
//             </span>
//           </div>
//           <div className="mt-2 text-xs text-red-600">
//             Vous devez d'abord sélectionner un élève depuis la liste des élèves.
//           </div>
//           <div className="mt-3">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
//             >
//               Retour au tableau de bord
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderSaveStatus = () => {
//     if (isDraftSaved) {
//       return (
//         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center gap-2">
//             <span className="text-green-600">✅</span>
//             <span className="text-sm text-green-700">
//               Brouillon sauvegardé
//             </span>
//           </div>
//         </div>
//       );
//     }
    
//     if (bulletinId) {
//       return (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center gap-2">
//             <span className="text-blue-600">📁</span>
//             <span className="text-sm text-blue-700">
//               Bulletin chargé (ID: {bulletinId})
//             </span>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//       <div className="w-full max-w-6xl mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1">
//         <div className="flex flex-col items-center text-gray-600 text-xs print:text-xs md:flex-row md:justify-between md:items-start">
//           <div className="text-left mb-2 md:mb-0 md:w-1/3">
//             <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
//             <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
//           </div>

//           <div className="text-center md:flex-1 md:mx-2">
//             <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
//               GROUPE SCOLAIRE BILINGUE THE GRACE OF GOD
//             </div>
//             <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
//               BULLETIN SCOLAIRE
//             </div>
//           </div>

//           <div className="text-right mt-2 md:mt-0 md:w-1/3">
//             <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
//             <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
//             <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
//         {renderStudentInfo()}
//         {renderSaveStatus()}

//         <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
//           <div className="flex-shrink-0 flex flex-col items-center">
//             <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3 relative bg-gray-50">
//               {studentPhoto ? (
//                 <>
//                   <img
//                     src={studentPhoto}
//                     alt="Student"
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <button
//                     onClick={handleRemovePhoto}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
//                     type="button"
//                   >
//                     ×
//                   </button>
//                 </>
//               ) : (
//                 <div className="text-center text-gray-400">
//                   <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-xs">Aucune photo</span>
//                 </div>
//               )}
//             </div>

//             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <span>Ajouter Photo</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="hidden"
//               />
//             </label>
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               Cliquez pour sélectionner une photo
//             </p>
//           </div>

//           <div className="flex-1">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               <input 
//                 className="border px-3 py-2 rounded" 
//                 placeholder="Nom complet" 
//                 value={meta.studentName} 
//                 onChange={(e) => changeMeta("studentName", e.target.value)} 
//                 disabled={!!studentInfo}
//               />
//               <select 
//                 className="border px-3 py-2 rounded" 
//                 value={meta.className} 
//                 onChange={e => changeMeta("className", e.target.value)}
//                 disabled={!!studentInfo}
//               >
//                 <option value="">Classe</option>
//                 <option>SIL</option><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option>
//                 <option>Class 1</option><option>Class 2</option><option>Class 3</option><option>Class 4</option><option>Class 5</option><option>Class 6</option>
//               </select>

//               <select className="border px-3 py-2 rounded" value={meta.level} onChange={e => changeMeta("level", e.target.value)}>
//                 <option value="">Niveau</option>
//                 <option>Niveau 1</option><option>Niveau 2</option><option>Niveau 3</option><option>Niveau 4</option><option>Niveau 5</option><option>Niveau 6</option>
//               </select>

//               <select className="border px-3 py-2 rounded" value={meta.term} onChange={e => changeMeta("term", e.target.value)}>
//                 <option value="">Trimestre</option>
//                 <option>Trimestre 1</option><option>Trimestre 2</option><option>Trimestre 3</option>
//                 <option>Term 1</option><option>Term 2</option><option>Term 3</option>
//               </select>

//               <select className="border px-3 py-2 rounded" value={meta.year} onChange={e => changeMeta("year", e.target.value)}>
//                 <option value="">Année scolaire</option>
//                 {Array.from({ length: 27 }, (_, i) => 2024 + i).map(y => <option key={y}>{y}-{y + 1}</option>)}
//               </select>

//               <input className="border px-3 py-2 rounded md:col-span-3" placeholder="Enseignant" value={meta.teacher} onChange={e => changeMeta("teacher", e.target.value)} />
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 w-80">Compétences</th>
//                 <th className="border p-2 w-96">Description</th>
//                 <th className="border p-2 text-center w-20">Évaluation</th>
//                 <th className="border p-2 text-center w-14">SCL</th>
//                 <th className="border p-2 text-center w-24">
//                   <select className="text-xs" value={periodHeaders.h1} onChange={(e) => changeHeader("h1", e.target.value)}>
//                     {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                   </select>
//                   {/* <div className="text-[9px] text-gray-500">Séquence 1</div> */}
//                 </th>
//                 <th className="border p-2 text-center w-24">
//                   <select className="text-xs" value={periodHeaders.h2} onChange={(e) => changeHeader("h2", e.target.value)}>
//                     {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                   </select>
//                   {/* <div className="text-[9px] text-gray-500">Séquence 2</div> */}
//                 </th>
//                 <th className="border p-2 text-center w-24">
//                   <select className="text-xs" value={periodHeaders.h3} onChange={(e) => changeHeader("h3", e.target.value)}>
//                     {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                   </select>
//                   {/* <div className="text-[9px] text-gray-500">Séquence 3</div> */}
//                 </th>
//                 <th className="border p-2 text-center w-28">Appréciation</th>
//               </tr>
//             </thead>

//             <tbody>
//               {SKILLS_TEMPLATE.map(skill => {
//                 const state = data[skill.key];
//                 return (
//                   <React.Fragment key={skill.key}>
//                     {skill.evaluations.map((ev, i) => {
//                         const evalData = state?.evals?.[ev];
                        
//                         return (
//                             <tr key={ev + i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                 {i === 0 && (
//                                     <td className="border p-2 align-top font-semibold" rowSpan={skill.evaluations.length}>
//                                         <div className="text-sm">{skill.title}</div>
//                                     </td>
//                                 )}
//                                 {i === 0 && (
//                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                         <div className="text-xs text-gray-600">{skill.description}</div>
//                                     </td>
//                                 )}

//                                 <td className="border p-2 text-center align-top">{ev}</td>
//                                 <td className="border p-2 text-center align-top">{skill.sclValues?.[ev] || "-"}</td>

//                                 {/* Séquence 1 */}
//                                 <td className="border p-1 text-center">
//                                     <select 
//                                         className="w-full text-xs p-1" 
//                                         value={evalData?.m1 || ""} 
//                                         onChange={(e) => changeNote(skill.key, ev, "m1", e.target.value)}
//                                     >
//                                         <option value="">-</option>
//                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                     </select>
//                                 </td>

//                                 {/* Séquence 2 */}
//                                 <td className="border p-1 text-center">
//                                     <select 
//                                         className="w-full text-xs p-1" 
//                                         value={evalData?.m2 || ""} 
//                                         onChange={(e) => changeNote(skill.key, ev, "m2", e.target.value)}
//                                     >
//                                         <option value="">-</option>
//                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                     </select>
//                                 </td>

//                                 {/* Séquence 3 */}
//                                 <td className="border p-1 text-center">
//                                     <select 
//                                         className="w-full text-xs p-1" 
//                                         value={evalData?.m3 || ""} 
//                                         onChange={(e) => changeNote(skill.key, ev, "m3", e.target.value)}
//                                     >
//                                         <option value="">-</option>
//                                         {NOTE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
//                                     </select>
//                                 </td>

//                                 {i === 0 && (
//                                     <td className="border p-2 align-top" rowSpan={skill.evaluations.length}>
//                                         <select 
//                                             className="w-full text-sm p-1" 
//                                             value={state?.appreciation || ""} 
//                                             onChange={(e) => changeGroupApp(skill.key, e.target.value)}
//                                         >
//                                             <option value="">-</option>
//                                             {APPRECIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
//                                         </select>
//                                     </td>
//                                 )}
//                             </tr>
//                         );
//                     })}
//                   </React.Fragment>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="border rounded p-4 text-xs">
//             <div className="font-semibold mb-2">Légende des Appréciations</div>
//             <ul className="list-disc ml-5">
//               <li><strong>Acquis</strong> — L'élève a maîtrisé la compétence.</li>
//               <li><strong>En cours d'acquisition</strong> — En progression mais pas encore maîtrisé.</li>
//               <li><strong>Expert</strong> — Performance au-dessus des attentes.</li>
//               <li><strong>Non acquis</strong> — Compétence non encore acquise.</li>
//             </ul>
//           </div>

//           <div className="border rounded p-4 text-sm">
//             <div className="font-semibold mb-2">Périodes</div>

//             <div className="grid grid-cols-3 gap-2 text-xs mb-3">
//               <div>
//                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h1} onChange={e => changeHeader("h1", e.target.value)}>
//                   {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h2} onChange={e => changeHeader("h2", e.target.value)}>
//                   {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <select className="w-full border px-2 py-1 rounded text-sm" value={periodHeaders.h3} onChange={e => changeHeader("h3", e.target.value)}>
//                   {SEQUENCE_OPTIONS.map(m => <option key={m}>{m}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//               <div className="text-center">
//                 <div className="text-gray-600">Total sequence</div>
//                 <div className="font-semibold mt-1">{totals.t1}</div>
//                 <div className="text-xs text-gray-400">Total: {TOTAL_ANNUEL} pts</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Total sequence</div>
//                 <div className="font-semibold mt-1">{totals.t2}</div>
//                 <div className="text-xs text-gray-400">Total: {TOTAL_ANNUEL} pts</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Total sequence</div>
//                 <div className="font-semibold mt-1">{totals.t3}</div>
//                 <div className="text-xs text-gray-400">Total: {TOTAL_ANNUEL} pts</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-2 text-xs items-center mb-2">
//               <div className="text-center">
//                 <div className="text-gray-600">Moyenne (/20)</div>
//                 <div className="font-semibold mt-1">{averages.a1}</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Moyenne (/20)</div>
//                 <div className="font-semibold mt-1">{averages.a2}</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Moyenne (/20)</div>
//                 <div className="font-semibold mt-1">{averages.a3}</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-2 text-xs">
//               <div className="text-center">
//                 <div className="text-gray-600">Appréciation</div>
//                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app1} onChange={(e) => changePeriodInfo("app1", e.target.value)}>
//                   <option value="">-</option>
//                   {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                 </select>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Appréciation</div>
//                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app2} onChange={(e) => changePeriodInfo("app2", e.target.value)}>
//                   <option value="">-</option>
//                   {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                 </select>
//               </div>
//               <div className="text-center">
//                 <div className="text-gray-600">Appréciation</div>
//                 <select className="mt-1 w-full border px-2 py-1 rounded text-sm" value={periodInfo.app3} onChange={(e) => changePeriodInfo("app3", e.target.value)}>
//                   <option value="">-</option>
//                   {MONTH_APPRECIATIONS.map(a => <option key={a}>{a}</option>)}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//             <div className="font-bold text-base mb-3 text-center text-gray-800">Résumé</div>
//             <div className="space-y-3">
//               <div className="text-center">
//                 <div className="text-xs text-gray-600 mb-1">Moyenne Générale</div>
//                 <div className="text-lg font-bold text-blue-700">{overallAvg}</div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium mb-1">Appréciation</div>
//                 <select
//                   className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                   value={summary.overallAppreciation}
//                   onChange={(e) => changeSummary("overallAppreciation", e.target.value)}
//                 >
//                   <option value="">- Sélectionner -</option>
//                   <option>Non acquis</option>
//                   <option>En cours d'acquisition</option>
//                   <option>Acquis</option>
//                   <option>Expert</option>
//                 </select>
//               </div>
//               <div>
//                 <div className="text-xs font-medium mb-1">Rang / Position</div>
//                 <input
//                   className="w-full text-center border border-gray-300 px-2 py-1 rounded text-sm"
//                   value={summary.position}
//                   onChange={(e) => changeSummary("position", e.target.value)}
//                   placeholder="Ex: 5ème/30"
//                 />
//               </div>
//               <div>
//                 <div className="text-xs font-medium mb-1">Décision</div>
//                 <select
//                   className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
//                   value={summary.decision}
//                   onChange={(e) => changeSummary("decision", e.target.value)}
//                 >
//                   <option value="">- Sélectionner -</option>
//                   <option>A réussi</option>
//                   <option>A échoué</option>
//                   <option>Admis</option>
//                   <option>Ajourné</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//             <div className="font-bold text-base mb-3 text-center text-gray-800">Visa de l'Enseignant</div>
//           </div>

//           <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//             <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Directeur</div>
//           </div>

//           <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm">
//             <div className="font-bold text-base mb-3 text-center text-gray-800">Visa du Parent</div>
//           </div>
//         </div>

//         <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
//           <div className="receipt-footer">
//             <div>
//               <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
//               <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
//             </div>
//             <div>
//               <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 mt-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
//           >
//             ← Retour
//           </button>

//           <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
//             <button
//               onClick={handlePrintOnly}
//               disabled={!studentId}
//               className="w-full xs:w-auto px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               🖨️ Imprimer
//             </button>
            
//             <button
//               onClick={handleReset}
//               className="w-full xs:w-auto px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
//             >
//               Réinitialiser
//             </button>
            
//             <button
//               onClick={handleSaveDraft}
//               disabled={saving || !studentId}
//               className="w-full xs:w-auto px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? 'Sauvegarde...' : 'Sauvegarder Brouillon'}
//             </button>
            
//             <button
//               onClick={handleFinalize}
//               disabled={saving || !studentId}
//               className="w-full xs:w-auto px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? 'Sauvegarde...' : '✅ Finaliser'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }