const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  name: String,
  comment: { type: String },
  rating: {
    type: Number,
    required: true,
    min: [0, 'Rating must be 0 or more'],
    max: [5, 'Rating must be 5 or less'],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = {
  Review,
};
