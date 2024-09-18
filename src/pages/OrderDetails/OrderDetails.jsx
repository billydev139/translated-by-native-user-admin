
import { useSelector } from 'react-redux';

import LOGO from '../../assets/images/logo/logo.png';
import Badge from '../../components/Badge';
import { MdOutlineTopic } from 'react-icons/md';
import { GoBook } from 'react-icons/go';

const OrderDetails = () => {

  const singleOrderDetails = useSelector((state) => state?.order?.singleOrder?.order);
  console.log('singleOrderDetails: ', singleOrderDetails);

  return (
   <>
    <div className='h-screen w-full bg-white px-4 sm:px-12 md:px-16 lg:px-32 py-20'>
      <div className='bg-white p-4 sm:p-8 md:p-10 flex flex-col rounded-2xl shadow-2xl'>

        <div className='flex items-center gap-4 font-semibold text-sm xsm:text-base sm:text-lg md:text-2xl lg:text-4xl'>
          <p> Order ID: </p>
          <p> {singleOrderDetails._id} </p>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 md:gap-8 lg:gap-20 mt-4'>
          
          <div className='flex items-center gap-2 sm:gap-4 text-xs xsm:text-sm sm:text-base md:text-lg lg:text-xl'>
            <p className='text-gray-6'> Customer Name: </p>
            <p className='text-green-600'> {singleOrderDetails.name + " " + singleOrderDetails.surname} </p>
          </div>
          
          <div className='flex items-center gap-2 sm:gap-4 md:gap-8 text-xs xsm:text-sm sm:text-base md:text-lg lg:text-xl'>
            <p className='hidden sm:block text-gray-6'> | </p>
            <p className={`${singleOrderDetails.status === "PROCESSING" ? "text-blue-500" : 
              singleOrderDetails.status === "TRANSLATED" ? "text-green-600" : singleOrderDetails.status === "REJECTED" ? 
              "text-red-500" : null}`}> 
              <span className='text-gray-6'>Status: </span> 
              <Badge status={singleOrderDetails.status}/> 
            </p>
          </div>
          
        </div>

        <hr className='mt-4 xsm:mt-6 sm:mt-10 mb-6 text-gray-4 border border-gray-4'/>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-12 sm:mr-20'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-6 xsm:size-10 lg:size-14 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-2xl text-slate-600'> Source Language </p>
            <Badge language={singleOrderDetails.sourceLanguage}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-12 sm:mr-20 mt-4'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-6 xsm:size-10 lg:size-14 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-2xl text-slate-600'> Target Language </p>
            <Badge language={singleOrderDetails.targetLanguage.join(", ")}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-12 sm:mr-20 mt-4'>
          <div className='p-1 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <MdOutlineTopic className='size-8 xsm:size-12 lg:size-18 text-blue-500' />
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-2xl text-slate-600'> Topic </p>
            <Badge language={singleOrderDetails.topic}/>
          </div>
        </div>

        <hr className='mt-6 sm:mt-10 mb-6 text-gray-4 border border-gray-4'/>

        <div className='flex justify-between gap-4 sm:gap-8 lg:gap-12'>
          
          <div className='w-1/2'>
            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-2xl font-semibold text-black'> Service Type: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-xl font-semibold text-green-500'> {singleOrderDetails.serviceType[0].serviceName} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-2xl font-semibold text-black'> VAT: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-xl font-semibold text-green-500'> {singleOrderDetails.whatAreYou.VAT} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-2xl font-semibold text-black'> Total Pricing: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-xl font-semibold text-green-500'> {singleOrderDetails.totalPricing} </p>
            </div>
          </div>

          <div className='w-1/2'>
            <p className='text-black text-xs sm:text-base md:text-lg lg:text-2xl font-semibold'> Address </p>
            <p className='mt-2 sm:mt-4 text-gray-6 text-[8px] xsm:text-xs sm:text-base md:text-lg lg:text-xl font-medium'> {singleOrderDetails.whatAreYou.address}, </p>
            <p className='mt-0.5 sm:mt-1 text-gray-6 text-[8px] xsm:text-xs sm:text-base md:text-lg lg:text-xl font-medium'> 
            Postcode: {singleOrderDetails.whatAreYou.postcode}, {singleOrderDetails.whatAreYou.country} 
            </p>
            <p className='mt-1 xsm:mt-2 sm:mt-4 text-gray-6 text-[8px] xsm:text-xs sm:text-base md:text-lg lg:text-xl font-medium'> Contact: {singleOrderDetails.phone} </p>
          </div>

        </div>

      </div>
    </div> 
   </>
  );
  }

export default OrderDetails;


 // <div class="mt-6 max-w-6xl mx-auto p-4 bg-gray-50 shadow-md rounded-lg">

    //   <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Order Details</h2>

    //   {/* <!-- Responsive Grid Layout --> */}
    //   <div class="grid grid-cols-1 md:grid-cols-2">
        
    //     {/* <!-- Customer Information --> */}
    //     <div class="p-6 rounded-lg bg-white">
    //       <h3 class="text-lg font-semibold text-blue-700 mb-4">Customer Information</h3>
    //       <div class="space-y-2">
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>User Type:</strong> { singleOrderDetails.whatAreYou.userType }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Company Name:</strong> { singleOrderDetails.whatAreYou.companyName }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>VAT:</strong> { singleOrderDetails.whatAreYou.VAT }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Address:</strong> { singleOrderDetails.whatAreYou.address }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Country:</strong> { singleOrderDetails.whatAreYou.country }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Municipality:</strong> { singleOrderDetails.whatAreYou.municipality }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Postcode:</strong> { singleOrderDetails.whatAreYou.postcode }</p>
    //       </div>
    //     </div>

    //     {/* <!-- Order Information --> */}
    //     <div class="p-6 rounded-lg bg-white">
    //       <h3 class="text-lg font-semibold text-green-700 mb-4">Order Information</h3>
    //       <div class="space-y-2">
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Order ID:</strong> { singleOrderDetails._id }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Customer Name:</strong> { singleOrderDetails.name } { singleOrderDetails.surname }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Phone:</strong> { singleOrderDetails.phone }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Source Language:</strong> { singleOrderDetails.sourceLanguage }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Target Language:</strong> { singleOrderDetails.targetLanguage.join(", ") }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Topic:</strong> { singleOrderDetails.topic }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Total Pricing:</strong> ${ singleOrderDetails.totalPricing.toFixed(2) }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Service Type:</strong> { singleOrderDetails.serviceType[0].serviceName }</p>
    //         <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Status:</strong> { singleOrderDetails.status }</p>
    //       </div>
    //     </div>
    //   </div>

    // </div>