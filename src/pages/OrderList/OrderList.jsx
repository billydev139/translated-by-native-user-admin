import React from 'react';
import DropdownFour from '../../components/Dropdown/Dropdown';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout'


const data = [
  {
    name: 'Musharof Chowdhury',
    position: 'Multidisciplinary Web Entrepreneur',
    email: 'musharof@example.com',
    role: 'Owner',
  },
  {
    name: 'Naimur Rahman',
    position: 'Website Front-end Developer',
    email: 'naimurrahman@example.com',
    role: 'Member',
  },
  {
    name: 'Naimur Rahman',
    position: 'Website Front-end Developer',
    email: 'naimurrahman@example.com',
    role: 'Member',
  },
  {
    name: 'Naimur Rahman',
    position: 'Website Front-end Developer',
    email: 'naimurrahman@example.com',
    role: 'Member',
  },
  {
    name: 'Naimur Rahman',
    position: 'Website Front-end Developer',
    email: 'naimurrahman@example.com',
    role: 'Member',
  },
  {
    name: 'Naimur Rahman',
    position: 'Website Front-end Developer',
    email: 'naimurrahman@example.com',
    role: 'Member',
  },
  {
    name: 'Shafiq Hammad',
    position: 'Regional Paradigm Technician',
    email: 'shafiq.hd@example.com',
    role: 'Moderator',
  },
  {
    name: 'Alex Semuyel',
    position: 'Applications Engineer',
    email: 'alex.semuel@example.com',
    role: 'Admin',
  },
];

const OrderList = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order List" />
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1070px]">
          {/* table header start */}
          <div className="grid grid-cols-12 rounded-t-[10px] bg-[#2E8F96] px-5 py-4 lg:px-7.5 2xl:px-11">
            <div className="col-span-3">
              <h5 className="font-medium text-white">Name</h5>
            </div>

            <div className="col-span-3">
              <h5 className="font-medium text-white">Position</h5>
            </div>

            <div className="col-span-3">
              <h5 className="font-medium text-white">Email</h5>
            </div>

            <div className="col-span-2">
              <h5 className="font-medium text-white">Role</h5>
            </div>

            <div className="col-span-1">
              <h5 className="text-right font-medium text-white">Edit</h5>
            </div>
          </div>
          {/* table header end */}

          {/* table body start */}
          <div className="bg-white bg-[#F3F6F9]">
            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
              >
                <div className="col-span-3">
                  <p className="text-[#464E5F] ">{item.name}</p>
                </div>

                <div className="col-span-3">
                  <p className="text-[#464E5F] ">{item.position}</p>
                </div>

                <div className="col-span-3">
                  <p className="text-[#464E5F] ">{item.email}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-[#464E5F] ">
                    {item.role}</p>
                </div>
                <div className="col-span-1">
                  <DropdownFour />
                </div>
              </div>
            ))}
          </div>
          {/* table body end */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrderList;
