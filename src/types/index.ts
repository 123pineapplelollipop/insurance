export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface PolicyOption {
  id: string;
  name: string;
  description: string;
  coverageAmount: number;
  monthlyPremium: number;
  yearlyPremium: number;
  benefits: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  recommended: boolean;
}

export interface UserRequirement {
  age: number | null;
  gender: string;
  occupation: string;
  annualIncome: number | null;
  healthConditions: string[];
  familyHistory: string[];
  lifestyle: string[];
  coverageNeeds: string[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  name: string;
  icon: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface ChatState {
  messages: ChatMessage[];
  requirements: UserRequirement;
  policies: PolicyOption[];
  isLoading: boolean;
  currentStep: number;
  addMessage: (message: string, sender: 'user' | 'bot') => void;
  updateRequirements: (key: keyof UserRequirement, value: any) => void;
  resetChat: () => void;
  generatePolicies: () => void;
  setCurrentStep: (step: number) => void;
}