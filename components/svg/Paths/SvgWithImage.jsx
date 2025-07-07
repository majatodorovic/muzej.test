"use client";
import React from "react";

const SvgWithImage = ({ image, alt }) => {
  return (
    <div className="relative aspect-square w-full">
      <svg
        viewBox="0 0 11.64 9.53"
        className="absolute h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="svgPath" clipPathUnits="objectBoundingBox">
            <path
              d="M0.246,0.172 C0.187,0.201,0.154,0.248,0.135,0.32 C0.117,0.388,0.135,0.462,0.15,0.531 C0.166,0.603,0.186,0.675,0.219,0.739 C0.252,0.803,0.298,0.858,0.355,0.885 C0.406,0.909,0.462,0.91,0.516,0.908 C0.6,0.905,0.685,0.894,0.763,0.853 C0.802,0.832,0.841,0.801,0.86,0.753 C0.875,0.715,0.875,0.671,0.875,0.628 C0.874,0.542,0.87,0.455,0.849,0.372 C0.828,0.289,0.791,0.21,0.734,0.16 C0.676,0.108,0.602,0.09,0.53,0.092 C0.458,0.094,0.388,0.115,0.319,0.138 C0.285,0.15,0.278,0.154,0.246,0.172"
              transform="translate(-0.045 ,-0.06) scale(1.09,1.12)"
              fill="#224e35"
            />
          </clipPath>
        </defs>
        <image
          alt={alt ?? "image"}
          href={image}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#svgPath)"
        />
      </svg>
    </div>
  );
};
export default SvgWithImage;
