import React, { useEffect } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Tick from "../../assets/images/tick.png"
import Clock from "../../assets/images/clock.png"
import BLOCK from "../../assets/images/board.png"
import Earth from "../../assets/images/earth.png"
import { FaCheck } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";


import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrder } from '../../redux/feature/order/order.service';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';

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
const Dashboard = () => {
  const dispatch = useDispatch();
  const statusCounts = useSelector((state) => state?.order?.myOrder?.orders?.statusCounts);

  useEffect(() => {
    dispatch(getMyOrder({ page: 1, limit: 10 }));

    // other side effects
    //...
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <>   
<div className='grid  grid-cols-[1fr_1fr] gap-4 '>
  <div className='bg-white shadow-md  px-4 py-4'>
    <div><h1 className='text-[24px] font-bold flex justify-start'>Notifications
</h1></div>
<div><h1 className='text-[15px] font-medium text-[#696969] flex justify-center  items-center py-8 px-5'>
  {/* <Notification /> */}
</h1></div>

  </div>
  <div className='flex flex-col gap-4'>   
  <div className='grid  grid-cols-[1fr_1fr] gap-4'>  
  <div className="shadow-md px-4 py-4 bg-[#2e8f96] rounded-md flex items-end justify-between">
  <div className="flex items-end justify-start">
    <div className="flex flex-col items-start">
      <span className="text-[#ffff] text-[28px] font-bold">{statusCounts?.translated}</span>
      <h1 className="font-medium text-[#ffff] text-[14px] py-2 ">
        Completed orders
      </h1>
    </div>
  </div>
  <div

  >
    <FaCheck  className="text-[200px] text-[#add0d4]"/>

  </div>
</div>

<div className="shadow-md px-4 py-4 bg-[#add0d4] rounded-md  flex items-end justify-between">
  <div className="flex items-end justify-start">
    <div className="flex flex-col items-start">
      <span className="text-[#ffff] text-[28px] font-bold">{statusCounts?.processing}</span>
      <h1 className="font-medium text-[#ffff] text-[14px] py-2 ">
        In Process orders
      </h1>
    </div>
  </div>
  <div

  >
    <FaClockRotateLeft  className="text-[200px] text-[#ffff]" />

  </div>
</div>
  </div>
  <div className="shadow-md px-4 py-4 bg-[#fd8c04] rounded-md flex items-end justify-between">
  <div className="flex items-end justify-start">
    <div className="flex flex-col justify-between items-start">
      <span className="text-[#ffff] text-[28px] font-bold">Place a new order</span>
      <h1 className="font-medium text-[#ffff] text-[14px] py-2 ">
     Do you need anything else? Place your next order.
      </h1>
      <div>   
      <buton className="cursor-pointer rounded-md px-4 py-2 text-teal-500  text-[14px] bg-white font-medium">
        <Link to="/">Place a new order
        </Link>
      </buton>
      </div>
    </div>
  </div>
  <div
 
  >
    <FaRegClipboard className="text-[200px] text-[#ffff]"/>

  </div>
</div>
  </div>
</div>
<div className='grid grid-cols-[2fr_1fr] mt-6'>   
<div className='bg-white shadow-md mt-6  px-4 py-4'>
<h1 className='font-bold font-bold flex px-6 py-6 text-[#464e5f] text-[20px]  justify-start'>Video tutorials on how to use the platform
</h1>
<div className="video-container">
        <ReactPlayer
            url="https://www.youtube.com/watch?v=oLqi0XnjpKI"
            width="100%"
            height="710px"
            controls
        />
    </div>
  </div>
  {/* <div className="bg-[#add0d4] shadow-md mt-6 px-4 py-4 flex flex-col justify-between relative min-h-[200px]">
  <div className="flex flex-col items-start">
    <span className="text-white text-[28px] font-bold">Place a new order</span>
    <h1 className="font-medium text-white text-[14px] py-2">
      Do you need anything else? Place your next order.
    </h1>
    <button className="rounded-md px-4 py-2 text-teal-500 text-[14px] bg-white font-medium">
      Place a new order
    </button>
  </div>
  <div
    className="absolute bottom-0 right-0 h-[100%] w-[50%]"
    style={{
      backgroundImage: `url(${Earth})`,
      backgroundSize: "cover",
      backgroundPosition: "right bottom",
   
    }}
  ></div>
</div> */}

  </div>
</>
    </DefaultLayout>
  );
}

export default Dashboard