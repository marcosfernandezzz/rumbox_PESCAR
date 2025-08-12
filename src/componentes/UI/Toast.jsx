import React from 'react';

const Toast = ({ message, show }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
};

export default Toast;
