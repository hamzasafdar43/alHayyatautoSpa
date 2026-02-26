import React, { useState } from "react";

import AllHistory from "./AllHistory";

function History() {
  const tabs = [
    { id: "carwash", label: "Car Wash Report", color: "blue-600" },
    { id: "detailing-studio", label: "Detailing Studio Report", color: "purple-600" },
    { id: "oil-shop", label: "Oil Shop Report", color: "purple-600" },
    { id: "accessorie-shop", label: "Accessories Shop Report", color: "purple-600" },
    { id: "general-expense", label: "General Expense Report", color: "purple-600" },
  ];

  const [activeTab, setActiveTab] = useState("carwash");

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-2 font-semibold ${
              activeTab === tab.id
                ? `border-b-4 border-${tab.color} text-${tab.color}`
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AllHistory activeTab={activeTab} />
    </div>
  );
}

export default History;
