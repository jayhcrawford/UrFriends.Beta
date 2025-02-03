import React from 'react';
import { useEffect } from 'react';

const useEscapeKey = (onEscape) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape]);
};

export default useEscapeKey;
