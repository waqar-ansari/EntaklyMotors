// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3ccJtR44kCxVnLg7PywHuTLWXdRkgRrU",
    authDomain: "entaklydemo.firebaseapp.com",
    projectId: "entaklydemo",
    storageBucket: "entaklydemo.firebasestorage.app",
    messagingSenderId: "841163143068",
    appId: "1:841163143068:web:4a19e4f9415c7bb0723a59",
    measurementId: "G-QMGYLB0GJT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    auth.settings.appVerificationDisabledForTesting = true;
  }
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
