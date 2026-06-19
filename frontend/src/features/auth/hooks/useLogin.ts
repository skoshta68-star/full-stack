import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { authApi } from '../api/auth.api';
import { validateLogin } from '../validation/auth.validation';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleQuickLogin = (email: string, password: string) => setFormData({ email, password });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const errors = validateLogin(formData.email, formData.password);
    if (Object.keys(errors).length) { setError('All fields required'); return; }
    setLoading(true);
    try {
      const res = await authApi.login({ email: formData.email, password: formData.password });
      login(res.token, res.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, error, loading, showPassword, setShowPassword, rememberMe, setRememberMe, handleSubmit, handleQuickLogin };
}
