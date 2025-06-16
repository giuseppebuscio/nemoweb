// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBIy-TacuSXiLlsLQs1EIKC1wwCVhWrfA",
  authDomain: "magicsubs-65f88.firebaseapp.com",
  projectId: "magicsubs-65f88",
  storageBucket: "magicsubs-65f88.firebasestorage.app",
  messagingSenderId: "837759405059",
  appId: "1:837759405059:web:3792a7d1878f5ad60c9236",
  measurementId: "G-ESVMPDXG7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);