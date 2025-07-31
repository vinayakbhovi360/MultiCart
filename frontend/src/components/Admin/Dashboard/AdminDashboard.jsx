import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, ClipboardList, Store, Users } from 'lucide-react';
import axios from '../../../config/axios';


const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({
    totalUsers: 0,
    totalShops: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('user/admin/dashboard', {
          withCredentials: true,
        });
        console.log(response);
        setAdminData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching admin dashboard data');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Users className="h-12 w-12 text-blue-500" />
          <div>
            <p className="text-2xl font-semibold">{adminData.totalUsers}</p>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        {/* Total Shops */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Store className="h-12 w-12 text-green-500" />
          <div>
            <p className="text-2xl font-semibold">{adminData.totalShops}</p>
            <p className="text-gray-600">Total Shops</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Package className="h-12 w-12 text-yellow-500" />
          <div>
            <p className="text-2xl font-semibold">{adminData.totalProducts}</p>
            <p className="text-gray-600">Total Products</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ShoppingCart className="h-12 w-12 text-purple-500" />
          <div>
            <p className="text-2xl font-semibold">{adminData.totalOrders}</p>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ClipboardList className="h-12 w-12 text-red-500" />
          <div>
            <p className="text-2xl font-semibold">{adminData.pendingOrders}</p>
            <p className="text-gray-600">Pending Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
