import React from 'react';

function Badge({ status, role, action, language }) {

  const getRandomColor = () => {
    const colors = [
      'bg-blue-400/5 text-secondary text-sm',
      'bg-green-400/5 text-green-600 text-sm',
      'bg-yellow-400/5 text-yellow-600 text-sm',
      'bg-red-400/5 text-red-600 text-sm',
      'bg-purple-400/5 text-purple-600 text-sm',
      'bg-pink-400/5 text-pink-600 text-sm',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getStyle = () => {
    // Define styles for status
    const statusStyles = {
      active: 'bg-green-600/5 text-green-600 text-sm',
      inactive: 'bg-red-600/5 text-red-600 text-sm',
      pending: 'bg-yellow-600/5 text-yellow-600 text-sm',
      suspended: 'bg-gray-600/5 text-gray-600 text-sm',
      TRANSLATED: 'bg-blue-500 rounded-full text-white text-base',
      PROCESSING: 'bg-yellow-500 rounded-full text-white text-base',
      REJECTED: 'bg-red-500 rounded-full text-white text-base',
    };

    // Define styles for action
    const actionStyles = {
      read: 'bg-blue-600/5 text-secondary text-sm',
      create: 'bg-green-600/5 text-green-600 text-sm',
      update: 'bg-yellow-600/5 text-yellow-600 text-sm',
      delete: 'bg-red-600/5 text-red-600 text-sm',
      restore: 'bg-green-600/5 text-green-600 text-sm',
    };

    // Apply random color for roles if a role is provided
    if (role) {
      return getRandomColor();
    }
    // Return style for action
    if (action) {
      return actionStyles[action] || 'bg-blue-600/5 text-secondary text-sm';
    }

    // Return style for status
    if (status) {
      return statusStyles[status] || 'text-primary bg-gray-500';
    }

    // Default fallback for language
    if (language) {
      return 'bg-gray-400/5 text-blue-500 text-sm';
    }

    return 'text-primary';
  };

  return (
    <span
      className={`text-[7px] xsm:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-medium ${language ? "px-1 text-xs xsm:text-[8px] sm:text-[10px] md:text-xs 2xl:text-base" : "px-2.5"} py-0.5 rounded h-5 ${getStyle()}`}
    >
      {role || status || action || language}
    </span>
  );
}

export default Badge;
