import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className,
  disabled,
}) => {
  return (
    <div className='text-center'>
      <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-4 max-w-56 py-2.5 rounded-full text-white font-semibold
        bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        transition-all duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
    </div>
  );
};

export default Button;