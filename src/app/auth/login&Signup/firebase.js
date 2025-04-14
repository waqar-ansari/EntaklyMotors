"use client";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA3ccJtR44kCxVnLg7PywHuTLWXdRkgRrU",
    authDomain: "entaklydemo.firebaseapp.com",
    projectId: "entaklydemo",
    storageBucket: "entaklydemo.firebasestorage.app",
    messagingSenderId: "841163143068",
    appId: "1:841163143068:web:4a19e4f9415c7bb0723a59",
    measurementId: "G-QMGYLB0GJT"
};
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
  const auth = getAuth(app);
// const app = initializeApp(firebaseConfig);
// export { app };
export { app, auth };
