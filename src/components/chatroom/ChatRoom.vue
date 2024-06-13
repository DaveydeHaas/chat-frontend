<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 left-block">
        <div v-if="activeUsers.length">
          <p>Active Users:</p>
          <ul>
            <li v-for="user in activeUsers" :key="user.id">
              {{ user.username }}
            </li>
          </ul>
        </div>
        <div v-if="typingUsers.length">
          <p>Typing:</p>
          <ul>
            <li v-for="user in typingUsers" :key="user.id">
              {{ user.username }} is typing...
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9">
        <div>
          <ul id="messages">
            <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
          </ul>
          <form @submit.prevent="sendMessage">
            <input
              v-model="message"
              autocomplete="off"
              @input="sendTypingEvent(true)"
              @keyup.enter="sendTypingEvent(false)"
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import useChatrooms from "@/composables/chatrooms";
import io from "socket.io-client";
import { useAuthStore } from "@/stores/auth";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();
const router = useRouter();
const { chatroom, getChatroomById } = useChatrooms();
const currentUser = ref({});
const messages = ref([]);
const message = ref("");
let socket;
const activeUsers = ref([]);
const typingUsers = ref([]);

const sendMessage = () => {
  socket.emit("chat message", { text: message.value });
  message.value = "";
};

const sendTypingEvent = (isTyping) => {
  socket.emit("typing", isTyping);
};

onMounted(async () => {
  currentUser.value = JSON.parse(authStore.user);
  await getChatroomById(props.id);
  const userInRoom = chatroom.value.users.some(
    (user) => user.id === currentUser.value.id
  );
  if (!userInRoom) {
    router.push("/");
  }

  socket = io("http://localhost:3000");

  socket.emit("join-chatroom", {
    user_id: currentUser.value.id,
    chatroom_id: props.id,
  });

  socket.on("chat message", (msg) => {
    messages.value.push(msg);
  });

  socket.on("online users", (users) => {
    activeUsers.value = users.filter(
      (user) => user.id !== currentUser.value.id
    );
  });

  socket.on("typing", ({ id, isTyping }) => {
    if (isTyping) {
      typingUsers.value.push(activeUsers.value.find((user) => user.id === id));
    } else {
      typingUsers.value = typingUsers.value.filter((user) => user.id !== id);
    }
  });
});

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style scoped>
.left-block{
  background-color: #F8F9FA;
  height: 100vh;
}



</style>
