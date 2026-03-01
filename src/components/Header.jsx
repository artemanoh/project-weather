import logo from "../images/header-logo.png";
import userLogo from "../images/user-logo.png";
import "../css/Header.css";
import { useState } from "react";

export const Header = ({ onOpenModal, user, onLogOut,onModalOpen }) => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="container">
          <div className="header-box">
            <div className="header-boxes">
              <img className="header-logo" src={logo} alt="logo" />
              <div className="header-boxing">
                <ul className="header-list">
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("dashboard");
                      }}
                    >
                      {" "}
                      Dashboard
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("pets");
                      }}
                    >
                      {" "}
                      Pets
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("nature");
                      }}
                    >
                      {" "}
                      Nature
                    </button>
                  </li>
                </ul>
                <div className="header-user-box">
                  <div className="header-invisible-box">
                    {user ? (
                      <>
                        <button onClick={onLogOut} className="header-button">
                          Log out
                        </button>
                        <div className="header-name-wrapper">
                          <span className="header-name">{user.name}</span>
                          <span className="tooltip">{user.name}</span>
                        </div>
                      </>
                    ) : (
                      <button className="header-button" onClick={onOpenModal}>
                        Sign up
                      </button>
                    )}
                    <button className="header-user-menu-button" onClick={onModalOpen}>
                      <img className="header-user-menu" src={userLogo} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-mobile-box" >
              <img className="header-logo-menu" src={logo} alt="logo" />
              <div className="header-inner">
                <button
                  className={`menu-btn ${open ? "open" : ""}`}
                  onClick={() => setOpen(!open)}
                ></button>
              </div>
            </div>

            <nav className={`header-mobile-menu ${open ? "is-open" : ""}`}>
              <ul className="header-mobile-menu-list">
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("dashboard");
                      }}
                    >
                      {" "}
                      Dashboard
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("pets");
                      }}
                    >
                      {" "}
                      Pets
                    </button>
                  </li>
                  <li className="header-list-item">
                    <button className="header-btn"
                      onClick={() => {
                        scrollToSection("nature");
                      }}
                    >
                      {" "}
                      Nature
                    </button>
                  </li>
              </ul>
              <div className="header-user-mobile">
                {" "}
                {user ? (
                  <>
                    <button onClick={onLogOut} className="header-button">
                      Log out
                    </button>
                    <div className="header-name-wrapper-mobile">
                      <span className="header-name-mobile">{user.name}</span>
                      <span className="tooltip-mobile">{user.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="header-button" onClick={onOpenModal}>
                      Sign up
                    </button>
                  </>
                )}
                <button className="header-user-menu-button" onClick={onModalOpen}>
                  <img
                    className="header-user-menu-mobile"
                    src={userLogo}
                    alt="logo"
                  />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
