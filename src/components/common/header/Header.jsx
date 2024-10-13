// src/components/Header.jsx
import React, { useEffect } from "react";
import { GiWorld } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { myProfile } from "../../../redux/feature/auth/auth.service";
import { getMyOrder } from "../../../redux/feature/order/order.service";
// import { logo } from "../../../";

const Header = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isTokenValid = accessToken && accessToken !== "false" && accessToken !== "null" && accessToken !== "undefined";

  const dispatch = useDispatch();
  useEffect(() => {
    if (isTokenValid) {
      // Redirect to SignIn page if the user is not authenticated
      dispatch(myProfile());
    }
    // other side effects
    //...
  }, [isTokenValid, dispatch]);
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
          <a href="tel:+393533169825">+393533169825</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
