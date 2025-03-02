import { editProfile, getProfile } from "@/app/api/profileApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchProfile = createAsyncThunk("profile/getProfile", async () => {
  console.log("fetchprofile called from profileslice");
  
  const data = await getProfile();  
  return data;
});

export const updateProfile = createAsyncThunk(
  "profile/editProfile",
  async (profileData) => {
    console.log(profileData,"profile data before sending to api");
    
    const data = await editProfile(profileData);
    return data;
  }
);

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
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
  },
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
        state.fullname = action.payload.fullname;
        state.phonenumber = action.payload.phonenumber;
        state.email = action.payload.email;
        state.address = action.payload.address;
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
export const { setProfile, clearProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
