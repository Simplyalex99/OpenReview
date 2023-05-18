import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import businessStatsStyle from '../../styles/components/BusinessStatsCard.module.scss';
import { Card } from '../cards/Card';
import { CircleSVG } from '../svg/other/Circle';
import { CrossSVG } from '../svg/other/Cross';
import { PlusSVG } from '../svg/other/Plus';

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
    <section className={businessStatsStyle['grid-container']}>
      <div className={businessStatsStyle.card}>
        <div className={businessStatsStyle.shape1} />
        <div className={businessStatsStyle.shape2} />
        <div className={businessStatsStyle.circle}>
          <CircleSVG />
        </div>
        <div className={businessStatsStyle.circle2}>
          <CircleSVG />
        </div>
        <div className={businessStatsStyle.cross1}>
          <CrossSVG />
        </div>
        <div className={businessStatsStyle.plus}>
          <PlusSVG />
        </div>
        <div className={businessStatsStyle.cross2}>
          <CrossSVG />
        </div>
        <Card
          className={`${backgroundColor} ${businessStatsStyle.wrapper} ${textColor}`}
        >
          <p className={businessStatsStyle['sub-heading']}>Total reviews</p>
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
                }}
              >
                {businessStatus}
              </span>
            </p>
          </div>
        </Card>
      </div>
      <div className={businessStatsStyle.card}>
        <Card
          className={`${businessStatsStyle.wrapper} ${textColor} ${backgroundColor}`}
        >
          <p className={businessStatsStyle['sub-heading']}>Positive reviews</p>
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
        </Card>
      </div>
      <div className={businessStatsStyle.card}>
        <Card
          className={`${businessStatsStyle.wrapper} ${textColor} ${backgroundColor}`}
        >
          <p className={businessStatsStyle['sub-heading']}>Negative reviews</p>
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
        </Card>
      </div>
    </section>
  );
};
export default StatsSection;
