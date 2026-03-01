export const WeatherOverview = ({ cities, generateOverview, overview, loading }) => {
  const hasSelectedCities = cities.length > 0;

  return (
    <section className="weather-overview">
      <h2>Огляд погоди від GPT</h2>
      <button
        onClick={() => generateOverview(cities)}
        disabled={loading || !hasSelectedCities}
      >
        {loading ? "Генеруємо..." : "Оновити огляд"}
      </button>
      {!hasSelectedCities && <p>Оберіть хоча б одну картку в секції Weather.</p>}
      {overview && <p>{overview}</p>}
    </section>
  );
};
