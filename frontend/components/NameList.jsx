import React, { useEffect, useState } from "react";
import NameCard from "./NameCard";
import axios from "axios";

function NameList() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatorId, setCreatorId] = useState("");
  const [users, setUsers] = useState([]);

  const fetchNames = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:3000/users";
      if (creatorId) {
        url = `http://localhost:3000/users/creator/${creatorId}`;
      }
      const res = await axios.get(url);
      setNames(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching names");
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching user list:", err);
    }
  };

  useEffect(() => {
    fetchNames();
    fetchUsers();
  }, [creatorId]);

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
      <label htmlFor="creator-select">Filter by Creator:</label>
      <select
        id="creator-select"
        value={creatorId}
        onChange={(e) => setCreatorId(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      {names.map((name) => (
        <NameCard key={name._id} name={name} onDelete={handleDeleteName} />
      ))}
    </div>
  );
}

export default NameList;