import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../../../components/common/Icons';
import { authApi } from '../api/auth.api';
import { validateResetPassword } from '../validation/auth.validation';
import { AlertBanner } from '../../../components/shared/AlertBanner';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    const v = validateResetPassword(password, confirmPassword);
    setErrors(v);
    if (Object.keys(v).length) return;
    if (!token) { setApiError('Invalid reset link'); return; }
    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      setDone(true);
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#f0eaf8]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[440px]">
          <div className="rounded-xl bg-white px-8 py-10 text-center"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: '#fef2f2' }}>
              <Icons.AlertTriangle className="w-6 h-6" style={{ color: '#ef4444' }} />
            </div>
            <h1 className="text-xl font-display font-bold" style={{ color: '#1e293b' }}>Invalid link</h1>
            <p className="text-sm mt-2" style={{ color: '#6b7280' }}>This reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="inline-block mt-4 text-sm font-semibold hover:underline" style={{ color: '#6366f1' }}>Request a new reset link</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#f0eaf8]">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[440px]">
        <div className="rounded-xl bg-white px-8 py-10"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
              <Icons.KeyRound className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-display font-bold" style={{ color: '#1e293b' }}>Reset password</h1>
            <p className="mt-1 text-sm" style={{ color: '#64748b' }}>Choose a new password for your account</p>
          </div>

          {apiError && <AlertBanner message={apiError} />}

          {done ? (
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#ecfdf5' }}>
                <Icons.CheckCircle className="w-7 h-7" style={{ color: '#10b981' }} />
              </div>
              <p className="text-sm font-medium" style={{ color: '#374151' }}>Password reset successful</p>
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>You can now sign in with your new password.</p>
              <Link to="/login" className="inline-block mt-4 text-sm font-semibold hover:underline" style={{ color: '#6366f1' }}>Sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>New password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
                    style={{ borderColor: errors.password ? '#ef4444' : '#d1d5db', background: '#ffffff', color: '#111827' }}
                    onFocus={(e) => { if (!errors.password) { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; } }}
                    onBlur={(e) => { e.target.style.borderColor = errors.password ? '#ef4444' : '#d1d5db'; e.target.style.boxShadow = 'none'; }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center" style={{ color: '#9ca3af' }}>
                    {showPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Confirm password</label>
                <input type="password" placeholder="••••••••" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
                  style={{ borderColor: errors.confirmPassword ? '#ef4444' : '#d1d5db', background: '#ffffff', color: '#111827' }}
                  onFocus={(e) => { if (!errors.confirmPassword) { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; } }}
                  onBlur={(e) => { e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#d1d5db'; e.target.style.boxShadow = 'none'; }} />
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.confirmPassword}</p>}
              </div>
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
                {loading ? <><Icons.Loader2 className="w-4 h-4 animate-spin" /><span>Resetting...</span></>
                  : <><Icons.KeyRound className="w-4 h-4" /><span>Reset password</span></>}
              </motion.button>
            </form>
          )}

          <p className="text-center mt-6 text-sm" style={{ color: '#6b7280' }}>
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#6366f1' }}>Back to login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
