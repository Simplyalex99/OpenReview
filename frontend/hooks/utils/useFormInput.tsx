import React, { useState } from 'react';

export const useFormInput = (initialValue?: string) => {
  const value = initialValue !== undefined ? initialValue : '';
  const [input, setInput] = useState(value);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return [input, onChangeHandler, setInput] as const;
};

export default useFormInput;
