import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const isTokenValid = accessToken && accessToken != "false" && accessToken != "null" && accessToken != "undefined";


  if (!isTokenValid) {
    // Redirect to SignIn page if the user is not authenticated
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If the user is authenticated, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
