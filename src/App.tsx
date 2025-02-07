import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigator from "./components/Navigator.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import AdventurePage from "./pages/AdventurePage.tsx";
import TreasuryPage from "./pages/TreasuryPage.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main-content">
          <Navigator />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/adventure" element={<AdventurePage />} />
            <Route path="/treasury" element={<TreasuryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
