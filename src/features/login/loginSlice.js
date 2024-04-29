import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Login from "../../api/login";
import { KEYS } from "../../dataKeys";
import { ROUTES } from "../../Routes.constants";
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAdmin: JSON.parse(localStorage.getItem(KEYS.IS_ADMIN)) || null,
  userId: localStorage.getItem(KEYS.ID) || null,
};

export const signIn = createAsyncThunk("auth/signIn", async (payload) => {
  try {
    console.log("login started");
    const response = await Login().login(payload);
    console.log("token login", response.data.token);
    console.log("token payload", response.data.payload.user);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
});
export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  try {
    localStorage.clear();
    window.location(ROUTES.LOGIN);
    return true;
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.role;
        state.isAdmin = action.payload.isAdmin;
        state.userId = action.payload.id;
        localStorage.setItem(KEYS.ID, action.payload.id);
        localStorage.setItem(KEYS.IS_ADMIN, action.payload.isAdmin);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAdmin = null;
        window.location.reload();
      });
  },
});

export default loginSlice.reducer;
