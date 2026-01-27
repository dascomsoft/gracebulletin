



// frontend/src/pages/ClassList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassList = () => {
    const { section, cycle } = useParams();
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, [section, cycle]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/classes/${section}/${cycle}`);
            if (!response.ok) throw new Error('Erreur de chargement');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Erreur chargement classes:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getCycleName = () => {
        const names = {
            'maternelle': 'Maternelle',
            'primaire': 'Primaire',
            'nursery': 'Nursery',
            'primary': 'Primary'
        };
        return names[cycle] || cycle;
    };

    const getSectionName = () => {
        return section === 'francophone' ? 'Francophone' : 'Anglophone';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des classes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-6xl mx-auto text-center py-12">
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

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* En-tête */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>←</span> Retour
                    </button>
                    
                    <div className="bg-white rounded-xl shadow p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Section {getSectionName()}
                        </h1>
                        <h2 className="text-xl text-gray-600 mb-4">
                            {getCycleName()} - Liste des classes
                        </h2>
                        
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {classes.length} classe{classes.length > 1 ? 's' : ''}
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                Section: {section}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                Cycle: {cycle}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grille des classes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classe) => (
                        <div
                            key={classe.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                            onClick={() => navigate(`/class/${classe.id}/students`)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {classe.display_name || classe.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {classe.section} • {classe.cycle}
                                    </p>
                                    {classe.level && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Niveau: {classe.level}
                                        </p>
                                    )}
                                </div>
                                <div className="text-3xl">
                                    {classe.cycle === 'maternelle' && '👶'}
                                    {classe.cycle === 'primaire' && '📚'}
                                    {classe.cycle === 'nursery' && '👶'}
                                    {classe.cycle === 'primary' && '🎓'}
                                </div>
                            </div>
                            
                            {classe.student_count !== undefined && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            {classe.student_count} élève{classe.student_count > 1 ? 's' : ''}
                                        </span>
                                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                            Voir →
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Message si aucune classe */}
                {classes.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow">
                        <div className="text-5xl mb-4 text-gray-400">📁</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Aucune classe trouvée
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Pour le cycle "{cycle}" en section "{section}"
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={fetchClasses}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                🔄 Réessayer
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                ← Retour
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ClassList;