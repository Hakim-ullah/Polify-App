import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import { loginStyles as s } from "../assets/dummyStyles.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const flash = location.state;
  const notice = flash?.reset
    ? "Password updated! Sign in with your new password."
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      setBusy(false);
      return;
    }
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        navigate("/register", { state: { verifyEmail: email } });
        return;
      }
      setError(
        err.response?.data?.message ||
          "Cannot reach the server. Please check your connection and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email and password to access your account."
    >
      {notice && (
        <div className={s.notice}>
          <CheckCircle className={s.noticeIcon} size={15} />
          <span className={s.noticeText}>{notice}</span>
        </div>
      )}

      {error && (
        <div className={s.error}>
          <AlertCircle className={s.errorIcon} size={15} />
          <span className={s.errorText}>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.field}>
          <label className={s.label}>Email address</label>
          <div className={s.inputWrapper}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${s.input} ${s.inputWithIcon}`}
            />
            <Mail size={16} className={s.icon} />
          </div>
        </div>

        <div className={s.field}>
          <div className={s.passwordRow}>
            <label className={s.label}>Password</label>
            <Link to="/forgot-password" className={s.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <div className={s.inputWrapper}>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${s.input} ${s.inputWithIcon}`}
            />
            <Lock size={16} className={s.icon} />
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={busy} className={s.submitButton}>
            {busy ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in…
              </>
            ) : (
              <>
                Sign in <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </form>

      <div className={s.divider}>
        <div className={s.dividerLine} />
        <span className={s.dividerText}>New to Pollify?</span>
        <div className={s.dividerLine} />
      </div>

      <Link to="/register" className={s.signupLink}>
        Create an account
      </Link>
    </AuthLayout>
  );
}
