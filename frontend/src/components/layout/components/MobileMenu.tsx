import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../../common/Icons';

interface Props {
  open: boolean;
  onClose: () => void;
  links: { label: string; path: string; icon: React.ReactNode }[];
}

export const MobileMenu: React.FC<Props> = ({ open, onClose, links }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -10, scaleY: 0.95 }} transition={{ duration: 0.2, ease: 'easeOut' }}
          className="md:hidden border-t bg-white/95 backdrop-blur-md absolute top-[64px] left-0 right-0 shadow-lg z-50"
          style={{ borderColor: '#f1f5f9', transformOrigin: 'top' }}>
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.button key={link.path} whileTap={{ scale: 0.97 }}
                  onClick={() => { navigate(link.path); onClose(); }}
                  className="w-full text-left px-4 py-2.5 rounded-2xl text-[13px] font-medium flex items-center space-x-2 transition-colors"
                  style={{ background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent', color: isActive ? '#6366f1' : '#64748b' }}>
                  {link.icon}<span>{link.label}</span>
                </motion.button>
              );
            })}
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => { navigate('/change-password'); onClose(); }}
              className="w-full text-left px-4 py-2.5 rounded-2xl text-[13px] font-medium flex items-center space-x-2 transition-colors"
              style={{ color: '#64748b' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <Icons.KeyRound className="w-4 h-4" /><span>Change Password</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
