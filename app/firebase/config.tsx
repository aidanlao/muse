// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADOH1NdxFUIcK-Da6MgGNZRu7eDgf_ZCQ",
  authDomain: "music-analysis-site.firebaseapp.com",
  projectId: "music-analysis-site",
  storageBucket: "music-analysis-site.appspot.com",
  messagingSenderId: "961344676967",
  appId: "1:961344676967:web:0882dcbbaa8fdb8dd0e0c2",
  measurementId: "G-0948LYQJS5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);