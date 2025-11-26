








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportPreview from './ReportPreview';

const AnnualReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    schoolYear: '2025-2026',
    class: 'Pre-Nursery',
    term1: { result: '', position: '' },
    term2: { result: '', position: '' },
    term3: { result: '', position: '' },
    remarks: 'Acquired',
    councilDecision: {
      promotedTo: 'Nursery 1',
      repeatClass: 'No'
    },
    headObservation: '',
    headSignature: '',
    parentSignature: ''
  });
  
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTermChange = (term, field, value) => {
    setFormData(prev => ({
      ...prev,
      [term]: {
        ...prev[term],
        [field]: value
      }
    }));
  };

  const handleCouncilDecisionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      councilDecision: {
        ...prev.councilDecision,
        [field]: value
      }
    }));
  };

  const calculateAnnualAverage = () => {
    const term1 = parseFloat(formData.term1.result) || 0;
    const term2 = parseFloat(formData.term2.result) || 0;
    const term3 = parseFloat(formData.term3.result) || 0;
    
    if (term1 === 0 && term2 === 0 && term3 === 0) return '';
    
    return ((term1 + term2 + term3) / 3).toFixed(2);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      schoolYear: '2025-2026',
      class: 'Pre-Nursery',
      term1: { result: '', position: '' },
      term2: { result: '', position: '' },
      term3: { result: '', position: '' },
      remarks: 'Acquired',
      councilDecision: {
        promotedTo: 'Nursery 1',
        repeatClass: 'No'
      },
      headObservation: '',
      headSignature: '',
      parentSignature: ''
    });
  };

if (showPreview) {
  return (
    <ReportPreview 
      formData={formData} 
      annualAverage={calculateAnnualAverage()}
      onBack={() => setShowPreview(false)}
      isEnglish={true}
      onFinalize={() => {
        if (confirm("Are you sure you want to finalize and clear the form?")) {
          localStorage.removeItem('annualReportFormData');
          resetForm();
          navigate("/dashboard");
        }
      }}
    />
  );
}

  const schoolYears = [];
  for (let year = 2025; year <= 2049; year++) {
    schoolYears.push(`${year}-${year + 1}`);
  }

  const classes = [
    'Pre-Nursery', 'Nursery 1', 'Nursery 2', 
    'Class 1', 'Class 2', 'Class 3', 
    'Class 4', 'Class 5', 'Class 6'
  ];

  const remarksOptions = [
    'Acquired', 'In the process of acquire', 'Expert', 'Not acquired',
    'Excellent', 'Very good', 'Good', 'Average', 'Fair', 'Above Average',
    'Regular', 'Irregular', 'Friendly', 'Unfriendly', 'Fairly good', 'Neat'
  ];

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
              BILINGUAL SCHOOL GROUP THE GRACE OF GOD
            </div>
            <div className="text-[13px] sm:text-[16px] md:text-xl font-bold print:text-sm">
              SCHOOL REPORT
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

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Year:</label>
              <select
                name="schoolYear"
                value={formData.schoolYear}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {schoolYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class:</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1">Terms</th>
                  <th className="border border-gray-300 px-2 py-1">Results</th>
                  <th className="border border-gray-300 px-2 py-1">Position</th>
                  <th className="border border-gray-300 px-2 py-1">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">1st Term</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term1.result}
                      onChange={(e) => handleTermChange('term1', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term1.position}
                      onChange={(e) => handleTermChange('term1', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1" rowSpan="3">
                    <select
                      value={formData.remarks}
                      onChange={(e) => handleInputChange({target: {name: 'remarks', value: e.target.value}})}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    >
                      {remarksOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">2nd Term</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term2.result}
                      onChange={(e) => handleTermChange('term2', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term2.position}
                      onChange={(e) => handleTermChange('term2', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">3rd Term</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term3.result}
                      onChange={(e) => handleTermChange('term3', 'result', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={formData.term3.position}
                      onChange={(e) => handleTermChange('term3', 'position', e.target.value)}
                      className="w-full border-0 focus:ring-0 p-0 text-center"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-medium">TOTAL</td>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Average:</label>
              <input
                type="text"
                value={calculateAnnualAverage()}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Position:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Class Council's Decision */}
          <div className="border border-gray-300 rounded-md p-4">
            <h3 className="font-bold text-sm mb-2">CLASS COUNCIL'S DECISION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promoted to:</label>
                <select
                  value={formData.councilDecision.promotedTo}
                  onChange={(e) => handleCouncilDecisionChange('promotedTo', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To repeat class:</label>
                <select
                  value={formData.councilDecision.repeatClass}
                  onChange={(e) => handleCouncilDecisionChange('repeatClass', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Head of the institution's observation and signature:</label>
              <textarea
                name="headObservation"
                value={formData.headObservation}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              ></textarea>
              <input
                type="text"
                name="headSignature"
                value={formData.headSignature}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Head's signature"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent and signature:</label>
              <textarea
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              ></textarea>
              <input
                type="text"
                name="parentSignature"
                value={formData.parentSignature}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-2"
                placeholder="Parent's signature"
              />
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm">Yaoundé, the ___________</p>
          </div>

          {/* Footer */}
          <div className="text-center text-[8px] print:text-[7px] bg-blue-50 border border-blue-200 rounded p-0.5 mt-10 print:mt-10">
            <div className="receipt-footer">
              <div>
                <p>Telephone: (+237) 696-308-503 / WhatsApp: 651989899</p>
                <p>Headquarters: YAOUNDÉ - AKOK-NDOE-2 (Mbouda neighborhood, opposite the mini market)</p>
              </div>
              <div>
                <p>Opening authorization: N° 61/JL/23/A/MINEDUB/SG/DSEPB/SDRA/DR 05 JANUARY 2025</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate('/anglophone')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Back
            </button>
            <div className="space-x-2">
              <button
                onClick={resetForm}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Reset
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Preview & Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReport;