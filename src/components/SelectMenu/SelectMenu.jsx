

const SelectMenu =  ({ optionValues }) => {
  return (
    <div>
      {/* <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
        Status
      </label> */}
      <select
        id="status"
        name="status"
        defaultValue="status"
        className={`mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 cursor-pointer
          ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6`}
      >
        {
          optionValues.map((value, i) => (
            <option 
              key={i} 
              value={value}
            > 
              {value} 
            </option> 
          ))
        }
      </select>
    </div>
  )
}

export default SelectMenu