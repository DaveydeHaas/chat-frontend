<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-grow-1">
      <div class="col-3 left-block">
        <div v-if="activeUsers.length">
          <p>Active Users:</p>
          <ul>
            <li v-for="user in activeUsers" :key="user.id">
              {{ user.name }}
              <hr />
            </li>
          </ul>
        </div>
        <div v-if="typingUsers.length">
          <p>Typing:</p>
          <ul>
            <li v-for="user in typingUsers" :key="user.id">
              {{ user.name }} is typing...
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9 d-flex flex-column">
        <div class=" scroll">
          <ul id="messages">
            <li
              v-for="msg in messages"
              :key="msg.id"
              :class="{
                'message-item': true,
                'my-message': msg.userId === currentUser.id,
                'other-message': msg.userId !== currentUser.id
              }"
            >
              <div v-if="msg.userId !== currentUser.id" :style="{ color: userColors[msg.userId] }" class="name">
                {{ msg.name }}
              </div>
              <div class="message-blob">{{ msg.text }}</div>
            </li>
          </ul>
        </div>
        <form @submit.prevent="sendMessage" class="message-input-form">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              v-model="message"
              autocomplete="off"
              @input="sendTypingEvent(true)"
              @keyup.enter="sendTypingEvent(false)"
            />
            <div class="input-group-prepend">
              <button class="btn btn-primary remove-curvedborder" type="submit">
                send
              </button>
            </div>
          </div>
        </form>
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
const userColors = ref({});

const sendMessage = () => {
  socket.emit("chat message", {
    text: message.value,
    name: currentUser.value.name,
    userId: currentUser.value.id
  });
  message.value = "";
};

const sendTypingEvent = (isTyping) => {
  socket.emit("typing", isTyping);
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

  socket.on("chat message", (msg) => {
    if (!userColors.value[msg.userId]) {
      userColors.value[msg.userId] = getRandomColor();
    }
    messages.value.push(msg);
    console.log(messages.value);
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
.container-fluid {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.row {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}

.left-block {
  background-color: #f8f9fa;
  height: 100vh;
}

.remove-curvedborder {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-bottom: 8px;
  margin-right: 20px
}

.message-item {
  margin-bottom: 15px;
}

.my-message {
  text-align: right;
}

.other-message {
  text-align: left;
}

.name {
  font-weight: bold;
}

.message-blob {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  max-width: 70%;
}

.my-message .message-blob {
  background-color: #298430;
  color: white;
  max-width: 70%;
  margin-right: 10px;
}

.message-input-form {
  position: fixed;
  bottom: 0;
  width: calc(100% - 25%);
  padding: 10px;
  background-color: white;
}

.scroll{
  width:100%;
  height: 84vh;
  overflow:scroll;
}
.scroll::-webkit-scrollbar-track{
  background-color: #F5F5F5;
}
.scroll::-webkit-scrollbar{
  width: 10px;
  background-color: #F5F5F5;
}
.scroll::-webkit-scrollbar-thumb{
  background-color: #666666;
  border: 2px solid #797979;
}
</style>