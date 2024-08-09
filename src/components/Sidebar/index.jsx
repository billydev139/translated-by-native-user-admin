import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo/logo.png";
import { RiListOrdered2 } from 'react-icons/ri';
import { CgUserList } from 'react-icons/cg';
import { GrLanguage } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#1e1e2d] duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between lg:justify-center mt-2 gap-2 px-6 py-5.5 lg:py-1">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="object-cover w-20" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-black"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            {/* <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <RiListOrdered2 size={22} /> Order List
              </NavLink>
            </ul> */}
              <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <RiListOrdered2 size={22} /> Dashboard
              </NavLink>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <RiListOrdered2 size={22} /> Order
              </NavLink>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/Notifications"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <IoIosNotifications size={22} /> Notifications
              </NavLink>
            </ul>
            {/* <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/user-list"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <CgUserList size={22} />
                User List
              </NavLink>
            </ul> */}
            {/* <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/language-price"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <GrLanguage size={22} />
                Language/Price
              </NavLink>
            </ul> */}
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/my-account"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    isActive ? "bg-[#2E8F96] text-white" : "text-[#464E5F]"
                  }`
                }
              >
                <FaRegUser size={22} />
                My Account
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
