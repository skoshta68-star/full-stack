import { useState, useCallback } from 'react';
import { ToastData } from '../components/shared/Toast';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((type: 'success' | 'error', title: string, message: string) => {
    const id = `toast-${++toastId}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message: string) => addToast('success', title, message), [addToast]);
  const showError = useCallback((title: string, message: string) => addToast('error', title, message), [addToast]);

  return { toasts, addToast, removeToast, showSuccess, showError };
}
