import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../utils/EndPoints";
import { myProfile, updateProfile } from "../../redux/feature/auth/auth.service";

const MyAccount = () => {
  
  const dispatch = useDispatch();
  
  const updateProfileLoading = useSelector((state) => state?.loading[updateProfile.typePrefix]) || false;
  
  const userDetails = useSelector((state) => state.auth.user);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    dispatch(myProfile())
  }, [dispatch])
  
  const initialValues = {

    name: userDetails?.name || "",
    surname: userDetails?.surname || "",
    phone: userDetails?.phone || "",
    email: userDetails?.email || "",
    newPassword: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object().shape({

    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    newPassword: Yup.string(),
    repeatPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        const { newPassword } = this.parent;
        if (!newPassword) return true;
        return value === newPassword;
      }
    ),
  });

  const formik = useFormik({
    
    initialValues: initialValues,
    
    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();
  
      // Append regular form values
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
  
      if (values.newPassword) {
        formData.append("newPassword", values.newPassword);
      }
  
      if (values.repeatPassword) {
        formData.append("repeatPassword", values.repeatPassword);
      }
  
      // Append the profile image if it exists
      if (profileImage) {
        formData.append("profile_pic", profileImage);
      }
  
      // Now you can send the formData with your API request
     dispatch(updateProfile(formData))
      .then (() => {
        formik.resetForm();
        dispatch(myProfile());
        // Clear the form values and set the profileImage to null
        setProfileImagePreview(null);
        setProfileImage(null);
      });
  
      // Example: you can send formData using fetch or axios
      // fetch or axios.post(apiUrl, formData, headers);
    },
  });
  

  const fieldConfig = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Name",
    },
    {
      id: "surname",
      name: "surname",
      type: "text",
      placeholder: "Enter your surname",
      label: "Surname",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      id: "phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone",
      label: "Phone",
    },
    {
      id: "newPassword",
      name: "newPassword",
      type: "password",
      placeholder: "Enter new password",
      label: "New Password",
    },
    {
      id: "repeatPassword",
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat new password",
      label: "Confirm Password",
    },
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  // Set form values when userDetails are updated
  useEffect(() => {
    if (userDetails) {
      formik.setValues({
        name: userDetails.name || "",
        surname: userDetails.surname || "",
        phone: userDetails.phone || "",
        email: userDetails.email || "",
        newPassword: "",
        repeatPassword: "",
      });
    }
  }, [userDetails]);
  
  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-[#464E5F]">
            User information
          </h2>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="px-4 py-2 bg-[#FFA500] text-white font-medium rounded hover:bg-[#E69500] focus:outline-none focus:bg-[#E69500]"
          >
            {updateProfileLoading ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="flex">
          {profileImagePreview ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200">
              <img
                className="h-full w-full object-cover"
                src={profileImagePreview}
                alt="Profile"
              />
            </div>
          ) : userDetails?.profile_pic ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200">
              <img
                className="h-full w-full object-cover"
                src={`${config?.BASE_URL}/profile/${userDetails?.profile_pic}`}
                alt="Profile"
              />
            </div>
          ) : (
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-black">
              <span className="text-xl font-medium leading-none text-white">
                {userDetails?.name?.charAt(0).toUpperCase()}
              </span>
            </span>
          )}
          <div className="mt-6 sm:mt-4 px-4 pb-6 sm:px-8 flex gap-x-4 border-gray-900/10">
            <div className="relative">
              <input
                type="file"
                id="profileImagePreview"
                name="profileImagePreview"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {/* focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
              <label
                htmlFor="profileImagePreview"
                className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent text-[10px] sm:text-sm
              whitespace-nowrap leading-4 font-medium rounded-md text-white hover:text-secondary bg-secondary hover:bg-white 
              hover:ring-2 hover:ring-secondary focus:outline-none"
              >
                Change Profile Image
              </label>
            </div>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {fieldConfig.map((field) => (
            <div
              key={field.id}
              className="mb-8 mt-5 flex flex-col md:flex-row md:items-center"
            >
              <label
                className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] sm:mb-0"
                htmlFor={field.id}
              >
                {field.label}{" "}
                {field.id !== "newPassword" && field.id !== "repeatPassword" ? (
                  <span className="text-red-500">*</span>
                ) : null}
              </label>

              <div className="w-full">
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="md:w-3/4 lg:w-4/5 xl:w-3/4 2xl:w-2/3 w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="md:w-3/4 lg:w-4/5 xl:w-3/4 2xl:w-2/3 w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                    placeholder={field.placeholder}
                  />
                )}

                <div className="text-red-500 text-sm mt-1">
                  {formik.touched[field.name] && formik.errors[field.name]
                    ? formik.errors[field.name]
                    : null}
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default MyAccount;
