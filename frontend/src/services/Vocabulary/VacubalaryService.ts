import axios from "axios";
import baseUrl from "../ApiEndPoints";


export const fetchVocabularyQuestions = async (category, difficulty) => {
    try {
        const apiUrl = new URL(`${baseUrl}/quiz/vocabulary_questions/`);
        apiUrl.searchParams.append('category', category);
        
        // Add optional parameters if provided
        if (difficulty) {
            apiUrl.searchParams.append('difficulty', difficulty);
        }

        // Fetch the token from localStorage
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.error("Authentication token not found");
            return { error: "Authentication token not found" };
        }
        
        const response = await axios.get(apiUrl.toString(), {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching vocabulary questions:', error);
        throw error;
    }
}
