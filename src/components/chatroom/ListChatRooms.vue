<template>
  <div class="container mt-4">
    <div v-if="isLoading" class="spinner-container">
      <VueSpinner size="50" color="green" />
    </div>
    <div v-else>
      <ul class="list-group">
        <li
          v-for="chatroom in chatrooms"
          :key="chatroom.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <h4>{{ chatroom.title }}</h4>
          <small>{{ chatroom.description }}</small>
          <button
            @click="openConfirmModal(chatroom)"
            class="btn btn-primary btn-sm"
          >
            Join
          </button>
        </li>
      </ul>
    </div>

    <!-- Modal Section -->
    <b-modal
      id="confirmationModal"
      ref="confirmationModal"
      centered
      title="Join Chatroom"
      @hidden="selectedChatroom = null"
    >
      <p>Are you sure you want to join this chatroom?</p>
      <template #footer>
        <b-button variant="primary" @click="joinChatroom">Confirm</b-button>
        <b-button variant="light" @click="hideModal">Cancel</b-button>
      </template>
    </b-modal>
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
const confirmationModal = ref(null);
const toast = useToast();

const authStore = useAuthStore ();

const openConfirmModal = (chatroom) => {
  selectedChatroom.value = chatroom;
  confirmationModal.value.show();
};

const hideModal = () => {
  confirmationModal.value.hide();
};

const joinChatroom = async () => {
  try {
    const currentUser = JSON.parse(authStore.user);
   
    if(!selectedChatroom.value.users.some(u => u.id === currentUser.id)){
      await joinChatroomById(selectedChatroom.value.id);
      toast.success(`Joined chatroom: ${selectedChatroom.value.name}`);
    }
    hideModal();

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
</style>
