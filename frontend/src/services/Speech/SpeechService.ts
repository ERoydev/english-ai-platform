import axios from 'axios';
import baseUrl from '../ApiEndPoints';
import logger from '../../logger';
import { log } from 'loglevel';

// Define the expected response from the backend
interface AnalysisResult {
    analysis_result: string;
}

interface AnalysisError {
    error: string;
}

type AnalysisResponse = AnalysisResult | AnalysisError;

const URL = `${baseUrl}/speech_analysis/`;

export const send_speech_for_analysis = async (mediaBlobUrl: string | undefined): Promise<AnalysisResponse> => {
    try {
        if (!mediaBlobUrl) {
            logger.error("No mediaBlobUrl provided")
            return { error: "No mediaBlobUrl provided" };
        }

        // Fetch the token from localStorage
        const token = localStorage.getItem('userToken');
        if (!token) {
            logger.error("Authentication token not found")
            return { error: "Authentication token not found" };
        }

        // Fetch the Blob from mediaBlobUrl
        const response = await fetch(mediaBlobUrl);
        if (!response.ok) {
            logger.error("Failed to fetch mediaBlobUrl:", response.statusText)
            return { error: `Failed to fetch mediaBlobUrl: ${response.statusText}` };
        }

        const audioBlob = await response.blob();

        // Create FormData and append the audio Blob
        const formData = new FormData();
        formData.append('audio', audioBlob, 'speech.wav'); // 'audio' should match Django's expectation

        // Send the formData to the Django backend using axios
        const result = await axios.post<AnalysisResponse>(URL, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`, // Include token here
            },
        });

        logger.info("service response: " + result.data);
        return result.data;
    } catch (error) {
        logger.error("Error in send_speech_for_analysis:", error)
        return { error: "An error occurred while sending audio for analysis" };
    }
};
