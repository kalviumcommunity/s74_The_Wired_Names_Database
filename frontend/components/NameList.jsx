import React, { useEffect, useState } from "react";
import NameCard from "./NameCard";

function NameList() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users") // Fetching from backend
      .then((res) => res.json())
      .then((data) => setNames(data))
      .catch((error) => console.error("Error fetching names:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {names.map((name) => (
        <NameCard key={name._id} name={name} />
      ))}
    </div>
  );
}

export default NameList;
