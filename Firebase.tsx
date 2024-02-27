// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const Fauth = getAuth(app)
export const Fdb = getFirestore(app) //Para usar el fireStore