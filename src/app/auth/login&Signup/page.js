"use client";
import { useEffect, useState } from "react";
import "./login.css";
import { colors } from "../../../../public/colors/colors";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/context/LanguageProvider";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ar from "react-phone-input-2/lang/ar.json";
import ru from "react-phone-input-2/lang/ru.json";
// import { setUpRecaptcha } from "./phoneAuth";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth  } from "./firebase";
import api from "@/app/api/axiosInstance";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerCountryCode, setRegisterCountryCode] = useState("ae");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [isPhoneRegister, setIsPhoneRegister] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [counter, setCounter] = useState(20);

  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState("");
  const [forgotPasswordNewPassword, setForgotPasswordNewPassword] =
    useState("");
  // const [isForgotPassword, setIsForgotPassword] = useState(false);
  useEffect(() => {
    if (counter === 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [counter]);


  // const auth = getAuth(app);
  const handleLoginWith = (usePhone) => {
    setIsPhoneLogin(usePhone);
    setOtp("");
    setOtpSent(false);
    setOtpError("");
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    setSuccess("");
    setIsLoading(true);

    if (isPhoneLogin) {
      const fullPhone = countryCode + phoneNumber;

      if (otpSent && otp) {
        try {
          const result = await confirmationResult.confirm(otp);

          const phoneNumberConfirmed = result.user.phoneNumber;

          const credentials = {
            phone_number: {
              countryCode,
              number: phoneNumber,
            },
          };

          const response = await dispatch(loginUser(credentials)).unwrap();

          if (response.status === "error") {
            setIsLoading(false);
            setOtpError("OTP verification failed or user not found");
          } else {
            setIsLoading(false);
            router.push("/account/profile");
          }
        } catch (err) {
          console.error("OTP confirmation error:", err);
          setIsLoading(false);
          setOtpError("Invalid OTP");
        }
        setIsLoading(false);
        return;
      }

      try {
        await window.recaptchaVerifier.render();
        const confirmation = await signInWithPhoneNumber(
          auth,
          fullPhone,
          window.recaptchaVerifier
        );

        setConfirmationResult(confirmation);
        setOtpSent(true);
        setIsLoading(false);
        alert(t("otp_sent_to_your_phone"));
      } catch (err) {
        let message = "Failed to send OTP. Please try again.";

        switch (err.code) {
          case "auth/invalid-app-credential":
            message =
              "Verification failed. Please complete the security check (reCAPTCHA) and try again";
            break;
          case "auth/too-many-requests":
            message = "Too many attempts. Please try again later.";
            break;
          case "auth/invalid-phone-number":
            message = "The phone number entered is invalid.";
            break;
          case "auth/code-expired":
            message = "The OTP has expired. Please request a new one.";
            break;
          case "auth/missing-phone-number":
            message = "Please enter your phone number.";
            break;
          case "auth/quota-exceeded":
            message = "SMS quota exceeded. Please try again later.";
            break;
          case "auth/user-disabled":
            message = "This user account has been disabled.";
            break;
          default:
            console.warn("Error sending OTP:");
        }
        setOtpError(message);
        setIsLoading(false);
      }
    } else {
      const credentials = { email, password };
      try {
        const result = await dispatch(loginUser(credentials)).unwrap();

        if (result.status === "error") {
          setIsLoading(false);
          setError("Invalid email or password");
          return;
        }
        router.push("/account/profile");
      } catch (error) {
        console.log("Login failed:", error);
        setIsLoading(false);
        setError("Login failed. Please try again.");
      }
    }
  };
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {

        },
        "expired-callback": () => {
          // Token expired, maybe notify user or reinit
        },
      }
    );
  

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);
  
  // }, [auth]);
  const handleRegister = async (e) => {
    setIsLoading(true);
    setError("");
    setOtpError("");
    setSuccess("");
    e.preventDefault();
    const credentials = isPhoneRegister
      ? {
          phone_number: {
            countryCode: registerCountryCode,
            number: registerPhoneNumber,
          },
          password: registerPassword,
        }
      : {
          email: registerEmail,
          password: registerPassword,
        };

    try {
      const result = await dispatch(signupUser(credentials)).unwrap();

      if (result.status === "error") {
        setIsLoading(false);
        setError(result.message);
        return;
      }
      if (result.status === "success") {
        setSuccess(result.message);
        setIsLoading(false);
        setRegisterEmail("");
        setRegisterPassword("");
        router.push("/auth/login&Signup");
      }
    } catch (error) {
      console.log("Signup failed:", error);
      setIsLoading(false);
    }
  };
  const { t, language } = useTranslation();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setOtpError("")
    setIsLoading(true)
    try {
      if (step === 1) {
        const res = await api.post("/forgot_password.php", {
          email: forgotPasswordEmail,
        });
        console.log(res.data, "res from forgot password");

        if (res.data.status === "success") {
          setStep(2);
          setIsLoading(false)
        } else {
          setOtpError(res.data.message);
          setIsLoading(false)
        }
      } else if (step === 2) {
        const res = await api.post("/verify_otp.php", {
          email: forgotPasswordEmail,
          otp: forgotPasswordOtp,
        });
        if (res.data.status === "success") {
          setStep(3);
          setIsLoading(false)
          setOtpSent(false)
        } else {
          setOtpError("Invalid OTP.");
          setIsLoading(false)
        }
      } else if (step === 3) {
        const res = await api.post("/reset_password.php", {
          email: forgotPasswordEmail,
          password: forgotPasswordNewPassword,
        });
        if (res.data.status === "success") {
          alert("Password changed successfully!");
          setIsLoading(false)
          setIsForgotPassword(false);
          setStep(1);
        } else {
          alert("Failed to change password.");
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      alert("Something went wrong. Please try again.");
    }
  };
  console.log(step,"step");
  
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div className={`loginContainer ${isActive ? "active" : ""}`}>
          {/* Login Form */}
          {!isForgotPassword ? (
            <div className="form-box login">
              <form onSubmit={handleLogin}>
                <h1 className="mb-4">{t("login_with")}</h1>

                <div className="d-flex mb-4">
                  <button
                    type="button"
                    className="customLoginFormBtn me-2"
                    style={{
                      backgroundColor: !isPhoneLogin ? "#292268" : "#fff",
                      color: !isPhoneLogin ? "#fff" : "#000",
                      border: "2px solid #292268",
                    }}
                    onClick={() => handleLoginWith(false)}
                  >
                    {t("email")}
                  </button>
                  <button
                    type="button"
                    className="customLoginFormBtn"
                    style={{
                      backgroundColor: isPhoneLogin ? "#292268" : "#fff",
                      color: isPhoneLogin ? "#fff" : "#000",
                      border: "2px solid #292268",
                    }}
                    onClick={() => handleLoginWith(true)}
                  >
                    {t("phone")}
                  </button>
                </div>

                {!isPhoneLogin ? (
                  <div className="input-box form-floating">
                    <input
                      className="form-control"
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                      }}
                      type="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("email_address")}
                      id="email"
                    />
                    <label htmlFor="email" className="inputLabelBg">
                      {t("email_address")}
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-3">
                      {!otpSent ? (
                        <>
                          <PhoneInput
                            country={"ae"}
                            onChange={(value, country) => {
                              setCountryCode("+" + country.dialCode);
                            }}
                            enableSearch
                            searchPlaceholder={t("search...")}
                            localization={
                              language === "ar"
                                ? ar
                                : language === "ru"
                                ? ru
                                : undefined
                            }
                            searchStyle={{ width: 280, marginLeft: 0 }}
                          />

                          <div className="input-box my-0 w-100">
                            <input
                              type="number"
                              style={{
                                textAlign: language === "ar" ? "right" : "left",
                              }}
                              placeholder={t("phone_number")}
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="input-box form-floating w-100 my-0"
                            style={{ zIndex: 0 }}
                          >
                            <input
                              type="tel"
                              style={{
                                textAlign: language === "ar" ? "right" : "left",
                              }}
                              placeholder={t("otp")}
                              value={otp}
                              name="otp"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              autoComplete="one-time-code"
                              onChange={(e) => setOtp(e.target.value)}
                              className="form-control w-100"
                            />
                            <label htmlFor="otp" className="inputLabelBg">
                              {t("otp")}
                            </label>
                            <i className="bx bxs-lock-alt"></i>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-danger mt-0">{otpError}</p>
                  </>
                )}

                {/* Password Input */}
                {!isPhoneLogin ? (
                  <>
                    <div
                      className="input-box form-floating"
                      style={{ zIndex: 0 }}
                    >
                      <input
                        type="password"
                        placeholder={t("password")}
                        value={password}
                        name="loginPassword"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                      <label htmlFor="loginPassword" className="inputLabelBg">
                        {t("password")}
                      </label>
                      <i className="bx bxs-lock-alt"></i>
                    </div>
                    <p className="text-danger">{error}</p>
                    {!isForgotPassword && (
                      <div
                        style={{ textAlign: "right" }}
                        className="mb-3"
                        onClick={() => {
                          setIsForgotPassword(true);
                          step(1)
                        }}
                      >
                        <button className="bg-white">
                          {t("forgot_password?")}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  // href="/account/profile"
                  className="btn text-decoration-none d-flex"
                  // onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </>
                  ) : isPhoneLogin ? (
                    otpSent ? (
                      t("verify_otp")
                    ) : (
                      t("send_otp")
                    )
                  ) : (
                    t("login")
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Forgot Password Form */
            <div className="form-box forgot-password">
              <form onSubmit={handleForgotPassword}>
                <h1>{t("forgot_password")}</h1>

                {step === 1 && (
                  <div className="input-box form-floating">
                    <input
                      type="email"
                      name="forgot_password"
                      className="form-control"
                      placeholder={t("enter_your_email")}
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                    <label className="inputLabelBg">
                      {t("enter_your_email")}
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div className="input-box form-floating">
                    <input
                      type="text"
                      name="otp"
                      className="form-control"
                      placeholder={t("enter_otp")}
                      value={forgotPasswordOtp}
                      onChange={(e) => setForgotPasswordOtp(e.target.value)}
                      required
                    />
                    <label className="inputLabelBg">{t("enter_otp")}</label>
                  </div>
                )}

                {step === 3 && (
                  <div className="input-box form-floating">
                    <input
                      type="password"
                      name="new_password"
                      className="form-control"
                      placeholder={t("enter_new_password")}
                      value={forgotPasswordNewPassword}
                      onChange={(e) =>
                        setForgotPasswordNewPassword(e.target.value)
                      }
                      required
                    />
                    <label className="inputLabelBg">
                      {t("enter_new_password")}
                    </label>
                  </div>
                )}
                <p className="text-danger">{otpError}</p>
                <button type="submit" className="btn">
                 {isLoading?
                  <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                :
                 t("submit")}
                </button>

                <p>
                  {t("remembered_your_password")}{" "}
                  <button
                    type="button"
                    className="forgot-btn text-decoration-none"
                    onClick={() => {
                      setStep(1)
                      setIsForgotPassword(false)}}
                    // style={{ color: "#ca2030" }}
                  >
                    {t("go_back_to_login")}
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* Register Form */}
          <div className="form-box register">
            <form action="#">
              <h1 className="mb-4">{t("register_with_email")}</h1>
              {!isPhoneRegister ? (
                <div className="input-box form-floating">
                  <input
                    type="email"
                    placeholder={t("email")}
                    name="signupEmail"
                    className="form-control"
                    required
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="signupEmail" className="inputLabelBg">
                    {t("email_address")}
                  </label>
                </div>
              ) : (
                ""
              )}
              <div className="input-box form-floating" style={{ zIndex: 0 }}>
                <input
                  type="password"
                  placeholder={t("password")}
                  className="form-control"
                  name="signupPassword"
                  required
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />
                <label htmlFor="signupPassword" className="inputLabelBg">
                  {t("password")}
                </label>
                {/* <i className="bx bxs-lock-alt"></i> */}
              </div>
              <p className="text-danger">{error}</p>
              <p className="text-success">{success}</p>
              <div id="recaptcha-container"></div>

              <Link
                type="button"
                href="/auth/login&Signup"
                className="btn text-decoration-none d-flex"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </>
                ) : (
                  t("register")
                )}
              </Link>
            </form>
          </div>

          {/* Toggle Box */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1 className="text-center">{t("hello_welcome")}</h1>
              <p>{t("dont_have_account")}</p>
              <button
                className="btn register-btn"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setIsActive(true);
                }}
              >
                {t("register")}
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>{t("welcome_back")}</h1>
              <p>{t("already_have_account")}</p>
              <button
                className="btn login-btn"
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setIsActive(false);
                }}
              >
                {t("login")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
