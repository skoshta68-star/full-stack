import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '../../../utils/animations';

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children, title, subtitle, icon }) => (
  <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-indigo-50 pointer-events-none" />
    <div className="absolute inset-0 bg-grid pointer-events-none" />
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative w-full max-w-md">
      <motion.div variants={slideUp} className="card p-8 shadow-glow-lg">
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            {icon}
          </motion.div>
          <h1 className="text-2xl font-display font-bold text-surface-800">{title}</h1>
          <p className="text-surface-500 mt-1 text-sm">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </motion.div>
  </div>
);
