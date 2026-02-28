import "../css/AdvancedWeather.css";
import temp from "../images/temp.png";
import rain from "../images/rain.png";
import wind from "../images/wind.png";
import pressure from "../images/pressure.png";
import eye from "../images/eye.png";

export const AdvancedWeather = ({ city }) => {
  if (!city) return null;

  return (
    <section className="advanced-weather">
      <div className="container">
        <ul className="advanced-weather-list">
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Feels like</h3>
            <h2 className="advanced-weather-temp">
              {Math.round(city.main.feels_like)}°C
            </h2>
            <img
              className="advanced-weather-img"
              src={temp}
              alt={city.weather[0].description}
            />
          </li>
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Min °C</h3>
            <h2 className="advanced-weather-temp">
              {Math.round(city.main.temp_min)}°C
            </h2>
            <h3 className="advanced-weather-text">Max °C</h3>
            <h2 className="advanced-weather-temp">
              {Math.round(city.main.temp_max)}°C
            </h2>
          </li>
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Humidity</h3>
            <h2 className="advanced-weather-temp">{city.main.humidity}%</h2>
                        <img  src={rain} alt="rain" className="advanced-weather-img"/>
          </li>
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Pressure</h3>
            <h2 className="advanced-weather-temp">{city.main.pressure} Pa</h2>
            <img src={pressure} alt="pressure" className="advanced-weather-img"/>
          </li>
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Wind speed</h3>
            <h2 className="advanced-weather-temp">{city.wind.speed} m/s</h2>
            <img  src={wind} alt="wind" className="advanced-weather-img"/>
          </li>
          <li className="advanced-weather-list-item">
            <h3 className="advanced-weather-text">Visibility</h3>
            <h2 className="advanced-weather-temp">{city.visibility / 1000} km</h2>
             <img src={eye} alt="" />
            
          </li>
        </ul>
      </div>
    </section>
  );
};
