import { ReactNode } from 'react';
import cardStyles from '../../styles/components/Card.module.scss';

interface CardProps {
  children: ReactNode;
  style?: string;
}

export const Card = ({ children, style }: CardProps) => {
  return <div className={`${cardStyles.wrapper} ${style}`}>{children}</div>;
};

export default Card;
