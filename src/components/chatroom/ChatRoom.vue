<template>
    <div class="chatroom">
      <ul v-if="messages.length">
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.user.name }}:</strong> {{ message.message }}
        </li>
      </ul>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { io } from 'socket.io-client';
  
  //TODO FIXME
  const socket = io('http://localhost:3000'); // Adjust the URL to your Node.js server
  
  const messages = ref([]);
  const newMessage = ref('');
  
  const sendMessage = () => {
    socket.emit('message', newMessage.value);
    newMessage.value = '';
  };
  
  onMounted(() => {
    socket.on('initialMessages', (initialMessages) => {
      messages.value = initialMessages;
    });
  
    socket.on('message', (message) => {
      messages.value.push(message);
    });
  });
  </script>
  
  <style scoped>
  .chatroom {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>