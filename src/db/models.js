import mongoose, { model } from 'mongoose';

const ProductsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['books', 'electronics', 'clothing', 'other'],
      default: 'other',
    },
    description: { type: String, required: false },
  },
  { timestamps: true },
);

export const ProductsCollection = model('products', ProductsSchema);
