import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Registration from "./pages/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileChange from "./pages/DataChange";
import SEARCHPAGE from './pages/searchPage';
import PRODUCTPAGE from './pages/productPage';

function App() {
  const navItems = ["Home", "Regisztráció", "Bejelentkezés", "Keresés"];

  return (
    <Router>
      <NavBar brandName={"Webshop"} items={navItems} />
      <Routes>
        <Route path="/bejelentkezés" element={<Login />} />
        <Route path="/regisztráció" element={<Registration />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<ProfileChange />} />
        <Route path="/kereses" element={<SEARCHPAGE />} />
        <Route path="/kereses/:params" element={<SEARCHPAGE />} />
        <Route path='/products/:productId' element={<PRODUCTPAGE />} />
      </Routes>
    </Router>
  );
}

export default App;
