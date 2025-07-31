import React, { useState, useEffect } from 'react';
import { ChevronDown, Package, User, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from '../config/axios';
import { useSelector } from 'react-redux';

const OrderDetailsPage = () => {
  const { data: user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`/order/details/${id}`);
        const fetchedOrder = response.data.order;
        setOrder(fetchedOrder);
        setStatus(fetchedOrder.status);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    if (id) {
      fetchOrderData();
    }
  }, [id]);

  const updateOrderStatus = async (newStatus) => {
    try {
      await axios.put(`/order/update/${id}`, { status: newStatus });
      setStatus(newStatus);
      console.log('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const statusOptions = ["processing", "packing", "ready for pickup", "completed"];

  if (!order) {
    return <div>Loading order details...</div>;
  }


  const isUserRoleDefined = user && user.role;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Order Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <Package className="mr-2" /> Order Information
          </h2>
          <p className="text-gray-600"><span className="font-medium">Order ID:</span> {order._id}</p>
          <p className="text-gray-600"><span className="font-medium">Payment ID:</span> {order.paymentId}</p>
          <p className="text-gray-600"><span className="font-medium">Total Amount:</span> ₹{order.totalAmount}</p>
          <p className="text-gray-600"><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
          
          <div className="mt-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                id="status"
                value={status}
                onChange={(e) => updateOrderStatus(e.target.value)}
                disabled={!isUserRoleDefined || user.role === 'user'} 
                className={`block appearance-none w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-base 
                  ${!isUserRoleDefined || user.role === 'user' ? 'bg-gray-200 cursor-not-allowed' : 'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'} 
                  sm:text-sm`}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <User className="mr-2" /> User Details
          </h2>
          <p className="text-gray-600"><span className="font-medium">Name:</span> {order.userDetails.name}</p>
          <p className="text-gray-600"><span className="font-medium">Email:</span> {order.userDetails.email}</p>
          <p className="text-gray-600"><span className="font-medium">Phone:</span> {order.userDetails.phoneNumber}</p>
          <p className="text-gray-600"><span className="font-medium">Address:</span> {order.userDetails.address}</p>
          <p className="text-gray-600"><span className="font-medium">Pincode:</span> {order.userDetails.pinCode}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 transition duration-300 ease-in-out hover:shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Items</h2>
        <ul className="space-y-4">
          {order.items.map(item => (
            <li key={item.productId} className="flex items-center p-4 border rounded-lg bg-gray-50 transition duration-300 ease-in-out hover:bg-gray-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
              <div className="flex-grow">
                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                <p className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                <p className="text-gray-600">Price: <span className="font-medium">₹{item.originalPrice}</span></p>
                <p className="text-gray-600">Category: <span className="font-medium">{item.category}</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Truck className="mr-2" /> Vendor Details
        </h2>
        <p className="text-gray-600"><span className="font-medium">Name:</span> {order.vanderUserDetails.name}</p>
        <p className="text-gray-600"><span className="font-medium">Email:</span> {order.vanderUserDetails.email}</p>
        <p className="text-gray-600"><span className="font-medium">Phone:</span> {order.vanderUserDetails.phoneNumber}</p>
        <p className="text-gray-600"><span className="font-medium">Address:</span> {order.vanderUserDetails.address}</p>
        <p className="text-gray-600"><span className="font-medium">Pincode:</span> {order.vanderUserDetails.pinCode}</p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
