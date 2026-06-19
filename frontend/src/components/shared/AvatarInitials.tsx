import React from 'react';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

const sizeMap = { sm: 'w-7 h-7 text-[11px]', md: 'w-10 h-10 text-sm', lg: 'w-11 h-11 text-base' };

export const getInitials = (name: string) =>
  name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

const solidColors = ['#6366f1', '#10b981', '#f97316', '#8b5cf6', '#06b6d4'];

export const AvatarInitials: React.FC<Props> = ({ name, size = 'md', gradient = true }) => {
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % solidColors.length;
  return (
    <div className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0 ${gradient ? '' : ''}`}
      style={gradient
        ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#ffffff' }
        : { background: solidColors[idx], color: '#ffffff' }}>
      {getInitials(name)}
    </div>
  );
};
