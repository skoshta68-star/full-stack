import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  links: { label: string; path: string; icon: React.ReactNode }[];
}

export const NavLinks: React.FC<Props> = ({ links }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="hidden md:flex items-center space-x-1 mr-1">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <motion.button key={link.path} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate(link.path)}
            className="relative px-3.5 py-2 rounded-2xl text-[13px] font-medium transition-colors flex items-center space-x-1.5"
            style={{ color: isActive ? '#6366f1' : '#64748b', background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent' }}>
            {link.icon}
            <span>{link.label}</span>
            {isActive && (
              <motion.div layoutId="nav-active" className="absolute -bottom-[6px] left-2 right-2 h-[2.5px] rounded-full"
                style={{ background: '#6366f1' }} transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
