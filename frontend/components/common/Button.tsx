import React from 'react';
import buttonStyles from '../../styles/components/Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
};

export const Button = ({
  children,
  className,
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      className={` ${buttonStyles.btn} ${className}`}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
};
export default Button;
