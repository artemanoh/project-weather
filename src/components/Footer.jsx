import instagram from "../images/instagram.png";
import facebook from "../images/facebook.png";
import whatsapp from "../images/whatsapp.png";
import logo from "../images/header-logo.png";
import "../css/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-div">
            <img className="footer-logo" src={logo} alt="footer-logo" />
            <div className="footer-mobile-box">
              <div className="footer-box">
                <h2 className="footer-addres">Address</h2>
                <p className="footer-text">Svobody str. 35</p>
                <p className="footer-text">Kyiv</p>
                <p className="footer-text">Ukraine</p>
              </div>
              <div className="footer-boxes">
                <h2 className="footer-contact">Contact us</h2>
                <div className="footer-contact-box">
                  <a href="https://instagram.com">
                    <img src={instagram} alt="instagram" />
                  </a>
                  <a href="https://facebook.com">
                    <img src={facebook} alt="facebook" />
                  </a>
                  <a href="https://whatsapp.com">
                    <img src={whatsapp} alt="whatsapp" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
