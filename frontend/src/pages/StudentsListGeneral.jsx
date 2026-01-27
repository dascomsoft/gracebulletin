// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trash2, Printer, UserPlus, Download, Edit } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:3000';

// const StudentsListGeneral = () => {
//     const navigate = useNavigate();
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [expandedClasses, setExpandedClasses] = useState({});
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [studentToDelete, setStudentToDelete] = useState(null);

//     // Classes par section
//     const ANGLOPHONE_CLASSES = [
//         'Pre-Nursery', 'Nursery 1', 'Nursery 2', 
//         'Class 1', 'Class 2', 'Class 3', 
//         'Class 4', 'Class 5', 'Class 6'
//     ];

//     const FRANCOPHONE_CLASSES = [
//         'Petite section', 'Moyenne section', 'Grande section',
//         'SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'
//     ];

//     useEffect(() => {
//         fetchAllStudents();
//     }, []);

//     const fetchAllStudents = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/api/students`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setStudents(data);
                
//                 // Développer toutes les classes par défaut
//                 const allClasses = [...ANGLOPHONE_CLASSES, ...FRANCOPHONE_CLASSES];
//                 const expanded = {};
//                 allClasses.forEach(cls => {
//                     expanded[cls] = true;
//                 });
//                 setExpandedClasses(expanded);
//             }
//         } catch (error) {
//             console.error('Erreur chargement élèves:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleClass = (className) => {
//         setExpandedClasses(prev => ({
//             ...prev,
//             [className]: !prev[className]
//         }));
//     };

//     const toggleAll = (section) => {
//         const classes = section === 'anglophone' ? ANGLOPHONE_CLASSES : FRANCOPHONE_CLASSES;
//         const allExpanded = classes.every(cls => expandedClasses[cls]);
        
//         const newExpanded = { ...expandedClasses };
//         classes.forEach(cls => {
//             newExpanded[cls] = !allExpanded;
//         });
//         setExpandedClasses(newExpanded);
//     };

//     const getStudentsByClass = (className) => {
//         return students.filter(student => 
//             student.class_name === className || 
//             student.class_display_name === className
//         ).sort((a, b) => a.full_name?.localeCompare(b.full_name));
//     };

//     const getClassStats = (className) => {
//         const classStudents = getStudentsByClass(className);
//         const boys = classStudents.filter(s => s.sex?.toLowerCase() === 'male' || s.sex?.toLowerCase() === 'masculin' || s.sex?.toLowerCase() === 'boy').length;
//         const girls = classStudents.filter(s => s.sex?.toLowerCase() === 'female' || s.sex?.toLowerCase() === 'féminin' || s.sex?.toLowerCase() === 'girl').length;
        
//         return {
//             total: classStudents.length,
//             boys,
//             girls
//         };
//     };

//     const handlePrintClassList = (className) => {
//         const classStudents = getStudentsByClass(className);
//         const stats = getClassStats(className);
        
//         const printContent = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Liste des élèves - ${className}</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; margin: 20px; }
//                     .header { text-align: center; margin-bottom: 30px; }
//                     .header h1 { margin: 0; color: #2c3e50; }
//                     .header h2 { margin: 5px 0 20px 0; color: #3498db; }
//                     .info { display: flex; justify-content: space-between; margin-bottom: 20px; }
//                     .stats { background: #f8f9fa; padding: 15px; border-radius: 5px; }
//                     table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//                     th { background: #3498db; color: white; padding: 10px; text-align: left; }
//                     td { padding: 10px; border-bottom: 1px solid #ddd; }
//                     tr:nth-child(even) { background: #f9f9f9; }
//                     .total { font-weight: bold; background: #ecf0f1; }
//                     .no-print { display: none; }
//                     @media print {
//                         @page { margin: 0.5cm; }
//                         body { margin: 0; }
//                         button { display: none !important; }
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="header">
//                     <h1>GROUPE SCOLAIRE BILINGUE THE GRACE OF GOD</h1>
//                     <h2>Liste des élèves - ${className}</h2>
//                     <p>Année scolaire: ${new Date().getFullYear()}-${new Date().getFullYear() + 1}</p>
//                 </div>
                
//                 <div class="info">
//                     <div class="stats">
//                         <p>Total élèves: <strong>${stats.total}</strong></p>
//                         <p>Garçons: <strong>${stats.boys}</strong> | Filles: <strong>${stats.girls}</strong></p>
//                     </div>
//                     <div>Date: ${new Date().toLocaleDateString('fr-FR')}</div>
//                 </div>
                
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Nom complet</th>
//                             <th>Sexe</th>
//                             <th>Matricule</th>
//                             <th>Date de naissance</th>
//                             <th>Contact parent</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${classStudents.map((student, index) => `
//                             <tr>
//                                 <td>${index + 1}</td>
//                                 <td>${student.full_name || student.nom_complet || 'N/A'}</td>
//                                 <td>${student.sex || 'N/A'}</td>
//                                 <td>${student.matricule || 'N/A'}</td>
//                                 <td>${student.date_of_birth || 'N/A'}</td>
//                                 <td>${student.parent_phone || 'N/A'}</td>
//                             </tr>
//                         `).join('')}
//                         <tr class="total">
//                             <td colspan="6" style="text-align: center;">
//                                 Total: ${stats.total} élèves (${stats.boys} garçons, ${stats.girls} filles)
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
                
//                 <div class="no-print" style="margin-top: 30px; text-align: center;">
//                     <button onclick="window.print()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
//                         Imprimer
//                     </button>
//                     <button onclick="window.close()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
//                         Fermer
//                     </button>
//                 </div>
                
//                 <script>
//                     window.onload = function() {
//                         setTimeout(() => {
//                             window.print();
//                             setTimeout(() => {
//                                 if (confirm('Fermer cette fenêtre ?')) {
//                                     window.close();
//                                 }
//                             }, 1000);
//                         }, 500);
//                     };
//                 </script>
//             </body>
//             </html>
//         `;

//         const printWindow = window.open('', '_blank');
//         if (printWindow) {
//             printWindow.document.write(printContent);
//             printWindow.document.close();
//         } else {
//             alert('Veuillez autoriser les popups pour imprimer');
//         }
//     };

//     const handleExportClassList = (className) => {
//         const classStudents = getStudentsByClass(className);
//         const stats = getClassStats(className);
        
//         // Créer le contenu CSV
//         const csvContent = [
//             ['Nom complet', 'Sexe', 'Matricule', 'Date de naissance', 'Contact parent'],
//             ...classStudents.map(student => [
//                 student.full_name || student.nom_complet || '',
//                 student.sex || '',
//                 student.matricule || '',
//                 student.date_of_birth || '',
//                 student.parent_phone || ''
//             ]),
//             [],
//             [`Total élèves: ${stats.total}`],
//             [`Garçons: ${stats.boys}`],
//             [`Filles: ${stats.girls}`]
//         ].map(row => row.join(',')).join('\n');
        
//         // Créer et télécharger le fichier
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', `eleves_${className.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const handleAddStudent = (className, section) => {
//         navigate('/add-student', {
//             state: {
//                 className,
//                 section,
//                 redirectTo: '/students-list-general'
//             }
//         });
//     };

//     const handleEditStudent = (student) => {
//         navigate(`/student/${student.id}/edit`, {
//             state: {
//                 student,
//                 redirectTo: '/students-list-general'
//             }
//         });
//     };

//     const confirmDeleteStudent = (student) => {
//         setStudentToDelete(student);
//         setShowDeleteModal(true);
//     };

//     const handleDeleteStudent = async () => {
//         if (!studentToDelete) return;
        
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/student/${studentToDelete.id}`, {
//                 method: 'DELETE'
//             });
            
//             if (response.ok) {
//                 // Retirer l'élève de la liste localement
//                 setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
//                 alert(`✅ Élève "${studentToDelete.full_name}" supprimé avec succès`);
//             } else {
//                 throw new Error('Erreur lors de la suppression');
//             }
//         } catch (error) {
//             console.error('Erreur suppression:', error);
//             alert('❌ Erreur lors de la suppression');
//         } finally {
//             setShowDeleteModal(false);
//             setStudentToDelete(null);
//         }
//     };

//     const filteredStudents = students.filter(student => {
//         if (!searchTerm) return true;
        
//         const searchLower = searchTerm.toLowerCase();
//         return (
//             (student.full_name?.toLowerCase().includes(searchLower) || 
//              student.nom_complet?.toLowerCase().includes(searchLower)) ||
//             (student.matricule?.toLowerCase().includes(searchLower)) ||
//             (student.class_name?.toLowerCase().includes(searchLower)) ||
//             (student.section?.toLowerCase().includes(searchLower))
//         );
//     });

//     const filteredAnglophoneClasses = ANGLOPHONE_CLASSES.filter(cls => 
//         filteredStudents.some(s => s.class_name === cls || s.class_display_name === cls) ||
//         searchTerm === ''
//     );

//     const filteredFrancophoneClasses = FRANCOPHONE_CLASSES.filter(cls => 
//         filteredStudents.some(s => s.class_name === cls || s.class_display_name === cls) ||
//         searchTerm === ''
//     );

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Chargement de la liste des élèves...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             {/* Modal de confirmation suppression */}
//             {showDeleteModal && studentToDelete && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//                         <h3 className="text-lg font-bold text-red-600 mb-2">Confirmer la suppression</h3>
//                         <p className="mb-4">
//                             Êtes-vous sûr de vouloir supprimer l'élève <strong>{studentToDelete.full_name}</strong> de la classe {studentToDelete.class_name} ?
//                         </p>
//                         <p className="text-sm text-gray-600 mb-6">
//                             Cette action est irréversible.
//                         </p>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
//                             >
//                                 Annuler
//                             </button>
//                             <button
//                                 onClick={handleDeleteStudent}
//                                 className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
//                             >
//                                 Confirmer la suppression
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                         <div>
//                             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Liste Générale des Élèves</h1>
//                             <p className="text-gray-600 mt-1">
//                                 Total: <span className="font-semibold">{students.length}</span> élèves
//                             </p>
//                         </div>
                        
//                         <div className="flex flex-col xs:flex-row gap-3 w-full md:w-auto">
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     placeholder="Rechercher un élève..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                                 <div className="absolute left-3 top-2.5 text-gray-400">
//                                     🔍
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => navigate('/add-student')}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                             >
//                                 <UserPlus size={16} />
//                                 Ajouter un élève
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sections */}
//                 <div className="space-y-8">
//                     {/* Section Anglophone */}
//                     <div className="bg-white rounded-xl shadow">
//                         <div className="p-4 border-b flex justify-between items-center">
//                             <div className="flex items-center gap-3">
//                                 <h2 className="text-xl font-bold text-blue-700">Section Anglophone</h2>
//                                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                                     {ANGLOPHONE_CLASSES.reduce((sum, cls) => sum + getClassStats(cls).total, 0)} élèves
//                                 </span>
//                             </div>
//                             <button
//                                 onClick={() => toggleAll('anglophone')}
//                                 className="text-sm text-blue-600 hover:text-blue-800"
//                             >
//                                 {filteredAnglophoneClasses.every(cls => expandedClasses[cls]) ? 'Réduire tout' : 'Développer tout'}
//                             </button>
//                         </div>
                        
//                         <div className="divide-y">
//                             {filteredAnglophoneClasses.map(className => {
//                                 const stats = getClassStats(className);
//                                 const isExpanded = expandedClasses[className];
                                
//                                 return (
//                                     <div key={className} className="p-4">
//                                         <div 
//                                             className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
//                                             onClick={() => toggleClass(className)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
//                                                     ▶
//                                                 </div>
//                                                 <h3 className="text-lg font-semibold text-gray-800">{className}</h3>
//                                                 <div className="flex gap-2">
//                                                     <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                                                         {stats.total} élèves
//                                                     </span>
//                                                     <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
//                                                         {stats.boys} garçons
//                                                     </span>
//                                                     <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
//                                                         {stats.girls} filles
//                                                     </span>
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//                                                 <button
//                                                     onClick={() => handlePrintClassList(className)}
//                                                     className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
//                                                     title="Imprimer la liste"
//                                                 >
//                                                     <Printer size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleExportClassList(className)}
//                                                     className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
//                                                     title="Exporter en CSV"
//                                                 >
//                                                     <Download size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleAddStudent(className, 'Anglophone')}
//                                                     className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
//                                                     title="Ajouter un élève"
//                                                 >
//                                                     <UserPlus size={18} />
//                                                 </button>
//                                             </div>
//                                         </div>
                                        
//                                         {isExpanded && (
//                                             <div className="mt-3 ml-8">
//                                                 {getStudentsByClass(className).length === 0 ? (
//                                                     <div className="text-center py-4 text-gray-500">
//                                                         Aucun élève dans cette classe
//                                                     </div>
//                                                 ) : (
//                                                     <div className="overflow-x-auto">
//                                                         <table className="w-full text-sm">
//                                                             <thead>
//                                                                 <tr className="bg-gray-50">
//                                                                     <th className="p-3 text-left">Nom complet</th>
//                                                                     <th className="p-3 text-left">Sexe</th>
//                                                                     <th className="p-3 text-left">Matricule</th>
//                                                                     <th className="p-3 text-left">Date de naissance</th>
//                                                                     <th className="p-3 text-left">Actions</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 {getStudentsByClass(className).map((student, index) => (
//                                                                     <tr key={student.id} className="border-t hover:bg-gray-50">
//                                                                         <td className="p-3">
//                                                                             <div className="font-medium">{student.full_name || student.nom_complet}</div>
//                                                                             {student.parent_phone && (
//                                                                                 <div className="text-xs text-gray-500">{student.parent_phone}</div>
//                                                                             )}
//                                                                         </td>
//                                                                         <td className="p-3">
//                                                                             <span className={`px-2 py-1 rounded-full text-xs ${
//                                                                                 student.sex?.toLowerCase() === 'male' || student.sex?.toLowerCase() === 'boy' 
//                                                                                     ? 'bg-blue-100 text-blue-800' 
//                                                                                     : 'bg-pink-100 text-pink-800'
//                                                                             }`}>
//                                                                                 {student.sex || 'Non spécifié'}
//                                                                             </span>
//                                                                         </td>
//                                                                         <td className="p-3">
//                                                                             {student.matricule ? (
//                                                                                 <code className="bg-gray-100 px-2 py-1 rounded text-xs">{student.matricule}</code>
//                                                                             ) : (
//                                                                                 <span className="text-gray-400 text-xs">Non assigné</span>
//                                                                             )}
//                                                                         </td>
//                                                                         <td className="p-3">{student.date_of_birth || '-'}</td>
//                                                                         <td className="p-3">
//                                                                             <div className="flex gap-2">
//                                                                                 <button
//                                                                                     onClick={() => handleEditStudent(student)}
//                                                                                     className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
//                                                                                     title="Modifier"
//                                                                                 >
//                                                                                     <Edit size={16} />
//                                                                                 </button>
//                                                                                 <button
//                                                                                     onClick={() => confirmDeleteStudent(student)}
//                                                                                     className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
//                                                                                     title="Supprimer"
//                                                                                 >
//                                                                                     <Trash2 size={16} />
//                                                                                 </button>
//                                                                             </div>
//                                                                         </td>
//                                                                     </tr>
//                                                                 ))}
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Section Francophone */}
//                     <div className="bg-white rounded-xl shadow">
//                         <div className="p-4 border-b flex justify-between items-center">
//                             <div className="flex items-center gap-3">
//                                 <h2 className="text-xl font-bold text-green-700">Section Francophone</h2>
//                                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                                     {FRANCOPHONE_CLASSES.reduce((sum, cls) => sum + getClassStats(cls).total, 0)} élèves
//                                 </span>
//                             </div>
//                             <button
//                                 onClick={() => toggleAll('francophone')}
//                                 className="text-sm text-green-600 hover:text-green-800"
//                             >
//                                 {filteredFrancophoneClasses.every(cls => expandedClasses[cls]) ? 'Réduire tout' : 'Développer tout'}
//                             </button>
//                         </div>
                        
//                         <div className="divide-y">
//                             {filteredFrancophoneClasses.map(className => {
//                                 const stats = getClassStats(className);
//                                 const isExpanded = expandedClasses[className];
                                
//                                 return (
//                                     <div key={className} className="p-4">
//                                         <div 
//                                             className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
//                                             onClick={() => toggleClass(className)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
//                                                     ▶
//                                                 </div>
//                                                 <h3 className="text-lg font-semibold text-gray-800">{className}</h3>
//                                                 <div className="flex gap-2">
//                                                     <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                                                         {stats.total} élèves
//                                                     </span>
//                                                     <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
//                                                         {stats.boys} garçons
//                                                     </span>
//                                                     <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
//                                                         {stats.girls} filles
//                                                     </span>
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//                                                 <button
//                                                     onClick={() => handlePrintClassList(className)}
//                                                     className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
//                                                     title="Imprimer la liste"
//                                                 >
//                                                     <Printer size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleExportClassList(className)}
//                                                     className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
//                                                     title="Exporter en CSV"
//                                                 >
//                                                     <Download size={18} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleAddStudent(className, 'Francophone')}
//                                                     className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
//                                                     title="Ajouter un élève"
//                                                 >
//                                                     <UserPlus size={18} />
//                                                 </button>
//                                             </div>
//                                         </div>
                                        
//                                         {isExpanded && (
//                                             <div className="mt-3 ml-8">
//                                                 {getStudentsByClass(className).length === 0 ? (
//                                                     <div className="text-center py-4 text-gray-500">
//                                                         Aucun élève dans cette classe
//                                                     </div>
//                                                 ) : (
//                                                     <div className="overflow-x-auto">
//                                                         <table className="w-full text-sm">
//                                                             <thead>
//                                                                 <tr className="bg-gray-50">
//                                                                     <th className="p-3 text-left">Nom complet</th>
//                                                                     <th className="p-3 text-left">Sexe</th>
//                                                                     <th className="p-3 text-left">Matricule</th>
//                                                                     <th className="p-3 text-left">Date de naissance</th>
//                                                                     <th className="p-3 text-left">Actions</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 {getStudentsByClass(className).map((student, index) => (
//                                                                     <tr key={student.id} className="border-t hover:bg-gray-50">
//                                                                         <td className="p-3">
//                                                                             <div className="font-medium">{student.full_name || student.nom_complet}</div>
//                                                                             {student.parent_phone && (
//                                                                                 <div className="text-xs text-gray-500">{student.parent_phone}</div>
//                                                                             )}
//                                                                         </td>
//                                                                         <td className="p-3">
//                                                                             <span className={`px-2 py-1 rounded-full text-xs ${
//                                                                                 student.sex?.toLowerCase() === 'masculin' || student.sex?.toLowerCase() === 'male' 
//                                                                                     ? 'bg-blue-100 text-blue-800' 
//                                                                                     : 'bg-pink-100 text-pink-800'
//                                                                             }`}>
//                                                                                 {student.sex || 'Non spécifié'}
//                                                                             </span>
//                                                                         </td>
//                                                                         <td className="p-3">
//                                                                             {student.matricule ? (
//                                                                                 <code className="bg-gray-100 px-2 py-1 rounded text-xs">{student.matricule}</code>
//                                                                             ) : (
//                                                                                 <span className="text-gray-400 text-xs">Non assigné</span>
//                                                                             )}
//                                                                         </td>
//                                                                         <td className="p-3">{student.date_of_birth || '-'}</td>
//                                                                         <td className="p-3">
//                                                                             <div className="flex gap-2">
//                                                                                 <button
//                                                                                     onClick={() => handleEditStudent(student)}
//                                                                                     className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
//                                                                                     title="Modifier"
//                                                                                 >
//                                                                                     <Edit size={16} />
//                                                                                 </button>
//                                                                                 <button
//                                                                                     onClick={() => confirmDeleteStudent(student)}
//                                                                                     className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
//                                                                                     title="Supprimer"
//                                                                                 >
//                                                                                     <Trash2 size={16} />
//                                                                                 </button>
//                                                                             </div>
//                                                                         </td>
//                                                                     </tr>
//                                                                 ))}
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Statistiques générales */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="bg-white rounded-xl shadow p-4">
//                         <div className="text-sm text-gray-600">Total élèves</div>
//                         <div className="text-2xl font-bold text-gray-800">{students.length}</div>
//                     </div>
//                     <div className="bg-white rounded-xl shadow p-4">
//                         <div className="text-sm text-gray-600">Garçons</div>
//                         <div className="text-2xl font-bold text-blue-600">
//                             {students.filter(s => s.sex?.toLowerCase() === 'male' || s.sex?.toLowerCase() === 'masculin' || s.sex?.toLowerCase() === 'boy').length}
//                         </div>
//                     </div>
//                     <div className="bg-white rounded-xl shadow p-4">
//                         <div className="text-sm text-gray-600">Filles</div>
//                         <div className="text-2xl font-bold text-pink-600">
//                             {students.filter(s => s.sex?.toLowerCase() === 'female' || s.sex?.toLowerCase() === 'féminin' || s.sex?.toLowerCase() === 'girl').length}
//                         </div>
//                     </div>
//                     <div className="bg-white rounded-xl shadow p-4">
//                         <div className="text-sm text-gray-600">Classes</div>
//                         <div className="text-2xl font-bold text-green-600">
//                             {[...new Set(students.map(s => s.class_name || s.class_display_name).filter(Boolean))].length}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentsListGeneral;








// frontend/src/pages/StudentsListGeneral.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Download, UserPlus, Trash2, Edit, Users, School, Filter, Search, ChevronDown, Eye, FileText, RefreshCw, FolderOpen } from 'lucide-react';

const StudentsListGeneral = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedClasses, setExpandedClasses] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSection, setFilterSection] = useState('all');
    const [currentAcademicYear, setCurrentAcademicYear] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedClassForAdd, setSelectedClassForAdd] = useState(null);
    const [newStudent, setNewStudent] = useState({
        first_name: '',
        last_name: '',
        matricule: '',
        class_id: '',
        sex: '',
        academic_year: '',
        photo_file: null,
        photo_preview: null
    });
    const [uploading, setUploading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [photoStats, setPhotoStats] = useState({});
    const fileInputRef = useRef(null);
    
    const API_BASE_URL = 'http://localhost:3000';

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

    // Liste des classes BASÉE SUR VOS DOSSIERS
    const ALL_CLASSES = [
        // Francophone - Maternelle
        { name: 'PETITE SECTION', section: 'francophone', displayName: 'Petite Section', folderName: 'PETITE SECTION' },
        { name: 'MOYENNE SECTION', section: 'francophone', displayName: 'Moyenne Section', folderName: 'MOYENNE SECTION' },
        { name: 'GRANDE SECTION', section: 'francophone', displayName: 'Grande Section', folderName: 'GRANDE SECTION' },
        
        // Francophone - Primaire
        { name: 'SIL', section: 'francophone', displayName: 'SIL', folderName: 'SIL' },
        { name: 'CP', section: 'francophone', displayName: 'CP', folderName: 'CP' },
        { name: 'CEI', section: 'francophone', displayName: 'CEI', folderName: 'CEI' },
        { name: 'CEII', section: 'francophone', displayName: 'CEII', folderName: 'CEII' },
        { name: 'CM1', section: 'francophone', displayName: 'CM1', folderName: 'CM1' },
        { name: 'CM2', section: 'francophone', displayName: 'CM2', folderName: 'CM2' },
        
        // Anglophone - Nursery
        { name: 'NURSERY1 AND PRE-NURSERY', section: 'anglophone', displayName: 'Nursery 1 & Pre-Nursery', folderName: 'NURSERY1 AND PRE-NURSERY' },
        { name: 'NURSERY2', section: 'anglophone', displayName: 'Nursery 2', folderName: 'NURSERY2' },
        
        // Anglophone - Primary
        { name: 'CLASS1', section: 'anglophone', displayName: 'Class 1', folderName: 'CLASS1' },
        { name: 'CLASS2', section: 'anglophone', displayName: 'Class 2', folderName: 'CLASS2' },
        { name: 'CLASS4', section: 'anglophone', displayName: 'Class 4', folderName: 'CLASS4' }
    ];

    useEffect(() => {
        fetchCurrentAcademicYear();
        fetchAllStudents();
        scanPhotoDirectories();
    }, []);

    const fetchCurrentAcademicYear = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/academic-year/current`);
            if (response.ok) {
                const data = await response.json();
                setCurrentAcademicYear(data.academic_year);
                setNewStudent(prev => ({
                    ...prev,
                    academic_year: data.academic_year
                }));
            } else {
                const academicYear = getCurrentAcademicYear();
                setCurrentAcademicYear(academicYear);
                setNewStudent(prev => ({
                    ...prev,
                    academic_year: academicYear
                }));
            }
        } catch (error) {
            console.warn('Impossible de récupérer l\'année scolaire:', error);
            const academicYear = getCurrentAcademicYear();
            setCurrentAcademicYear(academicYear);
            setNewStudent(prev => ({
                ...prev,
                academic_year: academicYear
            }));
        }
    };

    // Scanner les dossiers de photos pour voir combien de fichiers existent
    const scanPhotoDirectories = async () => {
        try {
            setScanning(true);
            const stats = {};
            
            // Pour chaque classe, compter les fichiers photos
            for (const cls of ALL_CLASSES) {
                try {
                    const response = await fetch(`${API_BASE_URL}/ecole%20details/${cls.folderName}/`);
                    if (response.ok) {
                        // Récupérer la liste des fichiers (nécessite une API côté serveur)
                        // Pour l'instant, on va simplement compter via une estimation
                        stats[cls.folderName] = { estimated: '?', actual: 0 };
                    }
                } catch (error) {
                    console.log(`Dossier ${cls.folderName} non accessible via HTTP`);
                    stats[cls.folderName] = { estimated: '0', actual: 0 };
                }
            }
            
            setPhotoStats(stats);
        } catch (error) {
            console.error('Erreur scan des photos:', error);
        } finally {
            setScanning(false);
        }
    };

    const fetchAllStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${API_BASE_URL}/api/students`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📊 Élèves chargés depuis la base:', data.length);
            
            // DEBUG: Afficher toutes les classes des élèves
            const classCount = {};
            data.forEach((student, index) => {
                const className = student.class_name || student.class_display_name || 'N/A';
                classCount[className] = (classCount[className] || 0) + 1;
            });
            
            console.log('📊 Répartition par classe:', classCount);
            
            // Trier les élèves par nom complet
            const sortedStudents = data.sort((a, b) => {
                const nameA = (a.full_name || a.nom_complet || '').toLowerCase();
                const nameB = (b.full_name || b.nom_complet || '').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            
            setStudents(sortedStudents);
            
            // Développer seulement les classes qui ont des élèves
            const expanded = {};
            data.forEach(student => {
                const className = student.class_name || student.class_display_name;
                if (className) {
                    expanded[className] = true;
                }
            });
            setExpandedClasses(expanded);
            
        } catch (error) {
            console.error('Erreur chargement élèves:', error);
            setError('Impossible de charger la liste des élèves. Vérifiez que le serveur est en marche.');
        } finally {
            setLoading(false);
        }
    };

    const toggleClass = (className) => {
        setExpandedClasses(prev => ({
            ...prev,
            [className]: !prev[className]
        }));
    };

    const getStudentsByClass = (className) => {
        const classEntry = ALL_CLASSES.find(cls => 
            cls.name === className || 
            cls.displayName === className ||
            cls.folderName === className
        );
        
        if (!classEntry) {
            return students.filter(student => {
                const studentClass = student.class_name || student.class_display_name || '';
                return studentClass.toLowerCase() === className.toLowerCase();
            });
        }
        
        const folderName = classEntry.folderName;
        const classStudents = students.filter(student => {
            const studentClass = student.class_name || student.class_display_name || '';
            
            // Nettoyer les noms de classe
            const cleanStudentClass = studentClass.trim().toUpperCase();
            const cleanFolderName = folderName.trim().toUpperCase();
            
            return (
                cleanStudentClass === cleanFolderName ||
                cleanStudentClass.includes(cleanFolderName) ||
                cleanFolderName.includes(cleanStudentClass)
            );
        });
        
        console.log(`🔍 Recherche "${folderName}": ${classStudents.length} élèves trouvés`);
        if (classStudents.length > 0) {
            classStudents.forEach(s => {
                console.log(`   - ${s.full_name} (${s.class_name || s.class_display_name})`);
            });
        }
        
        return classStudents;
    };

    const getFilteredClasses = () => {
        return ALL_CLASSES.filter(cls => {
            if (filterSection !== 'all' && cls.section !== filterSection) return false;
            
            const classStudents = getStudentsByClass(cls.name);
            const hasStudents = classStudents.length > 0;
            
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                
                // Recherche dans le nom de la classe
                if (cls.name.toLowerCase().includes(searchLower) || 
                    cls.displayName.toLowerCase().includes(searchLower) ||
                    cls.folderName.toLowerCase().includes(searchLower)) {
                    return true;
                }
                
                // Recherche dans les élèves de cette classe
                const hasMatchingStudents = classStudents.some(student => {
                    const matchesName = student.full_name?.toLowerCase().includes(searchLower) ||
                                       student.nom_complet?.toLowerCase().includes(searchLower);
                    const matchesMatricule = student.matricule?.toLowerCase().includes(searchLower);
                    
                    return matchesName || matchesMatricule;
                });
                
                return hasMatchingStudents;
            }
            
            return hasStudents;
        }).sort((a, b) => {
            // Trier par ordre logique (maternelle -> primaire -> secondaire)
            const order = ['PETITE SECTION', 'MOYENNE SECTION', 'GRANDE SECTION', 
                          'SIL', 'CP', 'CEI', 'CEII', 'CM1', 'CM2',
                          'NURSERY1', 'NURSERY2', 'CLASS1', 'CLASS2', 'CLASS4'];
            
            const indexA = order.findIndex(item => 
                a.name.includes(item) || a.folderName.includes(item));
            const indexB = order.findIndex(item => 
                b.name.includes(item) || b.folderName.includes(item));
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            
            return a.name.localeCompare(b.name);
        });
    };

    // Fonction pour vérifier les problèmes de données
    const checkDataConsistency = () => {
        console.log('🔍 Vérification des données...');
        
        // Vérifier les élèves sans classe
        const studentsWithoutClass = students.filter(s => 
            !s.class_name && !s.class_display_name
        );
        if (studentsWithoutClass.length > 0) {
            console.log(`⚠️ ${studentsWithoutClass.length} élèves sans classe:`);
            studentsWithoutClass.forEach(s => {
                console.log(`   - ${s.full_name} (ID: ${s.id})`);
            });
        }
        
        // Vérifier les classes inconnues
        const knownClasses = ALL_CLASSES.map(c => c.folderName.toUpperCase());
        const allStudentClasses = new Set();
        
        students.forEach(s => {
            const className = (s.class_name || s.class_display_name || '').toUpperCase().trim();
            if (className && !knownClasses.some(kc => 
                className.includes(kc) || kc.includes(className))) {
                allStudentClasses.add(className);
            }
        });
        
        if (allStudentClasses.size > 0) {
            console.log('⚠️ Classes inconnues dans la base:');
            allStudentClasses.forEach(cls => {
                console.log(`   - "${cls}"`);
                const count = students.filter(s => 
                    (s.class_name || s.class_display_name || '').toUpperCase().trim() === cls
                ).length;
                console.log(`     ${count} élèves`);
            });
        }
        
        // Compter les élèves par classe réelle
        const classCounts = {};
        ALL_CLASSES.forEach(cls => {
            const count = getStudentsByClass(cls.name).length;
            classCounts[cls.name] = count;
        });
        
        console.log('📊 Statistiques par classe:', classCounts);
    };

    // ===== FONCTIONS D'AJOUT D'ÉLÈVE =====
    const openAddModal = (className, section) => {
        const classInfo = ALL_CLASSES.find(cls => cls.name === className);
        if (!classInfo) return;
        
        setSelectedClassForAdd({ 
            name: className, 
            section: section,
            folderName: classInfo.folderName 
        });
        setNewStudent({
            first_name: '',
            last_name: '',
            matricule: '',
            class_id: classInfo.folderName,
            sex: '',
            academic_year: currentAcademicYear,
            photo_file: null,
            photo_preview: null
        });
        setShowAddModal(true);
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
            if (!newStudent.first_name.trim() || !newStudent.last_name.trim() || !selectedClassForAdd) {
                alert('Le prénom, le nom de famille et la classe sont requis');
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
                
                const uploadResponse = await fetch(`${API_BASE_URL}/api/upload/student-photo`, {
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
                class_name: selectedClassForAdd.folderName,
                sex: newStudent.sex.trim() || undefined,
                photo_path: photoPath,
                academic_year: newStudent.academic_year
            };

            console.log('📝 Ajout élève:', studentData);
            
            const response = await fetch(`${API_BASE_URL}/api/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData)
            });

            const responseData = await response.json();
            console.log('📝 Réponse ajout:', responseData);
            
            if (response.ok) {
                const fullName = `${newStudent.first_name} ${newStudent.last_name}`;
                alert(`✅ Élève ${fullName} ajouté avec succès à ${selectedClassForAdd.name}`);
                setShowAddModal(false);
                resetAddForm();
                fetchAllStudents();
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

    const resetAddForm = () => {
        setNewStudent({
            first_name: '',
            last_name: '',
            matricule: '',
            class_id: '',
            sex: '',
            academic_year: currentAcademicYear,
            photo_file: null,
            photo_preview: null
        });
        setSelectedClassForAdd(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const loadImage = (photoPath) => {
        if (!photoPath) return null;
        return `${API_BASE_URL}/${photoPath}`;
    };

    // ===== FONCTIONS D'ACTION =====
    const handlePrintClass = (className) => {
        const classStudents = getStudentsByClass(className);
        const displayName = ALL_CLASSES.find(cls => cls.name === className)?.displayName || className;
        
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Liste des élèves - ${displayName}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                    h1 { color: #333; margin-bottom: 5px; }
                    h2 { color: #666; margin-top: 0; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background-color: #4f46e5; color: white; padding: 12px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #ddd; }
                    tr:nth-child(even) { background-color: #f9fafb; }
                    .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
                    .total { font-weight: bold; background-color: #f3f4f6; }
                    .info { margin-bottom: 20px; padding: 10px; background: #f0f9ff; border-radius: 5px; }
                    @media print {
                        @page { margin: 0.5cm; }
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>GROUPE SCOLAIRE BILINGUE "THE GRACE OF GOD"</h1>
                    <h2>Liste des élèves - ${displayName}</h2>
                    <p>Année scolaire: ${currentAcademicYear}</p>
                </div>
                
                <div class="info">
                    <p><strong>Classe:</strong> ${displayName}</p>
                    <p><strong>Total élèves:</strong> ${classStudents.length}</p>
                    <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nom complet</th>
                            <th>Matricule</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${classStudents.map((student, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${student.full_name || student.nom_complet || 'N/A'}</td>
                                <td>${student.matricule || 'Non assigné'}</td>
                            </tr>
                        `).join('')}
                        <tr class="total">
                            <td colspan="3" style="text-align: center; padding: 15px;">
                                Total: ${classStudents.length} élève${classStudents.length > 1 ? 's' : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>Document généré automatiquement par le système de gestion scolaire</p>
                    <p>© ${new Date().getFullYear()} - École Bilingue</p>
                </div>
                
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => {
                            window.close();
                        }, 1000);
                    };
                </script>
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Veuillez autoriser les popups pour imprimer');
            return;
        }
        
        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    const handleViewStudent = (studentId) => {
        navigate(`/student/${studentId}/dashboard`);
    };

    const handleEditStudent = (student) => {
        navigate(`/student/${student.id}/edit`, {
            state: { 
                student: student,
                redirectTo: '/students-list-general' 
            }
        });
    };

    const confirmDeleteStudent = (student) => {
        setStudentToDelete(student);
        setShowDeleteModal(true);
    };

    const handleDeleteStudent = async () => {
        if (!studentToDelete) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/student/${studentToDelete.id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
                alert(`✅ Élève "${studentToDelete.full_name || studentToDelete.nom_complet}" supprimé avec succès`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur suppression:', error);
            alert(`❌ ${error.message}`);
        } finally {
            setShowDeleteModal(false);
            setStudentToDelete(null);
        }
    };

    const getTotalStudents = () => {
        return students.length;
    };

    const getTotalClasses = () => {
        const uniqueClasses = new Set();
        students.forEach(student => {
            const className = student.class_name || student.class_display_name;
            if (className) uniqueClasses.add(className);
        });
        return uniqueClasses.size;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement de la liste des élèves...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={fetchAllStudents}
                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            🔄 Réessayer
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            ← Retour au tableau de bord
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Vérifier la consistance des données
    checkDataConsistency();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
            {/* Modal de confirmation de suppression */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Confirmer la suppression</h3>
                        <p className="text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer l'élève <span className="font-semibold">{studentToDelete?.full_name || studentToDelete?.nom_complet}</span> ?
                            <br />
                            <span className="text-sm text-red-600">Cette action est irréversible.</span>
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteStudent}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Supprimer définitivement
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal d'ajout d'élève */}
            {showAddModal && selectedClassForAdd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Ajouter un élève - {selectedClassForAdd.name}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetAddForm();
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
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Classe
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedClassForAdd.name}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    
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
                                        resetAddForm();
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
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">📋 Liste Générale des Élèves</h1>
                            <p className="text-gray-600 mt-1">
                                Année scolaire: <span className="font-semibold text-blue-600">{currentAcademicYear}</span>
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    {getTotalStudents()} élève{getTotalStudents() > 1 ? 's' : ''}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    {getTotalClasses()} classe{getTotalClasses() > 1 ? 's' : ''}
                                </span>
                                <button
                                    onClick={checkDataConsistency}
                                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
                                    title="Vérifier les données"
                                >
                                    🔍 Vérifier
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/add-student')}
                                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <UserPlus size={20} />
                                <span>Ajouter un élève</span>
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                            >
                                ← Retour
                            </button>
                        </div>
                    </div>

                    {/* Barre de recherche et filtres */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Rechercher un élève, un matricule ou une classe..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilterSection('all')}
                                    className={`px-4 py-3 rounded-lg flex items-center gap-2 ${filterSection === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <Filter size={18} />
                                    Toutes
                                </button>
                                <button
                                    onClick={() => setFilterSection('anglophone')}
                                    className={`px-4 py-3 rounded-lg flex items-center gap-2 ${filterSection === 'anglophone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    🇬🇧 Anglophone
                                </button>
                                <button
                                    onClick={() => setFilterSection('francophone')}
                                    className={`px-4 py-3 rounded-lg flex items-center gap-2 ${filterSection === 'francophone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    🇫🇷 Francophone
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques globales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-800">{getTotalStudents()}</div>
                                <div className="text-gray-600">Total élèves</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <School className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-800">{getTotalClasses()}</div>
                                <div className="text-gray-600">Classes actives</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-800">{currentAcademicYear}</div>
                                <div className="text-gray-600">Année scolaire</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Liste des classes */}
                <div className="space-y-6">
                    {getFilteredClasses().map(cls => {
                        const classStudents = getStudentsByClass(cls.name);
                        const isExpanded = expandedClasses[cls.name] || false;
                        const displayName = cls.displayName || cls.name;
                        
                        return (
                            <div key={cls.name} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* En-tête de classe */}
                                <div 
                                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${cls.section === 'anglophone' ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'}`}
                                    onClick={() => toggleClass(cls.name)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${cls.section === 'anglophone' ? 'bg-blue-100' : 'bg-green-100'}`}>
                                                <span className={`text-xl font-bold ${cls.section === 'anglophone' ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {cls.section === 'anglophone' ? '🇬🇧' : '🇫🇷'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                        {classStudents.length} élève{classStudents.length > 1 ? 's' : ''}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        {cls.section === 'anglophone' ? 'Section Anglophone' : 'Section Francophone'}
                                                    </span>
                                                    {classStudents.length === 1 && cls.name === 'PETITE SECTION' && (
                                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                            ⚠️ Problème détecté
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                <ChevronDown size={24} className="text-gray-400" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Contenu dépliable */}
                                {isExpanded && (
                                    <div className="p-6 border-t border-gray-200">
                                        {/* Actions rapides */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <button
                                                onClick={() => handlePrintClass(cls.name)}
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                                                title="Imprimer la liste"
                                            >
                                                <Printer size={18} />
                                                Imprimer
                                            </button>
                                            <button
                                                onClick={() => openAddModal(cls.name, cls.section)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                                title="Ajouter un élève"
                                            >
                                                <UserPlus size={18} />
                                                Ajouter élève
                                            </button>
                                            {cls.name === 'PETITE SECTION' && classStudents.length === 1 && (
                                                <button
                                                    onClick={() => {
                                                        alert(`Problème détecté: Il y a 4 photos dans /public/ecole details/PETITE SECTION/ mais seulement 1 élève dans la base de données.\n\nCauses possibles:\n1. Les élèves ne sont pas enregistrés dans la base\n2. Le nom de classe est différent ("Petite section" vs "PETITE SECTION")\n3. Les élèves sont dans une autre classe\n\nVérifiez la console (F12) pour plus de détails.`);
                                                    }}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                                    title="Problème détecté"
                                                >
                                                    ⚠️ Problème
                                                </button>
                                            )}
                                        </div>
                                        
                                        {/* Liste des élèves avec photos */}
                                        {classStudents.length > 0 ? (
                                            <>
                                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-sm text-blue-700">
                                                        <strong>Info:</strong> {classStudents.length} élève{classStudents.length > 1 ? 's' : ''} trouvé{classStudents.length > 1 ? 's' : ''} dans la base de données.
                                                    </p>
                                                    {cls.name === 'PETITE SECTION' && classStudents.length === 1 && (
                                                        <p className="text-sm text-red-600 mt-1">
                                                            <strong>Attention:</strong> Il devrait y avoir 4 élèves (4 photos dans le dossier). Vérifiez la base de données.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                                    {classStudents.map((student) => (
                                                        <div
                                                            key={student.id}
                                                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 group"
                                                        >
                                                            {/* Photo */}
                                                            <div 
                                                                className="flex flex-col justify-center items-center h-48 bg-gray-100 rounded-t-xl overflow-hidden relative cursor-pointer"
                                                                onClick={() => handleViewStudent(student.id)}
                                                            >
                                                                {student.photo_path ? (
                                                                    <img
                                                                        src={loadImage(student.photo_path)}
                                                                        alt={student.full_name}
                                                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
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
                                                                <h3 
                                                                    className="font-bold text-lg text-gray-800 truncate mb-1 cursor-pointer hover:text-blue-600"
                                                                    onClick={() => handleViewStudent(student.id)}
                                                                >
                                                                    {student.full_name || student.nom_complet}
                                                                </h3>
                                                                <p className="text-sm text-gray-500 mb-3">
                                                                    {student.class_display_name || student.class_name}
                                                                </p>
                                                                
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => handleViewStudent(student.id)}
                                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                            title="Voir profil"
                                                                        >
                                                                            <Eye size={16} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleEditStudent(student)}
                                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                            title="Modifier"
                                                                        >
                                                                            <Edit size={16} />
                                                                        </button>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => confirmDeleteStudent(student)}
                                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                        title="Supprimer"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                                <div className="text-5xl mb-4 text-gray-400">👤</div>
                                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun élève dans cette classe</h3>
                                                <p className="text-gray-500 mb-6">
                                                    Il y a des photos dans le dossier mais aucun élève dans la base de données.
                                                </p>
                                                <button
                                                    onClick={() => openAddModal(cls.name, cls.section)}
                                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                    + Ajouter un élève
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Message si aucune classe trouvée */}
                {getFilteredClasses().length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl shadow">
                        <div className="text-6xl mb-4 text-gray-400">📚</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune classe trouvée</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? `Aucune classe ne correspond à "${searchTerm}"` : 'Aucun élève n\'a été enregistré'}
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterSection('all');
                                }}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Voir toutes les classes
                            </button>
                            <button
                                onClick={() => navigate('/add-student')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                + Ajouter un élève
                            </button>
                        </div>
                    </div>
                )}

                {/* Diagnostique */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-yellow-800 mb-4">🔍 Diagnostique du problème "Petite Section"</h3>
                    <div className="space-y-3 text-sm text-yellow-700">
                        <p><strong>Problème détecté:</strong> Il y a 4 photos dans <code>/public/ecole details/PETITE SECTION/</code> mais seulement {getStudentsByClass('PETITE SECTION').length} élève(s) dans la base de données.</p>
                        <p><strong>Causes possibles:</strong></p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Les élèves ne sont pas enregistrés dans la base de données SQLite</li>
                            <li>Le nom de classe est différent (ex: "Petite section" vs "PETITE SECTION")</li>
                            <li>Les élèves sont enregistrés dans une autre classe par erreur</li>
                            <li>Les photos ont été copiées manuellement sans enregistrement en base</li>
                        </ul>
                        <p><strong>Solution:</strong></p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Ouvrez la console du navigateur (F12) pour voir les détails</li>
                            <li>Vérifiez la table <code>students</code> dans la base de données</li>
                            <li>Utilisez le bouton "Ajouter élève" pour les ajouter manuellement</li>
                        </ul>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => {
                                console.log('🎯 DEBUG - Tous les élèves:');
                                students.forEach((s, i) => {
                                    console.log(`${i + 1}. ${s.full_name} - Classe: "${s.class_name || s.class_display_name}" - ID: ${s.id}`);
                                });
                                console.log('🎯 DEBUG - Recherche spécifique Petite Section:');
                                const petiteSectionStudents = students.filter(s => 
                                    (s.class_name || s.class_display_name || '').toUpperCase().includes('PETITE') ||
                                    (s.class_name || s.class_display_name || '').toUpperCase().includes('SECTION')
                                );
                                console.log(`Élèves potentiellement en Petite Section: ${petiteSectionStudents.length}`);
                                petiteSectionStudents.forEach(s => {
                                    console.log(`- ${s.full_name}: "${s.class_name || s.class_display_name}"`);
                                });
                            }}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                        >
                            Afficher les détails dans la console
                        </button>
                        <button
                            onClick={fetchAllStudents}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Actualiser les données
                        </button>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>Liste générale des élèves - Système de gestion scolaire</p>
                    <p className="mt-1">© {new Date().getFullYear()} - École Bilingue "The Grace of God"</p>
                </div>
            </div>
        </div>
    );
};

export default StudentsListGeneral;