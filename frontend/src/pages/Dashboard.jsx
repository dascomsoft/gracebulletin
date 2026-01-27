

// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100">
//       <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] md:w-[500px] text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           🎓 Gestion Bulletin
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Application de gestion des bulletins scolaires.  
//           Veuillez choisir une section pour continuer.
//         </p>

//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <button
//             onClick={() => navigate("/francophone")}
//             className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
//           >
//             Section Francophone 🇫🇷
//           </button>

//           <button
//             onClick={() => navigate("/anglophone")}
//             className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
//           >
//             Anglophone Section 🇬🇧
//           </button>
//         </div>

//         {/* Section supplémentaire pour d'autres fonctionnalités */}
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-500">
//             Application de gestion scolaire - Version Desktop
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

































































import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] md:w-[500px] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎓 Gestion Bulletin
        </h1>
        <p className="text-gray-600 mb-8">
          Application de gestion des bulletins scolaires.  
          Veuillez choisir une section pour continuer.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/francophone")}
            className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Section Francophone 🇫🇷
          </button>

          <button
            onClick={() => navigate("/anglophone")}
            className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Anglophone Section 🇬🇧
          </button>
        </div>

        {/* NOUVEAU BOUTON : Liste Générale des Élèves */}

        {/* Section supplémentaire pour d'autres fonctionnalités */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Application de gestion scolaire - Version Desktop
          </p>
        </div>
      </div>
    </div>
  );
}