
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  requirements: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
  };
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];
  
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  
  if (!requirements.minLength) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!requirements.hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!requirements.hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!requirements.hasNumber) {
    errors.push("Password must contain at least one number");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    requirements
  };
}

export const getPasswordStrengthColor = (password: string) => {
  const { requirements } = validatePassword(password);
  const metCount = Object.values(requirements).filter(Boolean).length;
  
  if (metCount <= 2) return "text-red-500";
  if (metCount <= 3) return "text-yellow-500";
  return "text-green-500";
};

export const passwordRequirementsText = [
  "At least 8 characters long",
  "Contains uppercase letter",
  "Contains lowercase letter",
  "Contains a number",
];
