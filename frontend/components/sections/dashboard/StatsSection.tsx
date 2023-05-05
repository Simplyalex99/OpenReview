import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BusinessStatsCard } from '../../cards/BusinessStatsCard';
import businessStatsStyle from '../../../styles/components/BusinessStatsCard.module.scss';

interface StatsSectionProps {
  positiveReviews: number;
  negativeReviews: number;
  businessIsSuccessful: boolean;
  darkMode: boolean;
}
export const StatsSection = ({
  positiveReviews,
  negativeReviews,
  businessIsSuccessful,
  darkMode,
}: StatsSectionProps) => {
  const totalReviews = positiveReviews + negativeReviews;
  const positivePercent = Math.round((positiveReviews / totalReviews) * 100);
  const negativePercent = Math.round((negativeReviews / totalReviews) * 100);
  const businessStatus = businessIsSuccessful ? 'Successful' : 'Unsuccesful';
  const statusColor = businessIsSuccessful ? '#54D6B7' : '#f9aa12';
  const colorMode = darkMode ? '#027fff' : '#602bf8';
  const textColor = darkMode ? 'white' : 'black';
  const backgroundColor = darkMode ? 'dark-bg' : 'white-bg';
  return (
    <>
      <div className={businessStatsStyle.card}>
        <div className={businessStatsStyle.shape1} />
        <div className={businessStatsStyle.shape2} />
        <BusinessStatsCard
          style={`${backgroundColor} ${businessStatsStyle.wrapper} ${textColor}`}
          title="Total reviews"
        >
          <div>
            <p className={`${textColor} ${businessStatsStyle.stat}`}>
              {totalReviews}
            </p>
            <p className={textColor}>
              Business status:{' '}
              <span
                style={{
                  color: statusColor,
                  fontWeight: 'bold',
                  marginLeft: '5px',
                }}
              >
                {businessStatus}
              </span>
            </p>
          </div>
        </BusinessStatsCard>
      </div>
      <div className={businessStatsStyle.card}>
        <BusinessStatsCard
          style={`${businessStatsStyle.wrapper} ${textColor} ${backgroundColor}`}
          title="Positive Reviews"
        >
          <div className={businessStatsStyle.flex}>
            <p
              className={`${businessStatsStyle.stat} ${businessStatsStyle['stat-with-progressbar']} ${textColor}`}
            >
              {positiveReviews}
            </p>
            <div className={businessStatsStyle['progress-bar']}>
              <CircularProgressbar
                styles={buildStyles({
                  pathColor: colorMode,
                  textColor: colorMode,
                })}
                strokeWidth={5}
                value={positivePercent}
                className={businessStatsStyle['progress-bar-svg']}
                text={`${positivePercent}%`}
              />
            </div>
          </div>
        </BusinessStatsCard>
      </div>
      <div className={businessStatsStyle.card}>
        <BusinessStatsCard
          style={`${businessStatsStyle.wrapper} ${textColor} ${backgroundColor}`}
          title="Negative Reviews"
        >
          <div className={businessStatsStyle.flex}>
            <p
              className={`${businessStatsStyle.stat} ${businessStatsStyle['stat-with-progressbar']} ${textColor}`}
            >
              {negativeReviews}
            </p>
            <div className={businessStatsStyle['progress-bar']}>
              <CircularProgressbar
                styles={buildStyles({
                  pathColor: colorMode,
                  textColor: colorMode,
                })}
                value={negativePercent}
                strokeWidth={5}
                className={businessStatsStyle['progress-bar-svg']}
                text={`${negativePercent}%`}
              />
            </div>
          </div>
        </BusinessStatsCard>
      </div>
    </>
  );
};
export default StatsSection;
