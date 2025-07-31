import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Form/InputField";
import PasswordField from "../Form/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { runClientValidations } from "../../validationUtils";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [errorHandlers, setErrorHandlers] = useState({});
  const dispatch = useDispatch();
  const { errors, data: user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      email: "",
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
    console.log(formData);

    dispatch(loginUser({ formData, resetForm }));
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="email"
        label="Email Address"
        type="text"
        value={formData.email}
        onChange={handleChange}
        error={errorHandlers.email}
        autoComplete="email"
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

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
