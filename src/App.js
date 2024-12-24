import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";

import "./App.css";
import Contact from "./pages/Contact";
import Others from "./pages/Others";

const App = () => (
  <Router>
    <div className="app-container">
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/others" element={<Others />} />
      </Routes>
    </div>
  </Router>
);

export default App;
