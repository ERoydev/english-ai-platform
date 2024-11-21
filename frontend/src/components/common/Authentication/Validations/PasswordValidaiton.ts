export const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
  
    // Minimum length validation
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
  
    // Uppercase letter validation
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
  
    // Lowercase letter validation
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
  
    // Digit validation
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
  
    // Special character validation
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
  
    return errors;
  };
  