import { model, Schema } from 'mongoose';
import { handlerError, setValidate } from './hooks.js';

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
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false },
);

export const categoryType = ['books', 'electronics', 'clothing', 'other'];

ProductsSchema.post('save', handlerError);

ProductsSchema.pre('findOneAndUpdate', setValidate);

ProductsSchema.post('findOneAndUpdate', (err, data, next) => {
  err.status = 400;
  next();
});

export const ProductsCollection = model('products', ProductsSchema);
