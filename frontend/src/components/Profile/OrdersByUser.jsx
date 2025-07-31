import React, { useEffect, useState } from "react";
import { Search, ArrowUpDown, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ordersByUser } from "../../redux/slices/orderSlice";

const OrdersByUser = () => {
  const dispatch = useDispatch();
  const { data: { orders } } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(ordersByUser()); 
  }, [dispatch]);

  const orderDetails = orders.map(
    ({ _id, status, totalAmount, createdAt }) => ({
      _id,
      status,
      totalAmount,
      createdAt: new Date(createdAt), 
    })
  );

  // Filter and sort logic
  const filteredOrders = orderDetails
    .filter((order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = sortKey === "createdAt" ? new Date(a.createdAt) : a[sortKey];
      const bValue = sortKey === "createdAt" ? new Date(b.createdAt) : b[sortKey];

   
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
        <h2 className="text-2xl font-bold text-white">Your Orders</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-600">Sort by:</label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">Date</option>
              <option value="status">Status</option>
              <option value="totalAmount">Total Amount</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <ArrowUpDown size={20} />
              <span className="text-sm font-medium">
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </span>
            </button>
          </div>
        </div>
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {item.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt.toLocaleString()} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => navigate(`/order/details/${item._id}`)}
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No orders found for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersByUser;
