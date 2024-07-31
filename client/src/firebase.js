// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv'
dotenv.config();
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
// console.log(apiKey);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "quickpoll-bf11c.firebaseapp.com",
  projectId: "quickpoll-bf11c",
  storageBucket: "quickpoll-bf11c.appspot.com",
  messagingSenderId: "364934576249",
  appId: "1:364934576249:web:3d77f7a4d8a6b90d72bca8",
  measurementId: "G-8RFYBBQ11T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
