const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Too short product title'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Too short product description'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be positive'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount must be positive'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, 'Sold cannot be negative'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },

    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    images: [
      {
        type: Object,
      },
    ],
    colors: [String],
    sizes: [String],
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be 0 or more'],
      max: [5, 'Rating must be 5 or less'],
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);
// productSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'productid',
// });
// productSchema.set('toObject', {
//   virtuals: true,
// });
// productSchema.set('toJSON', {
//   virtuals: true,
// });
const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
