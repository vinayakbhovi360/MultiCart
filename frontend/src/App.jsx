import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, fetchUser } from "./redux/slices/userSlice";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import { getAllProducts } from "./redux/slices/productSlice";
import CartPage from "./pages/CartPage";
import LoadingSpinner from "./pages/LoadingSpinner";
import ProductDetailPage from "./pages/ProductsDetailsPage";
import ShopRegisterPage from "./pages/Shop/ShopRegisterPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App = () => {
  const { message, success, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      dispatch(clearMessage());
    }
  }, [message, success]);

  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log(Backend_url);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {" "}
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/shop/dashboard" element={<ShopDashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="shop/register" element={<ShopRegisterPage />} />
        <Route path="order/details/:id" element={<OrderDetailsPage />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
