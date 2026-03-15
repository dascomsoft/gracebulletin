// // LevelClasses.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function LevelClasses() {
//   const navigate = useNavigate();
//   const { section, levelId } = useParams();

//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Définir les classes par niveau
//   const getClassesForLevel = () => {
//     if (section === 'francophone') {
//       const levelClasses = {
//         '1': [
//           { id: 'sil', name: 'SIL', displayName: 'Section d\'Initiation au Langage', icon: '🔤', color: 'from-yellow-400 to-orange-500' },
//           { id: 'cp', name: 'CP', displayName: 'Cours Préparatoire', icon: '📝', color: 'from-orange-400 to-red-500' }
//         ],
//         '2': [
//           { id: 'ce1', name: 'CE1', displayName: 'Cours Élémentaire 1', icon: '📚', color: 'from-green-400 to-emerald-500' },
//           { id: 'ce2', name: 'CE2', displayName: 'Cours Élémentaire 2', icon: '✏️', color: 'from-emerald-400 to-teal-500' }
//         ],
//         '3': [
//           { id: 'cm1', name: 'CM1', displayName: 'Cours Moyen 1', icon: '🎓', color: 'from-blue-400 to-indigo-500' },
//           { id: 'cm2', name: 'CM2', displayName: 'Cours Moyen 2', icon: '⭐', color: 'from-indigo-400 to-purple-500' }
//         ]
//       };
//       return levelClasses[levelId] || [];
//     } else {
//       const levelClasses = {
//         '1': [
//           { id: 'class1', name: 'Class 1', displayName: 'First Grade', icon: '📘', color: 'from-purple-400 to-fuchsia-500' },
//           { id: 'class2', name: 'Class 2', displayName: 'Second Grade', icon: '📗', color: 'from-fuchsia-400 to-pink-500' }
//         ],
//         '2': [
//           { id: 'class3', name: 'Class 3', displayName: 'Third Grade', icon: '📕', color: 'from-green-400 to-emerald-500' },
//           { id: 'class4', name: 'Class 4', displayName: 'Fourth Grade', icon: '📙', color: 'from-emerald-400 to-teal-500' }
//         ],
//         '3': [
//           { id: 'class5', name: 'Class 5', displayName: 'Fifth Grade', icon: '📔', color: 'from-blue-400 to-indigo-500' },
//           { id: 'class6', name: 'Class 6', displayName: 'Sixth Grade', icon: '📒', color: 'from-indigo-400 to-purple-500' }
//         ]
//       };
//       return levelClasses[levelId] || [];
//     }
//   };

//   // Obtenir le nom du niveau
//   const getLevelName = () => {
//     if (section === 'francophone') {
//       const names = {
//         '1': 'Niveau 1 (SIL & CP)',
//         '2': 'Niveau 2 (CE1 & CE2)',
//         '3': 'Niveau 3 (CM1 & CM2)'
//       };
//       return names[levelId] || 'Niveau inconnu';
//     } else {
//       const names = {
//         '1': 'Level 1 (Class 1 & 2)',
//         '2': 'Level 2 (Class 3 & 4)',
//         '3': 'Level 3 (Class 5 & 6)'
//       };
//       return names[levelId] || 'Unknown Level';
//     }
//   };

//   useEffect(() => {
//     // Simuler le chargement des données
//     setLoading(true);
//     setTimeout(() => {
//       const levelClasses = getClassesForLevel();
//       // Ajouter un nombre aléatoire d'élèves pour la simulation
//       const classesWithStudents = levelClasses.map(cls => ({
//         ...cls,
//         studentCount: Math.floor(Math.random() * 25) + 15
//       }));
//       setClasses(classesWithStudents);
//       setLoading(false);
//     }, 500);
//   }, [section, levelId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Chargement des classes...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Navigation */}
//         <div className="mb-6 flex gap-3">
//           <button
//             onClick={() => navigate(`/${section}/primary/levels`)}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
//           >
//             <span>←</span> Retour aux niveaux
//           </button>
//           <button
//             onClick={() => navigate(`/${section}`)}
//             className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
//           >
//             <span>←</span> Retour à l'accueil
//           </button>
//         </div>

//         {/* En-tête */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-3">
//             {section === 'francophone' ? 'Section Francophone' : 'Anglophone Section'}
//           </h1>
//           <h2 className="text-2xl text-blue-600 font-semibold mb-4">
//             {getLevelName()}
//           </h2>
//           <p className="text-gray-600">
//             Sélectionnez une classe pour voir la liste des élèves
//           </p>
//         </div>

//         {/* Grille des classes */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {classes.map((classe) => (
//             <div
//               key={classe.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
//               onClick={() => navigate(`/class/${classe.id}/students`)}
//             >
//               <div className={`bg-gradient-to-r ${classe.color} p-6 text-white`}>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-5xl block mb-2">{classe.icon}</span>
//                     <h3 className="text-3xl font-bold">{classe.name}</h3>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <p className="text-gray-700 mb-4">
//                   {classe.displayName}
//                 </p>
                
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <span className="text-gray-600 block">
//                         👥 {classe.studentCount} élèves
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         Cliquez pour voir le bulletin
//                       </span>
//                     </div>
//                     <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                       Voir →
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








































































// LevelClasses.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LevelClasses() {
  const navigate = useNavigate();
  const { section, levelId } = useParams();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Définir les classes par niveau
  const getClassesForLevel = () => {
    if (section === 'francophone') {
      const levelClasses = {
        '1': [
          { id: 'sil', name: 'SIL', displayName: 'Section d\'Initiation au Langage', icon: '🔤', color: 'from-yellow-400 to-orange-500' },
          { id: 'cp', name: 'CP', displayName: 'Cours Préparatoire', icon: '📝', color: 'from-orange-400 to-red-500' }
        ],
        '2': [
          { id: 'ce1', name: 'CE1', displayName: 'Cours Élémentaire 1', icon: '📚', color: 'from-green-400 to-emerald-500' },
          { id: 'ce2', name: 'CE2', displayName: 'Cours Élémentaire 2', icon: '✏️', color: 'from-emerald-400 to-teal-500' }
        ],
        '3': [
          { id: 'cm1', name: 'CM1', displayName: 'Cours Moyen 1', icon: '🎓', color: 'from-blue-400 to-indigo-500' },
          { id: 'cm2', name: 'CM2', displayName: 'Cours Moyen 2', icon: '⭐', color: 'from-indigo-400 to-purple-500' }
        ]
      };
      return levelClasses[levelId] || [];
    } else {
      const levelClasses = {
        '1': [
          { id: 'class1', name: 'Class 1', displayName: 'First Grade', icon: '📘', color: 'from-purple-400 to-fuchsia-500' },
          { id: 'class2', name: 'Class 2', displayName: 'Second Grade', icon: '📗', color: 'from-fuchsia-400 to-pink-500' }
        ],
        '2': [
          { id: 'class3', name: 'Class 3', displayName: 'Third Grade', icon: '📕', color: 'from-green-400 to-emerald-500' },
          { id: 'class4', name: 'Class 4', displayName: 'Fourth Grade', icon: '📙', color: 'from-emerald-400 to-teal-500' }
        ],
        '3': [
          { id: 'class5', name: 'Class 5', displayName: 'Fifth Grade', icon: '📔', color: 'from-blue-400 to-indigo-500' },
          { id: 'class6', name: 'Class 6', displayName: 'Sixth Grade', icon: '📒', color: 'from-indigo-400 to-purple-500' }
        ]
      };
      return levelClasses[levelId] || [];
    }
  };

  // Obtenir le nom du niveau
  const getLevelName = () => {
    if (section === 'francophone') {
      const names = {
        '1': 'Niveau 1 (SIL & CP)',
        '2': 'Niveau 2 (CE1 & CE2)',
        '3': 'Niveau 3 (CM1 & CM2)'
      };
      return names[levelId] || 'Niveau inconnu';
    } else {
      const names = {
        '1': 'Level 1 (Class 1 & 2)',
        '2': 'Level 2 (Class 3 & 4)',
        '3': 'Level 3 (Class 5 & 6)'
      };
      return names[levelId] || 'Unknown Level';
    }
  };

  // FONCTION CORRIGÉE - C'EST ICI LA LOGIQUE IMPORTANTE
  const handleClassClick = (classe) => {
    if (section === 'francophone') {
      // FRANCOPHONE
      if (levelId === '1') {
        // Niveau 1 → bulletin niveau 1 (différent)
        navigate(`/bulletin/francophone/niveau1/${classe.id}`);
      } else {
        // Niveau 2 et 3 → même bulletin (niveau 2/3)
        navigate(`/bulletin/francophone/niveau2/${classe.id}`);
      }
    } else {
      // ANGLOPHONE
      if (levelId === '1') {
        // Level 1 → bulletin level 1 (différent)
        navigate(`/bulletin/anglophone/level1/${classe.id}`);
      } else {
        // Level 2 et 3 → même bulletin (level 2/3)
        navigate(`/bulletin/anglophone/level2/${classe.id}`);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const levelClasses = getClassesForLevel();
      const classesWithStudents = levelClasses.map(cls => ({
        ...cls,
        studentCount: Math.floor(Math.random() * 25) + 15
      }));
      setClasses(classesWithStudents);
      setLoading(false);
    }, 500);
  }, [section, levelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => navigate(`/${section}/primary/levels`)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <span>←</span> Retour aux niveaux
          </button>
          <button
            onClick={() => navigate(`/${section}`)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
          >
            <span>←</span> Retour à l'accueil
          </button>
        </div>

        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {section === 'francophone' ? 'Section Francophone' : 'Anglophone Section'}
          </h1>
          <h2 className="text-2xl text-blue-600 font-semibold mb-4">
            {getLevelName()}
          </h2>
          <p className="text-gray-600">
            Sélectionnez une classe pour créer le bulletin correspondant
          </p>
        </div>

        {/* Grille des classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classe) => (
            <div
              key={classe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleClassClick(classe)}
            >
              <div className={`bg-gradient-to-r ${classe.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-5xl block mb-2">{classe.icon}</span>
                    <h3 className="text-3xl font-bold">{classe.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  {classe.displayName}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600 block">
                        👥 {classe.studentCount} élèves
                      </span>
                      <span className="text-sm text-gray-500">
                        Cliquez pour créer le bulletin
                      </span>
                    </div>
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Créer →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}