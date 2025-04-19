
import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api'; // Usando Axios configurado para enviar cookies automaticamente

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/category/all');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro de autenticação:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

