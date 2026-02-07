import logo from "../images/header-logo.png";
import userLogo from "../images/user-logo.png";
import menu from "../images/menu.png";
import "../css/Header.css";
import { useState } from "react";
export const Header = () => {
  const [open,setOpen] = useState(false)
  const [rotation, setRotation] = useState(0)

  const handleClick = () => {
    setRotation(prev => prev + 180)
  }
  return (
    <header className="header">
      <div className="header-container">
        <div className="container">
          <div className="header-box">
            <div className="header-boxes">
              <img className="header-logo" src={logo} alt="logo" />
              <div className="header-boxing">
                <ul className="header-list">
                  <li className="header-list-item">Who we are</li>
                  <li className="header-list-item">Contacts</li>
                  <li className="header-list-item">Menu</li>
                </ul>
                <div className="header-user-box">
                  <div className="header-invisible-box">
                    <button className="header-button">Sign up</button>
                    <button className="header-user-menu-button">
                      <img className="header-user-menu" src={userLogo} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-mobile-box"><img className="header-logo-menu" src={logo} alt="logo" />
            <div className="header-inner">
              <h2 className="header-menu">Menu</h2>
              <button className="header-menu-btn" onClick={() => setOpen(!open)}>
                <img onClick={handleClick} style={{ transform: `rotateX(${rotation}deg)` }} className="header-menu-open" src={menu} alt="" />
              </button>
            </div>
            </div>

            <nav className={`header-mobile-menu ${open ? 'is-open' : ''}`}>
              <ul className="header-mobile-menu-list">
                <li className="header-list-item">Who we are</li>
                <li className="header-list-item">Contacts</li>
                <li className="header-list-item">Menu</li>
              </ul>
               <div className="header-user-mobile">
                    <button className="header-button">Sign up</button>
                    <button className="header-user-menu-button">
                      <img className="header-user-menu-mobile" src={userLogo} alt="logo" />
                    </button>
                  </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
