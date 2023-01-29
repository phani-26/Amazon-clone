// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgXG0zJZcuUFZwNnbP5Selenwn3y0T7Lk",
  authDomain: "clone-5be04.firebaseapp.com",
  projectId: "clone-5be04",
  storageBucket: "clone-5be04.appspot.com",
  messagingSenderId: "763115650172",
  appId: "1:763115650172:web:e3cdb397f439a173901df9",
  measurementId: "G-QGYM63MR6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
};
export const auth = getAuth(app);
export const firestore = getFirestore(app);
