import Link from "next/link";
// import "../../../../styles/globals.css"
export default function ForgotPasswordPage() {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Reset Password</h2>
        <input type="email" placeholder="Enter your email" className="auth-input" />
        
        <button className="auth-button">Reset Password</button>

        <p>
          Remembered your password?{" "}
          <Link href="/auth/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
