import { useState } from "react";
import "../../css/ModalLogin.css";
import { toast } from "react-toastify";

export const ModalLogin = ({ onClose, openSignUp, setUser, setCities  }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const ApiUrl = "https://69a1838c2e82ee536fa16fb5.mockapi.io/users";

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(ApiUrl);
      const users = await response.json();
      const user = users.find(
        (u) => u.name === username && u.password === password
      );

      if (!user) {
        toast.error("Невірний логін або пароль!");
        return;
      }

      const likedCities =
        user.likedCities.map((city) => {
          if (city.coord && city.main && city.weather) {
            return { ...city, liked: true };
          }

          return {
            id: city.id,
            name: city.name,
            liked: true,
            coord: city.coord || { lat: city.lat || 0, lon: city.lon || 0 },
            sys: { country: city.country || city.sys.country || "UA" },
            main: {
              temp: city.temp || 0,
              feels_like: city.feels_like || city.temp || 0,
              temp_min: city.temp_min || city.temp || 0,
              temp_max: city.temp_max || city.temp || 0,
              humidity: city.humidity || 0,
              pressure: city.pressure || 0,
            },
            weather: [
              {
                icon: city.icon || city.weather[0].icon || "01d",
                description:
                  city.description || city.weather[0].description || city.name,
              },
            ],
            wind: { speed: city.windSpeed || city.wind.speed || 0 },
            visibility: city.visibility || 10000,
            dt: city.dt || Math.floor(Date.now() / 1000),
            timezone: city.timezone || 0,
          };
        }) || [];

setUser(user);
setCities(likedCities);
 onClose();
toast.success(`Вітаємо, ${user.name}!`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Помилка при вході. Спробуйте пізніше.");
    }
  };
  return (
    <div className="modal-login-backdrop" onClick={onClose}>
      <div className="modal-login-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-login-title">Log in</h2>
        <button className="modal-login-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
          </svg>
        </button>
        <form className="modal-login-form" onSubmit={handleSubmit}>
          <ul className="modal-login-list">
            <li className="modal-login-list-item">
              <label className="modal-login-label">
                Username
                <input
                  className="modal-login-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </li>
            <li className="modal-login-list-item">
              <label className="modal-login-label">
                Password
                <input
                  className="modal-login-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </li>
          </ul>
          <button
            className="modal-login-button"
            type="submit"
            disabled={!username || !password}
          >
            Log in
          </button>
        </form>
        <p className="modal-login-footer">
          Dont have account?{" "}
          <span className="modal-login-link" onClick={openSignUp}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
