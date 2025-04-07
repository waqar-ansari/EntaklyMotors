

import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";


export const setUpRecaptcha = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved automatically
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        }
      );
    }

    window.recaptchaVerifier.verify() // ← This is important
      .then(() => {
        return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      })
      .then((confirmationResult) => {
        // Clear reCAPTCHA instance after it's used
        window.recaptchaVerifier.clear();
        resolve(confirmationResult);
      })
      .catch((error) => {
        reject(error);
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }
      });
  });
};

// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
// export const setUpRecaptcha = (phoneNumber) => {
//   // Ensure window exists (client-side only)
//   if (typeof window === "undefined") {
//     throw new Error("RecaptchaVerifier is only available on the client side");
//   }

//   return new Promise((resolve, reject) => {
//     try {
//       // Clear existing recaptcha if any
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//       }

//       // Initialize new recaptcha verifier
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             // This will be called automatically when reCAPTCHA is solved
//           },
//           'expired-callback': () => {
//             reject(new Error('Recaptcha expired'));
//           }
//         },
//         auth
//       );

//       // Render and verify
//       window.recaptchaVerifier.render()
//         .then(() => {
//           return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
//         })
//         .then((confirmationResult) => {
//           resolve(confirmationResult);
//         })
//         .catch((error) => {
//           if (window.recaptchaVerifier) {
//             window.recaptchaVerifier.clear();
//           }
//           reject(error);
//         });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };