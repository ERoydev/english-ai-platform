import axios from "axios";
import baseUrl from "./ApiEndPoints";
import { expect } from "vitest";


type values = {
    [key: string]: any;
  };

export const register = async (values: values) => {
    const data = {
        email: values.email,
        password: values.password
    }
}

export const login = async (values: values) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login/`, values); 
        const { token, user } = response.data;

        localStorage.setItem('token', token)
        
        console.log('Logged in successfully: ', user)
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);
        } else {
            console.error('An unexpected error occurred:', error.message);
        }
        throw error;
    }


};