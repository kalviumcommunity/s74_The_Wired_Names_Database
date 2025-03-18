// frontend/LandingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import NameList from "../components/NameList"; // Corrected import path

function LandingPage() {
  const [showNames, setShowNames] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    origin: "",
    meaning: "",
    password: "default123",
  });

  useEffect(() => {
    // Check if the component should show the names list on mount
    // You might want to adjust this logic based on your desired behavior
    // For now, it will only show the initial landing page.
  }, []);

  const handleAddName = async () => {
    if (!formData.username || !formData.origin || !formData.meaning) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", formData);
      setShowNames(true); // Show the updated list
      setFormData({ username: "", origin: "", meaning: "", password: "default123" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding name:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
      {!showNames ? (
        <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to the <span className="text-yellow-300">ASAP Project</span>
          </h1>
          <p className="text-lg text-gray-200 mt-4">
            Discover unique and fascinating names from around the world!
          </p>

          {/* Show Names Button */}
          <button
            onClick={() => setShowNames(true)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-110 hover:bg-blue-700"
          >
            Show Names
          </button>

          {/* Toggle Add Name Form */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-110 hover:bg-green-600"
          >
            Add Name
          </button>

          {/* Add Name Form (Initially Hidden) */}
          {showForm && (
            <div className="mt-6 bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/20">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="p-2 border rounded-md mr-2 text-black"
              />
              <input
                type="text"
                placeholder="Origin"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="p-2 border rounded-md mr-2 text-black"
              />
              <input
                type="text"
                placeholder="Meaning"
                value={formData.meaning}
                onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                className="p-2 border rounded-md mr-2 text-black"
              />
              <button
                onClick={handleAddName}
                className="mt-2 px-6 py-2 bg-green-700 text-white font-bold rounded shadow-md hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold text-white">Names List</h2>
          <NameList />

          {/* Back Button */}
          <button
            onClick={() => setShowNames(false)}
            className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-110 hover:bg-red-600"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;