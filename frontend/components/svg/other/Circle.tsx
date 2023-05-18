import React from 'react';

export const CircleSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.8699 5.84C10.8699 8.81 8.46988 11.21 5.49988 11.21C2.52988 11.21 0.129883 8.81 0.129883 5.84C0.129883 2.87 2.52988 0.470016 5.49988 0.470016C8.45988 0.470016 10.8699 2.87 10.8699 5.84Z"
        fill="#DA5077"
      />
    </svg>
  );
};
export default CircleSVG;
