import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MyAccount = () => {

  const initialValues = {
    name: '',
    surname: '',
    gender: '',
    email: '',
    language: '',
    timezone: '',
    newPassword: '',
    repeatPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    language: Yup.string().required('Language is required'),
    timezone: Yup.string().required('Timezone is required'),
    newPassword: Yup.string(),
    repeatPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function(value) {
        const { newPassword } = this.parent;
        if (!newPassword) return true;
        return value === newPassword;
      }
    )
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values: ', values);
    },
  });

  const fieldConfig = [
    { id: 'name', name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Name' },
    { id: 'surname', name: 'surname', type: 'text', placeholder: 'Enter your surname', label: 'Surname' },
    { id: 'gender', name: 'gender', type: 'select', options: ['Select', 'Unspecified', 'Male', 'Female', 'Other'], label: 'Gender' },
    { id: 'email', name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
    { id: 'language', name: 'language', type: 'select', options: ['Select', 'English (British)'], label: 'Display Language' },
    { id: 'timezone', name: 'timezone', type: 'select', options: ['Select', 'Europe / Madrid'], label: 'Timezone' },
    { id: 'newPassword', name: 'newPassword', type: 'password', placeholder: 'Enter new password', label: 'New Password' },
    { id: 'repeatPassword', name: 'repeatPassword', type: 'password', placeholder: 'Repeat new password', label: 'Confirm Password' },
  ];

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center pt-5 mb-12">
          <h2 className="text-xl font-semibold text-[#464E5F]">User information</h2>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="px-4 py-2 bg-[#FFA500] text-white font-medium rounded hover:bg-[#E69500] focus:outline-none focus:bg-[#E69500]"
          >
            Save
          </button>
        </div>

        <hr className="text-[#eeeeee]" />
        
        <form onSubmit={formik.handleSubmit}>
          {fieldConfig.map((field) => (
            <div key={field.id} className="mb-8 mt-5 flex flex-col md:flex-row md:items-center">
              
              <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] sm:mb-0" htmlFor={field.id}>
                {field.label} <span className="text-red-500">*</span>
              </label>
              
              <div className='w-full'>

                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="md:w-3/4 lg:w-4/5 xl:w-3/4 2xl:w-2/3 w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option.toLowerCase()}>{option}</option>
                    ))}

                  </select>

                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="md:w-3/4 lg:w-4/5 xl:w-3/4 2xl:w-2/3 w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
                    placeholder={field.placeholder}
                  />
                )}

                <div className="text-red-500 text-sm mt-1">
                  {formik.touched[field.name] && formik.errors[field.name] ? formik.errors[field.name] : null}
                </div>

              </div>
            </div>
          ))}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default MyAccount;





// import React from 'react';
// import DefaultLayout from '../../layout/DefaultLayout';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// // Validation schema
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   surname: Yup.string().required('Surname is required'),
//   gender: Yup.string().required('Gender is required'),
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   language: Yup.string().required('Language is required'),
//   timezone: Yup.string().required('Timezone is required'),
//   newPassword: Yup.string(),
//   repeatPassword: Yup.string().test(
//     'passwords-match',
//     'Passwords must match',
//     function(value) {
//       const { newPassword } = this.parent;
//       if (!newPassword) return true;
//       return value === newPassword;
//     }
//   )
// });

// const MyAccount = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       surname: '',
//       gender: '',
//       email: '',
//       language: '',
//       timezone: '',
//       newPassword: '',
//       repeatPassword: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log('Form values: ', values);
//     },
//   });

//   return (
//     <DefaultLayout>
//       <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
//         <div className="flex justify-between items-center pt-5 mb-12">
//           <h2 className="text-xl font-semibold text-[#464E5F]">User Information</h2>
//           <button
//             type="submit"
//             onClick={formik.handleSubmit}
//             className="px-4 py-2 bg-[#FFA500] text-white font-medium rounded hover:bg-[#E69500] focus:outline-none focus:bg-[#E69500]"
//           >
//             Save
//           </button>
//         </div>

//         <hr className="text-[#eeeeee]" />

//         <form onSubmit={formik.handleSubmit}>
//           {/* Name Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="name">
//               Name <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//                 placeholder="Enter your name"
//               />
//               {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div> : null}
//             </div>
//           </div>

//           {/* Surname Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="surname">
//               Surname <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <input
//                 type="text"
//                 id="surname"
//                 name="surname"
//                 value={formik.values.surname}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//                 placeholder="Enter your surname"
//               />
//               {formik.touched.surname && formik.errors.surname ? <div className="text-red-500 text-sm mt-1">{formik.errors.surname}</div> : null}
//             </div>
//           </div>

//           {/* Gender Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="gender">
//               Gender <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formik.values.gender}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//               >
//                 <option value="">Select</option>
//                 <option value="unspecified">Unspecified</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               {formik.touched.gender && formik.errors.gender ? <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div> : null}
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="email">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//                 placeholder="Enter your email"
//               />
//               {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div> : null}
//             </div>
//           </div>

//           {/* Language Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="language">
//               Display Language <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <select
//                 id="language"
//                 name="language"
//                 value={formik.values.language}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//               >
//                 <option value="">Select</option>
//                 <option value="english">English (British)</option>
//               </select>
//               {formik.touched.language && formik.errors.language ? <div className="text-red-500 text-sm mt-1">{formik.errors.language}</div> : null}
//             </div>
//           </div>

//           {/* Timezone Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="timezone">
//               Timezone <span className="text-red-500">*</span>
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <select
//                 id="timezone"
//                 name="timezone"
//                 value={formik.values.timezone}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded bg-[#F3F6F9] text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//               >
//                 <option value="">Select</option>
//                 <option value="europe-madrid">Europe / Madrid</option>
//               </select>
//               {formik.touched.timezone && formik.errors.timezone ? <div className="text-red-500 text-sm mt-1">{formik.errors.timezone}</div> : null}
//             </div>
//           </div>

//           {/* New Password Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="newPassword">
//               New Password
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <input
//                 type="password"
//                 id="newPassword"
//                 name="newPassword"
//                 value={formik.values.newPassword}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//                 placeholder="Enter new password"
//               />
//               {formik.touched.newPassword && formik.errors.newPassword ? <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div> : null}
//             </div>
//           </div>

//           {/* Repeat Password Field */}
//           <div className="mb-8 mt-5 flex flex-col sm:flex-row sm:items-center">
//             <label className="sm:w-1/4 block text-[#464E5F] font-normal text-[14px] mb- sm:mb-0" htmlFor="repeatPassword">
//               Repeat Password
//             </label>
//             <div className="sm:w-1/2 w-full">
//               <input
//                 type="password"
//                 id="repeatPassword"
//                 name="repeatPassword"
//                 value={formik.values.repeatPassword}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-3 py-2 border border-[#E4E6EF] rounded text-[#464E5F] focus:outline-none focus:border-[#69B3FF]"
//                 placeholder="Repeat new password"
//               />
//               {formik.touched.repeatPassword && formik.errors.repeatPassword ? <div className="text-red-500 text-sm mt-1">{formik.errors.repeatPassword}</div> : null}
//             </div>
//           </div>

//         </form>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default MyAccount;