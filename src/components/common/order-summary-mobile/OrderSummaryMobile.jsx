
import React, { useState, useEffect, useRef } from "react";
import { GoBook } from "react-icons/go";
import { FaLanguage, FaMoneyBillWave, FaRegFileWord } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { MdOutlineTopic } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const OrderSummaryMobile = () => {
  const { t } = useTranslation();
  const summaryData = useSelector((state) => state?.order?.orderSummary);

  const [isOpen, setIsOpen] = useState(false);
  const summaryRef = useRef(null);

  const toggleSummary = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && summaryRef.current) {
      const yOffset = -20; // Adjust this value to fine-tune the scroll position
      const y =
        summaryRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (!isOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <div className="w-full" ref={summaryRef}>
      <button
        onClick={toggleSummary}
        className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-t-md"
      >
        <span className="font-bold">
          {isOpen ? t("Hide Order Summary") : t("Show Order Summary")}
        </span>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-lightgray">
          <h1 className="text-textgray text-[16px] mb-8 font-bold">
            {t("ORDER SUMMARY")}
          </h1>
          <div className="border-b border-dotted mb-4 border-primary"></div>
          <div>
            {/* Service Type */}
            <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <FaLanguage />
                </div>
                <p className="text-textgray opacity-75">{t("Service Type")}</p>
              </div>
              <p className="text-[14px] text-primary">
                {summaryData?.serviceType}
              </p>
            </div>

            <div className="border-b border-dotted mb-4 border-primary"></div>

            {/* Source Language */}
            {/* <div className="flex justify-between mb-8 mt-2 items-center">
            <div className="flex items-center gap-4 justify-start">
              <div className="text-primary opacity-65 text-[22px]">
                <FaLanguage />
              </div>
              <div>
                <p className="text-textgray opacity-75">Source Language</p>
                <p className="text-[14px] text-primary">{summaryData?.SourceLanguage}</p>
              </div>
            </div>
          </div>
          <div className="border-b border-dotted mb-4 border-primary"></div> */}

            {/* Target Language */}

            <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <GoBook />
                </div>
                <div>
                  {summaryData?.TargetLanguage?.length > 0 &&
                  summaryData?.SourceLanguage ? (
                    <p className="text-gray text-sm opacity-75">
                      From <strong>{summaryData?.SourceLanguage}</strong> to:
                    </p>
                  ) : (
                    <p className="text-gray text-sm opacity-75">{t("Languages")}</p>
                  )}
                  {summaryData?.TargetLanguage?.length > 0 &&
                    summaryData?.SourceLanguage &&
                    summaryData?.TargetLanguage?.map((language, index) => (
                      <div key = {index} class="inline-block bg-lightgreen text-sm text-black px-2 py-1 rounded my-2 mr-1">
                        <strong>{language?.TargetLanguage}</strong>{" "}
                        <span>+ €{language?.price}/w</span>
                      </div>
                    ))}
                </div>
              </div>
              <p className="text-[14px] text-primary">
                {summaryData?.TargetLanguage?.length > 0 &&
                summaryData?.SourceLanguage
                  ? `${summaryData?.TargetLanguage?.length} ${
                      summaryData?.TargetLanguage.length > 1
                        ? t("Languages")
                        : t("Language")
                    }`
                  : "-"}
              </p>
            </div>
            <div className="border-b border-dotted mb-4 border-primary"></div>

            {/* Rate Type */}
            {/* <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <FaMoneyBillWave />
                </div>
                <p className="text-textgray opacity-75">Rate Type</p>
              </div>
              <p className="text-[14px] text-primary">
                <p className="text-[14px] text-primary">
                  {summaryData?.RateType?.label}
                </p>
                <p className="text-[14px] text-primary opacity-75">
                €{summaryData?.RateType?.charges ? summaryData?.RateType?.charges : "0"}
                </p>
              </p>
            </div> */}
            {/* <div className="border-b border-dotted mb-4 border-primary"></div> */}

            {/* Topic */}
            <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <MdOutlineTopic />
                </div>
                <p className="text-textgray opacity-75">{t("Topic")}</p>
              </div>
              <p className="text-[14px] text-primary">
                {summaryData?.topic ? summaryData?.topic : "-"}
              </p>
            </div>
            <div className="border-b border-dotted mb-4 border-primary"></div>

            {/* Word Count */}
            <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <FaRegFileWord />
                </div>
                <p className="text-textgray opacity-75">{t("Words count")}</p>
              </div>
              <p className="text-[14px] text-primary">
                {summaryData?.WordCount ? summaryData?.WordCount : "-"}
              </p>
            </div>
            <div className="border-b border-dotted mb-4 border-primary"></div>

            {/* Extras */}
            <div className="flex justify-between mb-8 mt-2 items-center">
              <div className="flex items-center gap-4">
                <div className="text-primary opacity-65 text-[22px]">
                  <CiStar />
                </div>
                <p className="text-textgray opacity-75">{t("Extras")}</p>
              </div>
              <p className="text-[14px] text-primary">
                <div>
                  {summaryData?.extras?.label?.map((item, index) => (
                    <p key = {index} className="text-[14px] text-primary">
                      {t(item?.servicesName)}
                    </p>
                  ))}
                  <p className="text-[14px] text-primary">
                    €{summaryData?.extras?.charges?.toFixed(2)}
                  </p>
                </div>
              </p>
            </div>
            <div className="border-b border-dotted mb-4 border-primary"></div>

            {/* Subtotal, VAT, and Order Total */}
            <div>
              <div className="flex justify-between mb-8 mt-2 items-center">
                <div>
                  <p className="text-textgray opacity-75">{t("Subtotal")}</p>
                </div>
                <div>
                  <p className="text-[16px] text-textgray">
                    €{summaryData?.total ? summaryData?.total.toFixed(2) : "0"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mb-8 mt-2 items-center">
                <div>
                  <p className="text-textgray">{t("VAT")}</p>
                </div>
                <div>
                  <p className="text-[16px] text-textgray">-</p>
                </div>
              </div>
              <div className="flex justify-between mb-8 mt-2 items-center">
                <div>
                  <p className="text-textgray font-bold">{t("ORDER TOTAL")}</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold text-textgray">
                    €{summaryData?.total ? summaryData?.total.toFixed(2) : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryMobile;
