export interface ValidationErrors {
  [key: string]: string;
}

export const validateLogin = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';
  return errors;
};

export const validateRegister = (name: string, email: string, password: string, address: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (name.length < 20 || name.length > 60) errors.name = 'Name must be 20-60 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) errors.password = '8-16 chars, 1 uppercase, 1 special character';
  if (address.length > 400) errors.address = 'Max 400 characters';
  return errors;
};

export const validatePasswordChange = (oldPassword: string, newPassword: string, confirmPassword: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!oldPassword) errors.oldPassword = 'Current password is required';
  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(newPassword)) errors.newPassword = '8-16 chars, 1 uppercase, 1 special character';
  if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
};

export const validateForgotPassword = (email: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!email) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
  return errors;
};

export const validateResetPassword = (password: string, confirmPassword: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!password) errors.password = 'Password is required';
  else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) errors.password = '8-16 chars, 1 uppercase, 1 special character';
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';
  return errors;
};
