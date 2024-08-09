import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const ToggleButton = ({ className, value, onChange, onBlur, name, label }) => {
  return (
    <div className='flex items-center justify-between mb-5'>
      <strong className='text-nowrap text-black text-base font-medium'>{label}</strong>
      <div className='max-w-2xl w-full'>
        <input
          type='checkbox'
          name={name}
          className={twMerge(
            'toggle toggle-lg border-gray-4 bg-white hover:bg-white [--tglbg:#D5D5D5] checked:[--tglbg:#9F020D] checked:border-[#9F020D]',
            className
          )}
          checked={value}
          onChange={e => onChange(e.target.checked)}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default ToggleButton;
