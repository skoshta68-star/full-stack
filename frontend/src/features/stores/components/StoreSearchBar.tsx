import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../../../components/common/Icons';

interface Props {
  search: { name: string; address: string };
  onChange: (search: { name: string; address: string }) => void;
}

export const StoreSearchBar: React.FC<Props> = ({ search, onChange }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
    className="bg-white rounded-2xl shadow-sm p-5 mb-6">
    <div className="flex items-center space-x-2 mb-4">
      <Icons.Search className="w-4 h-4" style={{ color: '#6366f1' }} />
      <span className="text-sm font-semibold" style={{ color: '#334155' }}>Search Stores</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icons.Search className="h-4 w-4" style={{ color: '#94a3b8' }} /></div>
        <input placeholder="Search by name..." value={search.name}
          onChange={(e) => onChange({ ...search, name: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm"
          style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#1e293b' }} autoComplete="off" />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icons.MapPin className="h-4 w-4" style={{ color: '#94a3b8' }} /></div>
        <input placeholder="Search by address..." value={search.address}
          onChange={(e) => onChange({ ...search, address: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm"
          style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#1e293b' }} autoComplete="off" />
      </div>
    </div>
  </motion.div>
);
