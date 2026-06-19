import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const userValidation = [
  body('name')
    .isLength({ min: 3, max: 60 })
    .withMessage('Name must be between 3 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least one uppercase letter and one special character'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must be less than 400 characters'),
  validate,
];

export const loginValidation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

export const ratingValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  validate,
];

export const storeValidation = [
  body('name')
    .isLength({ min: 3, max: 60 })
    .withMessage('Name must be between 3 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must be less than 400 characters'),
  body('ownerId')
    .notEmpty()
    .withMessage('Owner ID is required'),
  validate,
];

export const queryValidation = [
  query('sortBy')
    .optional()
    .isIn(['name', 'email', 'address', 'role', 'createdAt'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['ASC', 'DESC'])
    .withMessage('Sort order must be ASC or DESC'),
  validate,
];
