
import { useSelector } from 'react-redux';

import LOGO from '../../assets/images/logo/logo.png';
import Badge from '../../components/Badge';
import { MdOutlineTopic } from 'react-icons/md';
import { GoBook } from 'react-icons/go';
import DefaultLayout from '../../layout/DefaultLayout';

const OrderDetails = () => {

  const singleOrderDetails = useSelector((state) => state?.order?.singleOrder?.order);
  console.log('singleOrderDetails: ', singleOrderDetails);

  return (
   <>
    <DefaultLayout>
    <div className='w-full bg-white px-4'>
      <div className='bg-white p-4 sm:p-8 md:p-10 flex flex-col rounded-2xl shadow-md'>

        <div className='flex items-center gap-4 font-semibold text-sm xsm:text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl'>
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

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-20'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-6 sm:size-10 lg:size-12 xl:size-14 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-xl 2xl:text-2xl text-slate-600'> Source Language </p>
            <Badge language={singleOrderDetails.sourceLanguage}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-20 mt-4'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-6 sm:size-10 lg:size-12 xl:size-14 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-xl 2xl:text-2xl text-slate-600'> Target Language </p>
            <Badge language={singleOrderDetails.targetLanguage.join(", ")}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-20 mt-4'>
          <div className='p-1 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <MdOutlineTopic className='size-8 sm:size-12 lg:size-16 xl:size-18 text-blue-500' />
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-base sm:text-lg lg:text-xl 2xl:text-2xl text-slate-600'> Topic </p>
            <Badge language={singleOrderDetails.topic}/>
          </div>
        </div>

        <hr className='mt-6 sm:mt-10 mb-6 text-gray-4 border border-gray-4'/>

        <div className='flex justify-between gap-4 sm:gap-8 lg:gap-12'>
          
          <div className='w-1/2'>
            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold text-black'> Service Type: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-semibold text-green-500'> {singleOrderDetails.serviceType[0].serviceName} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold text-black'> VAT: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-semibold text-green-500'> {singleOrderDetails.whatAreYou.VAT} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold text-black'> Total Pricing: </p>
              <p className='text-[8px] xsm:text-[10px] sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-semibold text-green-500'> {singleOrderDetails.totalPricing} </p>
            </div>
          </div>

          <div className='w-1/2'>
            <p className='text-black text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold'> Address </p>
            <p className='mt-2 sm:mt-4 text-gray-6 text-[8px] xsm:text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium'> {singleOrderDetails.whatAreYou.address}, </p>
            <p className='mt-0.5 sm:mt-1 text-gray-6 text-[8px] xsm:text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium'> 
            Postcode: {singleOrderDetails.whatAreYou.postcode}, {singleOrderDetails.whatAreYou.country} 
            </p>
            <p className='mt-1 xsm:mt-2 sm:mt-4 text-gray-6 text-[8px] xsm:text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium'> Contact: {singleOrderDetails.phone} </p>
          </div>

        </div>

      </div>
    </div> 
    </DefaultLayout>
   </>
  );
  }

export default OrderDetails;