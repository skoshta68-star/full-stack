import React from 'react';
import { Icons } from '../../../components/common/Icons';

interface Props {
  fields: { key: string; placeholder: string; type?: 'text' | 'select'; options?: { value: string; label: string }[] }[];
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

const gridCols: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export const FilterBar: React.FC<Props> = ({ fields, filters, onChange }) => (
  <div className="card p-5 mb-6">
    <div className="flex items-center space-x-2 mb-3">
      <Icons.Search className="w-4 h-4 text-surface-400" />
      <span className="text-sm font-medium text-surface-600">Filters</span>
    </div>
    <div className={`grid grid-cols-1 ${gridCols[fields.length] || 'md:grid-cols-2'} gap-3`}>
      {fields.map((f) => f.type === 'select' ? (
        <select key={f.key} value={filters[f.key]} onChange={(e) => onChange({ ...filters, [f.key]: e.target.value })}
          className="input-field text-sm" autoComplete="off">
          {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input key={f.key} placeholder={f.placeholder} value={filters[f.key]}
          onChange={(e) => onChange({ ...filters, [f.key]: e.target.value })} className="input-field text-sm" autoComplete="off" />
      ))}
    </div>
  </div>
);
