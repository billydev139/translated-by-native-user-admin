import { useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:pt-8 2xl:pl-10 2xl:pr-10 2xl:pb-8'>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
