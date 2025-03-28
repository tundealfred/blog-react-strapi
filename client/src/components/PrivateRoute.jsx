// src/components/PrivateRoute.jsx
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />} // Redirect to login if not authenticated
    />
  );
};
