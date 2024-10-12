import { PROOFREADING, SEOOPTIMISATION, URGENTORDER } from "../../assets/images";
import { setCurrentCreateOrder } from "../../redux/feature/order/order.slice";
import { getServices } from "../../redux/feature/services/service.service";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const icons_Arr = [
  {'id': '1', 'icon': PROOFREADING, 'name': 'PROOFREADING'}, 
  {'id': '2', 'icon': URGENTORDER, 'name': 'URGENT ORDER'}, 
  {'id': '3', 'icon': SEOOPTIMISATION, 'name': 'SEO OPTIMISATION'}
];

const ExtraServices = ({ selectService, setSelectService }) => {
  
  const dispatch = useDispatch();

  const packages = useSelector((state) => state?.service?.services) || [];
  const orderSummary = useSelector((state) => state?.order?.orderSummary) || {};

  console.log("packages: ", packages)
  
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleSelectService = (pkg) => {
    // Check if the service is already selected
    const isSelected = selectService.find((item) => item._id === pkg._id);

    if (isSelected) {
      // If selected, filter out the service from the list
      const filterService = selectService.filter((item) => item._id !== pkg._id);
      setSelectService(filterService);
      // Update the order summary with the filtered services
      dispatch(setCurrentCreateOrder({
        ...orderSummary,
        extras: {
          ...orderSummary.extras,
          label: filterService, // Assign the filtered services to the label
        },
      }));
    } else {
      // If not selected, add the service to the list
      const updatedSelectService = [...selectService, pkg];
      setSelectService(updatedSelectService);
      // Optionally update the order summary with the new list
      dispatch(setCurrentCreateOrder({
        ...orderSummary,
        extras: {
          ...orderSummary.extras,
          label: updatedSelectService, // Assign the updated services to the label
        },
      }));
    }
  }

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-7 mt-6 relative">
      {packages.map((pkg) => (
        <div
          key={pkg._id} // Use _id as the key
          className={`bg-[#f3f6f9] bg-opacity-70 rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-custom-light cursor-pointer relative ${
            selectService.some((item) => item._id === pkg._id) ? "border-[#FD8C04] border-2" : ""
          }`}
          onClick={() => handleSelectService(pkg)}
        >
          {pkg.popular && (
            <div className="absolute top-0 w-full flex justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#305e73] text-white px-4 py-1 rounded-md text-xs 2xl:text-sm">
              Most Popular
            </div>
          )}
          <div className="flex gap-4 min-w-[349px] border-border-[#696969] border-opacity-65 justify-start items-center">
            {/* Uncomment and adjust the Image component if needed */}
            {/* <div>
              <Image
                src={pkg.image}
                alt={pkg.name}
                className="w-12 h-12 object-cover"
                width={100}
                height={24}
              />
            </div> */}
            <div className="py-2 flex flex-col justify-center">
             <div className="flex items-center gap-4">
              {
                icons_Arr.map((imageIcon) => (
                  imageIcon.name === pkg.servicesName ?
                    <img
                      key={imageIcon.id}
                      className="h-5 w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8"
                      src={imageIcon.icon}
                      alt={imageIcon.name}
                    />
                    : null
                ))
              }
              <h2
                  className={`font-bold text-sm text-center ${
                    pkg.popular ? "text-sm text-[#464E5F]" : "text-sm text-[#464E5F]"
                  }`}
                >
                  {pkg.servicesName}
                </h2>
             </div>

              <p className="text-end text-xs 2xl:text-sm font-bold text-[#2E8F96]">
                € {pkg.price}<span className="text-xs text-[#ADD0D4] font-normal"> {"/ per word"} </span>
                {/* <span className="text-sm text-[#ADD0D4] ml-1">{pkg.unit}</span> */}
              </p>
            </div>
          </div>
          {/* Uncomment and adjust if you want to display features */}
          {/* {pkg.features.map((feature, idx) => (
            <div key={idx} className="text-center mb-2">
              <span className='text-[12px] font-normal text-textgray'>{feature}</span>
            </div>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default ExtraServices;
