"use client";
import { useState } from "react";
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
import { setUpRecaptcha } from "./phoneAuth";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerCountryCode, setRegisterCountryCode] = useState("ae");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("ae");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [isPhoneRegister, setIsPhoneRegister] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLoginWith = (usePhone) => {
    setIsPhoneLogin(usePhone);
  };
  const handleRegisterWith = (usePhone) => {
    setError("");
    setIsPhoneRegister(usePhone);
  };
  console.log(registerCountryCode, "register country code");

  const dispatch = useDispatch();
  const router = useRouter();
  console.log(countryCode, "country code");
  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = isPhoneLogin
      ? {
          phone_number: {
            countryCode: countryCode,
            number: phoneNumber,
          },
          password: password,
        }
      : {
          email: email,
          password: password,
        };

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();

      if (result.status === "error") {
        console.log(result.status, "Invalid email or password");
        setError("Invalid email or password");
        return;
      }
      router.push("/account/profile");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");
  
  //   if (isPhoneRegister) {
  //     const fullPhone = registerCountryCode + registerPhoneNumber;
  //     try {
  //       const confirmationResult = await setUpRecaptcha(fullPhone);
  //       const otp = prompt("Enter the OTP sent to your phone");
  
  //       if (!otp) {
  //         setError("OTP is required");
  //         return;
  //       }
  
  //       const result = await confirmationResult.confirm(otp);
  //       const phoneNumber = result.user.phoneNumber;
  
  //       // Now call your API to register the user
  //       const registerPayload = {
  //         phone_number: {
  //           countryCode: registerCountryCode,
  //           number: registerPhoneNumber,
  //         },
  //         password: registerPassword,
  //       };
  
  //       const response = await dispatch(signupUser(registerPayload)).unwrap();
  
  //       if (response.status === "success") {
  //         setSuccess(response.message);
  //         router.push("/auth/login&Signup");
  //       } else {
  //         setError(response.message);
  //       }
  //     } catch (err) {
  //       console.error("OTP verification failed", err);
  //       setError("OTP verification failed");
  //     }
  //   } else {
  //     // Regular email register flow
  //     const credentials = {
  //       email: registerEmail,
  //       password: registerPassword,
  //     };
  
  //     try {
  //       const result = await dispatch(signupUser(credentials)).unwrap();
  
  //       if (result.status === "success") {
  //         setSuccess(result.message);
  //         router.push("/auth/login&Signup");
  //       } else {
  //         setError(result.message);
  //       }
  //     } catch (err) {
  //       setError("Signup failed");
  //     }
  //   }
  // };
  

  const handleRegister = async (e) => {
    setError("");
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
    console.log(credentials, "register credentials");

    try {
      const result = await dispatch(signupUser(credentials)).unwrap();

      if (result.status === "error") {
        setError(result.message);
        return;
      }
      if (result.status === "success") {
        setSuccess(result.message);
        router.push("/auth/login&Signup");
      }
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };
  const { t, language } = useTranslation();
  return (
    <div>
      <Header />

      <div className="d-flex justify-content-center align-items-center">
        <div className={`loginContainer ${isActive ? "active" : ""}`}>
          {/* Login Form */}
          {!isForgotPassword ? (
            <div className="form-box login">
              <form action="#">
                <h1 className="mb-4">Login with</h1>

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
                    Email
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
                    Phone
                  </button>
                </div>

                {!isPhoneLogin ? (
                  <div className="input-box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="bx bxs-user"></i>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <PhoneInput
                      country={countryCode}
                      // value={phone}
                      onChange={(value, country) => {
                        // setPhone(value);
                        setCountryCode("+" + country.dialCode);
                      }}
                      enableSearch
                      searchPlaceholder="Search..."
                      localization={
                        language === "ar"
                          ? ar
                          : language === "ru"
                          ? ru
                          : undefined
                      }
                      searchStyle={{ width: 280, marginLeft: 0 }}
                    />
                    <div className="input-box my-0">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <i className="bx bxs-lock-alt"></i>
                    </div>
                  </div>
                )}

                {/* Password Input */}
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>

                {/* <button type="submit" className="btn d-flex">
                  Login
                </button> */}

                <Link
                  type="button"
                  href="/account/profile"
                  className="btn text-decoration-none d-flex"
                  onClick={handleLogin}
                >
                  {t("login")}
                </Link>
              </form>
            </div>
          ) : (
            /* Forgot Password Form */
            <div className="form-box forgot-password">
              <form action="#">
                <h1> {t("forgot_password")}</h1>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder={t("enter_your_email")}
                    required
                  />
                  <i className="bx bxs-envelope"></i>
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
              <h1 className="mb-4">Register with</h1>

              <div className="d-flex mb-4">
                <button
                  type="button"
                  className="customLoginFormBtn me-2"
                  style={{
                    backgroundColor: !isPhoneRegister ? "#292268" : "#fff",
                    color: !isPhoneRegister ? "#fff" : "#000",
                    border: "2px solid #292268",
                  }}
                  onClick={() => handleRegisterWith(false)}
                >
                  Email
                </button>
                <button
                  type="button"
                  className="customLoginFormBtn"
                  style={{
                    backgroundColor: isPhoneRegister ? "#292268" : "#fff",
                    color: isPhoneRegister ? "#fff" : "#000",
                    border: "2px solid #292268",
                  }}
                  onClick={() => handleRegisterWith(true)}
                >
                  Phone
                </button>
              </div>

              {!isPhoneRegister ? (
                <div className="input-box">
                  <input
                    type="email"
                    placeholder={t("email")}
                    name="signupEmail"
                    required
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                    }}
                  />
                  <i className="bx bxs-envelope"></i>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <PhoneInput
                    country={registerCountryCode}
                    // value={phone}
                    onChange={(value, country) => {
                      // setPhone(value);
                      setRegisterCountryCode("+" + country.dialCode);
                    }}
                    enableSearch
                    searchPlaceholder="Search..."
                    localization={
                      language === "ar"
                        ? ar
                        : language === "ru"
                        ? ru
                        : undefined
                    }
                    searchStyle={{ width: 280, marginLeft: 0 }}
                  />
                  <div className="input-box my-0">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={registerPhoneNumber}
                      onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                    />
                    <i className="bx bxs-lock-alt"></i>
                  </div>
                </div>
              )}
              <div className="input-box">
                <input
                  type="password"
                  placeholder={t("password")}
                  name="signupPassword"
                  required
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <p className="text-danger">{error}</p>
              <p className="text-success">{success}</p>
              <Link
                type="button"
                href="/auth/login&Signup"
                className="btn text-decoration-none d-flex"
                onClick={handleRegister}
              >
                {t("register")}
              </Link>
            </form>
            <div id="recaptcha-container"></div>
          </div>

          {/* Toggle Box */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>{t("hello_welcome")}</h1>
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