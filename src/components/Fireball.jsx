import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA40tstGaYQ5TqhzMFSmvSLX1leoPtaxQg",
  authDomain: "weather-44e50.firebaseapp.com",
  projectId: "weather-44e50",
  storageBucket: "weather-44e50.firebasestorage.app",
  messagingSenderId: "830067759582",
  appId: "1:830067759582:web:21a1473dc656351d2e254f"
};

const app = initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext({
  auth: getAuth(app),
  db: getFirestore(app),
});

export const useFirebase = () => React.useContext(FirebaseContext);