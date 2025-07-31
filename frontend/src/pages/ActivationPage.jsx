import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { activateUser } from "../redux/slices/userSlice";
import LoadingSpinner from "./LoadingSpinner";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const { success, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      dispatch(activateUser(activation_token));
    }
  }, [activation_token, dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {success ? (
          <p className="text-green-500 text-xl font-semibold">
            Your account has been created successfully! Redirecting to login...
          </p>
        ) : (
          <p className="text-red-500 text-xl font-semibold">
            Your token has expired!
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
