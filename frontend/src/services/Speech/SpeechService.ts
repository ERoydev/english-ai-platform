import axios from 'axios';
import baseUrl from '../ApiEndPoints';

// Define the expected response from the backend
interface AnalysisResult {
    analysis_result: string;
}

interface AnalysisError {
    error: string;
}

type AnalysisResponse = AnalysisResult | AnalysisError;

const URL = `${baseUrl}/speech_analysis/analyze_audio/`;

export const send_speech_for_analysis = async (mediaBlobUrl: string | undefined): Promise<AnalysisResponse> => {
    try {
        if (!mediaBlobUrl) {
            console.error("No mediaBlobUrl provided");
            return { error: "No mediaBlobUrl provided" };
        }

        // Fetch the Blob from mediaBlobUrl
        const response = await fetch(mediaBlobUrl);
        if (!response.ok) {
            console.error("Failed to fetch mediaBlobUrl:", response.statusText);
            return { error: `Failed to fetch mediaBlobUrl: ${response.statusText}` };
        }

        const audioBlob = await response.blob();

        // Create FormData and append the audio Blob
        const formData = new FormData();
        formData.append('audio', audioBlob, 'speech.wav'); // 'audio' should match Django's expectation

        // Send the formData to the Django backend using axios
        const result = await axios.post<AnalysisResponse>(URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Return the response data
        return result.data;
    } catch (error) {
        console.error("Error in send_speech_for_analysis:", error);
        return { error: "An error occurred while sending audio for analysis" };
    }
};
