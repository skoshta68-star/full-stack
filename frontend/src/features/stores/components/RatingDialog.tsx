import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store } from '../types';
import { dialogOverlay, dialogPanel, buttonTap } from '../../../utils/animations';
import { Icons } from '../../../components/common/Icons';

interface Props {
  open: boolean;
  store: Store | null;
  selectedRating: number | null;
  onClose: () => void;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
}

const starLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];
const starColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
const starBg = ['bg-red-50', 'bg-orange-50', 'bg-yellow-50', 'bg-green-50', 'bg-emerald-50'];

export const RatingDialog: React.FC<Props> = ({ open, store, selectedRating, onClose, onRatingChange, onSubmit }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const displayStar = hoveredStar || selectedRating;

  useEffect(() => { if (!open) { setHoveredStar(null); } }, [open]);

  return (
    <motion.div variants={dialogOverlay} initial="hidden" animate="visible" exit="exit"
      className="dialog-overlay" onClick={onClose}>
      <motion.div variants={dialogPanel} initial="hidden" animate="visible" exit="exit"
        className="dialog-panel max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center space-x-3 mb-6">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
            <Icons.Star className="w-5 h-5 text-white fill-white" />
          </motion.div>
          <div>
            <h2 className="text-lg font-display font-bold text-surface-800">
              {store?.userRating ? 'Update Rating' : 'Rate Store'}
            </h2>
            <p className="text-xs text-surface-400">{store?.name}</p>
          </div>
        </div>
        <div className="text-center py-6 bg-surface-50 rounded-xl mb-4">
          <motion.p key={displayStar || 'prompt'}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
            className="text-surface-600 text-sm mb-4 font-medium">
            {displayStar ? `You rated ${displayStar} / 5` : 'Tap a star to rate'}
          </motion.p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button key={star} whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.85 }}
                onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(null)}
                onClick={() => onRatingChange(star)}
                className="relative focus:outline-none">
                <Icons.Star className={`w-10 h-10 transition-all duration-200 ${
                  displayStar && star <= displayStar
                    ? 'text-yellow-400 drop-shadow-md'
                    : 'text-gray-300 hover:text-yellow-300'
                }`} style={displayStar && star <= displayStar ? { fill: '#facc15' } : {}} />
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {displayStar && (
              <motion.div key={displayStar} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${starBg[displayStar - 1]}`}
                  style={{ color: starColors[displayStar - 1] }}>
                  {starLabels[displayStar - 1]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-end space-x-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onClose}
            className="btn-secondary">Cancel</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onSubmit} disabled={!selectedRating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
            <span>Submit</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
