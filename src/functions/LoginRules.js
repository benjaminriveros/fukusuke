export function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

export function validateRut(rut) {
    const re = /^[0-9]+-[0-9kK]$/;
    return re.test(rut);
}

export function validatePhoneNumber(phoneNumber) {
    const re = /^\d{9}$/; // Adjust the regex according to your phone number format requirements
    return re.test(phoneNumber);
}