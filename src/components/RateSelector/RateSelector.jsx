
import { getPlans } from "../../redux/feature/plans/plan.service";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RateSelector = ({ choosePlan, setChoosePlan }) => {
  const dispatch = useDispatch();
  const translationPlans = useSelector((state) => state?.plan?.plans) || [];
  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    if (translationPlans.length > 0) {
      const defaultPlan = translationPlans?.find(
        (plan) => plan?.planType === "STANDARD"
      );
      if (!choosePlan) {
        setChoosePlan(defaultPlan);
      }
    }
  }, [translationPlans, setChoosePlan]);

  const handleSelectPlan = (plan) => {
    setChoosePlan(plan);
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-7 mt-6">
      {translationPlans.map((plan) => (
        <div
          key={plan.id}
          className={`relative border-2 rounded-md bg-[#F3F6F9] py-5 px-5 hover:shadow-custom-light cursor-pointer ${
            choosePlan?._id === plan._id
              ? "border-[#FD8C04] bg-[#E3E8EC]"
              : plan.isPopular
              ? "border-[#FD8C04]"
              : "border-transparent"
          }`}
          onClick={() => handleSelectPlan(plan)}
        >
          {plan.isPopular && (
            <div className="absolute top-[-28px] left-0 w-full text-sm 2xl:text-base text-center py-1 bg-[#FD8C04] text-white font-bold rounded-t-md">
              MOST POPULAR
            </div>
          )}
          <h3 className="text-sm font-semibold text-[#464E5F] mb-4">
            {plan.planType}
          </h3>
          <ul className="mt-2 mb-5 text-xs text-[#464E5F]">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 pb-2">
                <svg
                  className="w-4 h-4 text-[#2E8F96]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {feature?.description}
              </li>
            ))}
          </ul>
          <p className="text-xs 2xl:text-[14px] text-[#2E8F96]">
            <span className="font-bold"> € {plan.price}</span>
            <span className="text-xs text-[#ADD0D4]">{" / per word"}</span>
            <span className="text-sm text-[#ADD0D4] ml-1">{plan.unit}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default RateSelector;
