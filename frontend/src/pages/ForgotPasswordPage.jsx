import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, KeyRound, AlertCircle, Eye, EyeOff } from "lucide-react";
import api from "../utils/api.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { forgotPasswordStyles as s, loginStyles as ls } from "../assets/dummyStyles.jsx";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code.");
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.post("/auth/verify-otp", { email, otp });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP code.");
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (pw !== pw2) return setError("Passwords do not match");
    setError("");
    setBusy(true);
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword: pw });
      navigate("/login", { state: { reset: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title={step === 1 ? "Reset password" : step === 2 ? "Enter OTP code" : "Set new password"}
      subtitle={
        step === 1
          ? "Enter your email to receive a verification code."
          : step === 2
            ? `Enter the 6-character verification code sent to ${email}`
            : "Choose a strong new password for your account."
      }
    >
      {/* Step Indicator */}
      <div className={s.stepContainer}>
        {[1, 2, 3].map((sNum) => (
          <div key={sNum} className={`${s.stepItemWrapper} ${sNum < 3 ? "flex-1" : ""}`}>
            <div
              className={`${s.stepCircleBase} ${
                sNum < step
                  ? s.stepCircleDone
                  : sNum === step
                    ? s.stepCircleActive
                    : s.stepCircleInactive
              }`}
            >
              {sNum < step ? "✓" : sNum}
            </div>
            {sNum < 3 && (
              <div className={`${s.stepLineBase} ${sNum < step ? s.stepLineDone : s.stepLineInactive}`} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className={s.errorBox}>
          <AlertCircle className={s.errorIcon} size={15} />
          <span className={s.errorText}>{error}</span>
        </div>
      )}

      {/* Step 1: Send OTP */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={ls.form}>
          <div className={ls.field}>
            <label className={s.label}>Email address</label>
            <div className={ls.inputWrapper}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${ls.input} ${ls.inputWithIcon}`}
              />
              <Mail size={16} className={ls.icon} />
            </div>
          </div>
          <button type="submit" disabled={busy} className={ls.submitButton}>
            {busy ? "Sending code…" : "Send verification code →"}
          </button>
        </form>
      )}

        {/* Step 2: Verify OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className={ls.form}>
          <div className={ls.field}>
            <label className={s.label}>Verification Code</label>
            <div className={ls.inputWrapper}>
              <input
                type="text"
                inputMode="text"
                required
                maxLength={6}
                placeholder="A1b2C3"
                value={otp}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                  setOtp(v);
                }}
                className={`${ls.input} ${ls.inputWithIcon} tracking-widest text-center font-mono text-lg`}
              />
              <KeyRound size={16} className={ls.icon} />
            </div>
          </div>
          <button type="submit" disabled={busy || otp.length !== 6} className={ls.submitButton}>
            {busy ? "Verifying…" : "Verify code →"}
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={ls.form}>
          <div className={ls.field}>
            <label className={s.label}>New password</label>
            <div className={ls.inputWrapper}>
              <input
                type={showPw ? "text" : "password"}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className={ls.input}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className={s.toggleButton}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className={ls.field}>
            <label className={s.label}>Confirm password</label>
            <div className={ls.inputWrapper}>
              <input
                type={showPw ? "text" : "password"}
                required
                minLength={6}
                placeholder="Re-enter new password"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                className={ls.input}
              />
            </div>
          </div>

          <button type="submit" disabled={busy || pw !== pw2} className={ls.submitButton}>
            {busy ? "Resetting…" : "Reset password →"}
          </button>
        </form>
      )}

      <div className={s.footerLink}>
        <Link to="/login" className={s.link}>
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
