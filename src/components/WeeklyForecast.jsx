import { useEffect, useState } from "react";
import "../css/WeeklyForecast.css";

export const WeeklyForecast = ({ city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=80888bb460adb932cd1e3b372f015b83&units=metric`,
      );
      const data = await res.json();

      if (!data.list) return;

      const dailyData = [];
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        const existing = dailyData.find((d) => d.date === date);

        if (!existing) {
          dailyData.push({
            date,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            weather: item.weather[0],
          });
        } else {
          existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
          existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
        }
      });

      setForecast(dailyData);
    };

    if (city) fetchForecast();
  }, [city]);

  if (!forecast) return <p>Loading...</p>;
 
  return (
    <section className="wekly-forecast">
      <div className="wekly-forecast-box">
        <h2 className="wekly-forecast-title">5-day forecast</h2>
        <ul className="wekly-forecast-list">
          {forecast.map((day) => (
            <li key={day.date} className="wekly-forecast-list-item">
              <h3 className="wekly-forecast-text">{day.date}</h3>
              <div className="wekly-forecast-boxes">
                <img
                  className="wekly-forecast-img"
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                />
                <h3 className="wekly-forecast-temp">
                  {Math.round(day.temp_max)}/{Math.round(day.temp_min)}°C
                </h3>
              </div>
              <h3 className="wekly-forecast-desk">{day.weather.description}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
