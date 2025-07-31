import express from 'express';
import { createOrder, getUserOrders, getOrderById, getAdminOrders, getShopOrders, getOrderDetails, updateOrderStatus } from '../controllers/order-controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import isAuthorized from "../middlewares/isAuthorized.js";
const orderRoutes = express.Router();

// Route to create a new order
orderRoutes.post('/create', isAuthenticated, createOrder);

orderRoutes.get('/admin/orders', getAdminOrders);
orderRoutes.get('/shop/orders',isAuthenticated, isAuthorized(["shop"]), getShopOrders);
orderRoutes.get('/user/orders', isAuthenticated, getUserOrders);
// Route to get a specific order by ID
orderRoutes.get('/:id', isAuthenticated, getOrderById);
orderRoutes.get("/details/:id", getOrderDetails);
orderRoutes.put("/update/:id",updateOrderStatus);

export default orderRoutes;
