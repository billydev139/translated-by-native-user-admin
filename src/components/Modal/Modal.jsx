import React from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useSelector } from 'react-redux';

const Modal = ({
  open,
  setOpen,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  inputFields,
  editFlag,
  setEditFlag,
  sliceName,
  ThunkFunction,
}) => {
  // const loadingStatus = useSelector((state) => state[sliceName]?.status ==='loading');
  const loadingStatus = useSelector((state) => state.loading[ThunkFunction]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // Reset form values when modal closes
  React.useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => 
        { 
          setEditFlag(false)
          setOpen(false)
        }
      }
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
      <div className="flex mt-9 min-h-screen items-center justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-[#495057]"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {inputFields?.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-[#495057]"
                        >
                          {field.placeholder}
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={field.name}
                            name={field.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field.name]}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2"
                          >
                            <option value="" disabled>Select an option</option>
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field.name]}
                            className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
                          />
                        )}
                        {formik.touched[field.name] && formik.errors[field.name] ? (
                          <div className="text-red-500">
                            {formik.errors[field.name]}
                          </div>
                        ) : null}
                      </div>
                    ))}
                    <div className="bg-gray-50 pl-4 py-3 sm:flex sm:flex-row-reverse ">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-[#556EE6] px-3 py-2 text-subtitle-xsm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      >
                        {loadingStatus ? 'Please wait...' : title}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-subtitle-xsm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => 
                         { 
                          setOpen(false)
                          setEditFlag(false)
                         }
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
