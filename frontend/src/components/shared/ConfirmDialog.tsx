import React from 'react';
import { motion } from 'framer-motion';
import { dialogOverlay, dialogPanel } from '../../utils/animations';
import { Icons } from '../common/Icons';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'primary';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<Props> = ({
  open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  type = 'danger', loading, onConfirm, onCancel
}) => {
  return (
    <motion.div variants={dialogOverlay} initial="hidden" animate="visible" exit="exit"
      className="dialog-overlay" onClick={onCancel}>
      <motion.div variants={dialogPanel} initial="hidden" animate="visible" exit="exit"
        className="dialog-panel max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
            className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${type === 'danger' ? 'bg-red-100' : 'bg-primary-100'}`}>
            {type === 'danger'
              ? <Icons.AlertTriangle className="w-7 h-7 text-red-600" />
              : <Icons.CheckCircle className="w-7 h-7 text-primary-600" />}
          </motion.div>
          <h2 className="text-lg font-display font-bold text-surface-800 mb-1">{title}</h2>
          <p className="text-sm text-surface-500 mb-6">{message}</p>
          <div className="flex space-x-3">
            <button onClick={onCancel} disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
              style={{ borderColor: '#e2e8f0', color: '#64748b' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              {cancelLabel}
            </button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onConfirm} disabled={loading}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center space-x-2 transition-all disabled:opacity-60 shadow-sm`}
              style={{ background: type === 'danger' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              {loading && <Icons.Loader2 className="w-4 h-4 animate-spin" />}
              <span>{confirmLabel}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
