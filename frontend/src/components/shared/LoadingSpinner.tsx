import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  fullPage?: boolean;
  color?: string;
}

export const LoadingSpinner: React.FC<Props> = ({ fullPage = true, color = 'primary' }) => (
  <div className={`flex justify-center items-center ${fullPage ? 'mt-20' : ''}`}>
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
      className={`w-12 h-12 border-4 border-${color}-200 border-t-${color}-600 rounded-full animate-spin`} />
  </div>
);
