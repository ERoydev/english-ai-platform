import axios from "axios";
import baseUrl from "../ApiEndPoints";
import logger from "../../logger";


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

export const changeUserPassword = async (userId: number, old_password: string, new_password: string) => {

    const token = localStorage.getItem('userToken');  // Retrieve token from storage
    if (!token) {
        throw new Error("Authentication token not found");
    }

    try {
        // Send password change request
        const response = await axios.post(
            `${baseUrl}/auth/change_password/${userId}/`,
            { old_password, new_password }, // Payload for the request body
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        );

        const data = response.data;

        console.log('success', data)
        return data;
    } catch (err) {
        const error = err.response.data
        logger.error('Change Password Error', error.message)
        return error;
    }
}