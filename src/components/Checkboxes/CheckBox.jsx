import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(function Checkbox({ label, checked, onChange, name }, ref) {
  return (
    <div className='form-control mb-4.5'>
      <label className='cursor-pointer flex gap-3 items-center'>
        <input
          type='checkbox'
          className='checkbox accent-primary size-5 rounded border-[1.5px] border-stroke'
          checked={checked}
          onChange={onChange}
          name={name}
          ref={ref}
        />
        <span className='label-text font-medium text-base tracking-wide text-black'>
          {label}
        </span>
      </label>
    </div>
  );
});

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
