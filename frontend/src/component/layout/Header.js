import React, { useState } from "react";
import "./Header.css";

export const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <nav className="navContainer">
      <nav className="navTitle">SudoSu</nav>
      <nav className="menuBar" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </nav>
      <nav className={click ? "menuLinkActive menuLink " : "menuLink"}>
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Product">Product</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
        </ul>
      </nav>
      <nav className="menuIcon">
        <i class="fa-solid fa-magnifying-glass"></i>
        <i class="fa-solid fa-cart-shopping"></i>
        <i class="fa-solid fa-user"></i>
      </nav>
    </nav>
  );
};

export default Header;
