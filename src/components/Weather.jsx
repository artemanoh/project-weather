import sun from "../images/sun.png";
import "../css/Weather.css";

export const Weather = () => {
  return (
    <section className="weather">
      <div className="container">
      <ul className="weather-list">
        <li className="weather-list-item">
          <div className="weather-box">
            <h3 className="weather-city">Prague</h3>
            <h3 className="weather-country">Czech Republic</h3>
          </div>
          <h2 className="weather-time">14:00</h2>
          <div className="weather-button-box">
            <button className="weather-button">Hourly forecast</button>
          </div>

          <div className="weather-date-box">
            <h3 className="weather-data">13.10.2023</h3>
            <div className="weather-line"></div>
            <h3 className="weather-day">Friday</h3>
          </div>
          <div>
            <img src={sun} className="weather-image" alt="" />
          </div>

          <h2 className="weather-temperature">22°C</h2>
          <div className="weather-div">
            <div className="weather-icon-box">
              <button className="weather-icon">
                <svg className="icon icon-spinner" width="32" height="32">
                  <use href="#icon-spinner"></use>
                </svg>
              </button>
              <div className="weather-icon-div">
                <button className="weather-icon">
                  <svg className="icon icon-heart" width="32" height="32">
                    <use href="#icon-heart"></use>
                  </svg>
                </button>

                <button className="weather-buttons">See more</button>
                <button className="weather-icon">
                  <svg className="icon icon-trash" width="32" height="32">
                    <use href="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li className="weather-list-item">
          <div className="weather-box">
            <h3 className="weather-city">Prague</h3>
            <h3 className="weather-country">Czech Republic</h3>
          </div>
          <h2 className="weather-time">14:00</h2>
          <div className="weather-button-box">
            <button className="weather-button">Hourly forecast</button>
          </div>

          <div className="weather-date-box">
            <h3 className="weather-data">13.10.2023</h3>
            <div className="weather-line"></div>
            <h3 className="weather-day">Friday</h3>
          </div>
          <div>
            <img src={sun} className="weather-image" alt="" />
          </div>

          <h2 className="weather-temperature">22°C</h2>
          <div className="weather-div">
            <div className="weather-icon-box">
              <button className="weather-icon">
                <svg className="icon icon-spinner" width="32" height="32">
                  <use href="#icon-spinner"></use>
                </svg>
              </button>
              <div className="weather-icon-div">
                <button className="weather-icon">
                  <svg className="icon icon-heart" width="32" height="32">
                    <use href="#icon-heart"></use>
                  </svg>
                </button>

                <button className="weather-buttons">See more</button>
                <button className="weather-icon">
                  <svg className="icon icon-trash" width="32" height="32">
                    <use href="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li className="weather-list-item">
          <div className="weather-box">
            <h3 className="weather-city">Prague</h3>
            <h3 className="weather-country">Czech Republic</h3>
          </div>
          <h2 className="weather-time">14:00</h2>
          <div className="weather-button-box">
            <button className="weather-button">Hourly forecast</button>
          </div>

          <div className="weather-date-box">
            <h3 className="weather-data">13.10.2023</h3>
            <div className="weather-line"></div>
            <h3 className="weather-day">Friday</h3>
          </div>
          <div>
            <img src={sun} className="weather-image" alt="" />
          </div>

          <h2 className="weather-temperature">22°C</h2>
          <div className="weather-div">
            <div className="weather-icon-box">
              <button className="weather-icon">
                <svg className="icon icon-spinner" width="32" height="32">
                  <use href="#icon-spinner"></use>
                </svg>
              </button>
              <div className="weather-icon-div">
                <button className="weather-icon">
                  <svg className="icon icon-heart" width="32" height="32">
                    <use href="#icon-heart"></use>
                  </svg>
                </button>

                <button className="weather-buttons">See more</button>
                <button className="weather-icon">
                  <svg className="icon icon-trash" width="32" height="32">
                    <use href="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      </div>
    </section>
  );
};
