import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { closeModal } from '../../redux/feature/modal/modal.slice'

const GlobalModal = () => {

  const dispatch = useDispatch();

  const modal = useSelector(state => state.modal);
  const { isOpen, componentName, componentProps } = modal;

  if (!isOpen || !componentName) return null;

  const ComponentToRender = componentName;

  return (
    <>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg 2xsm:w-11/12 sm:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
          
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 z-50 text-gray-500 p-1 rounded hover:border-none hover:outline-none"
            onClick={() => dispatch(closeModal())}
          >
            <FaTimes size={24} color='gray'/>
          </button>
          
          {/* Render the dynamic component */}
          <div className="relative mt-3">
            <ComponentToRender {...componentProps} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalModal;
