import sun from "../images/sun.png";
import "../css/Weather.css";
import { useState } from "react";
import { AdvancedWeather } from "./AdvancedWeather";
import { WeeklyForecast } from "./WeeklyForecast";
import { HourlyForecast } from "./HourlyForcast";

export const Weather = ({
  cities,
  removeCity,
  refreshCity,
  toggleLikeCity,
  getHourlyWeather,
}) => {
  const [activeCity, setActiveCity] = useState(null);
  const [activeForecast, setActiveForecast] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);

  return (
    <section className="weather">
      <div className="container">
        <ul className="weather-list">
          {cities.map((city) => (
            <li key={city.id} className="weather-list-item">
              <div className="weather-box">
                <h3 className="weather-city">{city.name}</h3>
                <h3 className="weather-country">{city.sys.country}</h3>
              </div>

              <h2 className="weather-time">
                {new Date(
                  Date.now() + city.timezone * 1000,
                ).toLocaleTimeString()}
              </h2>

              <div className="weather-button-box">
                <button
                  className="weather-button"
                  onClick={async () => {
                    if (
                      activeCity?.id === city.id &&
                      activeForecast === "hourly"
                    ) {
                      setActiveCity(null);
                      setActiveForecast(null);
                    } else {
                      setActiveCity(city);
                      setActiveForecast("hourly");

                      const data = await getHourlyWeather(city);
                      setHourlyData(data);
                    }
                  }}
                >
                  Hourly forecast
                </button>

                <button
                  className="weather-button"
                  onClick={() => {
                    if (
                      activeCity?.id === city.id &&
                      activeForecast === "weekly"
                    ) {
                      setActiveCity(null);
                      setActiveForecast(null);
                    } else {
                      setActiveCity(city);
                      setActiveForecast("weekly");
                    }
                  }}
                >
                  Weekly forecast
                </button>
              </div>

              <div className="weather-date-box">
                <h3 className="weather-data">
                  {new Date().toLocaleDateString()}
                </h3>
                <div className="weather-line"></div>
                <h3 className="weather-day">
                  {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                </h3>
              </div>

              <div>
                <img
                  src={
                    city.weather[0].icon
                      ? `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
                      : sun
                  }
                  className="weather-image"
                  alt={city.weather[0].description}
                />
              </div>

              <h2 className="weather-temperature">
                {Math.round(city.main.temp)}°C
              </h2>

              <div className="weather-div">
                <div className="weather-icon-box">
                  <button
                    className="weather-icon"
                    onClick={() => refreshCity(city)}
                  >
                    <svg className="icon icon-spinner" width="32" height="32">
                      <use href="#icon-spinner"></use>
                    </svg>
                  </button>

                  <div className="weather-icon-div">
                    <button
                      className="weather-icon"
                      onClick={() => toggleLikeCity(city.id)}
                    >
                      <svg
                        className={`icon icon-heart ${city.liked ? "icon-heard-liked" : ""}`}
                        width="32"
                        height="32"
                      >
                        <use href="#icon-heart"></use>
                      </svg>
                    </button>

                    <button
                      className="weather-buttons"
                      onClick={() => setActiveCity(city)}
                    >
                      See more
                    </button>

                    <button
                      className="weather-icon"
                      onClick={() => removeCity(city.id)}
                    >
                      <svg className="icon icon-trash" width="32" height="32">
                        <use href="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {activeCity && !activeForecast && <AdvancedWeather city={activeCity} />}
      {activeCity && activeForecast === "weekly" && (
        <WeeklyForecast city={activeCity} />
      )}
      {activeCity && activeForecast === "hourly" && (
        <HourlyForecast hourlyData={hourlyData} />
      )}
    </section>
  );
};
