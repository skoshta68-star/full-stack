import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../../../components/common/Icons';

interface Stat {
  label: string; value: string | number; icon: React.ComponentType<any>;
  gradient: string; showStars?: boolean; avgRating?: number;
}

interface Props { stats: { totalUsers: number; totalStores: number; totalRatings: number; avgRating: number } }

const config = (stats: Props['stats']): Stat[] => [
  { label: 'Total Users', value: stats.totalUsers, icon: Icons.Users, gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)' },
  { label: 'Total Stores', value: stats.totalStores, icon: Icons.Store, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
  { label: 'Total Ratings', value: stats.totalRatings, icon: Icons.Star, gradient: 'linear-gradient(135deg, #f97316, #eab308)' },
  { label: 'Average Rating', value: (stats.avgRating ?? 0).toFixed(1), icon: Icons.BarChart3, gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)', showStars: true, avgRating: stats.avgRating },
];

export const StatCards: React.FC<Props> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {config(stats).map((card, i) => {
      const Icon = card.icon;
      return (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="rounded-2xl p-4 text-white relative overflow-hidden"
          style={{ background: card.gradient, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div className="absolute -bottom-2 -right-2 opacity-30">
            <Icon className="w-16 h-16" style={{ color: 'rgba(255,255,255,0.15)' }} />
          </div>
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Icon className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="text-[32px] font-bold leading-none mb-0.5">{card.value}</div>
            <div className="text-[12px] text-white/80 font-medium">{card.label}</div>
            {card.showStars && (
              <div className="flex items-center space-x-0.5 mt-2">
                {Array.from({ length: 5 }, (_, j) => (
                  <Icons.Star key={j} className={`w-4 h-4 ${j < Math.round(card.avgRating ?? 0) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      );
    })}
  </div>
);
