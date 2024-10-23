import { model, Schema } from 'mongoose';

const ProductsSchema = new Schema(
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
