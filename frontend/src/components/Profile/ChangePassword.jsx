import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../redux/slices/userSlice";
import { runClientValidations } from "../../validationUtils";
import { Key } from "lucide-react";
import PasswordField from "../Form/PasswordField";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorHandlers, setErrorHandlers] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { errors, success, data: user ,loading} = useSelector((state) => state.user);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = runClientValidations(formData);
    console.log(clientErrors);
    if (Object.keys(clientErrors).length) {
      setErrorHandlers(clientErrors);
      return;
    }
    setErrorHandlers({});

    // const form = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   form.append(key, value);
    // });

    dispatch(updateUserPassword({formData,resetForm}));
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
    // className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Key className="w-6 h-6 mr-2" /> {/* Key icon */}
          Change Password
        </h2>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <PasswordField
          id="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          error={errorHandlers.oldPassword}
          visible={visible}
          setVisible={setVisible}
          autoComplete="current-password"
        />

        <PasswordField
          id="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          error={errorHandlers.newPassword}
          visible={visible}
          setVisible={setVisible}
          autoComplete="new-password"
        />

        <PasswordField
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errorHandlers.confirmPassword}
          visible={visible}
          setVisible={setVisible}
          autoComplete="new-password"
        />

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
