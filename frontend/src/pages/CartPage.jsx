import React from "react";
import Cart from "../components/Cart/Cart";
import OrderDetails from "../components/Cart/OrderDetails";
import Navbar from "../components/Layout/Navbar";

const CartPage = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row min-h-screen p-6 bg-gray-50">
 
      <div className="md:w-1/2 md:mr-4 mb-6 md:mb-0">
        <OrderDetails />
      </div>

 
      <div className="md:w-1/2 md:ml-4">
        <Cart />
      </div>
    </div>
    </>
  );
};

export default CartPage;
