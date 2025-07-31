import mongoose from "mongoose";

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      originalPrice: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      category: {
        type: String, // Category of the product
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  vanderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "packing", "ready for pickup", "completed"], 
    default: "processing", 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Order model
export const Order = mongoose.model("Order", OrderSchema);
