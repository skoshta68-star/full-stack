import React from 'react';
import { Icons } from '../common/Icons';

interface Props {
  label: string;
  field: string;
  currentField: string;
  direction: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export const SortableHeader: React.FC<Props> = ({ label, field, currentField, direction, onSort }) => {
  const isActive = currentField === field;
  return (
    <th className="table-header cursor-pointer select-none hover:bg-surface-100/50 transition-colors"
      onClick={() => onSort(field)}>
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <span className="text-surface-300">
          {!isActive ? <Icons.ArrowUpDown className="w-3 h-3" /> :
            direction === 'asc' ? <Icons.ArrowUp className="w-3 h-3" /> : <Icons.ArrowDown className="w-3 h-3" />}
        </span>
      </div>
    </th>
  );
};
