import baseUrl from "../ApiEndPoints";
import axios from "axios";
import { checkIfTokenExist } from "../AuthorizationTokenMixin";
import AnswerDataInterface from "../../types/Quiz/AnswerDataInterface";
import { formatTimeForDjango } from "../../utils/formatTimeForDjango";
import logger from "../../logger";

const baseApiUrl: string = `${baseUrl}/scoring/`;


export const submitQuestions = async (answers: AnswerDataInterface, time_duration:{minutes: number, seconds: number}) => {
    const token = checkIfTokenExist();

    const time = formatTimeForDjango(time_duration);

    try {
        const response = await axios.post(
            baseApiUrl,
            {answers, time},
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'  // Specify the content type
            },
        
        });
        logger.info("Submited quiz successfully!")
        return response.data;
    } catch (err) {
        logger.error("Error occured in submitQuestion service " + err)
        return [];
    }
} 