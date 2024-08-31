import axios from "axios";
import baseUrl from "../ApiEndPoints";


type values = {
    [key: string]: any;
  };



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

  const config = {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  }

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