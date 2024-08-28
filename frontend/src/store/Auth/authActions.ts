import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/Auth/AuthService';
import axios from 'axios';

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
      const data = await authService.login({ email, password });
      
      localStorage.setItem('userToken', data.token);
      return data;
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
  async ({email, password}, {rejectWithValue}) => {
    try {
      console.log('inside')
      // const data = await authService.signup({ email, password });

      // localStorage.setItem('userToken', data.token);
      // return data;
    } catch (error: any) {

      console.log(error)
      return rejectWithValue('Error registering')
    }
  }
)
