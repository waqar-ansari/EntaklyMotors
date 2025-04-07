// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSjJQ95SS_VM-nfgks4r1pD-VP7wk3he0",
    authDomain: "entaklymotors.firebaseapp.com",
    projectId: "entaklymotors",
    storageBucket: "entaklymotors.firebasestorage.app",
    messagingSenderId: "1079331231301",
    appId: "1:1079331231301:web:6f093459f697a1aca3352c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
//     auth.settings.appVerificationDisabledForTesting = true;
//   }
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
