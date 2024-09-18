import React from "react";
import Layout from "../../layout/ClientLayout";
import Link from "next/link";
import { translate } from "../../assets/images";

const PageInformation = () => {
  return (
    <Layout>
      <Link to="/project-information/translation"> 
      <div>
        <h1 className="text-textgray text-[20px] font font-semibold">
          Choose type of service
        </h1>
        <div className="bg-white max-w-[354px] cursor-pointer min-h-[186px] flex justify-center px-8 py-8 mt-4 border rounded-sm items-center hover:shadow-custom-light duration-300 ...">
          <img src={translate} alt="Translate" />
        </div>
      </div>
      </Link>
    </Layout>
  );
};

export default PageInformation;
