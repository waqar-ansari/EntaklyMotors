import { editProfile, getProfile } from "@/app/api/profileApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const fetchProfile = createAsyncThunk("profile/getProfile", async (user_id) => {
  
  const data = await getProfile(user_id);
  return data;
});

export const updateProfile = createAsyncThunk(
  "profile/editProfile",
  async (profileData,{ dispatch }) => {
    const data = await editProfile(profileData);
    dispatch(fetchProfile({ user_id: profileData.user_id }));
    return data;
  }
);
const initialState ={
  fullname: "",
  phonenumber: {
    countryCode: "",
    number: "",
  },
  email: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  loading: false,
  error: null,
}
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      return { ...state, ...action.payload };
    },
    clearProfile() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        
        state.loading = false;
        state.fullname = action.payload.data.full_name;
        state.phonenumber = action.payload.data.phone_number;
        state.email = action.payload.data.email;
        state.address = action.payload.data.address;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        return { ...state, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
