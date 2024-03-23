import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {showUser,updateUser} from '../../api/userAPI'

const initialState = {
    showUserData:[],

    status: 'idle',
    error: null,
    userId:'',

}

export const showUserThunk = createAsyncThunk('user/show', async () => {
    const response = await showUser();
    return response.data;
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.showUserData = action.payload.response;
      })
  },
});

export default userSlice.reducer;
