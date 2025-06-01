import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Lock, AlertCircle, Check, AlertTriangle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthStore();
  const navigate = useNavigate();
  
  // Password strength check
  const getPasswordStrength = () => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const passwordStrength = getPasswordStrength();
  
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 2) {
      setError('Please choose a stronger password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(username, email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already in use');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                />
              </div>
              
              {/* Password strength meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500">Password strength</div>
                    <div className={`text-xs font-medium ${
                      passwordStrength <= 1 ? 'text-red-500' : 
                      passwordStrength === 2 ? 'text-yellow-500' : 
                      passwordStrength === 3 ? 'text-blue-500' : 
                      'text-green-500'
                    }`}>
                      {getStrengthText()}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  <ul className="mt-2 space-y-1 text-xs text-gray-500">
                    <li className="flex items-center">
                      {password.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-gray-400 mr-1" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      {/[A-Z]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-gray-400 mr-1" />
                      )}
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      {/[0-9]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-gray-400 mr-1" />
                      )}
                      At least one number
                    </li>
                    <li className="flex items-center">
                      {/[^A-Za-z0-9]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-gray-400 mr-1" />
                      )}
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input pl-10 ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;