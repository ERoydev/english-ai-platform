import {createSlice} from '@reduxjs/toolkit';
import { userLogin } from './authActions';


const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      logout: (state) => {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = null;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
          })
          .addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload.user;
            state.userToken = payload.token;
            state.success = true;
            state.isAuthenticated = true;
          })
          .addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.isAuthenticated = false;
          });
    },
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;