import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000';

export default function StudentBulletinsPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentAndBulletins();
  }, [studentId]);

  const loadStudentAndBulletins = async () => {
    try {
      // Charger info élève
      const studentRes = await fetch(`${API_BASE_URL}/api/student/${studentId}`);
      const studentData = await studentRes.json();
      setStudent(studentData);

      // Charger bulletins
      const bulletinsRes = await fetch(`${API_BASE_URL}/api/student/${studentId}/bulletins`);
      const bulletinsData = await bulletinsRes.json();
      setBulletins(bulletinsData);
    } catch (error) {
      console.error('❌ Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewBulletin = (bulletin) => {
    const bulletinData = JSON.parse(bulletin.data_json);
    localStorage.setItem('printBulletinData', JSON.stringify(bulletinData));
    window.open('/print-bulletin', '_blank');
  };

  const handleContinueBulletin = (bulletin) => {
    // Naviguer vers le formulaire correspondant
    navigate(`/bulletin/${bulletin.bulletin_type}/${studentId}`, {
      state: { 
        bulletinId: bulletin.id,
        isEditing: true
      }
    });
  };

  const handleDeleteBulletin = async (bulletinId) => {
    if (window.confirm('Supprimer ce bulletin ?')) {
      try {
        // À IMPLÉMENTER : ajoutez cette route dans votre backend
        // const response = await fetch(`${API_BASE_URL}/api/bulletin/${bulletinId}`, { method: 'DELETE' });
        alert('Fonctionnalité à implémenter');
        loadStudentAndBulletins();
      } catch (error) {
        console.error('❌ Erreur suppression:', error);
      }
    }
  };

  const getBulletinTypeLabel = (type) => {
    switch(type) {
      case 'anglophone': return '📘 Anglophone';
      case 'francophone': return '📗 Francophone';
      case 'maternelle': return '🎨 Maternelle';
      default: return type;
    }
  };

  const getTrimesterLabel = (trimestre) => {
    switch(trimestre) {
      case 'Term 1': return '1er Trimestre';
      case 'Term 2': return '2ème Trimestre';
      case 'Term 3': return '3ème Trimestre';
      default: return trimestre;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Retour
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              📁 Bulletins de {student?.full_name}
            </h1>
            <p className="text-gray-600">
              {student?.class_display_name || student?.class_name} • 
              Matricule: {student?.matricule}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/bulletin/anglophone/${studentId}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Nouveau Anglophone
            </button>
            <button
              onClick={() => navigate(`/bulletin/francophone/${studentId}`)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              + Nouveau Francophone
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Bulletins</div>
          <div className="text-2xl font-bold">{bulletins.length}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Dernière modification</div>
          <div className="text-lg font-medium">
            {bulletins.length > 0 
              ? new Date(bulletins[0].updated_at || bulletins[0].created_at).toLocaleDateString()
              : 'Aucun'
            }
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Statut</div>
          <div className={`text-lg font-medium ${bulletins.length >= 3 ? 'text-green-600' : 'text-yellow-600'}`}>
            {bulletins.length >= 3 ? 'Complet' : `${bulletins.length}/3 bulletins`}
          </div>
        </div>
      </div>

      {/* Liste des bulletins */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {bulletins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-xl mb-2">Aucun bulletin créé</p>
            <p className="text-gray-600 mb-4">Commencez par créer un bulletin pour cet élève</p>
            <button
              onClick={() => navigate(`/bulletin/anglophone/${studentId}`)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Créer premier bulletin
            </button>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Trimestre</th>
                  <th className="p-4 text-left">Année scolaire</th>
                  <th className="p-4 text-left">Statut</th>
                  <th className="p-4 text-left">Dernière modification</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bulletins.map(bulletin => (
                  <tr key={bulletin.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <span className="font-medium">
                        {getBulletinTypeLabel(bulletin.bulletin_type)}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {getTrimesterLabel(bulletin.trimester)}
                      </span>
                    </td>
                    
                    <td className="p-4">{bulletin.academic_year}</td>
                    
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${bulletin.is_draft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {bulletin.is_draft ? 'Brouillon' : 'Finalisé'}
                      </span>
                    </td>
                    
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(bulletin.updated_at || bulletin.created_at).toLocaleString()}
                    </td>
                    
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewBulletin(bulletin)}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                        >
                          👁️ Voir
                        </button>
                        
                        <button
                          onClick={() => handleContinueBulletin(bulletin)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          {bulletin.is_draft ? 'Continuer' : 'Modifier'}
                        </button>
                        
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          🖨️ Imprimer
                        </button>
                        
                        <button
                          onClick={() => handleDeleteBulletin(bulletin.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Résumé par trimestre */}
      {bulletins.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">📊 Résumé par trimestre</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Term 1', 'Term 2', 'Term 3'].map(trimestre => {
              const trimBulletins = bulletins.filter(b => b.trimester === trimestre);
              return (
                <div key={trimestre} className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-medium mb-3">{getTrimesterLabel(trimestre)}</h4>
                  {trimBulletins.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucun bulletin</p>
                  ) : (
                    <div className="space-y-2">
                      {trimBulletins.map(b => (
                        <div key={b.id} className="flex justify-between items-center text-sm">
                          <span>{getBulletinTypeLabel(b.bulletin_type)}</span>
                          <span className={`px-2 py-1 rounded ${b.is_draft ? 'bg-yellow-100' : 'bg-green-100'}`}>
                            {b.is_draft ? 'Brouillon' : '✓'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}