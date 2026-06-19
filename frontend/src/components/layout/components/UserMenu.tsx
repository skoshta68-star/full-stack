import React from 'react';
import { motion } from 'framer-motion';
import { AvatarInitials } from '../../shared/AvatarInitials';
import { Icons } from '../../common/Icons';

interface Props { name: string; role: string; initials: string; onLogout: () => void }

export const UserMenu: React.FC<Props> = ({ name, role, initials, onLogout }) => (
  <>
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
      className="hidden sm:flex items-center space-x-2.5 ml-1 mr-0.5 px-2.5 py-1.5 rounded-2xl transition-colors cursor-default"
      style={{ background: 'rgba(248, 250, 252, 0.8)' }}>
      <AvatarInitials name={name} size="lg" />
      <div className="text-[13px] leading-tight">
        <p className="font-semibold" style={{ color: '#1e293b' }}>{name}</p>
        <p className="text-[11px] capitalize" style={{ color: '#94a3b8' }}>{role.replace('_', ' ')}</p>
      </div>
    </motion.div>
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onLogout}
      className="flex items-center space-x-2 px-4 py-[9px] rounded-2xl text-[13px] font-medium transition-all border ml-0.5"
      style={{ borderColor: '#e2e8f0', color: '#64748b' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = '#fef2f2'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}>
      <Icons.LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </motion.button>
  </>
);
