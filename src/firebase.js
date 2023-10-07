import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const getFirebaseConfig = () => {
  const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG )

  return config;
};

// Your web app's Firebase configuration
const firebaseConfig = getFirebaseConfig();
console.log("🚀 ~ firebaseConfig:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("***", import.meta.env);
export const db = getFirestore(app);
