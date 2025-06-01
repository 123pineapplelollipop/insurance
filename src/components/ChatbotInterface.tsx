import React, { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, Loader2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { ChatMessage } from '../types';

const ChatbotInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, currentStep, isLoading, generatePolicies } = useChatStore();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle initial bot message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage("Hello! I'm your insurance advisor. I'll help you find the best insurance policy based on your needs. Let's start with some basic information. How old are you?", 'bot');
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    addMessage(inputValue, 'user');
    setInputValue('');
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Handle bot response based on current step
    setTimeout(() => {
      handleBotResponse();
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleBotResponse = () => {
    // Simplified chatbot logic based on steps
    switch (currentStep) {
      case 0:
        // After asking age, ask about gender
        addMessage("Thank you. What is your gender?", 'bot');
        useChatStore.setState({ currentStep: 1 });
        break;
      case 1:
        // After gender, ask about occupation
        addMessage("Great. What is your occupation?", 'bot');
        useChatStore.setState({ currentStep: 2 });
        break;
      case 2:
        // After occupation, ask about health conditions
        addMessage("Do you have any pre-existing health conditions? (e.g., diabetes, hypertension, etc.)", 'bot');
        useChatStore.setState({ currentStep: 3 });
        break;
      case 3:
        // After health conditions, generate policy recommendations
        addMessage("Thank you for providing this information. I'll analyze your profile and find the best insurance policies for you. This will just take a moment...", 'bot');
        generatePolicies();
        break;
      default:
        // Generic response for any other interaction
        addMessage("Thank you for the additional information. Is there anything else you'd like to tell me about your insurance needs?", 'bot');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-blue-900 text-white rounded-t-lg">
        <h3 className="text-lg font-semibold">Insurance Advisor</h3>
        <p className="text-sm text-blue-200">Ask me about insurance policies</p>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message: ChatMessage) => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div 
              className={`max-w-[75%] px-4 py-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              } animate-fade-in`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 text-gray-500 px-4 py-3 rounded-lg rounded-bl-none max-w-[75%]">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="flex items-center text-gray-500">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span>Analyzing your risk profile...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="px-4 py-3 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center">
          <button 
            type="button" 
            className="text-gray-500 hover:text-blue-600 mr-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="sr-only">Add attachment</span>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={inputValue.trim() === '' || isLoading}
          >
            <Send className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotInterface;