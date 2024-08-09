import React, { useState } from "react";
import InputBox from "../Forms/Inputs/InputBox";

const languages = ["es", "nl", "de", "ru"];

const TitleTab = ({ formik }) => {
   const [activeTab, setActiveTab] = useState(0);

   const [tabValues, setTabValues] = useState(() => {
      return languages.map(
         (lang) => formik.values.title_translations?.[lang] || ""
      );
   });

   const handleTabChange = (index) => {
      setActiveTab(index);
   };

   const handleTabValueChange = (lang, value) => {
      const langIndex = languages.indexOf(lang);
      const newTabValues = [...tabValues];
      newTabValues[langIndex] = value;
      setTabValues(newTabValues);
      formik.setFieldValue("title_translations", {
         ...formik.values.title_translations,
         [lang]: value,
      });
   };

   return (
      <div role="tablist" className="tabs tabs-bordered">
         {languages.map((lang) => (
            <React.Fragment key={lang}>
               <input
                  type="radio"
                  name="title_tabs"
                  role="tab"
                  className="tab"
                  aria-label={lang.toUpperCase()}
                  checked={lang === languages[activeTab]}
                  onChange={() => handleTabChange(languages.indexOf(lang))}
               />
               <div role="tabpanel" className="tab-content py-10">
                  <div className="w-full mb-4.5">
                     <InputBox
                        type="text"
                        id={`title_translations_${lang}`}
                        label="Title Translations"
                        placeholder={`Enter ${lang.toUpperCase()} Title Translations`}
                        name={`title_translations_${lang}`}
                        value={tabValues[languages.indexOf(lang)]}
                        onChange={(event) =>
                           handleTabValueChange(lang, event.target.value)
                        }
                     />
                     {formik.touched.title_translations &&
                        formik.errors.title_translations && (
                           <span className="text-danger text-sm">
                              {formik.errors.title_translations}
                           </span>
                        )}
                  </div>
               </div>
            </React.Fragment>
         ))}
      </div>
   );
};

export default TitleTab;
