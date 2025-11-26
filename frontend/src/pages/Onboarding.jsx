import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/image2.jpg')` }}
    >
      <div className="bg-slate-100 shadow-2xl rounded-2xl p-10 text-center w-[90%] md:w-[500px] bg-opacity-90">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Bienvenue / Welcome <br />
          <span className="text-blue-600">Groupe Scolaire Bilingue La Grâce de Dieu</span>
        </h1>

        <p className="text-gray-600 mb-8 text-center max-w-md">
          Choisissez votre langue pour continuer / Choose your language to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Français
          </button>
          <button
            onClick={() => navigate("/dashboard")}  // CORRIGÉ : même route que Français
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}











