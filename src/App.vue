<template>
<div class="container-fluid">
  <div class="row">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="col">
      <!-- Title of the groupchat -->
      </div>
      <!-- if homepage is open show logout nad create ne groupchat else just a return button -->
    <Button class="btn btn-primary me-1" @click="logoutUser">Logout</Button>
    </nav>
  </div>
</div>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
  import { RouterView, useRouter } from 'vue-router';
  import useUsers from '@/composables/users';

  const router = useRouter();

  const { logout } = useUsers();

  const logoutUser = async () => {

      await logout();

      router.push('/login');
  }

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
