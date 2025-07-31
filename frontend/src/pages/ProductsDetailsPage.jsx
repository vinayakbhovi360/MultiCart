import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../config/axios";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../redux/slices/cartSlice"; 
import { Minus, Plus } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${id}`);
        setProduct(data);
        const cartItem = cart.find((item) => item._id === data._id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, cart]);

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    const updatedProduct = { ...product, quantity: 1 };
    dispatch(addToCart(updatedProduct));
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      dispatch(decreaseQuantity(product._id));
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      dispatch(removeFromCart(product._id));
      toast.success("Item removed from cart");
      setQuantity(0);
    }
  };


  const aboutProductList = product.aboutProduct.split(/\r\n\r\n/);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
          <img
            src={product.image}
            alt={product.name}
            className="lg:w-1/2 w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="p-6 lg:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-300">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                Category: <span className="font-semibold">{product.category}</span>
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                {aboutProductList.map((item, index) => (
                  <li key={index}>{item.trim()}</li> 
                ))}
              </ul>
              <p className="text-blue-600 text-3xl font-bold mb-4">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full shadow-md">
                <button
                  className="bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                  onClick={handleDecreaseQuantity}
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-semibold px-4">{quantity}</span>
                <button
                  className="bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={quantity > 0 ? handleRemoveFromCart : handleAddToCart}
                className={`${
                  quantity > 0 ? "bg-red-500" : "bg-green-500"
                } text-white px-8 py-3 rounded-lg font-semibold hover:${
                  quantity > 0 ? "bg-red-600" : "bg-green-600"
                } transition-colors duration-300 shadow-lg`}
              >
                {quantity > 0 ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
