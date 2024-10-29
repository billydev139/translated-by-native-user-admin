

import React, { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { useFormik } from "formik";
import Layout from "../../layout/ClientLayout";
import { companySchema, individualSchema, selfEmployedSchema } from "../../schema//user.schema";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/feature/order/order.service";
import { authRegister } from "../../redux/feature/auth/auth.service";
import Swal from "sweetalert2";
import { setCartData, setCurrentCreateOrder } from "../../redux/feature/order/order.slice";
import { Link, useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import CountrySelect from "../../utils/CountrySelect";
import {registerSchema} from "../../schema/user.schema";

const BillingInformation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authRegisterLoading = useSelector((state) => state.loading[authRegister.typePrefix] || false)
  const orderSummary = useSelector((state) => state?.order?.orderSummary);
  
  const [accessToken, setAccessToken] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Function to handle the change of selected country
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // Update the selected country state
  }; 
  
  const getToken = () => localStorage.getItem("accessToken");
  // const token = localStorage.getItem("accessToken");

  useEffect(() => {

    // const getToken = () => localStorage.getItem("accessToken");

    const token = getToken();
    

    if (token && token !== "undefined" && token !== "null" && token !== "") {
      setAccessToken(token); // Token is valid, set to true
    } else {
      setAccessToken(null); // No valid token, set to false
    }
  }, [dispatch]); //getToken(), dispatch


  const userDetails = [
    {
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
    {
      id: "repeat_password", // Change to match the schema field name
      type: "password",
      label: "Repeat password",
      placeholder: "Repeat password",
    },
  ];

  const billingDetails = [
    {
      id: "name",
      type: "text",
      label: "Name",
      placeholder: "Name",
    },
    {
      id: "surname",
      type: "text",
      label: "Surname",
      placeholder: "Surname",
    },
    {
      id: "phone", // Change to a camelCase name
      type: "text",
      label: "Phone",
      placeholder: "Enter Phone Number",
    },
  ];

  const companyDetails = [
    {
      id: "companyName",
      type: "text",
      label: "Company Name",
      placeholder: "Company Name",
    },
    {
      id: "address",
      type: "text",
      label: "Company Address",
      placeholder: "Company Address",
    },
    {
      id: "VAT",
      type: "text",
      label: "VAT",
      placeholder: "VAT",
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      options: []
    },
    {
      id: "municipality",
      type: "text",
      label: "Municipality",
      placeholder: "Municipality",
    },
    {
      id: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Postcode",
    },
  ];

  const individualDetails = [
    {
      id: "individualId",
      type: "text",
      label: "Individual ID",
      placeholder: "Individual ID",
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      options: [
      ],
    },
    {
      id: "address",
      type: "text",
      label: "Address",
      placeholder: "Address",
    },
    {
      id: "municipality",
      type: "text",
      label: "Municipality",
      placeholder: "Municipality",
    },
    {
      id: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Postcode",
    },
  ];

  const selfEmployedDetails = [
    {
      id: "address",
      type: "text",
      label: "Address",
      placeholder: "Address",
    },
    {
      id: "municipality",
      type: "text",
      label: "Municipality",
      placeholder: "Municipality",
    },
    {
      id: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Postcode",
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      options: []
    },
  ];

  const [userType, setUserType] = useState("INDIVIDUAL");

  // Determine which array to display based on selected type
  const whatAreYouDetails =
    userType === "COMPANY" ? companyDetails
    : userType === "INDIVIDUAL" ? individualDetails
    : selfEmployedDetails;

  // Function to get the schema based on selected type
  const getValidationSchema = (userType) => {
    switch (userType) {
      case "COMPANY":
        return companySchema;
      case "INDIVIDUAL":
        return individualSchema;
      case "SELF_EMPLOYED":
        return selfEmployedSchema;
      default:
        return selfEmployedSchema;
    }
  };

  // Inside your component
  const formik = useFormik({

    initialValues: {
      email: "",
      password: "",
      repeat_password: "",
      name: orderSummary?.name || "",
      surname: orderSummary?.surname || "",
      phone: orderSummary?.phone || "",
      address: orderSummary?.address || "",
      municipality: orderSummary?.municipality || "",
      postcode: orderSummary?.postcode || "",
      country: orderSummary?.country || "",
      companyName: orderSummary?.companyName || "",
      individualId: orderSummary?.individualId || "",
    },

    validationSchema: accessToken ? getValidationSchema(userType) : getValidationSchema(userType).concat(registerSchema) ,

    onSubmit: async (values, { resetForm }) => {

      try {

        const orderData = {
          ...orderSummary,
          ...values,
        };

        // Update order in the Redux store
        dispatch(setCurrentCreateOrder(values));

        // Prepare billing data
        const billData = {

          name: orderData.name || "",
          surname: orderData.surname || "",
          phone: orderData.phone || "",
          whatAreYou: {
            userType: userType,
            companyName: orderData.companyName || "",
            address: orderData.address || "",
            country: orderData.country || "",
            municipality: orderData.municipality || "",
            postcode: orderData.postcode || ""
          }
        };

        const excludeKeys = ["RateType", "serviceType", "total", "WordCount"];
        const orderKeys = ["serviceTypeId", "planId", "file", "topic", "targetLanguageId", "sourceLanguage"];

        // Create a new object to store the order details
        const orderPayload = {};

        // Iterate through orderData and construct the payload for createOrder
        for (const key in orderData) {

          if (excludeKeys.includes(key)) continue; // Skip excluded keys

          if (orderData.hasOwnProperty(key)) {
            let value = orderData[key];

            // Convert array values to comma-separated strings if necessary
            if (Array.isArray(value)) {
              value = value.join(",");
            }

            // Handle specific keys like TargetLanguage, SourceLanguage, extras, and Plan
            if (key === "TargetLanguage") {
              orderPayload.targetLanguageId = orderData[key];
              continue;
            }

            if (key === "file") {
              const files = orderData[key]?.map((file) => file.fileName);
              orderPayload.files = files;
              continue;
            }

            if (key === "SourceLanguage") {
              orderPayload.sourceLanguage = value;
              continue;
            }

            if (key === "extras") {
              const serviceTypeId = orderData[key]?.label?.map((item) => item._id);
              orderPayload.serviceTypeId = serviceTypeId;
              continue;
            }

            if (key === "Plan") {
              orderPayload.planId = orderData?.Plan?._id;
              continue;
            }

            // Only include necessary keys for the order
            if (orderKeys.includes(key)) {
              orderPayload[key] = value;
            }
          }
        }

        const orderPayloadData = {
          ...orderPayload,
          ...billData
        };

        // Construct the billing data
        const register = {
          email: orderData.email || "",
          password: orderData.password || "",
          repeat_password: orderData.repeat_password || "",
        };
        // Check accessToken status
        if (!accessToken) {
          console.log('No access token found, registering user...');
          // No token, register first
          dispatch(authRegister({ ...register, ...billData }))
            .unwrap()
            .then((response) => {
              // Ensure step_2 is being updated
              const updatedOrderSummary = {
                ...orderSummary,
                steps: {
                  ...orderSummary.steps,
                  step_2: true,
                }
              };

              // Dispatch action with updated summary data
              dispatch(setCurrentCreateOrder(updatedOrderSummary));
              Swal.fire({
                title: 'Success',
                text: response?.data?.message || 'Registration successful',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((swalResult) => {
                if (swalResult.isConfirmed) {
                  dispatch(setCartData(orderPayloadData));
                  console.log('Navigating to payment...');
                  navigate("/payment");
                }
              });
            })
            .catch((error) => {
              console.error('Error during registration:', error);
            });
        } else {
          // Ensure step_2 is being updated
          const updatedOrderSummary = {
            ...orderSummary,
            steps: {
              ...orderSummary.steps,
              step_2: true,
            }
          };       
          
          // Token exists, proceed with order creation
          dispatch(setCurrentCreateOrder(updatedOrderSummary));
          dispatch(setCartData(orderPayloadData));
          console.log('Navigating to payment page...');
          navigate("/payment");
        }

      } catch (error) {
          console.error('Error in order submission:', error);
          Swal.fire({
            title: 'Error',
            text: error?.response?.data?.message || 'Registration failed',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
    }

  });


  useEffect(() => {
    if (selectedCountry?.value !== formik.values.country) {
      // Update Formik state with the selected country value
      formik.setFieldValue("country", selectedCountry?.value || "");
    
      // Dispatch the action to update the order summary
      dispatch(setCurrentCreateOrder({
        ...orderSummary,
        country: selectedCountry?.value || "",
      }));
    }
  }, [selectedCountry]);

  return (

    <Layout>
      <div className="px-8 ">
        {
          !accessToken && (
            <div className="flex items-center gap-3 pl-10 bg-[#ADD0D4] py-2.5 xl:py-3 2xl:py-4 rounded-md">
              <CiUser className="size-4 xl:size-5 2xl:size-6" color="#2E8F96" />
              <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base"> Already have an account? </p>
              <Link
                to="/auth/login"
                className="text-[#2E8F96] text-[10px] xl:text-xs 2xl:text-sm font-semibold"
              >
                Log in
              </Link>
            </div>)
        }

        <form onSubmit={formik.handleSubmit}>
          {!accessToken &&
            <div className="mt-10">
              <h2 className="text-base xl:text-lg 2xl:text-xl text-[#464E5F] font-semibold">
                User details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {userDetails.map((field) => (
                  <div key={field.id}>
                    <label
                      className="block text-[#464E5F] text-[10px] xl:text-xs 2xl:text-sm font-regular mb-2"
                      htmlFor={field.id}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field.id]}
                      className="p-1.5 xl:p-[10px] 2xl:p-3 text-[10px] xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none"
                    />
                    {formik.touched[field.id] && formik.errors[field.id] && (
                      <div className="text-[10px] xl:text-xs 2xl:text-sm text-red-500 mt-1">
                        {formik.errors[field.id]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          }

          <div className="mt-10">
            <h2 className="text-base xl:text-lg 2xl:text-xl text-[#464E5F] font-semibold">
              Billing details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {billingDetails.map((field) => (
                <div key={field.id}>
                  <label
                    className="block text-[#464E5F] text-[10px] xl:text-xs 2xl:text-sm font-regular mb-2"
                    htmlFor={field.id}
                  >
                    {field.label} *
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field.id]}
                    // text-[#B5B5C3]
                    className="p-1.5 xl:p-[10px] 2xl:p-3 text-[10px] xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#3F4254] placeholder:text-[#3F4254] rounded-md w-full focus:outline-none"
                  />
                  {formik.touched[field.id] && formik.errors[field.id] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[field.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-base xl:text-lg 2xl:text-xl text-[#464E5F] font-semibold mb-4">
              What are You?
            </h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4 text-[#464E5F] xl:text-xs 2xl:text-sm font-regular">
                <input
                  type="radio"
                  name="type"
                  className="mr-2"
                  value="COMPANY"
                  checked={userType === "COMPANY"}
                  onChange={() => setUserType("COMPANY")}
                />
                <p> Im company </p>
              </div>
              <div className="flex items-center mr-4 text-[#464E5F] xl:text-xs 2xl:text-sm font-regular">
                <input
                  type="radio"
                  name="type"
                  className="mr-2"
                  value="INDIVIDUAL"
                  checked={userType === "INDIVIDUAL"}
                  onChange={() => setUserType("INDIVIDUAL")}
                />
                <p> Im individual </p>
              </div>
              <div className="flex items-center text-[#464E5F] xl:text-xs 2xl:text-sm font-regular">
                <input
                  type="radio"
                  name="type"
                  className="mr-2"
                  value="SELF_EMPLOYED"
                  checked={userType === "SELF_EMPLOYED"}
                  onChange={() => setUserType("SELF_EMPLOYED")}
                />
                <p> Im self-employed </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-9 mb-6">
              {whatAreYouDetails.map((field) => (
                <div key={field.id}>
                  <label
                    className="block text-[#464E5F] text-[10px] xl:text-xs 2xl:text-sm font-regular mb-2"
                    htmlFor={field.id}
                  >
                    {field.label} *
                  </label>
                  {(field.type === "select" && field.id === "country") ? (
                    <div className="relative inline-block w-full">
                      <CountrySelect
                        label="Country"
                        placeholder="Select a country"
                        onChange={handleCountryChange} // Pass the change handler
                        value={selectedCountry ? selectedCountry.value : null} // Pass the selected country value
                      />
                    </div>
                  ) : field.type === "select" ? (
                    <div className="relative inline-block w-full">
                      <select
                        id={field.id}
                        name={field.id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field.id]}
                        className="custom-select p-3 pr-8 bg-[#F3F6F9] text-[#3F4254] rounded-md w-full focus:outline-none appearance-none"
                      >
                        {field.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-[#B5B5C3]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field.id]}
                      // text-[#B5B5C3]
                      className="p-1.5 xl:p-[10px] 2xl:p-3 text-[10px]  xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#3F4254] placeholder:text-[#3F4254] rounded-md w-full focus:outline-none"
                    />
                  )}
                  {formik.touched[field.id] && formik.errors[field.id] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[field.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="my-12 2xl:my-16" />

          <div className="flex items-center justify-end gap-4">
            {/* <button className="text-[#2E8F96] bg-[#F3F6F9] text-xs 2xl:text-sm flex justify-center gap-2 items-center px-4 py-3 rounded-md font-semibold">
              <IoMailOutline className="text-sm 2xl:text-base font-semibold" />
              Send quote by email
            </button> */}

            <button
              type="submit"
              // disabled={authRegisterLoading}
              className="px-5 xl:px-6 2xl:px-8 py-3 text-white text-xs font-semibold 2xl:text-sm bg-[#FD8C04] rounded-md hover:bg-[#e69500] focus:outline-none"
            >
              {authRegisterLoading ? "Please wait..." : "Continue"}
            </button>


          </div>

        </form>
      </div>
    </Layout>
  );
};

export default BillingInformation;
