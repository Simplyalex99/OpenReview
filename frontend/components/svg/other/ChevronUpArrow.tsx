import React from 'react';

export const ChevronUpArrowSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        points="112 328 256 184 400 328"
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
export default ChevronUpArrowSVG;
