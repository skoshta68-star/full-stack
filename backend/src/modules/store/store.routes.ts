import { Router, Response } from 'express';
import { StoreService } from './store.service';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { storeValidation, queryValidation } from '../../middleware/validation.middleware';
import { AuthRequest, UserRole } from '../../types';

const router = Router();

router.get(
  '/',
  authenticate,
  queryValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC' } = req.query;
      const filters = {
        name: req.query.name,
        address: req.query.address,
      };

      const result = await StoreService.getAllStores(
        Number(page),
        Number(limit),
        sortBy as string,
        sortOrder as string,
        filters,
        req.user?.userId
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  '/owner',
  authenticate,
  authorize(UserRole.STORE_OWNER),
  async (req: AuthRequest, res: Response) => {
    try {
      const store = await StoreService.getStoreByOwnerId(req.user!.userId);
      if (!store) {
        res.status(404).json({ message: 'Store not found' });
        return;
      }
      res.json(store);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  '/:id',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const store = await StoreService.getStoreById(
        req.params.id,
        req.user?.userId
      );
      res.json(store);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  storeValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, email, address, ownerId } = req.body;
      const store = await StoreService.createStore(name, email, address, ownerId);
      res.status(201).json(store);
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
      const store = await StoreService.updateStore(req.params.id, req.body);
      res.json(store);
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
      const result = await StoreService.deleteStore(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
