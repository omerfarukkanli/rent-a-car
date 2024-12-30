import { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  onChangeText: (value: string) => void;
  errorMessage?: string;
}

const TextInput = ({
  label,
  value,
  onChangeText,
  id,
  ...res
}: TextInputProps) => {
  return (
    <div>
      <Label htmlFor={id} className='text-sm text-gray-500'>
        {label}
      </Label>
      <Input
        type='text'
        id={id}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        {...res}
      />
    </div>
  );
};

export default TextInput;
