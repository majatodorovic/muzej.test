const SvgInput = ({ className = "", fill = "#f4f2f0" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="2 3 27 3.53"
      className={className}
    >
      <g>
        <path
          fill={fill}
          stroke="#224e35"
          strokeWidth="0.1"
          d="M3.29,5.83c.92.41,1.95.46,2.96.49,5.6.17,11.21.03,16.81-.11,1.45-.04,2.91-.07,4.33-.36.37-.08.75-.17,1.05-.39s.53-.59.49-.96c-.05-.37-.34-.66-.68-.81s-.71-.18-1.08-.2c-6.14-.41-12.3-.35-18.46-.29-1.75.02-3.5.05-5.22.41-.47.1-1.04.13-1.22.65-.26.74.41,1.33,1.02,1.6Z"
        />
      </g>
    </svg>
  );
};

export default SvgInput;
