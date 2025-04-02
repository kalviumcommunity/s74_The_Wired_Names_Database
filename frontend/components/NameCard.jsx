import React from "react";
import { Link } from "react-router-dom";

function NameCard({ name, onDelete }) {
  return (
    <div className="bg-white/15 border border-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all">
      <h3 className="text-xl font-bold text-blue-600">{name.username}</h3>
      <p className="text-gray-700">Origin: {name.origin}</p>
      <p className="text-gray-500 italic">Meaning: {name.meaning}</p>
      {name.created_by && (
        <p className="text-gray-500">
          Created By: {name.created_by.username}
        </p>
      )}
      <div className="mt-2 flex gap-2">
        <Link
          to={`/edit/${name._id}`}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Update
        </Link>
        <button
          onClick={() => onDelete(name._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NameCard;