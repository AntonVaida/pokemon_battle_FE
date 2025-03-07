"use client";
import { useState, useEffect } from 'react';

export const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {    
    const storedValue = sessionStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
      sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
};
