import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/WeatherMap.css";


const tempMarker = (temp) =>
  L.divIcon({
    className: "weather-map-marker-wrapper",
    html: `<div class="weather-map-marker">${Math.round(temp)}°</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });

const MapAutoFit = ({ cities }) => {
  const map = useMap();

  useEffect(() => {
    if (!cities.length) return;
    if (cities.length === 1) {
      map.setView([cities[0].coord.lat, cities[0].coord.lon], 6);
      return;
    }

    const bounds = L.latLngBounds(
      cities.map((city) => [city.coord.lat, city.coord.lon]),
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [cities, map]);

  return null;
};
const MapFocusCity = ({ city }) => {
  const map = useMap();

  useEffect(() => {
    if (!city) return;
    map.flyTo([city.coord.lat, city.coord.lon], 7, { duration: 0.9 });
  }, [city, map]);

  return null;
};


export const WeatherMap = ({ cities }) => {
      const [focusedCityId, setFocusedCityId] = useState(null);
  const validCities = useMemo(
    () => cities.filter((city) => city.coord.lat && city.coord.lon),
    [cities],
  );
    const focusedCity = validCities.find((city) => city.id === focusedCityId) || null;

  if (!validCities.length) return null;

  return (
    <section className="weather-map">
      <div className="container">
        <div className="weather-map-header">
          <h2 className="weather-map-title">Weather Map</h2>
                    <button
            className="weather-map-reset"
          onClick={() => setFocusedCityId(null)}
          >
            Show all cities
          </button>

        </div>
        <div className="weather-map-layout">
          <ul className="weather-map-city-list">
            {validCities.map((city) => (
              <li key={city.id}>
               <button
                  className={`weather-map-city-btn ${
                    focusedCityId === city.id ? "active" : ""
                  }`}
                  onClick={() => setFocusedCityId(city.id)}
                >
                  <span>{city.name}</span>
                  <span>{Math.round(city.main.temp)}°C</span>
                </button>
              </li>
            ))}
          </ul>
            <div className="weather-map-canvas">

          <MapContainer
            center={[50, 20]}
            zoom={4}
            className="weather-map-leaflet"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap, &copy; CARTO"
           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

            />
            <MapAutoFit cities={validCities} />
              <MapFocusCity city={focusedCity} />


            {validCities.map((city) => {
              return (
                <Marker
                  key={city.id}
                  icon={tempMarker(city.main.temp)}
                  position={[city.coord.lat, city.coord.lon]}
                >
                  <Tooltip direction="top" offset={[0, -14]} opacity={1}>
                    {city.name}
                  </Tooltip>
                  <Popup>
                    <strong>{city.name}</strong>
                    <br />
                    🌡 {Math.round(city.main.temp)}°C
                    <br />
                    {city.weather[0].description}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
