'use client';
import { Input } from '@/components/ui/input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  onChange,
  value,
}) => {
  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={type}
        autoComplete="off"
        {...register(id, { required })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="py-4"
      />
    </div>
  );
};
