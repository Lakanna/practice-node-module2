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
  { timestamps: true, versionKey: false },
);

export const categoryType = ['books', 'electronics', 'clothing', 'other'];

ProductsSchema.post('save', (err, data, next) => {
  err.status = 400;
  next();
});

ProductsSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

ProductsSchema.post('findOneAndUpdate', (err, data, next) => {
  err.status = 400;
  next();
});

export const ProductsCollection = model('products', ProductsSchema);
