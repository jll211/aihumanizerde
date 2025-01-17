import * as React from 'react';

const {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  createElement
} = React;

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { ...toast, id: Math.random().toString(36).slice(2) },
    ]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return {
    toasts,
    addToast,
    removeToast,
    toast: (props: Omit<Toast, "id">) => addToast(props),
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const value = useToast();
  return createElement(ToastContext.Provider, { value }, children);
}

export function toast(props: Omit<Toast, "id">) {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  context.addToast(props);
}