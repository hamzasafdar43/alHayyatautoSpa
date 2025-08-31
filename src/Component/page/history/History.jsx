import React, { useState } from 'react';
import CarWashReport from './CarWashReport';
import DetailingStudioReport from './DetailingStudioReport';

function History() {
  const [activeTab, setActiveTab] = useState('carwash'); // default tab

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`px-6 py-2 font-semibold ${
            activeTab === 'carwash'
              ? 'border-b-4 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('carwash')}
        >
          Car Wash Report
        </button>
        <button
          className={`px-6 py-2 font-semibold ${
            activeTab === 'detailing'
              ? 'border-b-4 border-purple-600 text-purple-600'
              : 'text-gray-600 hover:text-purple-600'
          }`}
          onClick={() => setActiveTab('detailing')}
        >
          Detailing Studio Report
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'carwash' && <CarWashReport />}
        {activeTab === 'detailing' && <DetailingStudioReport />}
      </div>
    </div>
  );
}

export default History;
