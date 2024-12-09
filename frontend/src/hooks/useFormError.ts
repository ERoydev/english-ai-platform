import { useState } from "react";
import FormValues from "../types/Forms/FormValues";




export default function useFormError() {
    const [errors, setErrors] = useState([]);

    const setErrorHandler = (errorMessage: string[]) => {
        setErrors((prev) => {
            const newErrors = [...prev, ...errorMessage]
            return newErrors;
        })
    }

    const cleanErrors = () => {
        setErrors([]);
    }

    return {
        errors,
        setErrorHandler,
        cleanErrors,
    }
}