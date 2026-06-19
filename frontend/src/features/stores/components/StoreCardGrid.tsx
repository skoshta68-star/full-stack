import React from 'react';
import { motion } from 'framer-motion';
import { Store } from '../types';
import { Icons } from '../../../components/common/Icons';
import { StarRating } from '../../../components/shared/StarRating';
import { EmptyState } from '../../../components/shared/EmptyState';
import { AvatarInitials } from '../../../components/shared/AvatarInitials';

interface Props {
  stores: Store[];
  onRate: (store: Store) => void;
}

export const StoreCardGrid: React.FC<Props> = ({ stores, onRate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {stores.map((s, i) => (
      <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
        className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all relative">
        <div className="flex items-start justify-between mb-3">
          <AvatarInitials name={s.name} size="lg" />
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full" style={{ background: '#f0eaf8' }}>
            <Icons.Star className="w-3.5 h-3.5 fill-purple-600" style={{ color: '#6366f1' }} />
            <span className="text-xs font-bold" style={{ color: '#6366f1' }}>{(s.overallRating ?? 0).toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-bold text-sm mb-1.5" style={{ color: '#1e293b' }}>{s.name}</h3>
        <div className="flex items-start space-x-1.5 mb-3">
          <Icons.MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#6366f1' }} />
          <p className="text-xs" style={{ color: '#64748b' }}>{s.address}</p>
        </div>
        <div className="mb-4"><StarRating rating={s.overallRating ?? 0} size="md" /></div>
        <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: '#f1f5f9' }}>
          <div>
            {s.userRating ? (
              <span className="text-xs" style={{ color: '#64748b' }}>Your rating: <span className="font-bold" style={{ color: '#6366f1' }}>{s.userRating}/5</span></span>
            ) : (
              <span className="text-xs" style={{ color: '#94a3b8' }}>Not rated yet</span>
            )}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => onRate(s)}
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            <Icons.Pencil className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </motion.div>
    ))}
    {stores.length === 0 && (
      <div className="col-span-full">
        <EmptyState icon={Icons.Store} title="No stores found" subtitle="Try adjusting your search criteria" />
      </div>
    )}
  </div>
);
