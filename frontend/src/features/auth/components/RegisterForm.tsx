import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../../../components/common/Icons';
import { Toast } from '../../../components/shared/Toast';
import { useToast } from '../../../hooks/useToast';
import { FormField } from '../../../components/shared/FormField';

interface Props {
  form: { name: string; email: string; password: string; address: string };
  errors: Record<string, string>;
  apiError: string;
  loading: boolean;
  showPassword: boolean;
  onChange: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
}

export const RegisterForm: React.FC<Props> = ({ form, errors, apiError, loading, showPassword, onChange, onSubmit, onTogglePassword }) => {
  const { toasts, removeToast, showError } = useToast();
  useEffect(() => { if (apiError) showError('Registration Failed', apiError); }, [apiError]);
  return (
  <div className="w-full lg:w-[44%] flex items-center justify-center px-5 py-5 bg-[#f0eaf8]">
    <Toast toasts={toasts} onRemove={removeToast} />
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-[460px] bg-white rounded-2xl px-10 py-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
          <Icons.Rocket className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-[22px] font-bold" style={{ color: '#1e293b' }}>Create Account</h1>
        <p className="text-[13px] mt-1" style={{ color: '#64748b' }}>Join our store rating community</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {([
          { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        ] as const).map(({ key, label, type, placeholder }) => (
          <FormField key={key} label={label} error={errors[key]}>
            <input type={type} placeholder={placeholder} value={form[key]}
              onChange={(e) => onChange({ ...form, [key]: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-[13px] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#1e293b' }} />
          </FormField>
        ))}
        <FormField label="Password" error={errors.password}>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password}
              onChange={(e) => onChange({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-[13px] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#1e293b' }} />
            <button type="button" onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }}>
              {showPassword ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
        <FormField label="Address" error={errors.address}>
          <textarea rows={2} maxLength={400} placeholder="Enter your address" value={form.address}
            onChange={(e) => onChange({ ...form, address: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-lg text-[13px] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
            style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#1e293b' }} />
        </FormField>
        <motion.button type="submit" disabled={loading}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl text-[14px] font-semibold text-white flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
          {loading ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <Icons.Sparkles className="w-4 h-4" />}
          <span>{loading ? 'Creating account...' : 'Create Account'}</span>
        </motion.button>
      </form>
      <p className="text-center mt-6 text-[13px]" style={{ color: '#64748b' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-semibold hover:underline" style={{ color: '#6366f1' }}>Sign In</Link>
      </p>
    </motion.div>
  </div>
);}
