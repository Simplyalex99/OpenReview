import React from 'react';

export const SquaresSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <>
      <svg
        width="400"
        height="400"
        viewBox="0 0 572 444"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width="143" height="148" fill="white" />
        <rect x="143" y="148" width="143" height="148" fill="white" />
        <rect y="296" width="143" height="148" fill="white" />
        <rect x="286" y="3" width="143" height="148" fill="white" />
        <rect x="429" y="3" width="143" height="148" fill="white" />
      </svg>
    </>
  );
};
export default SquaresSVG;
