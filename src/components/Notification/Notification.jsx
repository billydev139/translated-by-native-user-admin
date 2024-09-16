import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from "react-icons/md"
// import { useDispatch } from "react-redux";
// import { getNotifications, markAsRead } from "../../redux/feature/notification/notification.service";
import { formatDate } from "../../utils/FormatDate";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../../redux/feature/notification/notification.service";
import { getSingleOrder } from "../../redux/feature/order/order.service";
import { openModal } from "../../redux/feature/modal/modal.slice";
import { useDispatch } from "react-redux";
import OrderDetails from "../../pages/OrderDetails/OrderDetails";

const Notification = ({ id, orderId, subject, message, time, read, viewOrderDetails_Notification, handleClearFilters }) => {
  
  const dispatch = useDispatch();

  const [notificationMessage, setNotificationMessage] = useState("");

  const handleMarkAsRead = () => {
    
    dispatch(getSingleOrder(orderId))
    .then(() => {
      dispatch(openModal({ componentName: OrderDetails }))
    })
      dispatch(markAsRead(id))
      .then(() => {
        handleClearFilters();
      })
      .then(() => {
        dispatch(getNotifications({
          from: "",
          to: ""
        }));
      }
      )
  }

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
      REJECTED: '❌'
    };

    // Highlighted message with emojis and text
    const highlightedMessage = message
      .replace(id, `<strong style="color: #00000;">${id}</strong>`)
      .replace(oldStatus, `<strong style="color: ${statusEmojis[oldStatus] ? '#1E90FF' : 'black'};">${statusEmojis[oldStatus] || ''} ${oldStatus}</strong>`)
      .replace(newStatus, `<strong style="color: ${statusEmojis[newStatus] ? '#32CD32' : 'black'};">${statusEmojis[newStatus] || ''} ${newStatus}</strong>`);

    if (highlightedMessage) {
      setNotificationMessage(highlightedMessage);
    }
  }, [message]);
  

  return (
    <>
      <div
        onClick={handleMarkAsRead}
        className={`${read ? "bg-white" : "bg-[#ECF9F3]"} flex justify-between p-4 mb-4 rounded shadow-card cursor-pointer`}>

        <div className="flex gap-4 sm:gap-8 w-11/12 items-center">
          {
            read ?
              <MdOutlineMarkChatRead className="size-5 sm:size-6 text-green-600" />
              :
              <MdOutlineMarkChatUnread className="size-5 sm:size-6 text-red-600" />
          }
          <div className="flex flex-col">
            <p className="text-[10px] sm:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-semibold"> {subject} </p>
            <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-normal mt-0.5 sm:mt-2" dangerouslySetInnerHTML={{ __html: notificationMessage }} />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">
          <p> {formatDate(time)} </p>
          {/* <p className={`text-white rounded-full text-center ${read === "Read" ? "bg-blue-500" : "bg-orange-500"}`}> {read} </p> */}
        </div>

      </div>
    </>
  )
}

export default Notification