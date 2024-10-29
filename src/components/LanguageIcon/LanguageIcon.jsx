import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TrancelateButton from "../../assets/images/trancelateButton.png";

// Import flag images (adjust paths as needed)
import enFlag from "../../assets/flags/en.png";
import spFlag from "../../assets/flags/sp.svg";
import frFlag from "../../assets/flags/fr.svg";
import itFlag from "../../assets/flags/it.png";
import jaFlag from "../../assets/flags/ja.svg";
import zhFlag from "../../assets/flags/zh.svg";
import arFlag from "../../assets/flags/ar.svg";

const LanguageIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setIsOpen(false);
  };

  const languageOptions = [
    { value: "en", name: "English", flag: enFlag },
    { value: "sp", name: "Spanish", flag: spFlag },
    { value: "fr", name: "French", flag: frFlag },
    { value: "it", name: "Italian", flag: itFlag },
    { value: "ja", name: "Japanese", flag: jaFlag },
    { value: "zh", name: "Chinese", flag: zhFlag },
    { value: "ar", name: "Arabic", flag: arFlag },
  ];

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={toggleDropdown}
        className="p-0 h-[2.5rem] flex items-center cursor-pointer w-[2.5rem] rounded-full focus:outline-none"
      >
        <img src={TrancelateButton} alt="Translate" className="h-full w-full" />
      </button>

      {isOpen && (
        <div className="absolute w-[180px] h-[240px] left-[-8rem] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[99999]">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              className={`flex items-center justify-between w-full border-b-[1px] border-opacity-25 border-gray-100 bg-white text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                i18n.language === option.value ? "bg-[#E8F0FF]" : ""
              }`}
              onClick={() => handleLanguageChange(option.value)}
            >
              <span className="flex items-center">
                <img
                  src={option.flag}
                  alt={`${option.name} flag`}
                  className="w-[24px] h-[18px] mr-2"
                />
                <span className="text-[rgba(14,39,93,0.90)] font-poppins text-[0.875rem] font-medium leading-[1.125rem]">
                  {option.name}
                </span>
              </span>
              {i18n.language === option.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 16 11"
                  fill="none"
                >
                  <path
                    d="M1 5.34623L5.84086 10.0001L15 1"
                    stroke="#0E275D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageIcon;
