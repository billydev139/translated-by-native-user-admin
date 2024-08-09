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
  
    </DefaultLayout>
  );
}

export default Dashboard
