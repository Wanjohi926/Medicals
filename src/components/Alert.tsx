import React from 'react';
type AlertProps = {
  type: 'success' | 'error' | 'info';
  message?: string;
};

const Alert: React.FC<AlertProps> = ({
  type,
  message
}) => {
  const alertClasses = {
    success: 'bg-green-100 border border-green-400 text-green-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700'
  };
  if (!message) return null;
  return <div className={`${alertClasses[type]} px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>;
};
export default Alert;