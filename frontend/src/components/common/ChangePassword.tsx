import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authApi } from '../../features/auth/api/auth.api';
import { validatePasswordChange } from '../../features/auth/validation/auth.validation';
import { fadeIn, slideUp, buttonTap } from '../../utils/animations';
import { Icons } from './Icons';
import { AlertBanner } from '../shared/AlertBanner';
import { FormField } from '../shared/FormField';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccess('');
    const v = validatePasswordChange(formData.oldPassword, formData.newPassword, formData.confirmPassword);
    setErrors(v);
    if (Object.keys(v).length) return;
    setLoading(true);
    try { await authApi.changePassword(formData.oldPassword, formData.newPassword); setSuccess('Password updated successfully'); setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' }); }
    catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="w-full max-w-md">
        <motion.div variants={slideUp} className="card p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white"><Icons.KeyRound className="w-5 h-5" /></div>
            <div><h1 className="text-lg font-display font-bold text-surface-800">Change Password</h1><p className="text-xs text-surface-400">Update your account password</p></div>
          </div>
          {success && <AlertBanner type="success" message={success} />}
          {error && <AlertBanner message={error} />}
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {(['oldPassword', 'newPassword', 'confirmPassword'] as const).map((f) => (
              <FormField key={f} label={f === 'oldPassword' ? 'Current Password' : f === 'newPassword' ? 'New Password' : 'Confirm New Password'} error={errors[f]}>
                <input type="password" placeholder="••••••••" value={formData[f]}
                  onChange={(e) => setFormData({ ...formData, [f]: e.target.value })} className="input-field" />
              </FormField>
            ))}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={buttonTap}
              className="btn-primary w-full flex items-center justify-center space-x-2">
              {loading ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.KeyRound className="w-4 h-4" />}
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
