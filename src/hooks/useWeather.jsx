import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useWeather = (apiKey) => {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("cities");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const addCity = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
      );
      const data = await res.json();
      if (data.cod === 200) {
        if (!cities.find((city) => city.id === data.id)) {
          setCities((prev) => [...prev, data]);
          toast.success("Місто знайдено!");
        }
        return true;
      } else {
        toast.error("Не вдалось знайти місто");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const removeCity = (id) => {
    setCities((prev) => {
      const cityToRemove = prev.find((c) => c.id === id);
      if (cityToRemove) {
        toast.success(`${cityToRemove.name} видалено!`);
      }
      return prev.filter((city) => city.id !== id);
    });
  };

  const refreshCity = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`,
      );
      const data = await res.json();

      setCities((prev) => prev.map((c) => (c.id === city.id ? data : c)));
      toast.success(`${city.name} оновлено!`);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const toggleLikeCity = ({id, user}) => {
    if (!user) {
       toast.error(`Зареєструйтесь щоб додати місто в список улюблених`);
       return
    }
    setCities((prev) =>
      prev.map((city) => {
        if (city.id === id) {
          const newLiked = !city.liked;
          if (newLiked) {
            toast.success(`${city.name} додано до улюблених!`);
          } else {
            toast.success(`${city.name} видалено з улюблених!`);
          }
          return { ...city, liked: newLiked };
        }
        return city;
      }),
    );
  };

  const getHourlyWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${apiKey}`,
      );

      const data = await res.json();

      const formatted = data.list.slice(0, 8).map((item) => {
        const date = new Date(item.dt * 1000);

        const day = date.toLocaleString("en-US", { weekday: "short" });
        const hour = date.toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
        });

        return {
          id: item.dt,
          time: hour,
          day,
          temp: Math.round(item.main.temp),
        };
      });

      return formatted;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return { cities, addCity, removeCity, refreshCity, toggleLikeCity, getHourlyWeather };
};