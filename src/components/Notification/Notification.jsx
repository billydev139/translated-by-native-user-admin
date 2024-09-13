import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from "react-icons/md"

const Notification = ({ id, subject, message, time, status, icon }) => {
  return (
    <>
    <div className={`bg-white ${status === "Read" ? "bg-gray-4" : "hover:bg-blue-200"} flex justify-between p-4 mb-4 rounded shadow-card cursor-pointer`}>

      <div className="flex gap-8 w-11/12 items-center">
        {/* <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block h-10 w-10 rounded-full"
        /> */}

        {
          status === "Read" ? 
            <MdOutlineMarkChatRead className="size-6" />
            :
            <MdOutlineMarkChatUnread className="size-6" />
        }
        <div className="flex flex-col">
          <p className="text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-semibold"> {subject} </p>
          <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-normal mt-2"> {message} </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">
        <p> {time} </p>
        {/* <p className={`text-white rounded-full text-center ${status === "Read" ? "bg-blue-500" : "bg-orange-500"}`}> {status} </p> */}
      </div>

    </div>
    
    </>
  )
}

export default Notification