// src/components/Header.jsx
import React from "react";
import { GiWorld } from "react-icons/gi";
// import { logo } from "../../../";

const Header = () => {
  return (
    <div className={`flex justify-between items-center`}>
      <div>
        {/* <Image src={logo} alt="Logo" className="w-20 h-20" /> */}
      </div>
      <div className="flex justify-center items-center gap-2">
        <GiWorld className="text-xl xl:text-2xl 2xl:text-[30px] text-terchary" />
        <p className="text-terchary text-xs xl:text-sm 2xl:text-base"> (€) </p>
        <div className="flex flex-col justify-start items-center">
          <p className="text-[#696969] text-xs xl:text-sm 2xl:text-base font-bold">Contact</p>
          <span className="text-terchary cursor-pointer text-xs xl:text-sm 2xl:text-base font-normal">
            +54854856
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
