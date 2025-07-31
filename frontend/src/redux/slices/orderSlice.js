import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';


export const ordersByShop = createAsyncThunk(
  'orders/ordersByShop',
  async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(`/order/shop/orders`, config);
    console.log(response.data)
    return response.data;
  }
);

export const ordersByUser = createAsyncThunk(
  'orders/ordersByUser',
  async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(`order/user/orders`, config);
    console.log(response.data);
    return response.data;
  }
);

export const adminOrders = createAsyncThunk(
  'orders/adminOrders',
  async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(`order/admin/orders`, config);
    console.log(response.data);
    return response.data;
  }
);


export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }) => {
    const response = await axios.put(`/api/orders/${orderId}/status`, { status }); 
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    data: {
      orders: [],
      shopOrders: [],
      adminOrders: [],
    },
    loading: false,
    errors: [],
    success: false, 
    message: '', 
  },
  reducers: {
    clearOrders: (state) => {
      state.data.orders = [];
      state.success = false;
      state.message = '';
    },
    clearMessages: (state) => {
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Shop Orders
      .addCase(ordersByShop.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(ordersByShop.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.shopOrders = action.payload.data.orders;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(ordersByShop.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.data.shopOrders = []; 
        state.errors = action.error.message || action.payload.errors;
        state.message = action.payload?.message || 'Failed to fetch shop orders';
      })

      // Admin Orders
      .addCase(adminOrders.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(adminOrders.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.adminOrders = action.payload.data.orders; 
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(adminOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.data.adminOrders = []; 
        state.errors = action.error.message || action.payload.errors; 
        state.message = action.payload?.message || 'Failed to fetch admin orders'; 
      })

      // User Orders
      .addCase(ordersByUser.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(ordersByUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.orders = action.payload.data.orders;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(ordersByUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.data.orders = [];
        state.errors = action.error.message || action.payload.errors; 
        state.message = action.payload?.message || 'Failed to fetch user orders'; 
      })

      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.data.orders.findIndex(order => order._id === updatedOrder._id); 
        if (index !== -1) {
          state.data.orders = [
            ...state.data.orders.slice(0, index),
            updatedOrder,
            ...state.data.orders.slice(index + 1)
          ]; 
        }
        state.success = true;
        state.message = 'Order status updated successfully!'; 
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message;
        state.success = false;
        state.message = 'Failed to update order status!'; 
      });
  },
});

export const { clearOrders, clearMessages } = orderSlice.actions;
export default orderSlice.reducer;
