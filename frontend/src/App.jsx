





import React from 'react'
import Onboarding from "./pages/Onboarding";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AnglophoneSection from './pages/AnglophoneSection';
import FrancophoneSection from './pages/FrancophoneSection';
import BulletinForm from './pages/BulletinForm';
import BulletinPreview from './pages/BulletinPreview';
import PrimaireFrancophone from './pages/PrimaireFrancophone'
import ApercuPrimaire from './pages/ApercuPrimaire'
import BulletinMaternelle from './pages/BulletinMaternelle'
import PreviewMaternelle from './pages/PreviewMaternelle';
import BulletinNurseryForm from './pages/BulletinNurseryForm';
import BulletinNurseryPreview from './pages/BulletinNurseryPreview';
import AnnualReport from './pages/AnnualReport';
import BulletinAnnuel from './pages/BulletinAnnuel';

function App() {

  return (
    
   <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anglophone" element={<AnglophoneSection />} />
        <Route path="/francophone" element={<FrancophoneSection />} />
        
        {/* Routes pour les bulletins */}
        <Route path="/bulletin-anglophone" element={<BulletinForm />} />
        <Route path="/primaire-francophone" element={<PrimaireFrancophone />} />
        <Route path="/preview" element={<BulletinPreview />} />
        <Route path="/apercu-primaire" element={<ApercuPrimaire />} />
        <Route path="/bulletin-maternelle" element={<BulletinMaternelle />} />
        <Route path="/preview-maternelle" element={<PreviewMaternelle />} />
        <Route path="/nursery" element={<BulletinNurseryForm />} />
        <Route path="/nursery-preview" element={<BulletinNurseryPreview />} />
        
        {/* Nouvelles routes pour AnnualReport et BulletinAnnuel */}
        <Route path="/annual-report" element={<AnnualReport />} />
        <Route path="/bulletin-annuel" element={<BulletinAnnuel />} />

      </Routes>
    </Router>
  )
}

export default App
