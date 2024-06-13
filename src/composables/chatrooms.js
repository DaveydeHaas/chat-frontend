import axios from 'axios';
import { API_BASE_URL } from './api';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

export default function useChatrooms() {
  const toast = useToast();
  const chatrooms = ref({});

  const authStore = useAuthStore();


  // Use the generated authorizationHeader in your Axios requests
  const getChatrooms = async () => {
    try {
      await axios.get(`${API_BASE_URL}/chatrooms`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          user: authStore.user,
        },
      }).then(res => {
        chatrooms.value = res.data.data;
        return;
      });
    } catch (error) {
      toast.error('failed to retrieve active chatgroups.', {
        position: 'bottom-right'
      });

      throw error;
    }
  };

  const joinChatroomById = async (chatroomId) => {
    try {
      await axios.post(`${API_BASE_URL}/joinChatroomById/${chatroomId}`,{user: authStore.user,}, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } catch (error) {
      toast.error('failed to retrieve active chatgroups.', {
        position: 'bottom-right'
      });

      throw error;
    }
  }

  return {
    chatrooms,
    getChatrooms,
    joinChatroomById
  };
}