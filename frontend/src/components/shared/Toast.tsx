import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../common/Icons';

export interface ToastData {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface Props {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

const typeConfig = {
  success: {
    icon: Icons.CheckCircle,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: '#6366f1',
  },
  error: {
    icon: Icons.AlertTriangle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    borderColor: '#ef4444',
  },
};

export const Toast: React.FC<Props> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastData; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const cfg = typeConfig[toast.type];
  const Icon = cfg.icon;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="pointer-events-auto flex items-start gap-3 bg-white rounded-2xl shadow-xl border border-surface-100 pr-3 overflow-hidden min-w-[320px] max-w-[420px]"
      style={{ borderLeft: `6px solid ${cfg.borderColor}` }}
    >
      <div className="flex-1 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
            <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-bold text-surface-800">{toast.title}</p>
            <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => onRemove(toast.id)}
            className="text-surface-400 hover:text-surface-600 transition-colors flex-shrink-0 mt-0.5">
            <Icons.X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ background: cfg.borderColor }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />
    </motion.div>
  );
};
