<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="col">
          <router-link to="/"
            ><img class="navbar-brand ms-4" src="../src/assets/logo.png"
          /></router-link>
        </div>
        <!-- if homepage is open show logout nad create ne groupchat else just a return button -->
        <router-link v-if="currentPage == 'chatroom' || currentPage == 'createChatroom'" to="/">
          <Button
            class="btn btn-primary me-2"
            type="button"
            >List</Button
          >
        </router-link>
        <router-link v-else-if="currentPage == 'list'" to="/">
          <Button
            class="btn btn-primary me-2"
            type="button"
            >New chatroom</Button
          >
        </router-link>
        <Button
          v-if="isTokenPresent"
          class="btn btn-primary me-4"
          @click="logoutUser"
          >Logout</Button
        >
        <!-- <router-link v-else to="/login"
          ><Button class="btn btn-primary me-1">Login</Button></router-link
        > -->
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import useAuth from "@/composables/auth";
import { computed, watch, ref } from "vue";

//const router = useRouter();

const currentPage = ref('list');

const isTokenPresent = computed(() => {
  return !!localStorage.getItem("token");
});

// Watch for changes in localStorage and update isTokenPresent accordingly
watch(
  () => localStorage.getItem("token"),
  () => {
    isTokenPresent.value = !!localStorage.getItem("token");
  }
);

const { logout } = useAuth();

const logoutUser = async () => {
  await logout();
  window.location.href = "/login";
  // fixme router.push("/login");
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
