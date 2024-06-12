<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="col">
          <!-- Title of the groupchat -->
           {{ isTokenPresent }}
        </div>
        <!-- if homepage is open show logout nad create ne groupchat else just a return button -->
        <Button
          v-if="isTokenPresent"
          class="btn btn-primary me-1"
          @click="logoutUser"
          >Logout</Button
        >
        <router-link v-else to="/login"
          ><Button class="btn btn-primary me-1">Login</Button></router-link
        >
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import useAuth from "@/composables/auth";
import { computed, watch } from 'vue';

const router = useRouter();

const isTokenPresent = computed(() => {
  return !!localStorage.getItem('token');
});

// Watch for changes in localStorage and update isTokenPresent accordingly
watch(() => localStorage.getItem('token'), () => {
  isTokenPresent.value = !!localStorage.getItem('token');
});

const { logout } = useAuth();


const logoutUser = async () => {
  await logout();

  router.push("/login");
};
</script>

<style src="@/assets/style.css"></style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
