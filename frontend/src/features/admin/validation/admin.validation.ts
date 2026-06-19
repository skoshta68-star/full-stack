export interface ValidationErrors {
  [key: string]: string;
}

export const validateUserForm = (
  name: string, email: string, password: string, address: string, isEditing: boolean
): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (name.length < 20 || name.length > 60) errors.name = 'Name must be between 20 and 60 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
  if (!isEditing && !/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) errors.password = '8-16 chars, 1 uppercase, 1 special char';
  if (address.length > 400) errors.address = 'Max 400 characters';
  return errors;
};

export const validateStoreForm = (
  name: string, email: string, address: string, ownerId: string, isEditing: boolean = false
): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (name.length < 3 || name.length > 60) errors.name = 'Must be 3-60 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
  if (address.length > 400) errors.address = 'Max 400 characters';
  if (!isEditing && !ownerId) errors.ownerId = 'Select owner';
  return errors;
};
