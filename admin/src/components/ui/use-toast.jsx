"use client";
import { createContext, useContext, useState } from "react";

export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast({ title, description, variant = "default" }) {
    const id = Math.random().toString(36).substring(2, 9);

    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);

    return id;
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    toast: context.addToast,
    dismiss: context.removeToast,
  };
}
