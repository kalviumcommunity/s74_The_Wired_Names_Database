import React, { useState, useEffect } from "react";
import axios from "axios";
import NameList from "../components/NameList";

function LandingPage() {
  const [showNames, setShowNames] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    origin: "",
    meaning: "",
    password: "default123",
    created_by: "", // Add created_by to form data
  });
  const [users, setUsers] = useState([]); // State for user list

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching user list:", err);
      }
    };

    fetchUsers(); // Fetch user list on component mount
  }, []);

  const handleAddName = async () => {
    if (!formData.username || !formData.origin || !formData.meaning) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", formData);
      setShowNames(true);
      setFormData({
        username: "",
        origin: "",
        meaning: "",
        password: "default123",
        created_by: "",
      });
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
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="p-2 border rounded-md mr-2 text-black"
              />
              <input
                type="text"
                placeholder="Origin"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
                className="p-2 border rounded-md mr-2 text-black"
              />
              <input
                type="text"
                placeholder="Meaning"
                value={formData.meaning}
                onChange={(e) =>
                  setFormData({ ...formData, meaning: e.target.value })
                }
                className="p-2 border rounded-md mr-2 text-black"
              />
              <label
                htmlFor="created_by"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Created By:
              </label>
              <select
                id="created_by"
                name="created_by"
                value={formData.created_by || ""}
                onChange={(e) =>
                  setFormData({ ...formData, created_by: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">None</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
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