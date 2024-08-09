import PropTypes from 'prop-types';

const InputField = ({
  name,
  placeholder,
  formik,
  label,
  text,
  type = 'text',
  className = 'w-full border border-1 border-gray-6 rounded text-xs p-2 focus:border-primary focus:outline-none text-black',
}) => (
  <div className='mb-5'>
    <div className='flex items-center justify-between'>
      <strong className='text-nowrap text-black text-base font-medium'>{label}</strong>
      <div className='max-w-2xl w-full'>
        <input
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched[name] && formik.errors[name] ? (
          <div className='text-red-600 text-xs'>{formik.errors[name]}</div>
        ) : null}
        {text && <p className='text-xs font-normal text-black-3 mt-1.5'>{text}</p>}
      </div>
    </div>
  </div>
);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default InputField;
