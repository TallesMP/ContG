
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login'; // Importando a página Login
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import './global.css';
import ProtectedRoute from './services/ProtectedRoute';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

