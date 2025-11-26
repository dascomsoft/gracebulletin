







import React from 'react';

const ReportPreview = ({ formData, annualAverage, onBack, isEnglish, onFinalize }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Créer un contenu HTML pour le PDF
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${isEnglish ? 'School Report' : 'Bulletin Scolaire'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .school-name { text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          th { background-color: #f0f0f0; }
          .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
          .footer { margin-top: 50px; text-align: center; font-size: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div>RÉPUBLIQUE DU CAMEROUN</div>
            <div>Paix-Travail-Patrie</div>
            <div>Ministère de l'Éducation de base</div>
          </div>
          <div>
            <div>REPUBLIC OF CAMEROON</div>
            <div>Peace-Work-Fatherland</div>
            <div>Ministry of Basic Education</div>
          </div>
        </div>
        
        <div class="school-name">
          ${isEnglish ? 'BILINGUAL SCHOOL GROUP THE GRACE OF GOD' : 'GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU'}<br>
          <strong>${isEnglish ? 'SCHOOL REPORT' : 'BULLETIN SCOLAIRE'}</strong>
        </div>

        <div>
          <strong>${isEnglish ? 'Name:' : 'Nom:'}</strong> ${formData.name}<br>
          <strong>${isEnglish ? 'School Year:' : 'Année Scolaire:'}</strong> ${formData.schoolYear}<br>
          <strong>${isEnglish ? 'Class:' : 'Classe:'}</strong> ${formData.class}
        </div>

        <table>
          <thead>
            <tr>
              <th>${isEnglish ? 'Terms' : 'Trimestres'}</th>
              <th>${isEnglish ? 'Results' : 'Résultats'}</th>
              <th>${isEnglish ? 'Position' : 'Position'}</th>
              <th>${isEnglish ? 'Remarks' : 'Remarques'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${isEnglish ? '1st Term' : '1er Trimestre'}</td>
              <td>${formData.term1.result}</td>
              <td>${formData.term1.position}</td>
              <td rowspan="3">${formData.remarks}</td>
            </tr>
            <tr>
              <td>${isEnglish ? '2nd Term' : '2ème Trimestre'}</td>
              <td>${formData.term2.result}</td>
              <td>${formData.term2.position}</td>
            </tr>
            <tr>
              <td>${isEnglish ? '3rd Term' : '3ème Trimestre'}</td>
              <td>${formData.term3.result}</td>
              <td>${formData.term3.position}</td>
            </tr>
            <tr>
              <td><strong>TOTAL</strong></td>
              <td>${(
                (parseFloat(formData.term1.result) || 0) + 
                (parseFloat(formData.term2.result) || 0) + 
                (parseFloat(formData.term3.result) || 0)
              ).toFixed(2)}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div>
          <strong>${isEnglish ? 'Annual Average:' : 'Moyenne Annuelle:'}</strong> ${annualAverage}
        </div>

        <div class="signature-section">
          <div>
            <strong>${isEnglish ? "Head of institution's signature:" : "Signature du chef d'établissement:"}</strong><br><br>
            ${formData.headSignature || '___________________'}
          </div>
          <div>
            <strong>${isEnglish ? "Parent's signature:" : "Signature du parent:"}</strong><br><br>
            ${formData.parentSignature || '___________________'}
          </div>
        </div>

        <div class="footer">
          <div>${isEnglish ? 'Telephone: (+237) 696-308-503 / WhatsApp: 651989899' : 'Téléphone: (+237) 696-308-503 / WhatsApp: 651989899'}</div>
          <div>${isEnglish ? 'Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025' : 'Arrêté d\'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025'}</div>
        </div>
      </body>
      </html>
    `;

    // Créer un blob et télécharger
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${isEnglish ? 'annual-report' : 'bulletin-annuel'}-${formData.name || 'student'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFinalize = () => {
    if (isEnglish) {
      if (confirm("Are you sure you want to finalize and clear the form?")) {
        onFinalize();
      }
    } else {
      if (confirm("Êtes-vous sûr de vouloir finaliser et vider le formulaire ?")) {
        onFinalize();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="
          flex flex-col items-center text-gray-600 text-xs print:text-xs
          md:flex-row md:justify-between md:items-start border-b pb-4 mb-4
        ">
          {/* Left Block */}
          <div className="text-left mb-2 md:mb-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">RÉPUBLIQUE DU CAMEROUN</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Paix-Travail-Patrie</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministère de l'Éducation de base</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Régionale du Centre</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Délégation Départementale du Mfoundi</div>
          </div>

          {/* Center Block */}
          <div className="text-center md:flex-1 md:mx-2">
            <div className="font-extrabold text-sm sm:text-base md:text-lg print:text-xs">
              {isEnglish 
                ? "BILINGUAL SCHOOL GROUP THE GRACE OF GOD" 
                : "GROUPE SCOLAIRE BILINGUE LA GRÂCE DE DIEU"}
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              {isEnglish ? "SCHOOL REPORT" : "BULLETIN SCOLAIRE"}
            </div>
          </div>

          {/* Right Block */}
          <div className="text-right mt-2 md:mt-0 md:w-1/3">
            <div className="font-bold text-[11px] sm:text-xs md:text-sm">REPUBLIC OF CAMEROON</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs">Peace-Work-Fatherland</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Ministry of Basic Education</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Centre Regional Delegation</div>
            <div className="text-[10px] sm:text-xs md:text-sm">Divisional Delegation of Mfoundi Division</div>
          </div>
        </div>

        {/* Student Information */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <strong>{isEnglish ? "Name:" : "Nom:"}</strong> {formData.name}
            </div>
            <div>
              <strong>{isEnglish ? "School Year:" : "Année Scolaire:"}</strong> {formData.schoolYear}
            </div>
          </div>
          <div>
            <strong>{isEnglish ? "Class:" : "Classe:"}</strong> {formData.class}
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "Terms" : "Trimestres"}
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "Results" : "Résultats"}
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "Position" : "Position"}
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "Remarks" : "Remarques"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "1st Term" : "1er Trimestre"}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term1.result}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term1.position}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center" rowSpan="3">
                  {formData.remarks}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "2nd Term" : "2ème Trimestre"}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term2.result}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term2.position}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">
                  {isEnglish ? "3rd Term" : "3ème Trimestre"}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term3.result}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {formData.term3.position}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-medium">
                  {isEnglish ? "TOTAL" : "TOTAL"}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {(
                    (parseFloat(formData.term1.result) || 0) + 
                    (parseFloat(formData.term2.result) || 0) + 
                    (parseFloat(formData.term3.result) || 0)
                  ).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-2 py-1"></td>
                <td className="border border-gray-300 px-2 py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <strong>{isEnglish ? "Annual Average:" : "Moyenne Annuelle:"}</strong> {annualAverage}
          </div>
          <div>
            <strong>{isEnglish ? "Annual Position:" : "Position Annuelle:"}</strong> 
          </div>
        </div>

        {/* Class Council's Decision */}
        <div className="border border-gray-300 rounded-md p-4 mb-6">
          <h3 className="font-bold text-sm mb-2">
            {isEnglish ? "CLASS COUNCIL'S DECISION" : "DÉCISION DU CONSEIL DE CLASSE"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>{isEnglish ? "Promoted to:" : "Promu en:"}</strong> {formData.councilDecision.promotedTo}
            </div>
            <div>
              <strong>{isEnglish ? "To repeat class:" : "Redoubler la classe:"}</strong> {formData.councilDecision.repeatClass}
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <strong>{isEnglish ? "Head of the institution's observation and signature:" : "Observations et signature du chef d'établissement:"}</strong>
            <div className="mt-2 min-h-[60px] border-b border-gray-300">
              {formData.headObservation}
            </div>
            <div className="mt-2">
              {formData.headSignature}
            </div>
          </div>
          <div>
            <strong>{isEnglish ? "Parent and signature:" : "Parent et signature:"}</strong>
            <div className="mt-2 min-h-[60px] border-b border-gray-300"></div>
            <div className="mt-2">
              {formData.parentSignature}
            </div>
          </div>
        </div>

        <div className="text-right mb-6">
          <p className="text-sm">
            {isEnglish ? "Yaoundé, the ___________" : "Yaoundé, le ___________"}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
          <div className="receipt-footer">
            <div>
              <p>
                {isEnglish 
                  ? "Telephone: (+237) 696-308-503 / WhatsApp: 651989899" 
                  : "Téléphone: (+237) 696-308-503 / WhatsApp: 651989899"}
              </p>
              <p>
                {isEnglish 
                  ? "Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, opposite the mini market)" 
                  : "Siège social: YAOUNDÉ - AKOK-NDOE-2 (Quartier Mbouda, face au mini marché)"}
              </p>
            </div>
            <div>
              <p>
                {isEnglish 
                  ? "Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025" 
                  : "Arrêté d'ouverture: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANVIER 2025"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 print:hidden">
          <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {isEnglish ? "← Back to Edit" : "← Retour à l'Édition"}
          </button>
          <div className="space-x-2">
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              {isEnglish ? "📥 Download" : "📥 Télécharger"}
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              {isEnglish ? "🖨️ Print" : "🖨️ Imprimer"}
            </button>
            <button
              onClick={handleFinalize}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              {isEnglish ? "✅ Finalize" : "✅ Finaliser"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;












