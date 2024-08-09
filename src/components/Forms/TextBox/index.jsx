import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextBox = forwardRef(
  ({ label, placeholder, value, onChange, required, name, id, rows, disabled }, ref) => {
    return (
      <>
        <label htmlFor={id} className='mb-2.5 block text-black '>
          {label} {required && <span className='text-meta-1'>*</span>}
        </label>
        <textarea
          ref={ref}
          rows={rows ?? 2}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
        ></textarea>
      </>
    );
  }
);

TextBox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
};

TextBox.displayName = 'TextBox';

export default TextBox;
