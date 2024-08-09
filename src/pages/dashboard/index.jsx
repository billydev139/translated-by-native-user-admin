import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const inputFields = [
  {
    id: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
  },
];
const Dashboard = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
<div>
  <div className='bg-white shadow-md  px-4 py-4'>
    <div><h1 className='text-[24px] font-bold flex justify-start'>Notifications
</h1></div>
<div><h1 className='text-[15px] font-medium text-[#696969] flex justify-center  items-center py-8 px-5'>Notifications
</h1></div>

  </div>
</div>
    </DefaultLayout>
  );
}

export default Dashboard