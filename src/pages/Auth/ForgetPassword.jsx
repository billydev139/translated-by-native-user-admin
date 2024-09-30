import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetEmail, sendVerificationEmail } from "../../redux/feature/auth/auth.service";
import { sendPasswordReset } from "../../schema/auth.schema";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const sendingEmailLoading = useSelector((state) => state?.loading[sendPasswordResetEmail.typePrefix]);
  
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: sendPasswordReset, // Validation schema to verify if it's a valid email
    onSubmit: async (values) => {
      console.log("Sending password reset email to: ", values.email);

      await dispatch(sendPasswordResetEmail({ email: values.email }))
        .then(() => {
          setEmailSent(true); // Show success message when email is sent
        })
        .catch((error) => {
          console.error("Error sending password reset email: ", error);
        });
    },
  });

  return (
    <div className="bg-[#305e73]">
    <div className=" m-auto  flex justify-center items-center h-screen w-180">
      <div className="2xsm:px-2.5 xsm:px-8 sm:px-12 py-12 rounded-md bg-white shadow-default ">
        <div className="flex flex-wrap items-center justify-center ">
          <div className="w-full   ">
            <div className="w-full p-4 sm:p-12.5 xl:p-5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              {/* sm:text-title-xl2 */}
              <h2 className="m-9 mb-9 text-xl sm:text-2xl md:text-3xl xl:text-title-xl2 font-bold text-black ">
                Send Password Reset Email
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-500'
                          : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                  {
                    formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 mt-2">{formik.errors.email}</div>
                    ) 
                    : (null)
                  }
                  {/* Back to login */}
                    <p className="float-right mb-4 text-[10px] xl:text-sm 2xl:text-base text-[#305e73] mt-2">
                      <Link to="/auth/login" className="text-[#305e73]">
                      Back to Sign In
                      </Link>
                    </p>
                </div>
                
                <div className="mb-5">
                  <input
                    type="submit"
                    value={sendingEmailLoading ? "Sending..." : "Send Password Reset Email"}
                    className="w-full cursor-pointer rounded-lg border border-[#305e73] bg-[#305e73] p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ForgetPassword;
