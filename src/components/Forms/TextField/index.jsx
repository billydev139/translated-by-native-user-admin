import PropTypes from 'prop-types';

const TextField = ({ label, name, formik, className, type }) => {
  return (
    <div className='mb-5'>
      <div className='flex items-center justify-between'>
        <strong className='text-nowrap text-black text-base font-medium'>{label}</strong>
        <div className='max-w-2xl w-full'>
          <input
            type={type}
            name={name}
            className={`w-full border border-1 border-gray-6 rounded text-xs p-2 focus:border-primary focus:outline-none text-black ${className}`}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched[name] && formik.errors[name] ? (
            <div className='text-red-600 text-xs'>{formik.errors[name]}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default TextField;
