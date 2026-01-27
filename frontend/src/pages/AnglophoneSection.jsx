



import React from "react";
import { useNavigate } from "react-router-dom";

export default function AnglophoneSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🇬🇧 Anglophone Section
        </h1>
        <p className="text-gray-600 mb-8">
          Choose a level to access the corresponding report card
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/anglophone/nursery/classes")}
            className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Nursery/Pre-Nursery
          </button>

          <button
            onClick={() => navigate("/anglophone/primary/classes")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Primary Classes
          </button>

          <button
            onClick={() => navigate("/annual-report")}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            ANNUAL REPORT CARD
          </button>
        </div>

        <hr className="my-8 border-gray-300" />

        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 font-semibold hover:underline transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}