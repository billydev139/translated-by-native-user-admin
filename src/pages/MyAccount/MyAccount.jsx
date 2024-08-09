import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
// Array of form fields
  const formFields = [
    { id: "name", label: "Name", type: "text", required: true, placeholder: "Enter your name" },
    { id: "surname", label: "Surname", type: "text", required: true, placeholder: "Enter your surname" },
    { id: "gender", label: "Gender", type: "select", required: true, options: ["Unspecified", "Male", "Female", "Other"] },
    { id: "email", label: "Email", type: "email", required: true, placeholder: "Enter your email" },
    { id: "language", label: "Display language", type: "select", required: true, options: ["English (British)"] },
    { id: "timezone", label: "Timezone", type: "select", required: true, options: ["Europe / Madrid"] },
    { id: "newPassword", label: "New password", type: "password", required: false, placeholder: "Enter new password" },
    { id: "repeatPassword", label: "Repeat password", type: "password", required: false, placeholder: "Repeat new password" },
  ];

const MyAccount = () => {
  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg ">
        {/* Save button and User Information heading */}
        <div className="flex justify-between items-center pt-5 mb-12">
          <h2 className="text-xl font-semibold text-[#464E5F]">
            User information
          </h2>
          <button
            type="submit"
            className="px-4 py-2 bg-[#FFA500] text-white font-medium rounded hover:bg-[#E69500] focus:outline-none focus:bg-[#E69500]"
          >
            Save
          </button>
        </div>
        <hr className="text-[#eeeeee]" />

        <form>
          {formFields.map((field) => (
            <div
              key={field.id}
              className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center "
            >
              <label
                className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0"
                htmlFor={field.id}
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.id}
                  className="sm:w-1/2 w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                >
                  {field.options.map((option, index) => (
                    <option
                      key={index}
                      value={option.toLowerCase().replace(/ /g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  className="sm:w-1/2 w-full px-3 py-2 border border-[#E4E6EF] rounded  text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </form>
      </div>
    </DefaultLayout>
  );
}

export default MyAccount


