import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { data: user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(addToCart(cart.find((item) => item._id === productId)));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handlePayment = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { data } = await axios.post(`${server}/payment/order`, {
      amount: totalPrice,
    });

    const options = {
      key: "rzp_test_vvd8IBODCOV4aB",
      amount: data.amount,
      currency: "INR",
      name: "MultiCart",
      description: "Thank you for your purchase",
      order_id: data.id,
      handler: async function (response) {
        const paymentData = {
          orderCreationId: data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const verifyRes = await axios.post(
          `${server}/payment/verify`,
          paymentData
        );

        if (verifyRes.data.success) {
          const cleanedCart = cart.map((item) => {
            const { aboutProduct, user_details, ...rest } = item;
            return {
              productId: item._id,
              ...rest,
            };
          });

          const orderDetails = {
            items: cleanedCart,
            totalAmount: totalPrice,
            paymentId: response.razorpay_payment_id,
            vanderUserId: cart[0].user_details._id,
          };

          await axios.post(`${server}/order/create`, orderDetails, {
            withCredentials: true,
          });

          dispatch(clearCart());
          toast.success("Payment successful and order placed!");
          navigate("/");
        } else {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.originalPrice,
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Your Cart</h2>
      </div>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600 p-6">
          Your cart is empty!
        </p>
      ) : (
        <div className="p-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    Sold by: {item.user_details?.name}
                  </p>
                  <span className="text-blue-600 font-bold">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6 font-bold text-xl">
            <span>Total Price:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out text-lg font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
