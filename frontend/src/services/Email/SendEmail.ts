import axios from "axios";
import ContactFormValues from "../../types/Forms/ContactFormValues";
import baseUrl from "../ApiEndPoints";
import logger from "../../logger";


const sendEmail = async (values: ContactFormValues) => {
    const APIURL = `${baseUrl}/send_email/`

    try {
        const response = await axios.post(APIURL, values, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log('DEBUG', response)
        const data = response;
    
        return data

    } catch (error) {
        logger.error('Sending email failed', error)
        throw error;
    }
}

export default sendEmail;
