const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["mobiles", "appliances"], // matches your frontend categories
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: { type: String }, // store image URL/path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
