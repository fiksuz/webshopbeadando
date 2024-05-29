import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from "./pages/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileChange from "./pages/DataChange";
import SEARCHPAGE from './pages/searchPage';
import PRODUCTPAGE from './pages/productPage';
import ProductList from "./pages/productList";

function App() {
  const navItems = ["Home", "Regisztráció", "Bejelentkezés", "Keresés"];

  return (
    <Router>
      <NavBar brandName={"Webshop"} items={navItems} />
      
      <Routes>
        <Route path="/bejelentkezes" element={<Login />} />
        <Route path="/regisztracio" element={<Registration />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<ProfileChange />} />
        <Route path="/search" element={<SEARCHPAGE />} />
        <Route path="/search/:params" element={<SEARCHPAGE />} />
        <Route path='/product/:productId' element={<PRODUCTPAGE />} />
        <Route path="/products/categories" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
