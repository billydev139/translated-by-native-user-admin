
import React from "react";
import { GoBook } from "react-icons/go";
import { FaLanguage, FaMoneyBillWave, FaRegFileWord } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { useSelector } from "react-redux";
import { MdOutlineTopic } from "react-icons/md";
import { CiStar } from "react-icons/ci";

const OrderSummaryComponent = () => {
  const summaryData = useSelector((state) => state?.order?.orderSummary);
  return (
      <div className="w-full h-screen flex flex-col justify-center px-10">
        <h1 className="text-textgray text-xs xl:text-sm 2xl:text-base 3xl:text-lg font-bold">
          ORDER SUMMARY
        </h1>
        <div className="border-b border-dotted mt-4 border-primary"></div>
        <div>
          {/* Service Type */}
          <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <FaLanguage />
              </div>
              <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Service Type</p>
            </div>
            <p className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary">
              {summaryData?.serviceType}
            </p>
          </div>

          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div>

          {/* Source Language */}
          {/* <div className="flex justify-between mb-8 mt-2 items-center">
            <div className="flex items-center gap-4 justify-start">
              <div className="text-primary opacity-65 text-xl">
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

          <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <GoBook />
              </div>
              <div>
                {summaryData?.TargetLanguage?.length > 0 &&
                summaryData?.SourceLanguage ? (
                  <p className="text-gray text-xs opacity-75 2xl:text-sm">
                    From <strong>{summaryData?.SourceLanguage}</strong> to:
                  </p>
                ) : (
                  <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Languages</p>
                )}
                {summaryData?.TargetLanguage?.length > 0 &&
                  summaryData?.SourceLanguage &&
                  summaryData?.TargetLanguage?.map((language, index) => (
                    <div key = {index} class="inline-block mt-0.5 bg-lightgreen text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-sm text-black px-2 py-1 rounded mr-1">
                      <strong>{language?.targetLanguages}</strong>{" "}
                      <span>+ €{language?.price}/w</span>
                    </div>
                  ))}
              </div>
            </div>
            <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base text-primary">
              {summaryData?.TargetLanguage?.length > 0 &&
              summaryData?.SourceLanguage
                ? `${summaryData?.TargetLanguage?.length} ${
                    summaryData?.TargetLanguage.length > 1
                      ? "Languages"
                      : "Language"
                  }`
                : "-"}
            </p>
          </div>
          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div>

          {/* Rate Type */}
          {/* <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <FaMoneyBillWave />
              </div>
              <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Rate Type</p>
            </div>
            <p className="text-[14px] text-primary">
              <p className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary">
                {summaryData?.RateType?.label}
              </p>
              <p className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary opacity-75">
                €{summaryData?.RateType?.charges ? summaryData?.RateType?.charges?.toFixed(2) : "0"}
              </p>
            </p>
          </div>
          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div> */}

          {/* Topic */}
          <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <MdOutlineTopic />
              </div>
              <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Topic</p>
            </div>
            <p className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary">
              {summaryData?.topic ? summaryData?.topic : "-"}
            </p>
          </div>
          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div>

          {/* Word Count */}
          <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <FaRegFileWord />
              </div>
              <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Words count</p>
            </div>
            <p className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary">
              {summaryData?.WordCount ? summaryData?.WordCount : "-"}
            </p>
          </div>
          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div>

          {/* Extras */}
          {/* <div className="flex justify-between mt-4 2xl:mt-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary opacity-65 text-base xl:text-lg 2xl:text-xl">
                <CiStar />
              </div>
              <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Extras</p>
            </div>
            <p className="text-[14px] text-primary">
              <div>
                {summaryData?.extras?.label?.map((item, index) => (
                  <p key = {index} className="text-[8px] xl:text-[10px] 2xl:text-xs 3xl:text-base text-primary">
                    {item?.servicesName}
                  </p>
                ))}
                <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg text-primary">
                  €{summaryData?.extras?.charges?.toFixed(2)}
                </p>
              </div>
            </p>
          </div>
          <div className="border-b border-dotted mt-2 lg:mt-1 xl:mt-2 border-primary"></div> */}

          {/* Subtotal, VAT, and Order Total */}
          <div>
            <div className="flex justify-between mt-4 2xl:mt-8 items-center">
              <div>
                <p className="text-textgray opacity-75 text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base">Subtotal</p>
              </div>
              <div>
                <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg text-textgray">
                  €{summaryData?.total ? summaryData?.total.toFixed(2) : "0"}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-4 lg:mt-2 xl:mt-4 items-center">
              <div>
                <p className="text-textgray text-[10px] xl:text-xs 2xl:text-sm">VAT</p>
              </div>
              <div>
                <p className="text-[10px] xl:text-xs 2xl:text-sm text-textgray">-</p>
              </div>
            </div>
            <div className="flex justify-between mt-4 lg:mt-2 xl:mt-4 items-center">
              <div>
                <p className="text-textgray font-bold text-[10px] xl:text-xs 2xl:text-sm">ORDER TOTAL</p>
              </div>
              <div>
                <p className="text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg font-bold text-textgray">
                  €{summaryData?.total ? summaryData?.total.toFixed(2) : "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OrderSummaryComponent;
