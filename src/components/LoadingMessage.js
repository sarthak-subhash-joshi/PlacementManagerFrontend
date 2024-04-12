import React, { useState, useEffect } from 'react';
import '../styles/components/LoadingMessage.css'

function LoadingMessage() {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('Please wait this may take some time to load.');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('It is taking more time than required. Please check your internet connection and try again.');
    }, 90000);  // This should probably be adjusted as your comment says 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="loading-message">
      {message}
      {message === 'Please wait this may take some time to load.' && (
        <span className="close-button" onClick={handleClose}>
          &#x2715;
        </span>
      )}
    </div>
  );
}

export default LoadingMessage;
