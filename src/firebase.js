import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCccVL-jgWXgyD2WswbpKVAlqT5OB2uEVU",
  authDomain: "mehenat-fad0c.firebaseapp.com",
  projectId: "mehenat-fad0c",
  storageBucket: "mehenat-fad0c.firebasestorage.app",
  messagingSenderId: "63738049368",
  appId: "1:63738049368:web:5e3a3cbcc07ff39ec4eb2d",
  measurementId: "G-8SBNCT7N1L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);