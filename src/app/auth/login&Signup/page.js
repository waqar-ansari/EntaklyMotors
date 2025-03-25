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

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("ae");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLoginWith = (usePhone) => {
    setIsPhoneLogin(usePhone);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      console.log(credentials, "credentials");

      const result = await dispatch(loginUser(credentials)).unwrap();
      console.log(result, "result from login");
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

  const handleRegister = async (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    const credentials = { email: registerEmail, password: registerPassword };
    try {
      const result = await dispatch(signupUser(credentials)).unwrap();
      console.log(result, "result from register");
      if (result.status === "error") {
        console.log(result.message);
        setError(result.message);
        return;
      }
      if (result.status === "success") {
        console.log(result.message);
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
            // <div className="form-box login">
            //   <form action="#">
            //     <h1 className="mb-4">{t("login")}</h1>
            //    <div className="d-flex">
            //       <Link
            //         type="button"
            //         href="/account/profile"
            //         className="btn text-decoration-none me-2 d-flex"
            //         onClick={handleLoginWith}
            //       >
            //         Login with Number
            //       </Link>
            //       <Link
            //         type="button"
            //         href="/account/profile"
            //         className="btn text-decoration-none d-flex"
            //         onClick={handleLoginWith}
            //       >
            //         Login with Email
            //       </Link>
            //    </div>

            //     <div className="input-box">
            //       <input
            //         type="text"
            //         placeholder={t("email/mobile")}
            //         onChange={(e) => {
            //           setEmail(e.target.value);
            //         }}
            //       />
            //       <i className="bx bxs-user"></i>
            //     </div>

            //     <div className="d-flex align-items-center">
            //             <PhoneInput
            //               country={"ae"}
            //               value={"hjgh"}
            //               inputStyle={{ display: "none" }}
            //               onChange={handleCountryChange}
            //               name="countryCode"
            //               enableSearch
            //               searchPlaceholder="Search..."
            //               searchStyle={{ width: 280, marginLeft: 0 }}
            //             />
            //             <div style={{ margin: "0px 10px" }}>
            //               {"+888"}
            //             </div>

            //             <div className="input-box form-floating w-100 my-0">
            //               <input
            //                 className="form-control"
            //                 type="text"
            //                 placeholder={t("phone_number")}
            //                 name="number"
            //                 id="phonenumber"
            //                 value={"hgfhgjk"}
            //                 onChange={()=>{}}
            //               />
            //               <label htmlFor="phonenumber" className="inputLabelBg">
            //                 {t("phone_number")}
            //               </label>
            //             </div>
            //           </div>

            //     <div className="input-box">
            //       <input
            //         type="password"
            //         placeholder={t("password")}
            //         onChange={(e) => {
            //           setPassword(e.target.value);
            //         }}
            //       />
            //       <i className="bx bxs-lock-alt"></i>
            //     </div>
            //     <p className="text-danger">{error}</p>
            //     <div className="forgot-link">
            //       <button
            //         type="button"
            //         className="forgot-btn text-decoration-none"
            //         onClick={() => setIsForgotPassword(true)}
            //         style={{ color: colors.themeMain }}
            //       >
            //         {t("forgot_password")}
            //       </button>
            //     </div>

            //     <Link
            //       type="button"
            //       href="/account/profile"
            //       className="btn text-decoration-none d-flex"
            //       onClick={handleLogin}
            //     >
            //       {t("login")}
            //     </Link>
            //   </form>
            // </div>
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
                        setCountryCode(country.countryCode);
                      }}
                      enableSearch
                      searchPlaceholder="Search..."
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
              <h1>{t("registration")}</h1>
              {/* <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <i className="bx bxs-user"></i>
                  </div> */}
              <div className="input-box">
                <input
                  type="email"
                  placeholder={t("email/mobile")}
                  name="signupEmail"
                  required
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                  }}
                />
                <i className="bx bxs-envelope"></i>
              </div>
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
                className="btn text-decoration-none"
                onClick={handleRegister}
              >
                {t("register")}
              </Link>
            </form>
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
