import React from 'react';

export const HamburgerMenuSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 18H3v-2h9v2Zm9-5H3v-2h18v2Zm0-5h-9V6h9v2Z" />
      <use xlinkHref="#one" />
    </svg>
  );
};
export default HamburgerMenuSVG;
