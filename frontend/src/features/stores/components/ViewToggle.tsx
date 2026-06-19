import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../../../components/common/Icons';

interface Props {
  viewMode: 'table' | 'cards';
  onChange: (mode: 'table' | 'cards') => void;
}

export const ViewToggle: React.FC<Props> = ({ viewMode, onChange }) => (
  <div className="flex items-center space-x-2 flex-shrink-0 relative z-10">
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={() => onChange('table')}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'table' ? 'bg-white shadow-md' : 'bg-white/60 hover:bg-white'}`}
      style={{ color: viewMode === 'table' ? '#6366f1' : '#94a3b8' }}>
      <Icons.LayoutList className="w-5 h-5" />
    </motion.button>
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={() => onChange('cards')}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'cards' ? 'shadow-md' : 'bg-white/60 hover:bg-white'}`}
      style={{ background: viewMode === 'cards' ? '#6366f1' : undefined, color: viewMode === 'cards' ? '#ffffff' : '#94a3b8' }}>
      <Icons.LayoutGrid className="w-5 h-5" />
    </motion.button>
  </div>
);
