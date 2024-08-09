import React from 'react';

const InputFile = React.forwardRef(
  ({ label, id, value, onChange, required, name, onBlur }, ref) => {
    return (
      <>
        <label htmlFor={id} className='mb-3 block text-black '>
          {label} {required && <span className='text-meta-1'>*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          type='file'
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter'
        />
      </>
    );
  }
);

export default InputFile;
