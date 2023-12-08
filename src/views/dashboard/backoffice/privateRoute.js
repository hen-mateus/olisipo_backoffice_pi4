import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  // Lógica de verificação de autenticação
  // Pode ser uma verificação de token no localStorage, por exemplo
  const userIsAuthenticated = Cookies.get('token'); // Exemplo: token armazenado no localStorage

  return (
    <Route
      {...rest}
      element={userIsAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
