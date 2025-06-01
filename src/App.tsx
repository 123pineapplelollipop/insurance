import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { initAuthState } from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ChatbotPage from './pages/ChatbotPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  // Initialize auth state from localStorage on app load
  useEffect(() => {
    initAuthState();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected routes - require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="payment/:policyId" element={<PaymentPage />} />
        </Route>
        
        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        
        {/* Fallback routes */}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404\" replace />} />
      </Route>
    </Routes>
  );
}

export default App;