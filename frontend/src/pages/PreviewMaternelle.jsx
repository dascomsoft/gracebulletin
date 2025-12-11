


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const PreviewMaternelle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { meta, entetesPeriodes, donnees, resume, photoEleve } = location.state || {};

  const handlePrint = () => window.print();

  const handleDownload = () => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const marginLeft = 10;
      const marginTop = 10;
      const pageWidth = pdf.internal.pageSize.getWidth() - (marginLeft * 2);
      let yPos = marginTop;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);

      pdf.setFontSize(7);
      pdf.text("RÉPUBLIQUE DU CAMEROUN", marginLeft, yPos);
      pdf.text("Paix-Travail-Patrie", marginLeft, yPos + 3);
      pdf.text("Ministère de l'Éducation de base", marginLeft, yPos + 6);
      pdf.text("Délégation Régionale du Centre", marginLeft, yPos + 9);
      pdf.text("Délégation Départementale du Mfoundi", marginLeft, yPos + 12);

      const rightX = pageWidth + marginLeft;
      pdf.text("REPUBLIC OF CAMEROON", rightX, yPos, { align: "right" });
      pdf.text("Peace-Work-Fatherland", rightX, yPos + 3, { align: "right" });
      pdf.text("Ministry of Basic Education", rightX, yPos + 6, { align: "right" });
      pdf.text("Centre Regional Delegation", rightX, yPos + 9, { align: "right" });
      pdf.text("Divisional Delegation of Mfoundi Division", rightX, yPos + 12, { align: "right" });

      yPos += 18;
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text("GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU", pageWidth / 2 + marginLeft, yPos, { align: "center" });
      yPos += 5;
      pdf.setFontSize(12);
      pdf.text("BULLETIN SCOLAIRE", pageWidth / 2 + marginLeft, yPos, { align: "center" });

      yPos += 5;
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.1);
      pdf.line(marginLeft, yPos, pageWidth + marginLeft, yPos);

      yPos += 8;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      if (photoEleve) {
        pdf.rect(marginLeft, yPos - 15, 20, 25);
        pdf.text("Photo", marginLeft + 6, yPos - 10);
      }

      const infoX = photoEleve ? marginLeft + 25 : marginLeft;
      pdf.text(`Nom: ${meta.nomEleve || "................................."}`, infoX, yPos);
      pdf.text(`N° Matricule: ${meta.matricule || "................................."}`, infoX + 70, yPos);
      yPos += 5;
      pdf.text(`Sexe: ${meta.sexe || "................................."}`, infoX, yPos);
      pdf.text(`Classe: ${meta.classe || "................................."}`, infoX + 70, yPos);
      yPos += 5;
      pdf.text(`Trimestre: ${meta.trimestre || "................................."}`, infoX, yPos);
      pdf.text(`Enseignant: ${meta.enseignant || "................................."}`, infoX + 70, yPos);

      yPos += 8;
      pdf.line(marginLeft, yPos, pageWidth + marginLeft, yPos);

      yPos += 5;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text("DOMAINES", marginLeft, yPos);
      pdf.text(entetesPeriodes.h1 || "Période 1", marginLeft + 85, yPos, { align: "center" });
      pdf.text(entetesPeriodes.h2 || "Période 2", marginLeft + 105, yPos, { align: "center" });
      pdf.text(entetesPeriodes.h3 || "Période 3", marginLeft + 125, yPos, { align: "center" });
      pdf.text("EXPRESSION", marginLeft + 145, yPos, { align: "center" });

      yPos += 2;
      pdf.line(marginLeft, yPos, pageWidth + marginLeft, yPos);

      const DOMAINES_TEMPLATE = [
        "COMMUNIQUER EN FRANCAIS",
        "COMMUNIQUER EN ANGLAIS",
        "PRATIQUER UNE LANGUE NATIONALE",
        "MATHEMATIQUES",
        "SCIENCE ET TECHNOLOGIE",
        "VALEURS SOCIALES",
        "VALEURS CITOYENNES",
        "DEMONTRER L'AUTONOMIE",
        "TIC",
        "ACTIVITES SPORTIVE",
        "ACTIVITES ARTISTIQUES"
      ];

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);

      DOMAINES_TEMPLATE.forEach((domaine, index) => {
        if (yPos > 250) {
          pdf.addPage();
          yPos = marginTop;
        }

        const cle = `domaine${index}`;
        const state = donnees[cle];

        yPos += 4;
        pdf.text(domaine, marginLeft, yPos);
        pdf.text(state?.periode1 || "-", marginLeft + 85, yPos, { align: "center" });
        pdf.text(state?.periode2 || "-", marginLeft + 105, yPos, { align: "center" });
        pdf.text(state?.periode3 || "-", marginLeft + 125, yPos, { align: "center" });
        pdf.text(state?.expression || "-", marginLeft + 145, yPos, { align: "center" });

        yPos += 1;
        pdf.setDrawColor(200);
        pdf.setLineWidth(0.05);
        pdf.line(marginLeft, yPos, pageWidth + marginLeft, yPos);
        pdf.setDrawColor(0);
      });

      yPos += 10;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("RÉSUMÉ DU TRAVAIL", marginLeft, yPos);

      yPos += 5;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("Appréciation:", marginLeft, yPos);
      pdf.text(resume.appreciation || "-", marginLeft + 30, yPos);

      pdf.text("Rang:", marginLeft + 70, yPos);
      pdf.text(resume.rang || "-", marginLeft + 85, yPos);

      pdf.text("Décision:", marginLeft + 120, yPos);
      pdf.text(resume.decision || "-", marginLeft + 140, yPos);

      yPos += 15;
      pdf.setFontSize(7);

      const signatureWidth = 50;
      const totalSignaturesWidth = signatureWidth * 3 + 20;
      const startX = marginLeft + (pageWidth - totalSignaturesWidth) / 2;

      pdf.text("Visa de l'enseignant", startX, yPos);
      pdf.text("Visa Chef d'établissement", startX + signatureWidth + 10, yPos);
      pdf.text("Visa du parent", startX + (signatureWidth * 2) + 20, yPos);

      yPos += 2;
      pdf.rect(startX, yPos, signatureWidth, 20);
      pdf.rect(startX + signatureWidth + 10, yPos, signatureWidth, 20);
      pdf.rect(startX + (signatureWidth * 2) + 20, yPos, signatureWidth, 20);

      yPos += 25;
      pdf.setFontSize(6);

      pdf.text("Téléphone: (+237) 696-308-503 / WhatsApp: 651989899", pageWidth / 2 + marginLeft, yPos, { align: "center" });
      yPos += 3;

      pdf.text("Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)", pageWidth / 2 + marginLeft, yPos, { align: "center" });
      yPos += 3;

      pdf.text("Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025", pageWidth / 2 + marginLeft, yPos, { align: "center" });

      const fileName = `Bulletin_${meta.nomEleve?.replace(/\s+/g, '_') || 'Eleve'}_${meta.trimestre?.replace(/\s+/g, '_') || 'Trimestre'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Erreur lors de la génération du PDF. Essayez d'imprimer à la place.");
    }
  };

  const handleBackToEdit = () => navigate(-1);

  const handleFinalSubmit = () => {
    if (confirm("Êtes-vous sûr de vouloir finaliser et vider le formulaire ?")) {
      localStorage.removeItem("bulletinMaternelleData");
      navigate("/dashboard");
    }
  };

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-red-600 mb-4">
            Aucune donnée trouvée
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retour au Formulaire
          </button>
        </div>
      </div>
    );
  }

  const DOMAINES_TEMPLATE = [
    {
      title: "COMMUNIQUER EN FRANCAIS"
    },
    {
      title: "COMMUNIQUER EN ANGLAIS"
    },
    {
      title: "PRATIQUER UNE LANGUE NATIONALE"
    },
    {
      title: "MATHEMATIQUES"
    },
    {
      title: "SCIENCE ET TECHNOLOGIE"
    },
    {
      title: "VALEURS SOCIALES"
    },
    {
      title: "VALEURS CITOYENNES"
    },
    {
      title: "DEMONTRER L'AUTONOMIE"
    },
    {
      title: "TIC"
    },
    {
      title: "ACTIVITES SPORTIVE"
    },
    {
      title: "ACTIVITES ARTISTIQUES"
    }
  ];

  const getEvaluationColor = (value) => {
    switch (value) {
      case "Acquis":
        return "text-green-600 font-semibold";
      case "Non Acquis":
        return "text-red-600 font-semibold";
      case "Expert":
        return "text-blue-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center print:p-0 print:bg-white">
      {/* Header (non imprimé) */}
      <div className="w-full max-w-6xl mb-2 print:hidden">
        <div className="bg-blue-600 text-white p-2 rounded shadow">
          <h1 className="text-lg font-bold text-center">
            Aperçu du Bulletin Maternelle
          </h1>
          <p className="text-center text-blue-100 text-xs">
            Vérifiez toutes les informations avant l'impression.
          </p>
        </div>
      </div>

      {/* Page principale - SANS OVERFLOW */}
      <div className="bg-white w-full max-w-6xl shadow-sm print:shadow-none print:max-w-full print:p-0">
        {/* En-tête */}
        <div className="w-full mb-2 print:mb-1 border-b border-gray-300 pb-2 print:pb-1 print:px-4 print:pt-2">
          <div className="flex flex-col items-center text-gray-600 text-xs print:text-[9px] md:flex-row md:justify-between md:items-start">
            {/* Bloc gauche */}
            <div className="text-left mb-2 md:mb-0 md:w-1/3 print:w-1/3">
              <div className="font-bold text-[11px] sm:text-xs md:text-sm print:text-[9px]">RÉPUBLIQUE DU CAMEROUN</div>
              <div className="text-[9px] sm:text-[10px] md:text-xs print:text-[7px]">Paix-Travail-Patrie</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Ministère de l'Éducation de base</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Délégation Régionale du Centre</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Délégation Départementale du Mfoundi</div>
            </div>

            {/* Bloc centre */}
            <div className="text-center md:flex-1 md:mx-2 print:mx-1">
              <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-[11px]">
                GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU
              </div>
              <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-[13px]">
                BULLETIN SCOLAIRE
              </div>
            </div>

            {/* Bloc droite */}
            <div className="text-right mt-2 md:mt-0 md:w-1/3 print:w-1/3">
              <div className="font-bold text-[11px] sm:text-xs md:text-sm print:text-[9px]">REPUBLIC OF CAMEROON</div>
              <div className="text-[9px] sm:text-[10px] md:text-xs print:text-[7px]">Peace-Work-Fatherland</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Ministry of Basic Education</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Centre Regional Delegation</div>
              <div className="text-[10px] sm:text-xs md:text-sm print:text-[8px]">Divisional Delegation of Mfoundi Division</div>
            </div>
          </div>
        </div>

        {/* Section Photo + Informations de l'élève */}
        <div className="flex flex-col md:flex-row gap-3 mb-3 print:mb-2 print:gap-1 print:px-4 print:pt-1 border-b border-gray-300 pb-2 print:pb-1">
          {/* Zone Photo */}
          {photoEleve && (
            <div className="flex flex-col items-center md:w-1/6 print:w-1/6">
              <div className="w-16 h-16 print:w-12 print:h-12 border border-gray-300 rounded overflow-hidden mb-0.5">
                <img
                  src={photoEleve}
                  alt="Photo de l'élève"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[8px] print:text-[6px] text-gray-500 text-center">
                Photo
              </div>
            </div>
          )}

          {/* Informations de l'élève */}
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-1 text-[11px] print:text-[9px] ${photoEleve ? 'flex-1' : 'w-full'}`}>
            <div><strong>Nom:</strong> {meta.nomEleve || "................................."}</div>
            <div><strong>N° Matricule:</strong> {meta.matricule || "................................."}</div>
            <div><strong>Sexe:</strong> {meta.sexe || "................................."}</div>
            <div><strong>Classe:</strong> {meta.classe || "................................."}</div>
            <div><strong>Trimestre:</strong> {meta.trimestre || "................................."}</div>
            <div><strong>Enseignant:</strong> {meta.enseignant || "................................."}</div>
          </div>
        </div>

        {/* Tableau principal - SANS OVERFLOW-X-AUTO */}
        <div className="mb-3 print:mb-2 print:px-4">
          <table className="w-full text-[10px] print:text-[8px] border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border border-gray-400 p-1 print:p-0.5 w-[45%]">DOMAINES</th>
                <th className="border border-gray-400 p-1 print:p-0.5 w-[11%]">{entetesPeriodes.h1}</th>
                <th className="border border-gray-400 p-1 print:p-0.5 w-[11%]">{entetesPeriodes.h2}</th>
                <th className="border border-gray-400 p-1 print:p-0.5 w-[11%]">{entetesPeriodes.h3}</th>
                <th className="border border-gray-400 p-1 print:p-0.5 w-[22%]">EXPRESSION DOMAINE</th>
              </tr>
            </thead>
            <tbody>
              {DOMAINES_TEMPLATE.map((domaine, index) => {
                const cle = `domaine${index}`;
                const state = donnees[cle];
                return (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 print:bg-gray-50"}>
                    <td className="border border-gray-400 p-1 print:p-0.5 font-medium align-top text-[11px] print:text-[9px] leading-tight">
                      {domaine.title}
                    </td>
                    <td className="border border-gray-400 text-center p-1 print:p-0.5">
                      <span className={getEvaluationColor(state?.periode1)}>{state?.periode1 || "-"}</span>
                    </td>
                    <td className="border border-gray-400 text-center p-1 print:p-0.5">
                      <span className={getEvaluationColor(state?.periode2)}>{state?.periode2 || "-"}</span>
                    </td>
                    <td className="border border-gray-400 text-center p-1 print:p-0.5">
                      <span className={getEvaluationColor(state?.periode3)}>{state?.periode3 || "-"}</span>
                    </td>
                    <td className="border border-gray-400 text-center p-1 print:p-0.5">
                      <span className={getEvaluationColor(state?.expression)}>{state?.expression || "-"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section inférieure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-15 gap-4 print:gap-3 print:px-4 print:mb-2">
          {/* Légende */}
          <div className="border border-gray-300 rounded p-3 print:p-2 text-[10px] print:text-[8px]">
            <div className="font-semibold text-center mb-2 print:mb-1">Légende des Appréciations</div>
            <div className="space-y-1 print:space-y-0.5">
              <div><strong>Acquis</strong> — L'élève maîtrise la compétence</div>
              <div><strong>Non Acquis</strong> — L'élève ne maîtrise pas encore la compétence</div>
              <div><strong>Expert</strong> — L'élève maîtrise parfaitement la compétence</div>
            </div>
          </div>

          {/* Résumé */}
          <div className="border-2 border-gray-400  mt-20 rounded p-3 print:p-2 text-[10px] print:text-[8px]">
            <div className="font-bold text-center mb-2 print:mb-1">Résumé du Travail</div>
            <div className="space-y-2 print:space-y-1">
              <div className="grid grid-cols-2 gap-3 print:gap-2">
                <div className="text-center">
                  <div className="text-gray-600 print:text-gray-500">Appréciation</div>
                  <div className="font-semibold border-b border-gray-300 py-2 print:py-1 min-h-8 print:min-h-6 flex items-center justify-center">
                    {resume.appreciation || "-"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 print:text-gray-500">Rang</div>
                  <div className="font-semibold border-b border-gray-300 py-2 print:py-1 min-h-8 print:min-h-6 flex items-center justify-center">
                    {resume.rang || "-"}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-gray-600 print:text-gray-500">Décision</div>
                <div className="font-semibold border-b border-gray-300 py-2 print:py-1 min-h-8 print:min-h-6 flex items-center justify-center">
                  {resume.decision || "-"}
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-3 gap-3 print:gap-2 mt-4 print:mt-2">
                {[
                  { label: "Visa de l'enseignant", key: "enseignant" },
                  { label: "Visa Chef d'établissement", key: "chef" },
                  { label: "Visa du parent", key: "parent" }
                ].map((item, i) => (
                  <div className="text-center" key={i}>
                    <div className="text-gray-600 text-[9px] print:text-[7px] mb-2 print:mb-1 font-medium">{item.label}</div>
                    <div className="border-2 border-gray-400 rounded h-20 print:h-16 flex items-center justify-center bg-gray-50 print:bg-gray-50">
                      <span className="text-gray-500 text-[8px] print:text-[6px]">Signature et cachet</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="text-center text-[8px] mt-15 print:mt-15 print:text-[7px] bg-blue-50 print:bg-blue-50 border border-blue-200 rounded p-1 print:p-0.5 print:mx-4">
          <div className="space-y-1 print:space-y-0.5">
            <div>
              <p className="font-semibold">Téléphone: (+237) 696-308-503 / WhatsApp: 651989899</p>
              <p>Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)</p>
            </div>
            <div>
              <p>Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="w-full max-w-6xl mt-4 print:hidden">
        <div className="flex justify-between gap-2">
          <button
            onClick={handleBackToEdit}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            ← Retour à l'édition
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2"
            >
              📥 Télécharger PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2"
            >
              🖨️ Imprimer
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm flex items-center gap-2"
            >
              ✅ Finaliser
            </button>
          </div>
        </div>
      </div>

      {/* CSS impression OPTIMISÉ pour A4 */}
      <style jsx>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0.5cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-size: 8px;
            margin: 0;
            padding: 0;
            background: white !important;
          }
          
          /* Supprimer tous les overflow et scrollbars */
          * {
            overflow: visible !important;
            max-height: none !important;
          }
          
          /* Tableau optimisé pour A4 */
          table {
            font-size: 8px !important;
            width: 100% !important;
            border-collapse: collapse;
            page-break-inside: avoid;
          }
          
          th, td {
            padding: 4px 6px !important;
            border: 1px solid #666 !important;
            vertical-align: middle;
            line-height: 1.2;
          }
          
          th {
            background-color: #f3f4f6 !important;
            font-weight: bold;
          }
          
          /* Ajustement des tailles de texte */
          .text-\\[9px\\] {
            font-size: 9px !important;
          }
          
          .text-\\[8px\\] {
            font-size: 8px !important;
          }
          
          .text-\\[10px\\] {
            font-size: 10px !important;
          }
          
          .text-\\[11px\\] {
            font-size: 11px !important;
          }
          
          /* Masquer les éléments inutiles à l'impression */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Couleurs d'impression */
          .text-green-600 {
            color: #15803d !important;
          }
          
          .text-red-600 {
            color: #dc2626 !important;
          }
          
          .text-blue-600 {
            color: #2563eb !important;
          }
          
          .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          .bg-blue-50 {
            background-color: #eff6ff !important;
          }
          
          /* Éviter les coupures de page */
          .print\\:max-w-full {
            max-width: 100% !important;
          }
          
          .print\\:p-0 {
            padding: 0 !important;
          }
          
          .print\\:px-4 {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          
          /* Hauteur automatique */
          .print\\:h-\\[29\\.5cm\\] {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PreviewMaternelle;