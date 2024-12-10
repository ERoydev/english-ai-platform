import baseUrl from "../ApiEndPoints";
import axios from "axios";


export const getTestimonials = async () => {
    const apiUrl = `${baseUrl}/testimonials/`;

    try {
        const response = await axios.get(apiUrl);

        const data = response.data;
        return data
    } catch (err) {
        return err.response;
    }

}