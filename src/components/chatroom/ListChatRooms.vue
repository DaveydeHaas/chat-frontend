<template>
  <div class="container-fluid">
    <div v-if="isLoading" class="spinner-container">
      <VueSpinner size="50" color="green" />
    </div>
    <div v-else>
      <div class="row">
        <div class="col-3 left-block">
          <div class="d-flex flex-column justify-content-center mt-4">
            <button class="btn btn-primary mb-2">Profile</button>
            <button class="btn btn-primary mb-2">Chatrooms with power</button>
            <button class="btn btn-primary mb-2">New chatroom</button>
          </div>
        </div>
        <div class="col-9 d-flex flex-column">
          <ul class="list-group mt-3 scroll">
            <li
              v-for="chatroom in chatrooms"
              :key="chatroom.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <h4>{{ chatroom.title }}</h4>
              <small>{{ chatroom.description }}</small>
              <button
                @click="joinChatroom(chatroom)"
                class="btn btn-primary btn-sm"
              >
                Join
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useChatrooms from "@/composables/chatrooms";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const { chatrooms, getChatrooms, joinChatroomById } = useChatrooms();
const isLoading = ref(true);
const selectedChatroom = ref(null);
const toast = useToast();

const authStore = useAuthStore();

const joinChatroom = async (chatroom) => {
  try {
    selectedChatroom.value = chatroom;
    const currentUser = JSON.parse(authStore.user);

    if (!selectedChatroom.value.users.some((u) => u.id === currentUser.id)) {
      await joinChatroomById(selectedChatroom.value.id);
      toast.success(`Joined chatroom: ${selectedChatroom.value.name}`);
    }

    router.push(`/chatroom/${selectedChatroom.value.id}`);
  } catch (error) {
    toast.error("Failed to join chatroom.");
    console.error("Join error:", error);
  }
};

onMounted(async () => {
  await getChatrooms();
  isLoading.value = false;
});
</script>

<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.scroll {
  width: 100%;
  height: 91vh;
  overflow: scroll;
}
.scroll::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.scroll::-webkit-scrollbar {
  width: 7px;
  background: #f5f5f5;
}
.scroll::-webkit-scrollbar-thumb {
  background: #ccc;
}

.allign-buttons {

}
</style>
