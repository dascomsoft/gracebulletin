



// // frontend/src/pages/ClassList.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ClassList = () => {
//     const { section, cycle } = useParams();
//     const navigate = useNavigate();
//     const [classes, setClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchClasses();
//     }, [section, cycle]);

//     const fetchClasses = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`http://localhost:3000/api/classes/${section}/${cycle}`);
//             if (!response.ok) throw new Error('Erreur de chargement');
//             const data = await response.json();
//             setClasses(data);
//         } catch (error) {
//             console.error('Erreur chargement classes:', error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getCycleName = () => {
//         const names = {
//             'maternelle': 'Maternelle',
//             'primaire': 'Primaire',
//             'nursery': 'Nursery',
//             'primary': 'Primary'
//         };
//         return names[cycle] || cycle;
//     };

//     const getSectionName = () => {
//         return section === 'francophone' ? 'Francophone' : 'Anglophone';
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Chargement des classes...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
//                 <div className="max-w-6xl mx-auto text-center py-12">
//                     <div className="text-6xl mb-4">❌</div>
//                     <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
//                     <p className="text-gray-600 mb-6">{error}</p>
//                     <button 
//                         onClick={() => navigate(-1)}
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         ← Retour
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
//             <div className="max-w-6xl mx-auto">
//                 {/* En-tête */}
//                 <div className="mb-8">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
//                     >
//                         <span>←</span> Retour
//                     </button>
                    
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                             Section {getSectionName()}
//                         </h1>
//                         <h2 className="text-xl text-gray-600 mb-4">
//                             {getCycleName()} - Liste des classes
//                         </h2>
                        
//                         <div className="flex flex-wrap gap-2">
//                             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                 {classes.length} classe{classes.length > 1 ? 's' : ''}
//                             </span>
//                             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                                 Section: {section}
//                             </span>
//                             <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                                 Cycle: {cycle}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Grille des classes */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {classes.map((classe) => (
//                         <div
//                             key={classe.id}
//                             className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 border border-gray-100"
//                             onClick={() => navigate(`/class/${classe.id}/students`)}
//                         >
//                             <div className="flex items-center justify-between mb-4">
//                                 <div>
//                                     <h3 className="text-xl font-bold text-gray-800">
//                                         {classe.display_name || classe.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         {classe.section} • {classe.cycle}
//                                     </p>
//                                     {classe.level && (
//                                         <p className="text-xs text-gray-400 mt-1">
//                                             Niveau: {classe.level}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="text-3xl">
//                                     {classe.cycle === 'maternelle' && '👶'}
//                                     {classe.cycle === 'primaire' && '📚'}
//                                     {classe.cycle === 'nursery' && '👶'}
//                                     {classe.cycle === 'primary' && '🎓'}
//                                 </div>
//                             </div>
                            
//                             {classe.student_count !== undefined && (
//                                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-gray-600">
//                                             {classe.student_count} élève{classe.student_count > 1 ? 's' : ''}
//                                         </span>
//                                         <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
//                                             Voir →
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Message si aucune classe */}
//                 {classes.length === 0 && (
//                     <div className="text-center py-12 bg-white rounded-xl shadow">
//                         <div className="text-5xl mb-4 text-gray-400">📁</div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             Aucune classe trouvée
//                         </h3>
//                         <p className="text-gray-500 mb-6">
//                             Pour le cycle "{cycle}" en section "{section}"
//                         </p>
//                         <div className="flex justify-center gap-3">
//                             <button
//                                 onClick={fetchClasses}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 🔄 Réessayer
//                             </button>
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                             >
//                                 ← Retour
//                             </button>
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default ClassList;























































































// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ClassList = () => {
//     const { section, cycle } = useParams();
//     const navigate = useNavigate();
//     const [classes, setClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedLevel, setSelectedLevel] = useState(null);

//     // Définir les niveaux pour le primaire
//     const getPrimaryLevels = () => {
//         if (section === 'francophone' && cycle === 'primaire') {
//             return [
//                 { id: 1, name: 'Niveau 1', classes: ['SIL', 'CP'], icon: '🔤', color: 'yellow' },
//                 { id: 2, name: 'Niveau 2', classes: ['CE1', 'CE2'], icon: '📚', color: 'green' },
//                 { id: 3, name: 'Niveau 3', classes: ['CM1', 'CM2'], icon: '🎓', color: 'blue' }
//             ];
//         } else if (section === 'anglophone' && cycle === 'primary') {
//             return [
//                 { id: 1, name: 'Level 1', classes: ['Class 1', 'Class 2'], icon: '📘', color: 'purple' },
//                 { id: 2, name: 'Level 2', classes: ['Class 3', 'Class 4'], icon: '📗', color: 'green' },
//                 { id: 3, name: 'Level 3', classes: ['Class 5', 'Class 6'], icon: '📕', color: 'blue' }
//             ];
//         }
//         return null;
//     };

//     // Vérifier si c'est un cycle primaire
//     const isPrimaryCycle = () => {
//         return cycle === 'primaire' || cycle === 'primary';
//     };

//     const primaryLevels = isPrimaryCycle() ? getPrimaryLevels() : null;

//     // Charger les classes
//     const fetchClasses = async () => {
//         try {
//             setLoading(true);
//             setError(null);
            
//             // Simulation de données pour le développement
//             // À remplacer par votre vraie API
//             await new Promise(resolve => setTimeout(resolve, 1000));
            
//             let mockClasses = [];
            
//             if (section === 'francophone') {
//                 if (cycle === 'maternelle') {
//                     mockClasses = [
//                         { id: 1, name: 'PS', display_name: 'Petite Section', section: 'francophone', cycle: 'maternelle' },
//                         { id: 2, name: 'MS', display_name: 'Moyenne Section', section: 'francophone', cycle: 'maternelle'},
//                         { id: 3, name: 'GS', display_name: 'Grande Section', section: 'francophone', cycle: 'maternelle' }
//                     ];
//                 } else if (cycle === 'primaire') {
//                     mockClasses = [
//                         { id: 4, name: 'SIL', display_name: "SIL", section: 'francophone', cycle: 'primaire'},
//                         { id: 5, name: 'CP', display_name: 'CP', section: 'francophone', cycle: 'primaire' },
//                         { id: 6, name: 'CE1', display_name: 'CE1', section: 'francophone', cycle: 'primaire'},
//                         { id: 7, name: 'CE2', display_name: 'CE2', section: 'francophone', cycle: 'primaire'},
//                         { id: 8, name: 'CM1', display_name: 'CM1', section: 'francophone', cycle: 'primaire'},
//                         { id: 9, name: 'CM2', display_name: 'CM2', section: 'francophone', cycle: 'primaire' }
//                     ];
//                 }
//             } else if (section === 'anglophone') {
//                 if (cycle === 'nursery') {
//                     mockClasses = [
//                         { id: 10, name: 'Pre-Nursery', display_name: 'Pre-Nursery', section: 'anglophone', cycle: 'nursery'},
//                         { id: 11, name: 'Nursery', display_name: 'Nursery', section: 'anglophone', cycle: 'nursery'}
//                     ];
//                 } else if (cycle === 'primary') {
//                     mockClasses = [
//                         { id: 12, name: 'Class 1', display_name: 'Class 1', section: 'anglophone', cycle: 'primary'},
//                         { id: 13, name: 'Class 2', display_name: 'Class 2', section: 'anglophone', cycle: 'primary'},
//                         { id: 14, name: 'Class 3', display_name: 'Class 3', section: 'anglophone', cycle: 'primary'},
//                         { id: 15, name: 'Class 4', display_name: 'Class 4', section: 'anglophone', cycle: 'primary'},
//                         { id: 16, name: 'Class 5', display_name: 'Class 5', section: 'anglophone', cycle: 'primary'},
//                         { id: 17, name: 'Class 6', display_name: 'Class 6', section: 'anglophone', cycle: 'primary'}
//                     ];
//                 }
//             }

//             // Filtrer les classes selon le niveau sélectionné pour le primaire
//             if (selectedLevel && primaryLevels) {
//                 const level = primaryLevels.find(l => l.id === selectedLevel);
//                 if (level) {
//                     const filteredClasses = mockClasses.filter(cls => 
//                         level.classes.includes(cls.name)
//                     );
//                     setClasses(filteredClasses);
//                 } else {
//                     setClasses([]);
//                 }
//             } else {
//                 setClasses(mockClasses);
//             }
            
//             setLoading(false);
//         } catch (error) {
//             console.error('Erreur chargement classes:', error);
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     // Effet pour charger les classes au chargement initial
//     useEffect(() => {
//         fetchClasses();
//     }, [section, cycle]); // Dépendances initiales seulement

//     // Effet séparé pour le changement de niveau
//     useEffect(() => {
//         if (isPrimaryCycle() && selectedLevel) {
//             fetchClasses();
//         }
//     }, [selectedLevel]); // Se déclenche quand selectedLevel change

//     const getCycleName = () => {
//         const names = {
//             'maternelle': 'Maternelle',
//             'primaire': 'Primaire',
//             'nursery': 'Nursery',
//             'primary': 'Primary'
//         };
//         return names[cycle] || cycle;
//     };

//     const getSectionName = () => {
//         return section === 'francophone' ? 'Francophone' : 'Anglophone';
//     };

//     // Rendu des niveaux pour le primaire
//     const renderPrimaryLevels = () => {
//         if (!primaryLevels) return null;

//         return (
//             <div className="mb-8">
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
//                     {section === 'francophone' ? 'Choisissez un niveau' : 'Choose a level'}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {primaryLevels.map((level) => (
//                         <div
//                             key={level.id}
//                             className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-xl ${
//                                 selectedLevel === level.id ? 'ring-4 ring-blue-500' : ''
//                             }`}
//                             onClick={() => setSelectedLevel(level.id)}
//                         >
//                             <div className={`text-5xl mb-3 text-center`}>
//                                 {level.icon}
//                             </div>
//                             <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
//                                 {level.name}
//                             </h3>
//                             <div className="flex justify-center gap-2 flex-wrap">
//                                 {level.classes.map((className, index) => (
//                                     <span
//                                         key={index}
//                                         className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
//                                     >
//                                         {className}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
                
//                 {selectedLevel && (
//                     <div className="text-center mt-6">
//                         <button
//                             onClick={() => {
//                                 setSelectedLevel(null);
//                                 fetchClasses(); // Recharger toutes les classes
//                             }}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                         >
//                             {section === 'francophone' ? '← Voir tous les niveaux' : '← View all levels'}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     if (loading && classes.length === 0) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-LINEAR-to-br from-blue-50 to-indigo-100">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Chargement des classes...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-LINEAR-to-br from-blue-50 to-indigo-100 p-6">
//                 <div className="max-w-6xl mx-auto text-center py-12">
//                     <div className="text-6xl mb-4">❌</div>
//                     <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
//                     <p className="text-gray-600 mb-6">{error}</p>
//                     <button 
//                         onClick={() => navigate(-1)}
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         ← Retour
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
//             <div className="max-w-6xl mx-auto">
//                 {/* En-tête */}
//                 <div className="mb-8">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
//                     >
//                         <span>←</span> Retour
//                     </button>
                    
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                             Section {getSectionName()}
//                         </h1>
//                         <h2 className="text-xl text-gray-600 mb-4">
//                             {getCycleName()} 
//                             {selectedLevel && primaryLevels && ` - ${primaryLevels.find(l => l.id === selectedLevel)?.name}`}
//                         </h2>
                        
//                         <div className="flex flex-wrap gap-2">
//                             {!isPrimaryCycle() && (
//                                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                     {classes.length} classe{classes.length > 1 ? 's' : ''}
//                                 </span>
//                             )}
//                             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                                 Section: {section}
//                             </span>
//                             <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                                 Cycle: {cycle}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Afficher les niveaux pour le primaire */}
//                 {isPrimaryCycle() && renderPrimaryLevels()}

//                 {/* Message si aucun niveau sélectionné en primaire */}
//                 {isPrimaryCycle() && !selectedLevel && (
//                     <div className="text-center py-12 bg-white rounded-xl shadow mb-6">
//                         <div className="text-5xl mb-4 text-gray-400">👆</div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             {section === 'francophone' 
//                                 ? 'Sélectionnez un niveau pour voir les classes' 
//                                 : 'Select a level to view classes'
//                             }
//                         </h3>
//                         <p className="text-gray-500">
//                             {section === 'francophone'
//                                 ? 'Cliquez sur Niveau 1, 2 ou 3 pour continuer'
//                                 : 'Click on Level 1, 2 or 3 to continue'
//                             }
//                         </p>
//                     </div>
//                 )}

//                 {/* Grille des classes - afficher seulement si un niveau est sélectionné ou si ce n'est pas le primaire */}
//                 {(!isPrimaryCycle() || selectedLevel) && (
//                     <>
//                         {classes.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {classes.map((classe) => (
//                                     <div
//                                         key={classe.id}
//                                         className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 border border-gray-100"
//                                         onClick={() => navigate(`/class/${classe.id}/students`)}
//                                     >
//                                         <div className="flex items-center justify-between mb-4">
//                                             <div>
//                                                 <h3 className="text-xl font-bold text-gray-800">
//                                                     {classe.display_name || classe.name}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-500 mt-1">
//                                                     {classe.section} • {classe.cycle}
//                                                 </p>
//                                             </div>
//                                             <div className="text-3xl">
//                                                 {classe.cycle === 'maternelle' && '👶'}
//                                                 {classe.cycle === 'primaire' && '📚'}
//                                                 {classe.cycle === 'nursery' && '👶'}
//                                                 {classe.cycle === 'primary' && '🎓'}
//                                             </div>
//                                         </div>
                                        
//                                         {classe.student_count !== undefined && (
//                                             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                                 <div className="flex justify-between items-center">
//                                                     <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
//                                                         Voir les élèves →
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-12 bg-white rounded-xl shadow">
//                                 <div className="text-5xl mb-4 text-gray-400">📁</div>
//                                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                                     Aucune classe trouvée
//                                 </h3>
//                                 <p className="text-gray-500 mb-6">
//                                     {selectedLevel && primaryLevels 
//                                         ? `Pour le ${primaryLevels.find(l => l.id === selectedLevel)?.name}`
//                                         : `Pour le cycle "${cycle}" en section "${section}"`
//                                     }
//                                 </p>
//                                 <button
//                                     onClick={() => {
//                                         if (selectedLevel) {
//                                             setSelectedLevel(null);
//                                         } else {
//                                             fetchClasses();
//                                         }
//                                     }}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                                 >
//                                     {selectedLevel ? '← Choisir un autre niveau' : '↻ Réessayer'}
//                                 </button>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ClassList;

















































import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassList = () => {
    const { section, cycle } = useParams();
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [showClasses, setShowClasses] = useState(false);

    // Définir les niveaux pour le primaire
    const getPrimaryLevels = () => {
        if (section === 'francophone' && cycle === 'primaire') {
            return [
                { id: 1, name: 'Niveau 1', classes: ['SIL', 'CP'] },
                { id: 2, name: 'Niveau 2', classes: ['CE1', 'CE2'] },
                { id: 3, name: 'Niveau 3', classes: ['CM1', 'CM2'] }
            ];
        } else if (section === 'anglophone' && cycle === 'primary') {
            return [
                { id: 1, name: 'Level 1', classes: ['Class 1', 'Class 2'] },
                { id: 2, name: 'Level 2', classes: ['Class 3', 'Class 4'] },
                { id: 3, name: 'Level 3', classes: ['Class 5', 'Class 6'] }
            ];
        }
        return null;
    };

    // Vérifier si c'est un cycle primaire
    const isPrimaryCycle = () => {
        return cycle === 'primaire' || cycle === 'primary';
    };

    const primaryLevels = isPrimaryCycle() ? getPrimaryLevels() : null;

    // Charger les classes
    const fetchClasses = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Simulation de données pour le développement
            await new Promise(resolve => setTimeout(resolve, 500));
            
            let mockClasses = [];
            
            if (section === 'francophone') {
                if (cycle === 'maternelle') {
                    mockClasses = [
                        { id: 1, name: 'PS', display_name: 'Petite Section', section: 'francophone', cycle: 'maternelle' },
                        { id: 2, name: 'MS', display_name: 'Moyenne Section', section: 'francophone', cycle: 'maternelle'},
                        { id: 3, name: 'GS', display_name: 'Grande Section', section: 'francophone', cycle: 'maternelle' }
                    ];
                } else if (cycle === 'primaire') {
                    mockClasses = [
                        { id: 4, name: 'SIL', display_name: 'SIL', section: 'francophone', cycle: 'primaire'},
                        { id: 5, name: 'CP', display_name: 'CP', section: 'francophone', cycle: 'primaire' },
                        { id: 6, name: 'CE1', display_name: 'CE1', section: 'francophone', cycle: 'primaire'},
                        { id: 7, name: 'CE2', display_name: 'CE2', section: 'francophone', cycle: 'primaire'},
                        { id: 8, name: 'CM1', display_name: 'CM1', section: 'francophone', cycle: 'primaire'},
                        { id: 9, name: 'CM2', display_name: 'CM2', section: 'francophone', cycle: 'primaire' }
                    ];
                }
            } else if (section === 'anglophone') {
                if (cycle === 'nursery') {
                    mockClasses = [
                        { id: 10, name: 'Pre-Nursery', display_name: 'Pre-Nursery', section: 'anglophone', cycle: 'nursery'},
                        { id: 11, name: 'Nursery 1', display_name: 'Nursery 1', section: 'anglophone', cycle: 'nursery'},
                        { id: 12, name: 'Nursery 2', display_name: 'Nursery 2', section: 'anglophone', cycle: 'nursery'}
                    ];
                } else if (cycle === 'primary') {
                    mockClasses = [
                        { id: 13, name: 'Class 1', display_name: 'Class 1', section: 'anglophone', cycle: 'primary'},
                        { id: 14, name: 'Class 2', display_name: 'Class 2', section: 'anglophone', cycle: 'primary'},
                        { id: 15, name: 'Class 3', display_name: 'Class 3', section: 'anglophone', cycle: 'primary'},
                        { id: 16, name: 'Class 4', display_name: 'Class 4', section: 'anglophone', cycle: 'primary'},
                        { id: 17, name: 'Class 5', display_name: 'Class 5', section: 'anglophone', cycle: 'primary'},
                        { id: 18, name: 'Class 6', display_name: 'Class 6', section: 'anglophone', cycle: 'primary'}
                    ];
                }
            }

            // Filtrer les classes selon le niveau sélectionné pour le primaire
            if (selectedLevel && primaryLevels) {
                const level = primaryLevels.find(l => l.id === selectedLevel);
                if (level) {
                    const filteredClasses = mockClasses.filter(cls => 
                        level.classes.includes(cls.name)
                    );
                    setClasses(filteredClasses);
                } else {
                    setClasses([]);
                }
            } else {
                setClasses(mockClasses);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Erreur chargement classes:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    // Effet pour charger les classes
    useEffect(() => {
        fetchClasses();
    }, [section, cycle, selectedLevel]);

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

    // Gestionnaire de clic sur un niveau
    const handleLevelClick = (levelId) => {
        setSelectedLevel(levelId);
        setShowClasses(true);
    };

    // Retour à la sélection des niveaux
    const handleBackToLevels = () => {
        setSelectedLevel(null);
        setShowClasses(false);
    };

    // Rendu des niveaux pour le primaire
    const renderPrimaryLevels = () => {
        if (!primaryLevels) return null;

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    {section === 'francophone' ? 'Choisissez un niveau' : 'Choose a level'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {primaryLevels.map((level) => (
                        <div
                            key={level.id}
                            onClick={() => handleLevelClick(level.id)}
                            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-blue-500 text-center"
                        >
                            <div className="text-6xl mb-4">
                                {section === 'francophone' ? '📚' : '📘'}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                {level.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {level.classes.join(' & ')}
                            </p>
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                                Cliquez pour voir
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Rendu des classes d'un niveau spécifique
    const renderLevelClasses = () => {
        if (!selectedLevel || !primaryLevels) return null;
        
        const level = primaryLevels.find(l => l.id === selectedLevel);
        
        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleBackToLevels}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <span>←</span> Retour aux niveaux
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {level.name} - {level.classes.join(' & ')}
                    </h2>
                </div>

                {/* Grille des classes du niveau sélectionné */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {classes.map((classe) => (
                        <div
                            key={classe.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                            onClick={() => navigate(`/class/${classe.id}/students`)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {classe.display_name || classe.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {classe.section} • {classe.cycle}
                                    </p>
                                </div>
                                <div className="text-4xl">
                                    {classe.cycle === 'primaire' && '📚'}
                                    {classe.cycle === 'primary' && '📘'}
                                </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        Voir les élèves →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des classes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
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
                        <h2 className="text-xl text-gray-600">
                            {getCycleName()}
                        </h2>
                    </div>
                </div>

                {/* Afficher les niveaux ou les classes selon l'état */}
                {isPrimaryCycle() ? (
                    showClasses ? renderLevelClasses() : renderPrimaryLevels()
                ) : (
                    /* Pour les autres cycles (maternelle, nursery), afficher directement les classes */
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
                                    </div>
                                    <div className="text-3xl">
                                        {classe.cycle === 'maternelle' && '👶'}
                                        {classe.cycle === 'nursery' && '👶'}
                                    </div>
                                </div>
                                
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                            Voir les élèves →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Message si aucune classe */}
                {classes.length === 0 && !isPrimaryCycle() && (
                    <div className="text-center py-12 bg-white rounded-xl shadow">
                        <div className="text-5xl mb-4 text-gray-400">📁</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Aucune classe trouvée
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Pour le cycle "{cycle}" en section "{section}"
                        </p>
                        <button
                            onClick={fetchClasses}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            ↻ Réessayer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassList;