import React from 'react';
import largeCardStyles from '../../styles/components/LargeCard.module.scss';
import { Card } from './Card';

interface SmallCardProps {
  children: React.ReactNode;
  className?: string;
}

export const LargeCard = ({ children, className }: SmallCardProps) => {
  return (
    <Card className={`${largeCardStyles['card-container']} ${className}`}>
      {children}
    </Card>
  );
};
export default LargeCard;
