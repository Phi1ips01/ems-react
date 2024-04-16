import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice'
import loginReducer from '../features/login/loginSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    auth: loginReducer,
  }
});

export default store;
