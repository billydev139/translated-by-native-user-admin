import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Notification from "../../components/Notification/Notification";

const Notifications = () => {
  // State to track the active label
  const [activeLabel, setActiveLabel] = useState("All");

  console.log("Status Value: ", activeLabel);

  // Array for form fields
  const fields = [
    {
      id: "info",
      label: "INFORMATION",
      placeholder: "Information",
      type: "text",
    },
    {
      id: "date",
      label: "DATE CREATED",
      placeholder: "Date created",
      type: "text",
      highlighted: true,
    },
    { id: "actions", label: "ACTIONS", placeholder: "", type: "text" },
  ];

  const Notifications = [
    {id: '1', subject: "MAINTENANCE IS REQUIRED", message: 'I am Unread Notification', time: '5 hour ago', status: 'Unread'},
    {id: '2', subject: "MAINTENANCE IS REQUIRED", message: 'I am Read Notification', time: '3 hour ago', status: 'Read'},
    {id: '3', subject: "MAINTENANCE IS REQUIRED", message: 'I am Unread Notification', time: '5 hour ago', status: 'Unread'},
    {id: '4', subject: "MAINTENANCE IS REQUIRED", message: 'I am Read Notification', time: '3 hour ago', status: 'Read'},
    {id: '5', subject: "MAINTENANCE IS REQUIRED", message: 'I am Unread Notification', time: '5 hour ago', status: 'Unread'},
    {id: '6', subject: "MAINTENANCE IS REQUIRED", message: 'I am Read Notification', time: '3 hour ago', status: 'Read' }
  ]

  const filteredNotifications = Notifications.filter((item) => {
    if (activeLabel === 'All') return true; // Show all notifications
    return item.status === activeLabel; // Show only matching notifications
  });

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
              activeLabel === "Read"
                ? "text-[#2E8F96] border-[#2E8F96]"
                : "border-transparent"
            }`}
            onClick={() => setActiveLabel("Read")}
          >
            Read
          </button>
          <button
            className={`ml-4 py-2 px-4 text-[#464E5F] hover:text-[#2E8F96] border-b-2 ${
              activeLabel === "Unread"
                ? "text-[#2E8F96] border-[#2E8F96]"
                : "border-transparent"
            }`}
            onClick={() => setActiveLabel("Unread")}
          >
            Unread
          </button>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end mb-8">
          <button
            className="px-4 py-2 bg-[#E4E6EF] text-[#2E8F96] font-medium rounded focus:outline-none"
            onClick={() => setActiveLabel("")} // Clear active label on click
          >
            Clear Filters
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Empty div to push the items to the right */}
          <div></div>

          {fields.map((filter) => (
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
              <input
                type={filter.type}
                placeholder={filter.placeholder}
                className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
              />
            </div>
          ))}
        </div>

        <hr className="text-[#eeeeee] my-7" />

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="text-sm text-[#464E5F]">
                {
                  filteredNotifications.length === 0 ? (
                    <td colSpan={fields.length} className="pb-4 px-6 text-center">
                      No data available in table
                    </td>
                  )
                    : (
                    <div className="">
                      {filteredNotifications.map((item) => (
                        <div key={item.id} className="mt-2">
                          <Notification 
                            id={item.id}
                            subject={item.subject}
                            message={item.message}
                            time={item.time}
                            status={item.status}
                            />
                        </div>               
                        ))
                      }
                    </div>
                  )
                }
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

export default Notifications;
