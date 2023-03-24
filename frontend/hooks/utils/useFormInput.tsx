import React, { useState } from 'react';

export const useFormInput = () => {
  const [input, setInput] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return [input, onChangeHandler];
};

export default useFormInput;