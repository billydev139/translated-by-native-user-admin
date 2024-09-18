import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Show first 3 pages and ellipses before the last page
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show ellipses before the last 3 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show ellipses before and after the current page range
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="p-4 sm:p-0 flex justify-end">
      <nav>
        <ul className="flex flex-wrap items-center gap-2">
          <li
            className={`flex h-8 w-8 items-center justify-center cursor-pointer rounded hover:bg-primary hover:text-white ${
              currentPage === 1 && 'pointer-events-none opacity-50'
            }`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <MdChevronLeft className="fill-current" />
          </li>
          {pageNumbers.map((page, index) => (
            <li
              key={index}
              className={`flex text-subtitle-xsm items-center justify-center cursor-pointer rounded py-1.5 px-4 font-medium hover:bg-secondary hover:text-white ${
                currentPage === page && 'bg-secondary text-white'
              }`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
            >
              {page}
            </li>
          ))}
          <li
            className={`flex h-8 w-8 items-center justify-center rounded cursor-pointer hover:bg-secondary hover:text-white ${
              currentPage === totalPages && 'pointer-events-none opacity-50'
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <MdChevronRight className="fill-current" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
