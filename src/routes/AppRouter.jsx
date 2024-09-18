import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import Notifications from "../pages/notifications/Notifications";
import OrderList from "../pages/OrderList/OrderList";
import MyAccount from "../pages/MyAccount/MyAccount";
import Dashboard from "../pages/dashboard";
import Callback from "../components/Callback/Callback";
import OrderDetails from "../pages/OrderDetails/OrderDetails";


const AppRouter = () => {

  const accessToken = localStorage.getItem('accessToken');
  
  return (
      <Routes>
        <Route path="/auth/callback" element={<Callback/>} />
        <Route
          path="/"
          element={
            accessToken ? (
                <Navigate to="/dashboard" replace />
            ) : (
              <SignIn />
            )
          }
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/order/detail" element={<OrderDetails />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/my-account" element={<MyAccount />} />
        </Route>
      </Routes>
  );
}

export default AppRouter;
