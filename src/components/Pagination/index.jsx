import React from "react";
import { MdChevronLeft, MdChevronRight, MdMoreHoriz } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 7; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
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



// import PropTypes from 'prop-types';
// import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onNextPage,
//   onPrevPage,
//   onPageChange,
//   hasNext,
//   hasPrev,
// }) => {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className='p-4 sm:p-6 xl:p-7.5 flex items-center justify-center'>
//       <nav>
//         <ul className='flex flex-wrap items-center bg-white rounded-md'>
//           <li>
//             <button
//               onClick={onPrevPage}
//               disabled={!hasPrev}
//               className='flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:bg-gray'
//             >
//               <GrFormPrevious />
//             </button>
//           </li>
//           {pages.map(page => (
//             <li key={page}>
//               <button
//                 onClick={() => onPageChange(page)}
//                 className={`flex items-center justify-center border border-stroke border-l-transparent py-[5px] px-4 font-medium${
//                   page === currentPage ? 'border-primary bg-primary text-white' : ''
//                 }`}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}
//           <li>
//             <button
//               onClick={onNextPage}
//               disabled={!hasNext}
//               className='flex h-9 w-9 items-center justify-center rounded-r-md border border-stroke hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:bg-gray'
//             >
//               <GrFormNext />
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// Pagination.propTypes = {
//   currentPage: PropTypes.number,
//   totalPages: PropTypes.number,
//   onNextPage: PropTypes.func,
//   onPrevPage: PropTypes.func,
//   onPageChange: PropTypes.func,
//   hasNext: PropTypes.bool,
//   hasPrev: PropTypes.bool,
// };

// export default Pagination;
