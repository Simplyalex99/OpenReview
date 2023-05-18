import React from 'react';

export const PlusSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 13V0M13 6.5H0H13Z"
        stroke="#1D262D"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
export default PlusSVG;
