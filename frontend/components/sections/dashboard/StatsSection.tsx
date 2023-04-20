import { CircularProgressbar } from 'react-circular-progressbar';
import { BusinessStatsCard } from '../../cards/BusinessStatsCard';

interface StatsSectionProps {
  positiveReviews: number;
  negativeReviews: number;
}
export const StatsSection = ({
  positiveReviews,
  negativeReviews,
}: StatsSectionProps) => {
  const totalReviews = positiveReviews + negativeReviews;
  const positiveFraction = positiveReviews / totalReviews;
  const positivePercent = Math.round(positiveFraction * 100) / 100;
  const negativeFraction = negativeReviews / totalReviews;
  const negativePercent = Math.round(negativeFraction * 100) / 100;
  return (
    <>
      <BusinessStatsCard title="Total reviews" stat={totalReviews} />
      <BusinessStatsCard title="Positive Reviews" stat={positiveReviews}>
        <div>
          <CircularProgressbar value={positivePercent} />
        </div>
      </BusinessStatsCard>
      <BusinessStatsCard title="Negative Reviews" stat={negativeReviews}>
        <CircularProgressbar value={negativePercent} />
      </BusinessStatsCard>
    </>
  );
};
export default StatsSection;
