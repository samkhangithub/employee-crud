// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 👉 Replace these values with your own Firebase config
const firebaseConfig = {
   apiKey: "AIzaSyAdUlpAciTMXq50qzQcEcZB0glnFLRVgt4",
  authDomain: "employee-crud-5af78.firebaseapp.com",
  databaseURL: "https://employee-crud-5af78-default-rtdb.firebaseio.com",
  projectId: "employee-crud-5af78",
  storageBucket: "employee-crud-5af78.firebasestorage.app",
  messagingSenderId: "360029071595",
  appId: "1:360029071595:web:2f1cd2e365c166953776ae",
  measurementId: "G-ZQ7FJ6CKYL"

};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);
