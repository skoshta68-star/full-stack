import mongoose, { Schema, Document, model, Types } from 'mongoose';

export interface IStoreDocument extends Document {
  name: string;
  email: string;
  address: string;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<IStoreDocument>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 400,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

storeSchema.index({ email: 1 }, { unique: true });

const Store = model<IStoreDocument>('Store', storeSchema);
export default Store;
