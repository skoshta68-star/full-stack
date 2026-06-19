import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, cardHover } from '../../../utils/animations';
import { Icons } from '../../../components/common/Icons';
import { StarRating } from '../../../components/shared/StarRating';

interface Props {
  name: string; overallRating: number; totalRatings: number; address?: string;
}

const statConfig = [
  { key: 'name', label: 'Store Name', icon: Icons.Store, bg: 'from-blue-500 to-indigo-600' },
  { key: 'overallRating', label: 'Average Rating', icon: Icons.Star, bg: 'from-emerald-500 to-teal-600' },
  { key: 'totalRatings', label: 'Total Ratings', icon: Icons.BarChart3, bg: 'from-orange-500 to-amber-600' },
];

export const StoreStats: React.FC<Props> = ({ name, overallRating, totalRatings, address }) => (
  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
    {statConfig.map((cfg) => {
      const val = cfg.key === 'overallRating' ? overallRating.toFixed(1) : cfg.key === 'totalRatings' ? totalRatings : name;
      const Icon = cfg.icon;
      return (
        <motion.div key={cfg.key} variants={staggerItem} whileHover={cardHover}
          className={`stat-card bg-gradient-to-br ${cfg.bg}`}>
          <div className="absolute top-3 right-3 text-3xl opacity-20"><Icon className="w-7 h-7" /></div>
          <div className="relative">
            <div className="text-2xl mb-2"><Icon className="w-7 h-7" /></div>
            {cfg.key === 'name' ? (
              <>
                <div className="text-xl font-bold font-display truncate">{val}</div>
                <div className="text-sm text-white/70 mt-0.5">{cfg.label}</div>
                {address && <div className="text-sm text-white/50 mt-1 truncate flex items-center space-x-1"><Icons.MapPin className="w-3 h-3" /><span>{address}</span></div>}
              </>
            ) : (
              <>
                <div className="text-3xl font-bold font-display">{val}</div>
                <div className="text-sm text-white/70 mt-0.5">{cfg.label}</div>
                {cfg.key === 'overallRating' && <div className="flex mt-2"><StarRating rating={overallRating} size="md" /></div>}
              </>
            )}
          </div>
        </motion.div>
      );
    })}
  </motion.div>
);
