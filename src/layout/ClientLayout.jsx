// src/app/layout/Layout.js

"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomStepper from "../components/common/custom-stepper/CustomStepper";
import Header from "../components/common/header/Header";
import OrderSummaryComponent from "../components/common/order-summary/OrderSummary";
import OrderSummaryMobile from "../components/common/order-summary-mobile/OrderSummaryMobile";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; 

const steps = [
  { id: 1, title: "Project Information", href: "/", field: "step_1" },
  { id: 2, title: "Billing Information", href: "/billing-information", field: "step_2" },
  { id: 3, title: "Payment", href: "/payment", field: "step_3" },
  // You can have more steps here...
  // { id: 4, title: "Review", href: "/review", field: "step_4" },
  // ...
];

const ClientLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Destructure pathname
  const stepState = useSelector((state) => state?.order?.orderSummary?.steps); // Assuming this holds the step completion status
  const [currentStep, setCurrentStep] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Set width when window is resized
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cleanPathname = pathname.split('?')[0].replace(/\/$/, '');
    const stepIndex = steps.findIndex(step => step.href === cleanPathname);
    setCurrentStep(stepIndex !== -1 ? stepIndex + 1 : 1); // Default to step 1 if no match
  }, [pathname]);
  

  useEffect(() => {
    // Check for small screens
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // 1024px is the breakpoint for 'lg'
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentStep > 1 && stepState) {
      // Check if all previous steps are completed dynamically
      let foundIncompleteStep = false;

      for (let i = 0; i < currentStep - 1; i++) {
        const stepField = steps[i].field; // The field in stepState that corresponds to the step's completion status

        // If the current step is incomplete
        if (!stepState?.[stepField]) {
          foundIncompleteStep = true;

          // Show alert and redirect only once
          Swal.fire({
            icon: "warning",
            title: "Incomplete Step",
            text: `Please complete ${steps[i].title} before proceeding to ${steps[currentStep - 1].title}.`,
          }).then(() => {
            navigate(steps[i].href); // Redirect back to the incomplete step
          });

          break; // Stop checking after finding the first incomplete step
        }
      }

      // If no incomplete step was found, allow progression
      if (!foundIncompleteStep) {
        console.log("All previous steps completed, you can proceed!");
      }
    }
  }, [currentStep, stepState, navigate]);

  return (
    <div className="mx-auto my-auto">
      <div className="flex flex-col gap-4">
        {/* <Header /> */}
        <div style={{ width: width >= 1536 ? "66.5%" : width < 1024 ? "100%" : "70%" }} className="px-8 py-6">
          <Header />
          
          {isSmallScreen && (
            <div style={{ display: "block" }}>
              <OrderSummaryMobile className="w-full max-w-xs mx-auto" />
            </div>
          )}

          <div className="mx-auto px-4 py-4">
            <CustomStepper steps={steps} currentStep={currentStep} />
            <div className="mb-4">{children}</div>
          </div>
        </div>
        {!isSmallScreen && (
          <div style={{ width: width < 1536 ? '30%' : "33.5%" }} className="fixed right-0 flex w-full bg-lightgray bg-opacity-5 h-screen items-center justify-center">
            <OrderSummaryComponent className="max-w-xs" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLayout;
