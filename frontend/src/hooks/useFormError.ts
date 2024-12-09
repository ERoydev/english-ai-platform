import { useState } from "react";

export default function useFormError() {
    const [errors, setErrors] = useState([]);

    const setErrorHandler = (errorMessage: string[]) => {
        setErrors((prev) => {
            return errorMessage;
        });
    };

    const cleanErrors = () => {
        setErrors([]);
    }

    return {
        errors,
        setErrorHandler,
        cleanErrors,
    }
}