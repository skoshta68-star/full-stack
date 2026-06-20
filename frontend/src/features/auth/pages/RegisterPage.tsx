import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRegister } from '../hooks/useRegister';
import { IllustrationPanel } from '../components/IllustrationPanel';
import { RegisterForm } from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { form, setForm, errors, apiError, loading, showPassword, setShowPassword, handleSubmit } = useRegister();

  useEffect(() => { if (isAuthenticated) navigate('/', { replace: true }); }, [isAuthenticated, navigate]);

  return (
    <div className="h-full flex flex-col bg-[#f0eaf8]">
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
        <IllustrationPanel />
        <RegisterForm
          form={form} errors={errors} apiError={apiError} loading={loading} showPassword={showPassword}
          onChange={setForm} onSubmit={handleSubmit} onTogglePassword={() => setShowPassword(!showPassword)} />
      </div>
    </div>
  );
};

export default RegisterPage;
