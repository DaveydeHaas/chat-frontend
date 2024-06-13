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
import useChatrooms from "@/composables/chatrooms";
import io from 'socket.io-client';
import { useAuthStore } from '@/stores/auth';
import { defineProps } from 'vue';
import { useRouter } from "vue-router";


const props = defineProps({
  id: {
    type: String,
    required: true // Assuming ID is required
    }
  });
const authStore = useAuthStore();
const router = useRouter();
const { chatroom, getChatroomById } = useChatrooms();
const messages = ref([]);
const message = ref('');
let socket;

const sendMessage = () => {
  socket.emit('chat message', { text: message.value });
  message.value = '';
};

onMounted(async () => {
  // retrieve the room
  const currentUser = JSON.parse(authStore.user);
  await getChatroomById(props.id);
  const userInRoom = chatroom.value.users.some(user => user.id === currentUser.id);
  if (!userInRoom) {
    router.push('/');
  }

  // validate if user joined the room user else return to /
  socket = io('http://localhost:3000');

  socket.on('chat message', (msg) => {
    messages.value.push(msg);
  });
});

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style scoped>

</style>
