const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
          priceOld: {
            type: String,
            default: "0",
          },
          category: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          indexProduct: {
            type: Number,
            required: true,
            default: 0,
          },
          capacity: {
            type: Object,
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
          sizeInformation: {
            type: Object,
          },
          tokenEth: {
            type: String,
          },
        },
      ],
      totalPrice: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
