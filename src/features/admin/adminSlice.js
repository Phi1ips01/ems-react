import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdminAPI from '../../api/adminApi'

const initialState = {
    showAllAdminData:[],
    showOneAdminData:[],
    addedUserData:[],
    deletedUserData:[],
    updatedUserData:[],
    showAllStatus:'idle',
    showOneStatus: 'idle',
    error: null,
    userId:'',

}
export const showAdminThunk = createAsyncThunk('admin/show', async (payload) => {
  const response = await AdminAPI().showOneAdmin(payload);
  console.log("userslice ",response)
    return response.data.response;
  });
export const showAllUsersThunk = createAsyncThunk('admin/showall', async () => {
    const response = await AdminAPI().showAllAdmin();
    return response.data.response;
  });

export const addNewUserThunk = createAsyncThunk('admin/add', async (payload) => {
  const response = await AdminAPI().addAdmin(payload);
  console.log("successfully added thunk",response.data.response)
  showAllUsersThunk()
  return response.data.response;
});
export const deleteUserThunk = createAsyncThunk('admin/delete',async(userId)=>{
  AdminAPI().deleteAdmin(userId)
  AdminAPI().showAllUsersThunk()
  return userId
})
export const updateUserThunk = createAsyncThunk('admin/update',async(payload)=>{
  const response = AdminAPI().updateAdmin(payload)
  console.log("thi]unk",response)
  return response

})
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(showAllUsersThunk.pending, (state, action) => {
      state.showAllStatus = 'loading';
    })
      .addCase(showAllUsersThunk.fulfilled, (state, action) => {
        state.showAllStatus = 'succeeded';
        state.showAllAdminData = action.payload;
      })
      .addCase(showAdminThunk.pending, (state, action) => {
        state.showOneStatus = 'loading';
      })
      .addCase(showAdminThunk.fulfilled, (state, action) => {
        state.showOneStatus = 'succeeded';
        state.showOneAdminData = action.payload;
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
