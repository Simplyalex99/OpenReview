import { ReactNode } from 'react';
import { Card } from './Card';
import businessStatsStyle from '../../styles/components/BusinessStatsCard.module.scss';

interface BusinessStatsCardProps {
  children?: ReactNode;
  title: string;
  style?: string;
}
export const BusinessStatsCard = ({
  children,
  title,
  style,
}: BusinessStatsCardProps) => {
  return (
    <Card style={style}>
      <p className={businessStatsStyle['sub-heading']}>{title}</p>
      {children}
    </Card>
  );
};
export default BusinessStatsCard;
