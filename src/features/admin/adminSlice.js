import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminAPI from "../../api/adminApi";

const initialState = {
  showAllAdminData: [],
  deletedUserData: [],
  showOneAdminData: [],
  showAllMessageData: [],
  replyingMessages: [],
  repliedMessages: [],
  showAllDeptsData: [],
  showAllStatus: "idle",
  showAllMessageStatus: "idle",
  showOneStatus: "idle",
  error: null,
  userId: "",
};
export const showAdminThunk = createAsyncThunk(
  "admin/show",
  async (payload) => {
    const response = await AdminAPI().showOneAdmin(payload);
    return response.data.response;
  }
);
export const showAllUsersThunk = createAsyncThunk(
  "admin/showall",
  async ({ searchColumn, searchKeyword }) => {
    try {
      const response = await AdminAPI().showAllAdmin(
        searchColumn,
        searchKeyword
      );
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
);

export const addNewUserThunk = createAsyncThunk(
  "admin/add",
  async (payload) => {
    const response = await AdminAPI().addAdmin(payload);
    showAllUsersThunk();
    return response.data.response;
  }
);
export const deleteUserThunk = createAsyncThunk(
  "admin/delete",
  async (payload) => {
    await AdminAPI().deleteAdmin(payload);
    return payload.userId;
  }
);
export const updateUserThunk = createAsyncThunk(
  "admin/update",
  async (payload) => {
    const response = await AdminAPI().updateAdmin(payload);
    // console.log("thi]unk", response);
    return response.data.response;
  }
);

export const replyMessageThunk = createAsyncThunk(
  "messages/replyMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AdminAPI().updateMessageReplyApi(data);
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const showAllMessagesThunk = createAsyncThunk(
  "admin/showAllMessages",
  async (payload) => {
    const response = await AdminAPI().showAllMessagesApi(payload);
    return response.data.response;
  }
);
export const showAllDeptsThunk = createAsyncThunk(
  "admin/showAllDepts",
  async () => {
    const response = await AdminAPI().showAllDeptsApi();
    return response.data.response;
  }
);
export const addNewDeptThunk = createAsyncThunk(
  "admin/addDept",
  async (payload) => {
    const response = await AdminAPI().addNewDeptApi(payload);
    return response.data.response;
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAllUsersThunk.pending, (state, action) => {
        state.showAllStatus = "loading";
      })
      .addCase(showAllUsersThunk.fulfilled, (state, action) => {
        state.showAllStatus = "succeeded";
        state.showAllAdminData = action.payload;
      })
      .addCase(showAdminThunk.pending, (state, action) => {
        state.showOneStatus = "loading";
      })
      .addCase(showAdminThunk.fulfilled, (state, action) => {
        state.showOneStatus = "succeeded";
        state.showOneAdminData = action.payload;
      })
      .addCase(addNewUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showAllAdminData.unshift(action.payload);
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showAllAdminData = state.showAllAdminData.filter(
          (user) => user._id !== action.payload
        );
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload;
        state.showAllAdminData = state.showAllAdminData.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(replyMessageThunk.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(replyMessageThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const repliedMessage = state.replyingMessages.find(
          (msg) => msg._id === action.payload._id
        );
        if (repliedMessage) {
          state.replyingMessages = state.replyingMessages.filter(
            (msg) => msg._id !== action.payload._id
          );
          state.repliedMessages.unshift(repliedMessage);
        }
      })
      .addCase(replyMessageThunk.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(showAllMessagesThunk.pending, (state, action) => {
        state.messageAllStatus = "loading";
      })
      .addCase(showAllMessagesThunk.fulfilled, (state, action) => {
        state.messageAllStatus = "succeeded";
        state.replyingMessages = action.payload.filter(
          (message) => !message.isReplied
        );
        state.repliedMessages = action.payload.filter(
          (message) => message.isReplied
        );
      })

      .addCase(showAllMessagesThunk.rejected, (state, action) => {
        state.messageAllStatus = "failed";
      })
      .addCase(showAllDeptsThunk.fulfilled, (state, action) => {
        state.messageAllStatus = "succeeded";
        state.showAllDeptsData = action.payload;
      })
      .addCase(addNewDeptThunk.fulfilled, (state, action) => {
        state.showAllDeptsData.push(action.payload);
      });
  },
});

export default adminSlice.reducer;
