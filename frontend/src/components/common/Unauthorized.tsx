import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { slideUp, buttonTap } from '../../utils/animations';
import { Icons } from './Icons';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const getHomePath = () => {
    switch (user?.role) {
      case 'admin': return '/admin/dashboard';
      case 'store_owner': return '/owner/dashboard';
      default: return '/stores';
    }
  };
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="card p-8 sm:p-12 text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-lg">
          <Icons.Ban className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl font-display font-bold text-surface-800 mb-2">Access Denied</h1>
        <p className="text-surface-500 mb-6">You don&apos;t have permission to access this page.</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={() => navigate(getHomePath())}
          className="btn-primary">
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};
export default Unauthorized;
