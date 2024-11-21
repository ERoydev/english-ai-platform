import { useState } from "react";
import useForm from "../../../hooks/useForm";
import sendEmail from "../../../services/Email/SendEmail";
import Button from "../../common/shared/Button/Button";
import Header from "../../common/shared/Header/Header";
import withScrollAnimation from "../../decoration/WithScrollAnimation";
import ContactFormValues from "../../../types/Forms/ContactFormValues";


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
                        <div className="px-3 w-[50%] mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            
                            <input 
                                className="input" 
                                id="grid-first-name" 
                                type="text" 
                                placeholder="Jane"
                                name='firstName' 
                                value={values.firstName} 
                                onChange={onChange}
                            />
                             {validationErrors.firstName && (
                                <p className="text-red-500 text-xs italic">{validationErrors.firstName}</p>
                            )}
                        </div>

                        <div className="w-[50%] px-3 mb06 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input 
                                className="input" 
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe" 
                                name='lastName' 
                                value={values.lastName}
                                onChange={onChange}
                            />

                            {validationErrors.lastName && (
                                <p className="text-red-500 text-xs italic">{validationErrors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="px-3 w-[50%] mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Email
                            </label>
                            
                            <input 
                                className="input" 
                                id="grid-first-name" 
                                type="email" 
                                placeholder="Jane@gmail.com" 
                                name='email' 
                                value={values.email}
                                onChange={onChange}
                            />

                            {validationErrors.email && (
                                <p className="text-red-500 text-xs italic">{validationErrors.email}</p>
                            )}

                        </div>

                        <div className=" w-[50%] px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Phone
                            </label>
                            <input 
                                className="input"
                                id="grid-last-name"
                                type="text" 
                                placeholder="08754...." 
                                name='phone' 
                                value={values.phone}
                                onChange={onChange}
                            />
                            {validationErrors.phone && (
                                <p className="text-red-500 text-xs italic">{validationErrors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="w-full max-md:mb-24">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                            Your message here
                        </label>
                            
                        <textarea 
                            id="message" 
                            rows='6' 
                            className="input" 
                            placeholder="Write your thoughts here..."
                            name='message' 
                            value={values.message}
                            onChange={onChange}
                        >
                        </textarea>

                        {validationErrors.message && (
                            <p className="text-red-500 text-xs italic">{validationErrors.message}</p>
                        )}
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-xl:text-sm">
                        {isSended ? (
                            <div className="flex items-center gap-2 animate-bounce">
                                <svg className="w-7 h-7 max-lg:w-5 max-lg:h-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
                                <h1 className='text-green-600 font-semibold text-md max-lg:text-xs'>
                                    Message sent successfully!
                                </h1>
                            </div>
                        ) : (
                            <Button label="Submit" className="" />
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

const Contact = withScrollAnimation(ContactContent);
export default Contact;