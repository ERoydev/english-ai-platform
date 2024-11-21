export default function emailValidator(email: string): string[] {
    const errors = []

    if (!email.trim()) {
        errors.push("Email is required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email address')
    }

    return errors
}