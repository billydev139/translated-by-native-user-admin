import React, { forwardRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputBox = forwardRef(
  ({ label, placeholder, onChange, value, name, id, type, required, disabled }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className='mb-4 w-full'>
        <label
          htmlFor={id}
          className='text-text text-xs font-medium sm:text-sm mb-1.5'
        >
          {label} {required && <span className='text-meta-1'>*</span>}
        </label>
        <div className='relative'>
          <input
            ref={ref}
            type={showPassword ? 'text' : type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className='appearance-none border border-slate-200 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand w-full pr-10'
          />
          {type === 'password' && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none'
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
        </div>
      </div>
    );
  }
);
// Add displayName to the component for better debugging
InputBox.displayName = "InputBox";
export default InputBox;
