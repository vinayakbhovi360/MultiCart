import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Form/InputField";
import PasswordField from "../Form/PasswordField";
import AvatarUpload from "../Form/AvatarUpload";
import TextAreaField from "../Form/TextAreaField";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { runClientValidations } from "../../validationUtils";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
    file: null,
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [errorHandlers, setErrorHandlers] = useState({});
  const dispatch = useDispatch();
  const { errors, success } = useSelector((state) => state.user);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      pinCode: "",
      file: null,
      password: "",
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = runClientValidations(formData);
    if (Object.keys(clientErrors).length) {
      setErrorHandlers(clientErrors);
      return;
    }
    setErrorHandlers({});

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    dispatch(registerUser({ form, resetForm }));
  };

  const handleFileInputChange = (e) =>
    setFormData({ ...formData, file: e.target.files[0] });

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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={errorHandlers.name}
        autoComplete="name"
      />

      <InputField
        id="email"
        label="Email Address"
        type="text"
        value={formData.email}
        onChange={handleChange}
        error={errorHandlers.email}
        autoComplete="email"
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

      <PasswordField
        id="password"
        value={formData.password}
        onChange={handleChange}
        error={errorHandlers.password}
        visible={visible}
        setVisible={setVisible}
        autoComplete="new-password"
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
        autoComplete="address-line1"
      />

      <AvatarUpload
        avatar={formData.file}
        onFileChange={handleFileInputChange}
      />

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Register
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
