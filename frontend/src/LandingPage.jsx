function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gradient-to-r from-green-300 via-blue-300 to-purple-400">
      <div className="bg-white p-10 rounded-2xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-green-700 drop-shadow-lg">
          Welcome to the <span className="text-blue-600">ASAP Project</span>
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          This is the landing page for our ASAP idea.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-md transition-all transform hover:scale-105 hover:bg-green-600">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
