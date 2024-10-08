import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Notification from "../../components/Notification/Notification";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { getNotifications, markAllAsRead } from "../../redux/feature/notification/notification.service";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";

const Notifications = () => {

  const dispatch = useDispatch();
  const { notifications, pages, total } = useSelector((state) => state?.notification?.notifications?.notifications || {});

  console.log(`Notifications:`, notifications)

  // State to track the active label (All, Read, Unread)
  const [activeLabel, setActiveLabel] = useState("All");

  // State to track pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default entries per page

  // State for date filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch notifications when activeLabel, page, limit, fromDate, or toDate changes
  useEffect(() => {

    let readFlag = null;
    if (activeLabel === "Read") readFlag = true;
    if (activeLabel === "Unread") readFlag = false;

    dispatch(getNotifications({
      read: readFlag,
      page,
      limit,
      from: fromDate,
      to: toDate
    }));

  }, [dispatch, activeLabel, page, limit, fromDate, toDate]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pages) {
      setPage(newPage);
    }
  };

  // Handle date changes
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {

    dispatch(markAllAsRead())
      .then(() => {
        // Refetch notifications
        dispatch(getNotifications({
          from: "",
          to: ""
        }));
      });
  };

  const handleClearFilters = () => {
    setActiveLabel("All");
    setFromDate("");
    setToDate("");
  }

  return (
    <DefaultLayout>
      <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        
        {/* Tabs for All, Read, Unread */}
        <div className="flex items-center mb-1">
          {
            ["All", "Read", "Unread"].map((label) => (
            <button
              key={label}
              className={`py-2 px-4 text-[#464E5F] hover:text-[#2E8F96] border-b-2 ${activeLabel === label
                ? "text-[#2E8F96] border-[#2E8F96]"
                : "border-transparent"
                }`}
              onClick={() => setActiveLabel(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        <div className="flex justify-between">
        {/* Date Filters */}
        <div className="flex space-x-4 mt-4">
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            className="px-3 py-2 border border-[#E4E6EF] rounded-md bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
          />
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            className="px-3 py-2 border border-[#E4E6EF] rounded-md bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
          />
        </div>
        <div className="mt-4">
        <button
            className="px-4 py-2 bg-[#E4E6EF] text-[#2E8F96] font-medium rounded focus:outline-none"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
        </div>

        {/* Notification List */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white">
            <tbody>
              {notifications?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No data available in table
                  </td>
                </tr>
              ) : (
                <>
                  <div className="p-4 bg-white rounded-2xl shadow-card border border-gray-4">
                    <div className="flex items-center justify-between bg-white px-4 py-4 mb-5 sm:mb-8">
                      <p className="text-md sm:text-lg text-black font-semibold">
                        Notifications
                      </p>
                      <button
                        onClick={handleMarkAllAsRead}
                        className="flex items-center gap-2 p-0 bg-transparent border-none cursor-pointer"
                      >
                        <IoCheckmarkDoneOutline className="size-4 sm:size-6 font-semibold text-green-600" />
                        <p className="text-md sm:text-lg text-green-600">
                          Mark all as read
                        </p>
                      </button>

                    </div>

                    {notifications?.map((item) => (
                      <div key={item?.id} className="mt-2">
                        <Notification
                          id={item?._id}
                          orderId={item?.orderId}
                          subject={`Order ${item?.orderId}`}
                          message={item?.message}
                          time={item?.createdAt}
                          read={item?.read}
                          handleClearFilters={handleClearFilters}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="p-4 sm:p-6 xl:p-7.5 flex justify-end">
            <Pagination
              currentPage={page}
              totalPages={pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Notifications;
