import React from 'react';
import { Icons } from '../common/Icons';

interface Props {
  icon?: React.ComponentType<any>;
  title: string;
  subtitle?: string;
}

export const EmptyState: React.FC<Props> = ({ icon: Icon = Icons.Store, title, subtitle }) => (
  <div className="text-center py-12">
    <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#d1d5db' }} />
    <p className="text-lg font-medium" style={{ color: '#64748b' }}>{title}</p>
    {subtitle && <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>{subtitle}</p>}
  </div>
);
