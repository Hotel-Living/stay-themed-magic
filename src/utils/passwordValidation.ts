
export const validatePassword = (password: string) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isValid = Object.values(requirements).every(Boolean);

  return {
    isValid,
    requirements,
  };
};

export const getPasswordStrengthColor = (password: string) => {
  const { requirements } = validatePassword(password);
  const metCount = Object.values(requirements).filter(Boolean).length;
  
  if (metCount <= 2) return "text-red-500";
  if (metCount <= 4) return "text-yellow-500";
  return "text-green-500";
};

export const passwordRequirementsText = [
  "At least 8 characters long",
  "Contains uppercase letter",
  "Contains lowercase letter",
  "Contains a number",
  "Contains special character (!@#$%^&*(),.?\":{}|<>)",
];
