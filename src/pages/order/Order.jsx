import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";

const Orders = () => {
  // State to track the active label
  const [activeLabel, setActiveLabel] = useState("");

  // Array for form fields
  const filters = [
    {
      id: "customerDate",
      label: "CUSTOMER DATE",
      type: "text",
      placeholder: "Customer date",
    },
    {
      id: "reference",
      label: "REFERENCE",
      type: "text",
      placeholder: "Reference",
    },
    {
      id: "orderType",
      label: "ORDER TYPE",
      type: "select",
      options: ["All"],
    },
    {
      id: "turnaroundTime",
      label: "TURNAROUND TIME",
      type: "text",
      placeholder: "",
    },
    {
      id: "paymentMethod",
      label: "PAYMENT METHOD",
      type: "select",
      options: ["All"],
      highlighted: true,
    },
    { id: "amount", label: "AMOUNT", type: "text", placeholder: ">" },
    { id: "actions", label: "ACTIONS", type: "text", placeholder: "" },
  ];

  return (
    <DefaultLayout>
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Tabs */}
        <div className="flex items-center mb-6 mt-6">
          <button
            className={`py-2 px-4 text-[#464E5F] hover:text-[#2E8F96] border-b-2 ${
              activeLabel === "All"
                ? "text-[#2E8F96] border-[#2E8F96]"
                : "border-transparent"
            }`}
            onClick={() => setActiveLabel("All")}
          >
            All
          </button>
          <button
            className={`ml-4 py-2 px-4 text-[#464E5F] hover:text-[#2E8F96] border-b-2 ${
              activeLabel === "Pending payment"
                ? "text-[#2E8F96] border-[#2E8F96]"
                : "border-transparent"
            }`}
            onClick={() => setActiveLabel("Pending payment")}
          >
            Pending payment
          </button>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end mb-8">
          <button className="px-4 py-2 bg-[#E4E6EF] text-[#2E8F96] font-medium rounded focus:outline-none">
            Clear Filters
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {filters.map((filter) => (
            <div key={filter.id}>
              <label
                className={`block text-[14px] text-end font-medium mb-9 cursor-pointer ${
                  activeLabel === filter.id
                    ? "text-[#FFA500]"
                    : "text-[#B5B5C3]"
                }`}
                onClick={() => setActiveLabel(filter.id)}
              >
                {filter.label}
              </label>
              {filter.type === "select" ? (
                <select className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]">
                  {filter.options.map((option, index) => (
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
                  type={filter.type}
                  placeholder={filter.placeholder}
                  className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                />
              )}
            </div>
          ))}
        </div>
        <hr className="text-[#eeeeee] my-7" />

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="text-sm text-[#464E5F]">
                <td colSpan={filters.length} className="pb-4 px-6 text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <button className="px-3 py-1 text-[#464E5F] hover:text-[#2E8F96]">
              &lt;
            </button>
            <button className="px-3 py-1 text-[#464E5F] hover:text-[#2E8F96]">
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-[#464E5F]">
            {/* Show entries dropdown */}
            <span>Show</span>
            <select className="px-2 py-1 border border-[#E4E6EF] rounded-md bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span>entries</span>

            {/* Showing range of entries */}
            <span className="ml-auto">Showing 0 to 0 of 0 entries</span>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Orders;
