import logo from "../images/header-logo.png";
import userLogo from "../images/user-logo.png";
import "../css/Header.css";
export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="container">
          <div className="header-box">
            <div className="header-boxes">
              <img className="header-logo" src={logo} alt="" />
              <div className="header-boxing">
                <ul className="header-list">
                  <li className="header-list-item">Who we are</li>
                  <li className="header-list-item">Contacts</li>
                  <li className="header-list-item">Menu</li>
                </ul>
                <div className="header-user-box">
                  <button className="header-button">Sign up</button>
                  <button className="header-user-menu-button">
                    <img className="header-user-menu" src={userLogo} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
