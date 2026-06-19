import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../common/Icons';

interface Props {
  type?: 'error' | 'success';
  message: string;
  onClose?: () => void;
}

const config = {
  error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: Icons.AlertTriangle, closeHover: 'text-red-500 hover:text-red-700' },
  success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: Icons.CheckCircle, closeHover: 'text-green-500 hover:text-green-700' },
};

export const AlertBanner: React.FC<Props> = ({ type = 'error', message, onClose }) => {
  const c = config[type];
  const Icon = c.icon;
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className={`${c.bg} border ${c.border} ${c.text} px-4 py-3 rounded-xl mb-6 flex items-center ${onClose ? 'justify-between' : 'space-x-2'} text-sm`}>
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} type="button" className={c.closeHover}>
          <Icons.X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};
