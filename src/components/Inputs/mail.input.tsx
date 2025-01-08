import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useInputValidation } from '@/hooks/useInputValidation';

interface MailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  setIsValidate: (value: boolean) => void;
  onChangeText: (value: string) => void;
  validateOnDemand?: boolean;
}

const MailInput = ({
  label,
  id,
  value,
  onChangeText,
  setIsValidate,
  validateOnDemand,
  ...props
}: MailInputProps) => {
  const { isError, validate, errorMessage } = useInputValidation({
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
  });

  const [prevValidation, setPrevValidation] = useState(false);

  useEffect(() => {
    if (validateOnDemand && setIsValidate) {
      const isValid = validate(value);
      if (isValid !== prevValidation) {
        setIsValidate(isValid);
        setPrevValidation(isValid);
      }
    }
  }, [validateOnDemand, value, validate, setIsValidate, prevValidation]);

  return (
    <div>
      <label htmlFor='email'>{label}</label>
      <Input
        type='email'
        id={id}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onBlur={() => {
          const isValid = validate(value);
          setIsValidate(isValid);
        }}
        className={`${
          errorMessage || isError
            ? 'border-red-500 focus-visible:ring-red-500'
            : ''
        }`}
        {...props}
      />
      {(errorMessage || isError) && (
        <p className='text-sm text-red-500'>
          {errorMessage || 'Password must be at least 8 characters'}
        </p>
      )}
    </div>
  );
};
export default MailInput;
