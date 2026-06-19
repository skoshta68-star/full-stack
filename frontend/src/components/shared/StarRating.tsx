import React from 'react';
import { Icons } from '../common/Icons';

interface Props {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

export const StarRating: React.FC<Props> = ({ rating, size = 'sm', showValue, interactive, onChange }) => (
  <div className="flex items-center space-x-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <button key={i} type="button" disabled={!interactive}
        onClick={() => onChange?.(i + 1)}
        className={`${sizeMap[size]} ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}>
        <Icons.Star className="w-full h-full" />
      </button>
    ))}
    {showValue && <span className="text-surface-400 text-xs ml-1">({rating.toFixed(1)})</span>}
  </div>
);
