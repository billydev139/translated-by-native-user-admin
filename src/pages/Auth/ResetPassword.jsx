import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../../redux/feature/auth/auth.service"; // Assuming you have this action
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../schema/auth.schema";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Get the token from URL parameters

  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // State for showing repeat password

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: resetPasswordSchema, // Validation schema for password
    onSubmit: async (values) => {
      console.log("Resetting password with token: ", resetToken);
      
      await dispatch(resetUserPassword({ resetToken, password: values.password, repeatPassword: values.repeatPassword }))
        .then(() => {
          console.log("Password reset successfully");
          navigate("/auth/login"); // Redirect to login page after resetting password

        })
        .catch((error) => {
          console.error("Error resetting password: ", error);
        });
    },
  });

  return (
    <div className="bg-[#305e73]">
      <div className="m-auto flex justify-center items-center h-screen w-180">
        <div className="2xsm:px-2.5 xsm:px-8 sm:px-12 py-12 rounded-md bg-white shadow-default ">
          <div className="flex flex-wrap items-center justify-center ">
            <div className="w-full ">
              <div className="w-full p-4 sm:p-12.5 xl:p-5">
                <h2 className="m-9 mb-9 text-xl sm:text-2xl md:text-3xl xl:text-title-xl2 font-bold text-black ">
                  Reset Your Password
                </h2>

                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        name="password"
                        placeholder="Enter your new password"
                        className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.password && formik.errors.password
                            ? 'border-red-500'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <div 
                        className="absolute right-2 top-4 cursor-pointer" 
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 mt-2">{formik.errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showRepeatPassword ? "text" : "password"} // Toggle password visibility
                        name="repeatPassword"
                        placeholder="Confirm your new password"
                        className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.repeatPassword && formik.errors.repeatPassword
                            ? 'border-red-500'
                            : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repeatPassword}
                      />
                      <div 
                        className="absolute right-2 top-4 cursor-pointer" 
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)} // Toggle password visibility
                      >
                        {showRepeatPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                      </div>
                      {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                        <div className="text-red-500 mt-2">{formik.errors.repeatPassword}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value={formik.isSubmitting ? "Resetting..." : "Reset Password"}
                      className="w-full cursor-pointer rounded-lg border border-[#305e73] bg-[#305e73] p-4 text-white transition hover:bg-opacity-90"
                      disabled={formik.isSubmitting} // Disable the button while submitting
                    />
                  </div>
                </form>
                <p className="float-right mb-4 text-[10px] xl:text-sm 2xl:text-base text-[#305e73] mt-2">
                  <Link to="/auth/login" className="text-[#305e73]">
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
