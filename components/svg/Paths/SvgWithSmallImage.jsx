"use client";
import React from "react";

const SvgWithSmallImage = ({
  className = "",
  image,
  alt,
  fill = "#224e35",
}) => {
  return (
    <div className="relative aspect-square w-full">
      <svg
        className={className}
        viewBox="0 0 170.08 170.96"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="svgPath2" clipPathUnits="userSpaceOnUse">
            <path
              fill={fill}
              d="M5.49,96.99c4.82,27.5,25.25,51.71,51.56,61.08,9.53,3.39,19.66,4.94,29.77,5.24,19.26.57,39.95-4.11,52.87-18.4,5.78-6.4,9.64-14.32,12.62-22.41,4.13-11.21,6.76-23.07,6.7-35.02-.14-29.45-17.94-58.14-44.26-71.34-20.4-10.23-45.15-10.79-66.28-2.4C28.31,21.73,14.52,39.34,8.1,59.83c-3.74,11.96-4.78,24.8-2.61,37.16Z"
            />
          </clipPath>
        </defs>
        <image
          alt={alt ?? "image"}
          href={image}
          // width="130"
          // height="130"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#svgPath2)"
          className="object-cover"
        />
      </svg>
    </div>
  );
};

export default SvgWithSmallImage;
