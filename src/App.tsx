import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Registration from './components/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.css";
import Login from './components/Login';
import Profile from './components/Profile';


function App() {
  const navItems = ["Home", "Regisztráció", "Bejelentkezés", "Termékek"];

  return (
    
      <Router>
        <NavBar brandName={"Webshop"} items={navItems}  />
        <Routes>
        <Route path="/bejelentkezés" element={<Login />} />
        <Route path="/regisztracio" element={<Registration />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    
  );
}

export default App;
