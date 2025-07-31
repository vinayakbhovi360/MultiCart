import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, updateUserInfo } from "../../redux/slices/userSlice";
import { runClientValidations } from "../../validationUtils";
import { User, Camera } from "lucide-react";
import InputField from "../Form/InputField";
import TextAreaField from "../Form/TextAreaField";
import AvatarUpdate from "../Form/AvatarUpdate";

const UserProfileForm = () => {
  const { errors, data: user } = useSelector((state) => state.user);
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

    // const form = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   form.append(key, value);
    // });

    dispatch(updateUserInfo(formData));
  };

  const handleImage = async (e) => {
    const avatar = e.target.files[0];
    if (!avatar) return;
    const formData = new FormData();
    formData.append("file", avatar);
    dispatch(updateAvatar(formData));
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
          <User className="w-6 h-6 mr-2" />
          Edit Profile
        </h2>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>

        <AvatarUpdate avatarSrc={user.avatar} onImageChange={handleImage} />

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
            value={formData.email}
            onChange={handleChange}
            error={errorHandlers.email}
            autoComplete="name"
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

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
