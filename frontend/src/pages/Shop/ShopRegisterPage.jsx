import React from "react";

import { UserPlus } from "lucide-react";
import ShopRegister from "../../components/shop/Register/ShopRegister";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const { data : user } = useSelector((state) => state.user )
    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Shop
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and start your journey today
          </p>
        </div>
        <ShopRegister/>

      </div>
    </div>
  );
};

export default RegisterPage;
