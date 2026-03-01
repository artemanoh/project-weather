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
  user,
}) => {
  const [activeCity, setActiveCity] = useState(null);
  const [activeForecast, setActiveForecast] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [currentUtc, setCurrentUtc] = useState(Date.now());

  

  const getCityDate = (timezone = 0) =>
    new Date(currentUtc + timezone * 1000);

const handleRemoveCity = (cityId) => {
  if (activeCity && activeCity.id === cityId) {
    setActiveCity(null);
    setActiveForecast(null);
    setHourlyData([]);
  }

  removeCity(cityId);
};

  const openForecast = async (city, type) => {
   if (activeCity && activeCity.id === city.id && activeForecast === type) {
      setActiveCity(null);
      setActiveForecast(null);
      setHourlyData([]);
      return;
    }

    setActiveCity(city);
    setActiveForecast(type);

    if (type === "hourly") {
      const data = await getHourlyWeather(city);
      setHourlyData(data || []);
    }
  };

const handleRefreshCity = async (city) => {
  const wasLiked = city.liked;

  const updated = await refreshCity(city);

  if (updated && wasLiked) {
    updated.liked = true;
  }

  setCurrentUtc(Date.now());
};

  return (
    <section className="weather">
      <div className="container">
        <ul className="weather-list">
          {cities.length === 0 && (
            <>
              <h2 className="weather-empty-state">
                🌍 Start by adding your first city
              </h2>
            </>
          )}
          {cities.map((city) => {
            const cityDate = getCityDate(city.timezone);

            return (
            <li key={city.id} className="weather-list-item">
              <div className="weather-box">
                <h3 className="weather-city">{city.name}</h3>
                <h3 className="weather-country">{city.sys.country}</h3>
              </div>

              <h2 className="weather-time">
                {cityDate.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC",
                })}
              </h2>
              {user && (
                <div className="weather-button-box">
                  <button
                    className="weather-button"
                    onClick={() => openForecast(city, "hourly")}
                  >
                    Hourly forecast
                  </button>

                  <button
                    className="weather-button"
                    onClick={() => openForecast(city, "weekly")}
                  >
                    Weekly forecast
                  </button>
                </div>
              )}
              {!user && (
                <div className="weather-button-box">
                  <button
                    className="weather-button"
                    onClick={() => openForecast(city, "hourly")}
                  >
                    Hourly forecast
                  </button>
                </div>
              )}

              <div className="weather-date-box">
                <h3 className="weather-data">
                  {cityDate.toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  })}
                </h3>
                <div className="weather-line"></div>
                <h3 className="weather-day">
                  {cityDate.toLocaleDateString("en-GB", {
                    weekday: "long",
                    timeZone: "UTC",
                  })}
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
                    onClick={() => handleRefreshCity(city)}
                  >
                    <svg className="icon icon-spinner" width="32" height="32">
                      <use href="#icon-spinner"></use>
                    </svg>
                  </button>

                  <div className="weather-icon-div">
                    <button
                      className="weather-icon"
                      onClick={() => toggleLikeCity({ id: city.id, user })}
                    >
                      <svg
                        className={`icon icon-heart ${city.liked ? "icon-heard-liked" : ""}`}
                        width="32"
                        height="32"
                      >
                        {city.liked ? (
                          <use href="#heart-full-icon"></use>
                        ) : (
                          <use href="#icon-heart"></use>
                        )}
                      </svg>
                    </button>

                    <button
                      className="weather-buttons"
                      onClick={() => openForecast(city, null)}
                    >
                      See more
                    </button>

                    <button
                      className="weather-icon"
                      onClick={() => handleRemoveCity(city.id)}
                    >
                      <svg className="icon icon-trash" width="32" height="32">
                        <use href="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            );
          })}
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
