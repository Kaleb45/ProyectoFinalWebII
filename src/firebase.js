// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIUoRISsKoKxtd9IK374GZqZygx643i6Q",
  authDomain: "proyectofinalwebii.firebaseapp.com",
  projectId: "proyectofinalwebii",
  storageBucket: "proyectofinalwebii.appspot.com",
  messagingSenderId: "487373541281",
  appId: "1:487373541281:web:b750de809db1078cd105e0",
  measurementId: "G-QEZCTF19X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };