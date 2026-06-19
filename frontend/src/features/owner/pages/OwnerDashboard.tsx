import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOwnerDashboard } from '../hooks/useOwnerDashboard';
import { StoreStats } from '../components/StoreStats';
import { RatingsTable } from '../components/RatingsTable';
import { fadeIn } from '../../../utils/animations';
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner';
import { Toast } from '../../../components/shared/Toast';
import { useToast } from '../../../hooks/useToast';

const OwnerDashboard: React.FC = () => {
  const { store, loading, error, ratOrder, ratOrderBy, sortedRatings, handleSortRatings } = useOwnerDashboard();
  const { toasts, removeToast, showError } = useToast();

  useEffect(() => { if (error) showError('Error', error); }, [error, showError]);
  useEffect(() => { if (!loading && !store) showError('Not Found', 'No store found'); }, [loading, store, showError]);

  if (loading) return <LoadingSpinner />;

  if (!store) return <div className="max-w-7xl mx-auto px-4 mt-8"><Toast toasts={toasts} onRemove={removeToast} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toast toasts={toasts} onRemove={removeToast} />
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-surface-800">Store Dashboard</h1>
        <p className="text-surface-500 mt-2 text-base">Your store performance at a glance</p>
      </motion.div>

      <StoreStats name={store.name} overallRating={store.overallRating ?? 0} totalRatings={store.totalRatings} address={store.address} />

      <RatingsTable ratings={sortedRatings} totalRatings={store.totalRatings}
        sortField={ratOrderBy} sortDir={ratOrder} onSort={handleSortRatings} />
    </div>
  );
};

export default OwnerDashboard;
