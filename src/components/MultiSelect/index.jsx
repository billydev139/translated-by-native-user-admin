import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelect = ({ options, onChange, placeholder, value, name }) => {
  return (
    <div>
      <Select
        options={options}
        name={name}
        value={value}
        isMulti
        onChange={onChange}
        placeholder={placeholder}
        styles={{
          placeholder: baseStyles => ({
            ...baseStyles,
            textAlign: 'start',
            fontSize: '12px',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: state.isFocused ? '1px solid #9F020D' : '1px solid #909090',
            boxShadow: state.isFocused ? 'none' : 'none',
            outline: 'none',
            height: '30px',
            '&:hover': {
              border: '1px solid #9F020D',
            },
            textAlign: 'start',
          }),
          menu: baseStyles => ({
            ...baseStyles,
            textAlign: 'start',
            zIndex: 9999,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            textAlign: 'start',
            backgroundColor: state.isFocused ? '#9d585d' : baseStyles.backgroundColor,
            color: state.isFocused ? 'white' : baseStyles.color,
          }),
        }}
      />
    </div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
};

export default MultiSelect;
