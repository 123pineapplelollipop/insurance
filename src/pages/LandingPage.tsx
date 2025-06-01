import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, CreditCard, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in">
                Smart Insurance <br />Tailored Just for You
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg animate-fade-in">
                Our AI-powered advisor analyzes your unique profile and recommends the perfect policy that fits your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
                <Link
                  to="/register"
                  className="btn-primary px-8 py-3 text-base"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="btn bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-base"
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in">
              <img 
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Happy family with insurance protection" 
                className="rounded-lg shadow-2xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes finding the right insurance policy simple and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-soft animate-fade-in">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Tell Us About Yourself</h3>
              <p className="text-gray-600">
                Answer a few questions about your needs and circumstances through our friendly chatbot interface.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-soft animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Personalized Recommendations</h3>
              <p className="text-gray-600">
                Our AI analyzes your profile and recommends the top 3 policies perfectly suited to your needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-soft animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Choose & Purchase</h3>
              <p className="text-gray-600">
                Compare the options, select the best fit, and complete your purchase with our secure payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InsureAssist</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with insurance expertise to deliver the best experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex p-6 bg-white rounded-xl shadow-sm animate-fade-in">
              <div className="mr-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Risk Analysis</h3>
                <p className="text-gray-600">
                  Our algorithm analyzes multiple factors to accurately assess your risk profile and match you with the right coverage.
                </p>
              </div>
            </div>

            <div className="flex p-6 bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="mr-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Recommendations</h3>
                <p className="text-gray-600">
                  Get personalized policy recommendations within seconds, saving you hours of research and comparison.
                </p>
              </div>
            </div>

            <div className="flex p-6 bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="mr-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Payment Options</h3>
                <p className="text-gray-600">
                  Choose from multiple secure payment methods including credit/debit cards, UPI, and net banking.
                </p>
              </div>
            </div>

            <div className="flex p-6 bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="mr-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Our team of insurance experts is always available to answer your questions and provide guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Insurance Policy?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found the right coverage at the right price.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center btn bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg font-medium"
          >
            Get Started Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;