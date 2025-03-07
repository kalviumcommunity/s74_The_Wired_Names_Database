import React from "react";
import NameCard from "./NameCard";

const names = [
  { name: "Aarav", origin: "Indian", meaning: "Peaceful" },
  { name: "Elara", origin: "Greek", meaning: "Bright, Shining" },
  { name: "Kai", origin: "Hawaiian", meaning: "Sea" },
];

function NameList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {names.map((name, index) => (
        <NameCard key={index} name={name} />
      ))}
    </div>
  );
}

export default NameList;
