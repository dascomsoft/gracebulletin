






import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Dashboard from './pages/Dashboard';
import AnglophoneSection from './pages/AnglophoneSection';
import FrancophoneSection from './pages/FrancophoneSection';
import BulletinForm from './pages/BulletinForm';
import BulletinPreview from './pages/BulletinPreview';
import PrimaireFrancophone from './pages/PrimaireFrancophone';
import ApercuPrimaire from './pages/ApercuPrimaire';
import BulletinMaternelle from './pages/BulletinMaternelle';
import PreviewMaternelle from './pages/PreviewMaternelle';
import BulletinNurseryForm from './pages/BulletinNurseryForm';
import BulletinNurseryPreview from './pages/BulletinNurseryPreview';
import AnnualReport from './pages/AnnualReport';
import BulletinAnnuel from './pages/BulletinAnnuel';
import ReportPreview from './pages/ReportPreview';
import PrintBulletin from './pages/PrintBulletin';
import PrintAnnual from './pages/PrintAnnual';
import PrintAnnuel from './pages/PrintAnnuel';
import StudentsListGeneral from './pages/StudentsListGeneral';

// NOUVELLES PAGES
import ClassList from './pages/ClassList';
import StudentList from './pages/StudentList';
import StudentDashboard from './pages/StudentDashboard';
import StudentBulletins from './pages/StudentBulletins';

// Composant 404 corrigé
function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page non trouvée</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour au tableau de bord
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers Onboarding */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anglophone" element={<AnglophoneSection />} />
        <Route path="/francophone" element={<FrancophoneSection />} />
        
        {/* HIÉRARCHIE DES CLASSES ET ÉLÈVES */}
        <Route path="/:section/:cycle/classes" element={<ClassList />} />
        <Route path="/class/:classId/students" element={<StudentList />} />
        <Route path="/student/:studentId/dashboard" element={<StudentDashboard />} />
        <Route path="/student/:studentId/bulletins" element={<StudentBulletins />} />
        
        {/* BULLETINS TRIMESTRIELS PAR SECTION */}
        {/* Anglophone */}
        <Route path="/bulletin/anglophone/:studentId" element={<BulletinForm />} />
        <Route path="/bulletin/anglophone/term1/:studentId" element={<BulletinForm />} />
        <Route path="/bulletin/anglophone/term2/:studentId" element={<BulletinForm />} />
        <Route path="/bulletin/anglophone/term3/:studentId" element={<BulletinForm />} />
        
        {/* Francophone Primaire */}
        <Route path="/bulletin/francophone/:studentId" element={<PrimaireFrancophone />} />
        <Route path="/bulletin/francophone/trimestre1/:studentId" element={<PrimaireFrancophone />} />
        <Route path="/bulletin/francophone/trimestre2/:studentId" element={<PrimaireFrancophone />} />
        <Route path="/bulletin/francophone/trimestre3/:studentId" element={<PrimaireFrancophone />} />
        
        {/* Maternelle */}
        <Route path="/bulletin/maternelle/:studentId" element={<BulletinMaternelle />} />
        <Route path="/bulletin/maternelle/trimestre1/:studentId" element={<BulletinMaternelle />} />
        <Route path="/bulletin/maternelle/trimestre2/:studentId" element={<BulletinMaternelle />} />
        <Route path="/bulletin/maternelle/trimestre3/:studentId" element={<BulletinMaternelle />} />
        
        {/* Nursery */}
        <Route path="/bulletin/nursery/:studentId" element={<BulletinNurseryForm />} />
        <Route path="/bulletin/nursery/term1/:studentId" element={<BulletinNurseryForm />} />
        <Route path="/bulletin/nursery/term2/:studentId" element={<BulletinNurseryForm />} />
        <Route path="/bulletin/nursery/term3/:studentId" element={<BulletinNurseryForm />} />
        
        {/* BULLETINS ANNUELS PAR SECTION */}
        <Route path="/bulletin/annual/anglophone/:studentId" element={<AnnualReport />} />
        <Route path="/bulletin/annual/francophone/:studentId" element={<BulletinAnnuel />} />
        
        {/* ANCIENNES ROUTES POUR COMPATIBILITÉ */}
        <Route path="/bulletin-form/:studentId" element={<BulletinForm />} />
        <Route path="/bulletin-anglophone" element={<BulletinForm />} />
        <Route path="/primaire-francophone" element={<PrimaireFrancophone />} />
        <Route path="/bulletin-maternelle" element={<BulletinMaternelle />} />
        <Route path="/nursery" element={<BulletinNurseryForm />} />
        <Route path="/annual-report" element={<AnnualReport />} />
        <Route path="/bulletin-annuel" element={<BulletinAnnuel />} />

        {/* PRINTING ROUTES */}
        <Route path="/print-bulletin-francophone" element={<PrintBulletin />} />
        <Route path="/print-bulletin-maternelle" element={<PrintBulletin />} />
        <Route path="/print-bulletin-nursery" element={<PrintBulletin />} />
        <Route path="/print-annual" element={<PrintAnnual />} />
        <Route path="/print-annuel" element={<PrintAnnuel />} />
        
        {/* PRÉVISUALISATION ET IMPRESSION */}
        <Route path="/preview" element={<BulletinPreview />} />
        <Route path="/apercu-primaire" element={<ApercuPrimaire />} />
        <Route path="/preview-maternelle" element={<PreviewMaternelle />} />
        <Route path="/nursery-preview" element={<BulletinNurseryPreview />} />
        <Route path="/report-preview" element={<ReportPreview />} />
        <Route path="/print-bulletin" element={<PrintBulletin />} />
        
        {/* VISUALISATION BULLETIN général des élèves */}
        <Route path="/students-list-general" element={<StudentsListGeneral />} />

        {/* ROUTE 404 CORRIGÉE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
































