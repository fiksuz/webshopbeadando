import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Registration from './components/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.css";


function App() {
  const navItems = ["Home", "Regisztráció", "Bejelentkezés", "Termékek"];

  return (
    
      <Router>
        <NavBar brandName={"Webshop"} items={navItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/regisztracio' element={<Registration/>} />
        </Routes>
      </Router>
    
  );
}

export default App;
