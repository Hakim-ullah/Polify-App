import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { toastStyles as s } from "../dummyStyles.jsx";

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className={s.container}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${s.toastBase} ${
              t.type === "error" ? s.toastError : s.toastSuccess
            }`}
          >
            {t.type === "error" ? (
              <AlertCircle size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}