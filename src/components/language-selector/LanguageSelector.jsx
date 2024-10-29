import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";

export default function LanguageSelector({
  onSelect,
  initialSelection = [],
  setIsModalOpen,
  categories,
}) {
  const { t } = useTranslation();
  const [selectedLanguages, setSelectedLanguages] = useState(
    initialSelection.map((language) => language?.TargetLanguage)
  
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) // Check if the language is already selected
        ? prev.filter((selected) => selected !== lang) // Remove it if it is selected
        : [...prev, lang] // Otherwise, add it to the selection
    );
  };

  // Filter languages based on the search term
  const filteredLanguages = categories
    .map((category) => ({
      ...category,
      languages: category.languages.filter((lang) =>
        lang.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.languages.length > 0); // Keep only categories with matched languages

  const handleSelection = () => {
    if (onSelect) {
      onSelect(selectedLanguages);
    }
  };

  return (
    <div className="p-4 min-h-60">
      <div className="text-base text-gray-950">
        {t("Add Target Languages")}
      </div>
      <div className="w-full p-2 mb-4 mt-4 border border-terchary flex justify-center items-center gap-3 rounded">
        <IoIosSearch className="text-terchary text-xl font-extrabold" />
        <input
          type="text"
          placeholder="Search languages..."
          className="w-full focus:border-none active:border-none outline-none ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display filtered languages based on category */}
      {filteredLanguages.length === 0 ? (
        <p>No languages found</p>
      ) : (
        <div className="max-h-60 overflow-y-auto"> {/* Added scrollable area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 md:grid-cols-3 gap-4">
            {filteredLanguages.map((category) => (
              <div key={category.name}>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                {category.languages.map((lang) => (
                  <div
                    key={lang} // Use lang directly as key
                    className={`flex justify-between items-center px-3 py-2 text-textgray font-normal mb-4 cursor-pointer transition-colors duration-200 ${
                      selectedLanguages.includes(lang) // Check if the language is selected
                        ? "bg-[#305e73] text-white"
                        : "hover:bg-[#305e73] hover:bg-opacity-70 hover:text-white"
                    }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    <span>{lang}</span>
                    {selectedLanguages.includes(lang) ? (
                      <svg
                        className="w-6 h-6 text-white transition-colors duration-200"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-white hover:text-[#305e73] transition-colors duration-200"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 bg-lightgray text-black text-[14px] font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]"
        >
          {t("Close")}
        </button>
        <button
          onClick={handleSelection}
          className="mt-4 bg-[#FD8C04] text-white text-[14px] font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]"
        >
          {t("Confirm Selection")}
        </button>
      </div>
    </div>
  );
}
