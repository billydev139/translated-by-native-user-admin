import React from "react";
import Layout from "../../layout/ClientLayout";
import { PiWarningCircleThin } from "react-icons/pi";
import Upload from "../../components/upload/Upload";

const ConfirmedOrder = () => {
  return (
    <div>
      <Layout>
        <div className="px-8py-5 ">
          <h2 className="text-[28px] text-[#464E5F] font-bold text-center ">
            Thank you! Order confirmed.
          </h2>
          <p className="text-xl font-normal text-[#464E5F] mt-10 mr-2">
            Your order O23156 has been confirmed. Complete the following fields
            with the details of your project so that we can start working on it.
          </p>

          <div className="bg-[#D5F2EA] px-8 py-4 rounded mt-10">
            <div className="flex items-start gap-6 mb-2">
              <div className="pt-1">
                <PiWarningCircleThin size={30} color="#56C272" />
              </div>
              <div>
                <span className="font-bold text-[14px] text-[#464E5F]">
                  Below, you will find all of the information you need so you
                  can complete the bank transfer for your order 023156
                </span>

                <p className="font-normal text-[14px] text-[#464E5F] pt-2">
                  Once the transfer has been made, please send us the proof of
                  payment to{" "}
                  <a
                    href="mailto:sales@bigtranslation.com"
                    className="text-blue-500 "
                  >
                    sales@bigtranslation.com
                  </a>{" "}
                  so we can check the payment.
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li className="font-normal text-[14px] text-[#464E5F]">
                    Bank: Banco Santander, S.A.
                  </li>
                  <li className="font-normal text-[14px] text-[#464E5F]">
                    IBAN: ES66 0049 4606 70 2416329079
                  </li>
                  <li className="font-normal text-[14px] text-[#464E5F]">
                    BIC: BSCHESMM
                  </li>
                  <li className="font-normal text-[14px] text-[#464E5F]">
                    Account holder: BigTranslation
                  </li>
                  <li className="font-normal text-[14px] text-[#464E5F]">
                    Reference:Order number 023156
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Internal Reference Input Field */}
          <div className="mt-6">
            <label
              className="block text-[#464E5F] text-[14px] font-normal mb-2"
              htmlFor="internal-reference"
            >
              Internal reference
            </label>
            <input
              id="internal-reference"
              type="text"
              placeholder="Internal reference"
              className="p-3 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-96 focus:outline-none"
            />
          </div>

          {/* Briefing for the Translator Textarea */}
          <div className="mt-8">
            <label
              className="block text-[#464E5F] text-[14px] font-normal mb-2"
              htmlFor="translator-briefing"
            >
              Briefing for the translator
            </label>
            <textarea
              id="translator-briefing"
              placeholder="Aa"
              className="p-3 bg-[#F3F6F9] text-[#B5B5C3] rounded-md w-full focus:outline-none resize-none"
            ></textarea>
          </div>

          <label
            className="block text-[#464E5F] text-[14px] font-normal mt-8 "
            htmlFor="internal-reference"
          >
            Upload support files for the translator
          </label>
          <Upload />

          <hr className="my-16" />

          <div className="flex justify-end gap-4 ">
            <button className="bg-[#F3F6F9] text-[#2E8F96] text-[14px] font-semibold px-5 py-2 rounded-md hover:bg-[#E5E5E5]">
              Go to platform
            </button>
            <button className="bg-[#FD8C04] text-white text-[14px] font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]">
              Send additional details
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ConfirmedOrder;
