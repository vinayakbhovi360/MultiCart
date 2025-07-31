import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment-controller.js";

const paymentRoutes = express.Router();

// Route to create Razorpay order
paymentRoutes.post("/order", createOrder);

// Route to verify Razorpay payment
paymentRoutes.post("/verify", verifyPayment);

export default paymentRoutes;
