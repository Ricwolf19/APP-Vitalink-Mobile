// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP) //Para usar el fireStore

