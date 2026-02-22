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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeModal, setActiveModal] = useState(null);
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});
  const weather = useWeather("80888bb460adb932cd1e3b372f015b83");
  

  const onLogOut = () => {
    localStorage.removeItem("user")
    setUser(null)
    toast.success("Успішний вихід з аккаунту!");
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user")
    }
  }, [user]);
  return (
    <div className="App">
      <Header onOpenModal={() => setActiveModal("signup")} user={user} onLogOut={onLogOut} />
      <Dashboard addCity={weather.addCity} />
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
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
