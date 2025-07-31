import { Order } from '../models/order-model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from 'mongoose'; 

// Controller to create a new order
export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, paymentId, vanderUserId } = req.body;

  if (!items || !totalAmount || !paymentId || !vanderUserId) {
    throw new ApiError("Missing required fields", 400);
  }

  const order = new Order({
    items,
    totalAmount,
    paymentId,
    userId: req.id, 
    vanderUserId,
  });

  await order.save();

  res.status(201).json(new ApiResponse(201, { order }, "Order created successfully"));
});

// Controller to get all orders for the admin
export const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders || orders.length === 0) {
    return res.status(200).json(new ApiResponse(200, { orders: [] }, "No orders found "));
  }
  res.status(200).json(new ApiResponse(200, { orders }, "Orders fetched successfully"));
});

// Controller to get all orders for a specific shop
export const getShopOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ vanderUserId : req.id });

  if (!orders || orders.length === 0) {
    return res.status(200).json(new ApiResponse(200, { orders: [] }, "No orders found for this shop"));
  }

  res.status(200).json(new ApiResponse(200, { orders }, "Shop orders fetched successfully"));
});

// Controller to get all orders for a specific user
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.id });

  if (!orders || orders.length === 0) {
    return res.status(200).json(new ApiResponse(200, { orders: [] }, "No orders found for this user"));
  }

  res.status(200).json(new ApiResponse(200, { orders }, "User orders fetched successfully"));
});

// Controller to get a specific order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('items.productId', 'name price');

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  res.status(200).json(new ApiResponse(200, { order }, "Order fetched successfully"));
});



export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Order ID' });
    }

    const order = await Order.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'vanderUserId',
          foreignField: '_id',
          as: 'vanderUserDetails',
        },
      },
      {
        $project: {
          status: 1,
          totalAmount: 1,
          createdAt: 1,
          paymentId: 1,
          items: 1,
          userDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$userDetails',
                  as: 'user',
                  cond: { $ne: ['$$user', null] }, 
                },
              },
              0,
            ],
          }, 
          vanderUserDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$vanderUserDetails',
                  as: 'vendor',
                  cond: { $ne: ['$$vendor', null] }, 
                },
              },
              0,
            ],
          }, 
        },
      },
      {
        $project: {
          status: 1,
          totalAmount: 1,
          createdAt: 1,
          paymentId: 1,
          items: 1,
          'userDetails.name': 1, 
          'userDetails.address': 1, 
          'userDetails.pinCode': 1, 
          'userDetails.email': 1, 
          'userDetails.phoneNumber' : 1,
          'vanderUserDetails.name': 1, 
          'vanderUserDetails.address': 1, 
          'vanderUserDetails.pinCode': 1, 
          'vanderUserDetails.email': 1, 
          'vanderUserDetails.phoneNumber' : 1,
        },
      },
    ]);

    if (!order || order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order: order[0] }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    console.log(orderId)

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    order.status = status;
    await order.save(); 

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};