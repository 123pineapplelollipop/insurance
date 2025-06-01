import { create } from 'zustand';
import { AuthState, User } from '../types';

// Initial setup for admin user
const setupAdminUser = () => {
  const users = localStorage.getItem('users');
  
  if (!users) {
    const adminUser: User = {
      id: 'admin-1',
      username: 'admin',
      email: 'admin@insureassist.com',
      password: '123456',
      isAdmin: true
    };
    
    localStorage.setItem('users', JSON.stringify([adminUser]));
  }
};

// Call this function to ensure admin user exists
setupAdminUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Get users from localStorage
    const usersJson = localStorage.getItem('users');
    if (!usersJson) return false;

    const users: User[] = JSON.parse(usersJson);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      set({ user, isAuthenticated: true });
      // Store current user ID in localStorage
      localStorage.setItem('currentUser', user.id);
      return true;
    }
    
    return false;
  },

  register: async (username: string, email: string, password: string) => {
    // Get existing users
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if user already exists
    const userExists = users.some(u => u.email === email);
    if (userExists) return false;
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      isAdmin: false
    };
    
    // Add to users array and save
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the new user
    set({ user: newUser, isAuthenticated: true });
    localStorage.setItem('currentUser', newUser.id);
    
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('currentUser');
  }
}));

// Initialize auth state from localStorage on app load
export const initAuthState = () => {
  const currentUserId = localStorage.getItem('currentUser');
  if (!currentUserId) return;
  
  const usersJson = localStorage.getItem('users');
  if (!usersJson) return;
  
  const users: User[] = JSON.parse(usersJson);
  const currentUser = users.find(u => u.id === currentUserId);
  
  if (currentUser) {
    useAuthStore.setState({ 
      user: currentUser, 
      isAuthenticated: true 
    });
  }
};