// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter product name"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter product description"],
//   },
//   category: {
//     type: String,
//     required: [true, "Please enter product category"],
//   },
//   originalPrice: {
//     type: Number,
//   },
//   image: {
//     type: String,
//   },
//   // reviews: [
//   //   {
//   //     user: {
//   //       type: Object,
//   //     },
//   //     rating: {
//   //       type: Number,
//   //     },
//   //     comment: {
//   //       type: String,
//   //     },
//   //     productId: {
//   //       type: String,
//   //     },
//   //     createdAt: {
//   //       type: Date,
//   //       default: Date.now(),
//   //     },
//   //   },
//   // ],
//   // ratings: {
//   //   type: Number,
//   // },
//   userId: {
//     type: String,
//     required: true,
//   },
//   // shop: {
//   //   type: Object,
//   //   required: true,
//   // },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// export const Product = mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  aboutProduct: {
    type: String,
    required: [true, "Please enter About Product"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  originalPrice: {
    type: Number,
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User",  
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Product = mongoose.model("Product", productSchema);
