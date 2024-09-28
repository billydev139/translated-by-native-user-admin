import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {

  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  // If the user is already authenticated, redirect to a protected route (e.g., /order-list)
  if (accessToken) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If not authenticated, allow access to the route (e.g., SignIn page)
  return <Outlet />;
}

export default PublicRoute