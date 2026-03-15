

// frontend/src/pages/StudentList.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer } from 'lucide-react';

// Fonction pour obtenir l'année scolaire courante
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

const StudentList = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [classe, setClasse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        first_name: '',
        last_name: '',
        matricule: '',
        class_id: classId,
        sex: '',
        academic_year: getCurrentAcademicYear(),
        photo_file: null,
        photo_preview: null
    });
    const [uploading, setUploading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [currentAcademicYear, setCurrentAcademicYear] = useState(getCurrentAcademicYear());
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchAcademicYear = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/academic-year/current');
                if (response.ok) {
                    const data = await response.json();
                    setCurrentAcademicYear(data.academic_year);
                    setNewStudent(prev => ({
                        ...prev,
                        academic_year: data.academic_year
                    }));
                }
            } catch (error) {
                console.warn('Impossible de récupérer l\'année du serveur:', error);
                setCurrentAcademicYear(getCurrentAcademicYear());
            }
        };
        
        fetchAcademicYear();
        fetchStudents();
    }, [classId]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`http://localhost:3000/api/class/${classId}/students`);
            if (!response.ok) throw new Error('Erreur de chargement des élèves');
            const studentsData = await response.json();
            setStudents(studentsData);
            
            if (studentsData.length > 0) {
                setClasse({
                    name: studentsData[0].class_display_name || studentsData[0].class_name,
                    section: studentsData[0].section,
                    cycle: studentsData[0].cycle,
                    class_id: classId
                });
            } else {
                try {
                    const classRes = await fetch(`http://localhost:3000/api/classes/${classId}`);
                    if (classRes.ok) {
                        const classData = await classRes.json();
                        setClasse({
                            name: classData.display_name || classData.name,
                            section: classData.section,
                            cycle: classData.cycle,
                            class_id: classId
                        });
                    }
                } catch (classError) {
                    console.warn('Impossible de charger les infos de la classe:', classError);
                }
            }
            
        } catch (error) {
            console.error('Erreur chargement élèves:', error);
            setError('Failed to fetch');
        } finally {
            setLoading(false);
        }
    };

    // ===== FONCTION D'IMPRESSION =====
    const handlePrintList = () => {
        const className = classe?.name || 'Classe';
        const section = classe?.section || '';
        
        // Créer une fenêtre d'impression
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Veuillez autoriser les popups pour imprimer');
            return;
        }
        
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Liste des élèves - ${className}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Inter', sans-serif;
                    }
                    
                    body {
                        margin: 20px;
                        color: #333;
                        background: #fff;
                    }
                    
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #2563eb;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                        color: #1e40af;
                        margin: 10px 0 5px 0;
                        font-weight: 700;
                    }
                    
                    .header h2 {
                        font-size: 20px;
                        color: #3b82f6;
                        margin: 5px 0 15px 0;
                        font-weight: 600;
                    }
                    
                    .info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 25px;
                        padding: 15px;
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                        border-radius: 10px;
                        border-left: 4px solid #3b82f6;
                    }
                    
                    .stats {
                        font-weight: 600;
                        color: #1e40af;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    
                    th {
                        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                        color: white;
                        padding: 12px 15px;
                        text-align: left;
                        font-weight: 600;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    td {
                        padding: 12px 15px;
                        border-bottom: 1px solid #e5e7eb;
                        font-size: 13px;
                    }
                    
                    tr:nth-child(even) {
                        background: #f8fafc;
                    }
                    
                    tr:hover {
                        background: #f1f5f9;
                    }
                    
                    .total {
                        font-weight: 700;
                        background: #eff6ff;
                        color: #1e40af;
                    }
                    
                    .photo-cell {
                        width: 80px;
                        text-align: center;
                    }
                    
                    .student-photo {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 2px solid #e5e7eb;
                    }
                    
                    .no-print {
                        display: none;
                    }
                    
                    .logo-section {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        margin-bottom: 15px;
                    }
                    
                    .logo-text {
                        font-size: 11px;
                        color: #6b7280;
                        max-width: 300px;
                    }
                    
                    .date-info {
                        font-size: 13px;
                        color: #4b5563;
                        background: #f3f4f6;
                        padding: 8px 12px;
                        border-radius: 6px;
                    }
                    
                    .serial-number {
                        width: 50px;
                        text-align: center;
                        font-weight: 600;
                        color: #4b5563;
                    }
                    
                    @media print {
                        @page {
                            size: A4 portrait;
                            margin: 0.5cm;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-size: 12px;
                        }
                        .print-container {
                            width: 100%;
                        }
                        table {
                            page-break-inside: avoid;
                        }
                        button {
                            display: none !important;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                    
                    @page {
                        margin: 0.5cm;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo-section">
                        <div class="logo-text">
                            <div style="font-weight: 700; font-size: 14px; color: #1e40af;">RÉPUBLIQUE DU CAMEROUN</div>
                            <div style="font-size: 12px;">Paix-Travail-Patrie</div>
                            <div style="font-size: 12px;">Ministère de l'Éducation de base</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: 800; font-size: 16px; color: #dc2626;">GROUPE SCOLAIRE BILINGUE</div>
                            <div style="font-weight: 700; font-size: 18px; color: #1e40af;">THE GRACE OF GOD</div>
                        </div>
                        <div class="logo-text" style="text-align: right;">
                            <div style="font-weight: 700; font-size: 14px; color: #1e40af;">REPUBLIC OF CAMEROON</div>
                            <div style="font-size: 12px;">Peace-Work-Fatherland</div>
                            <div style="font-size: 12px;">Ministry of Basic Education</div>
                        </div>
                    </div>
                    
                    <h1>LISTE DES ÉLÈVES</h1>
                    <h2>${className} - Année Scolaire: ${currentAcademicYear}</h2>
                </div>
                
                <div class="info">
                    <div class="stats">
                        <p>📊 Total élèves: <strong style="font-size: 18px;">${students.length}</strong></p>
                        <p style="margin-top: 5px;">🏫 Classe: ${className}</p>
                        ${section ? `<p>🏷️ Section: ${section}</p>` : ''}
                    </div>
                    <div class="date-info">
                        <p>📅 Date: ${new Date().toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                        <p style="margin-top: 5px;">🕐 Heure: ${new Date().toLocaleTimeString('fr-FR')}</p>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th class="serial-number">N°</th>
                            <th class="photo-cell">Photo</th>
                            <th>Nom Complet</th>
                            <th>Matricule</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.map((student, index) => {
                            const photoUrl = student.photo_path ? 
                                'http://localhost:3000/' + student.photo_path : 
                                null;
                            
                            return `
                                <tr>
                                    <td class="serial-number">${index + 1}</td>
                                    <td class="photo-cell">
                                        ${photoUrl ? 
                                            '<img src="' + photoUrl + '" alt="' + student.full_name + '" class="student-photo" onerror="this.style.display=\'none\'; this.parentElement.innerHTML=\'👤\';">' : 
                                            '👤'
                                        }
                                    </td>
                                    <td style="font-weight: 500;">${student.full_name || student.nom_complet || 'N/A'}</td>
                                    <td><code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${student.matricule || 'Non assigné'}</code></td>
                                </tr>
                            `;
                        }).join('')}
                        <tr class="total">
                            <td colspan="4" style="text-align: center; padding: 15px;">
                                <strong>Total: ${students.length} élèves</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
                    <p>Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
                    <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
                    <p style="margin-top: 10px; font-style: italic;">Document généré automatiquement le ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div class="no-print" style="margin-top: 40px; text-align: center; padding: 20px;">
                    <button onclick="window.print()" style="
                        padding: 12px 24px;
                        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 14px;
                        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 8px rgba(59, 130, 246, 0.4)';" 
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(59, 130, 246, 0.3)';">
                        🖨️ Imprimer la Liste
                    </button>
                    <button onclick="window.close()" style="
                        padding: 12px 24px;
                        background: #6b7280;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 14px;
                        margin-left: 10px;
                        transition: background 0.3s ease;
                    " onmouseover="this.style.background='#4b5563';" onmouseout="this.style.background='#6b7280';">
                        ✕ Fermer
                    </button>
                </div>
                
                <script>
                    window.onload = function() {
                        // Ajouter un délai pour permettre le chargement des photos
                        setTimeout(() => {
                            window.print();
                        }, 1000);
                    };
                    
                    // Fermer après impression si l'utilisateur le souhaite
                    window.onafterprint = function() {
                        if (confirm('Voulez-vous fermer cette fenêtre ?')) {
                            window.close();
                        }
                    };
                </script>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    const handleStudentClick = (studentId) => {
        navigate(`/student/${studentId}/dashboard`);
    };



const handleCreateBulletin = (studentId, student, e) => {
    e.stopPropagation();
    
    const section = student.section?.toLowerCase() || '';
    const className = student.class_name?.toLowerCase() || '';
    const cycle = student.cycle?.toLowerCase() || '';
    
    // Déterminer le niveau UNIQUEMENT pour le primaire
    let niveau = '1';
    
    if (section.includes('francophone') && cycle.includes('primaire')) {
        if (className.includes('sil') || className.includes('cp')) {
            niveau = '1';
        } else {
            niveau = '2';
        }
    } else if (section.includes('anglophone') && cycle.includes('primary')) {
        if (className.includes('class 1') || className.includes('class 2')) {
            niveau = '1';
        } else {
            niveau = '2';
        }
    }
    
    let path;
    
    // CAS SPÉCIAUX
    if (cycle.includes('maternelle')) {
        path = `/bulletin/maternelle/${studentId}`;
    } else if (cycle.includes('nursery')) {
        path = `/bulletin/new-nursery/${studentId}`;
    }
    // CAS PRIMAIRE
    else if (section.includes('francophone') && cycle.includes('primaire')) {
        path = `/bulletin/francophone/niveau${niveau}/${studentId}`;
    } else if (section.includes('anglophone') && cycle.includes('primary')) {
        path = `/bulletin/anglophone/level${niveau}/${studentId}`;
    }
    // FALLBACK
    else {
        path = `/bulletin-form/${studentId}`;
    }
    
    navigate(path, {
        state: { 
            studentId: studentId,
            fromStudentList: true 
        }
    });
};



    const handleViewBulletins = (studentId, e) => {
        e.stopPropagation();
        navigate(`/student/${studentId}/bulletins`);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('La photo ne doit pas dépasser 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner une image');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setNewStudent({
                    ...newStudent,
                    photo_file: file,
                    photo_preview: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddStudent = async () => {
        try {
            if (!newStudent.first_name.trim() || !newStudent.last_name.trim()) {
                alert('Le prénom et le nom de famille sont requis');
                return;
            }

            setUploading(true);
            
            // 1. Uploader la photo si elle existe
            let photoPath = '';
            if (newStudent.photo_file) {
                setUploadingPhoto(true);
                const formData = new FormData();
                formData.append('photo', newStudent.photo_file);
                
                console.log('📸 Upload de la photo...');
                
                const uploadResponse = await fetch('http://localhost:3000/api/upload/student-photo', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(`Erreur upload photo: ${errorData.error || 'Erreur inconnue'}`);
                }

                const uploadData = await uploadResponse.json();
                console.log('📸 Réponse upload:', uploadData);
                
                photoPath = uploadData.photo_path;
                console.log(`📸 Chemin temporaire: ${photoPath}`);
                setUploadingPhoto(false);
            }

            // 2. Ajouter l'élève avec le chemin temporaire
            const studentData = {
                first_name: newStudent.first_name.trim(),
                last_name: newStudent.last_name.trim(),
                matricule: newStudent.matricule.trim() || undefined,
                class_id: newStudent.class_id,
                sex: newStudent.sex.trim() || undefined,
                photo_path: photoPath,
                academic_year: newStudent.academic_year
            };

            console.log('📝 Données envoyées pour élève:', studentData);
            
            const response = await fetch('http://localhost:3000/api/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData)
            });

            const responseData = await response.json();
            console.log('📝 Réponse ajout élève:', responseData);
            
            if (response.ok) {
                const fullName = `${newStudent.first_name} ${newStudent.last_name}`;
                alert(`✅ Élève ${fullName} ajouté avec succès`);
                setShowAddModal(false);
                resetForm();
                fetchStudents();
            } else {
                alert(`❌ Erreur: ${responseData.error || 'Échec de l\'ajout'}`);
            }
        } catch (error) {
            console.error('❌ Erreur ajout élève:', error);
            alert(`Erreur: ${error.message}`);
        } finally {
            setUploading(false);
            setUploadingPhoto(false);
        }
    };

    const resetForm = () => {
        setNewStudent({
            first_name: '',
            last_name: '',
            matricule: '',
            class_id: classId,
            sex: '',
            academic_year: currentAcademicYear,
            photo_file: null,
            photo_preview: null
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteStudent = async (studentId, studentName, e) => {
        e.stopPropagation();
        if (!window.confirm(`Supprimer définitivement ${studentName} ?`)) return;

        try {
            const response = await fetch(`http://localhost:3000/api/student/${studentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('🗑️ Élève supprimé avec succès');
                fetchStudents();
            } else {
                const errorData = await response.json();
                alert(`❌ Erreur: ${errorData.error || 'Échec de la suppression'}`);
            }
        } catch (error) {
            console.error('Erreur suppression:', error);
            alert('Erreur réseau');
        }
    };

    const loadImage = (photoPath) => {
        if (!photoPath) return null;
        console.log('📸 Chargement photo:', photoPath);
        return `http://localhost:3000/${photoPath}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des élèves...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-6">
                <div className="max-w-7xl mx-auto text-center py-12">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={fetchStudents}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            🔄 Réessayer
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            ← Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>←</span> Retour aux classes
                    </button>
                    
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {classe?.name || 'Classe'}
                                </h1>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {students.length} élève{students.length > 1 ? 's' : ''}
                                    </span>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                        Année: {currentAcademicYear}
                                    </span>
                                    {classe?.section && (
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            Section: {classe.section}
                                        </span>
                                    )}
                                    {classe?.cycle && (
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                            Cycle: {classe.cycle}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {/* BOUTON D'IMPRESSION */}
                                <button
                                    onClick={handlePrintList}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                                    title="Imprimer la liste des élèves"
                                >
                                    <Printer size={18} />
                                    Imprimer
                                </button>
                                
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                >
                                    <span>+</span> Ajouter un élève
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Liste élèves */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 border border-gray-100 group"
                            onClick={() => handleStudentClick(student.id)}
                        >
                            {/* Photo */}
                            <div className="flex flex-col justify-center items-center h-45 bg-gray-100 rounded-t-xl overflow-hidden relative">
                                {student.photo_path ? (
                                    <img
                                        src={loadImage(student.photo_path)}
                                        alt={student.full_name}
                                        className="w-30 h-30 flex flex-col justify-center items-center rounded-xl object-cover transition-transform group-hover:scale-105 duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = e.target.parentElement.querySelector('.photo-fallback');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                
                                <div className={`photo-fallback w-full h-full flex items-center justify-center bg-gray-100 ${student.photo_path ? 'hidden' : 'flex'}`}>
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-1 text-xs bg-black bg-opacity-70 text-white rounded-full font-medium">
                                        {student.matricule?.substring(0, 6) || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Info élève */}
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                                    {student.full_name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {student.class_display_name || student.class_name}
                                </p>
                                
                                <div className="flex flex-col gap-2 mb-4">
                                    {student.date_of_birth && (
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            {new Date(student.date_of_birth).getFullYear()}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <button 
                                        onClick={(e) => handleDeleteStudent(student.id, student.full_name, e)}
                                        className="px-3 py-1.5 bg-red-400 text-red-700 text-sm rounded-lg hover:bg-green-400 flex items-center gap-1 transition-colors"
                                        title="Supprimer"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message si vide */}
                {students.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow">
                        <div className="text-5xl mb-4 text-gray-400">👤</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Aucun élève dans cette classe
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Ajoutez le premier élève pour commencer
                        </p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            + Ajouter le premier élève
                        </button>
                    </div>
                )}
            </div>

            {/* Modal d'ajout d'élève AVEC PHOTO */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Ajouter un nouvel élève</h3>
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Photo de profil */}
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                            {newStudent.photo_preview ? (
                                                <img 
                                                    src={newStudent.photo_preview} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {uploadingPhoto && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                        className="hidden"
                                        id="photo-upload"
                                    />
                                    <label
                                        htmlFor="photo-upload"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                    >
                                        📷 {newStudent.photo_preview ? 'Changer la photo' : 'Ajouter une photo'}
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        PNG, JPG (max 5MB)
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Champ Prénom */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Prénom *
                                        </label>
                                        <input
                                            type="text"
                                            value={newStudent.first_name}
                                            onChange={(e) => setNewStudent({...newStudent, first_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Prénom"
                                            required
                                        />
                                    </div>
                                    
                                    {/* Champ Nom */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom de famille *
                                        </label>
                                        <input
                                            type="text"
                                            value={newStudent.last_name}
                                            onChange={(e) => setNewStudent({...newStudent, last_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nom de famille"
                                            required
                                        />
                                    </div>
                                    
                                    {/* Genre */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Genre (optionnel)
                                        </label>
                                        <select
                                            value={newStudent.sex}
                                            onChange={(e) => setNewStudent({...newStudent, sex: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Féminin">Féminin</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    
                                    {/* Matricule */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Matricule (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            value={newStudent.matricule}
                                            onChange={(e) => setNewStudent({...newStudent, matricule: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Généré automatiquement si vide"
                                        />
                                    </div>
                                    
                                    {/* Classe (lecture seule) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Classe
                                        </label>
                                        <input
                                            type="text"
                                            value={classe?.name || ''}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    
                                    {/* Année scolaire (lecture seule) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Année scolaire
                                        </label>
                                        <input
                                            type="text"
                                            value={newStudent.academic_year}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    disabled={uploading}
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAddStudent}
                                    disabled={uploading || !newStudent.first_name.trim() || !newStudent.last_name.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Ajout en cours...
                                        </>
                                    ) : (
                                        'Ajouter l\'élève'
                                    )}
                                </button>
                            </div>
                            
                            {/* Info aide */}
                            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Note :</strong> Le nom complet sera généré automatiquement : 
                                    "<span className="font-semibold">{newStudent.first_name.trim()} {newStudent.last_name.trim()}</span>"
                                </p>
                                <p className="text-sm text-blue-700">
                                    <strong>Photo :</strong> Sauvegardée dans <code>ecole details/{classe?.name}/</code>
                                </p>
                                {newStudent.photo_file && (
                                    <p className="text-sm text-green-700 mt-1">
                                        ✅ Photo prête à être sauvegardée
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;