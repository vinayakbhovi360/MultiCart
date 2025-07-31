import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/slices/userSlice";
import { runClientValidations } from "../../validationUtils";
import { User } from "lucide-react";
import InputField from "../Form/InputField";
import TextAreaField from "../Form/TextAreaField";
import LoadingSpinner from "../../pages/LoadingSpinner";

const OrderDetails = () => {
  const { errors, data: user,loading } = useSelector((state) => state.user);


  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    address: user?.address || "",
    pinCode: user?.pinCode || "",
  });
  const [errorHandlers, setErrorHandlers] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = runClientValidations(formData);
    if (Object.keys(clientErrors).length) {
      setErrorHandlers(clientErrors);
      return;
    }
    setErrorHandlers({});

    dispatch(updateUserInfo(formData));
  };

  useEffect(() => {
    if (errors) {
      const formattedErrors = {};
      errors.forEach((error) => {
        formattedErrors[error.field] = error.msg;
      });
      setErrorHandlers(formattedErrors);
    }
  }, [errors]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <User className="w-6 h-6 mr-2" />
          Shipping Details
        </h2>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={errorHandlers.name}
            autoComplete="name"
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errorHandlers.phoneNumber}
            autoComplete="tel"
          />
        </div>

        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errorHandlers.email}
          autoComplete="email"
        />

        <InputField
          id="pinCode"
          label="Pin Code"
          value={formData.pinCode}
          onChange={handleChange}
          error={errorHandlers.pinCode}
          autoComplete="postal-code"
        />

        <TextAreaField
          id="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          error={errorHandlers.address}
          autoComplete="street-address"
        />

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out text-lg font-semibold"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
