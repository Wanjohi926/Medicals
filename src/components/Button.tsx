import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  className = '',
  onClick = () => {},
  disabled = false
}) => {
  return <button type={type} className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>;
};
export default Button;