import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ArtistInputField: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-purple-500 
        placeholder-gray-500 transition-all duration-200 ${className}`}
    />
  );
};

export default ArtistInputField;