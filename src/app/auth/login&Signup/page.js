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
import { app } from "./firebase";

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
  // const [isForgotPassword, setIsForgotPassword] = useState(false);

  const auth = getAuth(app);
  const handleLoginWith = (usePhone) => {
    setIsPhoneLogin(usePhone);
  };
  const handleRegisterWith = (usePhone) => {
    setError("");
    setIsPhoneRegister(usePhone);
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
          console.log(result, "result");

          const phoneNumberConfirmed = result.user.phoneNumber;
          console.log(phoneNumberConfirmed, "phoneNumberConfirmed");

          const credentials = {
            phone_number: {
              countryCode,
              number: phoneNumber,
            },
          };

          const response = await dispatch(loginUser(credentials)).unwrap();

          if (response.status === "error") {
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
        console.error("OTP send error:", err);
        setOtpError(err.message || "Failed to send OTP");

        if (err.code === "auth/invalid-app-credential") {
          setOtpError("Invalid app configuration. Please contact support.");
        } else if (err.code === "auth/too-many-requests") {
          setOtpError("Too many attempts. Please try again later.");
        }
      }
    } else {
      const credentials = { email, password };
      try {
        const result = await dispatch(loginUser(credentials)).unwrap();

        if (result.status === "error") {
          setError("Invalid email or password");
          return;
        }

        router.push("/account/profile");
      } catch (error) {
        console.log("Login failed:", error);
        setError("Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   if (isPhoneRegister) {
  //     const fullPhone = registerCountryCode + registerPhoneNumber;
  //     console.log("Attempting to verify:", fullPhone);

  //     try {
  //       console.log("Setting up reCAPTCHA...");
  //       console.log(
  //         auth,
  //         fullPhone,
  //         window.recaptchaVerifier,
  //         "auth, fullPhone, window.recaptchaVerifier"
  //       );
  //       await window.recaptchaVerifier.render();
  //       console.log("reCAPTCHA rendered successfully");
  //       console.log("Attempting to send OTP...");
  //       const confirmation = await signInWithPhoneNumber(
  //         auth,
  //         fullPhone,
  //         window.recaptchaVerifier
  //       );
  //       console.log(confirmation.verificationId);

  //       setConfirmationResult(confirmation);
  //       setOtpSent(true);
  //       alert(t("otp_sent_to_your_phone"));
  //     } catch (err) {
  //       console.error("Authentication error:", err);
  //       setError(err.message || "OTP verification failed");

  //       if (err.code === "auth/invalid-app-credential") {
  //         setError("Invalid app configuration. Please contact support.");
  //       } else if (err.code === "auth/too-many-requests") {
  //         setError("Too many attempts. Please try again later.");
  //       }
  //     }
  //   } else {
  //   }
  // };

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
        setRegisterEmail("")
        setRegisterPassword("")
        router.push("/auth/login&Signup");
      }
    } catch (error) {
      console.log("Signup failed:", error);
      setIsLoading(false);
    }
  };
  const { t, language } = useTranslation();
  console.log(otpSent, "otpSent");

  return (
    <div>
      <Header />

      <div className="d-flex justify-content-center align-items-center">
        <div className={`loginContainer ${isActive ? "active" : ""}`}>
          {/* Login Form */}
          {!isForgotPassword ? (
            <div className="form-box login">
              <form action="#">
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
                              type="text"
                              placeholder={t("otp")}
                              value={otp}
                              name="otp"
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
                ) : (
                  ""
                )}
                <button
                  type="button"
                  href="/account/profile"
                  className="btn text-decoration-none d-flex"
                  onClick={handleLogin}
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
            <div className="form-box form-floating forgot-password">
              <form action="#">
                <h1> {t("forgot_password")}</h1>
                <div className="input-box">
                  <input
                    type="email"
                    name="forgot_password"
                    className="form-control"
                    placeholder={t("enter_your_email")}
                    required
                  />
                  <label htmlFor="forgot_password" className="inputLabelBg">
                    {t("forgot_password")}
                  </label>
                  {/* <i className="bx bxs-envelope"></i> */}
                </div>
                <button type="submit" className="btn">
                  {t("submit")}
                </button>
                <p>
                  {t("remembered_your_password")}{" "}
                  <button
                    type="button"
                    className="forgot-btn text-decoration-none"
                    onClick={() => setIsForgotPassword(false)}
                    style={{ color: colors.themeMain }}
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
              <Link
                type="button"
                href="/auth/login&Signup"
                className="btn text-decoration-none d-flex"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading?
              <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            </>
            : t("register")

              }
               
              </Link>
            </form>
            <div id="recaptcha-container"></div>
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
