import axios from "axios";
import baseUrl from "../ApiEndPoints";


export const deleteUser = async (userId: number) => {

    const token = localStorage.getItem('userToken');  // Retrieve token from storage
    if (!token) {
        throw new Error("Authentication token not found");
    }

    try {
        const response = await axios.delete(`${baseUrl}/auth/delete/${userId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        const data = response.data;

        // If successful, you can also remove the token from localStorage
        localStorage.removeItem('userToken');

        return data;
    } catch(err) {
        throw new Error('Account deletion failed')
    }
}

export const changeUserPassword = (userId: number, password: string) => {
    console.log(userId, password)
    return true;
}