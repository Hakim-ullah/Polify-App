import { useEffect, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { AuthButton } from "./UIElements.jsx";
import { otpStepStyles as s } from "../dummyStyles.jsx";

export default function OtpStep({
  email,
  onSubmit,
  onResend,
  submitText = "Verify",
}) {
  const [otp, setOtp] = useState("");
  const [left, setLeft] = useState(60);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onSubmit(otp);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setError("");
    setResending(true);
    try {
      await onResend();
      setOtp("");
      setLeft(60);
    } catch {
      setError("Could not resend the code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={submit} className={s.form}>
      {/* Email badge */}
      <div className={s.emailBadge}>
        <span className={s.emailIconWrapper}>
          <Mail size={15} />
        </span>
        <div>
          <p className={s.emailLabel}>Code sent to</p>
          <p className={s.emailValue}>{email}</p>
        </div>
      </div>

      {/* Error */}
      {error && <div className={s.errorBox}>{error}</div>}

      {/* OTP input */}
      <div className="space-y-1.5">
        <label className={s.otpLabel}>Verification code</label>
        <input
          className={s.otpInput}
          inputMode="numeric"
          maxLength={6}
          placeholder="······"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          required
        />
        {/* Progress dots */}
        <div className={s.otpDotsContainer}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`${s.otpDot} ${
                i < otp.length ? s.otpDotFilled : s.otpDotEmpty
              }`}
            />
          ))}
        </div>
      </div>

      {/* Resend */}
      <div className="text-center">
        {left > 0 ? (
          <p className={s.resendText}>
            Resend code in{" "}
            <span className={s.resendTimer}>{left}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={resend}
            disabled={resending}
            className={s.resendButton}
          >
            <RefreshCw
              size={13}
              className={resending ? s.resendIcon : ""}
            />
            {resending ? "Sending…" : "Resend code"}
          </button>
        )}
      </div>

      <AuthButton disabled={busy || otp.length < 6}>
        {busy ? (
          <>
            <svg className={s.spinner} viewBox="0 0 24 24" fill="none">
              <circle
                className={s.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className={s.spinnerPath}
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Verifying…
          </>
        ) : (
          submitText
        )}
      </AuthButton>
    </form>
  );
}