import baseUrl from "../ApiEndPoints";
import axios from "axios";
import { checkIfTokenExist } from "../AuthorizationTokenMixin";
import AnswerDataInterface from "../../types/Quiz/AnswerDataInterface";
import { formatTimeForDjango } from "../../utils/formatTimeForDjango";
import logger from "../../logger";

const baseApiUrl: string = `${baseUrl}/scoring/`;



export const submitQuestions = async (answers: AnswerDataInterface, time_duration:{minutes: number, seconds: number},isQuiz: boolean, mediaBlob?: Blob,) => {
    const token = checkIfTokenExist();
    const time = formatTimeForDjango(time_duration);

    const formData = new FormData();
    
    if (mediaBlob) {
        formData.append('audio', mediaBlob);
    }

    formData.append('answers', JSON.stringify(answers));
    formData.append('is_quiz', JSON.stringify(isQuiz));
    formData.append('time', time);

    try {
        const response = await axios.post(
            baseApiUrl,
            formData,
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'  
            },
        
        });
        logger.info("Submited quiz successfully!")
        return response.data;
    } catch (err) {
        logger.error("Error occured in submitQuestion service " + err)
        return [];
    }
} 