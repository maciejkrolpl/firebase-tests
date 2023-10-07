import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const getFirebaseConfig = (mode = import.meta.env.MODE) => {
  const development = {
    apiKey: "AIzaSyDKleoyUb6Njb-ioS_LaPkFoHPsrSUOVsM",
    authDomain: "react-dev-0525.firebaseapp.com",
    projectId: "react-dev-0525",
    storageBucket: "react-dev-0525.appspot.com",
    messagingSenderId: "842371412734",
    appId: "1:842371412734:web:2f0c04f5cdfb04cb66ebaf",
  };
  const production = {
    apiKey: "AIzaSyDL90tiE7fuVFosLeE9HZsBE8lAsRA-ORc",
    authDomain: "react-prod-0525.firebaseapp.com",
    projectId: "react-prod-0525",
    storageBucket: "react-prod-0525.appspot.com",
    messagingSenderId: "275021267665",
    appId: "1:275021267665:web:d8efd740acd6e9e84c7bf0",
  };

  if (mode === "production") {
    return production;
  }

  return development;
};

// Your web app's Firebase configuration
const firebaseConfig = getFirebaseConfig();
console.log("🚀 ~ firebaseConfig:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("***", import.meta.env);
export const db = getFirestore(app);
