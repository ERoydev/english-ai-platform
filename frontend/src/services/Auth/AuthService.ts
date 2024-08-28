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