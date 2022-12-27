const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
    },
    detail: {
      type: String,
      required: true,
    },
    image: [{ image: [{ data: { type: String } }] }],
    varation: [
      {
        count: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    shop: {
      type: Object,
    },
    star: {
      type: Number,
      maximum: 5,
      minimum: 0,
      default: 0,
    },
    priceOld: {
      type: String,
      default: "0",
    },
    sold: {
      type: String,
      default: "0",
    },
    amount: {
      type: String,
      default: "1",
    },
    likes: [],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    tokenEth: {
      type: String,
      default: "",
    },
  },
  { strict: false },
  { timestamps: true }
);

ProductSchema.index({
  "description.trademark": "text",
  name: "text",
  category: "text",
});

module.exports = mongoose.model("Product", ProductSchema);
