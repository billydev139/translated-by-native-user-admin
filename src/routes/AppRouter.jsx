import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/Auth/SignIn";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import Notifications from "../pages/notifications/Notifications";
import OrderList from "../pages/OrderList/OrderList";
import MyAccount from "../pages/MyAccount/MyAccount";
import Dashboard from "../pages/dashboard";
import Callback from "../components/Callback/Callback";
import { useEffect } from "react";
import Translation from "../pages/Translation/Translation";
import BillingInformation from "../pages/billing-information/BillingInformation";
import Payment from "../pages/payment/Payment";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import CheckoutSuccess from "../pages/payment/CheckoutSuccess";
import CheckoutCancelled from "../pages/payment/CheckoutCancel";
import SendVerificationEmail from "../pages/Auth/SendVerifcationEmail";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";


const AppRouter = () => {

  const accessToken = localStorage.getItem('accessToken');
  // Redirect to the dashboard if the user is already authenticated

  
  return (
      <Routes>
        {/* <Route path="/auth/callback" element={<Callback/>} /> */}
        
        <Route path="/" element={<Translation />} />
        <Route path="/billing-information" element={<BillingInformation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-cancelled" element={<CheckoutCancelled />} />
        <Route path="/send-password-reset-email" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />


        {/* Dashboard route, protected by accessToken */}
        <Route
        path="/auth/login"
        element={accessToken ? <Navigate to="/dashboard" replace /> : <SignIn />}
      />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/detail" element={<OrderDetails />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/my-account" element={<MyAccount />} />
        </Route>
      </Routes>
  );
}

export default AppRouter;
