import { Router, Response } from 'express';
import { RatingService } from './rating.service';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { ratingValidation } from '../../middleware/validation.middleware';
import { AuthRequest, UserRole } from '../../types';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(UserRole.USER),
  ratingValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { storeId, rating } = req.body;
      const newRating = await RatingService.submitRating(
        req.user!.userId,
        storeId,
        rating
      );
      res.status(201).json(newRating);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  '/:storeId',
  authenticate,
  authorize(UserRole.USER),
  ratingValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { rating } = req.body;
      const storeId = req.params.storeId;
      const updatedRating = await RatingService.updateRating(
        req.user!.userId,
        storeId,
        rating
      );
      res.json(updatedRating);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get(
  '/my-ratings',
  authenticate,
  authorize(UserRole.USER),
  async (req: AuthRequest, res: Response) => {
    try {
      const ratings = await RatingService.getUserRatings(req.user!.userId);
      res.json(ratings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  '/:storeId',
  authenticate,
  authorize(UserRole.USER),
  async (req: AuthRequest, res: Response) => {
    try {
      const result = await RatingService.deleteRating(
        req.user!.userId,
        req.params.storeId
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
