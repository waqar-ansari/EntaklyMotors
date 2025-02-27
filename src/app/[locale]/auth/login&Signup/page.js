"use client";
import { useState } from "react";
import "./login.css";
import { colors } from "../../../../../public/colors/colors";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      router.push("/account/profile");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const signupCredentials = { registerEmail, registerPassword };
    console.log(signupCredentials, "signupCredentials");

    try {
      const result = await dispatch(signupUser(signupCredentials)).unwrap();
      router.push("/auth/login&Signup");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div className={`loginContainer ${isActive ? "active" : ""}`}>
          {/* Login Form */}
          {!isForgotPassword ? (
            <div className="form-box login">
              <form action="#">
                <h1>Login</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="forgot-link">
                  <button
                    type="button"
                    className="forgot-btn text-decoration-none"
                    onClick={() => setIsForgotPassword(true)}
                    style={{ color: colors.themeMain }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <Link
                  type="button"
                  href="/account/profile"
                  className="btn text-decoration-none"
                  onClick={handleLogin}
                >
                  Login
                </Link>
              </form>
            </div>
          ) : (
            /* Forgot Password Form */
            <div className="form-box forgot-password">
              <form action="#">
                <h1>Forgot Password</h1>
                <div className="input-box">
                  <input type="email" placeholder="Enter your email" required />
                  <i className="bx bxs-envelope"></i>
                </div>
                <button type="submit" className="btn">
                  Submit
                </button>
                <p>
                  Remembered your password?{" "}
                  <button
                    type="button"
                    className="forgot-btn text-decoration-none"
                    onClick={() => setIsForgotPassword(false)}
                    style={{ color: colors.themeMain }}
                  >
                    Go back to Login
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* Register Form */}
          <div className="form-box register">
            <form action="#">
              <h1>Registration</h1>
              {/* <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <i className="bx bxs-user"></i>
                  </div> */}
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
                  name="signupPassword"
                  required
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <Link
                type="button"
                href="/auth/login&Signup"
                className="btn text-decoration-none"
                onClick={handleRegister}
              >
                Register
              </Link>
            </form>
          </div>

          {/* Toggle Box */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="btn register-btn"
                onClick={() => setIsActive(true)}
              >
                Register
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setIsActive(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
