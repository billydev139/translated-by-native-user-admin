

import React, { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { useFormik } from "formik";
import Layout from "../../layout/ClientLayout";
import { companySchema, individualSchema, selfEmployedSchema } from "../../schema//user.schema";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/feature/order/order.service";
import { authRegister } from "../../redux/feature/auth/auth.service";
import Swal from "sweetalert2";
import { clearOrderState, setCurrentCreateOrder } from "../../redux/feature/order/order.slice";
import { Link, useNavigate } from "react-router-dom";

const BillingInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderLoading = useSelector((state) => {
    const { loading } = state;
    const createOrderLoading = loading[createOrder.typePrefix] || false;
    const authRegisterLoading = loading[authRegister.typePrefix] || false;
  
    return createOrderLoading || authRegisterLoading || false;
  });
    const orderSummary = useSelector((state) => state?.order?.orderSummary);
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
      id: "VAT",
      type: "text",
      label: "Company VAT",
      placeholder: "Company VAT",
    },
    {
      id: "address",
      type: "text",
      label: "Company Address",
      placeholder: "Company Address",
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        // Add more countries as needed
      ],
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
      id: "individualIncome",
      type: "text",
      label: "Annual Income",
      placeholder: "Annual Income",
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
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        // Add more countries as needed
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
      id: "VAT",
      type: "text",
      label: "VAT",
      placeholder: "VAT",
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
    {
      id: "country",
      type: "select",
      label: "Country",
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        // Add more countries as needed
      ],
    },
  ];

  const [userType, setUserType] = useState("INDIVIDUAL");
  // Determine which array to display based on selected type
  const whatAreYouDetails =
    userType === "COMPANY"
      ? companyDetails
      : userType === "INDIVIDUAL"
      ? individualDetails
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
      VAT: orderSummary?.VAT || "",
      address: orderSummary?.address || "",
      municipality: orderSummary?.municipality || "",
      postcode: orderSummary?.postcode || "",
      country: orderSummary?.country || "",
      companyName: orderSummary?.companyName || "",
      individualId: orderSummary?.individualId || "",
      individualIncome: orderSummary?.individualIncome || "",
    },
    validationSchema: getValidationSchema(userType),
    onSubmit: (values, { resetForm }) => {
      // if (orderSummary?.order_completed) {
      //   navigate("/payment");
      //   return ;
      // }
      const orderData = {
        ...orderSummary,
        ...values,
      };    
      dispatch(setCurrentCreateOrder(values));
      const billData = {
        name: orderData.name || "",
        surname: orderData.surname || "",
        phone: orderData.phone || "",
        whatAreYou: {
          userType: userType,
          companyName: orderData.companyName || "",
          VAT: orderData.VAT || "",
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
            const value = orderData[key] ;
            const targetLanguagesId = value && value?.map((targetLanguage) => targetLanguage._id);
            orderPayload.targetLanguageId = targetLanguagesId;
            continue;
          }

          // Handle specific keys like TargetLanguage, SourceLanguage, extras, and Plan
          if (key === "file") {
            const value = orderData[key] ;
            const files = value && value?.map((file) => file.fileName);
            orderPayload.files = files;
            continue;
          }
    
          if (key === "SourceLanguage") {
            orderPayload.sourceLanguage = value;
            continue;
          }
    
          if (key === "extras") {
            const value = orderData[key] ;
            const serviceTypeId = value?.label?.map((item) => item._id);
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
      }
      // Construct the billing data
      const WhatAreWe = {
        ...billData,
        email: orderData.email || "",
        password: orderData.password || "",
        repeat_password: orderData.repeat_password || "",
      };    
      // Function to handle registration and order creation
  const registerAndCreateOrder = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        // No token, register first
        dispatch(authRegister(WhatAreWe))
          .unwrap()
          .then((registerResponse) => {
            const token = registerResponse.content?.accessToken
            dispatch(createOrder(orderPayloadData))
            .unwrap()
            .then((response) => {
              Swal.fire({
                title: 'Success',
                text: response?.data?.message || 'Order created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((swalResult) => {
                if (swalResult.isConfirmed) {
                  navigate("/order");
                  dispatch(clearOrderState( {  })); // Clear order details
                }
              });
            })
            .catch((error) => {
              console.error('Error creating order:', error);
            });
          })
          .catch((error) => {
            reject('Registration failed:', error);
          });
      } else {
        // Token exists, proceed with order creation
        resolve(token);
      }
    });
  };

  // Call the registration and order creation process
  registerAndCreateOrder()
    .then((accessToken) => {
      // Proceed with order creation
      dispatch(createOrder(orderPayloadData))
        .unwrap()
        .then((response) => {
          Swal.fire({
            title: 'Success',
            text: response?.data?.message || 'Order created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((swalResult) => {
            if (swalResult.isConfirmed) {
                navigate("/order");
                dispatch(clearOrderState()); // Clear order details
            }
          });
        })
        .catch((error) => {
          console.error('Error creating order:', error);
        });
    })
    .catch((error) => {
      // Handle registration failure
      console.error('Error during registration or token retrieval:', error);
    });
    }
  });

  return (

    <Layout>
      <div className="px-8 ">
        {
          !accessToken && (
          <div className="flex items-center gap-3 pl-10 bg-[#ADD0D4] py-2.5 xl:py-3 2xl:py-4 rounded-md">
            <CiUser className="size-4 xl:size-5 2xl:size-6" color="#2E8F96" />
            <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Already have an account?</p>
            <Link
              to="/auth/login"
              className="text-[#2E8F96] text-[10px] xl:text-xs 2xl:text-sm font-semibold"
            >
              Log in
            </Link>
          </div>)
        }
      
        <form onSubmit={formik.handleSubmit}>
      {  !accessToken &&
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
                    className="p-1.5 xl:p-2 2xl:p-3 text-[10px] xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none"
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
                    className="p-1.5 xl:p-2 2xl:p-3 text-[10px] xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none"
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
              <div className="flex items-center mr-4 text-[#464E5F] text-[10px] xl:text-xs 2xl:text-sm font-regular">
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
                    {field.label}
                  </label>
                  {field.type === "select" ? (
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
                      className="p-1.5 xl:p-2 2xl:p-3 text-[10px] xl:text-xs 2xl:text-sm placeholder:pl-1 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none"
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
          <button
            type="submit"
            disabled = {orderLoading}
            className="px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 2xl:py-3 text-xs xl:text-sm 2xl:text-base bg-[#2E8F96] text-white rounded-md hover:bg-[#247679] focus:outline-none"
          >
            {orderLoading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BillingInformation;