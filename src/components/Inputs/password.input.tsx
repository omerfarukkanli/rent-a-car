'use client';
import React, { InputHTMLAttributes, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  onChangeText: (value: string) => void;
  errorMessage?: string;
}

const PasswordInput = ({
  label,
  value,
  onChangeText,
  id,
  errorMessage,
  ...res
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Label htmlFor={id} className='text-sm text-gray-500'>
        {label}
      </Label>
      <div className='flex items-center space-x-2'>
        <div className='relative w-full'>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Şifre'
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            className={`pr-10 ${
              errorMessage
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : ''
            }`}
            id={id}
            {...res}
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4 text-gray-500' />
            ) : (
              <Eye className='h-4 w-4 text-gray-500' />
            )}
          </Button>
        </div>
      </div>
      {errorMessage && (
        <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
      )}
    </div>
  );
};

export default PasswordInput;
