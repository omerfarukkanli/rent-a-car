import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInputValidation } from '@/hooks/useInputValidation';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label: string;
  id: string;
  value: string;
  validateOnDemand?: boolean;
  setIsValidate?: (value: boolean) => void;
  onChangeText: (value: string) => void;
}

const TextInput = ({
  required,
  label,
  value,
  onChangeText,
  setIsValidate,
  validateOnDemand,
  id,
  ...res
}: TextInputProps) => {
  const { isError, validate, errorMessage } = useInputValidation({
    rules: { required: required },
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
      <Label htmlFor={id}>{label}</Label>
      <Input
        type='text'
        id={id}
        value={value}
        onBlur={() => {
          if (required) {
            const isValid = validate(value);
            if (setIsValidate) setIsValidate(isValid);
          }
        }}
        onChange={(e) => onChangeText(e.target.value)}
        className={`${
          errorMessage || isError
            ? 'border-red-500 focus-visible:ring-red-500'
            : ''
        }`}
        {...res}
      />
      {isError && <p className='text-sm text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
