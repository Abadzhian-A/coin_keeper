import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
    <div className="navbar-brand p-lg-2">
      Coin keeper
    </div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">Головна</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/about" className="nav-link">Інформація</NavLink>
      </li>
    </ul>
  </nav>
)