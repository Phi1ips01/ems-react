import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/userAPI";

const initialState = {
  showUserData: [],
  messageStatus: "idle",
  messageData: [],
  status: "idle",
  error: null,
  userId: "",
};

export const showUserThunk = createAsyncThunk("user/show", async (payload) => {
  const response = await UserAPI().showOneUser(payload);
  return response.data.response;
});
export const showMessageThunk = createAsyncThunk(
  "user/showMessage",
  async (userId) => {
    const response = await UserAPI().showOneUserMessageApi(userId);
    return response.data.response;
  }
);
export const applyLeaveThunk = createAsyncThunk(
  "user/applyLeave",
  async ({ userId, ...payload }) => {
    const response = await UserAPI().applyLeaveApi(userId, payload);
    return response.data.response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showUserThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(showUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showUserData = action.payload;
      })
      .addCase(showUserThunk.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(showMessageThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(showMessageThunk.fulfilled, (state, action) => {
        state.messageStatus = "succeeded";
        state.messageData = action.payload;
      })
      .addCase(showMessageThunk.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(applyLeaveThunk.pending, (state, action) => {
        state.status = "loading";
        state.messageStatus = "loading";
      })
      .addCase(applyLeaveThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messageData.unshift(action.payload);
      })

      .addCase(applyLeaveThunk.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
