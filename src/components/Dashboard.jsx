import { useState } from "react";
import "../css/Dashboard.css";
import { useWeather } from "../hooks/useWeather";

export const Dashboard = ({ addCity }) => {
  const [cityName, setCityName] = useState("");
  const now = new Date();

  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekday = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const dayNumber = now.getDate();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) {
      return "th";
    }
    const lastDigit = n % 10;
    if (lastDigit === 1) {
      return "st";
    } else if (lastDigit === 2) {
      return "nd";
    } else if (lastDigit === 3) {
      return "rd";
    } else {
      return "th";
    }
  };

  const dayWithSuffix = `${dayNumber}${getOrdinal(dayNumber)}`;
  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Weather dashboard</h2>

        <div className="dashboard-box">
          <h2 className="dashboard-text">
            Create your personal list of favorite cities and always be aware of
            the weather.
          </h2>
          <div className="dashboard-line"></div>
          <div className="dashboard-mobile-box">
            <h2 className="dashboard-text-mobile">
              Create your personal list of favorite cities and always be aware
              of the weather.
            </h2>
            <h2 className="dashboard-date">
              {monthYear}
              <br />
              {weekday}, {dayWithSuffix}
            </h2>
          </div>
        </div>
        <div className="dashboard-boxes">
          <input
            type="text"
            className="dashboard-input"
            placeholder="Search location"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
          />
          <button
            type="submit"
            className=" dashboard-input-button"
            onClick={() => {
              addCity(cityName);
              setCityName("");
            }}
          >
            <svg
              className="icon-search"
              width={32}
              height={32}
              viewBox="0 0 32 32"
            >
              <use href="#icon-search" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
