import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, User, AtSign, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import OtpStep from "../assets/helpers component/OtpStep.jsx";
import { loginStyles as s, forgotPasswordStyles as fp } from "../assets/dummyStyles.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const { register, verifyRegister, resendRegisterOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const prefillEmail = location.state?.verifyEmail || "";
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: prefillEmail,
    password: "",
  });
  const [step, setStep] = useState(prefillEmail ? 2 : 1);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fallback, setFallback] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address");
      setBusy(false);
      return;
    }
    try {
      const data = await register(form.name, form.username, form.email, form.password);
      setFallback(data?.emailSent === false ? { message: data.message } : null);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Cannot connect to server — is the backend running on http://localhost:5000?"
            : "Registration failed. Try a different username/email.")
      );
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (otp) => {
    const { data } = await verifyRegister(form.email, otp);
    if (data.token) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleResend = async () => {
    const data = await resendRegisterOtp(form.email);
    setFallback(data?.emailSent === false ? { message: data.message } : null);
  };

  return (
    <AuthLayout
      title={step === 1 ? "Create account" : "Verify your email"}
      subtitle={
        step === 1
          ? "Join Pollify to participate in polls and share your voice."
          : `Enter the 6-character verification code sent to ${form.email}`
      }
    >
      {error && (
        <div className={s.error}>
          <AlertCircle className={s.errorIcon} size={15} />
          <span className={s.errorText}>{error}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.field}>
            <label className={s.label}>Full name</label>
            <div className={s.inputWrapper}>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={`${s.input} ${s.inputWithIcon}`}
              />
              <User size={16} className={s.icon} />
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Username</label>
            <div className={s.inputWrapper}>
              <input
                type="text"
                name="username"
                required
                placeholder="johndoe"
                value={form.username}
                onChange={handleChange}
                className={`${s.input} ${s.inputWithIcon}`}
              />
              <AtSign size={16} className={s.icon} />
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Email address</label>
            <div className={s.inputWrapper}>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`${s.input} ${s.inputWithIcon}`}
              />
              <Mail size={16} className={s.icon} />
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Password</label>
            <div className={s.inputWrapper}>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
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
                  Sending code…
                </>
              ) : (
                <>
                  Create account <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <OtpStep
            email={form.email}
            onSubmit={handleVerify}
            onResend={handleResend}
            submitText="Verify & continue"
            fallback={fallback}
          />
          <div className={fp.footerLink}>
            <button
              type="button"
              onClick={() => {
                setFallback(null);
                setStep(1);
              }}
              className={`${fp.link} inline-flex items-center gap-1.5`}
            >
              <ArrowLeft size={13} /> Change account details
            </button>
          </div>
        </>
      )}

      <div className={s.divider}>
        <div className={s.dividerLine} />
        <span className={s.dividerText}>Already have an account?</span>
        <div className={s.dividerLine} />
      </div>

      <Link to="/login" className={s.signupLink}>
        Sign in to existing account
      </Link>
    </AuthLayout>
  );
}
