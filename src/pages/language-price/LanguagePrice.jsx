import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const inputFields = [
  {
    id: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
  },
];
const LanguagePrice = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User List" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 mb-6">
        {inputFields.map((field) => (
          <div key={field.id}>
            <label
              className="block text-[#464E5F] text-[14px] font-regular mb-2"
              htmlFor={field.id}
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className="p-3 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center col-span-1 md:col-span-1 mt-8">
        <button
          type="submit"
          className="bg-[#2E8F96] text-white p-3 rounded-md hover:bg-[#26777e] transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </DefaultLayout>
  );
}

export default LanguagePrice
