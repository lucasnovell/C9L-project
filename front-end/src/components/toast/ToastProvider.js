import { createContext, useCallback, useContext, useState } from "react";

import Toast from "./index";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const showToast = useCallback((message, type = "error") => {
    setNotification({ message, type });
  }, []);
  const closeToast = useCallback(() => setNotification(null), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast notification={notification} onClose={closeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) throw new Error("useToast deve ser usado dentro de ToastProvider.");
  return showToast;
}
