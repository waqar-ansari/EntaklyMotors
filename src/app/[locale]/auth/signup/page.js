import Link from "next/link";
import "../../../../styles/globals.css"

export default function SignupPage() {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <input type="text" placeholder="Full Name" className="auth-input" />
        <input type="email" placeholder="Email Address" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />

        <button className="auth-button">Sign Up</button>

        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
