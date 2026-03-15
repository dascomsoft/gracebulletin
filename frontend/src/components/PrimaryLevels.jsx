// PrimaryLevels.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PrimaryLevels() {
  const navigate = useNavigate();
  const { section } = useParams();

  // Définir les niveaux selon la section
  const getLevels = () => {
    if (section === 'francophone') {
      return [
        { 
          id: 1, 
          name: 'Niveau 1', 
          classes: ['SIL', 'CP'],
          description: 'Cours préparatoire',
          icon: '🔤',
          color: 'from-yellow-400 to-orange-500'
        },
        { 
          id: 2, 
          name: 'Niveau 2', 
          classes: ['CE1', 'CE2'],
          description: 'Cours élémentaire',
          icon: '📚',
          color: 'from-green-400 to-emerald-500'
        },
        { 
          id: 3, 
          name: 'Niveau 3', 
          classes: ['CM1', 'CM2'],
          description: 'Cours moyen',
          icon: '🎓',
          color: 'from-blue-400 to-indigo-500'
        }
      ];
    } else {
      return [
        { 
          id: 1, 
          name: 'Level 1', 
          classes: ['Class 1', 'Class 2'],
          description: 'Foundation Stage',
          icon: '📘',
          color: 'from-purple-400 to-fuchsia-500'
        },
        { 
          id: 2, 
          name: 'Level 2', 
          classes: ['Class 3', 'Class 4'],
          description: 'Intermediate Stage',
          icon: '📗',
          color: 'from-green-400 to-emerald-500'
        },
        { 
          id: 3, 
          name: 'Level 3', 
          classes: ['Class 5', 'Class 6'],
          description: 'Advanced Stage',
          icon: '📕',
          color: 'from-blue-400 to-indigo-500'
        }
      ];
    }
  };

  const levels = getLevels();
  const sectionName = section === 'francophone' ? 'Francophone' : 'Anglophone';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(`/${section}`)}
          className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
        >
          <span>←</span> Retour
        </button>

        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Section {sectionName}
          </h1>
          <h2 className="text-2xl text-gray-600 mb-4">
            {section === 'francophone' ? 'Classes Primaires' : 'Primary Classes'}
          </h2>
          <p className="text-gray-500">
            Choisissez un niveau pour voir les classes correspondantes
          </p>
        </div>

        {/* Grille des niveaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/${section}/primary/level/${level.id}`)}
            >
              <div className={`bg-gradient-to-r ${level.color} p-6 text-white text-center`}>
                <span className="text-6xl block mb-2">{level.icon}</span>
                <h3 className="text-2xl font-bold">{level.name}</h3>
                <p className="text-sm opacity-90 mt-1">{level.description}</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 font-semibold mb-3">Classes incluses :</p>
                <div className="flex gap-2 justify-center">
                  {level.classes.map((className, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {className}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <span className="text-blue-600 font-medium">
                    Voir les classes →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}