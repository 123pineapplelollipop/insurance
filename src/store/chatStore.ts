import { create } from 'zustand';
import { ChatState, ChatMessage, PolicyOption, UserRequirement } from '../types';
import { generatePolicyRecommendations } from '../utils/policyGenerator';

const initialRequirements: UserRequirement = {
  age: null,
  gender: '',
  occupation: '',
  annualIncome: null,
  healthConditions: [],
  familyHistory: [],
  lifestyle: [],
  coverageNeeds: []
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  requirements: initialRequirements,
  policies: [],
  isLoading: false,
  currentStep: 0,

  addMessage: (text: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      sender,
      timestamp: Date.now()
    };

    set(state => ({
      messages: [...state.messages, newMessage]
    }));
  },

  updateRequirements: (key: keyof UserRequirement, value: any) => {
    set(state => ({
      requirements: {
        ...state.requirements,
        [key]: value
      }
    }));
  },

  resetChat: () => {
    set({
      messages: [],
      requirements: initialRequirements,
      policies: [],
      currentStep: 0
    });
  },

  generatePolicies: () => {
    set({ isLoading: true });
    
    // Simulate API call with a delay
    setTimeout(() => {
      const requirements = get().requirements;
      const policies = generatePolicyRecommendations(requirements);
      
      set({ 
        policies, 
        isLoading: false,
        currentStep: 4 // Move to policy display step
      });
      
      // Add a bot message about the recommendations
      get().addMessage(
        `Based on your requirements, I've analyzed your risk profile and found 3 insurance policies that would be a good fit for you. You can compare them and select the one that best meets your needs.`, 
        'bot'
      );
    }, 2000);
  },

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  }
}));