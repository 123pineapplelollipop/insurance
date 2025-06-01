import React, { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import ChatbotInterface from '../components/ChatbotInterface';
import PolicyCard from '../components/PolicyCard';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const ChatbotPage: React.FC = () => {
  const { messages, policies, currentStep, resetChat, isLoading } = useChatStore();

  // Reset chat when component unmounts
  useEffect(() => {
    return () => {
      if (messages.length > 0) {
        // Don't reset if user is in the middle of a conversation
        // This allows the chat to persist between page navigations
      }
    };
  }, []);

  const handleRestartChat = () => {
    resetChat();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Advisor</h1>
          <button 
            onClick={handleRestartChat}
            className="btn-outline flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Start New Chat
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* If we're at the policy recommendation step (4), show the policies */}
          {currentStep === 4 && policies.length > 0 ? (
            <>
              <div className="lg:col-span-3 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-2">Your Personalized Policy Recommendations</h2>
                  <p className="text-gray-600">
                    Based on your requirements and risk profile, we've identified these insurance policies that would be a good fit for you.
                    Compare the options and select the one that best meets your needs.
                  </p>
                  <button
                    onClick={() => useChatStore.setState({ currentStep: 3 })}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to chat
                  </button>
                </div>
              </div>
              
              {/* Policy cards */}
              {policies.map((policy) => (
                <div key={policy.id} className="animate-fade-in animate-slide-up">
                  <PolicyCard policy={policy} />
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Chat interface */}
              <div className="lg:col-span-2">
                <ChatbotInterface />
              </div>
              
              {/* Info sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md h-auto">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">How It Works</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-6 w-6 rounded-full bg-blue-100 text-blue-600 items-center justify-center mr-3">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Share your details and requirements with our AI advisor
                        </p>
                      </div>
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-6 w-6 rounded-full bg-blue-100 text-blue-600 items-center justify-center mr-3">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          The system analyzes your risk profile and needs
                        </p>
                      </div>
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-6 w-6 rounded-full bg-blue-100 text-blue-600 items-center justify-center mr-3">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Get personalized policy recommendations tailored to you
                        </p>
                      </div>
                      <div className="flex">
                        <div className="flex-shrink-0 flex h-6 w-6 rounded-full bg-blue-100 text-blue-600 items-center justify-center mr-3">
                          <span className="text-sm font-medium">4</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Compare options and select the best policy for your needs
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Privacy Note</h4>
                      <p className="text-sm text-blue-800">
                        Your information is only used to provide personalized policy recommendations.
                        We never share your personal data with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;