import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MessageSquare, User, Shield, Bell, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl shadow-lg mb-8 animate-fade-in">
          <div className="p-8 sm:flex sm:items-center">
            <div className="sm:flex-1">
              <h1 className="text-white text-2xl font-bold">
                Welcome, {user?.username}!
              </h1>
              <p className="mt-2 text-blue-100">
                Your insurance journey starts here. Find personalized policies tailored to your needs.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link 
                to="/chatbot"
                className="btn bg-white text-blue-900 hover:bg-blue-50 shadow-sm flex items-center"
              >
                Get Started
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick actions */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link 
                    to="/chatbot" 
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                  >
                    <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Chat with Advisor</span>
                  </Link>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <Shield className="h-8 w-8 text-gray-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View My Policies</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <User className="h-8 w-8 text-gray-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Update Profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Recent Activity</h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">You haven't had any recent activity yet.</p>
                  <p className="text-gray-600 mt-2">Start by chatting with our insurance advisor.</p>
                  <Link 
                    to="/chatbot" 
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
                  >
                    Get started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Policy recommendations */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Recommended for You</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Health Insurance</h3>
                      <p className="text-sm text-gray-600">Comprehensive health coverage for you and your family</p>
                    </div>
                    <Link 
                      to="/chatbot" 
                      className="btn-outline text-sm"
                    >
                      Explore
                    </Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Term Life Insurance</h3>
                      <p className="text-sm text-gray-600">Financial protection for your loved ones</p>
                    </div>
                    <Link 
                      to="/chatbot" 
                      className="btn-outline text-sm"
                    >
                      Explore
                    </Link>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Auto Insurance</h3>
                      <p className="text-sm text-gray-600">Protection for your vehicle against accidents and damage</p>
                    </div>
                    <Link 
                      to="/chatbot" 
                      className="btn-outline text-sm"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-8">
            {/* User profile */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{user?.username}</h2>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="btn-outline w-full">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    1 New
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <div className="flex">
                      <Bell className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Welcome to InsureAssist!</p>
                        <p className="text-xs text-gray-600 mt-1">Start your journey by chatting with our AI advisor.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-gray-700 hover:text-blue-600 flex items-center">
                      <span className="mr-2">•</span>
                      Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-700 hover:text-blue-600 flex items-center">
                      <span className="mr-2">•</span>
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-700 hover:text-blue-600 flex items-center">
                      <span className="mr-2">•</span>
                      Policy Guide
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;