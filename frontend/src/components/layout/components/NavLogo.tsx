import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../../common/Icons';

export const NavLogo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/')} className="flex items-center space-x-2.5">
      <motion.div whileHover={{ rotate: -15 }}
        className="w-[36px] h-[36px] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
        <Icons.Star className="w-[19px] h-[19px] text-white" strokeWidth={1.5} />
      </motion.div>
      <span className="text-[17px] font-display font-bold select-none">
        <span style={{ color: '#6366f1' }}>Store Rating</span>
        <span style={{ color: '#1e293b' }}> System</span>
      </span>
    </motion.button>
  );
};
