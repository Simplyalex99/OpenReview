import { ReactNode } from 'react';
import cardStyles from '../../styles/components/Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${cardStyles.wrapper} ${className}`}>{children}</div>;
};

export default Card;
