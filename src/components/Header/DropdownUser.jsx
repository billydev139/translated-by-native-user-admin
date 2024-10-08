import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/feature/auth/auth.service';
import { config } from '../../utils/EndPoints';

const DropdownUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const userDetails = useSelector((state) => state?.auth?.user);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap() // Unwrap the promise to handle navigation
      .then(() => {
        // Clear the local storage
        localStorage.clear();
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        // Handle any additional error logic if needed
      });
  }; 

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-4'
        to='#'
      >
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium text-black'> 
            {
              userDetails?.name && userDetails?.surname ? 
                (userDetails?.name + " " + userDetails?.surname) 
                : 
                ("")
            } 
          </span>
          <span className='block text-xs'>{userDetails?.role || ""}</span>
        </span>

        <span className='h-12 w-12 rounded-full'>
          {
            userDetails?.profile_pic ? (
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={`${config.BASE_URL}/profile/${userDetails?.profile_pic}`}
                  alt="Profile"
                />
            ) : (
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black">
                <span className="text-xl font-medium leading-none text-white">
                  {userDetails?.name?.charAt(0).toUpperCase()}
                </span>
                </span>
            )
          }
        </span>

        <IoIosArrowDown />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default  ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <button className='flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out 
          hover:text-primary lg:text-base'
          onClick={handleLogout}>
          <CiLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
