// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-4d100.firebaseapp.com",
  projectId: "real-estate-4d100",
  storageBucket: "real-estate-4d100.appspot.com",
  messagingSenderId: "20116248525",
  appId: "1:20116248525:web:e43c50233222b45ced1684"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);