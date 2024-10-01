import React from "react";
import Select from "react-select";
import { getNames } from "country-list";

// Get the list of countries from the country-list package
const countries = getNames().map((country) => ({
  label: country,
  value: country,
}));

const CountrySelect = ({ placeholder, onChange, value }) => {
  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#F3F6F9',
      border: '1px solid transparent',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      height: '33px', // Keep height at 33px
      minHeight: '33px',
      display: 'flex',
      alignItems: 'center', // Ensure vertical centering
      padding: '0 8px', // Horizontal padding
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px',
      color: '#A0AEC0',
      display: 'flex',
      alignItems: 'center', // Vertically center placeholder text
      height: '100%', // Full height for better alignment
      padding: '0', // Remove padding to center it perfectly
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center', // Vertically center selected value text
      height: '100%', // Full height for better alignment
      padding: '0', // Remove padding to center it perfectly
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
  };

  return (
    <div className="relative inline-block w-full">
      <Select
        styles={customStyles}
        options={countries}
        placeholder={placeholder}
        onChange={onChange}
        value={countries.find((country) => country.value === value)}
      />
    </div>
  );
};

export default CountrySelect;
