import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearProductsMessage } from "../../redux/slices/productSlice";
import { addToCart, decreaseQuantity } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";


const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    message,
    success,
    data: { products, setCategory },
  } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let setShop = "";
  if (
    cart[0] &&
    cart[0].user_details &&
    cart[0].user_details._id !== undefined
  ) {
    setShop = cart[0].user_details._id;
  }

  useEffect(() => {
    if (message) {
      success ? toast.success(message) : toast.error(message);
      dispatch(clearProductsMessage());
    }
  }, [message, success, dispatch]);


  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = setCategory
      ? product.category === setCategory
      : true;
    const matchesShop = setShop ? product.user_details?._id === setShop : true;

    return matchesSearch && matchesCategory && matchesShop;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "price") {
      comparison = a.originalPrice - b.originalPrice;
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item._id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="font-extrabold text-3xl text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Products
          </h1>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={20}
            />
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <select
              className="border-2 border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                sortOrder === "asc"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } shadow-md`}
              onClick={() =>
                setSortOrder((prevOrder) =>
                  prevOrder === "asc" ? "desc" : "asc"
                )
              }
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No products found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => {
              const productQuantity = getProductQuantity(product._id);
              return (
                <div
                  key={product._id}
                  className="flex flex-col bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-xl"
                    />
                  </Link>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Sold by: {product.user_details?.name}
                      </p>
                      <span className="text-lg font-bold text-blue-600">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      {productQuantity > 0 ? (
                        <div className="flex items-center">
                          <button
                            className="bg-red-500 text-white w-8 h-8 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                            onClick={() => handleDecreaseQuantity(product._id)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-lg font-semibold px-2">
                            {productQuantity}
                          </span>
                          <button
                            className="bg-blue-500 text-white w-8 h-8 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                            onClick={() => handleAddToCart(product)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={20} className="mr-2" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
