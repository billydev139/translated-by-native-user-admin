import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import PropTypes from 'prop-types';

const SelectGroup = React.forwardRef(function SelectGroup(
  { label, id, onChange, required, children, name, defaultValue, disabled },
  ref
) {
  return (
    <>
      {label && (
        <label htmlFor={id} className='mb-2.5 block text-black'>
          {label} {required && <span className='text-meta-1'>*</span>}
        </label>
      )}

      <div className='relative z-20 bg-transparent'>
        <select
          ref={ref}
          id={id}
          name={name}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}
          className={`relative z-20 w-full capitalize appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition disabled:bg-whiter focus:border-primary active:border-primary `}
        >
          {children}
        </select>

        <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
          <IoIosArrowDown />
        </span>
      </div>
    </>
  );
});

SelectGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
};

export default SelectGroup;
