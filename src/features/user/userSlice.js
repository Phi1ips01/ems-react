import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/userAPI'

const initialState = {
    showUserData:[],

    status: 'idle',
    error: null,
    userId:'',

}

export const showUserThunk = createAsyncThunk('user/show', async (payload) => {
  const response = await UserAPI().showOneUser(payload);
  console.log("userslice ",response)
    return response.data.response;
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.showUserData = action.payload;
      })
  },
});

export default userSlice.reducer;
