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
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useFirebase } from "../components/Fireball";
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword, 
//   signOut, 
//   onAuthStateChanged 
// } from "firebase/auth";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// export const useWeather = (apiKey) => {
//   const [user, setUser] = useState(null);
//   const [cities, setCities] = useState([]);
//   const [likes, setLikes] = useState({});


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(useFirebase.auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         const userDoc = await getDoc(doc(useFirebase.db, "users", currentUser.uid));
//         if (userDoc.exists()) {
//           setLikes(userDoc.data().likes || {});
//         } else {
//           await setDoc(doc(useFirebase.db, "users", currentUser.uid), { likes: {} });
//           setLikes({});
//         }
//       } else {
//         setUser(null);
//         setLikes({});
//       }
//     });
//     return unsubscribe;
//   }, []);


//   const login = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(useFirebase.auth, email, password);
//       toast.success("Успішний вхід!");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };


//   const signup = async (email, password) => {
//     try {
//       const res = await createUserWithEmailAndPassword(useFirebase.auth, email, password);
//       await setDoc(doc(useFirebase.db, "users", res.user.uid), { likes: {} });
//       toast.success("Реєстрація успішна!");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };


//   const logout = async () => {
//     await signOut(useFirebase.auth);
//     toast.success("Вихід виконано!");
//   };


//   const addCity = async (cityName) => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
//       );
//       const data = await res.json();
//       if (data.cod === 200) {
//         if (!cities.find((c) => c.id === data.id)) {
//           setCities((prev) => [...prev, data]);
//           toast.success("Місто знайдено!");
//         }
//       } else {
//         toast.error("Не вдалось знайти місто");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   const removeCity = (id) => {
//     setCities((prev) => prev.filter((c) => c.id !== id));
//     toast.success("Місто видалено!");
//   };


//   const toggleLikeCity = async (cityId) => {
//     if (!user) {
//       toast.error("Зареєструйтесь, щоб лайкати міста!");
//       return;
//     }

//     const newLikes = { ...likes };
//     if (newLikes[cityId]) {
//       delete newLikes[cityId];
//       toast.info("Місто видалено з улюблених!");
//     } else {
//       newLikes[cityId] = true;
//       toast.success("Місто додано до улюблених!");
//     }

//     setLikes(newLikes);
//     await updateDoc(doc(useFirebase.db, "users", user.uid), { likes: newLikes });
//   };


//   const getHourlyWeather = async (city) => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${apiKey}`
//       );
//       const data = await res.json();

//       return data.list.slice(0, 8).map((item) => {
//         const date = new Date(item.useFirebase.dt * 1000);
//         const hour = date.toLocaleString("en-US", { hour: "numeric", hour12: true });
//         const day = date.toLocaleString("en-US", { weekday: "short" });
//         return { id: item.dt, time: hour, day, temp: Math.round(item.main.temp) };
//       });
//     } catch (err) {
//       console.log(err);
//       return [];
//     }
//   };

//   return {
//     user,
//     cities,
//     likes,
//     addCity,
//     removeCity,
//     toggleLikeCity,
//     getHourlyWeather,
//     login,
//     signup,
//     logout,
//   };
// };