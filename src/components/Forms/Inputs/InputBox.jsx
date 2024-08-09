import { forwardRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const InputBox = forwardRef(
  (
    {
      label,
      placeholder,
      onChange,
      value,
      name,
      id,
      type = 'text',
      required,
      defaultValue,
      disabled,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <>
        {label && (
          <label htmlFor={id} className='mb-2.5 block text-black '>
            {label} {required && <span className='text-meta-1'>*</span>}
          </label>
        )}
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
            defaultValue={defaultValue}
            className={twMerge(
              `w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter`
            )}
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
      </>
    );
  }
);

InputBox.displayName = 'InputBox';

InputBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'number', 'email']),
  required: PropTypes.bool,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
};

export default InputBox;
