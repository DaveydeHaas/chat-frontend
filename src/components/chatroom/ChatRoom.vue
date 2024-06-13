<template>
  <div>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
    </ul>
    <form @submit.prevent="sendMessage">
      <input v-model="message" autocomplete="off" />
      <button>Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import io from 'socket.io-client';

const messages = ref([]);
const message = ref('');
let socket;

onMounted(() => {
  socket = io('http://localhost:3000'); // Replace with your server URL

  socket.on('chat message', (msg) => {
    messages.value.push(msg);
  });
});

const sendMessage = () => {
  socket.emit('chat message', { text: message.value });
  message.value = '';
};

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style>
/* Add your styles here */
</style>