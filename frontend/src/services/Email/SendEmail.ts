import axios from "axios";
import ContactFormValues from "../../types/Forms/ContactFormValues";
import baseUrl from "../ApiEndPoints";
import logger from "../../logger";


const sendEmail = async (values: ContactFormValues, emailType: string) => {
    /*
    It takes emailType which in the backend will be used to define which email service will be used
    
    */
    const APIURL = `${baseUrl}/send_email/`

    try {
        const response = await axios.post(APIURL, {values, emailType}, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.data;
        return data
    } catch (error) {
        logger.error('Sending email failed', error)
        throw error;
    }
}

export default sendEmail;
