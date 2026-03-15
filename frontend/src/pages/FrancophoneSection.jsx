


import React from "react";
import { useNavigate } from "react-router-dom";

export default function FrancophoneSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 via-emerald-100 to-teal-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🇫🇷 Section Francophone
        </h1>
        <p className="text-gray-600 mb-8">
          Choisissez un palier pour accéder au bulletin correspondant
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/francophone/maternelle/classes")}
            className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Maternelle
          </button>

          <button
            onClick={() => navigate("/francophone/primaire/classes")}
            className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Classes Primaires
          </button>
          {/* <button
  onClick={() => navigate("/francophone/primary/levels")}
  className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
>
  Classes Primaires
</button> */}
        </div>

        <hr className="my-8 border-gray-300" />

        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 font-semibold hover:underline transition"
        >
          ← Retour au tableau de bord
        </button>
      </div>
    </div>
  );
}