import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    // Redirect to SignIn page if the user is not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else {
    
  }

  // If the user is authenticated, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
