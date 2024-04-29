import React from "react";
import logOutButton from "../../static/logout.png";
import "./NavBar.css";
import logo from "../../static/QB Tech Black (1).png";
const NavBar = ({ showOne, handleLogOut }) => {
  return (
    <div className="admin-navbar">
      <div className="admin-details">
        <div className="qb-logo">
          <img src={logo} alt="QB tech logo" className="qb-logo-img" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="admin-navbar-component">Hello, {showOne.name}</div>

        <div className="admin-navbar-component">{showOne.Dept}</div>

        <button className="admin-navbar-button" onClick={handleLogOut}>
          <div>
            <img src={logOutButton} alt="" className="logoutImage" />
          </div>
          <span className="logo-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
