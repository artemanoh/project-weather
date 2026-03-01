import './App.css';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Weather } from './components/Weather';
import { Pets } from './components/Pets';
import { Footer } from './components/Footer';
import { Nature } from './components/Nature';
import { Modal } from './components/modal/Modal';
import { ModalLogin } from './components/modal/ModalLogin';
import { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrendingCities } from './components/TrendingCities';
import { ModalSettings } from './components/modal/ModalSettings';
import { ModalMap } from './components/modal/ModalMap';
import { toast } from "react-toastify";

const AvailableThemes = ["light", "dark", "nature", "aurora"];

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return AvailableThemes.includes(savedTheme) ? savedTheme : "light";
  });

  const handleOpenMap = () => {
  if (weather.cities.length === 0) {
    toast.warning("Спочатку додайте місто");
    return;
  }

  setOpen(true);
};
  useEffect(() => {
    document.body.classList.remove(
      "light-theme",
      "dark-theme",
      "nature-theme",
      "aurora-theme"
    );
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const weather = useWeather("80888bb460adb932cd1e3b372f015b83", setUser);






  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user")
    }
  }, [user]);
  return (
    <div className={`App ${theme}`}>
      <Header onOpenModal={() => setActiveModal("signup")} user={user} onLogOut={weather.onLogOut} onModalOpen={() => setActiveModal("settings")} />
      <Dashboard addCity={weather.addCity} />
      <TrendingCities addCity={weather.addCity}
        cities={weather.cities}
        apiKey={weather.apiKey} />
      <Weather cities={weather.cities} removeCity={weather.removeCity} refreshCity={weather.refreshCity} toggleLikeCity={weather.toggleLikeCity} getHourlyWeather={weather.getHourlyWeather} user={user} />
      <Pets />
      <Nature />
      <Footer />
      {activeModal === "signup" && (
        <Modal
          onClose={() => setActiveModal(null)}
          openLogin={() => setActiveModal("login")} setUser={setUser}
        />
      )}

      {activeModal === "login" && (
        <ModalLogin
          onClose={() => setActiveModal(null)}
          openSignUp={() => setActiveModal("signup")} setUser={setUser}
          setCities={weather.setCities}
        />
      )}
      {activeModal === "settings" && (
        <ModalSettings
          onClose={() => setActiveModal(null)}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      
       {open && (
  <ModalMap
    cities={weather.cities}
    onClose={() => setOpen(false)}
  />
)}

      <div className="app-map">
        <button className="app-map-button" disabled={!user}  onClick={() => handleOpenMap}>
          <svg
            className="icon-map"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >  <use href="#icon-map" /></svg></button>
      </div>
    </div>
  );
}

export default App;
