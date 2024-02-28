// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_FIREBASE_APP_ID,
//   measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA_jmBWhuWMCcqq_1Lf0LF1R3AviWgSm_I",
  authDomain: "vitalinkhub.firebaseapp.com",
  databaseURL: "https://vitalinkhub-default-rtdb.firebaseio.com",
  projectId: "vitalinkhub",
  storageBucket: "vitalinkhub.appspot.com",
  messagingSenderId: "632585986679",
  appId: "1:632585986679:web:f736896eaf39755a969c72",
  measurementId: "G-0T1VS44H7X"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP) //Para usar el fireStore