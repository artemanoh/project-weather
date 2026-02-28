import "../css/TrendingCities.css";

export const TrendingCities = ({ addCity, cities }) => {
  const popularCities = ["Kyiv", "London", "New York", "Tokyo", "Paris"];
  return (
    <div className="trending-section">
      <h2 className="trending-title">Trending 🔥</h2>

      <div className="trending-list">
        {popularCities.map((city) => {
          const alreadyAdded = cities.some((c) => c.name === city);

          return (
            <button
              key={city}
              onClick={() => addCity(city)}
              disabled={alreadyAdded}
              className={`trending-btn ${alreadyAdded ? "disabled" : ""}`}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
};
