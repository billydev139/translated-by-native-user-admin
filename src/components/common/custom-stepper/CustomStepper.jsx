// components/Stepper.js
import React from "react";
import { Link } from "react-router-dom";

const CustomStepper = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between gap-6 lg:items-center items-stretch mb-8">
      {steps?.map((step, index) => (
        <div key={step.id} className="flex-1 text-center cursor-pointer">
          <Link key={step?.id} href={step?.href} passHref>
            <div className="flex gap-2 items-center">
              <div
                className={`text-sm xl:text-base 2xl:text-xl ${
                  currentStep === index + 1
                    ? "text-[#2E8F96]"
                    : "text-[#ADD0D4]"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`font-medium text-[10px] xl:text-xs 2xl:text-sm ${
                  currentStep === index + 1
                    ? "text-[#2E8F96]"
                    : "text-[#ADD0D4]"
                }`}
              >
                {step.title}
              </div>
            </div>
            <div
              className={`border-t-2 2xl:border-t-4 mt-2 ${
                currentStep === index + 1
                  ? "border-terchary"
                  : "border-stroke"
              }`}
              terchary
            ></div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
