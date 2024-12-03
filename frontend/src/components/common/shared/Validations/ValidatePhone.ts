
function validatePhone(phonenumber: string) {
    let error;

    if (phonenumber.trim()) {
        error = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phonenumber)) {
        error = "Phone number must be between 10 and 15 digits";
    }

    return error;
}

export default validatePhone