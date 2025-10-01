import React from 'react';

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 ${className}`}>
    {children}
  </button>
);

export default Button;
