<template>
  <div class="container">
    <div v-if="isLoading">
      <VueSpinner size="20" color="green" />
    </div>
    <div v-else>
      <!-- <b-table
        :items="chatgroups"
        :fields="fields"
        striped
        hover
        responsive="sm"
      ></b-table> -->

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useChatrooms from "@/composables/chatrooms";

 const { chatrooms, getChatrooms } = useChatrooms();

 const isLoading = ref(true);

onMounted(async () => {

  await getChatrooms();


    console.log(chatrooms.value);

    isLoading.value = false;
    
  }
);
</script>
