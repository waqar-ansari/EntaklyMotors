import api from "@/app/api/axiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loginUser = createAsyncThunk("login", async (credentials) => {
  console.log(credentials, "credentials from login slice");

  const response = await api.post("/login.php", credentials);
  console.log(response.data, "response from login slice");

  return response.data;
});
export const signupUser = createAsyncThunk(
  "register",
  async (signupCredentials) => {
    console.log(signupCredentials, "signupCredentials from register slice");

    const response = await api.post("/register.php", signupCredentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      // localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      // state.token = action.payload.token;
      console.log(action.payload, "action.payload from login slice");
      
      localStorage.setItem("userId", action.payload.User_id);
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
