import { useState } from "react";
import useForm from "../../../hooks/useForm";
import sendEmail from "../../../services/Email/SendEmail";
import Button from "../../common/shared/Button/Button";
import Header from "../../common/shared/Header/Header";
import withScrollAnimation from "../../decoration/WithScrollAnimation";
import ContactFormValues from "../../../types/Forms/ContactFormValues";
import FormField from "../../common/shared/Forms/FormField";
import TextArea from "../../common/shared/Forms/TextArea";
import validatePhone from "../../common/shared/Validations/ValidatePhone";
import SuccessDisplay from "../../common/shared/Messages/SuccessDisplay";


const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
}


  
type ValidationErrors = {
[key in keyof ContactFormValues]?: string; // Each key in FormValues can have a corresponding error message
};



function ContactContent() {
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [isSended, setIsSended] = useState(false);

    const submitClickHandler = () => {
        const errors = validateForm(values);

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({}); // To clean the errors
        sendEmail(values, 'Contact')
        resetValues()
        setIsSended(true) // I have sended the message successfully
    }

    const { values, onChange, onSubmit, resetValues} = useForm(submitClickHandler, initialValues);


    const validateForm = (values: ContactFormValues) => {
        const errors: ContactFormValues = {};
    
        // Check first name
        if (!values.firstName.trim()) {
            errors.firstName = "First name is required";
        } else if (values.firstName.length < 4) {
            errors.firstName = "This field must be at least 4 characters"
        }
    
        // Check last name
        if (!values.lastName.trim()) {
            errors.lastName = "Last name is required";
        } else if (values.lastName.length < 4) {
            errors.lastName = "This field must be at least 4 characters"
        }
    
        // Check email
        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email address";
        }
    
        // Check phone
        if (!values.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10,15}$/.test(values.phone)) {
            errors.phone = "Phone number must be between 10 and 15 digits";
        }
    
        // Check message
        if (!values.message.trim()) {
            errors.message = "Message is required";
        } else if (values.message.length < 30) {
            errors.message = "Must have at least 30 characters"
        }
    
        return errors;
    };


    return(
        <section className="max-container mt-24 flex flex-col items-center" id="contact">

            <div className="text-center">
                <Header title='Feel Free To ' coloredText="Reach out" coloredClass="secondary-header-color" size="text-4xl" infoText="contacts"/>
            </div>

            <div className="w-[80%] max-md:w-full bg-slate-600/[.08] py-14 px-16 max-md:py-5 max-md:px-5 pb-32 rounded-lg relative mb-24">
                <form className="flex flex-col z-20" onSubmit={onSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <FormField 
                            title="First Name"
                            validationError={validationErrors?.firstName}
                            fieldValue={values.firstName}
                            onChange={onChange}
                            inputName="firstName"
                            placeholder="John"
                        />

                        <FormField 
                            title="Last Name"
                            validationError={validationErrors?.lastName}
                            fieldValue={values.lastName}
                            onChange={onChange}
                            inputName="lastName"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">

                        <FormField 
                            title="Email"
                            validationError={validationErrors?.email}
                            fieldValue={values.email}
                            onChange={onChange}
                            inputName="email"
                            placeholder="Jane@gmail.com"
                            inputType="email"
                        />
                  
                        <FormField 
                            title="Phone"
                            validationError={validationErrors?.phone}
                            fieldValue={values.phone}
                            onChange={onChange}
                            inputName="phone"
                            placeholder="08754...."
                            
                        />
                     
                    </div>

                    <TextArea 
                        title='Your message here'
                        textareaId='message'
                        textareaName='message'
                        value={values.message}
                        onChange={onChange}
                        placeholder='Write your thoughts here...'
                        validationError={validationErrors?.message}
                    />

                    <SuccessDisplay 
                        isSended={isSended}
                        text='Message sent successfully!'
                    >
                        <Button label="Submit" className="" />
                    </SuccessDisplay>
        
                </form>
            </div>
        </section>
    );
}

const Contact = withScrollAnimation(ContactContent);
export default Contact;