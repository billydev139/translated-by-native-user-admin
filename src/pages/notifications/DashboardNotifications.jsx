import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { getNotifications, markAllAsRead } from "../../redux/feature/notification/notification.service";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";

const DashboardNotifications = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state?.notification?.notifications?.notifications || {});

  // Fetch only unread notifications
  useEffect(() => {
    // Fetch unread notifications (limit to 5)
    dispatch(getNotifications({
      read: false, // Only unread notifications
      limit: 5, // Limit to 5 notifications
    }));
  }, [dispatch]);

  // Mark all notifications as read
  const handleViewAllNotifications = () => {
    // navigate to the notifications page
    navigate ("/Notifications")
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg">
      {/* Notification List */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-ful">
          <tbody>
            {notifications?.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No unread notifications
                </td>
              </tr>
            ) : (
              <>
                <div className="p-4 bg-white rounded-2xl shadow-card ">
                  <div className="flex items-center justify-between bg-white px-4 py-4 mb-5 sm:mb-8">
                    <p className="text-md sm:text-lg text-black font-semibold">
                      Unread Notifications
                    </p>
                    <button
                      onClick={handleViewAllNotifications}
                      className="flex items-center gap-2 p-0 bg-transparent border-none cursor-pointer"
                    >
                      <p className="text-md sm:text-lg text-green-600">
                        View all notifications
                      </p>
                    </button>
                  </div>

                  {notifications?.map((item) => (
                    <div key={item?._id} className="mt-2">
                      <Notification
                        id={item?._id}
                        orderId={item?.orderId}
                        subject={`Order ${item?.orderId}`}
                        message={item?.message}
                        time={item?.createdAt}
                        read={item?.read}
                        dashboardNotification={true}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardNotifications;
