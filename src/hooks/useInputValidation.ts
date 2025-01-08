import { useState, useCallback } from 'react';

interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  required?: boolean;
}

interface UseInputValidationProps {
  rules?: ValidationRules;
  showPassword?: boolean;
}

export const useInputValidation = ({
  rules = {},
  showPassword = false,
}: UseInputValidationProps = {}) => {
  const [isVisible, setIsVisible] = useState(showPassword);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const validate = useCallback(
    (value: string): boolean => {
      let isValid = true;
      let message = '';

      if (rules.required && !value) {
        isValid = false;
        message = 'This field is required';
      } else if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        message = `Minimum ${rules.minLength} characters required`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        message = `Maximum ${rules.maxLength} characters allowed`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        message = 'Invalid format';
      }

      // Sadece state değişikliği gerektiğinde güncelle
      if (isValid !== !isError || message !== errorMessage) {
        setIsError(!isValid);
        setErrorMessage(message);
      }

      return isValid;
    },
    [rules, isError, errorMessage] // Dependencies
  );

  return {
    isVisible,
    isError,
    errorMessage,
    toggleVisibility,
    validate,
  };
};
