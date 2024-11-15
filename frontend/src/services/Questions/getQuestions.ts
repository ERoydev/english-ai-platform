
import baseUrl from "../ApiEndPoints"
import axios from "axios";
import { checkIfTokenExist } from "../AuthorizationTokenMixin";


const baseApiUrl: string = `${baseUrl}/questions`

export const getQuestions = async (id) => {
    const apiUrl = `${baseApiUrl}`;

    const token = checkIfTokenExist();

    try {
        const response = await axios.get(`${apiUrl}/${id}/`, {
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