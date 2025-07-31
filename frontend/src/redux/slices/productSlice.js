import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";

const initialState = {
  success: false,
  loading: true,
  data: {
    products: [],
    shopProducts: [],
    setCategory: "",
  },
  errors: [],
  message: "",
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ form, resetForm }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post("/product/create", form, config);
      resetForm();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productsByShop = createAsyncThunk(
  "product/productsByShop",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get("/product/byshop", config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/product/all");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductsMessage: (state) => {
      state.message = "";
    },
    setCategory: (state, action) => {
      state.data.setCategory = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.products.push(action.payload.data);
        state.data.shopProducts.push(action.payload.data);
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      // Get products by shop
      .addCase(productsByShop.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.shopProducts = action.payload.data.products;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(productsByShop.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data.products = [];
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      // Get all products
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data.products = action.payload.data.products;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      });
  },
});

export const { clearProductsMessage, setCategory } = productSlice.actions;
export default productSlice.reducer;
