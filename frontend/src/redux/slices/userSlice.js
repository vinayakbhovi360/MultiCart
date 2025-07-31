import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";

const initialState = {
  success: false,
  loading: true,
  data: {},
  errors: [],
  isAuthenticated: false,
  message: "",
  adminUsers: [],
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ form, resetForm }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post("/user/register", form, config);
      console.log(response.data);
      resetForm();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); //
    }
  }
);

export const activateUser = createAsyncThunk(
  "user/activateUser",
  async (activation_token, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/activate", { activation_token });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ formData, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", formData, {
        withCredentials: true,
      });
      resetForm();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/get`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/user/avatar", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error response:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({ formData, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/user/password", formData, {
        withCredentials: true,
      });

      resetForm();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/user/update", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createShop = createAsyncThunk(
  "user/createShop",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put("/user/shop/register", formData, {
        withCredentials: true,
      });
      dispatch(userLogout());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/admin/users", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })

      // activate user
      .addCase(activateUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.data = {};
        state.isAuthenticated = false;
        state.message = "";
        state.errors = [];
      })

      //login user
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })

      // fetch user
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })

      // logout user
      .addCase(userLogout.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })

      // update avatar
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.success = action.payload.success;
        state.data = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })

      // update password
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      // .addCase(updateUserPassword.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      // update user
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      // create Shop

      .addCase(createShop.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.data = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(createShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.adminUsers = action.payload.data.users;
        state.loading = false;
        state.message = action.payload.message;
        state.errors = [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.success = action.payload.success;
        state.adminUsers = [];
        state.loading = false;
        state.message = action.payload.message;
        state.errors = action.payload.errors;
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
