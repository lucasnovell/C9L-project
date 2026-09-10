import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "./style.css";

const DISPLAY_DURATION = 4000;

function Toast({ notification, onClose }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!notification || hovered || focused) return;

    const timeout = setTimeout(onClose, DISPLAY_DURATION);
    return () => clearTimeout(timeout);
  }, [notification, onClose, hovered, focused]);

  useEffect(() => {
    if (!notification) {
      setHovered(false);
      setFocused(false);
    }
  }, [notification]);

  return createPortal(
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {notification && (
        <div
          className="toast"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <span className="toast__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {notification.type === "success" ? (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <path d="m7.5 12 3 3 6-6" />
                </>
              ) : notification.type === "error" ? (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v6m0 3v1" />
                </>
              ) : (
                <>
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                </>
              )}
            </svg>
          </span>
          <p className="toast__message">{notification.message}</p>
          <button className="toast__close" type="button" aria-label="Fechar notificação" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}

export default Toast;
