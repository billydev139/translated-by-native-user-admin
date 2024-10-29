

import { useState, useRef } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { uploadDoc } from "../../redux/feature/order/order.service"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentCreateOrder } from "../../redux/feature/order/order.slice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function Upload({wordCount, setWordCount}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderSummary =  useSelector((state) => state?.order?.orderSummary) || [];
  const orderFiles = orderSummary?.file || [];
  const loading = useSelector((state) => state?.loading[uploadDoc.typePrefix]) || false;
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  // const [wordsCount, setWordsCount] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    
    handleUpload(droppedFiles);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleUpload (files);
  };
  const handleUpload = (files) => {
    if (files.length === 0) return;
    const validFiles = files.filter((file) =>
      ['.doc', '.docx', '.pdf', '.txt', '.xls', '.xlsx', '.html', '.pptx', '.ods', '.odt', '.odp'].includes(file.name.slice(file.name.lastIndexOf('.')))
    );
  
    if (validFiles.length === 0) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Invalid file types' });
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
      dispatch(uploadDoc(formData))
  }
  const handleDeleteFile = (fileName) => {
    const filterFiles = orderFiles?.filter((file) => file.fileName !== fileName)
      dispatch(setCurrentCreateOrder(
       {
         file : filterFiles,
       }
      ))
  };
  // Calculate total words when the files state updates
  useEffect(() => {
    const totalWords = orderFiles.reduce((acc, file) => acc + (file.wordsCount || 0), 0);
    setWordCount(totalWords);
  }, [orderFiles]);



  // className={`min-h-[110px] 2xl:min-h-[118px] p-8 max-w-[434px] sm:max-w-[542px] md:max-w-[439px] lg:max-w-[406px] xl:max-w-[518px] 2xl:max-w-[602px] 3xl:max-w-[695px] 4xl:max-w-[772px] bg-[#F3F6F9] border border-[#ADD0D4] border-dashed rounded-md text-center cursor-pointer ${
  //   isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
  // }`}
  return (
    <div>
      <form >
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`min-h-[110px] 2xl:min-h-[118px] p-[30px] w-full bg-[#F3F6F9] border border-[#ADD0D4] border-dashed rounded-md text-center cursor-pointer ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ImSpinner8  className="text-blue-500 animate-spin text-[30px]" />
            </div>
          ) : (
            <div className="flex lg:flex-row flex-col lg:gap-8 gap-2 items-center">
              <div className="px-3">
                <MdOutlineUploadFile className="text-[30px] text-[#ADD0D4]" />
              </div>
              <div className="flex flex-col items-start">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  multiple
                  name = "file"
                  className="hidden"
                />
                {isDragging ? (
                  <p className="text-blue-500">{t("Drop the files here ...")}</p>
                ) : (
                  <>
                    <p className="text-textgray text-xs 2xl:text-sm font-semibold">
                      {t("Drag and drop files here or click to upload")}
                    </p>
                    <p className="mt-1 text-start text-[#7E8299] text-[10px] 2xl:text-xs">
                      {t("The following file types are permitted: .doc, .docx, .pdf, .txt, .xls, .xlsx, .html, .pptx, .ods, .odt, .odp")}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
                  {/* Progress Bar */}
        {/* {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        )} */}

        {/* Display the uploaded files with delete button */}
        {orderFiles.length > 0 && (
          <>
            <div className="mt-4 gap-7 flex flex-col">
              {orderFiles.map((file, index) => (
               
                <div key={index} className="w-full flex items-center gap-6">

                  <div className="w-full flex items-center justify-between gap-5 border border-[#E5EAEE] rounded px-4 py-3">
                    {/* Left Section: Icon and File Name */}
                    
                    <div className="flex items-center gap-5">
                      <FaFileAlt className="text-[17px] text-[#2E8F96]" />
                      <span className="text-[#464E5F] text-sm 2xl:text-base">
                        {file.fileName}
                      </span>
                    </div>
                  
                    {/* Right Section: Words Count */}
                    <span className="text-[#464E5F] text-sm 2xl:text-base">
                      {file.wordsCount}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteFile(file?.fileName)}
                    className="bg-[#F3F6F9] p-3 2xl:p-4 rounded"
                    >
                    <FaRegTrashCan className="text-sm 2xl:text-xl text-[#2E8F96]" />
                  </button>
                </div>             
              ))}
              {/* <button
                type="button"
                onClick={handleDeleteFile}
                className="bg-[#F3F6F9] p-4 rounded self-end"
              >
                <FaRegTrashCan className="text-[20px] text-[#2E8F96]" />
              </button> */}
            </div>
          </>
        )}

        {/* Total number of words to translate section */}
          <div className="text-[#464E5F] text-xs 2xl:text-sm font-normal mt-3">
            {t("Total number of words to translate")}: {wordCount}
          </div>

        {/* Notice Section */}
        {/* {orderFiles.length > 0 && !loading && (
          <>
            <div className="mt-10 py-4 2xl:py-6 px-8 bg-[#D5E9FA] rounded-md flex gap-10 2xl:gap-12 items-center">
              <div>
                <span className="inline-flex items-center justify-center bg-[#3699FF] p-2 rounded-full">
                  <FaInfo className="text-white text-xs 2xl:text-[15px]" />
                </span>
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[#464E5F] text-sm font-bold">Notice</div>
                <div className="text-[#464E5F] mt-1 text-xs font-normal">
                  PDF files can be converted to an editable format. Remember
                  that the layout service is additional to the contracted
                  tariff. To do this, please contact{" "}
                  <a
                    href="mailto:sales@bigtranslation.com"
                    className="text-[#3699FF]"
                  >
                    sales@bigtranslation.com
                  </a>
                  .
                </div>
              </div>
            </div>
          </>
        )} */}

        {/* Error Handling */}
        {/* {error && (
          <div className="mt-4 text-red-600 text-[14px]">
            {error}
          </div>
        )} */}
      </form>
    </div>
  );
}
