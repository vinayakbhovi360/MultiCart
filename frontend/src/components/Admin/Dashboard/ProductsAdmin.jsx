import React, { useEffect, useState } from "react";
import { Search, ArrowUpDown, Eye, Trash2, Edit3 } from "lucide-react"; 
import { useDispatch, useSelector } from "react-redux";
import {  getAllProducts } from "../../../redux/slices/productSlice"; 
import { useNavigate } from "react-router-dom"; 

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const { data: { products } } = useSelector((state) => state.product);
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name"); 
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(getAllProducts()); 
  }, [dispatch]);

  // Map the product details
  const productDetails = products.map(
    ({ _id: productId, name, category, originalPrice }) => ({
      productId,
      name,
      category,
      originalPrice,
    })
  );

  // Filter and sort logic
  const filteredProducts = productDetails
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue =
        sortKey === "originalPrice"
          ? a.originalPrice
          : sortKey === "category"
          ? a.category.toLowerCase()
          : a.name.toLowerCase();
      const bValue =
        sortKey === "originalPrice"
          ? b.originalPrice
          : sortKey === "category"
          ? b.category.toLowerCase()
          : b.name.toLowerCase();

      return sortOrder === "asc" ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });

  const handleDelete = (id) => {
    console.log(`Product with ID ${id} deleted`);
  };

  const handleEdit = (id) => {
    console.log(`Editing product with ID ${id}`);
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-500 to-indigo-600">
        <h2 className="text-2xl font-bold text-white">All Products (Admin)</h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-600">Sort by:</label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="originalPrice">Original Price</option>
              <option value="category">Category</option>
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

        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  {Object.keys(filteredProducts[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key === 'productId' ? 'ID' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((item) => (
                  <tr key={item.productId}>
                    {Object.keys(item).map((key) => (
                      <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof item[key] === 'number' ? `₹ ${item[key].toFixed(2)}` : item[key]}
                      </td>
                    ))}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleEdit(item.productId)} 
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(item.productId)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
