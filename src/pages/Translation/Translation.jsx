
import React, { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { FaInfo } from "react-icons/fa";
import { FaAnglesLeft } from "react-icons/fa6";
import LanguageSelector from "../../components/language-selector/LanguageSelector";
import Layout from "../../layout/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguages,
  getTargetLanguages,
} from "../../redux/feature/language/targetLanguage.service";
import { getTopics } from "../../redux/feature/topic/topic.service";
import { createOrder } from "../../redux/feature/order/order.service";
import Swal from "sweetalert2";
import { setCurrentCreateOrder } from "../../redux/feature/order/order.slice";
import "../../Language"; // Ensure this import is at the top of the file
import './index.css'
import { useNavigate } from "react-router-dom";
import RateSelector from "../../components/RateSelector/RateSelector";
import ExtraServices from "../../components/extra-services/ExtraServices";
import Upload from "../../components/upload/Upload";
import { languagesData } from "../../utils/Languages";
import { useTranslation } from "react-i18next";
import SearchSelect from "../../utils/SearchSelect";

const Translation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderCreateloader = useSelector((state) => state.loading[createOrder.typePrefix])
  const orderSummary = useSelector((state) => state?.order?.orderSummary);

  const Languages = useSelector((state) => state?.targetLanguage?.languages) || [];
  const targetLanguage = useSelector(
    (state) => state?.targetLanguage?.targetLanguages?.targetLanguages
  ) || [];

  const topics = useSelector((state) => state?.topic?.topics?.topics?.topics) || [];

  const [files, setFiles] = useState([]);
  const [wordCount, setWordCount] = useState(orderSummary?.WordCount || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState(orderSummary?.TargetLanguage || []);
  const [selectedTargetLanguageList, setSelectedTargetLanguageList] = useState(orderSummary?.TargetLanguage || []);
  const [selectedSourceLanguages, setSelectedSourceLanguages] = useState(orderSummary?.SourceLanguage || "");
  const [choosePlan, setChoosePlan] = useState(orderSummary?.Plan || "");
  const [selectService, setSelectService] = useState(orderSummary?.extras?.label || []);
  const [selectedTopic, setSelectedTopic] = useState(orderSummary?.topic || "");
  const [selectedTargetId, setSelectedTargetId] = useState([]);
  const [tempLanguageCombination, setTempLanguageCombination] = useState([]);
  const [OrderSummary, setOrderSummary] = useState({});
  // Extract categories, rates, and translation rates from the data
  const { categories, rates } = languagesData;

  const translationServices = [
    {
      id: "SourceLanguage",
      type: "select",
      label: t("Source Language"),
      placeholder: t("Choose source"),
      options: Languages,
    },
    {
      id: "target-language",
      label: t("Target Languages"),
      options: targetLanguage,
    },
    {
      id: "topic",
      type: "select",
      label: t("Topic"),
      placeholder: t("Choose an option"),
      options: topics,
    },
    
  ];

  const handleModalOpen = (fieldId) => {
    if (fieldId === "target-language") {
      setIsModalOpen(true);
    }
  };

  const handleLanguageSelection = (languages) => {

    // Set the selected target language list, converting language objects to strings if necessary
    setSelectedTargetLanguageList(
      languages.map((language) => {
        if (typeof language === 'string') {
          return language; // If it's already a string, return it
        } else if (language && language.TargetLanguage) {
          return language.TargetLanguage; // If it's an object, return the TargetLanguage property
        }
        return language; // Return the language object as is if it doesn't match either case
      })
    );

    // Set the entire languages array (including any objects) to another state
    setSelectedTargetLanguages(languages);

    // Close the modal after selection
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getLanguages())
      .unwrap()
      .then(() => dispatch(getTargetLanguages()))
      .then(() => dispatch(getTopics()));
  }, [dispatch]);
  // Define a summary data object based on your form inputs
  useEffect(() => {
    // Calculate rate charges and extra services
    const rateCharges = wordCount
      ? choosePlan?.price * wordCount
      : choosePlan?.price;
    const extraServicesCharges = selectService?.reduce(
      (acc, curr) =>
        wordCount ? acc + curr.price * wordCount : 0,
      0
    );

    // Utility function to get the category of a language
    const getCategory = (language) => {
      for (const category of languagesData.categories) {
        // Check if the language is in the current category's languages
        if (category.languages.includes(language)) {
          // Return the category name without " Languages"
          return category.name.replace(' Languages', '');
        }
      }
      return 'Unknown Category';
    };

    // Generate combinations
    const LanguagesCombination = selectedTargetLanguages.map((targetLanguage) => {
      let sourceCategory, targetCategory, targetLang;

      // Check if targetLanguage is a string or an object
      if (typeof targetLanguage === 'string') {
        // If it's a string, process as normal
        targetLang = targetLanguage;
      } else if (targetLanguage && targetLanguage.TargetLanguage) {
        // If it's an object, extract the TargetLanguage property
        targetLang = targetLanguage.TargetLanguage;
      } else {
        // Skip invalid targetLanguage entries
        return null;
      }

      // Get categories for source and target languages
      sourceCategory = getCategory(selectedSourceLanguages);
      targetCategory = getCategory(targetLang);

      // Calculate the price based on categories
      const price = languagesData.rates[`${sourceCategory} + ${targetCategory}`] || 0;

      // Return the combination object
      return {
        SourceLanguage: selectedSourceLanguages,
        TargetLanguage: targetLang, // Use the extracted targetLang
        combination: `${sourceCategory} + ${targetCategory}`,
        price: price,
      };
    }).filter(Boolean); // Filter out null values in case of invalid combinations
    setTempLanguageCombination(LanguagesCombination)
    // ore succinctly
    const targetLanguagesPrice = LanguagesCombination?.reduce(
      (acc, curr) => wordCount ? acc + curr.price * wordCount : acc,
      0
    ) || 0; // Fallback to 0 if the array is empty

    // Calculate total cost
    const total = targetLanguagesPrice + extraServicesCharges;

    // Create summary data object
    const summaryData = {
      serviceType: "Translations",
      SourceLanguage: selectedSourceLanguages,
      TargetLanguage: LanguagesCombination,
      RateType: choosePlan
        ? {
          label: choosePlan.planType,
          charges: rateCharges + targetLanguagesPrice,
        }
        : 0,
      Plan: choosePlan,
      WordCount: wordCount,
      extras: selectService
        ? {
          label: selectService,
          charges: extraServicesCharges,
        }
        : "",
      topic: selectedTopic,
      total: total,
    };
    setOrderSummary(summaryData);
    dispatch(setCurrentCreateOrder(summaryData));
    // check all fields 
    if (
      selectedTopic &&
      selectedSourceLanguages &&
      selectedTargetLanguages &&
      // choosePlan &&
      // selectService.length > 0 &&
      wordCount &&
      orderSummary?.file
    ) {
      dispatch(setCurrentCreateOrder({
        steps: {
          ...orderSummary.steps,
          step_1: true,
        }
      }));
    }
    else {
      dispatch(setCurrentCreateOrder({
        steps: {
          ...orderSummary.steps,
          step_1: false,
        }
      }));
    }
  }, [
    selectedTopic,
    selectedSourceLanguages,
    selectedTargetLanguages,
    // choosePlan,
    selectService,
    wordCount,

    dispatch,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get id of selected services
    const selectedService = selectService.map((service) => service._id);
    // Combine selected services into a comma-separated string for API reque
    const selectedServiceId = selectedService.join(",");

    // show swal for empty fields
    if (
      selectedTargetLanguages.length < 1 ||
      !selectedSourceLanguages ||
      // !choosePlan?._id ||
      !selectedTopic ||
      orderSummary?.file?.length < 1 ||
      !orderSummary?.file

    ) {
      Swal.fire({
        title: "Error",
        text: t("Please fill out all required fields"),
        icon: "error",
      });
      return;
    }
    // Ensure step_1 is being updated
    const updatedOrderSummary = {
      ...orderSummary,
      steps: {
        ...orderSummary.steps,
        step_1: true,
      }
    };

    // Dispatch action with updated summary data
    dispatch(setCurrentCreateOrder(updatedOrderSummary));
    // Dispatch action with formData
    navigate("/billing-information");
  };

  const handleSelectChange = (e, fieldId) => {
    const selectedValue = e.target.value;

    switch (fieldId) {
      case "SourceLanguage":
        // Handle the source language selection
        setSelectedSourceLanguages(selectedValue);
        // You can set state or perform other actions here
        break;

      case "target-language":
        // Handle the target language selection
        // You can set state or perform other actions here
        setSelectedTargetLanguages(selectedTargetId);
        break;

      case "topic":
        // Handle the topic selection
        setSelectedTopic(selectedValue);
        break;

      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="py-2">
        <h1 className="text-textgray text-base 2xl:text-xl mb-8 font-semibold">
          {t("Translation service")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:mt-8 mb-6">
          {translationServices.map((field) => (
            <div key={field.id}>
              <label
                className="block text-[#464E5F] text-xs 2xl:text-sm font-normal mb-2"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              {field.id === "target-language" ? (
                <button
                  id={field.id}
                  onClick={() => handleModalOpen(field.id)}
                  className="p-2 xl:p-3 text-xs 2xl:text-base 4xl:text-sm bg-[#F3F6F9] text-[#3F4254] rounded-md w-full text-left focus:outline-none"
                >
                  {orderSummary?.TargetLanguage?.length > 0
                    ? orderSummary?.TargetLanguage
                      .map((selected) => t(selected?.TargetLanguage))
                      .join(", ")
                    : t("Select Target Languages")}
                </button>
              ) : field.type === "select" && field.id === "target-language" ? (
                <div className="relative inline-block w-full">
                  <select
                    onChange={(e) => setSelectedTargetLanguages(e.target.value)}
                    id={field.id}
                    className="p-3 pr-8 bg-[#F3F6F9] text-[#3F4254] rounded-md w-full focus:outline-none appearance-none"
                    placeholder={field.placeholder}
                  >
                    <option value="" disabled > {/* selected */}
                      {field.placeholder || "Select an option"}
                    </option>
                    {field.options.map((option, index) => (
                      <option key={index} value={t(option)}>
                        {t(option)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-[#B5B5C3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : field.type === "select" && field.id === "topic" ? (
                <div className="relative inline-block w-full">
                  <SearchSelect
                    type="topic"  // Or set the type to "source" if you want source options
                    placeholder={field.placeholder}
                    onChange={(selectedValue) => setSelectedTopic(selectedValue.value)}
                    value={selectedTopic}
                    data = {topics}
                  />
                </div>
              ) : field.type === "select" && field.id === "SourceLanguage" ? (
                <div className="relative inline-block w-full">
                  <SearchSelect
                    type="source"  // Or set the type to "source" if you want source options
                    placeholder={field.placeholder}
                    onChange={(selectedValue) => setSelectedSourceLanguages(selectedValue.value)}
                    value={selectedSourceLanguages}
                    data = {Languages}
                  />
                </div>
              ): field.type === "select" ? (
                <div className="relative inline-block w-full">
                  <select
                    id={field.id}
                    onChange={(e) => handleSelectChange(e, field.id)}
                    value={orderSummary[field.id] || ""}
                    className="custom-select p-3 pr-8 bg-[#F3F6F9] text-[#3F4254] rounded-md w-full focus:outline-none appearance-none"
                    placeholder={field.placeholder}
                  >
                    <option value="" disabled > {/* selected */}
                      {field.placeholder || "Select an option"}
                    </option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-[#B5B5C3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80  flex items-center z-50 justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[1000px]">
              <LanguageSelector
                onSelect={handleLanguageSelection}
                initialSelection={tempLanguageCombination}
                setIsModalOpen={setIsModalOpen}
                categories={categories}  // Passing categories to LanguageSelector
              />
            </div>
          </div>
        )}

        <div className="mt-14 grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <Upload
              setFiles={setFiles}
              files={files}
              wordCount={wordCount}
              setWordCount={setWordCount}
            />
          </div>
        </div>


        {/* <div>
          <h1 className="text-base 2xl:text-xl font-semibold text-textgray mt-9">
            Choose Rate
          </h1>
          <div className="mt-7 mb-10  py-6 px-[30px] bg-[#D5E9FA] rounded-md  ">
            <div className="flex text-[#464E5F] text-xs 2xl:text-base font-bold">
              <div>
                <span className="inline-flex items-center justify-center border border-[#0084F4] p-1 rounded-full mr-3">
                  <FaInfo className="text-[#0084F4] text-[8px] 2xl:text-[12px]" />
                </span>{" "}
              </div>
              <div>
                Some rates are not available for this language combination. -
                ATTENTION: for the Machine Translation/Post Editing service the
                supported formats are: .pdf, .docx and .pptx.
              </div>
            </div>
          </div>
           <RateSelector
            choosePlan={choosePlan}
            setChoosePlan={setChoosePlan}
            createOrder={OrderSummary}
          />
        </div>
*/}
        <div className="mt-14">
          <h1 className="text-base 2xl:text-[20px] font-semibold text-textgray pl-3 mb-8">
            {t("Select extra services")} <span className="text-[#B5B5C3] text-xs">({t("optional")})</span>
          </h1>
          <ExtraServices
            selectService={selectService}
            setSelectService={setSelectService}
          />
        </div>

        <hr className="my-12 2xl:my-16" />

        <div className="flex lg:flex-row flex-col-reverse gap-3 lg:justify-between justify-center items-center">
          <div className="flex justify-center items-center cursor-pointer gap-3">
            {/* <FaAnglesLeft className="text-sm 2xl:text-[17px] text-[#464E5F]" />
            <button className="text-[#464E5F] text-xs 2xl:text-sm font-semibold">
              Back to service selection
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            {/* <button className="text-[#2E8F96] bg-[#F3F6F9] text-xs 2xl:text-sm flex justify-center gap-2 items-center px-4 py-3 rounded-md font-semibold">
              <IoMailOutline className="text-sm 2xl:text-base font-semibold" />
              Send quote by email
            </button> */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#FD8C04] text-white text-xs font-semibold px-5 py-3 xl:px-6 2xl:px-8 2xl:text-sm rounded-md hover:bg-[#e69500]"
            >
              {t("Continue")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Translation;
