import axios from 'axios';
import { API_BASE_URL } from './api';
import { buildAuthorizationHeader } from '../services/tokenService';
import { useToast } from 'vue-toastification';

export default function useUsers() {
  const toast = useToast();

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);
      
      return;

    } catch (error) {
      toast.error('Login failed. Please check your credentials.', {
        position: 'bottom-right'
      });

      throw error;
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Optionally perform any additional logout cleanup logic

    // Display a toast on logout
    toast.success('Logged out successfully.', {
      position: 'bottom-right'
    });
  };

  const createUser = async (userData) => {
    try {
      // Make API request to create user
      await axios.post('/api/V1/user/create', userData, {
        headers: buildAuthorizationHeader()
      });

      // Display a success toast upon successful user creation
      toast.success('User created successfully.', {
        position: 'bottom-right'
      });
    } catch (error) {
      // Display an error toast on user creation failure
      toast.error('Failed to create user. Please try again later.', {
        position: 'bottom-right'
      });

      // Rethrow the error to handle it in the component
      throw error;
    }
  };

  return {
    login,
    logout,
    createUser
  };
}