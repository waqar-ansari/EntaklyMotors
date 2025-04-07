// phoneAuth.js
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";

export const setUpRecaptcha = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          console.log("Recaptcha expired");
        },
      }
      
    );

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        resolve(confirmationResult); // Use this later to confirm OTP
      })
      .catch(reject);
  });
};
