import axios from "axios";
import baseUrl from "../ApiEndPoints";


type values = {
    [key: string]: any;
  };


const createRequestConfig = (token: string) => {
  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  }
  return config;
}

export const test_token = async (token: string) => {
  const config = createRequestConfig(token);

  const response = await axios.get(`${baseUrl}/auth/test_token/`, config);
  const data = response.data;

  return data;
}


export const login = async (values: values) => {
    const response = await axios.post(`${baseUrl}/auth/login/`, values); 
    const data = response.data;

    return data;
};

export const signup = async (values: values) => {
  const response = await axios.post(`${baseUrl}/auth/signup/`, values);
  const data = response.data;

  return data;
}

export const logout = async(values: values) => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    throw new Error('No JWT token found.');
  }

  const config = createRequestConfig(token);

  try {
    // Make the POST request to the logout endpoint
    const response = await axios.post(`${baseUrl}/auth/logout/`, values, config);
    
    // If successful, you can also remove the token from localStorage
    localStorage.removeItem('userToken');

    return response.data;
  } catch (error) {
    console.error('Logout failed', error);
    throw error;  // Rethrow the error for further handling
  }
}

export const getUserByToken = async(token: string) => {
  const response = await axios.post(`${baseUrl}/auth/getUserByToken/`, {"token": token});

  const data = response.data;
  return data;
}