
const SearchBar = ({ searchQuery, setSearchQuery, itemsPerPage, setItemsPerPage, setCurrentPage, width }) => {
  
  return (
    <div className="flex items-center space-x-2">
      <div className="relative inline-block">
        
        {/* <select
          id="itemsPerPage"
          className="text-xs flex justify-center items-start rounded border border-gray-300 py-2 pr-8 bg-white text-left min-w-[100px] appearance-none"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 20, 30, 40].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}

        <select
          id="itemsPerPage"
          className={`block w-full rounded border border-gray-300 py-1.5 pl-2 pr-10 text-gray-900 cursor-pointer
           focus:outline-none sm:text-sm sm:leading-6`}
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
        {
          [10, 20, 30, 40].map((value, i) => (
            <option 
              key={i} 
              value={value}
            > 
              {value} 
            </option> 
          ))
        }
      </select>
        
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-[black]"
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
            />
          </svg>
        </div> */}
      </div>

      <input
        type="text"
        placeholder="Search..."
        className={`text-xs rounded border border-gray-300 focus:outline-none py-2 px-4 2xsm:w-[195px] xsm:w-[245px] 
          ${width ? "sm:w-72 md:w-96 lg:w-78" : "sm:w-96" } xl:w-115`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;