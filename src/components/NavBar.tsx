import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './style.css'

interface NavBarProps {
    brandName: string;
    items: string[];
}

function NavBar({ brandName, items }: NavBarProps) {
    return (
        <nav className="navbar navbar-expand-md navbar-black bg-black shadow">
            <a className="navbar-brand" href="#">
                <span className="fw-bolder fs-4">{brandName}</span>
            </a>
            <div className="navigacio">
                <ul>
                    {items.map((item, index) => (
                      <li key={index}>
                      {item === 'Home' ? (
                          <NavLink to="/">{item}</NavLink>
                      ) : item === 'Regisztráció' ? (
                          <NavLink to="/regisztracio">{item}</NavLink>
                      ) : (
                          <NavLink to={"/" + item.toLowerCase()}>{item}</NavLink>
                      )}
                  </li>
                    ))}
                </ul>
                <div className="kosar">
                    <NavLink to="/kosar"><FontAwesomeIcon icon={faShoppingBasket} /></NavLink>
                </div>

                <div className="profil">
                    <NavLink to="/profil"><FontAwesomeIcon icon={faUser} /></NavLink>
                </div>

            </div>

        </nav>
    );
}

export default NavBar;
