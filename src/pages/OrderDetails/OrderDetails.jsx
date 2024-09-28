
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
    <div className='w-full bg-white'>
      <div className='bg-white p-4 sm:p-8 md:p-10 flex flex-col rounded-2xl shadow-md'>

        <div className='flex items-center gap-4 font-semibold text-[10px] xsm:text-xs sm:text-sm md:text-base xl:text-xl 2xl:text-2xl'>
          <p> Order ID: </p>
          <p> {singleOrderDetails._id} </p>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 md:gap-8 lg:gap-20 mt-4'>
          
          <div className='flex items-center gap-2 sm:gap-4 text-[8px] xsm:text-[10px] sm:text-xs md:text-sm 2xl:text-lg 3xl:text-xl'>
            <p className='text-gray-6'> Customer Name: </p>
            <p className='text-green-600'> {singleOrderDetails.name + " " + singleOrderDetails.surname} </p>
          </div>
          
          <div className='flex items-center gap-2 sm:gap-2 md:gap-8 text-[8px] xsm:text-[10px] sm:text-xs md:text-sm 2xl:text-lg 3xl:text-xl'>
            <p className='hidden sm:block text-gray-6'> | </p>
            <p className={`${singleOrderDetails.status === "PROCESSING" ? "text-blue-500" : 
              singleOrderDetails.status === "TRANSLATED" ? "text-green-600" : singleOrderDetails.status === "REJECTED" ? 
              "text-red-500" : null}`}> 
              <span className='text-gray-6'>Order Status: </span> 
              <Badge status={singleOrderDetails.status}/> 
            </p>
            <p className='hidden sm:block text-gray-6'> | </p>
            <p> 
              <span className='text-gray-6'>Payment Status: </span> 
              {/* convert first letter of the status  to capitalised */}
              <Badge payment_status={singleOrderDetails.payment_status.charAt(0).toUpperCase() + singleOrderDetails.payment_status.slice(1)}/>
            </p>
            <p className='hidden sm:block text-gray-6'> | </p>
              {/* Payment intent id  */}
            <p> 
              <span className='text-gray-6'>Stripe Payment Intent ID: </span>
              {singleOrderDetails.payment_intent}
            </p>
          </div>
          
        </div>

        <hr className='mt-4 xsm:mt-6 sm:mt-10 mb-6 text-gray-4 border border-gray-4'/>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-16'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-4 xsm:size-6 sm:size-10 lg:size-4 xl:size-6 2xl:size-8 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-[10px] xsm:text-xs lg:text-sm xl:text-base 2xl:text-xl 3xl:text-2xl text-slate-600'> Source Language </p>
            <Badge language={singleOrderDetails.sourceLanguage}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-16 mt-4'>
          <div className='p-2 lg:p-3 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <GoBook className='size-4 xsm:size-6 sm:size-10 lg:size-4 xl:size-6 2xl:size-8 text-blue-500'/>
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-[10px] xsm:text-xs lg:text-sm xl:text-base 2xl:text-xl 3xl:text-2xl text-slate-600'> Target Language </p>
            <Badge language={singleOrderDetails.targetLanguage.join(", ")}/>
          </div>
        </div>

        <div className='flex gap-4 xsm:gap-6 sm:gap-8 mr-4 xsm:mr-12 sm:mr-16 mt-4'>
          <div className='p-1 bg-gray-4 rounded-xl'>
            {/* <img
              className='size-8 xsm:size-12 lg:size-20'
              src={LOGO}
              alt='img icon'
            /> */}
            <MdOutlineTopic className='size-6 xsm:size-8 sm:size-12 lg:size-8 xl:size-10 2xl:size-12 text-blue-500' />
          </div>
          <div className='w-full flex items-center justify-between gap-1'>
            <p className='text-[10px] xsm:text-xs lg:text-sm xl:text-base 2xl:text-xl 3xl:text-2xl text-slate-600'> Topic </p>
            <Badge language={singleOrderDetails.topic}/>
          </div>
        </div>

        <hr className='mt-6 sm:mt-10 mb-6 text-gray-4 border border-gray-4'/>

        <div className='flex justify-between gap-4 sm:gap-8 lg:gap-12'>
          
          <div className='w-1/2'>
            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4'>
              <p className='text-[10px] xsm:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 2xl:text-base 3xl:text-xl font-semibold text-black'> Service Type: </p>
              <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-semibold text-green-500'> {singleOrderDetails.serviceType[0].serviceName} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 2xl:text-base 3xl:text-xl font-semibold text-black'> VAT: </p>
              <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-semibold text-green-500'> {singleOrderDetails.whatAreYou.VAT} </p>
            </div>

            <div className='flex items-center gap-1 xsm:gap-2 lg:gap-4 mt-2 sm:mt-4'>
              <p className='text-[10px] xsm:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 2xl:text-base 3xl:text-xl font-semibold text-black'> Total Pricing: </p>
              <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-semibold text-green-500'> {singleOrderDetails.totalPricing} </p>
            </div>
          </div>

          <div className='w-1/2'>
            <p className='text-black text-[10px] xsm:text-[8px] sm:text-[10px] md:text-xs lg:text-sm 2xl:text-base 3xl:text-xl font-semibold'> Address </p>
            <p className='mt-2 sm:mt-4 text-gray-6 text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-medium'> {singleOrderDetails.whatAreYou.address}, </p>
            <p className='mt-0.5 sm:mt-1 text-gray-6 text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-medium'> 
            Postcode: {singleOrderDetails.whatAreYou.postcode}, {singleOrderDetails.whatAreYou.country} 
            </p>
            <p className='mt-1 xsm:mt-2 sm:mt-4 text-gray-6 text-[8px] sm:text-[10px] md:text-xs lg:text-xs 2xl:text-sm 3xl:text-lg font-medium'> Contact: {singleOrderDetails.phone} </p>
          </div>

        </div>

      </div>
    </div> 
    </DefaultLayout>
   </>
  );
  }

export default OrderDetails;