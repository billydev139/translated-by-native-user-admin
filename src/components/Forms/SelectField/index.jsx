import { useState } from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ name, formik, label }) => {
  const [selectedOption, setSelectedOption] = useState(formik.values[name] || '');
  const [preview, setPreview] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSelectedOption(value);
    formik.setFieldValue(name, value);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue('file', file);
    }
  };

  return (
    <div className='mb-5'>
      <div className='flex items-center justify-between'>
        <strong className='text-nowrap text-black text-base font-medium'>{label}</strong>
        <div className='max-w-2xl w-full'>
          <select
            name={name}
            className='w-full border border-1 border-gray-6 rounded text-xs p-2 focus:border-primary focus:outline-none text-black'
            value={selectedOption}
            onChange={handleChange}
          >
            <option value=''>Select an option</option>
            <option value='media'>Media</option>
            <option value='color'>Color</option>
          </select>
          {formik.touched[name] && formik.errors[name] ? (
            <div className='text-red-600 text-xs'>{formik.errors[name]}</div>
          ) : null}
        </div>
      </div>

      {selectedOption === 'media' && (
        <div className='mt-4 flex items-center'>
          <input type='file' accept='image/*' onChange={handleFileChange} />
          {preview && (
            <img src={preview} alt='Preview' className='size-10 object-contain' />
          )}
        </div>
      )}

      {selectedOption === 'color' && (
        <div className='mt-4'>
          <input
            type='color'
            value={formik.values.color || '#ffffff'}
            onChange={e => formik.setFieldValue('color', e.target.value)}
            className='border border-1 border-gray-6 rounded'
          />
        </div>
      )}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default SelectField;
