import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Icons } from '../common/Icons';
import { NavLogo } from './components/NavLogo';
import { NavLinks } from './components/NavLinks';
import { UserMenu } from './components/UserMenu';
import { MobileMenu } from './components/MobileMenu';

const navConfig: Record<string, { label: string; path: string; icon: React.ReactNode }[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Icons.BarChart3 className="w-4 h-4" /> },
    { label: 'Users', path: '/admin/users', icon: <Icons.Users className="w-4 h-4" /> },
    { label: 'Stores', path: '/admin/stores', icon: <Icons.Store className="w-4 h-4" /> },
  ],
  store_owner: [
    { label: 'Dashboard', path: '/owner/dashboard', icon: <Icons.TrendingUp className="w-4 h-4" /> },
  ],
  user: [
    { label: 'Stores', path: '/stores', icon: <Icons.Store className="w-4 h-4" /> },
  ],
};

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = user ? navConfig[user.role] || [] : [];
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-50 h-[64px] flex items-center rounded-b-2xl"
      style={{ background: '#ffffff', borderBottom: '1px solid rgba(241, 245, 249, 0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div className="w-full max-w-[1400px] mx-auto px-5 flex items-center justify-between h-full">
        <NavLogo />
        <div className="flex items-center space-x-1.5">
          {isAuthenticated && <NavLinks links={links} />}
          {isAuthenticated ? (
            <UserMenu name={user!.name} role={user!.role} initials={initials} onLogout={logout} />
          ) : <></>}
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-[38px] h-[38px] rounded-2xl flex items-center justify-center transition-colors hover:bg-gray-100">
            <svg className="w-5 h-5" style={{ color: '#64748b' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
    </motion.nav>
  );
};

export default Navbar;
