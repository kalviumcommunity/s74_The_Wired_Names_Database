import React from "react";

function NameCard({ name }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all">
      <h3 className="text-xl font-bold text-blue-600">{name.name}</h3>
      <p className="text-gray-700">Origin: {name.origin}</p>
      <p className="text-gray-500 italic">Meaning: {name.meaning}</p>
    </div>
  );
}

export default NameCard;
