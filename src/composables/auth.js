import axios from 'axios';
import { API_BASE_URL } from '@/composables/api';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

export default function useAuth() {
  const authStore = useAuthStore();
  const toast = useToast();

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      const { token, user } = response.data;

      // Store the token and user data in Pinia store
      authStore.login(token, user);

      console.log(localStorage.getItem('token')); // Optional: Log token to console
      console.log(authStore.user); // Optional: Log user data stored in Pinia

      return user; // Return user data if needed

    } catch (error) {
      toast.error('Login failed. Please check your credentials.', {
        position: 'bottom-right',
      });

      throw error;
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Clear user data from Pinia store
    authStore.logout();

    // Display a success toast on logout
    toast.success('Logged out successfully.', {
      position: 'bottom-right',
    });
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      const { token, user } = response.data;

      // Store the token and user data in Pinia store
      authStore.login(token, user);

      toast.success('User registered successfully.', {
        position: 'bottom-right',
      });

    } catch (error) {
      toast.error('Registration failed. Please try again later.', {
        position: 'bottom-right',
      });

      throw error;
    }
  };

  return {
    login,
    logout,
    register,
  };
}