import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./styles/App.css";
import CallPage from "./pages/CallPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/call-center" element={<CallPage />} />
      </Routes>
    </Router>
  );
}

export default App;
