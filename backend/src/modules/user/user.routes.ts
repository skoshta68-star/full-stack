import { Router, Response } from 'express';
import { UserService } from './user.service';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { userValidation, queryValidation } from '../../middleware/validation.middleware';
import { AuthRequest, UserRole } from '../../types';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  queryValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC' } = req.query;
      const filters = {
        name: req.query.name,
        email: req.query.email,
        address: req.query.address,
        role: req.query.role,
      };

      const result = await UserService.getAllUsers(
        Number(page),
        Number(limit),
        sortBy as string,
        sortOrder as string,
        filters
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  '/stats',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req: AuthRequest, res: Response) => {
    try {
      const stats = await UserService.getUserStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  userValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, email, password, address, role } = req.body;
      const user = await UserService.createUser(name, email, password, address, role);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  async (req: AuthRequest, res: Response) => {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
