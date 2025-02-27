import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    console.log(credentials,"credentials");
    
    const response = await axios.post(
      "http://localhost:3002/api/v1/user/login",
      credentials
    );
    return response.data;
  }
);
export const signupUser = createAsyncThunk(
  "auth/signUser",
  async (signupCredentials) => {
    console.log(signupCredentials,"signupCredentials");
    
    const response = await axios.post(
      "http://localhost:3002/api/v1/user/signup",
      signupCredentials
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;      
      localStorage.setItem("authToken", action.payload.user.token);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = "Login Failed";
    });


    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.user = action.payload.user;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
