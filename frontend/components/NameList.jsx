// frontend/components/NameList.jsx
import React, { useEffect, useState } from "react";
import NameCard from "./NameCard";
import axios from "axios";

function NameList() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNames = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3000/users");
      setNames(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching names");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const handleDeleteName = async (id) => {
    if (window.confirm("Are you sure you want to delete this name?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        fetchNames(); // Refresh the list after deletion
      } catch (err) {
        console.error("Error deleting name:", err);
        alert("Failed to delete name.");
      }
    }
  };

  if (loading) {
    return <div>Loading names...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {names.map((name) => (
        <NameCard key={name._id} name={name} onDelete={handleDeleteName} />
      ))}
    </div>
  );
}

export default NameList;