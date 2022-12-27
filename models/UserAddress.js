const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
});

const UserAddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      username: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        tinh: {
          type: Object,
          required: true,
        },
        quan: {
          type: Object,
          required: true,
        },
        xa: {
          type: Object,
          required: true,
        },
        mota: {
          type: String,
          required: true,
        },
      },
      geolocation: {
        type: pointSchema,
      },
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("UserAddress", UserAddressSchema);
