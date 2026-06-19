import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../../types';
import { StoreFormData } from '../types';
import { dialogOverlay, dialogPanel, buttonTap } from '../../../utils/animations';
import { Icons } from '../../../components/common/Icons';

interface Props {
  open: boolean;
  editing: boolean;
  formData: StoreFormData;
  errors: Record<string, string>;
  owners: User[];
  onClose: () => void;
  onChange: (data: StoreFormData) => void;
  onSubmit: () => void;
}

const fields = [
  { key: 'name', label: 'Store Name', type: 'text', placeholder: 'Store name (20-60 chars)' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'store@example.com' },
] as const;

export const StoreFormDialog: React.FC<Props> = ({ open, editing, formData, errors, owners, onClose, onChange, onSubmit }) => {
  return (
    <motion.div variants={dialogOverlay} initial="hidden" animate="visible" exit="exit" className="dialog-overlay" onClick={onClose}>
      <motion.div variants={dialogPanel} initial="hidden" animate="visible" exit="exit" className="dialog-panel max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white"><Icons.Store className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-display font-bold text-surface-800">{editing ? 'Edit Store' : 'Add New Store'}</h2>
            <p className="text-xs text-surface-400">{editing ? 'Update store details' : 'Register a new store'}</p>
          </div>
        </div>
        <div className="space-y-4">
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-surface-700 mb-1">{label}</label>
              <input type={type} placeholder={placeholder} value={(formData as any)[key]}
                onChange={(e) => onChange({ ...formData, [key]: e.target.value })}
                className="input-field" autoComplete="off" minLength={key === 'name' ? 20 : undefined} maxLength={key === 'name' ? 60 : undefined} />
              {errors[key] && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{errors[key]}</motion.p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Address</label>
            <textarea rows={2} maxLength={400} placeholder="Enter store address" value={formData.address}
              onChange={(e) => onChange({ ...formData, address: e.target.value })} className="input-field resize-none" autoComplete="off" />
            {errors.address && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{errors.address}</motion.p>}
          </div>
          {!editing && (
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Store Owner</label>
              <select value={formData.ownerId} onChange={(e) => onChange({ ...formData, ownerId: e.target.value })} className="input-field" autoComplete="off">
                <option value="">Select Owner</option>
                {owners.map((owner) => (<option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>))}
              </select>
              {errors.ownerId && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{errors.ownerId}</motion.p>}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-surface-100">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onClose} className="btn-secondary">Cancel</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onSubmit} className="btn-primary">{editing ? 'Update' : 'Create'}</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
