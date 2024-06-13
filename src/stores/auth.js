import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    login(token, user) {
      this.token = token;
      this.user = JSON.stringify(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});