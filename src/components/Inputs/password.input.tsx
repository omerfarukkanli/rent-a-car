import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useInputValidation } from '@/hooks/useInputValidation';
import { InputHTMLAttributes, useEffect, useState } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  setIsValidate: (value: boolean) => void;
  onChangeText: (value: string) => void;
  validateOnDemand?: boolean;
}

const PasswordInput = ({
  label,
  id,
  value,
  onChangeText,
  setIsValidate,
  validateOnDemand,
  ...props
}: PasswordInputProps) => {
  const { isVisible, isError, validate, toggleVisibility, errorMessage } =
    useInputValidation({
      rules: { minLength: 8, required: true },
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
      <div className='relative'>
        <Input
          type={isVisible ? 'text' : 'password'}
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
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
        </Button>
      </div>
      {(errorMessage || isError) && (
        <p className='text-sm text-red-500'>{errorMessage}</p>
      )}
    </div>
  );
};

export default PasswordInput;
