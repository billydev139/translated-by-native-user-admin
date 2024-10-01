// CountrySelect.js
import React from "react";
import Select from "react-select";
import { getNames } from "country-list";

// Get the list of countries from the country-list package
const countries = getNames().map((country) => ({
  label: country,
  value: country,
}));

const CountrySelect = ({ label, placeholder, onChange, value }) => {
  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#F3F6F9', // Set the background color here
      border: 'none', // Optional: Customize the border
      boxShadow: 'none', // Remove the box shadow
      '&:hover': {
        border: '1px solid #80bdff', // Optional: Change border color on hover
      },
      height: '45px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the dropdown appears above other elements
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px', // Change the font size of the placeholder
      color: '#A0AEC0', // Optional: Change the color of the placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '14px', // Change the font size of the selected value
    }),
  };

  return (
    <div>
      {/* <label>{label}</label> */}
      <Select
        styles={customStyles} // Apply custom styles
        options={countries}
        placeholder={placeholder}
        onChange={onChange}
        value={countries.find((country) => country.value === value)}
      />
    </div>
  );
};

export default CountrySelect;
