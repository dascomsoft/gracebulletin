

// frontend/src/pages/StudentBulletins.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const StudentBulletins = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [student, setStudent] = useState(null);
    const [bulletinsData, setBulletinsData] = useState({ 
        by_trimester: { 1: [], 2: [], 3: [], annual: [] }, 
        totals: 0 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchStudentBulletins();
    }, [studentId]);

    const fetchStudentBulletins = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Récupérer info élève
            const studentRes = await fetch(`http://localhost:3000/api/student/${studentId}`);
            if (!studentRes.ok) throw new Error(`Erreur HTTP: ${studentRes.status}`);
            const studentData = await studentRes.json();
            setStudent(studentData);

            // Récupérer bulletins
            try {
                const bulletinsRes = await fetch(`http://localhost:3000/api/student/${studentId}/bulletins`);
                if (bulletinsRes.ok) {
                    const allBulletins = await bulletinsRes.json();
                    organizeBulletins(allBulletins);
                }
            } catch (apiError) {
                console.warn('API bulletins non disponible:', apiError);
            }
            
        } catch (error) {
            console.error('❌ Erreur chargement bulletins:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const organizeBulletins = (bulletins) => {
        const organised = {
            by_trimester: {
                1: [],
                2: [],
                3: [],
                annual: []
            },
            totals: bulletins.length
        };
        
        bulletins.forEach(bulletin => {
            // Parse JSON strings if needed
            try {
                if (bulletin.data_json && typeof bulletin.data_json === 'string') {
                    bulletin.data_json = JSON.parse(bulletin.data_json);
                }
                if (bulletin.totals_json && typeof bulletin.totals_json === 'string') {
                    bulletin.totals_json = JSON.parse(bulletin.totals_json);
                }
            } catch (e) {
                console.warn('Erreur parsing JSON:', e);
            }
            
            // Organize by type
            if (bulletin.bulletin_type && bulletin.bulletin_type.includes('annual')) {
                organised.by_trimester.annual.push(bulletin);
            } else if (bulletin.trimester === 1) {
                organised.by_trimester[1].push(bulletin);
            } else if (bulletin.trimester === 2) {
                organised.by_trimester[2].push(bulletin);
            } else if (bulletin.trimester === 3) {
                organised.by_trimester[3].push(bulletin);
            }
        });
        
        setBulletinsData(organised);
    };

    // Détection automatique du type de bulletin
    const getDefaultBulletinType = () => {
        if (!student || !student.section) {
            return 'primaire_en';
        }

        const { section, cycle } = student;
        
        if (section.toLowerCase().includes('anglophone')) {
            if (cycle && cycle.toLowerCase().includes('nursery')) {
                return 'nursery';
            }
            if (cycle && cycle.toLowerCase().includes('primary')) {
                return 'primaire_en';
            }
            return 'primaire_en';
        } 
        else if (section.toLowerCase().includes('francophone')) {
            if (cycle && cycle.toLowerCase().includes('maternelle')) {
                return 'maternelle';
            }
            if (cycle && cycle.toLowerCase().includes('primaire')) {
                return 'primaire_fr';
            }
            return 'primaire_fr';
        }
        
        return 'primaire_en';
    };

    // Routes pour création de bulletin
    const getCreateBulletinRoute = (trimester, bulletinType = null) => {
        const typeToUse = bulletinType || getDefaultBulletinType();
        
        const routes = {
            'primaire_en': '/bulletin-anglophone',
            'primaire_fr': '/primaire-francophone',
            'maternelle': '/bulletin-maternelle',
            'nursery': '/nursery',
            'annual_fr': '/bulletin-annuel',
            'annual_en': '/annual-report'
        };
        
        const baseRoute = routes[typeToUse] || '/bulletin-anglophone';
        const params = new URLSearchParams({
            studentId: studentId,
            trimester: trimester,
            sequence: '1',
            type: typeToUse
        });
        
        return `${baseRoute}?${params.toString()}`;
    };

    // Route pour voir/modifier un bulletin
    const getViewBulletinRoute = (bulletin) => {
        if (!bulletin || !bulletin.bulletin_type) return '#';
        
        const routes = {
            'primaire_en': '/bulletin-anglophone',
            'primaire_fr': '/primaire-francophone',
            'maternelle': '/bulletin-maternelle',
            'nursery': '/nursery',
            'annual_fr': '/bulletin-annuel',
            'annual_en': '/annual-report'
        };
        
        const baseRoute = routes[bulletin.bulletin_type] || '/bulletin-anglophone';
        const params = new URLSearchParams({
            studentId: studentId,
            trimester: bulletin.trimester || 1,
            sequence: '1',
            type: bulletin.bulletin_type,
            bulletinId: bulletin.id,
            edit: !bulletin.is_finalized
        });
        
        return `${baseRoute}?${params.toString()}`;
    };

    // Fonction pour charger l'image
    const loadImage = (photoPath) => {
        if (!photoPath) return null;
        
        // Essayer différents chemins
        const paths = [
            `http://localhost:3000/${photoPath}`,
            `http://localhost:3000/uploads/${photoPath}`,
            `/${photoPath}`,
            `./${photoPath}`
        ];
        
        return paths[0];
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des bulletins...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto text-center py-12">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
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

    if (!student) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto text-center py-12">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Élève non trouvé</h2>
                    <p className="text-gray-600 mb-6">L'élève avec l'ID {studentId} n'existe pas.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        ← Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    const defaultBulletinType = getDefaultBulletinType();
    const bulletinTypeName = {
        'primaire_en': 'Anglophone',
        'primaire_fr': 'Francophone',
        'maternelle': 'Maternelle',
        'nursery': 'Nursery'
    }[defaultBulletinType] || 'Bulletin';

    // Composant pour un trimestre
    const TrimesterSection = ({ trimester, title }) => {
        const bulletins = bulletinsData.by_trimester?.[trimester] || [];
        const filteredBulletins = activeFilter === 'all' ? bulletins : 
            bulletins.filter(b => 
                activeFilter === 'finalized' ? b.is_finalized :
                activeFilter === 'drafts' ? !b.is_finalized : true
            );

        return (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {bulletins.length} bulletin{bulletins.length > 1 ? 's' : ''} • 
                            {filteredBulletins.length} filtré{filteredBulletins.length > 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => navigate(getCreateBulletinRoute(trimester))}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                            <span>+</span> Nouveau ({bulletinTypeName})
                        </button>
                    </div>
                </div>
                
                {filteredBulletins.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBulletins.map(bulletin => (
                            <div key={bulletin.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {bulletin.bulletin_type === 'primaire_en' ? '🇬🇧 Anglophone' : 
                                             bulletin.bulletin_type === 'primaire_fr' ? '🇫🇷 Francophone' :
                                             bulletin.bulletin_type === 'maternelle' ? '👶 Maternelle' :
                                             bulletin.bulletin_type === 'nursery' ? '🎪 Nursery' :
                                             bulletin.bulletin_type}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(bulletin.created_at).toLocaleDateString()} • 
                                            Seq. {bulletin.sequence || '1'}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                        bulletin.is_finalized 
                                            ? 'bg-green-100 text-green-800 border border-green-200' 
                                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                    }`}>
                                        {bulletin.is_finalized ? '✅ Finalisé' : '📝 Brouillon'}
                                    </span>
                                </div>
                                
                                {bulletin.moyenne_generale && (
                                    <div className="text-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {bulletin.moyenne_generale}
                                        </div>
                                        <div className="text-sm text-gray-500">Moyenne générale</div>
                                    </div>
                                )}
                                
                                {bulletin.appreciation && (
                                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-sm text-gray-700 italic line-clamp-2">"{bulletin.appreciation}"</p>
                                    </div>
                                )}
                                
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(getViewBulletinRoute(bulletin))}
                                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
                                    >
                                        {bulletin.is_finalized ? '👁️ Voir' : '✏️ Modifier'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <div className="text-6xl mb-4 text-gray-400">📄</div>
                        <h4 className="text-lg font-medium text-gray-600 mb-2">
                            {bulletins.length === 0 ? 'Aucun bulletin pour ce trimestre' : 'Aucun bulletin correspondant au filtre'}
                        </h4>
                        <p className="text-gray-500 mb-6">
                            {bulletins.length === 0 
                                ? `Créez le premier bulletin pour le ${title.toLowerCase()}`
                                : 'Modifiez vos critères de filtrage'}
                        </p>
                        <button
                            onClick={() => navigate(getCreateBulletinRoute(trimester))}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Créer un bulletin {bulletinTypeName}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* En-tête avec informations */}
                <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <button
                                onClick={() => navigate(-1)}
                                className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                            >
                                <span>←</span> Retour
                            </button>
                            
                            <h1 className="text-3xl font-bold text-gray-800">Banque de bulletins</h1>
                            <div className="mt-2">
                                <h2 className="text-xl text-gray-600">
                                    {student.full_name} - {student.class_name || student.class_display_name}
                                </h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Section: {student.section || 'Non spécifiée'}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        Cycle: {student.cycle || 'Non spécifié'}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                        Type: {bulletinTypeName}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                        Matricule: {student.matricule || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => navigate(`/student/${studentId}/dashboard`)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                <span>📊</span> Dashboard
                            </button>
                            <button
                                onClick={fetchStudentBulletins}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                            >
                                <span>🔄</span> Actualiser
                            </button>
                        </div>
                    </div>
                    
                    {/* Statistiques */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-2xl font-bold text-blue-600">{bulletinsData.totals || 0}</div>
                            <div className="text-sm text-blue-500">Total</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="text-2xl font-bold text-green-600">
                                {bulletinsData.by_trimester[1]?.length || 0}
                            </div>
                            <div className="text-sm text-green-500">Trim. 1</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <div className="text-2xl font-bold text-yellow-600">
                                {bulletinsData.by_trimester[2]?.length || 0}
                            </div>
                            <div className="text-sm text-yellow-500">Trim. 2</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <div className="text-2xl font-bold text-red-600">
                                {bulletinsData.by_trimester[3]?.length || 0}
                            </div>
                            <div className="text-sm text-red-500">Trim. 3</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="text-2xl font-bold text-purple-600">
                                {bulletinsData.by_trimester.annual?.length || 0}
                            </div>
                            <div className="text-sm text-purple-500">Annuels</div>
                        </div>
                    </div>
                </div>

                {/* Trimestres */}
                <TrimesterSection trimester={1} title="Trimestre 1" />
                <TrimesterSection trimester={2} title="Trimestre 2" />
                <TrimesterSection trimester={3} title="Trimestre 3" />

                {/* Pied de page */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Banque de bulletins • {student.full_name} • {student.class_name} • {student.academic_year || '2024-2025'}</p>
                    <p className="mt-1">
                        Section: <span className="font-medium">{student.section || 'Non spécifiée'}</span> • 
                        Cycle: <span className="font-medium">{student.cycle || 'Non spécifié'}</span> • 
                        Type par défaut: <span className="font-medium">{bulletinTypeName}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentBulletins;