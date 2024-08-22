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
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }

};