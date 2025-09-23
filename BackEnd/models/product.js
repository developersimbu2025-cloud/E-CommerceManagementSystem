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
    originalPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

    reviews: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
