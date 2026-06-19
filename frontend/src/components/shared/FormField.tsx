import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<Props> = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-surface-700 mb-1">{label}</label>
    {children}
    {error && (
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{error}</motion.p>
    )}
  </div>
);
