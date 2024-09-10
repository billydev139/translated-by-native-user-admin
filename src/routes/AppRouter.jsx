import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import Notifications from "../pages/notifications/Notifications";
import OrderList from "../pages/OrderList/OrderList";
import MyAccount from "../pages/MyAccount/MyAccount";
import Dashboard from "../pages/dashboard";
import Callback from "../components/Callback/Callback";


const AppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the token from localStorage and check if it's truthy
  const accessToken = localStorage.getItem('accessToken');
  // Check if the token is truthy
const isTokenValid = accessToken && accessToken != "false" && accessToken != "null" && accessToken != "undefined";
return (
      <Routes>
        <Route path="/auth/callback" element={<Callback/>} />
        <Route
          path="/"
          element={
            isTokenValid  ? (
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
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/my-account" element={<MyAccount />} />
        </Route>
      </Routes>
  );
}

export default AppRouter;
