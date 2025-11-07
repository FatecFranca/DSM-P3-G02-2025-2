import React from 'react';

interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

const ArtistTextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  rows = 4,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full p-4 bg-white text-gray-900 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-purple-500 
        placeholder-gray-500 transition-all duration-200 resize-none ${className}`}
    />
  );
};

export default ArtistTextArea;