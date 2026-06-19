import React from 'react';

interface Props { role: string }

const styles: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  store_owner: 'bg-green-100 text-green-700',
  user: 'bg-blue-100 text-blue-700',
};

export const RoleBadge: React.FC<Props> = ({ role }) => (
  <span className={`badge ${styles[role] || 'bg-blue-100 text-blue-700'}`}>
    {role.replace('_', ' ')}
  </span>
);
