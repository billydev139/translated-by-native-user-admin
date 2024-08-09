import React, { useState } from "react";
import TextEditor from "../TextEditor";

const languages = ["es", "nl", "de", "ru"];

const ContentTab = ({ formik }) => {
   const [activeTab, setActiveTab] = useState(0);

   const [tabValues, setTabValues] = useState(() => {
      return languages.map(
         (lang) => formik.values.content_translations[lang] || ""
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
      formik.setFieldValue("content_translations", {
         ...formik.values.content_translations,
         [lang]: value,
      });
   };

   return (
      <div role="tablist" className="tabs tabs-bordered">
         {languages.map((lang, index) => (
            <React.Fragment key={index}>
               <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label={lang.toUpperCase()}
                  checked={index === activeTab}
                  onChange={() => handleTabChange(index)}
               />
               <div role="tabpanel" className="tab-content py-10">
                  <div className="w-full mb-4.5">
                     <TextEditor
                        label="Content Translations"
                        id={`content_translations_${lang}`}
                        name={`content_translations_${lang}`}
                        placeholder={`Write ${lang.toUpperCase()} Content Translations here...`}
                        value={tabValues[index]}
                        onChange={(content) =>
                           handleTabValueChange(lang, content)
                        }
                     />
                     {formik.touched.content &&
                        formik.errors.content_translations && (
                           <span className="text-danger text-sm">
                              {formik.errors.content_translations}
                           </span>
                        )}
                  </div>
               </div>
            </React.Fragment>
         ))}
      </div>
   );
};

export default ContentTab;
