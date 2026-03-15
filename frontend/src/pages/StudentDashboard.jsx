

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000';

const StudentDashboard = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [bulletins, setBulletins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (studentId) {
            fetchStudentData();
        }
    }, [studentId]);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            
            const studentRes = await fetch(`${API_BASE_URL}/api/student/${studentId}`);
            if (!studentRes.ok) throw new Error('Élève non trouvé');
            const studentData = await studentRes.json();
            setStudent(studentData);

            const bulletinsRes = await fetch(`${API_BASE_URL}/api/student/${studentId}/bulletins`);
            if (bulletinsRes.ok) {
                const bulletinsData = await bulletinsRes.json();
                setBulletins(bulletinsData);
            }
            
        } catch (error) {
            console.error('Erreur chargement données élève:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBulletin = async (bulletinId, bulletinName) => {
        if (!window.confirm(`Supprimer définitivement le bulletin "${bulletinName}" ?\n\nCette action est irréversible.`)) {
            return;
        }

        try {
            setDeleting(bulletinId);
            
            const response = await fetch(`${API_BASE_URL}/api/bulletin/${bulletinId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const responseText = await response.text();
            console.log('Réponse suppression:', response.status, responseText);
            
            if (response.ok) {
                setBulletins(prev => prev.filter(b => b.id !== bulletinId));
                alert('✅ Bulletin supprimé avec succès');
                fetchStudentData();
            } else {
                throw new Error(`Erreur ${response.status}: ${responseText}`);
            }
        } catch (error) {
            console.error('Erreur suppression bulletin:', error);
            alert(`❌ Erreur lors de la suppression: ${error.message}`);
        } finally {
            setDeleting(null);
        }
    };


    // FONCTION CORRIGÉE - PRIORITÉ À NURSERY
    const getBulletinType = (studentInfo) => {
        if (!studentInfo?.section && !studentInfo?.class_name) return 'anglophone';
        
        const section = studentInfo.section?.toLowerCase() || '';
        const className = studentInfo.class_name?.toLowerCase() || '';
        
        // 👉 1. PRIORITÉ ABSOLUE : Vérifier si c'est NURSERY
        if (className.includes('nursery') || section.includes('nursery')) {
            console.log('🎯 NURSERY DÉTECTÉ - Utilisation de new-nursery');
            return 'new-nursery';
        }
        
        // 👉 2. Ensuite vérifier les autres sections
        if (section.includes('anglophone')) {
            return 'anglophone';
        } else if (section.includes('francophone')) {
            // Vérifier si c'est maternelle dans francophone
            if (className.includes('maternelle') || className.includes('petite') || 
                className.includes('moyenne') || className.includes('grande')) {
                return 'maternelle';
            }
            return 'francophone';
        } else if (section.includes('maternelle')) {
            return 'maternelle';
        }
        
        // 👉 3. Par défaut
        return 'anglophone';
    };


const handleCreateBulletin = (trimestre) => {
    if (!student) return;
    
    const section = student.section?.toLowerCase() || '';
    const className = student.class_name?.toLowerCase() || '';
    const cycle = student.cycle?.toLowerCase() || '';
    
    // DÉTERMINER LE NIVEAU UNIQUEMENT POUR LE PRIMAIRE
    let niveau = '1';
    
    // 🔵 FRANCOPHONE - UNIQUEMENT pour le cycle primaire
    if (section.includes('francophone') && cycle.includes('primaire')) {
        if (className.includes('sil') || className.includes('cp')) {
            niveau = '1';
        } else {
            niveau = '2'; // CEI, CEII, CM1, CM2
        }
    } 
    // 🟢 ANGLOPHONE - UNIQUEMENT pour le cycle primary
    else if (section.includes('anglophone') && cycle.includes('primary')) {
        if (className.includes('class 1') || className.includes('class 2')) {
            niveau = '1';
        } else {
            niveau = '2'; // Class 3,4,5,6
        }
    }
    
    // Construction du chemin
    let path;
    
    // CAS SPÉCIAUX (maternelle, nursery) - à traiter en premier
    if (cycle.includes('maternelle')) {
        path = `/bulletin/maternelle/${student.id}`;
    } else if (cycle.includes('nursery')) {
        path = `/bulletin/new-nursery/${student.id}`;
    }
    // CAS PRIMAIRE avec niveaux
    else if (section.includes('francophone') && cycle.includes('primaire')) {
        path = `/bulletin/francophone/niveau${niveau}/${student.id}`;
    } else if (section.includes('anglophone') && cycle.includes('primary')) {
        path = `/bulletin/anglophone/level${niveau}/${student.id}`;
    }
    // FALLBACK
    else {
        const bulletinType = getBulletinType(student);
        path = `/bulletin/${bulletinType}/${student.id}`;
    }
    
    console.log('📝 Création bulletin:', { path, niveau, trimestre, className, cycle });
    
    navigate(path, {
        state: {
            studentId: student.id,
            studentName: student.full_name,
            className: student.class_name || student.class_display_name,
            trimestre: trimestre,
            section: student.section,
            cycle: student.cycle,
            niveau: niveau
        }
    });
};






    const handleCreateAnnualBulletin = () => {
        if (!student) return;
        
        const section = student.section?.toLowerCase() || '';
        
        if (section.includes('anglophone')) {
            navigate(`/bulletin/annual/anglophone/${studentId}`, {
                state: {
                    studentId: student.id,
                    studentName: student.full_name,
                    className: student.class_name || student.class_display_name,
                    section: student.section
                }
            });
        } else {
            navigate(`/bulletin/annual/francophone/${studentId}`, {
                state: {
                    studentId: student.id,
                    studentName: student.full_name,
                    className: student.class_name || student.class_display_name,
                    section: student.section
                }
            });
        }
    };

    const hasBulletinForTrimester = (trimestre) => {
        return bulletins.some(b => {
            if (trimestre === 'annuel') {
                return b.bulletin_type?.includes('annual') || b.bulletin_type?.includes('annuel');
            }
            return b.trimester === trimestre;
        });
    };

    const getBulletinIdForTrimester = (trimestre) => {
        const bulletin = bulletins.find(b => {
            if (trimestre === 'annuel') {
                return b.bulletin_type?.includes('annual') || b.bulletin_type?.includes('annuel');
            }
            return b.trimester === trimestre;
        });
        return bulletin?.id;
    };
    
const handleContinueBulletin = (trimestre) => {
    const bulletinId = getBulletinIdForTrimester(trimestre);
    if (!bulletinId || !student) return;
    
    const section = student.section?.toLowerCase() || '';
    const className = student.class_name?.toLowerCase() || '';
    const cycle = student.cycle?.toLowerCase() || '';
    
    // Même logique - uniquement pour le primaire
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
        path = `/bulletin/maternelle/${student.id}`;
    } else if (cycle.includes('nursery')) {
        path = `/bulletin/new-nursery/${student.id}`;
    }
    // CAS PRIMAIRE
    else if (section.includes('francophone') && cycle.includes('primaire')) {
        path = `/bulletin/francophone/niveau${niveau}/${student.id}`;
    } else if (section.includes('anglophone') && cycle.includes('primary')) {
        path = `/bulletin/anglophone/level${niveau}/${student.id}`;
    } else {
        const bulletinType = getBulletinType(student);
        path = `/bulletin/${bulletinType}/${student.id}`;
    }
    
    navigate(path, {
        state: {
            bulletinId: bulletinId,
            studentId: student.id,
            studentName: student.full_name,
            className: student.class_name || student.class_display_name,
            trimestre: trimestre,
            section: student.section,
            cycle: student.cycle,
            niveau: niveau
        }
    });
};







    const handleDeleteStudent = async () => {
        if (!student || !window.confirm(`Supprimer définitivement ${student.full_name} ?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/student/${studentId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Élève supprimé avec succès');
                navigate(-1);
            }
        } catch (error) {
            console.error('Erreur suppression:', error);
            alert('Erreur lors de la suppression');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen p-6">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Élève non trouvé</h2>
                    <p className="text-gray-600 mb-6">
                        L'élève avec l'ID {studentId} n'existe pas.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        ← Retour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>←</span> Retour
                    </button>
                    
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{student.full_name}</h1>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {student.class_name || student.class_display_name}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        {student.matricule || 'Sans matricule'}
                                    </span>
                                    {student.section && (
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                            {student.section}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <button
                                onClick={handleDeleteStudent}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                title="Supprimer l'élève"
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Trimestre 1 */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {student.section?.includes('anglophone') ? 'Term 1' : 'Trimestre 1'}
                        </h3>
                        {hasBulletinForTrimester(student.section?.includes('anglophone') ? 'Term 1' : 'Trimestre 1') ? (
                            <div className="space-y-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700 font-medium">✓ Bulletin créé</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleContinueBulletin(student.section?.includes('anglophone') ? 'Term 1' : 'Trimestre 1')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        ✏️ Continuer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-700 font-medium">À créer</p>
                                </div>
                                <button
                                    onClick={() => handleCreateBulletin(student.section?.includes('anglophone') ? 'Term 1' : 'Trimestre 1')}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    + Créer bulletin
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Trimestre 2 */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {student.section?.includes('anglophone') ? 'Term 2' : 'Trimestre 2'}
                        </h3>
                        {hasBulletinForTrimester(student.section?.includes('anglophone') ? 'Term 2' : 'Trimestre 2') ? (
                            <div className="space-y-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700 font-medium">✓ Bulletin créé</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleContinueBulletin(student.section?.includes('anglophone') ? 'Term 2' : 'Trimestre 2')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        ✏️ Continuer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-700 font-medium">À créer</p>
                                </div>
                                <button
                                    onClick={() => handleCreateBulletin(student.section?.includes('anglophone') ? 'Term 2' : 'Trimestre 2')}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    + Créer bulletin
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Trimestre 3 */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {student.section?.includes('anglophone') ? 'Term 3' : 'Trimestre 3'}
                        </h3>
                        {hasBulletinForTrimester(student.section?.includes('anglophone') ? 'Term 3' : 'Trimestre 3') ? (
                            <div className="space-y-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700 font-medium">✓ Bulletin créé</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleContinueBulletin(student.section?.includes('anglophone') ? 'Term 3' : 'Trimestre 3')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        ✏️ Continuer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-700 font-medium">À créer</p>
                                </div>
                                <button
                                    onClick={() => handleCreateBulletin(student.section?.includes('anglophone') ? 'Term 3' : 'Trimestre 3')}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    + Créer bulletin
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bulletin Annuel */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Bulletin Annuel</h3>
                        {hasBulletinForTrimester('annuel') ? (
                            <div className="space-y-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700 font-medium">✓ Bulletin annuel créé</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleContinueBulletin('annuel')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        ✏️ Continuer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-700 font-medium">À créer (après les 3 trimestres)</p>
                                </div>
                                <button
                                    onClick={handleCreateAnnualBulletin}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    + Créer bulletin annuel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Tous les bulletins</h3>
                    {bulletins.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Aucun bulletin créé</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="p-3 text-left">Type</th>
                                        <th className="p-3 text-left">Trimestre</th>
                                        <th className="p-3 text-left">Année scolaire</th>
                                        <th className="p-3 text-left">Statut</th>
                                        <th className="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bulletins.map(bulletin => {
                                        const bulletinName = `Bulletin ${bulletin.bulletin_type} - ${bulletin.trimester || 'Annuel'} (${bulletin.academic_year})`;
                                        const isDeleting = deleting === bulletin.id;
                                        
                                        return (
                                            <tr key={bulletin.id} className="border-t hover:bg-gray-50">
                                                <td className="p-3">
                                                    {bulletin.bulletin_type === 'anglophone' ? '📘 Anglophone' :
                                                     bulletin.bulletin_type === 'francophone' ? '📗 Francophone' :
                                                     bulletin.bulletin_type === 'maternelle' ? '🎨 Maternelle' :
                                                     bulletin.bulletin_type === 'nursery' ? '👶 Nursery' :
                                                     bulletin.bulletin_type}
                                                </td>
                                                <td className="p-3">
                                                    {bulletin.trimester || 'Annuel'}
                                                </td>
                                                <td className="p-3">{bulletin.academic_year}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        bulletin.is_draft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {bulletin.is_draft ? 'Brouillon' : 'Finalisé'}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleDeleteBulletin(bulletin.id, bulletinName)}
                                                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            disabled={isDeleting}
                                                            title="Supprimer ce bulletin"
                                                        >
                                                            {isDeleting ? 'Suppression...' : '🗑️ Supprimer'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;








