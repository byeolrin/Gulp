// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const user = useSelector(state => state.session.user)
  const isAuthenticated = user ? true : false;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace={true} state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;
