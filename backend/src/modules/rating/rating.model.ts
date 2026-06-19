import mongoose, { Schema, Document, model, Types } from 'mongoose';

export interface IRatingDocument extends Document {
  userId: Types.ObjectId;
  storeId: Types.ObjectId;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<IRatingDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.index({ userId: 1, storeId: 1 }, { unique: true });

const Rating = model<IRatingDocument>('Rating', ratingSchema);
export default Rating;
