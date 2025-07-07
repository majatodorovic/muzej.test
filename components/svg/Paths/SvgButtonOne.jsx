"use client";

import React from "react";

const SvgButtonOne = ({
  className = "",
  fill = "#224e35",
  stroke = "#224e35",
}) => {
  return (
    <svg
      id="svgButtonOne"
      className={className}
      viewBox="-1 -1 232 47.8"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
        d="M18.4,1.8c-5.1.8-10.2,2.8-13.8,6.5S-1,17.6.5,22.6c1.9,6.3,8.5,9.9,14.7,12.2,12.6,4.6,25.9,6.3,39.2,7.6,44.5,4.3,89.3,3.4,134,2.4,7.4-.2,15-.5,22-2.9s13.5-7.2,16.3-14.1,1.3-15.7-4.6-20.1c-4.7-3.5-11-3.8-16.9-3.9-39.7-.9-79.3-1.7-119-2.6-23-.5-45.1-2.9-67.9.6Z"
      />
    </svg>
  );
};

export default SvgButtonOne;
