import PropTypes from 'prop-types';
import { IoCalendarOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_orange.css';

const DatePicker = ({
  onChange,
  label,
  id,
  onBlur,
  value,
  name,
  disabled = false,
  required,
}) => {
  return (
    <div className='relative'>
      <label htmlFor={id} className='mb-2.5 block text-black '>
        {label}
        {required && <span className='text-danger'>*</span>}
      </label>
      <div className='relative'>
        <Flatpickr
          value={value}
          name={name}
          id={id}
          disabled={disabled}
          onBlur={onBlur}
          placeholder='Select date'
          onChange={onChange}
          className={twMerge(
            `w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter`
          )}
          options={{
            dateFormat: 'Y-m-d',
            altInput: true,
            altFormat: 'F j, Y',
            inline: false,
          }}
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <IoCalendarOutline className='h-6 w-6 text-gray-400' />
        </div>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default DatePicker;
