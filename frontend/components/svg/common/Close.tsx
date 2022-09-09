import React from 'react';

export const CloseSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
        {...props}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2 30L30 2m0 28L2 2"
        />
      </svg>
    </>
  );
};

export default CloseSVG;
