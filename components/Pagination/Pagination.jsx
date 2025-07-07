"use client";

import Image from "next/image";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`mt-20 flex items-center justify-center gap-4 ${className}`}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
      >
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={40}
          height={40}
          className="rotate-180"
        />
      </button>
      <span className="text-lg font-semibold">
        Stranica {currentPage} od {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
      >
        <Image src="/icons/arrow.svg" alt="arrow" width={40} height={40} />
      </button>
    </div>
  );
};

export default Pagination;
