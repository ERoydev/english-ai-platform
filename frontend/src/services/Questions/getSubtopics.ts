import baseUrl from "../ApiEndPoints";
import axios from "axios";
import { checkIfTokenExist } from "../AuthorizationTokenMixin";


const baseApiUrl: string = `${baseUrl}/questions/subtopics`;

export const getSubtopics = async (id) => {
    const token = checkIfTokenExist();

    try {
        const response = await axios.get(`${baseApiUrl}/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
} 