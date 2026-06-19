import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, buttonHover, buttonTap } from '../../utils/animations';

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface Props {
  title: string;
  subtitle: string;
  action?: Action;
}

export const PageHeader: React.FC<Props> = ({ title, subtitle, action }) => (
  <motion.div variants={fadeIn} initial="hidden" animate="visible"
    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-800">{title}</h1>
      <p className="text-surface-500 mt-1">{subtitle}</p>
    </div>
    {action && (
      <motion.button whileHover={buttonHover} whileTap={buttonTap} onClick={action.onClick}
        className="btn-primary flex items-center space-x-2">
        {action.icon}<span>{action.label}</span>
      </motion.button>
    )}
  </motion.div>
);
