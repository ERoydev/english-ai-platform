export const phoneNumberValidation = (phone_number: string, errors: string[]) => {
    if (!/^\d{10,15}$/.test(phone_number)) {
        if (errors) {
            errors.push("Phone number must be between 10 and 15 digits")
        } else {
            return "Phone number must be between 10 and 15 digits";
        }
    }
};