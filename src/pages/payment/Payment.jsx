import React, { useState } from "react";
import { FaStripe } from "react-icons/fa";
import Layout from "../../layout/ClientLayout";
import { Link } from "react-router-dom";



const Payment = () => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  return (
    <div>
      <Layout>
        <div className="px-8 py-4 ">
          <h2 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-[#464E5F] font-semibold ">
            Select payment method
          </h2>
          <div
            className="flex lg:flex-row flex-col items-center
           border border-[#E5EAEE] lg:p-4 xl:p-6 2xl:p-8 3xl:p-10 rounded mt-10 lg:gap-16 gap-0 hover:shadow-custom-light cursor-pointer"
          >
            <div className="bg-[#EBF4F5] rounded px-4 py-3 2xl:px-5">
              <FaStripe className="size-4 xl:size-5 2xl:size-6 3xl:size-8" color="#2E8F96" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base text-[#464E5F] font-bold ">Stripe</p>
              <p className="text-[10px] xl:text-[10px] 2xl:text-xs 3xl:text-sm text-[#464E5F] font-regular">
                When you confirm, you will be redirected to the payment gateway
                to make the payment by bank card and finalise the order.
              </p>
            </div>
          </div>

          <div className="my-6 space-y-7">
            <div>
              <p
                className="cursor-pointer text-xs xl:text-sm 2xl:text-base text-[#2E8F96]"
                onClick={() => setShowDiscountInput(!showDiscountInput)}
              >
                Do you have a discount code?
              </p>
              {showDiscountInput && (
                <div className="flex space-x-2 mt-5 gap-5">
                  <input
                    id="discountCode"
                    name="discountCode"
                    type="text"
                    placeholder="Discount code"
                    className="p-3 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-72 focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-[#2E8F96] text-white font-semibold text-[10px] xl:text-xs 2xl:text-sm rounded-md hover:bg-[#247679] focus:outline-none">
                    Validate discount code
                  </button>
                </div>
              )}
            </div>

            <div>
              <p
                className="cursor-pointer text-xs xl:text-sm 2xl:text-base text-[#2E8F96]"
                onClick={() => setShowEmailInput(!showEmailInput)}
              >
                Do you want to send the confirmation email to a different email
                address to that of your account?
              </p>
              {showEmailInput && (
                <div className="mt-5">
                  <input
                    id="confirmationEmail"
                    name="confirmationEmail"
                    type="email"
                    placeholder="Email"
                    className="p-3 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-72 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <hr className="my-10" />

          <div className="flex justify-between items-center mt-5">
            {/* Checkbox and Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 border border-solid border-transparent bg-[#EBEDF3] rounded appearance-none checked:appearance-white checked:bg-[#2E8F96]  checked:text-white  cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 text-xs xl:text-sm 2xl:text-base text-[#464E5F]">
                I have read and accept the{" "}
                <a href="#" className="text-[#2E8F96] hover:underline">
                  Terms and conditions of sale
                </a>
              </label>
            </div>

            {/* Confirm Order Button */}
            <Link href="/confirmed-order">
              <button className="bg-[#FD8C04] text-white text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]">
                Confirm order
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Payment;
