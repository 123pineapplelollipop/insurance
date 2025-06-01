import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-bold text-blue-900">InsureAssist</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chatbot" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                >
                  Insurance Advisor
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                  >
                    Admin
                  </Link>
                )}
                <div className="pl-4 border-l border-gray-300 flex items-center">
                  <div className="mr-4">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-900"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-900"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 border-b border-gray-200 mb-2">
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-800">{user?.username}</span>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/chatbot"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                >
                  Insurance Advisor
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;