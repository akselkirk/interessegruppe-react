import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <div className={`${style.header}`}>
      <img className={`${style.logo}`} src={logo} alt="small react logo" />
      <div>
        <h1>Min Todo App</h1>
      </div>
      <img className={`${style.logo}`} src={logo} alt="small react logo" />
    </div>
  );
};

export default Header;
