import React, { useEffect, useState } from "react";
import { FaStripe, FaPaypal } from "react-icons/fa";
import Layout from "../../layout/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import PayButton from "./PayButton";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.order?.CartData);

  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Stripe"); // Default to Stripe
  const [termsAccepted, setTermsAccepted] = useState(false); // Track if terms are accepted
  const [accessToken, setAccessToken] = useState(false);

  const getToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    const token = getToken();

    if (token && token !== "undefined" && token !== "null" && token !== "") {
      setAccessToken(token); // Token is valid, set to true
    } else {
      setAccessToken(null); // No valid token, set to false
    }
  }, [getToken(), dispatch]);
  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <Layout>
        <div className="px-8 py-4">
          <h2 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-[#464E5F] font-semibold ">
            Select payment method
          </h2>

          {/* Stripe Payment Option */}
          <div
            onClick={() => handlePaymentMethodSelect("Stripe")}
            className={`flex lg:flex-row flex-col items-center border lg:p-4 xl:p-6 2xl:p-8 3xl:p-10 rounded mt-10 lg:gap-16 gap-0 hover:shadow-custom-light cursor-pointer
              ${selectedPaymentMethod === "Stripe" ? "border-[#FD8C04] shadow-custom" : "border-[#E5EAEE]"}`}
          >
            <div className="bg-[#EBF4F5] rounded px-4 py-3 2xl:px-5">
              <FaStripe className="size-4 xl:size-5 2xl:size-6 3xl:size-8" color="#2E8F96" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base text-[#464E5F] font-bold">
                Stripe
              </p>
              <p className="text-[10px] xl:text-[10px] 2xl:text-xs 3xl:text-sm text-[#464E5F] font-regular">
                When you confirm, you will be redirected to the payment gateway
                to make the payment by bank card and finalize the order.
              </p>
            </div>
          </div>

          {/* PayPal Payment Option */}
          {/* <div
            onClick={() => handlePaymentMethodSelect("PayPal")}
            className={`flex lg:flex-row flex-col items-center border lg:p-4 xl:p-6 2xl:p-8 3xl:p-10 rounded mt-6 lg:gap-16 gap-0 hover:shadow-custom-light cursor-pointer
              ${selectedPaymentMethod === "PayPal" ? "border-[#FD8C04] shadow-custom" : "border-[#E5EAEE]"}`}
          >
            <div className="bg-[#EBF4F5] rounded px-4 py-3 2xl:px-5">
              <FaPaypal className="size-4 xl:size-5 2xl:size-6 3xl:size-8" color="#2E8F96" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base text-[#464E5F] font-bold">
                PayPal
              </p>
              <p className="text-[10px] xl:text-[10px] 2xl:text-xs 3xl:text-sm text-[#464E5F] font-regular">
                When you confirm, you will be redirected to the PayPal gateway
                to complete the payment and finalize the order.
              </p>
            </div>
          </div> */}

          <div className="my-6 space-y-7">
            {/* <div>
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
            </div> */}

            {/* <div>
              <p
                className="cursor-pointer text-xs xl:text-sm 2xl:text-base text-[#2E8F96]"
                onClick={() => setShowEmailInput(!showEmailInput)}
              >
                Do you want to send the confirmation email to a different email address than your account's?
              </p>
              {showEmailInput && (
                <div className="mt-5">
                  <input
                    id="confirmationEmail"
                    name="confirmationEmail"
                    type="email"
                    placeholder="Email"
                    className="p-3 bg-[#F3F6F9] text-[#464E5F] rounded-md w-72 focus:outline-none"
                  />
                </div>
              )}
            </div> */}
          </div>

          <hr className="my-10" />

          <div className="flex justify-between items-center mt-5">
            {/* Checkbox and Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 border border-solid border-transparent bg-[#EBEDF3] rounded appearance-none checked:bg-[#2E8F96] checked:border-[#2E8F96] cursor-pointer"
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="ml-2 text-xs xl:text-sm 2xl:text-base text-[#464E5F]"
              >
                I have read and accept the{" "}
                <a href="#" className="text-[#2E8F96] hover:underline">
                  Terms and conditions of sale
                </a>
              </label>
            </div>

            <style jsx>{`
  input[type="checkbox"]:checked {
    background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M5.333 10.2l-2.866-2.867a.733.733 0 00-1.033 1.034l3.4 3.4a.733.733 0 001.033 0l7.4-7.4a.733.733 0 00-1.034-1.033L5.333 10.2z" fill="%23FFF"/%3E%3C/svg%3E');
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
  }
`}</style>

            {accessToken ? (
              <PayButton cartItems={cartData} paymentMethod={selectedPaymentMethod} termsAccepted={termsAccepted} />
            ) : (
              <button
                className="cart-login"
                onClick={() => navigate("/auth/login")}
              >
                Login to Check out
              </button>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Payment;
