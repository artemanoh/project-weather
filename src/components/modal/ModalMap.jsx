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
import "../../css/ModalMap.css";

const tempMarker = (temp) =>
  L.divIcon({
    className: "modal-map-marker-wrapper",
    html: `<div class="modal-map-marker">${Math.round(temp)}°</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });


  const MapFitAll = ({ cities, activeCityId }) => {
  const map = useMap();

  useEffect(() => {
    if (activeCityId !== null) return;
    if (!cities.length) return;

    const bounds = L.latLngBounds(
      cities.map(city => [city.coord.lat, city.coord.lon])
    );

    map.fitBounds(bounds, { padding: [40, 40]  });
  }, [activeCityId, cities, map]);

  return null;
};


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
    map.fitBounds(bounds, { padding: [40, 40]});
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

export const ModalMap = ({ cities, onClose }) => {
  const [focusedCityId, setFocusedCityId] = useState(null);
  const validCities = useMemo(
    () => cities.filter((city) => city.coord.lat && city.coord.lon),
    [cities],
  );
  const focusedCity =
    validCities.find((city) => city.id === focusedCityId) || null;

  if (!validCities.length) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-map">
        <div className="modal-map-header">
          <h2 className="modal-map-title">Weather Map</h2>
          <button
            className="modal-map-reset"
            onClick={() => setFocusedCityId(null)}
          >
            Show all cities
          </button>
          <button className="modal-map-close-btn" onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        <div className="modal-map-layout">
          <ul className="modal-map-city-list">
            {validCities.map((city) => (
              <li key={city.id}>
                <button
                  className={`modal-map-city-btn ${
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
          <div className="modal-map-canvas">
            <MapContainer
              center={[50, 20]}
              zoom={4}
              className="modal-map-leaflet"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap, &copy; CARTO"
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <MapAutoFit cities={validCities} />
              <MapFocusCity city={focusedCity} />
               <MapFitAll cities={validCities} activeCityId={focusedCityId} />

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
                      🤔 Feels like: {Math.round(city.main.feels_like)}°C
                      <br />
                      💧 Humidity: {city.main.humidity}%
                      <br />
                      🌬 Wind: {Math.round(city.wind.speed)} m/s
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
    </div>
  );
};
