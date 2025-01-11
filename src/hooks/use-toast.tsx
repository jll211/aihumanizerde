import * as React from 'react';
const { useState, useEffect } = React;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [toasts]);

  return { toasts, addToast, removeToast };
};
