import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/Auth/AuthService';

interface authParams {
  email: string;
  password: string;
}

interface User {
    id: number,
    email: string,
}

interface AuthResponse {
  token: string;
  user: User
}

// This is Trunc function (action creator) to handle my async code 
export const userLogin = createAsyncThunk<
  AuthResponse, 
  authParams, 
  { rejectValue: string }
>(
  'auth/login/',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userData = await authService.login({ email, password });
      // Two factor verification => test token after login
      const tokenTestData = await authService.test_token(userData.token);
      
      if (tokenTestData.passed) {
        localStorage.setItem('userToken', userData.token);
        return userData;
      }
  
    } catch (error: any) { // `error` could be of any type
      if (error.response && error.response.data.detail) {
        if (error.response.status === 404) {
          return rejectWithValue('Incorrect credentials, please try again.');
        } 
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk<
  AuthResponse,
  authParams,
  {rejectValue: string}
>(
  'auth/signup/',
  async ({email, password}, { dispatch, rejectWithValue}) => {
    try {
      const data = await authService.signup({ email, password });

      const loginResponse = await dispatch(userLogin({ email, password}));

      if (userLogin.rejected.match(loginResponse)) {
        return rejectWithValue('Error loggin in after registration');
      }

      return loginResponse;

    } catch (error: any) {
      console.log(error)
      return rejectWithValue('Error registering')
    }
  }
)
