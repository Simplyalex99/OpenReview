import React from 'react';
import smallCardStyles from '../../styles/components/SmallCard.module.scss';
import { Card } from './Card';

interface SmallCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SmallCard = ({ children, className }: SmallCardProps) => {
  return (
    <Card className={`${smallCardStyles['card-container']} ${className}`}>
      {children}
    </Card>
  );
};
export default SmallCard;
