import React, { useState } from "react";
import NameList from "../components/NameList";

function LandingPage() {
  const [showNames, setShowNames] = useState(false);

  const handleGetStarted = () => {
    setShowNames(true);
    setTimeout(() => {
      document.getElementById("name-list-section").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-r from-green-300 via-blue-300 to-purple-400">
      <div className="bg-white p-10 rounded-2xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-green-700 drop-shadow-lg">
          Welcome to the <span className="text-blue-600">ASAP Project</span>
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          Discover unique and fascinating names from around the world!
        </p>
        <button
          onClick={handleGetStarted}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-md transition-all transform hover:scale-105 hover:bg-green-600"
        >
          Get Started
        </button>
      </div>

      {showNames && (
        <div id="name-list-section" className="mt-8 w-full">
          <NameList />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
