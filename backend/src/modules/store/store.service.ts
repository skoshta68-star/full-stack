import mongoose from 'mongoose';
import Store from './store.model';
import Rating from '../rating/rating.model';
import User from '../user/user.model';

export class StoreService {
  static async getAllStores(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: string = 'ASC',
    filters: any = {},
    userId?: string
  ) {
    const offset = (page - 1) * limit;
    const where: any = {};

    if (filters.name) where.name = { $regex: filters.name, $options: 'i' };
    if (filters.address) where.address = { $regex: filters.address, $options: 'i' };

    const total = await Store.countDocuments(where);
    const stores = await Store.find(where)
      .populate('ownerId', 'name email')
      .sort({ [sortBy]: sortOrder === 'ASC' ? 1 : -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    const storeIds = stores.map(store => store._id);
    const ratings = await Rating.find({ storeId: { $in: storeIds } }).lean();

    const ratingsByStore = ratings.reduce((acc: any, rate) => {
      const key = rate.storeId.toString();
      acc[key] = acc[key] || [];
      acc[key].push(rate);
      return acc;
    }, {} as Record<string, any[]>);

    const storesWithRating = stores.map((store: any) => {
      const storeRatings = ratingsByStore[store._id.toString()] || [];
      const overallRating =
        storeRatings.length > 0
          ? storeRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / storeRatings.length
          : 0;

      const userRating = userId
        ? storeRatings.find((r: any) => r.userId?.toString() === userId)?.rating || null
        : null;

      const owner = store.ownerId;
      return {
        id: store._id.toString(),
        name: store.name,
        email: store.email,
        address: store.address,
        ownerId: owner ? (owner._id ? owner._id.toString() : owner.toString()) : null,
        ownerName: owner?.name || null,
        overallRating: Math.round(overallRating * 10) / 10,
        userRating,
      };
    });

    return {
      stores: storesWithRating,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getStoreById(id: string, userId?: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Store not found');
    }

    const store = await Store.findById(id).lean();
    if (!store) {
      throw new Error('Store not found');
    }

    const ratings = await Rating.find({ storeId: store._id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const overallRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

    const userRating = userId
        ? ratings.find((r: any) => r.userId.toString() === userId)?.rating || null
        : null;

    return {
      id: store._id.toString(),
      name: store.name,
      email: store.email,
      address: store.address,
      overallRating: Math.round(overallRating * 10) / 10,
      userRating,
      ratings: ratings.map((r: any) => ({
        id: r._id.toString(),
        rating: r.rating,
        user: r.userId?._id ? { id: r.userId._id.toString(), name: r.userId.name, email: r.userId.email } : null,
        createdAt: r.createdAt,
      })),
    };
  }

  static async createStore(
    name: string,
    email: string,
    address: string,
    ownerId: string
  ) {
    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      throw new Error('Store with this email already exists');
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    return store.toObject();
  }

  static async updateStore(
    id: string,
    data: Partial<{ name: string; email: string; address: string }>
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Store not found');
    }

    const store = await Store.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!store) {
      throw new Error('Store not found');
    }

    return store.toObject();
  }

  static async deleteStore(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Store not found');
    }

    const store = await Store.findByIdAndDelete(id);
    if (!store) {
      throw new Error('Store not found');
    }

    await Rating.deleteMany({ storeId: store._id });
    return { message: 'Store deleted successfully' };
  }

  static async getStoreByOwnerId(ownerId: string) {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return null;
    }

    const store = await Store.findOne({ ownerId }).lean();
    if (!store) {
      return null;
    }

    const ratings = await Rating.find({ storeId: store._id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const overallRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

    return {
      id: store._id.toString(),
      name: store.name,
      email: store.email,
      address: store.address,
      overallRating: Math.round(overallRating * 10) / 10,
      totalRatings: ratings.length,
      ratings: ratings.map((r: any) => ({
        id: r._id.toString(),
        rating: r.rating,
        user: r.userId ? { id: r.userId._id.toString(), name: r.userId.name, email: r.userId.email } : null,
        createdAt: r.createdAt,
      })),
    };
  }
}
