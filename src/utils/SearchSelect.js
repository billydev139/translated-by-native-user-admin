import React from "react";
import Select from "react-select";
import { getNames } from "country-list";
import { useTranslation } from "react-i18next";

const SearchSelect = ({ type = "country", data = [], placeholder, onChange, value, isMulti = false }) => {
  const { t } = useTranslation();
  
  // Determine the options to use based on the type
  const options = React.useMemo(() => {
    if (type === "country") {
      return getNames().map((country) => ({
        label: t(country), // Translate country names
        value: country,
      }));
    } else if (type === "source") {
      return data.map((item) => ({
        label: t(item), // Translate source items 
        value: item,
      }));
    } else if (type === "topic") {
      return data.map((item) => ({
        label: t(item.topic), // Translate topic items
        value: item.topic,
      }));
    } else {
      return data.map((item) => ({
        label: t(item), // Translate other items
        value: item,
      }));
    }
  }, [type, data, t]); // Add t to dependencies

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#F3F6F9',
      border: '1px solid transparent',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
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
      alignItems: 'center',
      height: '100%',
      padding: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '0',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
  };

  // Update the value to match the selected option(s) for multi-select
  const selectedValue = React.useMemo(() => {
    if (isMulti) {
      // For multi-select, filter options based on the `value` array
      return options.filter((option) => value?.includes(option.value));
    } else {
      // For single-select, find the option that matches the `value`
      return options.find((option) => option.value === value) || null;
    }
  }, [value, options, isMulti]);

  return (
    <div className="relative inline-block w-full">
      <Select
        styles={customStyles}
        options={options}
        placeholder={t(placeholder)} // Translate placeholder
        onChange={onChange}
        value={selectedValue}
        isMulti={isMulti}
      />
    </div>
  );
};

export default SearchSelect;