import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import EditName from "../components/EditName";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/edit/:id" element={<EditName />} />
      </Routes>
    </Router>
  );
}

export default App;