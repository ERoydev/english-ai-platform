import baseUrl from "../ApiEndPoints"
import axios from "axios";
import { checkIfTokenExist } from "../AuthorizationTokenMixin";


const basApiUrl: string = `${baseUrl}/questions`

export const getSections = async () => {
    const apiUrl = `${basApiUrl}/get_sections/`;

    const token = checkIfTokenExist();

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}