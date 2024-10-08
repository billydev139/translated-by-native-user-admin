import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from "react-icons/md";
import { formatDate } from "../../utils/FormatDate";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../../redux/feature/notification/notification.service";
import { getSingleOrder } from "../../redux/feature/order/order.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = ({ id, orderId, subject, message, time, read, viewOrderDetails_Notification, dashboardNotification, handleClearFilters }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleMarkAsRead = () => {
    localStorage.setItem("orderId", orderId);
    dispatch(getSingleOrder({id : orderId}))
      .then(() => {
        navigate("/order/detail");
      });

    dispatch(markAsRead(id))
      .then(() => {
        if (handleClearFilters)
        {
          handleClearFilters();
        }
      })
      .then(() => {
        dispatch(getNotifications({
          from: "",
          to: ""
        }));
      });
  };

  useEffect(() => {
    const regex = /ID (\w+) from (\w+) to (\w+)/;
    const match = message.match(regex);
  
    let id, oldStatus, newStatus;
  
    if (match) {
      [, id, oldStatus, newStatus] = match;
    }
  
    // Emoji mapping for statuses
    const statusEmojis = {
      PROCESSING: '🔄',
      TRANSLATED: '✅',
      REJECTED: '❌',
    };
  
    let highlightedMessage = "";
  
    // Even if oldStatus and newStatus are the same, show both with same styles
    highlightedMessage = message
      .replace(id, `<strong style="color: #000000;">${id}</strong>`)
      .replace(
        oldStatus,
        `<strong style="color: ${statusEmojis[oldStatus] ? '#1E90FF' : 'black'};">${statusEmojis[oldStatus] || ''} ${oldStatus}</strong>`
      )
      .replace(
        newStatus,
        `<strong style="color: ${statusEmojis[newStatus] ? '#32CD32' : 'black'};">${statusEmojis[newStatus] || ''} ${newStatus}</strong>`
      );
  
    if (oldStatus === newStatus) {
      highlightedMessage = message
        .replace(id, `<strong style="color: #000000;">${id}</strong>`)
        .replace(
          `from ${oldStatus} to ${newStatus}`,
          `<strong style="color: ${statusEmojis[oldStatus] ? '#32CD32' : 'black'};">${statusEmojis[oldStatus] || ''} ${oldStatus}</strong> to <strong style="color: ${statusEmojis[newStatus] ? '#32CD32' : 'black'};">${statusEmojis[newStatus] || ''} ${newStatus}</strong>`
        );
    }
  
    setNotificationMessage(highlightedMessage);
  }, [message]);

  return (
    <>
      <div className={`${read ? "bg-white" : "bg-[#ECF9F3]"} flex justify-between p-4 mb-4 rounded shadow-card`}>
        <div className="flex gap-4 sm:gap-8 w-11/12 items-center">
          { !dashboardNotification && (
              read ? (
                <MdOutlineMarkChatRead className="size-5 sm:size-6 text-green-600" />
              ) : (
                <MdOutlineMarkChatUnread className="size-5 sm:size-6 text-red-600" />
              )
            )
          }
          <div className="flex flex-col">
            <p className="text-[10px] sm:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-semibold">
              {subject}
            </p>
            <p
              className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-normal mt-0.5 sm:mt-2"
              dangerouslySetInnerHTML={{ __html: notificationMessage }}
            />
            <span
              onClick={handleMarkAsRead}
              className="text-blue-500 cursor-pointer"
            >
              Click to view order details
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">
          <p>{formatDate(time)}</p>
        </div>
      </div>
    </>
  );
};

export default Notification;
