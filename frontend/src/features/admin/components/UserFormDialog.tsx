import React from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../../../types';
import { UserFormData } from '../types';
import { dialogOverlay, dialogPanel, buttonTap } from '../../../utils/animations';
import { Icons } from '../../../components/common/Icons';

interface Props {
  open: boolean;
  editing: boolean;
  formData: UserFormData;
  errors: Record<string, string>;
  onClose: () => void;
  onChange: (data: UserFormData) => void;
  onSubmit: () => void;
}

const fields = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Full name (20-60 chars)' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
  { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
] as const;

export const UserFormDialog: React.FC<Props> = ({ open, editing, formData, errors, onClose, onChange, onSubmit }) => {
  return (
    <motion.div variants={dialogOverlay} initial="hidden" animate="visible" exit="exit" className="dialog-overlay" onClick={onClose}>
      <motion.div variants={dialogPanel} initial="hidden" animate="visible" exit="exit" className="dialog-panel max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white"><Icons.User className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-display font-bold text-surface-800">{editing ? 'Edit User' : 'Add New User'}</h2>
            <p className="text-xs text-surface-400">{editing ? 'Update user details' : 'Create a new user account'}</p>
          </div>
        </div>
        <div className="space-y-4">
          {fields.map(({ key, label, type, placeholder }) => {
            if (key === 'password' && editing) return null;
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-surface-700 mb-1">{label}</label>
                <input type={type} placeholder={placeholder} value={(formData as any)[key]}
                  onChange={(e) => onChange({ ...formData, [key]: e.target.value })}
                  className="input-field" autoComplete="off" minLength={key === 'name' ? 20 : undefined} maxLength={key === 'name' ? 60 : undefined} />
                {errors[key] && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{errors[key]}</motion.p>}
              </div>
            );
          })}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Address</label>
            <textarea rows={2} maxLength={400} placeholder="Enter address" value={formData.address}
              onChange={(e) => onChange({ ...formData, address: e.target.value })} className="input-field resize-none" autoComplete="off" />
            {errors.address && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">{errors.address}</motion.p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Role</label>
            <select value={formData.role} onChange={(e) => onChange({ ...formData, role: e.target.value as UserRole })} className="input-field" autoComplete="off">
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.USER}>User</option>
              <option value={UserRole.STORE_OWNER}>Store Owner</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-surface-100">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onClose} className="btn-secondary">Cancel</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={buttonTap} onClick={onSubmit} className="btn-primary">{editing ? 'Update' : 'Create'}</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
