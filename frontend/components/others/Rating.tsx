import React, { useState, KeyboardEvent } from 'react';
import { EmptyStarSVG, HalfStarSVG, FullStarSVG } from '../svg/other/Star';

interface RatingProps {
  className?: string;
  count: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}
export const Rating: React.FC<RatingProps> = ({
  className,
  count,
  value,
  color = '#ffd700',
  hoverColor = '#ffc107',
  activeColor = '#ffc107',
  size = 30,
  edit = false,
  isHalf = true,
  onChange,
  emptyIcon = <EmptyStarSVG />,
  halfIcon = <HalfStarSVG />,
  fullIcon = <FullStarSVG />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    if (!edit) {
      return;
    }
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.keyCode === 13) {
      handleClick(index);
    }
  };

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (isHalf && value - i > 0 && value - i < 1) {
      star = halfIcon;
    } else if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon;
      }
    }

    stars.push(
      <div
        role="button"
        tabIndex={0}
        key={i}
        style={{ cursor: 'pointer' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
        onKeyDown={(e) => handleKeyDown(e, i)}
      >
        {React.cloneElement(star, {
          size,
          color:
            i <= Number(hoverValue)
              ? hoverColor
              : i < value
              ? activeColor
              : color,
        })}
      </div>
    );
  }

  return <div className={`rating ${className}`}>{stars}</div>;
};
export default Rating;
