import React from 'react';

const Badge = ({ label, status, style = 'text-green-600 bg-green-100' }) => {
  return (
    <div className='flex items-center gap-1.5'>
      <strong className='text-xs md:text-base whitespace-nowrap text-black'>{label}</strong>
      <p
        className={`${style} ${'rounded-full px-6 py-1 text-xs md:text-base font-medium'}`}
      >
        {status}
      </p>
    </div>
  );
};

export default Badge;
