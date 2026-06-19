import mongoose from 'mongoose';
import Rating from './rating.model';
import Store from '../store/store.model';
import User from '../user/user.model';

export class RatingService {
  static async submitRating(userId: string, storeId: string, rating: number) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new Error('Store not found');
    }

    const store = await Store.findById(storeId);
    if (!store) {
      throw new Error('Store not found');
    }

    const existingRating = await Rating.findOne({ userId, storeId });
    if (existingRating) {
      throw new Error('You have already rated this store. Use update instead.');
    }

    const newRating = await Rating.create({
      userId,
      storeId,
      rating,
    });

    return newRating.toObject();
  }

  static async updateRating(
    userId: string,
    storeId: string,
    rating: number
  ) {
    const existingRating = await Rating.findOne({ userId, storeId });
    if (!existingRating) {
      throw new Error('No existing rating found. Please submit a new rating.');
    }

    existingRating.rating = rating;
    await existingRating.save();
    return existingRating.toObject();
  }

  static async getStoreRatings(storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return [];
    }

    const ratings = await Rating.find({ storeId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return ratings.map(rating => ({
      ...rating,
      id: rating._id.toString(),
    }));
  }

  static async getUserRatings(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }

    const ratings = await Rating.find({ userId })
      .populate('storeId', 'name address')
      .sort({ createdAt: -1 })
      .lean();

    return ratings.map(rating => ({
      ...rating,
      id: rating._id.toString(),
    }));
  }

  static async deleteRating(userId: string, storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(storeId)) {
      throw new Error('Rating not found');
    }

    const rating = await Rating.findOneAndDelete({ userId, storeId });
    if (!rating) {
      throw new Error('Rating not found');
    }

    return { message: 'Rating deleted successfully' };
  }
}
