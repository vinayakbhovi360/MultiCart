import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, ClipboardList, Users } from 'lucide-react';
import axios from '../../../config/axios';


const ShopDashboard = () => {
  const [shopData, setShopData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    uniqueCustomers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get('/user/shop/dashboard', {
            withCredentials: true,
          });
        console.log(response)
        setShopData(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching shop data');
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Shop Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Package className="h-12 w-12 text-blue-500" />
          <div>
            <p className="text-2xl font-semibold">{shopData.totalProducts}</p>
            <p className="text-gray-600">Total Products</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ShoppingCart className="h-12 w-12 text-green-500" />
          <div>
            <p className="text-2xl font-semibold">{shopData.totalOrders}</p>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ClipboardList className="h-12 w-12 text-red-500" />
          <div>
            <p className="text-2xl font-semibold">{shopData.pendingOrders}</p>
            <p className="text-gray-600">Pending Orders</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Users className="h-12 w-12 text-purple-500" />
          <div>
            <p className="text-2xl font-semibold">{shopData.uniqueCustomers}</p>
            <p className="text-gray-600">Unique Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
