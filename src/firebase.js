import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const getFirebaseConfig = () => {
  const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };

  return config;
};

// Your web app's Firebase configuration
const firebaseConfig = getFirebaseConfig();
console.log("🚀 ~ firebaseConfig:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("***", import.meta.env);
export const db = getFirestore(app);
