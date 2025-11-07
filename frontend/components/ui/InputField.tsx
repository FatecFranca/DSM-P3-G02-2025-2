import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`relative flex items-center mb-4 ${className}`}>
      <div className="absolute left-4 text-gray-500">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-2.5 bg-white text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-200"
      />
    </div>
  );
};

export default InputField;