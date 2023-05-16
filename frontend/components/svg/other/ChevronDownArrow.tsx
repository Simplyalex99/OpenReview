import React from 'react';

export const ChevronDownArrowSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <polyline
        points="112 184 256 328 400 184"
        style={{
          fill: 'none',
          stroke: '#000',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '48px',
        }}
      />
    </svg>
  );
};
export default ChevronDownArrowSVG;
