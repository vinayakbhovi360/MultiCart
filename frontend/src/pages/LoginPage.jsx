import React from "react";
import Login from "../components/Login/Login"; 
import { Lock } from "lucide-react"; 

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-indigo-600" /> 
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Login to Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your credentials
          </p>
        </div>
        <Login /> 
      </div>
    </div>
  );
};

export default LoginPage;
