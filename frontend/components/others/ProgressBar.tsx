import React from 'react';
import progressBarStyles from '../../styles/components/ProgressBar.module.scss';

type ProgressBarStyleProps = {
  fillColor?: string;
  color?: string;
  transition?: string;
  borderRadius?: number;
  backgroundColor?: string;
  fontSize?: string;
};
type ProgressBarProps = {
  completed: number;
};
export const ProgressBar = ({
  fillColor = '#602bf8',
  completed,
  color = 'white',
  transition = 'width 1s ease-in-out',
  borderRadius = 50,
  backgroundColor = '#e0e0de',
  fontSize = 'inherit',
}: ProgressBarProps & ProgressBarStyleProps) => {
  const percentile = Math.round(completed);
  const containerStyles = {
    borderRadius: `${borderRadius}px`,
    backgroundColor,
  };
  const fillerStyles = {
    width: `${percentile}%`,
    backgroundColor: fillColor,
    transition,
  };

  const labelStyles = {
    color,
    fontSize,
  };
  return (
    <div className={progressBarStyles.container} style={{ ...containerStyles }}>
      <div className={progressBarStyles.filler} style={{ ...fillerStyles }}>
        <span
          className={progressBarStyles.label}
          style={{ ...labelStyles }}
        >{`${percentile}%`}</span>
      </div>
    </div>
  );
};
const getReviewFrequency = (
  data: Array<number>
): {
  Excellent: number;
  Good: number;
  Average: number;
  Poor: number;
  Terrible: number;
} => {
  const stats = {
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
    Terrible: 0,
  };
  data.forEach((item) => {
    const rating = Math.round(item);
    if (rating === 5) {
      stats.Excellent += 1;
    } else if (rating === 4) {
      stats.Good += 1;
    } else if (rating === 3) {
      stats.Average += 1;
    } else if (rating === 2) {
      stats.Poor += 1;
    } else {
      stats.Terrible += 1;
    }
  });

  return stats;
};
const validateRating = (rating: number, totalRatings: number) => {
  if (totalRatings === 0) {
    return 0;
  }
  return rating / totalRatings;
};
type ProgressReviewBarProps = {
  ratings: Array<number>;
  fillColor?: string;
  backgroundColor?: string;
};
export const ProgressReviewBars = ({
  ratings,
  ...props
}: ProgressReviewBarProps & ProgressBarStyleProps) => {
  const ratingStats = getReviewFrequency(ratings);
  const ratingStatKeys = Object.keys(ratingStats);
  let totalRatings = 0;

  ratingStatKeys.forEach((key) => {
    totalRatings += ratingStats[key as keyof typeof ratingStats];
  });

  return (
    <>
      {ratingStatKeys.map((key: string) => {
        const rating = ratingStats[key as keyof typeof ratingStats];
        const percent = validateRating(rating, totalRatings);
        const completed = percent * 100;
        return (
          <div
            className={`${progressBarStyles['flex-container']}
          `}
          >
            <p className={progressBarStyles.text}>{key}</p>
            <ProgressBar {...props} completed={completed} borderRadius={0} />
            <p className={progressBarStyles.rating}>{rating}</p>
          </div>
        );
      })}
    </>
  );
};

export default ProgressReviewBars;
