import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addAdmin,deleteAdmin,showAllAdmin,updateAdmin} from '../../api/adminApi'

const initialState = {
    showAllAdminData:[],
    addedUserData:[],
    deletedUserData:[],
    updatedUserData:[],
    status: 'idle',
    error: null,
    userId:'',

}

export const showAllUsersThunk = createAsyncThunk('admin/showall', async () => {
    const response = await showAllAdmin();
    return response.data;
  });

export const addNewUserThunk = createAsyncThunk('admin/add', async (payload) => {
  const response = await addAdmin(payload);
  console.log("successfully added thunk",response.data.response)
  showAllUsersThunk()
  return response.data.response;
});
export const deleteUserThunk = createAsyncThunk('admin/delete',async(userId)=>{
  deleteAdmin(userId)
  showAllUsersThunk()
  return userId
})
export const updateUserThunk = createAsyncThunk('admin/update',async(payload)=>{
  const response = updateAdmin(payload)
  console.log("thi]unk",response)
  return response

})
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAllUsersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.showAllAdminData = action.payload.response;
      })
      .addCase(addNewUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addedUserData = action.payload.response;
        state.showAllAdminData.push(action.payload);
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("action.paload",action.payload)
        state.showAllAdminData = state.showAllAdminData.filter(
          (user) => user._id !== action.payload.userId
        );
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload; // Assuming action.payload is the updated user object
        state.showAllAdminData = state.showAllAdminData.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
        );
    });
  },
});

export default adminSlice.reducer;
