import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  const { isAuthenticated, data: user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (isAuthenticated) {
    
      navigate("/cart"); 
    } else {
      navigate("/login"); 
    }
  };

  const handleSellerClick = (e) => {
    e.preventDefault(); 

    if (!isAuthenticated) {
      navigate("/login"); 
    } else if (user.role === "shop") {
      navigate("/shop/dashboard");
    } else {
      navigate("/shop/register"); 
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/MultiCart-logo.png"
              alt="Logo"
              className="w-[200px] h-auto"
            />
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/shop/register"
              className="text-white hover:text-gray-300 transition duration-300"
              onClick={handleSellerClick} 
            >
              <span className="flex items-center">
                Seller
                <IoIosArrowForward className="ml-1" />
              </span>
            </Link>

            <button
              className="text-white hover:text-gray-300 transition duration-300 relative"
              onClick={handleCartClick}
            >
              <AiOutlineShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-green-500 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            </button>

            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Profile"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                <CgProfile size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
