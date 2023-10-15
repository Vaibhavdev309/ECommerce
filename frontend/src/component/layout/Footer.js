import React from "react";
import "./Footer.css";
import playStore from "../../assets/playStore.png";
import appStore from "../../assets/appStore.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Available for both iOS and Android</p>
        <img src={appStore} alt="icon for app Store" />
        <img src={playStore} alt="icon for play Store" />
      </div>
      <div className="midFooter">
        <h1>SudoSu</h1>
        <p>High Privacy is our first Priority</p>
        <p>Copyright {Date.now().year} &copy; VaibhavKumarMaurya</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="Instagram">
          <i className="fab fa-instagram"></i>
          Instagram
        </a>
        <a href="LinkedIn">
          <i className="fab fa-linkedin"></i>
          LinkedIn
        </a>
        <a href="Gmail">
          <i className="fas fa-envelope"></i>
          Gmail
        </a>
      </div>
    </footer>
  );
};

export default Footer;
