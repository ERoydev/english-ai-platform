import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/Auth/AuthService';

export const userLogin = createAsyncThunk(
    'auth/login/',
    async ({email, password}: {email: string, password: string}, { rejectWithValue }) => {
        try {
            const data = await authService.login({email, password});
            localStorage.setItem('userToken', data.token);
            return data;
            
        } catch(error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)