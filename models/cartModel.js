const mongoose = require('mongoose');
const { validate } = require('./userModel');

const cartSchema = new mongoose.Schema(
  {
    cartitems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        color: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
          validate() {
            if (this.quantity <= 0) {
              throw new Error('Quantity must be greater than 0');
            }
          },
        },
        price: {
          type: Number,
        },
        priceafterdiscount: {
          type: Number,
        },
      },
    ],

    totalprice: {
      type: Number,
    },
    totalafterdiscount: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
cartSchema.pre('save', async function (next) {
  try {
    if (this.cartitems.length === 0) {
      this.totalprice = 0;
      this.totalafterdiscount = 0;
    } else {
      this.totalprice = this.cartitems.reduce(
        (acc, item) => acc + item.price,
        0
      );
      this.totalafterdiscount = this.totalprice - this.totalprice * 0;
    }
    next();
  } catch (e) {
    next(e);
  }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart };
