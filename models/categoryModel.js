const mongoose = require('mongoose');
const slugify = require('slugify');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: [true, 'this Category already exist'],
      minlength: [3, 'too short name'],
      lowercase: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
categorySchema.pre('save', async function (next) {
  try {
    if (this.name) {
      this.slug = slugify(this.name, { lowercase: true });
    }
    next();
  } catch (e) {
    next(e);
  }
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
