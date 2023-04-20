import { ReactNode } from 'react';
import { Card } from './Card';

interface BusinessStatsCardProps {
  children?: ReactNode;
  title: string;
  stat: number;
}
export const BusinessStatsCard = ({
  children,
  title,
  stat,
}: BusinessStatsCardProps) => {
  return (
    <Card>
      <p>{title}</p>
      <p>{stat}</p>
      {children}
    </Card>
  );
};
export default BusinessStatsCard;
