import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import InputField from "../../Form/InputField";
import TextAreaField from "../../Form/TextAreaField";
import SelectField from "../../Form/SelectField";
import AvatarUpload from "../../Form/AvatarUpload";
import { categoriesData } from "../../../static";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/slices/productSlice";
import { runClientValidations } from "../../../validationUtils";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    aboutProduct: "",
    category: "",
    originalPrice: "",
    file: null,
  });
  const [errorHandlers, setErrorHandlers] = useState({});
  const dispatch = useDispatch();
  const {errors,success} = useSelector((state) => state.product)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create a specific handler for the category field
  const handleCategoryChange = (selectedCategory) => {
    setFormData({ ...formData, category: selectedCategory });
  };
  const handleFileInputChange = (e) =>
    setFormData({ ...formData, file: e.target.files[0] });

  const resetForm = () => {
    setFormData({
      name: "",
      aboutProduct: "",
      category: "",
      originalPrice: "",
      file: null,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = runClientValidations(formData);
    if (Object.keys(clientErrors).length) {
      setErrorHandlers(clientErrors);
      return;
    }
    setErrorHandlers({});
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => { form.append(key, value); });
    dispatch(createProduct({ form,resetForm }))
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <PlusCircle className="w-6 h-6 mr-2" />
          Create Product
        </h2>
      </div>
      <form onSubmit= {handleSubmit} className="p-6 space-y-6">
        <InputField
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errorHandlers.name}
          autoComplete="name"
        />

        <TextAreaField
          id="aboutProduct"
          label="About Product"
          value={formData.aboutProduct}
          onChange={handleChange}
          error={errorHandlers.aboutProduct}
          autoComplete="aboutProduct"
        />

        <SelectField
          id="category"
          label="Category"
          category={formData.category}
          setCategory={handleCategoryChange}
          categoriesData={categoriesData}
          error={errorHandlers.category}
        />

        <InputField
          id="originalPrice"
          label="Original Price"
          value={formData.originalPrice}
          onChange={handleChange}
          error={errorHandlers.originalPrice}
          autoComplete="name"
        />


        <AvatarUpload
          avatar={formData.file}
          onFileChange={handleFileInputChange}
        />
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
