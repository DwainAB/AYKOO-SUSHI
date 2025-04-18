import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LegalNotices from "./Pages/LegalNotices/LegalNotices";



function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legalNotices" element={<LegalNotices />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
