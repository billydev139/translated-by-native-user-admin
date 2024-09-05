import React from 'react';

const Badge = ({ label, status }) => {

  const getStatusStyle = () => {
    switch (status) {
      case 'REJECTED':
        return 'bg-red-100 text-red-600';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-600';
      case 'TRANSLATED':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className='flex items-center gap-1.5'>
      {/* <strong className='text-xs md:text-base whitespace-nowrap text-black'>{label}</strong> */}
      <p
        className={`${getStatusStyle()} rounded-full px-6 py-1 text-xs md:text-base font-medium`}
      >
        {status}
      </p>
    </div>
  );
};

export default Badge;
