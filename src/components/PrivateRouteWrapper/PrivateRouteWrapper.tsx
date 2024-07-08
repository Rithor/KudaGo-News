import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

interface PrivateRouteWrapperProps {
  element: React.ReactElement;
}

export const PrivateRouteWrapper: React.FC<
  PrivateRouteWrapperProps
> = ({ element }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    );
  }
  return element;
};
